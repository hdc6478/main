namespace game.mod.compete {

    import LanDef = game.localization.LanDef;

    export class DoufaMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: CompeteMainBtnType.Doufa,
                icon: "doufa_tab",
                mdr: DoufaMdr,
                title: LanDef.doufa_tips19,
                bg: "doufa_bg1",
                hintTypes: [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Doufa],/**CompeteMain需要绑定红点*/
            },
            {
                btnType: CompeteMainBtnType.KuafuDoufa,
                icon: "kuafu_doufa_tab",
                mdr: KuafuDoufaMdr,
                openIdx: OpenIdx.KuafuDoufa,
                title: LanDef.kuafu_doufa_tips,
                bg: "kuafu_doufa_bg",
                hintTypes: [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.KuafuDoufa],/**CompeteMain需要绑定红点*/
            }
        ];

    }
}