namespace game.mod.store {

    export class StoreType2View extends eui.Component {
        public list: eui.List;
        public storeBar: game.mod.store.StoreBarView;

        constructor() {
            super();
            this.skinName = "skins.store.StoreType2Skin";
        }
    }
}