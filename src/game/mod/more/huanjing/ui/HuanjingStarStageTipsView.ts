namespace game.mod.more {

    export class HuanjingStarStageTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public skillItem: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public img_skilltype: eui.Image;
        public starStageItem0: game.mod.more.HuanjingStarStageItem;
        public starstageItem1: game.mod.more.HuanjingStarStageItem;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingStarStageTipsSkin";
        }
    }
}