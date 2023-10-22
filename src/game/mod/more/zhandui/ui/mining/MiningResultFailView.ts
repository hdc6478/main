namespace game.mod.more {

    export class MiningResultFailView extends eui.Component {
        public closeTips: game.mod.CloseTips;
        public icon_group: eui.Group;
        // public grp_eft: eui.Group;
        public img_title: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.MiningResultFailSkin";
        }
    }

}