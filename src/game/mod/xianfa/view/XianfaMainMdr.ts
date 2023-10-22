namespace game.mod.xianfa {

    import LanDef = game.localization.LanDef;

    export class XianfaMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: XianfaMainBtnType.BtnXianfa,
                openIdx: OpenIdx.Xianfa,
                icon: "ui_tab_xianfa_",
                title: LanDef.xianfa_1,
                bg: "xianfa_bg",
                mdr: XianfaMdr,
                hintTypes: [ModName.Xianfa, XianfaViewType.XianfaMain + XianfaMainBtnType.BtnXianfa],
            },
        ];

    }
}