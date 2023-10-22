namespace game.mod.yijie {

    export class SeaBaseView extends eui.Component {
        public grp_default: eui.Group;
        public lab_tips1: eui.Label;
        public lab_tips2: eui.Label;
        public grp_task: eui.Group;
        public group_eft: eui.Group;
        public lab_task: eui.Label;
        public redPoint: eui.Image;
        public lab_desc: eui.Label;
        public img_icon1: eui.Image;
        public img_icon2: eui.Image;
        public img_icon3: eui.Image;
        public btn_enter: Btn;

        public grp_enter: eui.Group;
        public btn_reward: Btn;
        public item1: SeaFubenItem;
        public item2: SeaFubenItem;
        public item3: SeaFubenItem;
        public item4: SeaFubenItem;
        public item5: SeaFubenItem;
        public btn1: Btn;
        public btn2: Btn;
        public btn3: Btn;
        public btn_boss: Btn;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaBaseSkin";
        }
    }

}