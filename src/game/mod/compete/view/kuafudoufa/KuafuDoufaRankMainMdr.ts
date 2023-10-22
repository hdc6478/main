namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class KuafuDoufaRankMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianzongpaimingbiaoqiantubiao",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: KuafuDoufaGuildRankMdr,
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "personal_rank_",
                title: LanDef.pass_rank,
                bg: "pass_rank_bg",
                mdr: KuafuDoufaPersonalRankMdr,
            }
        ];

    }
}