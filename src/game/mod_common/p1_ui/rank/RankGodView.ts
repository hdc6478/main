namespace game.mod {

    export class RankGodView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list_rank: eui.List;
        public scroller: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.common.RankGodSkin";
        }
    }

}