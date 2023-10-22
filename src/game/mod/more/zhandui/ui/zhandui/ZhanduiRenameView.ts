namespace game.mod.more {

    export class ZhanduiRenameView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public btn_do: game.mod.Btn;
        public lb_input: eui.EditableText;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiRenameSkin";
        }
    }
}