namespace game.mod.result {

    export class ResultPassView extends eui.Component {

        public grp_1: eui.Group;
        public grp_2: eui.Group;
        public lab_func1: eui.Label;
        public lab_func2: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.result.ResultPassSkin";
        }
    }

}