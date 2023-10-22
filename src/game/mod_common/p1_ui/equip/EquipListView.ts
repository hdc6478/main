namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 通用装备列表组件
     */
    export class EquipListView extends eui.Component {
        public list_equip: eui.List;
        private _equipList: ArrayCollection;
        private _equipProxy: IEquipProxy;
        private _lastSelPos: number;

        constructor() {
            super();
            this.skinName = "skins.common.EquipListSkin";
            this.touchEnabled = false;

            this._equipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.initEquipList();
        }

        private onRemove() {
        }

        private initEquipList(): void {
            this._equipList = new ArrayCollection();
            this.list_equip.itemRenderer = IconEquip;
            this.list_equip.dataProvider = this._equipList;
            this._lastSelPos = -1;
        }

        private getBtnData(pos: number): IconEquipData {
            let list: IconEquipData[]  = this._equipList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if(!btnData.prop){
                    continue;
                }
                let equipPos = btnData.prop instanceof PropData ? btnData.prop.equipPos : btnData.prop;
                if(equipPos == pos){
                    return btnData;
                }
            }
            return null;
        }

        /**刷新装备显示*/
        public updateEquip(lvList?: number[]): void {
            let list: IconEquipData[] = [];
            for (let i = 0; i < EquipPosAry.length; ++i) {
                let pos = EquipPosAry[i];
                let equip = this._equipProxy.getEquipByPos(pos);
                let prop = equip ? equip : pos;
                let data: IconEquipData = this._equipList.source && this._equipList.source.length ? this._equipList.source[i] : {};
                data.prop = prop;
                if(lvList && lvList[i]){
                    data.lv = lvList[i];
                }
                list.push(data);
            }
            this._equipList.replaceAll(list);
        }

        /**刷新装备红点，红点逻辑自己判断*/
        public updateHint(hints: boolean[]): void {
            let list: IconEquipData[]  = this._equipList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len && i < hints.length; i++) {
                let btnData = list[i];
                let hint = hints[i];
                if(!!btnData.showHint != hint){//过滤undefined!=false
                    btnData.showHint = hint;
                    this._equipList.itemUpdated(btnData);
                }
            }
        }

        /**刷新装备选中，选中逻辑自己判断，selList是所有数据*/
        public updateSel(selList: boolean[]): void {
            let list: IconEquipData[]  = this._equipList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len && i < selList.length; i++) {
                let btnData = list[i];
                let sel = selList[i];
                if(!!btnData.sel != sel){//过滤undefined!=false
                    btnData.sel = sel;
                    this._equipList.itemUpdated(btnData);
                }
            }
        }

        /**刷新装备选中，pos是需要选中的部位：EquipPosAry*/
        public updateSelByPos(pos: number): void {
            if(pos == this._lastSelPos){
                return;
            }
            let selList: IconEquipSelData[] = [];
            if(this._lastSelPos >= 0){
                selList.push({pos: this._lastSelPos, sel: false});
            }
            selList.push({pos: pos, sel: true});
            this._lastSelPos = pos;

            let len: number = selList ? selList.length : 0;
            for (let i = 0; i < len; i++) {
                let selInfo = selList[i];
                let sel = selInfo.sel;
                let btnData = this.getBtnData(selInfo.pos);
                if(btnData && !!btnData.sel != sel){//过滤undefined!=false
                    btnData.sel = sel;
                    this._equipList.itemUpdated(btnData);
                }
            }
        }
    }
}