namespace game.mod.union {

    export class UnionTianLotteryView extends eui.Component {

        public btn_explain: Btn;
        public btn_one: Btn;
        public btn_ten: Btn;
        public cost_one: CoinItem;
        public cost_ten: CoinItem;
        public checkbox: eui.CheckBox;
        public list: eui.List;
        public btn_next: Btn;
        public btn_tips: Btn;

        /**选中框 */
        public img_sel: eui.Image;
        public icon_1: UnionLotteryItem;
        public icon_2: UnionLotteryItem;
        public icon_3: UnionLotteryItem;
        public icon_4: UnionLotteryItem;
        public icon_5: UnionLotteryItem;
        public icon_6: UnionLotteryItem;
        public icon_7: UnionLotteryItem;
        public icon_8: UnionLotteryItem;

        constructor() {
            super();
            this.skinName = "skins.union.UnionTianLotterySkin";
        }
    }

}