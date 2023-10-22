namespace game.mod {

    export class SurfaceGiftView extends eui.Component {
        public img_bg: eui.Image;
        public icon: game.mod.Icon;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfaceGiftSkin";
        }
    }

}