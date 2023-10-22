namespace game.mod.more {


    export class XiandiShowView extends eui.Component {

        public item: XiandiKingItem;
        public item1: XiandiKingItem;
        public item2: XiandiKingItem;
        public item3: XiandiKingItem;
        public item4: XiandiKingItem;

        public lab_count: eui.Label;
        public btn_like: Btn;
        public btn_explain: Btn;
        public btn_goddess: Btn;
        public btn_house: Btn;
        public btn_gift: Btn;
        public btn_reward: Btn;
        public lab_desc: eui.Label;
        public btn_fight: Btn;
        public btn_treasure: Btn;
        public btn_weapon: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiShowSkin";
        }
    }

}