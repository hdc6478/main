namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import attributes = msg.attributes;
    import LanDef = game.localization.LanDef;
    import attr_and_next = msg.attr_and_next;
    import SuitPartConfig = game.config.SuitPartConfig;
    import EquipmentConfig = game.config.EquipmentConfig;
    import BuffConfig = game.config.BuffConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    /**
     * 套装类型3,4,5的tips
     */
    export class SuitEquipTipsMdr2 extends MdrBase {
        private _view: SuitEquipTipsView = this.mark("_view", SuitEquipTipsView);
        private _proxy: SuitProxy;
        private _posEquip: attr_and_next;//装备数据
        _showArgs: { data: ISuitIconData, operType: SuitOperType };

        private _actAttrId: number;//激活的属性展示
        private _attrItem3: BaseAttrItemAdd;//基础属性组件
        private _suitItem: BaseDescItem;//套装
        private _nextStageItem: BaseDescItem;//下一阶的套装属性
        private _buffItem: BaseDescItem;//技能或buff描述
        private _isDressed = false;//用于穿戴成功后判断关闭此界面

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct, this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE_TWO, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            if (!this._attrItem3) {
                this._attrItem3 = new BaseAttrItemAdd();
            }
            if (!this._suitItem) {
                this._suitItem = new BaseDescItem();
            }
            if (!this._nextStageItem) {
                this._nextStageItem = new BaseDescItem();
            }
            if (!this._buffItem) {
                this._buffItem = new BaseDescItem();
            }
            this._isDressed = false;
            this.updateTopView();
            this.updateView();

            if (this._showArgs.operType == SuitOperType.DuanZao) {
                this._view.gr_act.visible = this._view.gr_up.visible = this._view.img_line.visible = false;
            }
        }

        private updateTopView(): void {
            let data = this._showArgs.data;
            this._view.tips.updateShow(data.index);
        }

        private updateView(): void {
            let data = this._showArgs.data;
            let operType = this._showArgs.operType;
            let operData: attr_and_next = this._proxy.getPosEquipInfo2(data.type, data.pos, operType);

            //穿戴成功后关闭界面
            if (this._isDressed && operData) {
                this.hide();
                return;
            }
            this.doAdd(this._attrItem3, 0);
            if (operData) {
                this._view.gr_act.visible = false;
                this._view.gr_up.visible = this._view.img_line.visible = true;
                this._posEquip = operData;

                let lvCfg = this._proxy.getLevelCfg(data.type, operType, operData && operData.lv || 0);
                if (lvCfg && lvCfg.goods_id) {
                    this._view.costItem.updateShow(lvCfg.goods_id[0]);
                }

                let power = 0;
                if (operData) {
                    power = operData.attr && operData.attr.showpower && operData.attr.showpower.toNumber() || 0;
                    this._attrItem3.updateShow(operData.attr, operData.next_attr);
                }
                this.updatePower(power);
                this._view.btn_up.label = operType == SuitOperType.JingZhu ? '精铸' : '进阶';
            } else {
                //激活，自己读取等级表配置展示消耗和属性
                this._view.gr_up.visible = false;
                this._view.gr_act.visible = this._view.img_line.visible = true;

                this._view.icon_act.setData([data.index, 1]);//消耗本身
                let lvCfg = this._proxy.getLevelCfg(data.type, operType, 1);//1阶属性
                if (lvCfg && lvCfg.level_attr) {
                    let attr = RoleUtil.getAttr(lvCfg.level_attr);
                    this.updateBaseAttrView(attr);
                    this._actAttrId = lvCfg.level_attr;
                }
                this._isDressed = true;
            }
            this.updateBtnHint();
            this.updateSuitItem();
        }

        private updateBtnHint(): void {
            let hint = false;
            let data = this._showArgs.data;
            let operType = this._showArgs.operType;
            if (this._posEquip) {
                if (operType == SuitOperType.JinJie) {
                    hint = this._proxy.canAdvance(data.type, data.pos);
                } else if (operType == SuitOperType.JingZhu) {
                    hint = this._proxy.canCast(data.type, data.pos);
                }
                this._view.btn_up.setHint(hint);
            } else {
                hint = this._proxy.canDress(data.index, false, operType);
                this._view.btn_act.setHint(hint);
            }
        }

        //更新套装组件
        private updateSuitItem(): void {
            let data = this._showArgs.data;
            let operType = this._showArgs.operType;
            let typeCfg = this._proxy.getSuitTypeCfg(data.type);
            let partList = typeCfg ? typeCfg.suit_part[operType - 1] : [];//对应的套装组成
            if (!partList) {
                DEBUG && console.error(`${SuitTypeName[data.type]}套装没有此${data.pos}部位的套装组成`);
                return;
            }
            let partId = partList[0];//此部位所属套装index
            let cfg: SuitPartConfig;//对应的套装组成配置
            for (let idx of partList) {
                cfg = this._proxy.getSuitPartCfg(idx);
                let posList = cfg && cfg.pos ? cfg.pos : [0];//特殊处理，0不导出
                if (posList.indexOf(data.pos) > -1) {
                    partId = idx;
                    break;
                }
            }

            this.doAdd(this._suitItem);
            let operInfo = this._proxy.getSuitOperInfo(data.type, operType);
            let minLv: number;//套装部位的最低等级
            let posMap: { [pos: number]: number } = {};
            let suitPosList = cfg.pos || [0];//当前部位对应的套装的部位组成，特殊处理0不导出
            let actCnt = 0;//套装部位组成中已激活的部位长度
            if (operInfo && operInfo.attr_list) {
                for (let item of operInfo.attr_list) {
                    if (suitPosList.indexOf(item.pos) < 0) {
                        continue;
                    }
                    if (!minLv) {
                        minLv = item.lv;
                    }
                    posMap[item.pos] = item.lv;
                    actCnt++;
                }
            }

            let showNextLv: number;//下一阶的属性展示
            if (!minLv || actCnt != suitPosList.length) {
                minLv = 1;//有未激活的部位
                showNextLv = 1;
            } else {
                showNextLv = minLv + 1;
            }
            let str = '';
            let satisfyCnt = 0;
            for (let i = 0; i < suitPosList.length; i++) {
                let pos = suitPosList[i];
                if (posMap[pos] >= minLv) {
                    satisfyCnt++;
                }
                let txt = `[${minLv}阶]` + this.getEquipName(data.type, operType, suitPosList[i]);
                if (posMap[pos] != null) {
                    str += TextUtil.addColor(txt, BlackColor.GREEN);
                } else {
                    str += TextUtil.addColor(txt, BlackColor.GRAY);
                }
                if (i != suitPosList.length - 1) {
                    str += '\n';
                }
            }

            let itemName = `${minLv}阶${cfg.name}(${satisfyCnt}/${suitPosList.length})`;
            this._suitItem.updateShow(str, itemName);

            let showNextAttr: number[];
            if (cfg.attribute_id) {
                if (showNextLv >= cfg.attribute_id.length) {
                    showNextAttr = cfg.attribute_id[cfg.attribute_id.length - 1];//最后一阶
                } else {
                    showNextAttr = cfg.attribute_id[showNextLv - 1];
                }
            }
            this._nextStageLv = showNextLv;
            this._nextStageAttrIds = showNextAttr;
            if (showNextAttr && showNextAttr.length) {
                this.updateNextStageItem(RoleUtil.getAttrList(showNextAttr));
            }

            if (cfg.buff_id) {
                let buffId = cfg.buff_id[minLv - 1][0];
                let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
                if (buffCfg) {
                    this.doAdd(this._buffItem);
                    this._buffItem.updateShow(buffCfg.des, buffCfg.name);
                }
            } else if (cfg.skill_id) {
                let skillId = cfg.skill_id[minLv - 1][0];
                let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                if (skillCfg) {
                    this.doAdd(this._buffItem);
                    this._buffItem.updateShow(skillCfg.describe, skillCfg.name);
                }
            }
        }

        //下一阶的属性效果展示
        private _nextStageAttrIds: number[];
        private _nextStageLv: number;

        //下一阶套装效果属性
        private updateNextStageItem(attr: attributes[]): void {
            if (!attr) {
                return;
            }
            let attrStr = TextUtil.getAttrTextAdd(TextUtil.calcAttrList(attr));
            let title = `${SuitTypeName[this._showArgs.data.type]}套装 ${this._nextStageLv}阶效果`;
            this._nextStageItem.updateShow(attrStr, title);
            // this.doAdd(this._nextStageItem); //todo 不展示下一阶套装效果属性
        }

        private getEquipName(type: SuitType, operType: SuitOperType, pos: EquipPos): string {
            if (operType == SuitOperType.DuanZao) {
                operType = SuitOperType.JinJie;
            }
            let index = this._proxy.getIndex2(type, pos, operType);
            let equipCfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, index);
            return equipCfg && equipCfg.name || '';
        }

        //更新需要动态加载的属性
        private onUpdateAttr(): void {
            if (this._actAttrId) {
                this.updateBaseAttrView(RoleUtil.getAttr(this._actAttrId));
                this._actAttrId = null;
            }
            if (this._nextStageAttrIds) {
                this.updateNextStageItem(RoleUtil.getAttrList(this._nextStageAttrIds));
                this._nextStageAttrIds = null;
            }
        }

        //更新基础属性，未激活时候
        private updateBaseAttrView(attr: attributes): void {
            if (!attr) {
                this.updatePower(0);
                return;
            }
            let data = this._showArgs.data;
            attr = this._proxy.getFilterAttr(data.type, data.pos, attr);
            this._attrItem3.updateShow(attr, null, getLanById(LanDef.ywl_baseAttr));
            this.updatePower(attr && attr.showpower || 0);
        }

        private updatePower(power: Long | number): void {
            this._view.power.setPowerValue(power);
        }

        private onClickAct(): void {
            if (this._posEquip) {
                return;
            }
            let data = this._showArgs.data;
            if (this._showArgs.operType == SuitOperType.JingZhu) {
                if (!this._proxy.canDress(data.index, true, SuitOperType.JingZhu)) {
                    return;
                }
                //精铸的激活，就是提升等级
                this._proxy.c2s_suit_two_equip_lvup(0, SuitOperType.JingZhu, data.type, data.pos);
            } else {
                if (!this._proxy.canDress(data.index, true)) {
                    return;
                }
                this._proxy.c2s_suit_two_equip_takeon(data.type, data.pos, data.index);
            }
        }

        private onClickUp(): void {
            let data = this._showArgs.data;
            let operType = this._showArgs.operType;
            let canUp = false;
            if (operType == SuitOperType.JinJie) {
                canUp = this._proxy.canAdvance(data.type, data.pos, true);
            } else if (operType == SuitOperType.JingZhu) {
                canUp = this._proxy.canCast(data.type, data.pos, true);
            }
            canUp && this._proxy.c2s_suit_two_equip_lvup(0, this._showArgs.operType, data.type, data.pos);
        }

        protected onHide(): void {
            super.onHide();
            this._posEquip = null;
            this._actAttrId = null;
            this._isDressed = false;
            this.doRemove(this._attrItem3);
            this._attrItem3 = null;
            this.doRemove(this._suitItem);
            this._suitItem = null;
            this.doRemove(this._nextStageItem);
            this._nextStageItem = null;
            this.doRemove(this._buffItem);
            this._buffItem = null;
        }

        private doRemove(item: egret.DisplayObject): void {
            if (item && item.parent) {
                item.parent.removeChild(item);
            }
        }

        private doAdd(item: egret.DisplayObject, idx?: number): void {
            if (this._view.gr_attr.contains(item)) {
                return;
            }
            if (idx != null) {
                this._view.gr_attr.addChildAt(item, idx);
            } else {
                this._view.gr_attr.addChild(item);
            }
        }
    }
}