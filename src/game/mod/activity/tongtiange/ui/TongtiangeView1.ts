namespace game.mod.activity {

    export class TongtiangeView1 extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public scroller: eui.Scroller;
        public list: eui.List;
        public btn_rank: game.mod.Btn;
        public head: game.mod.Head;
        public btn_reward: game.mod.Btn;
        public btn_rule: game.mod.Btn;
        public lb_desc: eui.Label;
        public costIconOne: game.mod.CostIcon;
        public btn_build: game.mod.Btn;
        public costIconTen: game.mod.CostIcon;
        public btn_buildten: game.mod.Btn;
        public checkBox: eui.CheckBox;
        public img_gain: eui.Image;
        public lb_name: eui.Label;
        public lb_checkboxcond: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.TongtiangeSkin1";
        }
    }
}