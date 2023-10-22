namespace game.mod {
    import LanDef = game.localization.LanDef;
    import attributes = msg.attributes;

    /**
     * 基础道具描述组件
     */
    export class BaseAttrItem extends eui.Component {
        private baseNameItem: BaseNameItem;
        private list_attr: AttrListView;

        constructor() {
            super();
            this.skinName = "skins.common.BaseAttrItemSkin";
        }

        /**
         * @param attr 属性
         * @param showAdd 是否显示+号属性
         * @param title 描述标题，默认：基础属性
         */
        public updateShow(attr: attributes, showAdd: boolean = false, title: string = getLanById(LanDef.ywl_baseAttr), color?: number): void {
            if (showAdd) {
                this.list_attr.updateAttrAdd(attr, color || BlackColor.GREEN, "\n", " +", color || BlackColor.DEFAULT);
            } else {
                this.list_attr.updateAttr(attr, color || BlackColor.GREEN, "\n", ": ", color || BlackColor.DEFAULT);
            }
            this.baseNameItem.setTitle(title);
        }
    }
}