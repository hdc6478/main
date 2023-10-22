namespace game.mod {
    import LanDef = game.localization.LanDef;
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;
    /**
     * 基础道具来源列表组件
     */
    export class BasePropGainList extends eui.Component {
        private baseNameItem: BaseNameItem;
        private list_item: eui.List;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.BasePropGainListSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.initAttrList();
        }

        private onRemove() {
        }

        private initAttrList(): void {
            if(!this._attrList){
                this._attrList = new ArrayCollection();
            }
            this.list_item.itemRenderer = BasePropGainItem;
            this.list_item.dataProvider = this._attrList;
        }

        /**
         * @param gainList 获取途径跳转ID
         * @param title 描述标题，默认：获取途径
         */
        public updateShow(gainList: number[], title: string = getLanById(LanDef.bag_cue21)): void {
            if(!gainList || !gainList.length){
                this.visible = false;//只做隐藏，不做移除，需要的话再扩展接口
                return;
            }
            this.visible = true;
            if (!this._attrList) {
                this.initAttrList();
            }
            this.baseNameItem.setTitle(title);
            let itemList = gainList || [];
            this._attrList.source = itemList;
        }
    }
}