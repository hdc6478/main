namespace game.mod.more {

    export class TimeGoddessView extends eui.Component {
        public grp_lv: eui.Group;
        public bar: ProgressBarComp;
        public btn_chat: Btn;
        public btn_event: Btn;
        public btn_gift: GiftBtn;
        public btn_card: Btn;
        public btn_exp: TimeGoddessExp;

        public grp_speedup: eui.Group;
        public lab_name: eui.Label;
        public lab_time: eui.Label;
        public btn_speedup: Btn;
        public item0: TimeGoddessIcon;
        public item1: TimeGoddessIcon;
        public item2: TimeGoddessIcon;
        public item3: TimeGoddessIcon;


        constructor() {
            super();
            this.skinName = "skins.more.TimeGoddessSkin";
        }
    }

}