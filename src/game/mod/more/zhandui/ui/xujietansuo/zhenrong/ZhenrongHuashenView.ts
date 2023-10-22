namespace game.mod.more {

    export class ZhenrongHuashenView extends eui.Component {
        public scroller: eui.Scroller;
        public list: eui.List;
        public btn_oneKey: game.mod.Btn;
        public list_model: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.ZhenrongHuashenSkin";
        }
    }
}