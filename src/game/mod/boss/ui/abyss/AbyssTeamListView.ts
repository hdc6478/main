namespace game.mod.boss {

    export class AbyssTeamListView extends eui.Component {
        public list_item: eui.List;
        public secondPop: SecondPop;

        constructor() {
            super();
            this.skinName = "skins.boss.AbyssTeamListSkin";
        }
    }
}