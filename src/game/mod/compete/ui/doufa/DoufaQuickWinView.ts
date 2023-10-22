namespace game.mod.compete {

    export class DoufaQuickWinView extends eui.Component {

        public lab_score: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public img_lv_icon: eui.Image;
        public resultReward: ResultReward;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaQuickWinSkin";
        }
    }
}
