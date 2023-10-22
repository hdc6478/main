namespace game.mod.more {

    export class XianmaiSelectView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public infoItem0: game.mod.more.XianmaiInfoItem;
        public infoItem1: game.mod.more.XianmaiInfoItem;
        public btn_do0: game.mod.Btn;
        public btn_do1: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiSelectSkin";
        }
    }
}