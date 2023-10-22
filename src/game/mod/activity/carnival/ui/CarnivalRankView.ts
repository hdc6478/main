namespace game.mod.activity {

    export class CarnivalRankView extends eui.Component {
        public grp_eff: eui.Group;
        public timeItem: game.mod.TimeItem;
        public grp_first: eui.Group;
        public lab_first: eui.Label;
        public list_rank: eui.List;
        public lab_rank: eui.Label;
        public lab_num: eui.Label;
        public btn_reward: Btn;
        public btn_lastRank: game.mod.Btn;//上一次排行榜
        public btn_go: Btn;
        public scr: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.activity.CarnivalRankSkin";
        }
    }

}