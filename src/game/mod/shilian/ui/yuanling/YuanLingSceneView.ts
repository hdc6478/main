namespace game.mod.shilian {

    export class YuanLingSceneView extends eui.Component {
        public list_player: eui.List;
        public lb_pass: eui.Label;
        public lb_nextLv: eui.Label;
        public gr_eft: eui.Group;
        public lb_time: eui.Label;
        public list_buff: eui.List;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingSceneSkin";
        }
    }
}