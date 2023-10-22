namespace game.mod.activity {
    import LanDef = game.localization.LanDef;

    export class SupremeGitMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhizun_tab",
                mdr: SupremeGitMdr,
                title: LanDef.supremegit,
                bg: "zhizunlibao_bg",
                hintTypes: [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.SupremeGitMain, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "xianchi_tab",
                mdr: XianchiMdr,
                title: LanDef.xianchi_tips,
                bg: "xianchi_bg",
                openIdx: OpenIdx.Xianchi,
                hintTypes: [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.SupremeGitMain, MdrTabBtnType.TabBtnType02]
            }
        ];
    }
}