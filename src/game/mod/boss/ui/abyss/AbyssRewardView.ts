namespace game.mod.boss {

    export class AbyssRewardView extends eui.Component {
        public list_reward: eui.List;
        public btn_confirm: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.boss.AbyssRewardSkin";
        }
    }

}