namespace game.mod.activity {

    export class GameOrderUnlockView extends eui.Component {

        public lab_title: eui.Label;
        public list: eui.List;
        public list_item: eui.List;
        public btn: Btn;
        public secondPop: SecondPop;

        constructor() {
            super();
            this.skinName = "skins.activity.GivingUnlockSkin";
        }
    }

}