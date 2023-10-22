namespace game.mod.more {

    export class XianjieLuandouView extends eui.Component {
        public btn_rule: game.mod.Btn;
        public btn_rank: game.mod.Btn;
        public timeItem: game.mod.TimeItem;
        public list_reward: eui.List;
        public img_end: eui.Image;
        public lb_desc: eui.Label;
        public btn_do: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.XianjieLuandouSkin";
        }
    }
}