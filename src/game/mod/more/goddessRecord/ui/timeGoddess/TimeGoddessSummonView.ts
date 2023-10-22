namespace game.mod.more {

    export class TimeGoddessSummonView extends eui.Component {
        public grp_eft: eui.Group;
        public btn_exp: TimeGoddessExp;
        public img_type: eui.Image;
        public item0: TimeGoddessSummonItem;
        public item1: TimeGoddessSummonItem;
        public item2: TimeGoddessSummonItem;
        public item3: TimeGoddessSummonItem;
        public item4: TimeGoddessSummonItem;
        public lab_act: eui.Label;
        public btn_reward: Btn;
        public btn_summon: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.TimeGoddessSummonSkin";
        }
    }

}