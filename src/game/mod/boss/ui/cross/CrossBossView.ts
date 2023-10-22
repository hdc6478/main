namespace game.mod.boss {

    export class CrossBossView extends eui.Component {
        public grp_eff: eui.Group;
        public list_boss: eui.List;
        public avatarNameItem: AvatarNameItem;
        public lab_name: eui.Label;
        public lab_rank: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public btn_reward: Btn;
        public list_reward: eui.List;
        public grp_cnt: eui.Group;
        public lab_cnt: eui.Label;
        public btn_add: Btn;
        public lab_time: eui.Label;
        public timeItem: game.mod.TimeItem;
        public btn_challenge: Btn;

        constructor() {
            super();
            this.skinName = "skins.boss.CrossBossSkin";
        }
    }

}