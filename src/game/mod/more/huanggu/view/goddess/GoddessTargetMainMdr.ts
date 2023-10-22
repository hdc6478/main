namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class GoddessTargetMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: GoddessTargetMainBtnType.Target,
                icon: "goddess_target_tab",
                mdr: GoddessTargetMdr,
                title: LanDef.huanggu_nvshen_tips23,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu,
                    MoreViewType.GoddessMain, GoddessMainBtnType.Goddess, MoreViewType.GoddessTargetMain, GoddessTargetMainBtnType.Target],
            }
        ];

    }
}