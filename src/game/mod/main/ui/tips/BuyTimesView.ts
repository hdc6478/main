namespace game.mod.main {

    export class BuyTimesView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public lab_tip: eui.Label;
        public btn_subtract10: game.mod.Btn;
        public btn_subtract: game.mod.Btn;
        public lbl_num: eui.Label;
        public btn_add: game.mod.Btn;
        public btn_add10: game.mod.Btn;
        public btn_ok: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.main.BuyTimesSkin";
        }
    }

}