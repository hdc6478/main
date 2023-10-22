namespace game.mod.rank {

    import LanDef = game.localization.LanDef;

    export class NewRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: RankMainBtnType.Rank,
                icon: "ui_tab_rank_",
                mdr: NewRankMdr,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                openIdx: OpenIdx.Rank,
                hintTypes: [ModName.Rank, RankViewType.NewRankMain, RankMainBtnType.Rank]
            }
        ];
    }

}