namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import attributes = msg.attributes;
    import BuffConfig = game.config.BuffConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import facade = base.facade;

    //锻造
    export class SuitType3ForgeMdr extends MdrBase {
        protected _view: SuitForgeView = this.mark("_view", SuitForgeView);
        protected _proxy: SuitProxy;
        /**套装类型*/
        protected _type = SuitType.HaoTian;
        //当前选择的icon数据
        protected _curIcon: ISuitIconData;
        //未锻造时，获取等级表1级属性展示
        private _notActAttrId: number;
        //锻造效果是属性时候，套装类型4,5使用
        private attrIds: number[];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickMaster, this);
            addEventListener(this._view.btn_forge, TouchEvent.TOUCH_TAP, this.onClickForge, this);
            addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.icon_target, TouchEvent.TOUCH_TAP, this.onClickTargetIcon, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE_TWO, this.updateView, this);
            this.onNt(SuitEvent.ON_SUIT_DUANZAO_SWITCH_ICON_INFO, this.onUpdateMiddleView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            this._curIcon = null;
            //SuitType.HaoTian锻造界面特殊，有别于其他两个
            this._view.currentState = this._type == SuitType.HaoTian ? 'normal' : 'special';
            this.updateView();
        }

        protected updateView(): void {
            if (!this._curIcon) {
                this._view.iconList.updateView2(this._type, SuitOperType.DuanZao);//3表示锻造
            } else {
                // this.updateMiddleView();
                this._view.iconList.updateMinForgeLv();
                this._view.iconList.updateListHint();
            }
            this.updatePower();
        }

        protected updatePower(): void {
            let power = this._proxy.getPower2(this._type, SuitOperType.DuanZao);
            this._view.power.setPowerValue(power);
        }

        protected onClickForge(): void {
            if (!this._curIcon || !this._proxy.canForge(this._type, this._curIcon.pos, true)) {
                return;
            }
            this._proxy.c2s_suit_two_equip_lvup(0, SuitOperType.DuanZao, this._type, this._curIcon.pos);
        }

        protected onUpdateMiddleView(n: GameNT): void {
            let data = n.body as ISuitIconData;
            if (!data || data.type != this._type) {
                return;
            }
            this._curIcon = data;
            this.updateMiddleView();
        }

        //点击后，更新中间的展示
        protected updateMiddleView(): void {
            if (!this._curIcon) {
                return;
            }
            let data = this._curIcon;
            if (!data.isAct) {
                this.updateNotDressView();
                return;
            }
            let stageInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, SuitOperType.JinJie);
            let operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, SuitOperType.DuanZao);
            let prop = PropData.create(data.index);
            //强制设置基础属性
            if (operInfo && operInfo.attr) {
                prop.update2(operInfo.attr, 'regular_attrs');
            }
            this._view.icon_target.setData(prop, IconShowType.NotTips);
            //【进阶x阶】名字+锻造lv
            let cfg = getConfigById(data.index);
            this._view.lb_name.text = `【${stageInfo && stageInfo.lv || 0}阶】${cfg ? cfg.name : ''} +${operInfo && operInfo.lv || 0}`;
            //消耗
            let cost = this._proxy.getCost(data.type, SuitOperType.DuanZao, operInfo ? operInfo.lv : 0);
            if (cost) {
                this._view.cost.updateShow(cost);
            } else {
                //没有下一级消耗，满阶展示
                this._view.cost.updateShow(this._proxy.getCost(data.type, SuitOperType.DuanZao, operInfo && operInfo.lv - 1));
            }
            this._view.btn_forge.setHint(this._proxy.canForge(this._type, data.pos));

            if (data.type == SuitType.HaoTian) {
                this.updateNormalView();
            } else {
                this.updateSpecialView();
            }
        }

        //套装类型4,5 special
        protected updateSpecialView(): void {
            let data = this._curIcon;
            let operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, SuitOperType.DuanZao);

            //锻造属性
            if (operInfo && operInfo.attr) {
                this._view.attrComp0.updateAttrAdd(operInfo.attr);
            } else {
                let lvCfg = this._proxy.getLevelCfg(data.type, SuitOperType.DuanZao, 1);
                this._notActAttrId = lvCfg ? lvCfg.level_attr : 0;
                let attr = RoleUtil.getAttr(this._notActAttrId);
                if (attr) {
                    this.updateAttrView(attr, null);
                }
            }
            //锻造效果
            let typeCfg = this._proxy.getSuitTypeCfg(data.type);
            let partId = typeCfg ? typeCfg.suit_part[SuitOperType.DuanZao - 1][data.pos] : 0;
            let partCfg = this._proxy.getSuitPartCfg(partId);
            if (!partCfg) {
                this._view.attrComp1.updateAttr(new attributes());
                return;
            }
            let str = '';
            if (partCfg.attribute_id) {
                let attrId = partCfg.attribute_id[operInfo ? operInfo.lv - 1 : 0];
                this.attrIds = attrId;
                let attrList = RoleUtil.getAttrList(attrId);
                str = TextUtil.getAttrTextAdd(TextUtil.calcAttrList(attrList));
            } else if (partCfg.buff_id) {
                let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, partCfg.buff_id[0][0]);
                str = buffCfg ? buffCfg.des : '';
            } else if (partCfg.skill_id) {
                let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, partCfg.skill_id[0][0]);
                str = skillCfg ? skillCfg.describe : '';
            }
            this._view.lb_attr0.textFlow = TextUtil.parseHtml(str);
        }

        //锻造效果是属性的
        private updateAttr(): void {
            if (this.attrIds) {
                let attrList = RoleUtil.getAttrList(this.attrIds);
                if (attrList) {
                    let str = TextUtil.getAttrTextAdd(TextUtil.calcAttrList(attrList));
                    this._view.lb_attr0.textFlow = TextUtil.parseHtml(str);
                    this.attrIds = null;
                }
            }
            if (this._notActAttrId) {
                this.onUpdateAttrView();
            }
        }

        //套装类型3 normal
        protected updateNormalView(): void {
            let data = this._curIcon;
            let operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, SuitOperType.DuanZao);

            if (operInfo) {
                this.updateAttrView(operInfo.attr, operInfo.next_attr);
            } else {
                let lvCfg = this._proxy.getLevelCfg(data.type, SuitOperType.DuanZao, 1);//锻造0级，读取等级表1级属性展示
                this._notActAttrId = lvCfg ? lvCfg.level_attr : 0;
                let attr = RoleUtil.getAttr(this._notActAttrId);
                if (attr) {
                    let curAttr = TextUtil.calcAttr(attr, 0);
                    this.updateAttrView(curAttr, attr);
                }
            }

            // 锻造大师属性
            let masterLv = this._proxy.getMasterLv();
            let paramCfg = GameConfig.getParamConfigById('suit_forge_master');
            let val = masterLv > 0 ? paramCfg.value[masterLv - 1] : 0;
            this._view.btn_master.updateLv(masterLv);
            this._view.lb_attr.textFlow = TextUtil.parseHtml(`神装属性` + TextUtil.addColor(`+${(val / 10000).toFixed(1)}%`, BlackColor.GREEN));
        }

        /**未锻造时候，读取等级表1级属性展示*/
        protected onUpdateAttrView(): void {
            let attr = RoleUtil.getAttr(this._notActAttrId);
            if (!attr) {
                return;
            }
            let curAttr = TextUtil.calcAttr(attr, 0);
            this.updateAttrView(curAttr, attr);
            this._notActAttrId = null;
        }

        // normal 状态下，更新属性显示
        protected updateAttrView(attr: attributes, next_attr: attributes): void {
            let data = this._curIcon;
            if (attr) {
                this._view.attrComp0.updateAttrAdd(this._proxy.getFilterAttr(data.type, data.pos, attr));
            }
            if (this._type != SuitType.HaoTian) {
                return;
            }
            if (next_attr && Object.keys(next_attr).length) {
                this._view.attrComp1.updateAttrAdd(this._proxy.getFilterAttr(data.type, data.pos, next_attr));
                this._view.attrComp1.visible = true;
                this._view.img_max.visible = false;
            } else {
                this._view.attrComp1.visible = false;
                this._view.img_max.visible = true;//锻造满级了
            }
        }

        // 点击未未穿戴的icon，中间部分显示效果
        protected updateNotDressView(): void {
            this._view.icon_target.data = null;
            this._view.lb_name.text = '';
        }

        protected onClickMaster(): void {
            this.showView(NewRoleViewType.SuitForgeMaster, this._type);
        }

        protected onHide(): void {
            super.onHide();
            this._curIcon = null;
            this._notActAttrId = null;
            this.attrIds = null;
        }

        protected onClickAttr(): void {
            let attr = this._proxy.getAttrByTypeAndOperType(this._type, SuitOperType.DuanZao);
            this.showView(NewRoleViewType.SuitAttrTips, {
                title: '属性总览',
                attrTitle: '激活属性',
                attr
            });
        }

        protected onClickTargetIcon(): void {
            if (!this._curIcon) {
                return;
            }
            facade.showView(ModName.Role, NewRoleViewType.SuitEquipTips2, {
                data: this._curIcon,
                operType: SuitOperType.DuanZao
            });
        }

    }
}