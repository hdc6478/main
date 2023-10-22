namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class FengmoRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongpaimingbiaoqiantubiao",
                mdr: FengmoRankMdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: []
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "personal_rank_",
                mdr: FengmoRank2Mdr,
                bg: 'pass_rank_bg',
                title: LanDef.pass_rank,
                hintTypes: []
            }
        ];

    }
}