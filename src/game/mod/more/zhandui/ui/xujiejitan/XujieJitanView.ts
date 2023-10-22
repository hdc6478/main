namespace game.mod.more {

    export class XujieJitanView extends eui.Component {
        public btn_rule: game.mod.Btn;
        public btn_gift: game.mod.Btn;
        public btn_upstar: game.mod.UpStarBtn;
        public gr_eft: eui.Group;
        public btn_huanhua: game.mod.Btn;
        public itemComp: game.mod.more.XujieJitanIconItemComp;
        public seasonComp: game.mod.more.XujieJitanSeasonComp;
        public sacrificeItem: game.mod.more.XujiejitanSacrificeItem;
        public nameItem: game.mod.AvatarNameItem;
        public gr_lv: eui.Group;
        public gr_cost: eui.Group;
        public coin: game.mod.CoinItem;
        public img_max: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.XujieJitanSkin";
        }
    }
}