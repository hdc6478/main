namespace game.mod.more {

    export class HuanjingCollectView extends eui.Component {
        public btn0: game.mod.Btn;
        public btn1: game.mod.Btn;
        public btn2: game.mod.Btn;
        public btn3: game.mod.Btn;
        public lb_name: eui.Label;
        public scroller: eui.Scroller;
        public list: eui.List;
        public skillItem: game.mod.SkillItemRender;
        public img_name: eui.Image;
        public img_title: eui.Image;
        public gr_font: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingCollectSkin";
        }
    }
}