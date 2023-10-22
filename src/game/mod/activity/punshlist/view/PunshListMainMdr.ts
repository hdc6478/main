namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import ParamConfig = game.config.ParamConfig;

    export class PunshListMainMdr extends WndBaseMdr {
        private _proxy: PunshListProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xinfuchongbang",
                mdr: PunshListMdr,
                title: LanDef.xinfuchongbang_tip1,
                bg: 'xinfuzhongbang_bg',
                hintTypes: [ModName.Activity, MainActivityViewType.PunshList, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "chongbangtehui",
                mdr: PunshListGiftMdr,
                title: LanDef.xinfuchongbang_tip2,
                bg: '',
                hintTypes: [ModName.Activity, MainActivityViewType.PunshList, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "shenlingchongbang",
                mdr: PunshListRankMdr,
                title: LanDef.xinfuchongbang_tip3,
                bg: 'pass_rank_bg',
                hintTypes: [ModName.Activity, MainActivityViewType.PunshList, MdrTabBtnType.TabBtnType03]
            }
        ];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.PunshList);
            let proxy: ExchangeShopProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.ExchangeShop);
            let btnType: string = `0${ExchangeShopType.Type4}`;
            let title: string = proxy.getTitleByType(ExchangeShopType.Type4);
            let coinIndex0: number = proxy.getCoinIdByType(ExchangeShopType.Type4);
            let openIdx: number = proxy.getOpenIdxByType(ExchangeShopType.Type4);
            this._btnData.push({
                btnType,
                title,
                coinIndex0,
                bg: "beijingtu_duihuan",
                icon: `shop_type${ExchangeShopType.Type4}`,
                mdr: PunshListShopMdr,
                hintTypes: [ModName.Activity, MainActivityViewType.ExchangeShop, btnType],
                openIdx: openIdx
            });
        }

        protected onShow(): void {
            for (let k in this._btnData) {
                let data: WndBaseViewData = this._btnData[k];
                if (data.btnType == MdrTabBtnType.TabBtnType03) {
                    data.icon = `${this._proxy.type}chongbang`;
                    data.title = this._proxy.getRankTitleByType(this._proxy.type);
                }
            }
            super.onShow();
        }

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            if (data.btnType == MdrTabBtnType.TabBtnType03) {
                let cfg: ParamConfig = GameConfig.getParamConfigById("chonglist_mark");
                let score: number = this._proxy.model.score;
                if (score < cfg.value) {
                    PromptBox.getIns().show(`需新服冲榜${cfg.value}积分`);
                    return false;
                    // return true;
                }
            }
            return super.onTabCheck(index);
        }
    }
}