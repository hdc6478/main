namespace game.mod.activity {

    export class WonderfulActView1 extends eui.Component {
        public list: eui.List;
        public btn_do: game.mod.Btn;
        public lb_time: eui.Label;
        public gr_time: eui.Group;
        public timeItem: game.mod.TimeItem;

        constructor() {
            super();
            this.skinName = "skins.activity.WonderfulActSkin1";
        }
    }
}