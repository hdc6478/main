namespace game.mod.consecrate {


    import ArrayCollection = eui.ArrayCollection;
    import GongfengShowConfig = game.config.GongfengShowConfig;
    import LanDef = game.localization.LanDef;

    export class ConsecratePreviewRewardMdr extends MdrBase {
        private _view: BasePreviewRewardView = this.mark("_view", BasePreviewRewardView);
        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.secondPop.titleStr = LanDef.relic2;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = ConsecratePreviewRewardItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
        }

        private updateItemList(): void {
            let cfgList: GongfengShowConfig[] = getConfigListByName(ConfigName.GongfengShow);
            if (this._itemList.source.length) {
                this._itemList.replaceAll(cfgList);
            } else {
                this._itemList.source = cfgList;
            }
        }
    }
}