namespace game.mod.activity {

    export class FlyGiftView extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public icon_bigreward: IconBigReward;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.FlyGiftSkin";
        }
    }

}