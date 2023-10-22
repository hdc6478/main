namespace game.mod.result {

    export class ResultBelongView extends eui.Component {

        public head: Head;
        public lab_name: eui.Label;
        public resultReward: ResultReward;
        public closeTips: game.mod.CloseTips;
        public grp_eft: eui.Group;
        public grp_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.result.ResultBelongSkin";
        }
    }

}