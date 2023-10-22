namespace game.mod.activity {

    export class ShenlingGiftView extends eui.Component {
        public icon: game.mod.Icon;
        public list: eui.List;
        public btn_close: game.mod.Btn;
        public btn_buy: game.mod.Btn;
        public img_type: eui.Image;
        public img_name: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.ShenlingGiftSkin";
        }
    }
}