namespace game.mod.activity {

    export class YjjsFirstItem extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public redPoint: eui.Image;
        public coinItem: game.mod.CoinItem;
        public gr_bar: eui.Group;
        public bar: game.mod.ProgressBarComp;

        data: IYjjsFirstItemData;

        constructor() {
            super();
            this.skinName = `skins.activity.YjjsFirstItemSkin`;
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
            this.redPoint.visible = !!data.hint;
            this.img_bg.source = ResUtil.getUiPng(`yaojijiangshi_${this.itemIndex + 1}`);

            if (this.itemIndex == 3) {
                //3瑶姬宝库展示仙神玉，不需要进度
                this.coinItem.visible = true;
                this.gr_bar.visible = false;
                this.coinItem.setData(PropIndex.Xianshenyu);
            } else if (this.itemIndex == 4) {
                //4累充礼包
                this.gr_bar.visible = this.coinItem.visible = false;
            } else {
                this.gr_bar.visible = true;
                this.coinItem.visible = false;
                this.bar.show(data.val, data.max, false, 0, false, ProgressBarType.Percent);
            }
        }
    }

    export interface IYjjsFirstItemData {
        hint: boolean;
        val: number;
        max: number;
    }
}