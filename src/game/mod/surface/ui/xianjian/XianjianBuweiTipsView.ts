namespace game.mod.surface {

    export class XianjianBuweiTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public lb_name: eui.Label;
        public power: game.mod.Power;
        public icon: Icon;
        public cost: Icon;
        public scroller: eui.Scroller;
        public gr_middle: eui.Group;
        public baseAttrItem: BaseAttrItem;
        public taozhuangItem: game.mod.BaseDescItem;
        public skillItem: game.mod.BaseDescItem;
        public bar: game.mod.ProgressBarComp;
        public btn_up: game.mod.Btn;
        public img_max: eui.Image;
        public grp_bar: eui.Group;

        // public gr_cost: eui.Group;
        // public icon_cost: game.mod.Icon;
        // public basePropGainList: game.mod.BasePropGainList;

        constructor() {
            super();
            this.skinName = "skins.surface.XianjianBuweiTipsSkin";
        }
    }
}