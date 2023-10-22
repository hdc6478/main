namespace game.mod.activity {

    export class WonderfulActView3 extends eui.Component {
        public icon_bigreward: game.mod.Icon;
        public lb_chargenum: eui.Label;
        public timeItem: game.mod.TimeItem;
        public list: eui.List;
        public list_btn: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.WonderfulActSkin3";
        }
    }
}