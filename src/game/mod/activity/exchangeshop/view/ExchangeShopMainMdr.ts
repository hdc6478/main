namespace game.mod.activity {


    export class ExchangeShopMainMdr extends WndBaseMdr {
        private _proxy: ExchangeShopProxy;

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.ExchangeShop);
            super.onInit();
        }

        protected onShow(): void {
            let types: number[] = this._proxy.getListType();
            this._btnData = [];
            for (let type of types) {
                let btnType: string = `0${type}`;
                let title: string = this._proxy.getTitleByType(type);
                let coinIndex0: number = this._proxy.getCoinIdByType(type);
                let openIdx: number = this._proxy.getOpenIdxByType(type);
                this._btnData.push({
                    btnType,
                    title,
                    coinIndex0,
                    bg: "beijingtu_duihuan",
                    icon: `shop_type${type}`,
                    mdr: type == ExchangeShopType.Type5 ? ExchangeShopSpecialMdr : ExchangeShopMdr,
                    hintTypes: [ModName.Activity, MainActivityViewType.ExchangeShop, btnType],
                    openIdx: openIdx,
                });
            }
            super.onShow();
        }

        protected onTabCheck(index: number): boolean {
            // this._proxy.tabIdx = +this._btnData[index].btnType;
            // return true;
            let data: WndBaseViewData = this._btnList.source[index];
            this._proxy.shopType = +data.btnType;
            return super.onTabCheck(index);
        }

        protected onHide() {
            super.onHide();
        }
    }
}