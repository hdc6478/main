namespace game.mod.bag {

    export class BagView extends eui.Component {
        public scroller: eui.Scroller;
        public list_item: eui.List;
        public lab_cnt: eui.Label;
        public btn_add: game.mod.Btn;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.bag.BagSkin";
        }
    }

}