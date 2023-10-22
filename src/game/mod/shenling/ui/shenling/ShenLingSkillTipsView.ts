namespace game.mod.shenling {

    export class ShenLingSkillTipsView extends eui.Component {
        public tips: game.mod.BaseQualityTips;
        public icon: game.mod.ShenLingSkillIcon;
        public lb_name: eui.Label;
        public img_showType: eui.Image;
        public scroller: eui.Scroller;
        public gr_attr: eui.Group;
        public lb_actDesc: eui.Label;
        public img_acted: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingSkillTipsSkin";
        }
    }
}