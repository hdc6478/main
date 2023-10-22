namespace game.mod.boss {

    import LanDef = game.localization.LanDef;

    export class CrossBossRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: CrossBossRankMainBtnType.Zongmen,
                icon: "xianzongpaimingbiaoqiantubiao",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: CrossBossGuildRankMdr,
            },
            {
                btnType: CrossBossRankMainBtnType.Personal,
                icon: "personal_rank_",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: CrossBossPersonalRankMdr,
            }
        ];

    }
}