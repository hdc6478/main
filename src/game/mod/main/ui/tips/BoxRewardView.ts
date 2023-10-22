namespace game.mod.main {

    export class BoxRewardView extends eui.Component {

        public secondPop: game.mod.SecondPop;

        public lab_tip: eui.Label;
        public lab_tip1: eui.Label;
        public list_reward: eui.List;
        public btn_ok: mod.Btn;
        public lab_time: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.main.BoxRewardSkin";
        }

    }
}