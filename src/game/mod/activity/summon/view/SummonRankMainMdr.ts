namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class SummonRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhaohuanbiaoqiantubiao",
                mdr: SummonRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Zhaohuan, MainActivityViewType.SummonRank],
            }
        ];

        protected onShow(): void {
            super.onShow();
        }
    }
}