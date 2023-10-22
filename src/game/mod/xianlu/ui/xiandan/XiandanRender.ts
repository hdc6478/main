namespace game.mod.xianlu {

    export class XiandanRender extends eui.ItemRenderer {
        public img_bg1: eui.Image;
        public img_bg2: eui.Image;
        public lab_desc: eui.Label;
        public data: string;//当前重数
        private _isUp: boolean;

        protected dataChanged(): void {
            this.lab_desc.textFlow = TextUtil.parseHtml(this.data);
        }

        public set isUp(isUp: boolean) {
            this._isUp = isUp;
            this.img_bg1.visible = isUp;
            this.img_bg2.visible = !isUp;
        }
        public get isUp():boolean {
            return this._isUp;
        }

    }
}