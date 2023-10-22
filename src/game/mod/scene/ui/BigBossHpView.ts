namespace game.mod.scene {

    export class BigBossHpView extends eui.Component {

        public img_hp1: eui.Image;
        public img_mask: eui.Image;
        public img_bai: eui.Image;
        public img_hp0: eui.Image;
        public lab_name: eui.Label;
        public lab_hp: eui.Label;
        public img_type: eui.Image;
        public img_icon: eui.Image;
        public btn_reward: game.mod.Btn;

        public grp_rank: eui.Group;
        public grp_myRank: eui.Group;
        public lab_myRank: eui.Label;
        public lab_myHurt: eui.Label;

        public grp_rank2: eui.Group;
        public list_rank: eui.List;

        public btn_rank: game.mod.Btn;

        public grp_damage: eui.Group;
        public grp_allDamage: eui.Group;
        public lab_allDamage: eui.Label;
        public lab_perDamage: eui.Label;

        public grp_damage2: eui.Group;
        public list_damage: eui.List;

        public btn_damage: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.scene.BigBossHpSkin";
        }
    }
}
