namespace game.mod {

    import attributes = msg.attributes;
    import LanDef = game.localization.LanDef;

    /**
     * 带有属性提升值的属性组件
     */
    export class BaseAttrItemAdd extends eui.Component {
        public baseNameItem: game.mod.BaseNameItem;
        public list_attr: game.mod.AttrListAddView;

        constructor() {
            super();
            this.skinName = "skins.common.BaseAttrItemAddSkin";
        }

        /**
         * 带有提升属性的
         * @param attr
         * @param next_attr
         * @param title
         */
        public updateShow(attr: attributes, next_attr: attributes, title = getLanById(LanDef.ywl_baseAttr)): void {
            this.baseNameItem.setTitle(title);
            this.list_attr.updateShow(attr, next_attr);
        }
    }
}