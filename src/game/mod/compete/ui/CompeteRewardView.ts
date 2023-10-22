namespace game.mod.compete {

    export class CompeteRewardView extends eui.Component {
        public lab_title: eui.Label;
        public bar2: game.mod.ProgressBarComp;
        public img_tips: eui.Image;
        public lab_win: eui.Label;
        public list_win: eui.List;

        constructor() {
            super();
            this.skinName = "skins.compete.CompeteRewardSkin";
        }
    }
}
