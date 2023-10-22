namespace game.mod.store {

    export class StoreType3View extends eui.Component {
        public img_bg: eui.Image;
        public icon_bigreward: game.mod.Icon;
        public lb_time: eui.Label;
        public list: eui.List;
        public lb_money: eui.Label;
        public bar: game.mod.ProgressBarComp;

        constructor() {
            super();
            this.skinName = "skins.store.StoreType3Skin";
        }
    }
}