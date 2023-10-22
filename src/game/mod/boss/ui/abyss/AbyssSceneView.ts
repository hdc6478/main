namespace game.mod.boss {

    export class AbyssSceneView extends eui.Component {
        public lab_people: eui.Label;
        public lab_cnt: eui.Label;
        public cost: CostIcon;
        public timeItem: TimeItem;
        public btn_reward: Btn;
        public btn_boss: Btn;
        public btn_add: Btn;

        public grp_hurt: eui.Group;
        public head: HeadVip;
        public lab_name: eui.Label;

        public btn_team: Btn;
        public lab_hurt: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.boss.AbyssSceneSkin";
        }
    }

}