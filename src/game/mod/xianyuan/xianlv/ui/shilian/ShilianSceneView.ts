namespace game.mod.xianyuan {

    export class ShilianSceneView extends eui.Component {
        public lb_time: eui.Label;
        public lb_damage0: eui.Label;
        public lb_damage1: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ShilianSceneSkin";
        }
    }
}