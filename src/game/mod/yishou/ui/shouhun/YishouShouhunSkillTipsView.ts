namespace game.mod.yishou {

    export class YishouShouhunSkillTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public skillItem: game.mod.SkillItemRender;
        public power: game.mod.Power;
        public img_skillType: eui.Image;
        public lb_name: eui.Label;
        public descItem: game.mod.BaseDescItem;
        public btn_do: game.mod.Btn;
        public lb_cond: eui.Label;
        public img_act: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouhunSkillTipsSkin";
        }
    }
}