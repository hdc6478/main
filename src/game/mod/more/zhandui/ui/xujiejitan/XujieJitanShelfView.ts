namespace game.mod.more {

    export class XujieJitanShelfView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public img_bg: eui.Image;
        public btn: game.mod.Btn;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateShelfSkin";
        }
    }
}