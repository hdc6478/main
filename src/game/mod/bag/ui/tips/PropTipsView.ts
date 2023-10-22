namespace game.mod.bag {

    export class PropTipsView extends eui.Component {
        public basePropTips: game.mod.BasePropTips;
        public lab_cnt: eui.Label;
        public scr: eui.Scroller;
        public baseDescItem: game.mod.BaseDescItem;
        public basePropGainList: game.mod.BasePropGainList;
        public baseRewardList: BaseRewardList;

        public grp_use: eui.Group;
        public lab_useCnt: eui.Label;
        public btn_add: game.mod.Btn;
        public btn_subtract: game.mod.Btn;
        public btn_subtractTen: game.mod.Btn;
        public btn_addTen: game.mod.Btn;
        public lab_useTips: eui.Label;
        public btn_use: game.mod.Btn;

        public exchangeTips: game.mod.ExchangeTips;

        public btn_goto: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.bag.PropTipsSkin";
        }
    }

}