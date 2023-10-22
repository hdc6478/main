namespace game.mod.enhance {

    import TouchEvent = egret.TouchEvent;
    import gem_data = msg.gem_data;
    import gem_master_data = msg.gem_master_data;
    import PropConfig = game.config.PropConfig;
    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import GameNT = base.GameNT;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import delayCall = base.delayCall;
    import Handler = base.Handler;

    export class GemMdr extends EffectMdrBase implements UpdateItem {

        private _view: GemView = this.mark("_view", GemView);

        private _proxy: EnhanceProxy;
        private _model: EnhanceModel;
        private _equipProxy: IEquipProxy;

        private _tmpPos: number;
        private _allGemLv: number;

        private isInInlay: boolean;

        private _gemList: gem_data[];
        private _equipPos: number[] = [];       // 已有装备的位置

        private _showTips: boolean = false;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Enhance);
            this._model = this._proxy.getModel();

            this._equipProxy = getProxy(ModName.Equip, ProxyType.Equip);
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(EnhanceEvent.UPDATE_GEM_INFO, this.updateGemInfo, this);
            this.onNt(EnhanceEvent.UPDATE_GEM_MASTER_INFO, this.updateGemPower, this);
            this.onNt(EnhanceEvent.UPDATE_GEM_ONE_KEY_INSET, this.inlaySuc, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.mergeSuc, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.mergeSuc, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.equip_list.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
            addEventListener(this._view.btn_attr, TouchEvent.TOUCH_TAP, this.onClickAttr);
            addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickGemMaster);
            addEventListener(this._view.btn_merge, TouchEvent.TOUCH_TAP, this.onClickMerge);
            addEventListener(this._view.btn_inlay, TouchEvent.TOUCH_TAP, this.onClickInlay);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet);

            for (let i: number = 0; i < 4; i++) {
                let btn: GemBtnItem = this._view["btn_gem" + i];
                btn.pos = i;
                addEventListener(btn, TouchEvent.TOUCH_TAP, this.onClickGem);
            }
        }

        protected onShow(): void {
            super.onShow();

            this.isInInlay = false;
            this.updateInfo();
        }

        protected onHide(): void {
            this._model.curGemPos = -1;
            this._model.gemAttrs = null;
            TimeMgr.removeUpdateItem(this);

            super.onHide();
        }

        private updateInfo() {
            this._equipPos = [];
            for (let pos of EquipPosAry) {
                let propData = this._equipProxy.getEquipByPos(pos);
                if (!propData) {
                    continue;
                }
                this._equipPos.push(pos);
                if (this._model.curGemPos == -1) {       // 默认选中第一个装备
                    this._model.curGemPos = pos;
                }
            }
            if (this._model.curGemPos == -1) {
                this._model.curGemPos = 0;
            }

            this._view.equip_list.updateEquip();

            this.updateGemPower();
            delayCall(Handler.alloc(this, this.updateCurrentInfo));

            let bagDatas: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            this._view.btn_merge.redPoint.visible = this._proxy.checkGemAKeySynHint(bagDatas);
        }

        private updateGemInfo() {
            this.updateCurrentInfo();
            this.updateGemPower();
            this.updateEquipGemHint();
        }

        update(time: base.Time): void {
            this._tmpPos++;
            let isCan = this._proxy.gemOneKeyInlayHint();

            if (isCan && this._tmpPos < this._equipPos.length) {
                let pos = this._equipPos[this._tmpPos];
                this.inlayGem(pos);
                return;
            }
            TimeMgr.removeUpdateItem(this);
            this.isInInlay = false;
            if (this._showTips) {
                ViewMgr.getIns().showSuccessTips(SuccessTipsType.Xiangqian);
                egret.callLater(() => {
                    PromptBox.getIns().show("镶嵌成功");
                }, this);
                this._showTips = false;
            }
        }

        /**
         * 镶嵌操作
         * @param pos
         * @returns
         */
        private inlayGem(pos: number) {
            if (this._equipPos.indexOf(pos) == -1 || pos > 9) {
                return;
            }
            this._view.equip_list.updateSelByPos(pos);
            this._model.curGemPos = pos;

            this.updateCurrentInfo();
            this._proxy.c2s_equip_operate_gem(2, pos);
        }

        //战力、总镶嵌
        private updateGemPower() {
            this._view.power.setPowerValue(this._model.gemPower);
            this._allGemLv = this._model.gemTotalLv;

            //宝石大师
            let master: gem_master_data = this._model.gemMaster;
            let next: number = master && master.next_gem_lv ? master.next_gem_lv : 0;
            this._view.pro_rate.show(this._allGemLv, next, false, 0, false);
            this._view.pro_rate.labelDisplay.visible = false;
            this._view.lab_pro.text = `${this._allGemLv}/${next}`;

            let lv: number = master && master.level ? master.level : 0;
            this._view.lab_step.text = lv + getLanById(LanDef.tishi_43);

            this._view.btn_master.redPoint.visible = next > 0 && this._allGemLv >= next;
        }

        //当前选中
        private updateCurrentInfo() {
            let equipData: PropData = this._equipProxy.getEquipByPos(this._model.curGemPos);
            if (equipData) {
                this._view.icon_gem.setData(equipData);
            } else {
                this._view.icon_gem.updateIconImg(`equip_icon_gray_` + this._model.curGemPos);
            }

            this._view.equip_list.updateSelByPos(this._model.curGemPos);

            // 宝石属性
            this._gemList = [];
            let gem: gem_data = null;
            let hint: boolean = false;
            let btn: GemBtnItem = null;
            let icon: string = "";
            let idx: number = 0;
            let cfg: PropConfig = null;
            for (let i: number = 0; i < 4; i++) {
                gem = this._model.getGemHoleInfo(this._model.curGemPos, i);
                hint = this._proxy.checkGemPosHint(equipData, gem, this._model.curGemPos, i);
                btn = this._view["btn_gem" + i];
                btn.redPoint.visible = hint;
                idx = gem && gem.index ? gem.index : 0;
                btn.img_add.visible = idx == 0;
                if (idx > 0) { //有镶嵌
                    cfg = getConfigByNameId(ConfigName.Prop, idx);
                    if (cfg) {
                        icon = ResUtil.getUiProp(cfg.icon);
                    }
                    btn.currentState = "up";
                } else {
                    icon = "";
                    btn.currentState = "notSet";
                }
                btn.iconDisplay.source = icon;
                this._gemList.push(gem);
            }

            this._view.btn_inlay.redPoint.visible = this._proxy.gemOneKeyInlayHint();
        }

        private updateEquipGemHint() {
            // let btnHint = false;
            // for (let i: number = 0, len = this._view.list_equip.numChildren; i < len; i++) {
            //     let equipIcon = this._view.list_equip.getChildAt(i) as StrengthEquipIcon;
            //     let isRed = this._proxy.checkEquipGemHint(equipIcon.pos);
            //     equipIcon.redPoint.visible = isRed;
            //     if (isRed) {
            //         btnHint = true;
            //         break;
            //     }
            // }
            // this._view.btn_merge.redPoint.visible = this._proxy.checkGemAKeySynHint(null);
            // this._view.btn_inlay.redPoint.visible = btnHint;
        }

        // 镶嵌成功
        private inlaySuc() {
            this._showTips = true;
            // if (!this.isInInlay) {
            //     PromptBox.getIns().show("镶嵌成功");
            //     ViewMgr.getIns().showSuccessTips(SuccessTipsType.Xiangqian);
            // }
            this.updateInfo();
        }

        // 合成成功
        private mergeSuc(n: GameNT) {
            let types = n.body as number[];
            if (!types || !types.length || types.indexOf(BagType.Gem) < 0) {
                return;
            }

            this.updateCurrentInfo();
            this.updateEquipGemHint();
            let bagDatas: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            this._view.btn_merge.redPoint.visible = this._proxy.checkGemAKeySynHint(bagDatas);
        }

        private onClickList(e: ItemTapEvent) {
            this._model.curGemPos = this._proxy.getPosByListIdx(e.itemIndex);
            this.updateCurrentInfo();
        }

        /**
         * 宝石属性
         */
        private onClickAttr() {
            let allGemList: gem_data[] = [];

            for (let pos of EquipPosAry) {
                for (let i: number = 0; i < 4; i++) {
                    let gem: gem_data = this._model.getGemHoleInfo(pos, i);
                    if (gem && gem.index > 0) {
                        allGemList.push(gem);
                    }
                }
            }

            ViewMgr.getIns().showSecondPop(ModName.Enhance, EnhanceViewType.GemAttr, allGemList);
        }

        /**
         * 宝石大师
         */
        private onClickGemMaster() {
            ViewMgr.getIns().showSecondPop(ModName.Enhance, EnhanceViewType.GemMaster, this._allGemLv);
        }

        private onClickGem(e: TouchEvent) {
            let btn: GemBtnItem = e.currentTarget;
            // let gem: gem_data = this._model.getGemHoleInfo(this._model.curEqpItem.pos, btn.pos);
            // if(!gem) {
            //     return;
            // }

            ViewMgr.getIns().showSecondPop(ModName.Enhance, EnhanceViewType.GemSyn, {
                eqPos: this._model.curGemPos,
                gemPos: btn.pos,
            });
        }

        private onClickGet() {
            ViewMgr.getIns().showGainWaysTips(PropIndex.Baoshi);
        }

        //一键合成
        private onClickMerge() {
            let isCan = this._proxy.checkGemAKeySynHint(null);
            if (!isCan) {
                PromptBox.getIns().show(getLanById(LanDef.gem_tip0));
                return;
            }
            this._proxy.c2s_equip_gem_combine(null, null, null, 3);
        }

        //一键镶嵌
        private onClickInlay() {
            let isCan = this._proxy.gemOneKeyInlayHint();
            if (!isCan) {
                PromptBox.getIns().show(getLanById(LanDef.no_suit_gem));
                return;
            }

            if (!this.isInInlay) {
                this.isInInlay = true;
                this._tmpPos = 0;
                this.inlayGem(this._equipPos[this._tmpPos]);
                TimeMgr.addUpdateItem(this, 200);
            }
        }

    }
}