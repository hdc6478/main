namespace game.mod.bag {

    export class GainWaysTipsView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public icon: game.mod.Icon;
        public list_item: eui.List;
        public lab_name:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.bag.GainWaysTipsSkin";
        }
    }

}