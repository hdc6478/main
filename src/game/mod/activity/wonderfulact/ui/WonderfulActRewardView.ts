namespace game.mod.activity {

    export class WonderfulActRewardView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;
        public list1: eui.List;
        public lb_prob: eui.Label;
        public lb_prob1: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.WonderfulRewardSkin";
        }
    }
}