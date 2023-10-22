namespace game.mod.bag {

    export class MeltTipsView extends eui.Component {
        public grp_eft2: eui.Group;
        public img_type: eui.Image;
        public grp_eft: eui.Group;
        public icon: Icon;
        public lab_cnt: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.bag.MeltTipsSkin";
        }
    }

}