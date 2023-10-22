namespace game.mod.more {

    export class RewardShowView extends eui.Component {
        public secondPop: SecondPop;
        public lab_desc: eui.Label;
        public list_reward: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.RewardShowSkin";
        }
    }

}