namespace game.mod.role {

    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuGrowMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "nvpuyangcheng_icon",
                mdr: XiuxianNvpuGrowMdr,
                title: LanDef.xiuxiannvpu_tips4,
                bg: "nvpuyangcheng_bg",
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.XiuxianNvpuGrowMain, MdrTabBtnType.TabBtnType01]
            }
        ];
    }

}