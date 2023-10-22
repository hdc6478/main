namespace game.mod.activity {

    export class ZcxCoinItem extends BaseListenerRenderer {
        public img_cost: eui.Image;
        public lab_cost: eui.Label;

        data: number[];

        constructor() {
            super();
            this.skinName = `skins.common.CoinItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = GameConfig.getPropConfigById(data[0]);
            this.img_cost.source = cfg.icon;
            let have_cnt = BagUtil.getPropCntByIdx(data[0]);
            this.lab_cost.textFlow = TextUtil.parseHtml(TextUtil.addColor(data[1] + '',
                have_cnt >= data[1] ? BlackColor.GREEN : BlackColor.RED));
        }
    }
}