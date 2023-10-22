namespace game.mod.activity {

    export class ZcxView1 extends eui.Component {
        public list: eui.List;
        public btn_get: game.mod.Btn;
        public gr_num: eui.Group;
        public btn_winner: game.mod.Btn;
        public lb_rank: eui.Label;
        public gr_eff0: eui.Group;
        public gr_eff1: eui.Group;
        public gr_eff2: eui.Group;
        public gr_eff3: eui.Group;
        public gr_eff4: eui.Group;
        public gr_eff5: eui.Group;

        public lb0: eui.Label;
        public lb1: eui.Label;
        public lb2: eui.Label;
        public lb3: eui.Label;
        public lb4: eui.Label;
        public lb5: eui.Label;
        public redPoint: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxSkin1";
        }
    }
}