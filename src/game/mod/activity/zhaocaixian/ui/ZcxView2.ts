namespace game.mod.activity {

    export class ZcxView2 extends eui.Component {
        public gr_xianyu: eui.Group;
        public list_reward: eui.List;
        public lb_time: eui.Label;
        public btn_get: game.mod.Btn;
        public btn_save: game.mod.Btn;
        public lb_interest: eui.Label;
        public lb_saveDesc: eui.Label;
        public btn_receive: game.mod.Btn;
        public gr: eui.Group;
        public timeItem: game.mod.TimeItem;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxSkin2";
        }
    }
}