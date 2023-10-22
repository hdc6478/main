namespace game.mod.more {

    export class GoddessView extends eui.Component {
        public grp_haoganLv: eui.Group;
        public bar: ProgressBarComp;
        public power2: Power2;
        public btn_chat: Btn;
        public btn_event: Btn;
        public btn_target: Btn;
        public btn_gift: GiftBtn;
        public god_item: game.mod.AttrGodItem;
        public btn_exp: GoddessExp;
        public btn_summon: Btn;
        public item_summon: CoinItem;
        public lab_tips: eui.Label;
        public btn_consecrate: Btn;
        public lab_reward: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.GoddessSkin";
        }
    }

}