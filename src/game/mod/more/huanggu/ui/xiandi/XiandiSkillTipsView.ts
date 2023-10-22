namespace game.mod.more {

    export class XiandiSkillTipsView extends eui.Component {
        private baseQualityTips: BaseQualityTips;
        public skill: SkillItemRender;
        public lab_name: eui.Label;
        public img_tips: eui.Image;
        public list:eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiSkillTipsSkin";
        }
    }

}