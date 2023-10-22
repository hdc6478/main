namespace game.mod {

    /**
     * 升星界面
     */
    export class UpStarTipsView extends eui.Component {
        public img_bg: eui.Image;
        public grp_eft2: eui.Group;
        public img_title: eui.Image;
        public grp_eft: eui.Group;
        public grp_starlist: eui.Group;
        public starListView1: game.mod.StarListView;
        public starListView2: game.mod.StarListView;
        public grp_desc1: eui.Group;
        public lab_desc1: eui.Label;
        public grp_lv1: eui.Group;
        public grp_desc2: eui.Group;
        public lab_desc2: eui.Label;
        public grp_lv2: eui.Group;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.common.UpStarTipsSkin";
        }
    }
}