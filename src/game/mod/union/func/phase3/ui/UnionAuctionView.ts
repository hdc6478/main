namespace game.mod.union {


    export class UnionAuctionView extends eui.Component {

        list: eui.List;
        // img_ditu: eui.Image;
        grp_tips: eui.Group;
        lab_explain: eui.Label;
        lab_jump: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.union.UnionAuctionSkin";
        }
    }

}