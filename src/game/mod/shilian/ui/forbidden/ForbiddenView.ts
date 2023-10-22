namespace game.mod.shilian {

    export class ForbiddenView extends eui.Component {

        public grp_eff: eui.Group;
        public list_big_gate: eui.List;
        public lab_gate: eui.Label;
        public lab_boss_name: eui.Label;
        public gate_awd: ForbiddenGateAwd;
        public list_awd: eui.List;
        public btn_saodan: game.mod.Btn;
        public btn_fight: game.mod.Btn;
        public lab_saodang_times: eui.Label;
        public list_type: eui.List;
        public grp_awd_list: eui.Group;
        public scr_biggate: eui.Scroller;
        public grp_saodang: eui.Group;
        public img_finished: eui.Image;
        public grp_font: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.shilian.ForbiddenSkin";
        }

    }
}