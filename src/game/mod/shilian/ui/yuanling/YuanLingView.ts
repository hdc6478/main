namespace game.mod.shilian {

    export class YuanLingView extends eui.Component {
        public btn_achievement: game.mod.Btn;
        public btn_team: game.mod.Btn;
        public playerComp: game.mod.shilian.YuanLingTopPlayerComp;
        public gr_reward: eui.Group;
        public list_reward: eui.List;
        public btn_go: game.mod.Btn;
        public btn_room: game.mod.Btn;
        public gr_team: eui.Group;
        public list_team: eui.List;
        public checkbox: eui.CheckBox;
        public btn_quit: game.mod.Btn;
        public btn_start: game.mod.Btn;
        public addComp: game.mod.AddCntComp;
        public btn_chat: game.mod.Btn;
        public list_type: eui.List;
        public lb_enterTime: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingSkin";
        }
    }
}