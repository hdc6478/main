namespace game.mod.activity {

    export class XianlvGiftView extends eui.Component {
        public list: eui.List;
        public img_bought: eui.Image;
        public btn_buy: game.mod.Btn;
        public btn_close: game.mod.Btn;
        public img_name0: eui.Image;
        public img_name1: eui.Image;
        public img_name2: eui.Image;
        public img_desc0: eui.Image;
        public img_desc1: eui.Image;
        public btn1: game.mod.Btn;
        public btn2: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.XianlvGiftSkin";
        }
    }
}