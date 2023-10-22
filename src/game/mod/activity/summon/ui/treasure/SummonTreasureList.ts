namespace game.mod.activity {

    import TreasureboxConfig = game.config.TreasureboxConfig;

    export class SummonTreasureList extends BaseListenerRenderer {
        public list: eui.List;

        private _listData: eui.ArrayCollection;
        data: TreasureboxConfig[];

        constructor() {
            super();
            this.skinName = `skins.activity.SummonTreasureListSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = SummonTreasureItem;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data);
        }
    }
}