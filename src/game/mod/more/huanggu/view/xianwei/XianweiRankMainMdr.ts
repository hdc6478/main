namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XianweiRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "personal_rank_",
                mdr: XianweiRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                // hintTypes: []
            }
        ]
    }
}