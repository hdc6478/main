namespace game.mod.consecrate {

    export class ConsecrateShelfView extends eui.Component {

        public secondPop: SecondPop;
        public list: eui.List;
        public btn: Btn;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateShelfSkin";
        }
    }

}