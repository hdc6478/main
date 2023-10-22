namespace game.mod.activity {
    export class TiannvWelfareView extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public icon_bigreward: IconBigReward;
        public item1: TiannvWelfareItem;
        public item2: TiannvWelfareItem;
        public item3: TiannvWelfareItem;
        public item4: TiannvWelfareItem;
        public item5: TiannvWelfareItem;

        constructor() {
            super();
            this.skinName = "skins.activity.TiannvWelfareSkin";
        }
    }
}