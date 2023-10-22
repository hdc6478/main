namespace game.mod.bag {

    export class PropGainView extends eui.Component {
        public img_type: eui.Image;
        public grp_eft2: eui.Group;
        public grp_eft: eui.Group;
        public resultReward: ResultReward;
        public closeTips: game.mod.CloseTips;

        constructor() {
            super();
            this.skinName = "skins.bag.PropGainSkin";
        }
    }

}