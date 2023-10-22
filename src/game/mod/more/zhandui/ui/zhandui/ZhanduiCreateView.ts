namespace game.mod.more {

    export class ZhanduiCreateView extends eui.Component {
        public list: eui.List;
        public lb_input: eui.EditableText;
        public costIcon: game.mod.CostIcon;
        public btn_create: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.ZhanduiCreateSkin";
        }
    }
}