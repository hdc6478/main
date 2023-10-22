namespace game.mod.activity {

    export class CarnivalView extends eui.Component {
        public lab_count: eui.Label;
        public timeItem: game.mod.TimeItem;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.CarnivalSkin";
        }
    }

}