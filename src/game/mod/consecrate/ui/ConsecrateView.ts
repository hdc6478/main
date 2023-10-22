namespace game.mod.consecrate {

    export class ConsecrateView extends eui.Component {

        public item_1: ConsecrateIconItem;
        public item_2: ConsecrateIconItem;
        public item_3: ConsecrateIconItem;
        public item_4: ConsecrateIconItem;
        public item_5: ConsecrateIconItem;
        public item_6: ConsecrateIconItem;
        public item_7: ConsecrateIconItem;
        public icon: Icon;
        public coin: CoinItem;

        public grp_tips: eui.Group;
        public lab_name: eui.Label;
        public lab_time: eui.Label;
        public lab_tips: eui.Label;

        public btn_reward: Btn;
        public btn_lottery: UpStarBtn;
        public btn_speedup: Btn;
        public btn_auto: Btn;
        public btn_add: Btn;

        public group_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateSkin";
        }
    }

}