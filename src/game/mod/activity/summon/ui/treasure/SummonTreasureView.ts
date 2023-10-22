namespace game.mod.activity {

    export class SummonTreasureView extends eui.Component {
        public scroller: eui.Scroller;
        public list: eui.List;
        public btn_onekey: game.mod.Btn;
        public treasureItem: game.mod.activity.SummonTreasureItem;
        public img_cond: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.SummonTreasureSkin";
        }
    }
}