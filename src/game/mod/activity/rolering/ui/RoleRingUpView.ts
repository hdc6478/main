namespace game.mod.activity {

    export class RoleRingUpView extends eui.Component {
        public secondPop: SecondPop;
        public grp_eff: eui.Group;
        public btn_reward: Btn;
        public lab_desc: eui.Label;
        public bar: ProgressBarComp;
        public lab_val: eui.Label;
        public lab_charge: eui.Label;
        public btn_up: Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.RoleRingUpSkin";
        }
    }

}