namespace game.mod.yijie {

    export class YijieSceneView extends eui.Component {
        public lab_lucky: eui.Label;
        public lab_cnt: eui.Label;
        public cost: CostIcon;
        public grp_gift: eui.Group;
        public lab_add: eui.Label;
        public btn_gift: Btn;
        public img_tips: eui.Image;
        public btn_reward: Btn;
        public btn_rateBoss: Btn;
        public bar: game.mod.ProgressBarComp;
        public btn_boss: Btn;

        constructor() {
            super();
            this.skinName = "skins.yijie.YijieSceneSkin";
        }
    }

}