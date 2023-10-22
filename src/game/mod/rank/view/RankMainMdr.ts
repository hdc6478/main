namespace game.mod.rank {

    import LanDef = game.localization.LanDef;

    export class RankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: RankMainBtnType.Rank,
                icon: "ui_tab_rank_",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: RankMdr,
            }
        ];

    }
}