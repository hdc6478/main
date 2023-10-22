namespace game.mod.shilian {

    export class XiantaSceneView extends eui.Component {
        public grp_reward: eui.Group;
        public lab_name: eui.Label;
        public icon: game.mod.Icon;
        public bar: game.mod.ProgressBarComp;

        constructor() {
            super();
            this.skinName = "skins.shilian.XiantaSceneSkin";
        }
    }

}