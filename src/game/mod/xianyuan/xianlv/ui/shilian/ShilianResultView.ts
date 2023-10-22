namespace game.mod.xianyuan {

    export class ShilianResultView extends eui.Component {
        public resultReward: ResultReward;
        public lb_damage: eui.Label;
        public lb_hp: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ShilianResultSkin";
        }
    }
}