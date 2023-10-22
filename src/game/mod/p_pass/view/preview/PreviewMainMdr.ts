namespace game.mod.pass {

    import LanDef = game.localization.LanDef;

    export class PreviewMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                // openIdx: OpenIdx.Pass,
                icon: "gongnengyulan",
                title: LanDef.func_open,
                bg: "pass_bg",
                mdr: PreviewMdr,
                hintTypes: [ModName.Pass,PassViewType.PassMain+ PassMainBtnType.Main, PassViewType.Preview],
            },
        ];

    }
}