namespace game.mod.pass {

    export class WorldMapView extends eui.Component {
        public scroller:eui.Scroller;
        public list:eui.List;
        public btn_left: game.mod.Btn;
        public btn_right: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapSkin";
        }
    }

}