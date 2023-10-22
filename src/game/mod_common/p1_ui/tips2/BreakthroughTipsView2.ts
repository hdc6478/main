namespace game.mod {

    export class BreakthroughTipsView2 extends eui.Component {
        public img_bg: eui.Image;
        public grp_eft2: eui.Group;
        public img_title: eui.Image;
        public grp_eft: eui.Group;
        public grp_show: eui.Group;
        public grp_lv1: eui.Group;
        public grp_lv2: eui.Group;
        public skill1: game.mod.SkillItemRender;
        public skill2: game.mod.SkillItemRender;
        public grp_desc1: eui.Group;
        public lab_lv1: eui.Label;
        public lab_name1: eui.Label;
        public lab_desc1: eui.Label;
        public grp_desc2: eui.Group;
        public lab_lv2: eui.Label;
        public lab_name2: eui.Label;
        public lab_desc2: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.common.BreakthroughTipsSkin2";
        }
    }
}