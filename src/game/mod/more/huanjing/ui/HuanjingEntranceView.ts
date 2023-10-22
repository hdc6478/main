namespace game.mod.more {

    export class HuanjingEntranceView extends eui.Component {
        public btn0: game.mod.Btn;
        public btn1: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingEntranceSkin";
        }
    }
}