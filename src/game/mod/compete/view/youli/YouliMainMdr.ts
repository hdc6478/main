namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class YouliMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: CompeteMainBtnType.Youli,
                icon: "youli_tab",
                mdr: YouliMdr,
                title: LanDef.youli,
                bg: "youli_bg",
                hintTypes: [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Youli],/**CompeteMain需要绑定红点*/
            }
        ];

    }
}