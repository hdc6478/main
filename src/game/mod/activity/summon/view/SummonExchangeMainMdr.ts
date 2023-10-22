namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class SummonExchangeMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhaohuanbiaoqiantubiao",
                mdr: SummonExchangeMdr,
                title: LanDef.liquanduihuan,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonExchange],
            }
        ];

        protected onShow(): void {
            super.onShow();
        }
    }
}