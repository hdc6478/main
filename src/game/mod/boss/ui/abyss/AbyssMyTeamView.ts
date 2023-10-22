namespace game.mod.boss {

    export class AbyssMyTeamView extends eui.Component {
        public list_item: eui.List;
        public secondPop: SecondPop;
        public lab_hurt: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.boss.AbyssMyTeamSkin";
        }
    }
}