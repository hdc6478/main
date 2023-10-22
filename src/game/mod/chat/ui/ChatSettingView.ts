namespace game.mod.chat {

    export class ChatSettingView extends eui.Component {
        public btn_confirm: game.mod.Btn;
        public checkbox1: eui.CheckBox;
        public checkbox2: eui.CheckBox;
        public checkbox3: eui.CheckBox;

        constructor() {
            super();
            this.skinName = "skins.chat.ChatSettingSkin";
        }
    }

}