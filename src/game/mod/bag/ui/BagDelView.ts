namespace game.mod.bag {

    export class BagDelView extends eui.Component {
        public lab_desc1: eui.Label;
        public list_item2: eui.List;
        public lab_sel: eui.Label;
        public item: game.mod.Icon;
        public lab_cnt: eui.Label;
        public btn_add: game.mod.Btn;
        public btn_subtract: game.mod.Btn;
        public btn_subtractTen: game.mod.Btn;
        public btn_min: game.mod.Btn;
        public btn_addTen: game.mod.Btn;
        public btn_max: game.mod.Btn;
        public lab_desc2: eui.Label;
        public list_item: eui.List;
        public btn_del: game.mod.Btn;
        public btn_gotoact: Btn;

        constructor() {
            super();
            this.skinName = "skins.bag.BagDelSkin";
        }
    }

}