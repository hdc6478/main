namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import XianchiRewardConfig = game.config.XianchiRewardConfig;

    export class XianchiRewardMdr extends EffectMdrBase {
        private _view: XianchiRewardView = this.mark("_view", XianchiRewardView);
        private _proxy: XianchiProxy;
        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = XianchiRewardItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Xianchi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateItemList(): void {
            let cfgList: XianchiRewardConfig[] = getConfigListByName(ConfigName.XianchiReward);
            let items = cfgList.concat();
            this._itemList.source = items;
        }

    }
}