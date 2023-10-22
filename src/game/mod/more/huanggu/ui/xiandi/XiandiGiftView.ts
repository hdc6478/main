namespace game.mod.more {

    export class XiandiGiftView extends eui.Component {

        public btn_buy: game.mod.Btn;
        public btn_close: game.mod.Btn;
        public list_reward: eui.List;
        public lab_cut: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiGiftSkin";
        }
    }

}