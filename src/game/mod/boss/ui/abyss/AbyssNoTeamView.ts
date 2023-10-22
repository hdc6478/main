namespace game.mod.boss {

    export class AbyssNoTeamView extends eui.Component {
        public btn_invite:Btn;
        public btn_union:Btn;
        public btn_team:Btn;
        public lab_tips1:eui.Label;
        public lab_tips2:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.boss.AbyssNoTeamSkin";
        }
    }
}