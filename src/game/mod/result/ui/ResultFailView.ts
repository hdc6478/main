namespace game.mod.result {

    export class ResultFailView extends eui.Component {
        public closeTips: game.mod.CloseTips;
        public icon_group: eui.Group;
        public grp_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.result.ResultFailSkin";
        }
    }

}