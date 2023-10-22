namespace game.mod.xianlu {

    export class XiuxianBreakTipsView extends eui.Component {
        public img_bg: eui.Image;
        public grp_eft2: eui.Group;
        public img_title: eui.Image;
        public grp_eft: eui.Group;
        public grp_show: eui.Group;
        public grp_lv1: eui.Group;
        public grp_lv2: eui.Group;
        public lab_desc1: eui.Label;
        public lab_desc2: eui.Label;
        public item1: XiuxianXianpoRender;
        public item2: XiuxianXianpoRender;
        public grp_open: eui.Group;
        public list_item: eui.List;
        public closeTips: game.mod.CloseTips;


        constructor() {
            super();
            this.skinName = "skins.xianlu.XiuxianBreakTipsSkin";
        }
    }

}