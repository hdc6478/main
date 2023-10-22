namespace game.mod {

    export class SkillTipsView extends eui.Component {
        private baseQualityTips: BaseQualityTips;
        public skill: SkillItemRender;
        public lab_name: eui.Label;
        public power: game.mod.Power;
        public baseDescItem: BaseDescItem;
        public baseDescItem2: BaseDescItem;
        public icon: game.mod.Icon;
        public btn_act: game.mod.Btn;
        public img_act: eui.Image;
        public img_tips: eui.Image;
        public lab_limit:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.SkillTipsSkin";
        }
    }

}