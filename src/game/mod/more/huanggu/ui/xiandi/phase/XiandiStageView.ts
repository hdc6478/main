namespace game.mod.more {


    export class XiandiStageView extends eui.Component {

        public btn_right: Btn;
        public btn_left: Btn;
        public btn_shilian: Btn;
        public btn_act: Btn;

        // public lab_limit: eui.Label;
        public grp_limit: eui.Group;
        public grp_day: eui.Group;
        public power: Power2;
        public grp_eft: eui.Group;

        public grp_font: eui.Group;

        lab_desc1: eui.Label;
        lab_desc2: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiStageSkin";
        }
    }

}