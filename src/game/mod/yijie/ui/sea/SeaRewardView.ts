namespace game.mod.yijie {

    export class SeaRewardView extends eui.Component {
        public secondPop: SecondPop;
        public seaRewardItem: SeaRewardItem;
        public list_reward: eui.List;
        public lab_tips: eui.Label;
        public btn_draw: game.mod.Btn;
        public timeItem: game.mod.TimeItem;
        public group_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaRewardSkin";
        }
    }

}