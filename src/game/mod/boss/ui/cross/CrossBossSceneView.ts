namespace game.mod.boss {

    export class CrossBossSceneView extends eui.Component {
        public head: Head;
        public btn_rank: Btn;
        public icon: Icon;
        public btn_reward: Btn;

        constructor() {
            super();
            this.skinName = "skins.boss.CrossBossSceneSkin";
        }
    }

}