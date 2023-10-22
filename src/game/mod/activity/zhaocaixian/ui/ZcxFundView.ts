namespace game.mod.activity {

    export class ZcxFundView extends eui.Component {
        public btn_buy: game.mod.Btn;
        public list: eui.List;
        public btn_gift: game.mod.Btn;
        public btnTipsBase: game.mod.BtnTipsBase;
        public lb_desc: eui.Label;
        public scroller: eui.Scroller;
        public img_fundtype: eui.Image;
        public img_baoxiang: eui.Image;
        public gr_font1: eui.Group;
        public gr_font2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxFundSkin";
        }
    }
}