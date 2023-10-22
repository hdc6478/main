namespace game.mod.activity {

    export class TongtiangeView2 extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public list: eui.List;
        public lb_stage: eui.Label;
        public stageItem: game.mod.activity.TongtiangeStageItem;
        public btn_left: game.mod.Btn;
        public btn_right: game.mod.Btn;
        public img_banner: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.TongtiangeSkin2";
        }
    }
}