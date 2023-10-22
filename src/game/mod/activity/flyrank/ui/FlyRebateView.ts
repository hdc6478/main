namespace game.mod.activity {

    export class FlyRebateView extends eui.Component {
        public lab_count: eui.Label;
        public timeItem: game.mod.TimeItem;
        public icon_bigreward: IconBigReward;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.FlyRebateSkin";
        }
    }

}