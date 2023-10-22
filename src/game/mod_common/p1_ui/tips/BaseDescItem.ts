namespace game.mod {
    import LanDef = game.localization.LanDef;

    /**
     * 基础道具描述组件
     */
    export class BaseDescItem extends BaseRenderer {
        private baseNameItem: BaseNameItem;
        private lab_desc: eui.Label;
        private _descY: number = 45;
        private _lineSpacing: number = 10;

        public data: { desc: string, title: string, lineSpacing?: number, color: number };

        constructor() {
            super();
            this.skinName = "skins.common.BaseDescItemSkin";
        }

        protected dataChanged(): void {
            let {desc, title, lineSpacing, color} = {...this.data};
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);
            this.baseNameItem.setTitle(title);
            if (lineSpacing != undefined && lineSpacing != this._lineSpacing) {
                this.lab_desc.lineSpacing = lineSpacing;
                this.lab_desc.y = this._descY + lineSpacing - this._lineSpacing;
            }
            if (color) {
                this.lab_desc.textColor = color;
            }
        }

        /**
         * @param desc 描述文本
         * @param title 描述标题，默认：道具描述
         * @param lineSpacing 描述的间距，默认10
         */
        public updateShow(desc: string, title: string = getLanById(LanDef.prop_desc_tips), lineSpacing: number = 10, color: number = BlackColor.DEFAULT): void {
            this.data = {desc, title, lineSpacing, color};
        }
    }
}