namespace game.mod.activity {

    export class FuchenlinghuWishView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public btn: game.mod.Btn;
        public scr: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.FuchenlinghuWishSkin";
        }
    }
}