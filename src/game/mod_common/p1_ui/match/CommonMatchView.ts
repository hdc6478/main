namespace game.mod {

    export class CommonMatchView extends eui.Component {

        public item1: CommonMatchItem;
        public item2: CommonMatchItem;
        public item3: CommonMatchItem;
        public item4: CommonMatchItem;

        constructor() {
            super();
            this.skinName = "skins.common.CommonMatchSkin";

        }
    }
}