namespace game.mod.store {

    export class StoreType1View extends eui.Component {
        public icon_bigreward: game.mod.Icon;
        public lb_time: eui.Label;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.store.StoreType1Skin";
        }
    }
}