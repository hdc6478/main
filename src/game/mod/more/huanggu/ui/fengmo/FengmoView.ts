namespace game.mod.more {


    export class FengmoView extends eui.Component {

        public grp_eft: eui.Group;
        public grp_hurt: eui.Group;
        public img_bg: eui.Image;
        public btn_rank: Btn;
        public btn_fight: Btn;
        public btn_add: Btn;
        public btn_reward: Btn;
        public timeItem: TimeItem;
        public headMvp: HeadMvp;
        public lab_tips: eui.Label;
        public lab_times: eui.Label;
        public reward: FengmoProgressReward;
        public progress: ProgressBarComp;

        constructor() {
            super();
            this.skinName = "skins.more.FengmoSkin";
        }
    }

}