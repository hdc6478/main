namespace game.mod.more {

    export class GoddessSummonView extends eui.Component {
        public grp_eft: eui.Group;
        public btn_close: Btn;
        public img_icon: eui.Image;
        public lab_act: eui.Label;
        public btn_reward: Btn;
        public bar: ProgressBarComp;
        public btn_summon: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.GoddessSummonSkin";
        }
    }
}