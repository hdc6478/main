namespace game.mod.yijie {

    export class YijieResultView extends eui.Component {
        public lab_tips: eui.Label;
        public resultReward: ResultReward;
        public lab_act: eui.Label;
        public lab_goto: eui.Label;
        public closeTips: CloseTips;

        constructor() {
            super();
            this.skinName = "skins.yijie.YijieResultSkin";
        }
    }

}