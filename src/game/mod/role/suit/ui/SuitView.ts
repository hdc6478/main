namespace game.mod.role {

    export class SuitView extends eui.Component {
        public power: game.mod.Power2;
        public gr_eff: eui.Group;
        public iconComp: game.mod.role.SuitIconList;
        public gr_advance: eui.Group;
        public img_suittype: eui.Image;
        public btn_fanli: game.mod.Btn;
        public btn_compose: game.mod.Btn;
        public btn_up: game.mod.role.SuitUpLvBtn;
        public gr_font0: eui.Group;
        public lb_next: eui.Label;
        public gr_strengthen: eui.Group;
        public btn_oneKey: game.mod.Btn;
        public btn_stengthen: game.mod.role.SuitStrengthenMasterBtn;
        public lb_strengthen: eui.Label;
        public gr_font: eui.Group;
        public img_desc: eui.Image;
        public btn_onekeydress: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.role.SuitSkin";
        }
    }
}