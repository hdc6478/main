namespace game.mod.activity {

    export class TehuiLibaoView extends eui.Component {

        public img_bg: eui.Image;
        public img_zhekou: eui.Image;
        public list: eui.List;
        public btn: Btn;
        public timeItem: TimeItem;
        public btn_close: Btn;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.TehuiLibaoSkin";
        }
    }
}