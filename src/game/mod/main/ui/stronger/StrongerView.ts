namespace game.mod.main {


    export class StrongerView extends eui.Component {
        public secondPop: SecondPop;
        public scr: eui.Scroller;
        public list_item: eui.List;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.main.StrongerSkin";
        }
    }
}