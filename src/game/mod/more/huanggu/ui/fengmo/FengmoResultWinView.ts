namespace game.mod.more {

    export class FengmoResultWinView extends eui.Component {

        public resultReward: ResultReward;
        public closeTips: game.mod.CloseTips;
        public lab_hurt:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.FengmoResultWinSkin";
        }
    }

}