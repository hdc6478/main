namespace game.mod.more {
    import Event = egret.Event;
    import facade = base.facade;

    export class ArtifactTipsItem extends eui.Component {

        private btn_suit: ArtifactIconBtn;
        private item_1: ArtifactBuweiItem;
        private item_2: ArtifactBuweiItem;
        private item_3: ArtifactBuweiItem;
        private item_4: ArtifactBuweiItem;

        private _proxy: SkyPalaceProxy;

        constructor() {
            super();
            this.skinName = "skins.more.ArtifactTipsItemSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.SkyPalace);
        }

        private onRemove() {
        }

        public setData(index: number): void {
            for (let i = 0; i < 4; i++) {
                let pos: number = i + 1;
                let item: ArtifactBuweiItem = this[`item_${pos}`];
                item.setData({index, pos});
            }

            let info = this._proxy.getInfo(index);
            let level: number = info && info.level || 0;
            this.btn_suit.setData(index, level);
        }

    }
}