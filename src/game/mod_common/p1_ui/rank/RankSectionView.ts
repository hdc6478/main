namespace game.mod {

    export class RankSectionView extends eui.Component {

        public secondPop: SecondPop;
        public img_bg: eui.Image;
        public img_type1: eui.Image;
        public img_type2: eui.Image;
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public img_score: eui.Image;
        public lab_score: eui.Label;
        public scroller: eui.Scroller;
        public list: eui.List;
        public timeItem: game.mod.TimeItem;
        public lab_time: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.RankSectionSkin";
        }
    }

}