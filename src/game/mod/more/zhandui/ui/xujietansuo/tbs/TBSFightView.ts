namespace game.mod.more {

    export class TBSFightView extends eui.Component {
        public grp1: eui.Group;
        public lab_name1: eui.Label;
        public img_hp1: eui.Image;
        public head1: game.mod.HeadVip;
        public grp_power1: eui.Group;

        public grp2: eui.Group;
        public lab_name2: eui.Label;
        public img_hp2: eui.Image;
        public head2: game.mod.HeadVip;
        public img_boss2: eui.Image;
        public grp_power2: eui.Group;

        public grp3: eui.Group;
        public img_vs: eui.Image;
        public gr_eft2: eui.Group;
        public gr_eft: eui.Group;

        public btn_skip: game.mod.Btn;

        public gr_model0: eui.Group;
        public gr_model1: eui.Group;

        public grp_tips: eui.Group;
        public grp_lv: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.more.TBSFightSkin";
            this.gr_model0.touchEnabled = false;
            this.gr_model1.touchEnabled = false;
        }
    }
}