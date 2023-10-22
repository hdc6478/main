namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class TongtiangeRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: TongtiangeRankMainBtnType.Btn1,
                icon: "personal_rank_",
                mdr: TongtiangeRankMdr1,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg"
            },
            {
                btnType: TongtiangeRankMainBtnType.Btn2,
                icon: "xianzongpaimingbiaoqiantubiao",
                mdr: TongtiangeRankMdr2,
                title: LanDef.pass_rank,
                bg: "pass_rank_bg"
            }
        ];
    }

}