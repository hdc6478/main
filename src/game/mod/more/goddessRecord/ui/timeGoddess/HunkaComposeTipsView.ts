namespace game.mod.more {

    export class HunkaComposeTipsView extends eui.Component {
        public grp_type: eui.Group;
        public img_icon: eui.Image;
        public starListView: StarListView;
        public grp_name: eui.Group;
        public lab_name: eui.Label;
        public img_success: eui.Image;
        public hunkaScore: HunkaScore;
        public hunkaAttrListView: HunkaAttrListView;
        public grp_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaComposeTipsSkin";
        }
    }

}