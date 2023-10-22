namespace game.mod.activity {

    import Tween = base.Tween;

    export class ZcxFirstItem extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public bubbleItem: game.mod.activity.ZcxFirstBubbleItem;

        constructor() {
            super();
            this.skinName = `skins.activity.ZCXFirstItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data as IZCXFirstItemData;
            if (!data) {
                return;
            }
            this.img_bg.source = `zcx_type${data.index}`;
            if (data.isSel) {
                this.bubbleItem.updateView(getLanById(`zcx_tips${data.index}`));
                this.bubbleItem.visible = true;
                this.bubbleItem.scaleX = this.bubbleItem.scaleY = 0;
                Tween.get(this.bubbleItem)
                    .to({scaleX: 1, scaleY: 1}, 400);
            } else {
                this.bubbleItem.visible = false;
            }
        }
    }

    export interface IZCXFirstItemData {
        index: number;
        isSel: boolean;
    }
}