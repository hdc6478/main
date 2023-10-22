namespace game.mod.activity {

    export class SummonTreasureTipsView extends eui.Component {
        public propTips: game.mod.BasePropTips;
        public descItem: game.mod.BaseDescItem;
        public list: eui.List;
        public btn_go: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.SummonTreasureTipsSkin";
        }
    }
}