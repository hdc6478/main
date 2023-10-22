namespace game.mod.yishou {

    export class YishouShouguSkillTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public skillItem: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public img_skillType: eui.Image;
        public descItem0: game.mod.BaseDescItem;
        public attrList: game.mod.SkillAttrList;
        public descList: game.mod.BaseDescList;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguSkillTipsSkin";
        }
    }
}