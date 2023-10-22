namespace game.mod.activity {

    import ZcxLuckNumberConfig = game.config.ZcxLuckNumberConfig;

    export class ZcxItem1 extends BaseListenerRenderer {
        public list: eui.List;
        public img_rank: eui.Image;

        data: ZcxLuckNumberConfig;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.activity.ZcxItemSkin1`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = Icon;
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
            this.img_rank.source = `dengjiang${data.index}`;
            this._listData.replaceAll([...data.rewards]);
        }
    }
}