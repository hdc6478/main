namespace game.mod {

    export class WndSecondMainView extends eui.Component {
        public secondPop: SecondPop;
        public list_menu:eui.List;

        constructor() {
            super();
            this.skinName = "skins.common.WndSecondMainSkin";
        }
    }

}