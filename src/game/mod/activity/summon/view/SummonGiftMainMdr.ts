namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class SummonGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "icon_lottery",
                mdr: SummonSecondMdr,
                title: LanDef.zhanlizhuanpan,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonGift],
            }
        ];

        protected onShow(): void {
            super.onShow();
        }
    }
}