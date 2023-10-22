namespace game.mod.xianyuan {

    export class ShilianRankRewardView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;
        public icon_bigreward: game.mod.Icon;
        public lb_num: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ShilianRankRewardSkin";
        }
    }
}