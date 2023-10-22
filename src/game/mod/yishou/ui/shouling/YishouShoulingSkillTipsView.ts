namespace game.mod.yishou {

    export class YishouShoulingSkillTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public skillItem: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public img_type: eui.Image;
        public descItem: game.mod.BaseDescItem;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShoulingSkillTipsSkin";
        }
    }
}