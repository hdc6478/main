namespace game.mod.compete {
    export class DoufaWinView extends eui.Component {

        public resultHurt: ResultHurt;
        public lab_tips: eui.Label;
        public lab_score: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public img_lv_icon: eui.Image;
        public resultReward: ResultReward;
        public closeTips: game.mod.CloseTips;
        public gr_eft: eui.Group;
        public gr_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaWinSkin";
        }
    }
}
