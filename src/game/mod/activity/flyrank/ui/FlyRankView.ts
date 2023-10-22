namespace game.mod.activity {

    export class FlyRankView extends eui.Component {
        public grp_eff: eui.Group;
        public timeItem: game.mod.TimeItem;
        public img_prop: eui.Image;
        public lab_tips1: eui.Label;
        public lab_tips2: eui.Label;
        public list_rank: eui.List;
        public lab_rank: eui.Label;
        public lab_num: eui.Label;
        public grp_tips3: eui.Group;
        public lab_tips3: eui.Label;
        public btn_reward: Btn;
        public btn_lastRank: game.mod.Btn;//上一次排行榜
        public btn_go: Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.FlyRankSkin";
        }
    }

}