namespace game.mod.shenling {

    export class ShenlingLingpoIconTipsView extends eui.Component {
        public propTips: game.mod.BasePropTips;
        public descItem: game.mod.BaseDescItem;
        public lingpoAttrItem0: game.mod.shenling.ShenlingLingpoAttrItem;
        public btn_do: game.mod.Btn;
        public gr_cost: eui.Group;
        public icon_cost: game.mod.Icon;
        public img_max: eui.Image;
        public bar: game.mod.ProgressBarComp;
        public scroller: eui.Scroller;
        public lingpoAttrItem1: game.mod.shenling.ShenlingLingpoAttrItem;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingpoIconTipsSkin";
        }
    }
}