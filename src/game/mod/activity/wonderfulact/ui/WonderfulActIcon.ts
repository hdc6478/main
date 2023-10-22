namespace game.mod.activity {

    export class WonderfulActIcon extends BaseListenerRenderer {
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = 'skins.activity.WonderfulActIconSkin';
        }

        protected dataChanged(): void {
            let data = this.data as number;
            this.img_icon.source = data == 1 ? 'baoxiang_dakai' : 'baoxiang';
        }
    }
}