namespace game.mod.bag {

    export class PropPillTipsView extends eui.Component {
        public basePropTips: game.mod.BasePropTips;
        public lab_cnt: eui.Label;
        public power: Power;
        public scr: eui.Scroller;
        public baseAttrItem: game.mod.BaseAttrItem;
        public baseDescItem: game.mod.BaseDescItem;
        public basePropGainList: game.mod.BasePropGainList;

        public btn_goto: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.bag.PropPillTipsSkin";
        }
    }

}