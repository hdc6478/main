namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionLotteryMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianmentiantanbiaoqiantubiao",
                mdr: UnionTianLotteryMdr,
                bg: "bg_xianmentiantan",
                title: LanDef.union_title_5,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionLottery, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "xianmenshengtanbiaoqiantubiao",
                mdr: UnionShengLotteryMdr,
                title: LanDef.union_title_6,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionLottery, MdrTabBtnType.TabBtnType02]
            }
        ];

    }
}