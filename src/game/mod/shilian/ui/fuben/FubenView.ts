namespace game.mod.shilian {

    export class FubenView extends eui.Component {
        public lab_more: eui.Label;
        public grp_lv: eui.Group;
        public list_reward: eui.List;
        public grp_maxLv: eui.Group;
        public grp_reset: eui.Group;
        public img_cost: eui.Image;
        public lab_cost: eui.Label;
        public btn_reset: game.mod.Btn;
        public btn_more1: game.mod.Btn;
        public btn_more2: game.mod.Btn;
        public btn_more3: game.mod.Btn;
        public btn_challenge: game.mod.Btn;
        public btn_gift: GiftBtn;
        public list_type: eui.List;
        recommendPower: RecommendPower;

        constructor() {
            super();
            this.skinName = "skins.shilian.FubenSkin";
        }
    }

}