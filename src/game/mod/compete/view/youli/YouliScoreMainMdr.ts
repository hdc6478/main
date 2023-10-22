namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class YouliScoreMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "youli_score_tab",
                mdr: YouliScoreMdr,
                title: LanDef.youli_score,
                bg: "p1_del_bg",
                hintTypes: [ModName.Compete, CompeteViewType.YouliScoreMain + YouliScoreMainBtnType.Score],
            }
        ];

    }
}