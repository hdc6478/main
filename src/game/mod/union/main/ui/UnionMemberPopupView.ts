namespace game.mod.union {

    export class UnionMemberPopupView extends eui.Component {

        public secondPop: SecondPop;
        public img_bg: eui.Image;
        public head: HeadVip;
        public power: Power;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public btn_down: Btn;
        public btn_up: Btn;
        public grp_eff: eui.Group;
        public img_job: eui.Image;
        public img_di: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.union.UnionMemberPopupSkin";
            this.touchEnabled = false;
        }
    }

}