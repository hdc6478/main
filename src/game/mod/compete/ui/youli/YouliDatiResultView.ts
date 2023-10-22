namespace game.mod.compete {

    export class YouliDatiResultView extends eui.Component {

        public list_reward:eui.List;
        public lab_tip: eui.Label;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliDatiResultSkin";
        }

    }
}