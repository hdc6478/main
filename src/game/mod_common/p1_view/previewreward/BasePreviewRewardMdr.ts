namespace game.mod {


    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    /**
     * 通用的奖励预览弹窗
     */
    export class BasePreviewRewardMdr extends MdrBase {
        protected _view: BasePreviewRewardView = this.mark("_view", BasePreviewRewardView);
        protected _itemList: ArrayCollection;
        protected _showArgs: BasePreviewRewardData[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.secondPop.titleStr = LanDef.relic2;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = BasePreviewRewardItem;
            this._view.list_item.dataProvider = this._itemList;
            this._view.list_item.useVirtualLayout = false;
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs || !Array.isArray(this._showArgs)) {
                return;
            }
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
            this.updateItemList();
        }

        protected updateItemList(): void {
            this._itemList.replaceAll(this._showArgs);
        }
    }
}