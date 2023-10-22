namespace game.mod.activity {
    export class SupremeGitView extends eui.Component {
        public list_item: eui.List;
        public list_reward: eui.List;
        public img_bought: eui.Image;
        public btn_buy: Btn;
        public btn_last: Btn;
        public btn_next: Btn;
        public img_allBought: eui.Image;
        public btn_allBuy: Btn;
        public coinItem: game.mod.CoinItem;
        public lab_text: eui.Label;
        public img_item: eui.Image;
        public img_lab: eui.Image;
        public gr_font: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.SupremeGitSkin";
        }
    }
}