namespace game.mod.union {


    export class UnionKillView extends eui.Component {

        public head: HeadVip;
        public lab_nobody: eui.Label;
        public lab_name: eui.Label;
        public lab_count: eui.Label;
        public lab_power: eui.Label;
        public img_zhanli: eui.Image;
        public btn_rank: Btn;
        public timeItem: TimeItem;
        // public img_nobody: eui.Image;

        public list: eui.List;

        public grp_tips_private:eui.Group;

        //Group里面 召唤boss
        public progress: ProgressBarComp;
        public timeItem2: TimeItem;
        public btn_summon: Btn;
        public btn_preview: Btn;
        public btn_fight: Btn;
        public lab_master: eui.Label;
        public lab_wait: eui.Label;
        public coinItem: CoinItem;
        public lab_help: eui.Label;
        public list_reward: eui.List;

        public img_name: eui.Image;
        public img_head: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.union.UnionKillSkin";
        }
    }

}