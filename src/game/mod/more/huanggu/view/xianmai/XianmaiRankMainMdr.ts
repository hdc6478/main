namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class XianmaiRanMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongpaimingbiaoqiantubiao",
                mdr: XianmaiRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: []
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "personal_rank_",
                mdr: XianmaiRank2Mdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: []
            }
        ];

    }
}