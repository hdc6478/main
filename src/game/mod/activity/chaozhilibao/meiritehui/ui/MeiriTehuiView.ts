namespace game.mod.activity {

    export class MeiriTehuiView extends eui.Component {
        public list: eui.List;
        public btn_buyTen: game.mod.Btn;
        public btn_go: game.mod.Btn;
        public lb_free: eui.Label;
        public timeItem: game.mod.TimeItem;
        public btn_close: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.MeiriTehuiSkin";
        }
    }
}