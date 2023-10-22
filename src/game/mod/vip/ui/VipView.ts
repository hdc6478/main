namespace game.mod.vip {

    export class VipView extends eui.Component {
        public btn_left: game.mod.Btn;
        public btn_right: game.mod.Btn;
        public list_reward: eui.List;
        public lb_privilege: eui.Label;
        public gr_eff: eui.Group;
        public barComp: game.mod.vip.VipBarComp;
        public effComp: game.mod.vip.VipEffComp;
        public img_vipdesc: eui.Image;
        public img_next: eui.Label;
        public btn_buy: game.mod.Btn;
        public lb_time: eui.Label;
        public btn_go: game.mod.Btn;
        public lb_privilegecnt: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.vip.VipSkin";
        }
    }
}