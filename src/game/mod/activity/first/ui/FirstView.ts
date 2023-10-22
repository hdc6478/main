namespace game.mod.activity {

    export class FirstView extends eui.Component {

        public grp_eff: eui.Group;
        public list: eui.List;
        public btn: Btn;
        public img_bg: eui.Image;
        public list_type: eui.List;
        public lab_price: eui.Label;
        public btn_close: Btn;
        public img_got: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.FirstSkin";
            this.touchEnabled = false;
        }
    }

}