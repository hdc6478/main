namespace game.mod.bag {

    export class BagComposeView extends eui.Component {
        public consume0: game.mod.Icon;
        public consume1: game.mod.Icon;
        public consume2: game.mod.Icon;
        public btn_min: game.mod.Btn;
        public btn_subtract: game.mod.Btn;
        public lab_cnt: eui.Label;
        public btn_add: game.mod.Btn;
        public btn_max: game.mod.Btn;
        public cost: game.mod.CostIcon;
        public btn_compose: game.mod.Btn;
        public icon: game.mod.Icon;
        public lab_name: eui.Label;
        public scr: eui.Scroller;
        public list_type: eui.List;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.bag.BagComposeSkin";
        }
    }

}