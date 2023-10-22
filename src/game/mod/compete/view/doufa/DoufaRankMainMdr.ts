namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class DoufaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "benfupaimingbiaoqian",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: DoufaRankMdr1,
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "kuafu_rank_tab",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: DoufaRankMdr2,
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "dianfengpaimingbiaoqiantubiao",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: DoufaRankMdr3,
            },
        ];

    }
}