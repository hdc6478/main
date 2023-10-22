namespace game.mod {

    export class IconSelMany extends eui.ItemRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public img_sel: eui.Image;
        public img_true: eui.Image;

        public data: IconSelManyData;

        constructor() {
            super();
            this.skinName = "skins.common.IconSelManySkin";
            this.touchEnabled = false;
        }

        protected dataChanged(): void {
            if (this.data == null) {
                this.icon.defaultIcon();
                this.img_sel.visible = this.redPoint.visible = this.img_true.visible = false;
                return;
            }
            if (this.data.showHint != undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            if (this.data.prop != undefined) {
                this.icon.setData(this.data.prop, IconShowType.NotTips);
            }
            if (this.data.sel != undefined) {
                this.img_sel.visible = this.data.sel;
            }
            if (this.data.selTrue != undefined) {
                this.img_true.visible = this.data.selTrue;
            }
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: IconSelManyData): void {
            this.data = data;
        }
    }

}