namespace game.mod.activity {

    export class RoleRingView extends eui.Component {
        public img_bg: eui.Image;
        public img_surface: eui.Image;
        public lab_desc: eui.Label;

        public grp_exp: eui.Group;
        public bar: RoleRingExp;
        public redPoint1: eui.Image;

        public grp_egg: eui.Group;
        public grp_eft: eui.Group;
        //public img_egg: eui.Image;
        public img_type: eui.Image;
        public redPoint2: eui.Image;

        public item: CoinItem;
        public lab_add: eui.Label;
        public img_num: eui.Image;
        public scr: eui.Scroller;
        public img_txt: eui.Image;
        public btn_god: Btn;
        public btn_reward: Btn;
        public img_get: eui.Image;
        public lab_act: eui.Label;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.RoleRingSkin";
        }
    }

}