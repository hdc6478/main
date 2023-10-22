namespace game.mod.more {

    export class XujieTansuoBusinessGridView extends eui.Component {
        public list: eui.List;
        public icon: game.mod.Icon;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoBusinessGridSkin";
        }
    }
}