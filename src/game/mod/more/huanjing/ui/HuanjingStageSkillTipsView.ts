namespace game.mod.more {

    export class HuanjingStageSkillTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public skillItem: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public img_skilltype: eui.Image;
        public baseDescItem: game.mod.BaseDescItem;
        public skillAttrList: game.mod.SkillAttrList;
        public baseDescList2: game.mod.BaseDescList2;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingStageSkillTipsSkin";
        }
    }
}