namespace game.mod {

    export class BaseGiftDrawView extends eui.Component {
        public img_banner: eui.Image;
        public timeItem: game.mod.TimeItem;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.common.BaseGiftDrawViewSkin";
        }
    }
}