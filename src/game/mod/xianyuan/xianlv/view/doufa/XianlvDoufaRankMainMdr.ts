namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;

    export class XianlvDoufaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "personal_rank_",
                mdr: XianlvDoufaRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: []
            }
        ];

    }
}