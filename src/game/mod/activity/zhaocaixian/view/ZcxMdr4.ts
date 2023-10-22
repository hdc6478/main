namespace game.mod.activity {

    import ZcxExchangeConfig = game.config.ZcxExchangeConfig;

    export class ZcxMdr4 extends MdrBase {
        private _view: ZcxView4 = this.mark("_view", ZcxView4);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = ZcxItem4;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(ActivityEvent.ON_ZCX_EXCHANGE_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.updateBigReward();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._listData.replaceAll(getConfigListByName(ConfigName.ZcxExchange));
        }

        private updateBigReward(): void {
            let cfg: ZcxExchangeConfig = getConfigByNameId(ConfigName.ZcxExchange, 1);
            this._view.icon_bigReward.data = cfg.rewards[0];
        }
    }
}