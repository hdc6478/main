namespace game.mod.main {


    export class AlertView extends eui.Component {

        public secondPop: game.mod.SecondPop;
        public lab_tips: eui.Label;
        public btn_cancel: game.mod.Btn;
        public btn_confirm: game.mod.Btn;
        public checkbox: eui.CheckBox;

        constructor() {
            super();
            this.skinName = "skins.main.AlertSkin";
        }
    }
}
