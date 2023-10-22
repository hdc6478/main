namespace game.mod.vip {

    export class VipMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: VipMainBtnType.Vip,
                icon: "VIPbiaoqiantubiao",
                mdr: VipMdr,
                title: "VIP",
                bg: "vip_bg0",
                openIdx: 0,
                hintTypes: [ModName.Vip, VipViewType.VipMain, VipMainBtnType.Vip]
            },
            {
                btnType: VipMainBtnType.VipPrivilege,
                icon: "VIPtequanbiaoqiantubiao",
                mdr: VipPrivilegeMdr,
                title: "VIP",
                bg: "vip_bg1",
                openIdx: 0,
                hintTypes: [ModName.Vip, VipViewType.VipMain, VipMainBtnType.VipPrivilege]
            }
        ];
    }

}