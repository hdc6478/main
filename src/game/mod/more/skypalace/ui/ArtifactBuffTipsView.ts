namespace game.mod.more {

    export class ArtifactBuffTipsView extends eui.Component {
        private baseQualityTips: BaseQualityTips;
        public skill: SkillItemRender;
        public lab_name: eui.Label;
        public baseDescItem: BaseDescItem;
        public baseDescItem2: BaseDescItem;
        public btn: game.mod.Btn;
        public lab_limit: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.ArtifactBuffTipsSkin";
        }
    }

}