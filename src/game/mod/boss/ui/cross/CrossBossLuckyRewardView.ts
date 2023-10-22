namespace game.mod.boss {

    export class CrossBossLuckyRewardView extends eui.Component {
        public lab_tips: eui.Label;
        public icon: game.mod.Icon;
        public lab_first: eui.Label;
        public list_item: eui.List;
        public lab_value: eui.Label;
        public lab_time: eui.Label;
        public btn_close: Btn;
        public btn_reward: Btn;

        constructor() {
            super();
            this.skinName = "skins.boss.CrossBossLuckyRewardSkin";
        }
    }

}