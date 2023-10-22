namespace game.mod.rank {

    export class NewRankView extends eui.Component {
        public gr_efttitle: eui.Group;
        public gr_eft: eui.Group;
        public btn_like: game.mod.Btn;
        public btn_record: game.mod.Btn;
        public scroller: eui.Scroller;
        public list_ranktype: eui.List;
        public list_rank: eui.List;
        public lb_myrank: eui.Label;
        public lb_mypower: eui.Label;
        public frameItem: game.mod.BubbleFrameItem;
        public power: game.mod.Power;
        public nameItem: game.mod.rank.RankFirstNameItem;
        public lb_liketime: eui.Label;
        public img_sketch: eui.Image;
        public gr_value: eui.Group;
        public lb_value: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.rank.NewRankSkin";
        }
    }
}