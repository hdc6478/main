namespace game.mod.store {


    export class StoreType2Mdr extends MdrBase {
        private _view: StoreType2View = this.mark("_view", StoreType2View);
        private _proxy: StoreProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Store);
            this._view.list.itemRenderer = StoreType2Item;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(StoreEvent.ON_UPDATE_CHARGE_INFO, this.onUpdateInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateListData();
        }

        private updateListData(): void {
            this._listData.replaceAll(this._proxy.getDirectShopCfgList(DirectShopType.Xianyu));
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateInfo(): void {
            this.updateListData();
        }
    }
}