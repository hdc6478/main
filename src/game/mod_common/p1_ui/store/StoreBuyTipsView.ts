namespace game.mod {

    export class StoreBuyTipsView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public lb_cnt: eui.Label;
        public btn_add: game.mod.Btn;
        public btn_addTen: game.mod.Btn;
        public btn_subtract: game.mod.Btn;
        public btn_subtractTen: game.mod.Btn;
        public lb_name: eui.Label;
        public icon: game.mod.Icon;
        public lb_buyDesc: eui.Label;
        public costIcon: game.mod.CostIcon;
        public btn_cancel: game.mod.Btn;
        public btn_confirm: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.store.StoreBuyTipsSkin";
        }
    }
}