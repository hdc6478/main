namespace game.mod.shenling {

    export class ShenlingLingqiBagTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public lb_name: eui.Label;
        public power: game.mod.Power;
        public gr_jiefengzhanli: eui.Group;
        public gr_power: eui.Group;
        public lingqiIcon: game.mod.shenling.ShenLingLingQiIcon;
        public scroller: eui.Scroller;
        public baseAttrItem: game.mod.BaseDescItem;
        public fengyinAttrItem: game.mod.BaseDescItem;
        public suitDescItem1: game.mod.BaseDescList2;
        public suitDescItem2: game.mod.BaseDescList2;
        public descItem: game.mod.BaseDescItem;
        public gainList: game.mod.BasePropGainList;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingLingQiBagTipsSkin";
        }
    }
}