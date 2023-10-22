namespace game.mod.more {

    export class ZhanduiConstructView extends eui.Component {
        public img_flag: eui.Image;
        public lb_lv: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public btn_go: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public list_reward: eui.List;
        public btn_get: game.mod.Btn;
        public img_got: eui.Image;
        public img_got1: eui.Image;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiConstructSkin";
        }
    }
}