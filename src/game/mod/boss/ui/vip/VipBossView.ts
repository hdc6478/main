namespace game.mod.boss {

    export class VipBossView extends eui.Component {

        public grp_eff: eui.Group;
        public list_gate: eui.List;
        public lab_boss_name: eui.Label;
        public list_awd: eui.List;
        public btn_awd_preview: game.mod.Btn;
        public btn_fight: game.mod.Btn;
        public timeItem: game.mod.TimeItem;
        public scroller: eui.Scroller;
        public list_type: eui.List;
        public img_title: eui.Image;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.boss.VipBossSkin";
        }

    }
}