namespace game.mod {

    export class SkillConditionTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public skill: game.mod.SkillItemRender;
        public lab_name: eui.Label;
        public img_type: eui.Image;
        public baseDescItem: game.mod.BaseDescItem;
        public img_act: eui.Image;
        public lb_act: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.SkillConditionTipsSkin";
        }
    }
}