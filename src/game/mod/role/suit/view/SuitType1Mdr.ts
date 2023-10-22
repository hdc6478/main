namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import attributes = msg.attributes;
    import GameNT = base.GameNT;
    import BuffConfig = game.config.BuffConfig;
    import LanDef = game.localization.LanDef;

    /**苍天进阶*/
    export class SuitType1Mdr extends EffectMdrBase {
        private _view: SuitView = this.mark("_view", SuitView);
        protected _proxy: SuitProxy;
        /**苍天，炎天*/
        protected _type = SuitType.CangTian;
        /**1进阶，2强化*/
        protected _skinType = 1;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_fanli, TouchEvent.TOUCH_TAP, this.onClickFanli, this);
            addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose, this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickSuitTips, this);
            addEventListener(this._view.btn_oneKey, TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            addEventListener(this._view.btn_stengthen, TouchEvent.TOUCH_TAP, this.onClickMaster, this);
            addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_onekeydress, TouchEvent.TOUCH_TAP, this.onClickBtnOneKeyDress, this);

            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE, this.updateView, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.img_suittype.source = `taozhuangtype${this._type}`;
            this.addEftByParent(`lilian_standby_${this._type}_1`, this._view.gr_eff);//todo
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected getPower(): number {
            if (this._skinType == 1) {
                return this._proxy.getPowerForAdvance(this._type);
            }
            return this._proxy.getPowerForStrengthen(this._type);
        }

        protected updateView(): void {
            this._view.iconComp.updateView(this._type, this._skinType);
            this._view.power.setPowerValue(this.getPower());

            this.switchView(this._skinType);

            if (this._skinType == 1) {
                this.updateAdvanceView();
            } else {
                this.updateStrengthenView();
            }

            this.updateComposeBtnHint();
        }

        private updateComposeBtnHint(): void {
            let hint = HintMgr.getHint(this._proxy.model.composeHintPath[SuitType.CangTian])
                || HintMgr.getHint(this._proxy.model.composeHintPath[SuitType.YanTian]);
            this._view.btn_compose.setHint(hint);
        }

        protected updateAdvanceView(): void {
            let type = this._type;
            let curSuitLv = this._proxy.getSuitLv(type);
            this._view.btn_up.setLock(curSuitLv == 0);
            this.addBmpFont(curSuitLv + '', BmpTextCfg[BmpTextType.CommonStage], this._view.gr_font0, true, 0.7, false, -6, true);
            if (this._proxy.isMaxSuitLv(type)) {
                this._view.lb_next.text = '';
            } else {
                let len = this._proxy.getSuitLvNotLess(type, curSuitLv + 1);
                let stageStr = curSuitLv > 0 ? '下一阶段:' : '激活条件:';
                let str = stageStr + `全身${curSuitLv + 1}阶以上`
                    + TextUtil.addColor(`(${len}/8)`, WhiteColor.RED);
                this._view.lb_next.textFlow = TextUtil.parseHtml(str);
            }
            this._view.btn_up.group_eft.removeChildren();
            if (curSuitLv > 0) {
                this.addEftByParent(UIEftSrc.TaoZhuangJiNeng, this._view.btn_up.group_eft);
            }
            this.updateBtnDress();
        }

        //一键穿戴按钮（部位穿戴后，才可一键穿戴更高阶的）
        private updateBtnDress(): void {
            this._view.btn_onekeydress.visible = this._proxy.canDressOneKey(this._type);
            if (this._view.btn_onekeydress.visible) {
                this._view.btn_onekeydress.setHint(true);
            }
        }

        //一键穿戴
        private onClickBtnOneKeyDress(): void {
            let list = this._proxy.getDressAdvancedEquipIdList(this._type);
            if (list && list.length) {
                this._proxy.c2s_suit_equip_onekey(this._type, list);
            }
        }

        protected updateStrengthenView(): void {
            let info = this._proxy.getSuitTypeInfo(this._type);
            let isAct = info && info.master_lv > 0;
            let curLv = isAct ? info.master_lv : 0;
            this._view.btn_stengthen.updateLv(curLv);
            let curCfg = this._proxy.getSuitStrengthenCfg(this._type, isAct ? curLv : curLv + 1);
            let str = getLanById(LanDef.all_strength) + `+${curCfg.strength} `;
            if (isAct) {
                str += TextUtil.addColor(`(${getLanById(LanDef.actived)})`, WhiteColor.GREEN);
            } else {
                str += TextUtil.addColor(`(${getLanById(LanDef.not_active)})`, WhiteColor.RED);
            }
            this._view.lb_strengthen.textFlow = TextUtil.parseHtml(str);

            this._view.img_desc.source = `suit_desc_${this._type}`;
            let fontTxt = '+0%';
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, curCfg.buff_id);
            if (buffCfg) {
                let idx = buffCfg.des.indexOf('+');
                fontTxt = buffCfg.des.slice(idx);
            }
            this.addBmpFont(fontTxt, BmpTextCfg[BmpTextType.CommonStage], this._view.gr_font, true, 1, false, -6);

            this._view.btn_oneKey.setHint(this._proxy.canStrengthenOneKey(this._type));
            this._view.btn_stengthen.setHint(this._proxy.canMasterUp(this._type));
        }

        private switchView(type = 1): void {
            this._view.gr_advance.visible = type == 1;
            this._view.gr_strengthen.visible = !this._view.gr_advance.visible;
        }

        private onClickFanli(): void {
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.SuitGiftMain, [0, this._type + 1]);
        }

        private onClickCompose(): void {
            ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.SuitCompose);
        }

        //套装阶数tips
        private onClickSuitTips(): void {
            this.showView(NewRoleViewType.SuitStageTips, this._type);
        }

        private onClickOneKey(): void {
            if (!this._proxy.canStrengthenOneKey(this._type, true)) {
                return;
            }
            this._proxy.c2s_suit_equip_lvup(1, this._type, null);
        }

        //套装阶数强化tips
        private onClickMaster(): void {
            this.showView(NewRoleViewType.SuitStageStrengthenTips, this._type);
        }

        protected onClickAttr(): void {
            let info = this._proxy.getSuitTypeInfo(this._type);
            let attr: attributes;
            if (info && info.suit_attr && TextUtil.getAttrOrderKeys(info.suit_attr).length > 0) {
                attr = info.suit_attr;
            }
            if (info && info.equips) {
                let attrList: attributes[] = [attr];
                for (let equip of info.equips) {
                    if (equip && equip.attr) {
                        attrList.push(equip.attr);
                    }
                }
                attr = TextUtil.calcAttrList(attrList);
            }
            let attr_id: number;
            if (!attr) {
                let cfg = this._proxy.getSuitStageCfg(this._type, 1);
                if (cfg && cfg.attr_id) {
                    attr_id = cfg.attr_id;
                }
            }
            this.showView(NewRoleViewType.SuitAttrTips, {
                title: getLanById(LanDef.allmap3),
                attrTitle: getLanById(LanDef.xiandan_tips9),
                attr,
                attr_id
            });
        }

        private onUpdateHint(n: GameNT): void {
            let data = n.body as IHintData;
            if (!data) {
                return;
            }
            //合成按钮红点
            if (data.node == HintMgr.getType(this._proxy.model.composeHintPath[SuitType.CangTian])
                || data.node == HintMgr.getType(this._proxy.model.composeHintPath[SuitType.YanTian])) {
                this.updateComposeBtnHint();
            }
        }
    }

    /**苍天强化*/
    export class SuitType1StrengthenMdr extends SuitType1Mdr {
        /**苍天，炎天*/
        protected _type = SuitType.CangTian;
        /**1进阶，2强化*/
        protected _skinType = 2;

        protected onClickAttr(): void {
            let info = this._proxy.getSuitTypeInfo(this._type);
            let attr: attributes;
            if (info && info.master_attr && TextUtil.getAttrOrderKeys(info.master_attr).length > 0) {
                attr = info.master_attr;
            }
            if (info && info.equips) {
                let attrList: attributes[] = [attr];
                for (let equip of info.equips) {
                    if (equip && equip.lv_attr) {
                        attrList.push(equip.lv_attr);
                    }
                }
                attr = TextUtil.calcAttrList(attrList);
            }
            let attr_id: number;
            if (!attr) {
                let cfg = this._proxy.getSuitStrengthenCfg(this._type, 1);
                if (cfg && cfg.attr_id) {
                    attr_id = cfg.attr_id;
                }
            }
            this.showView(NewRoleViewType.SuitAttrTips, {
                title: getLanById(LanDef.strength_attr),
                attrTitle: getLanById(LanDef.xiandan_tips9),
                attr,
                attr_id
            });
        }
    }
}