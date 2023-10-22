namespace game.mod.activity {

    export class FuchenlinghuView extends eui.Component {
        public cost1: game.mod.CostIcon;
        public cost10: game.mod.CostIcon;
        public btn1: game.mod.Btn;
        public btn10: game.mod.Btn;
        public checkBox: eui.CheckBox;
        public lb_num: eui.Label;
        public btn_rule: game.mod.Btn;
        public btn_reward: game.mod.Btn;
        public btn_xianling: game.mod.Btn;
        public icon0: game.mod.Icon;
        public icon1: game.mod.Icon;
        public icon2: game.mod.Icon;
        public icon3: game.mod.Icon;
        public icon4: game.mod.Icon;
        public icon5: game.mod.Icon;
        public icon6: game.mod.Icon;
        public avatarBaseItem: game.mod.AvatarBaseItem;
        public btn_refresh: game.mod.Btn;
        public img_gain: eui.Image;
        public btn_refresh1: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.FuchenlinghuSkin";
        }
    }
}