namespace game.mod.daily {

    import LanDef = game.localization.LanDef;
    import DailyWanfaConfig = game.config.DailyWanfaConfig;

    export class DailyMainMdr extends WndBaseMdr {
        private _proxy: DailyProxy;

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: DailyMainBtnType.BtnLiveness,
                icon: "ui_tab_liveness_",
                title: LanDef.liveness,
                bg: "liveness_bg",
                mdr: LivenessMdr,
                hintTypes: [ModName.Daily, DailyViewType.DailyMain + DailyMainBtnType.BtnLiveness]
            },
            {
                btnType: DailyMainBtnType.BtnWanfa,
                icon: "ui_tab_wanfa_",
                title: 'wanfa',
                bg: "",
                mdr: WanfaMdr,
                hintTypes: [ModName.Daily, DailyViewType.DailyMain + DailyMainBtnType.BtnWanfa]
            },
            {
                btnType: DailyMainBtnType.BtnLimitTimeAct,
                openIdx: OpenIdx.DailyLimitTime,
                icon: "xianshibiaoqiantubiao",
                title: 'xianshi',
                bg: "",
                mdr: DailyLimitTimeActMdr,
                hintTypes: [ModName.Daily, DailyViewType.DailyMain + DailyMainBtnType.BtnLimitTimeAct]
            }
        ];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Daily);
        }

        /** 刷新分页红点 ,重写*/
        protected updateTabHint(): void {
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                if(!btnData.hintTypes){
                    continue;
                }
                let hint = HintMgr.getHint(btnData.hintTypes);

                if(!hint && btnData.btnType == DailyMainBtnType.BtnWanfa){
                    hint = this._proxy.getOtherHint();
                }

                if(!!btnData.showHint != hint){//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
            }
        }

    }
}