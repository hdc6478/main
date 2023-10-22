namespace game.mod.xianyuan {

    export class ChildSkillTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public skillIcon: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public img_type: eui.Image;
        public gp_attr: eui.Group;
        public baseDescItem: game.mod.BaseDescItem;
        public skillAttrList: game.mod.SkillAttrList;
        public baseDescList: game.mod.BaseDescList;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ChildSkillTipsSkin";
        }
    }
}