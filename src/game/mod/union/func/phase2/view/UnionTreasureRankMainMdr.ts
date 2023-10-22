namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    export class UnionTreasureRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongpaimingbiaoqiantubiao",
                mdr: UnionTreasureRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure, UnionMainType.UnionTreasureRank, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "personal_rank_",
                mdr: UnionTreasureRank2Mdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: [ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure, UnionMainType.UnionTreasureRank, MdrTabBtnType.TabBtnType02]
            }
        ];

    }
}