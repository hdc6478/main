namespace game.mod.pass {

    export class PassRankView extends eui.Component {

        public gr_gz_eff: eui.Group;
        public scr: eui.Scroller;
        public list: eui.List;
        public lab_my_rank: eui.Label;
        public lab_my_step: eui.Label;
        public btn_record: game.mod.Btn;
        public grp_font:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.pass.PassRankSkin";
            this.touchEnabled = false;
            this.gr_gz_eff.touchEnabled = false;
        }

    }
}