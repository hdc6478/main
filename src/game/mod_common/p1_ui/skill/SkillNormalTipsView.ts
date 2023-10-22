namespace game.mod {

    export class SkillNormalTipsView extends eui.Component {
        private baseQualityTips: BaseQualityTips;
        public skill: SkillItemRender;
        public lab_name: eui.Label;
        public img_type: eui.Image;
        public power: game.mod.Power;
        public baseDescItem: BaseDescItem;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.common.SkillNormalTipsSkin";
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
        }
    }

}