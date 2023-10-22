namespace game.mod.boss {

    export class ManyBossView extends eui.Component {
        public grp_eff: eui.Group;
        public list_boss: eui.List;
        public scroller: eui.Scroller;
        public list_type: eui.List;
        public avatarNameItem: AvatarNameItem;
        public btn_gift: GiftBtn;
        public head: Head;
        public lab_name: eui.Label;
        public btn_reward: Btn;
        public list_reward: eui.List;
        public grp_cnt: eui.Group;
        public lab_cnt: eui.Label;
        public btn_add: Btn;
        public lab_time: eui.Label;
        public timeItem: game.mod.TimeItem;
        public btn_challenge: Btn;
        public grp_luckyCnt0: eui.Group;
        public grp_luckyCnt: eui.Group;
        public checkBoxNvpu: game.mod.XiuxianNvpuCheckBox;

        constructor() {
            super();
            this.skinName = "skins.boss.ManyBossSkin";
        }
    }

}