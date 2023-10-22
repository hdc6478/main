namespace game.mod.result {

    export class ResultWinView extends eui.Component {

        public resultHurt: ResultHurt;
        public resultReward: ResultReward;
        public closeTips: game.mod.CloseTips;
        public grp_eft: eui.Group;
        public grp_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.result.ResultWinSkin";
        }
    }

}