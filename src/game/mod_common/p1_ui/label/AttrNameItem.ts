namespace game.mod {

    import LanDef = game.localization.LanDef;

    /**
     * 属性面板的属性项标题
     */
    export class AttrNameItem extends BaseStageEventItem {
        public lb_name: eui.Label;
        private _titleStr: string;//标题文字，提示表字段

        constructor() {
            super();
            this.skinName = `skins.common.AttrNameItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.updateTitleSrc();
        }

        /**皮肤设置标题用*/
        public set titleStr(str: string) {
            this._titleStr = str;
        }

        private updateTitleSrc() {
            if (this._titleStr) {
                let strList = this._titleStr.split(",");
                let allStr = "";
                for (let str of strList) {
                    allStr += getLanById(str);
                }
                this.lb_name.text = allStr;
            }
        }

        /**
         * 设置属性项标题
         * @param str 默认基础属性
         */
        setTitle(str: string = getLanById(LanDef.ywl_baseAttr)): void {
            this.lb_name.textFlow = TextUtil.parseHtml(str);
        }
    }

}