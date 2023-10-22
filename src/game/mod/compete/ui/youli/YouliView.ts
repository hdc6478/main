namespace game.mod.compete {

    export class YouliView extends eui.Component {
        public grp_eft: eui.Group;
        public lab_top_rank: eui.Label;
        public lab_rank_jump: eui.Label;

        public item1: YouliItem;
        public item2: YouliItem;
        public item3: YouliItem;
        public item4: YouliItem;

        public btn_award: Btn;
        public btn_score: Btn;
        public pro_rate:ProgressBarComp;

        public lab_my_rank: eui.Label;
        public lab_my_score: eui.Label;
        
        public btn_refresh: Btn;
        
        public lab_recover_time: eui.Label;
        public lab_times: eui.Label;
        public btn_add_times: Btn;
        public reward_view: CompeteRewardView;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliViewSkin";
        }
    }
}
