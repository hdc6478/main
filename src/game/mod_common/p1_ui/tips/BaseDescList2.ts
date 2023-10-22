namespace game.mod {
    import LanDef = game.localization.LanDef;
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 基础道具描述组件
     */
    export class BaseDescList2 extends eui.Component {
        private baseNameItem: BaseNameItem;
        private list_desc: eui.List;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.BaseDescListSkin2";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        private onAddToStage() {
            if (!this._attrList) {
                this._attrList = new ArrayCollection();
            }
            this.list_desc.itemRenderer = BaseZhuangShiDescItem;
            this.list_desc.dataProvider = this._attrList;
        }

        private onRemoveFromStage(): void {
            this._attrList.removeAll();
        }

        /**
         * @param descList 文本描述
         * @param title 描述标题，默认：基础属性
         */
        public updateShow(descList: string[][], title: string = getLanById(LanDef.ywl_baseAttr)): void {
            this.baseNameItem.setTitle(title);
            this._attrList.replaceAll(descList);
        }
    }
}