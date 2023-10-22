namespace game.mod.compete {

    export class YouliWishBoxView extends eui.Component {

        public lab_desc: eui.Label;
        public lab_tip: eui.Label;
        public list_award:eui.List;

        constructor() {
            super();
            this.skinName = "skins.compete.YouliWishBoxSkin";
        }

    }
}