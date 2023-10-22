namespace game.mod.activity {

    export class YjjsView3 extends eui.Component {
        public lb_go: eui.Label;
        public btn_challenge: game.mod.Btn;
        public img_finished:eui.Image;
        public icon: game.mod.Icon;
        public gr_eff: eui.Group;
        public lb_lvdesc: eui.Label;
        public lb_vipdesc: eui.Label;
        public list: eui.List;
        public bar: game.mod.ProgressBarComp;
        public gr_font: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.YjjsSkin3";
        }
    }
}