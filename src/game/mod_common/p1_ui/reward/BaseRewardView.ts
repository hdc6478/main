namespace game.mod {

    export class BaseRewardView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public list: eui.List;
        public btn_get: game.mod.Btn;
        public img_state: eui.Image;
        public lab_tips: eui.Label;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.BaseRewardSkin";
        }
    }
}