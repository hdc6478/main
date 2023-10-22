namespace game.mod.role {

    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "mubiaofanli_icon",
                mdr: XiuxianNvpuGiftMdr,
                title: LanDef.yuanling_tips5,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.XiuxianNvpuGrowMain, MdrTabBtnType.TabBtnType01, MdrTabBtnType.TabBtnType01]
            }
        ];
    }

}