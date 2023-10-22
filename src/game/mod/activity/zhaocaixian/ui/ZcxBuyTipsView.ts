namespace game.mod.activity {

    export class ZcxBuyTipsView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public icon: game.mod.Icon;
        public btnView: game.mod.BuyBtnListView;
        public btn_buy: game.mod.Btn;
        public lb_name: eui.Label;
        public lb_own: eui.Label;
        public lb_stock: eui.Label;
        public list_cost: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxBuyTipsSkin";
        }
    }
}