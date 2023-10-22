namespace game.mod.shenling {

    export class ShenLingLingQiTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public lb_name: eui.Label;
        public power: game.mod.Power;
        public gr_jiefengzhanli: eui.Group;
        public gr_power: eui.Group;
        public lingqiIcon: game.mod.shenling.ShenLingLingQiIcon;
        public scroller: eui.Scroller;
        public gr_middle: eui.Group;
        public baseAttrItem: game.mod.BaseDescItem;
        public fengyinAttrItem: game.mod.BaseDescItem;
        public suitDescItem1: game.mod.BaseDescList2;
        public suitDescItem2: game.mod.BaseDescList2;
        public img_max: eui.Image;
        public gr_cost: eui.Group;
        public bar: game.mod.ProgressBarComp;
        public icon_cost: game.mod.Icon;
        public btn_do: game.mod.Btn;
        public descItem: game.mod.BaseDescItem;
        public basePropGainList: game.mod.BasePropGainList;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingLingQiTipsSkin";
        }
    }
}