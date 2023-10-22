namespace game.mod.enhance {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import equip_advanced_data = msg.equip_advanced_data;
    import LevelConfig = game.config.LevelConfig;
    import ArrayCollection = eui.ArrayCollection;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import attributes = msg.attributes;
    import GameNT = base.GameNT;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class AdvancedMdr extends EffectMdrBase implements UpdateItem {
        private _view: AdvancedView = this.mark("_view", AdvancedView);

        private _proxy: EnhanceProxy;
        private _model: EnhanceModel;
        private _equipProxy: IEquipProxy;

        private _costs: number[] = [];
        private _listData: ArrayCollection;

        private _oldItem: StrengthEquipIcon;
        private _operating: boolean;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Enhance);
            this._model = this._proxy.getModel();
            this._equipProxy = getProxy(ModName.Equip, ProxyType.Equip);

            this._listData = new ArrayCollection();
            this._view.list_equip.dataProvider = this._listData;
            this._view.list_equip.itemRenderer = StrengthEquipIcon;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(EnhanceEvent.UPDATE_ADVANCED_INFO, this.onUpdateInfo, this);
            this.onNt(EnhanceEvent.UPDATE_ADVANCED_MASTER_INFO, this.onUpdateMaster, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
            addEventListener(this._view.btn_advanced, TouchEvent.TOUCH_TAP, this.onClickedAdvanced);
            addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickMaster);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateInfo();
        }

        protected onHide(): void {
            this._model.curEqpItem = null;
            this.removeAllEffects();
            super.onHide();
        }

        /** 更新强化*/
        private onUpdateInfo() {
            let info: equip_advanced_data[] = this._model.advancedInfos;
            if (!info || info.length == 0) {
                return;
            }

            let list: IAdvancedGridData[] = [];
            for (let pos of EquipPosAry) {
                let propData = this._equipProxy.getEquipByPos(pos);
                let info1: equip_advanced_data = this._model.getAdvancedInfo(pos);
                let hint: boolean = this._proxy.updateAdvanceHintByPos(pos);
                let equipData: IAdvancedGridData = { pos: pos, equip: propData, info: info1, hint: hint };
                list.push(equipData);
            }
            this._listData.replaceAll(list);

            if (this._model.curAdvancedPos != null) {
                //delayCall(Handler.alloc(this, this.updateCurrentInfo));
                //@yys 当事人写得太烂了，临时解决下
                if(this._view.list_equip.numChildren >= 8){
                    this.updateCurrentInfo();
                }else{
                    TimeMgr.addUpdateItem(this,500);
                }

            }
            this.onUpdateMaster();
        }

        update(time: base.Time): void {
            if(this._view.list_equip.numChildren >= 8){
                this.updateCurrentInfo();
                TimeMgr.removeUpdateItem(this);
            }
        }

        /** 更新大师*/
        private onUpdateMaster() {
            if (!this._model.advancedPower.equals(0)) {
                this._view.power.setPowerValue(this._model.advancedPower.add(this._model.advancedMasterPower));
            } else {
                let _basicPower: Long = Long.fromValue(0);
                this._view.power.setPowerValue(_basicPower);
            }

            let attr: attributes;

            let level = this._model.advancedMaster.level;
            let color: string = "";
            if (!level) {
                level = 1;

                color = TextUtil.addColor(`(${getLanById(LanDef.not_active)})`, WhiteColor.GREEN);
                attr = this._model.advancedMaster.next_attrs;
            } else {
                color = TextUtil.addColor(`(${getLanById(LanDef.actived)})`, WhiteColor.GREEN);
                attr = this._model.advancedMaster.attrs;
            }
            let cfg: game.config.AdvanceLvConfig = getConfigByNameId(ConfigName.AdvanceLv, level);
            let levelStr: string = `${level}${getLanById(LanDef.tishi_43)}`;
            let taozhuang: string = `${cfg.name}${getLanById(LanDef.advance_suit)}`;

            this._view.lab_suit_name.textFlow = TextUtil.parseHtml(levelStr + " " + taozhuang + color);

            this._view.lab_attr.textFlow = TextUtil.parseHtml(TextUtil.getAttrText(attr, WhiteColor.GREEN, " "));
            this._view.btn_master.redPoint.visible = this._proxy.updateAdvanceMasterBtnHint();
        }

        /** 更新需要强化部位*/
        private updateCurrentInfo(bool: boolean = true) {
            let equip: equip_advanced_data = this._model.getAdvancedInfo(this._model.curAdvancedPos);
            if (!equip) {
                return;
            }

            // if(this._operating) {
            //     this._operating = false;
            if (bool) {
                this._oldItem = this._model.curEqpItem;
                if (this._oldItem) {
                    this._oldItem.select(false);
                }

                let item: StrengthEquipIcon;
                let newItem: StrengthEquipIcon;
                for (let i = 0, len = this._view.list_equip.numChildren; i < len; i++) {
                    item = this._view.list_equip.getChildAt(i) as StrengthEquipIcon;
                    if (!this._listData.source[i].equip) {
                        continue;
                    }
                    if (!newItem || item.lv < newItem.lv) {
                        newItem = item;
                    }
                }
                newItem.isEqpListIcon = true;
                this._model.curEqpItem = newItem;
                newItem.select(true);
            }
            // }

            equip = this._model.getAdvancedInfo(this._model.curAdvancedPos);
            let isMaxLv = !equip.next_attrs;
            this._view.gr_max.visible = !isMaxLv;
            this._view.img_max.visible = isMaxLv;
            this._view.currentState = isMaxLv ? "maxLv" : "normal";

            // 消耗
            let lvId: number = this._proxy.getAdvancedLvId(equip.advanced_lv + 1);
            let cfg: LevelConfig = getConfigByNameId(ConfigName.Level, lvId);
            if (cfg && cfg.goods_id && cfg.goods_id.length) {
                this._costs = cfg.goods_id[0];
                this._view.cost.updateShow(cfg.goods_id[0]);
            }

            this._view.lab_pos_name.text = getLanById(EquipPosName[this._model.curAdvancedPos]);

            if (!this._model.curEqpItem) {
                return;
            }
            let b1 = false, b2 = false;
            if (this._model.curEqpItem.data && this._model.curEqpItem.data.equip) {
                b1 = true;
                this._view.eqp_cur.isEqpListIcon = false;
                this._view.eqp_cur.data = this._model.curEqpItem.data;
                this._view.eqp_cur.nameUrl = this._model.curEqpItem.data.info.advanced_lv ? "jinjie_"
                    + this._model.curEqpItem.data.info.advanced_lv : "";
                this._view.eqp_cur.nameUrl2 = this._model.curEqpItem.data.info.advanced_lv;
                let stageStr: string = equip.advanced_lv + getLanById(LanDef.tishi_43);
                if (equip.advanced_lv) {
                    let advance_lv: game.config.AdvanceLvConfig = getConfigByNameId(ConfigName.AdvanceLv, equip.advanced_lv);
                    let taozhuang: string = `${advance_lv.name}`;
                    stageStr += ` ${taozhuang}`;
                }
                this._view.lab_eqp_cur.text = stageStr;
            } else {
                this._view.eqp_cur.isEqpListIcon = false;
                this._view.eqp_cur.nameUrl = "";
                this._view.eqp_cur.nameUrl2 = 0;
                this._view.eqp_cur.icon.defaultIcon();
                this._view.eqp_cur.icon.updateIconImg(`equip_icon_gray_` + this._model.curEqpItem.pos);
                this._view.lab_eqp_cur.text = "";
            }
            this._view.eqp_cur.hint = false;
            let nextData: IAdvancedGridData;
            if (!isMaxLv && (this._model.curEqpItem.data.info instanceof equip_advanced_data)) {
                let data1: IAdvancedGridData = (this._model.curEqpItem.data as IAdvancedGridData);
                nextData = { pos: data1.pos, equip: data1.equip, info: data1.info, hint: false };
                let nextLv = nextData.info.advanced_lv + 1;
                if (this._model.curEqpItem.data && this._model.curEqpItem.data.equip && nextData) {
                    b2 = true;
                    this._view.eqp_next.isEqpListIcon = false;
                    this._view.eqp_next.data = nextData;
                    this._view.eqp_next.nameUrl = nextLv ? "jinjie_" + nextLv : "";
                    this._view.eqp_next.nameUrl2 = nextLv;
                    let advance_lv: game.config.AdvanceLvConfig = getConfigByNameId(ConfigName.AdvanceLv, nextLv);
                    let stageStr: string = nextLv + getLanById(LanDef.tishi_43);
                    let taozhuang: string = `${advance_lv.name}`;
                    this._view.lab_eqp_next.text = stageStr + " " + taozhuang;
                } else {
                    this._view.eqp_next.isEqpListIcon = false;
                    this._view.eqp_next.nameUrl = "";
                    this._view.eqp_next.nameUrl2 = 0;
                    this._view.eqp_next.icon.defaultIcon();
                    this._view.eqp_next.icon.updateIconImg(`equip_icon_gray_` + this._model.curEqpItem.pos);
                    this._view.lab_eqp_next.text = "";
                }
            }

            this._view.btn_advanced.redPoint.visible = this._proxy.updateAdvanceHintByPos(this._model.curAdvancedPos);

            delayCall(Handler.alloc(this, () => {
                this._view.eqp_cur.select(false);
                this._view.eqp_cur.img_sel.visible = false;
                this._view.eqp_cur.touchChildren = false;
                this._view.eqp_next.select(false);
                this._view.eqp_next.img_sel.visible = false;
                this._view.eqp_next.touchChildren = false;
                if (b1) {
                    this._view.eqp_cur.icon.updateCnt("+" + this._model.curEqpItem.data.info.advanced_lv);
                }
                if (b2) {
                    this._view.eqp_next.icon.updateCnt("+" + (nextData.info.advanced_lv + 1));
                }
            }), 20);
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._model.AdvancedMasterBtnHint)) {
                this._view.btn_master.setHint(data.value);
            }
        }

        private onClickList(e: eui.ItemTapEvent): void {
            this._oldItem = this._model.curEqpItem;
            if (this._oldItem) {
                this._oldItem.select(false);
                // this._oldItem.currentState = "up";
            }
            let newItem: StrengthEquipIcon = e.itemRenderer as StrengthEquipIcon;
            if (this._model.curEqpItem == newItem) {
                return;
            }
            newItem.isEqpListIcon = true;
            this._model.curEqpItem = newItem;
            newItem.select(true);
            this.updateCurrentInfo(false);
        }

        private onClickedAdvanced() {
            if (!this._model.curEqpItem) {
                return;
            } else if (!this._model.curEqpItem.data.equip) {
                PromptBox.getIns().show(getLanById(LanDef.gem_tip7));
                return;
            }
            if (this._costs.length > 1 && BagUtil.checkPropCnt(this._costs[0], this._costs[1], PropLackType.Dialog)) {
                this._proxy.c2s_equip_advanced(this._model.curEqpItem.pos);
                this._operating = true;
            }
        }

        private onClickMaster() {
            ViewMgr.getIns().showSecondPop(ModName.Enhance, EnhanceViewType.AdvancedMaster);
        }

    }
}