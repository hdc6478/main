namespace game.mod.more {

    export class XianjieLuandouSkillTipsView extends eui.Component {
        public baseQualityTips: game.mod.BaseQualityTips;
        public img_skill: eui.Image;
        public lb_name: eui.Label;
        public baseDescItem0: game.mod.BaseDescItem;
        public baseDescItem1: game.mod.BaseDescItem;

        constructor() {
            super();
            this.skinName = "skins.more.XianjieLuandouSkillTipsSkin";
        }
    }
}