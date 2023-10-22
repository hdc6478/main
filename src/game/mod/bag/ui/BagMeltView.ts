namespace game.mod.bag {

    export class BagMeltView extends eui.Component {
        public list_item: eui.List;
        public lab_desc: eui.Label;
        public img_icon: eui.Image;
        public lab_cnt: eui.Label;
        public lab_add: eui.Label;
        public lab_tips: eui.Label;
        public item: game.mod.CoinItem;
        public btn_shop: game.mod.Btn;
        public btn_melt: game.mod.Btn;
        public grp_roleRing: eui.Group;
        public btn_roleRing: Btn;

        constructor() {
            super();
            this.skinName = "skins.bag.BagMeltSkin";
        }
    }

}