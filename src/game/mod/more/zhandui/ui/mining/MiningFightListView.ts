namespace game.mod.more {

    export class MiningFightListView extends eui.Component {

        public btn: Btn;
        public btn_add: Btn;
        public list: eui.List;
        public lab_count: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.MiningFightListSkin";
        }
    }

}