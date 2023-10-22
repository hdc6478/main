namespace game.mod.more {

    export class ZhanduiJoinView extends eui.Component {
        public lb_input: eui.EditableText;
        public btn_search: game.mod.Btn;
        public btn_refresh: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiJoinSkin";
        }
    }
}