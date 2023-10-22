namespace game.mod.activity {

    export class SummonView extends eui.Component {

        public img_bg: eui.Image;

        public icon: Icon;
        // public lab_tips: eui.Label;
        public gr: eui.Group;
        public group_eft: eui.Group;
        public checkbox: eui.CheckBox;
        public grp_havecount: eui.Group;
        public grp_count: eui.Group;
        public gr_eft: eui.Group;
        public img_must: eui.Image;
        public img_card: eui.Image;
        public img_zhekou: eui.Image;

        // public icon_once: eui.Image;
        // public count_once: eui.Label;
        // public icon_ten: eui.Image;
        // public count_ten: eui.Label;
        public cost_once: CostIcon;
        public cost_ten: CostIcon;
        public cost: CostIcon;

        public btn_once: Btn;
        public btn_ten: Btn;

        public btn_exchange: game.mod.Btn;
        public btn_gift: game.mod.Btn;
        public btn_rank: game.mod.Btn;
        public btn_zhanling: Btn;
        public btn_gain: Btn;
        public btn_explain: Btn;

        public head: HeadVip;
        public lab_name: eui.Label;

        public btn_carnival: game.mod.Btn;
        public lab_carnival: eui.Label;

        public img_ditu1:eui.Image;
        public img_ditu2:eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.SummonSkin";
        }
    }

}