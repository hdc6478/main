namespace game.mod.activity {

    export class SummonTreasureBoxView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;
        public costIcon: game.mod.CostIcon;
        public btn_onekey: game.mod.Btn;
        public img_icon: eui.Image;
        public scroller: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.activity.SummonTreasureBoxSkin";
        }
    }
}