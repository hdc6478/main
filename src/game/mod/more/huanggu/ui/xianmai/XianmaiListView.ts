namespace game.mod.more {

    export class XianmaiListView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public btn_invite: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiListSkin";
        }
    }
}