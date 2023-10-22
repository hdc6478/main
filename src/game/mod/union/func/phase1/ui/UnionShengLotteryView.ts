namespace game.mod.union {

    export class UnionShengLotteryView extends eui.Component {

        public img_bg: eui.Image;

        public icon_1: UnionShengLotteryItem;
        public icon_2: UnionShengLotteryItem;
        public icon_3: UnionShengLotteryItem;
        public icon_4: UnionShengLotteryItem;
        public icon_5: UnionShengLotteryItem;
        public icon_6: UnionShengLotteryItem;
        public icon_7: UnionShengLotteryItem;
        public icon_8: UnionShengLotteryItem;

        public btn_ten: Btn;
        public btn_one: Btn;
        public btn_explain: Btn;
        public btn_look: Btn;
        public btn_reward: Btn;
        public btn_get: Btn;

        public progress: ProgressBarComp;
        public cost_one: CoinItem;
        public cost_ten: CoinItem;
        public grp: eui.Group;

        public reward: UnionProgressReward;

        constructor() {
            super();
            this.skinName = "skins.union.UnionShengLotterySkin";
        }
    }

}