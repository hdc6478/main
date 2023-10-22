namespace game.mod.boss {

    export class BossRewardView extends eui.Component {
        public list_reward: eui.List;
        public list_tips: eui.List;
        public btn_confirm: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.boss.BossRewardSkin";
        }
    }

}