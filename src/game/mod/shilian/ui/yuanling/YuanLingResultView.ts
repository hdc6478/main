namespace game.mod.shilian {

    export class YuanLingResultView extends eui.Component {
        public lb_layer: eui.Label;
        public list: eui.List;
        public lb_time: eui.Label;
        public lb_cd: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingResultSkin";
        }
    }
}