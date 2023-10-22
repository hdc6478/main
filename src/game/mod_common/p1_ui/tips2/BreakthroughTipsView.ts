namespace game.mod {

    /**
     * 突破界面
     */
    export class BreakthroughTipsView extends eui.Component {
        public img_bg: eui.Image;
        public grp_eft2: eui.Group;
        public img_title: eui.Image;
        public grp_eft: eui.Group;
        public grp_show: eui.Group;
        public grp_lv1: eui.Group;
        public grp_lv2: eui.Group;
        public skill: game.mod.SkillItemRender;
        public grp_desc: eui.Group;
        public lab_name: eui.Label;
        public lab_desc: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.common.BreakthroughTipsSkin";
        }
    }
}