namespace game.mod.enhance {

    import LanDef = game.localization.LanDef;

    export class EnhanceMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: EnhanceMainBtnType.BtnStrength,
                openIdx: OpenIdx.Strength,
                icon: "ui_tab_strength_",
                title: LanDef.enhance_1,
                bg: "strength_bg",
                mdr: StrengthMdr,
                hintTypes: [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength],
            },
            {
                btnType: EnhanceMainBtnType.BtnGem,
                openIdx: OpenIdx.Gem,
                icon: "ui_tab_gem_",
                title: LanDef.enhance_2,
                bg: "gem_bg",
                mdr: GemMdr,
                hintTypes: [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnGem],
            },
            {
                btnType: EnhanceMainBtnType.BtnAdvanced,
                openIdx: OpenIdx.Advanced,
                icon: "ui_tab_advanced_",
                title: LanDef.enhance_3,
                bg: "advanced_bg",
                mdr: AdvancedMdr,
                hintTypes: [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnAdvanced],
            },
        ];

    }
}