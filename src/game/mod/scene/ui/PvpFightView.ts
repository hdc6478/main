namespace game.mod.scene {

    export class PvpFightView extends eui.Component {
        public grp1: eui.Group;
        public lab_name1: eui.Label;
        public powerLabel1: game.mod.PowerLabel;
        public img_hp1: eui.Image;
        public head1: game.mod.HeadVip;

        public grp2: eui.Group;
        public lab_name2: eui.Label;
        public powerLabel2: game.mod.PowerLabel;
        public img_hp2: eui.Image;
        public head2: game.mod.HeadVip;

        public grp3: eui.Group;
        public img_vs: eui.Image;
        public gr_eft: eui.Group;
        public gr_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.scene.PvpFightSkin";
        }
    }

}