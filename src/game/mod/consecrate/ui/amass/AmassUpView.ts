namespace game.mod.consecrate {

    export class AmassUpView extends eui.Component {

        public img_bg: eui.Image;
        public grp_lv: eui.Group;
        public lab_name: eui.Label;
        public lab_desc: eui.Label;
        public power: Power;
        public bar: ProgressBarComp;
        public icon: Icon;
        public btn_up: Btn;

        constructor() {
            super();
            this.skinName = "skins.consecrate.AmassUpSkin";
        }
    }

}