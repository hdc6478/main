namespace game.mod {

    /**神灵类型按钮*/
    export class ShenlingTypeBtn extends BaseListenerRenderer {

        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenLingShangZhenBtnSkin`;
        }

        protected dataChanged(): void {
            let data = this.data as number;
            if (data == null) {
                return;
            }
            this.img_icon.source = `shuxingtubiao_${data}`;
        }
    }
}