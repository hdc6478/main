namespace game.mod.activity {

    export class WonderfulActView2 extends eui.Component {
        public list: eui.List;
        public timeItem: game.mod.TimeItem;
        public icon_bigreward: game.mod.IconReward;
        public bar: game.mod.ProgressBarComp;
        public btn_rule: game.mod.Btn;
        public btn_reward: game.mod.Btn;
        public lb_desc: eui.Label;
        public img_reward2: eui.Image;
        public costIcon: game.mod.CostIcon;
        public btn_add: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.WonderfulActSkin2";
        }
    }
}