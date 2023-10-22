namespace game.mod.chat {


    export class EmoticonView extends eui.Component {

        public list_btn: eui.List;
        public list_emoticon: eui.List;
        public scr: eui.Scroller;
        constructor() {
            super();
            this.skinName = "skins.chat.EmoticonSkin";
        }
    }
}
