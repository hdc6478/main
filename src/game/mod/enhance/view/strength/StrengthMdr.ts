namespace game.mod.enhance {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import equip_strength_data = msg.equip_strength_data;
    import LevelConfig = game.config.LevelConfig;
    import GameNT = base.GameNT;

    export class StrengthMdr extends EffectMdrBase {
        private _view: StrengthView = this.mark("_view", StrengthView);

        private _proxy: EnhanceProxy;
        private _model: EnhanceModel;
        private _equipProxy: IEquipProxy;

        private _costs: number[] = [];
        private _lvs: number[];
        private _operating: boolean;

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

            this.onNt(EquipEvent.EQUIP_UPDATE_BACK, this.onUpdateInfo, this);
            this.onNt(EnhanceEvent.UPDATE_STRENGTH_INFO, this.onUpdateInfo, this);
            this.onNt(EnhanceEvent.UPDATE_STRENGTH_MASTER_INFO, this.onUpdateMaster, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.equip_list.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
            addEventListener(this._view.btn_strength, TouchEvent.TOUCH_TAP, this.onceStrength);
            addEventListener(this._view.btn_one_key, TouchEvent.TOUCH_TAP, this.oneKeyStrength);
            addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickMaster);
        }

        protected onShow(): void {
            super.onShow();
            this._view.lab_tip.text = getLanById(LanDef.tishi_37);
            this._model.lastPos = this._model.curStrengthPos = this.getInitPos();
            this.onUpdateInfo();
            this.addEftByParent(UIEftSrc.QiangHuaJianTou, this._view.group_eft);
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 更新强化*/
        private onUpdateInfo() {
            let info: equip_strength_data[] = this._model.strengthInfos;
            if (!info || info.length == 0) {
                return;
            }

            this._lvs = [];
            for (let pos of EquipPosAry) {
                let info1: equip_strength_data = this._model.getStrengthInfo(pos);
                this._lvs.push(info1 ? info1.strength_lv : 0);
            }
            this._view.equip_list.updateEquip(this._lvs);

            // if (this._model.curStrengthPos >= 0) {
            //     this.updateCurrentInfo();
            // }
            this.updateCurrentInfo();
            this.onUpdateMaster();
            this.updateOneKeyBtnHint();
            this.updateMasterBtnHint();
        }

        /** 更新大师*/
        private onUpdateMaster() {
            let master = this._model.strengthMaster;
            if (master) {
                this._view.lab_rate.text = master.level + getLanById(LanDef.tishi_43);
            }

            if (!this._model.strengthPower.equals(0)) {
                this._view.power.setPowerValue(this._model.strengthPower.add(this._model.strengthMasterPower));
            } else {
                let _basicPower: Long = Long.fromValue(0);
                this._view.power.setPowerValue(_basicPower);
            }
            this.updateMasterBtnHint();
        }

        /** 更新需要强化部位*/
        private updateCurrentInfo() {
            let equip: equip_strength_data = this._model.getStrengthInfo(this._model.curStrengthPos);
            if (!equip) {
                return;
            }

            let selPoss: boolean[] = [];
            if (this._operating) {
                this._operating = false;
                let minLvIdx = this.getMinLvIdx();
                for (let i = 0, len = EquipPosAry.length; i < len; i++) {
                    if (i == minLvIdx) {
                        this._model.lastPos = EquipPosAry[i];
                    }
                    selPoss.push(i == minLvIdx);
                }
            } else {
                for (let pos of EquipPosAry) {
                    selPoss.push(this._model.curStrengthPos == pos);
                }
            }
            // this._view.equip_list.updateSelByPos(this._model.curStrengthPos);            // 强化后的选中有问题
            this._view.equip_list.updateSel(selPoss);

            // 属性
            let s1: string = equip.attrs && !!Object.keys(equip.attrs).length ?
                TextUtil.addColor(TextUtil.getAttrText(equip.attrs, WhiteColor.GREEN, " ", " "), 0x355973) :
                TextUtil.addColor(TextUtil.getAttrText(equip.next_attrs, WhiteColor.GREEN, " ", " ",0), 0x355973);
            this._view.lab_attr1.textFlow = TextUtil.parseHtml(TextUtil.addColor(getLanById(LanDef.tishi_38) + "：", 0xaf3d1a) + s1);
            let s2: string = "";
            this._view.cost.visible = !!equip.next_attrs;
            this._view.img_max.visible = !equip.next_attrs;
            this._view.lab_attr2.visible = !!equip.next_attrs;
            if (equip.next_attrs) {
                s2 = TextUtil.addColor(TextUtil.getAttrText(equip.next_attrs, WhiteColor.GREEN, " ", " "), 0x355973);
                this._view.lab_attr2.textFlow = TextUtil.parseHtml(TextUtil.addColor(getLanById(LanDef.tishi_39) + "：", 0xaf3d1a) + s2);
            }

            // 消耗
            let lvId: number = this._proxy.getStrengthLvId(equip.strength_lv + 1);
            let cfg: LevelConfig = getConfigByNameId(ConfigName.Level, lvId);
            if (cfg && cfg.goods_id && cfg.goods_id.length) {
                this._costs = cfg.goods_id[0];
                this._view.cost.updateShow(cfg.goods_id[0]);
            }
            this.updateStrengthBtnHint(this._model.curStrengthPos, cfg, !equip.next_attrs);
        }

        private getMinLvIdx(): number {
            let _lv: number;
            for (let i = 0, len = EquipPosAry.length; i < len; i++) {
                let pos: number = EquipPosAry[i];
                let equip = this._equipProxy.getEquipByPos(pos);
                if (!equip) {
                    continue;
                }
                if (_lv === undefined) {
                    _lv = this._lvs[i];
                } else {
                    _lv = Math.min(_lv, this._lvs[i]);
                }
            }
            return this._lvs.indexOf(_lv);
        }

        private getInitPos(): number {
            let _pos: number = 0;
            let _lv: number;
            for (let pos of EquipPosAry) {
                let equip = this._equipProxy.getEquipByPos(pos);
                if (!equip) {
                    continue;
                }
                let info = this._model.getStrengthInfo(pos);
                if (!info) {
                    return _pos = pos;
                }
                if (_lv === undefined) {
                    _lv = info.strength_lv;
                } else {
                    if (info.strength_lv < _lv) {
                        _pos = pos;
                        _lv = info.strength_lv;
                    }
                }
            }
            return _pos;
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {

        }

        /**
         * 强化按钮红点
         * @returns
         */
        public updateStrengthBtnHint(pos: number, cfg: LevelConfig, isMax: boolean): void {
            let propData = this._equipProxy.getEquipByPos(pos);          // 有无穿戴装备
            if (!propData || !cfg) {
                this._view.btn_strength.setHint(false);
                return;
            }
            let isEnough: boolean = BagUtil.checkPropCnt(cfg.goods_id[0][0], cfg.goods_id[0][1]);
            let hint = isEnough && !isMax;                                  // 消耗足够，且未满级
            this._view.btn_strength.setHint(hint);
        }

        /**
         * 一键强化按钮红点
         * @returns
         */
        public updateOneKeyBtnHint(): void {
            let hint = this._proxy.updateStrengthOneKeyBtnHint();
            this._view.btn_one_key.setHint(hint);
        }

        /**
         * 大师强化按钮红点
         * @returns
         */
        public updateMasterBtnHint(): void {
            let hint = this._proxy.updateStrengthMasterBtnHint();
            this._view.btn_master.setHint(hint);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let data1 = (e.item as IconEquipData);
            if (!data1.prop) {
                return;
            }
            this._model.lastPos = (data1.prop instanceof PropData) ? data1.prop.equipPos : data1.prop;
            this.updateCurrentInfo();
        }

        private onceStrength() {
            let equip = this._equipProxy.getEquipByPos(this._model.curStrengthPos);
            if (!equip) {
                PromptBox.getIns().show(getLanById(LanDef.gem_tip7));
                return;
            }
            if (this._costs.length > 1 && BagUtil.checkPropCnt(this._costs[0], this._costs[1], PropLackType.Dialog)) {
                this._proxy.c2s_equip_strength(1, this._model.curStrengthPos);
                this._operating = true;
            }
        }

        private oneKeyStrength() {
            if (this._costs.length > 1 && BagUtil.checkPropCnt(this._costs[0], this._costs[1], PropLackType.Dialog)) {
                this._proxy.c2s_equip_strength(2);
                this._operating = true;
            }
        }

        private onClickMaster() {
            ViewMgr.getIns().showSecondPop(ModName.Enhance, EnhanceViewType.StrengthMaster);
        }

    }
}