namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class YouliAwardMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "youli_award_tab",
                mdr: YouliAwardMdr,
                title: LanDef.youli_award,
                bg: "p1_del_bg",
                hintTypes: [ModName.Compete, CompeteViewType.YouliAwardMain + YouliAwardMainBtnType.Step],
            }
        ];

    }
}