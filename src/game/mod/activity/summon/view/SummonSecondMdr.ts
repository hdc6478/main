namespace game.mod.activity {

    /**召唤系统命运豪礼 */
    export class SummonSecondMdr extends WndSecondMdr {
        private _proxy: SummonProxy;

        protected onInit() {
            super.onInit();
            this._proxy = getProxy(ModName.Activity, ProxyType.Summon);
        }

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "achievement_tab_icon",
                mdr: SummonGiftMdr,
                title: 'surface_tips8',
                // openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "rank_tab_icon",
                mdr: SummonGiftMdr,
                title: 'surface_tips8',
                // openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "special_tab_icon",
                mdr: SummonGiftMdr,
                title: 'surface_tips8',
                // openIdx: 0,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift, MdrTabBtnType.TabBtnType03]
            }
        ];

        protected onTabCheck(index: number): boolean {
            this._proxy.mdrType = index + 1;
            return super.onTabCheck(index);
        }

        protected onHide() {
            super.onHide();
            this._proxy.mdrType = 1;
        }
    }

}