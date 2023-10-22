namespace game.mod.activity {

    export class SignGiftView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public icon_bigReward: game.mod.activity.SignGiftItem;
        public lb_signDay: eui.Label;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.signgift.SignGiftSkin";
        }
    }
}