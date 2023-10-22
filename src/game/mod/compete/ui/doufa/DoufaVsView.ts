namespace game.mod.compete {

    export class DoufaVsView extends eui.Component {

        public img_player1: eui.Image;
        public lab_name1:eui.Label;
        public powerLabel1: game.mod.PowerLabel;

        public grp_player2: eui.Group;
        public img_player2: eui.Image;
        public lab_name2:eui.Label;
        public powerLabel2: game.mod.PowerLabel;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaVsSkin";
        }
    }
}
