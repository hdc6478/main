namespace game.mod.activity {

    export class SummonGiftView extends eui.Component {

        // public img: eui.Image;
        // public list: eui.List;
        // public scroller: eui.Scroller;
        // public list_type: eui.List;

        public secondPop: SecondPop;
        public img_bg: eui.Image;
        public lab_count: eui.Label;
        public lab_tips: eui.Label;
        public img_type: eui.Image;

        public list: eui.List;
        public list_type: eui.List;


        constructor() {
            super();
            this.skinName = "skins.activity.SummonGiftSkin";
        }
    }

}