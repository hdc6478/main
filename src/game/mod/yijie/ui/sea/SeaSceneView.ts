namespace game.mod.yijie {

    export class SeaSceneView extends eui.Component {
        public lab_time: eui.Label;
        public lab_damage: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaSceneSkin";
        }
    }

}