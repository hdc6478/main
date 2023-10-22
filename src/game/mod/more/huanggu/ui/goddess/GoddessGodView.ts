namespace game.mod.more {

    export class GoddessGodView extends eui.Component {
        public grp_god: eui.Group;
        public lab_desc: eui.Label;
        public lab_lv: eui.Label;
        public lab_act: eui.Label;
        public btn_act: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.GoddessGodSkin";
        }
    }
}