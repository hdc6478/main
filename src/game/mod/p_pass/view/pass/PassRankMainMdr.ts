namespace game.mod.pass {

    import LanDef = game.localization.LanDef;

    export class PassRankMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: PassRankMainBtnType.Rank,
                icon: "ui_tab_rank_",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: PassRankMdr,
            }
        ];
    }
}