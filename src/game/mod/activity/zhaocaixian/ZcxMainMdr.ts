namespace game.mod.activity {

    import GameOrderTypeConfig = game.config.GameOrderTypeConfig;
    import LanDef = game.localization.LanDef;

    export class ZcxMainMdr extends WndBaseMdr {
        private _proxy: ZcxProxy;
        private _gameOrderProxy: GameOrderProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._gameOrderProxy = this.retProxy(ProxyType.GameOrder);
        }

        //充值前界面
        private _firstBtnData: WndBaseViewData[] = [
            {
                btnType: ZcxMainBtnType.NoPay,
                icon: "zhaocaixianbiaoqiantubiao",
                mdr: ZcxFirstMdr,
                title: LanDef.zcx_tips6,
                bg: "zcx_first"
            }
        ];

        //充值后界面
        private _openBtnData: WndBaseViewData[] = [
            {
                btnType: ZcxMainBtnType.LuckNum,
                icon: "xingyunshuzibiaoqiantubiao",
                mdr: ZcxMdr1,
                title: LanDef.zcx_tips7,
                bg: "zcx_bg1",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.LuckNum]
            },
            {
                btnType: ZcxMainBtnType.Bank,
                icon: "jinbaoqianzhuangbiaoqiantubiao",
                mdr: ZcxMdr2,
                title: LanDef.zcx_tips8,
                bg: "zcx_bg2",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Bank]
            },
            {
                btnType: ZcxMainBtnType.Fuben,
                icon: "caishenfubenbiaoqiantubiao",
                mdr: ZcxMdr3,
                title: LanDef.zcx_tips9,
                bg: "zcx_bg3",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Fuben]
            },
            {
                btnType: ZcxMainBtnType.Exchange,
                icon: "caishenduihuanbiaoqiantubiao",
                mdr: ZcxMdr4,
                title: LanDef.zcx_tips10,
                bg: "zcx_bg4",
                openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Exchange]
            }
        ];

        //二期内容，战令+基金
        private _openBtnData2: WndBaseViewData[] = [
            {
                btnType: ZcxMainBtnType.Chaojilicai,
                icon: "chaojilicaibiaoqiantubiao",
                mdr: ZcxMdr5,
                bg: "",
                openIdx: OpenIdx.Chaojilicai,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Chaojilicai],
                param: GameOrderType.Chaojilicai
            },
            {
                btnType: ZcxMainBtnType.Zhizunlicai,
                icon: "zhizunlicaibiaoqiantubiao",
                mdr: ZcxMdr6,
                bg: "",
                openIdx: OpenIdx.Zhizunlicai,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Zhizunlicai],
                param: GameOrderType.Zhizunlicai
            },
            {
                btnType: ZcxMainBtnType.Fulijijin,
                icon: "fulijijinbiaoqiantubiao",
                mdr: ZcxMdr7,
                title: LanDef.zcx_tips11,
                bg: "zcx_fund_bg",
                openIdx: OpenIdx.Fulijijin,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Fulijijin]
            },
            {
                btnType: ZcxMainBtnType.Chaojijijin,
                icon: "chaojijijinbiaoqiantubiao",
                mdr: ZcxMdr8,
                title: LanDef.zcx_tips12,
                bg: "zcx_fund_bg",
                openIdx: OpenIdx.Chaojijijin,
                hintTypes: [ModName.Activity, MainActivityViewType.ZcxMain, ZcxMainBtnType.Chaojijijin]
            }
        ];

        protected updateBtnList() {
            this.setBtnData();
            super.updateBtnList();
        }

        private setBtnData(): void {
            if (this._proxy.isOpen()) {
                let list: WndBaseViewData[] = this._openBtnData.concat();
                for (let btnData of this._openBtnData2) {
                    if (btnData && btnData.param) {
                        let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, btnData.param);
                        btnData.title = cfg.name;
                        // if (this._gameOrderProxy.getInfoByType(btnData.param)) {
                        list.push(btnData);
                        // }
                    } else {
                        list.push(btnData);
                    }
                }
                this._btnData = list;
            } else {
                this._btnData = this._firstBtnData;
            }
        }
    }

}