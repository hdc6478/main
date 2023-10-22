namespace game.mod.compete {

    export class DoufaView extends eui.Component {

        public img_lv: eui.Image;
        public grp_eft: eui.Group;
        public btn_rule: Btn;
        public btn_finals: Btn;
        public btn_rank: Btn;
        public timeItem: game.mod.TimeItem;
        public btn_record: Btn;
        public bar: game.mod.ProgressBarComp;
        public lab_max: eui.Label;
        public list_reward: eui.List;
        public reward_view: CompeteRewardView;
        public btn_reward: Btn;
        public btn_challenge: Btn;
        public checkbox: eui.CheckBox;
        public lab_cnt: eui.Label;
        public btn_add: Btn;

        public btn_rank2: Btn;
        public btn_record2: Btn;
        public btn_rule2: Btn;
        public lab_guessCnt: eui.Label;
        public player: DoufaPlayerView;
        public list_type: eui.List;
        public lab_tips:eui.Label;
        public btn_battle: Btn;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaSkin";
        }
    }
}
