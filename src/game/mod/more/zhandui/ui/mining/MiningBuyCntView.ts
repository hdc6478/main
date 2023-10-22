namespace game.mod.more {

    export class MiningBuyCntView extends eui.Component {
        public secondPop: game.mod.SecondPop;

        public lb_cnt: eui.Label;
        // public lab_1: eui.Label;
        public lab_2: eui.Label;
        public lab_3: eui.Label;

        public coinItem: CoinItem;
        public btn_cancel: Btn;
        public btn_confirm: Btn;
        public btn_add: Btn;
        public btn_addTen: Btn;
        public btn_subtract: Btn;
        public btn_subtractTen: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.MiningBuyCntSkin";
        }
    }
}