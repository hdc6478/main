namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class GoddessMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: GoddessMainBtnType.Goddess,
                icon: "goddess_tab",
                mdr: GoddessMdr,
                title: LanDef.huanggu_nvshen_tips,
                bg: "goddess_bg",
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.GoddessMain, GoddessMainBtnType.Goddess],
            }
        ];

    }
}