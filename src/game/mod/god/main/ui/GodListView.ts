namespace game.mod.god {

    export class GodListView extends eui.Component {
        public list: eui.List;
        public lab:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.god.GodListSkin";
        }
    }

}