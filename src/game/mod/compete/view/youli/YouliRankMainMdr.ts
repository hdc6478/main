namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class YouliRankMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "ui_tab_rank_",
                mdr: YouliRankMdr,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
            }
        ];

    }
}