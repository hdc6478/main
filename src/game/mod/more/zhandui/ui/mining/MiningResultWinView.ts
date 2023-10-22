namespace game.mod.more {

    export class MiningResultWinView extends eui.Component {
        public closeTips: game.mod.CloseTips;
        public icon_group: eui.Group;
        // public grp_eft: eui.Group;
        public img_title: eui.Image;
        public lab_tips1:eui.Label;
        public lab_tips2:eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.MiningResultWinSkin";
        }
    }

}