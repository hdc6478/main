namespace game.mod.yijie {

    export class YonghengYijieSceneView extends eui.Component {
        public lab_lucky: eui.Label;
        public lab_goodCnt: eui.Label;
        public lab_cnt: eui.Label;
        public lab_guild: eui.Label;
        public cost: CostIcon;
        public btn_reward: Btn;
        public btn_demon: Btn;
        public timeItem: game.mod.TimeItem;
        public btn_boss: Btn;

        constructor() {
            super();
            this.skinName = "skins.yijie.YonghengYijieSceneSkin";
        }
    }

}