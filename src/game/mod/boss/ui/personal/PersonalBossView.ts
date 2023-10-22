namespace game.mod.boss {

    export class PersonalBossView extends eui.Component {
        public list_boss: eui.List;
        public btn_sweep: Btn;
        public lab_vip: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.boss.PersonalBossSkin";
        }
    }

}