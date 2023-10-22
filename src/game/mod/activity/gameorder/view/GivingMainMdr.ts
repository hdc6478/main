namespace game.mod.activity {

    import GameOrderTypeConfig = game.config.GameOrderTypeConfig;

    export class GivingMainMdr extends WndBaseMdr {
        private _proxy: GameOrderProxy;

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.GameOrder);
            super.onInit();
        }

        protected onShow(): void {
            this._btnData = [];
            let types: number[] = this._proxy.getTypeListForMdr();
            if (types.length > 0) {
                for (let type of types) {
                    let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, type);
                    this._btnData.push({
                        btnType: this._proxy.model.btnTypeByType[type],
                        icon: `tab_${type}_giving`,
                        mdr: GivingMdr,
                        title: cfg.name,
                        hintTypes: this._proxy.model.hintPath[type],
                    });
                }
            }
            super.onShow();
        }

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            this._proxy.mdrType = +data.btnType;
            if (this._proxy.mdrType == GameOrderType.Chuangguanling) {
                BtnTipsMgr.getIns().hideTips(BtnIconId.Giving);
            }
            return super.onTabCheck(index);
        }

        protected onHide() {
            super.onHide();
            this._proxy.mdrType = 1;
        }
    }
}