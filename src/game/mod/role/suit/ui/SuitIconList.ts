namespace game.mod.role {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import EquipmentConfig = game.config.EquipmentConfig;
    import JumpConfig = game.config.JumpConfig;

    export class SuitIconList extends eui.Component {
        public list: eui.List;

        private _listData: ArrayCollection;
        private _proxy: SuitProxy;
        private _type: SuitType;
        // 套装类型1,2  1进阶，2强化
        // 套装类型3,4,5，SuitOperType 1进阶2锻造3精铸
        private _operType = 1;
        private _selIconIdx: number;//当前icon选择，锻造才需要

        constructor() {
            super();
            this.skinName = "skins.role.SuitIconListSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Role, ProxyType.Suit);
            this.list.itemRenderer = SuitIcon;
            this.list.dataProvider = this._listData = new ArrayCollection();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
        }

        /**
         * @param type SuitType 1,2
         * @param operType SuitOperType
         */
        public updateView(type: SuitType, operType = SuitOperType.JinJie): void {
            this._type = type;
            this._operType = operType;
            let list: ISuitIconData[] = [];
            for (let pos of SuitEquipPosAry) {
                let equip = this._proxy.getPosEquipInfo(type, pos);
                let index = equip ? equip.equipment_id.toNumber() : this._proxy.getIndexForBag(type, pos);
                let cond: string;
                if (!index) {
                    index = this._proxy.getIndex(type, 1, pos);
                    cond = this.getOpenCond(index, operType);
                }
                let d: ISuitIconData = {
                    type: type,
                    operType: operType,
                    pos: pos,
                    index: index,
                    cond: cond,
                    isAct: !!equip,
                    showHint: this._proxy.getSuitIconHint(type, operType, pos),
                    stage: equip && equip.stage ? equip.stage : 0, //阶数
                    level: equip && equip.level ? equip.level : 0  //强化等级
                };
                list.push(d);
            }
            this._listData.replaceAll(list);
        }

        /**
         * @param type SuitType 3,4,5
         * @param operType SuitOperType
         */
        public updateView2(type: SuitType, operType: SuitOperType): void {
            this._type = type;
            this._operType = operType;
            let list: ISuitIconData[] = [];
            let iconData: ISuitIconData;
            //进阶激活，锻造就激活了。精铸另外激活
            let oType = operType != SuitOperType.JingZhu ? SuitOperType.JinJie : SuitOperType.JingZhu;
            for (let i = 0; i < SuitEquipPosAry1.length; i++) {
                let pos = SuitEquipPosAry1[i];
                let operData = this._proxy.getPosEquipInfo2(type, pos, oType);//进阶或精铸
                let operData1 = this._proxy.getPosEquipInfo2(type, pos, operType);//对应操作类型数据
                let lv = operData1 && operData1.lv || 0;//对应操作类型的等级
                let index = this._proxy.getIndex2(type, pos, oType);//装备id
                let cond: string;
                let isAct = operData && operData.lv > 0;
                if (!isAct) {
                    cond = this.getOpenCond(index, operType);
                }
                let item: ISuitIconData = {
                    type: type,
                    operType: operType,
                    pos: pos,
                    index: index,
                    isAct: isAct,
                    stage: lv,
                    showHint: this._proxy.getSuitIconHint(type, operType, pos),
                    cond: cond
                };
                list.push(item);
                if (!iconData && operData) {
                    iconData = item;
                    this._selIconIdx = i;
                }
            }
            this._listData.replaceAll(list);
            //选择第一个已穿戴的icon数据
            if (iconData) {
                facade.sendNt(SuitEvent.ON_SUIT_DUANZAO_SWITCH_ICON_INFO, iconData);
                if (operType == SuitOperType.DuanZao) {
                    this.updateIconSel(this._selIconIdx, true);
                }
            }
        }

        /**
         * 激活条件
         * 类型1,2，读取跳转路径
         * 类型3,4,5，读取装备穿戴条件
         * @param index
         * @param operType
         * @private
         */
        private getOpenCond(index: number, operType: SuitOperType): string {
            if (operType != SuitOperType.JinJie) {
                return null;
            }
            //已有这件装备，不需要展示条件
            if (BagUtil.checkPropCnt(index, 1)) {
                return null;
            }

            let equipCfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, index);
            if (this._type <= SuitType.YanTian && equipCfg.gain_id[0]) {
                let jumpCfg: JumpConfig = getConfigByNameId(ConfigName.Jump, equipCfg.gain_id[0]);
                if (jumpCfg) {
                    return jumpCfg.name;
                }
                return null;
            }

            let cond: string;
            if (equipCfg && equipCfg.wear_condition) {
                let fbdCfgs = getConfigByNameId(ConfigName.ForbiddenGate, equipCfg.wear_condition[0]);
                let fbdCfg = fbdCfgs ? fbdCfgs[equipCfg.wear_condition[1]] : null;
                if (fbdCfg) {
                    cond = `${equipCfg.wear_condition[0] % 100}章${fbdCfg.gate_id}关`;
                }
            }
            return cond;
        }

        /**更新红点*/
        public updateListHint(): void {
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let data = this._listData.source[i] as ISuitIconData;
                if (!data) {
                    continue;
                }
                data.showHint = this._proxy.getSuitIconHint(this._type, this._operType, data.pos);
                this._listData.itemUpdated(data);
            }
        }

        private onClick(e: eui.ItemTapEvent): void {
            let data = e.item as ISuitIconData;
            if (!!data.cond) {
                return;
            }

            if (this._type < SuitType.HaoTian) {
                //1,2套装
                if (this._operType == 1) {
                    if (!data.isAct && !BagUtil.checkPropCnt(data.index, 1, PropLackType.Dialog)) {
                        return;
                    }
                    facade.showView(ModName.Role, NewRoleViewType.SuitEquipTips, data);
                } else {
                    if (!data.isAct) {
                        return;
                    }
                    facade.showView(ModName.Role, NewRoleViewType.SuitEquipStrengthenTips, data);
                }
            } else {
                //3,4,5套装
                if (this._operType == SuitOperType.DuanZao && !data.isAct) {
                    return;
                }
                if (this._operType == SuitOperType.JinJie && !data.isAct && !BagUtil.checkPropCnt(data.index, 1, PropLackType.Dialog)) {
                    return;
                }
                if (this._operType == SuitOperType.DuanZao) {//锻造点击不需要弹出tips
                    facade.sendNt(SuitEvent.ON_SUIT_DUANZAO_SWITCH_ICON_INFO, data);
                    this.updateIconSel(this._selIconIdx, false);
                    this._selIconIdx = e.itemIndex;
                    this.updateIconSel(this._selIconIdx, true);
                    return;
                }
                if (!data.isAct && !BagUtil.checkPropCnt(data.index, 1, PropLackType.Dialog)) {
                    return;
                }
                facade.showView(ModName.Role, NewRoleViewType.SuitEquipTips2, {data, operType: this._operType});
            }
        }

        /**设置选中*/
        private updateIconSel(index: number, isSel = false): void {
            if (index != null && this._listData.source[index]) {
                let iconData = this._listData.source[index] as ISuitIconData;
                iconData.isSel = isSel;
                this._listData.itemUpdated(iconData);
            }
        }

        // 锻造一次后，自动选择锻造等级最低那个
        public updateMinForgeLv(): void {
            if (this._selIconIdx == null || this._operType != SuitOperType.DuanZao) {
                return;
            }
            let data = this._listData.source[this._selIconIdx] as ISuitIconData;
            let operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, SuitOperType.DuanZao);
            data.stage = operInfo && operInfo.lv || 0;
            this._listData.itemUpdated(data);

            let size = this._listData.source.length;
            let minLv: number = 100000;
            let minIdx: number = 0;
            for (let i = 0; i < size; i++) {
                let d = this._listData.source[i] as ISuitIconData;
                if (d.isAct && d.stage < minLv) {
                    minLv = d.stage;
                    minIdx = i;
                }
            }
            if (this._selIconIdx != minIdx) {
                this.updateIconSel(this._selIconIdx, false);
                this._selIconIdx = minIdx;
                this.updateIconSel(this._selIconIdx, true);
            }
            facade.sendNt(SuitEvent.ON_SUIT_DUANZAO_SWITCH_ICON_INFO, this._listData.source[minIdx]);
        }
    }
}