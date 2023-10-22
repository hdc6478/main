namespace game.mod.more {

    export class ArtifactBuweiTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public lb_name: eui.Label;
        public power: game.mod.Power;
        public icon: Icon;
        public cost: Icon;
        public scroller: eui.Scroller;
        public gr_middle: eui.Group;
        public baseAttrItem: BaseAttrItem;
        public taozhuangItem: BaseDescItem;
        public skillItem: BaseDescList2;
        public btn_up: game.mod.Btn;
        public img_max: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.ArtifactBuweiTipsSkin";
        }
    }
}