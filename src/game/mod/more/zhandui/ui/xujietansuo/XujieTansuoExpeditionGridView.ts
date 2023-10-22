namespace game.mod.more {

    export class XujieTansuoExpeditionGridView extends eui.Component {
        public checkBox: eui.CheckBox;
        public list_reward: eui.List;
        public list_avatar: eui.List;
        public btn_do: game.mod.Btn;
        public timeItem: game.mod.TimeItem;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoExpeditionGridSkin";
        }
    }
}