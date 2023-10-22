namespace game.mod.result {

    export class ResultWinContinueView extends eui.Component {

        public resultHurt: ResultHurt;
        public resultReward: ResultReward;

        public btn_exit: game.mod.Btn;
        public btn_go: game.mod.Btn;

        public grp_eft: eui.Group;
        public grp_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.result.ResultWinContinueSkin";
        }
    }

}