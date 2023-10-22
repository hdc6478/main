namespace game.mod.more {

    export class ZhanduiFlagView extends eui.Component {
        public lb_name: eui.Label;
        public img_flag: eui.Image;
        public img_di: eui.Image;
        public lb_desc: eui.Label;
        public scroller: eui.Scroller;
        public list: eui.List;
        public btn_use: game.mod.Btn;
        public lb_actCond: eui.Label;
        public img_used: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiFlagSkin";
        }
    }
}