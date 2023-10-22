namespace game.mod.role {

    export class RoleMod extends ModBase {

        constructor() {
            super(ModName.Role);
        }

        protected initCmd(): void {
        }

        protected initModel(): void {
            this.regProxy(ProxyType.Role, RoleProxy);
            this.regProxy(ProxyType.Title, TitleProxy);
            this.regProxy(ProxyType.DressUp, DressUpProxy);
            this.regProxy(ProxyType.Suit, SuitProxy);
            this.regProxy(ProxyType.XiuxianNvpu, XiuxianNvpuProxy);
        }

        protected initView(): void {
            this.regMdr(NewRoleViewType.RoleMain, RoleMainMdr);
            this.regMdr(NewRoleViewType.RoleAttrTips, RoleAttrTipsMdr);
            this.regMdr(NewRoleViewType.RoleEquipTips, RoleEquipTipsMdr);
            this.regMdr(NewRoleViewType.SuitMain, SuitMainMdr);
            this.regMdr(NewRoleViewType.SuitEquipTips, SuitEquipTipsMdr);
            this.regMdr(NewRoleViewType.SuitStageTips, SuitStageTipsMdr);
            this.regMdr(NewRoleViewType.SuitCompose, SuitComposeMdr);
            this.regMdr(NewRoleViewType.SuitStageStrengthenTips, SuitStageStrengthenTipsMdr);
            this.regMdr(NewRoleViewType.SuitEquipStrengthenTips, SuitEquipStrengthenTipsMdr);
            this.regMdr(NewRoleViewType.SuitEquipTips2, SuitEquipTipsMdr2);
            this.regMdr(NewRoleViewType.SuitForgeMaster, SuitForgeMasterMdr);
            this.regMdr(NewRoleViewType.SuitAttrTips, SuitAttrTipsMdr);
            this.regMdr(NewRoleViewType.SuitGiftMain, SuitGiftMainMdr);
            this.regMdr(NewRoleViewType.Wing, WingMainMdr);
            this.regMdr(NewRoleViewType.Weapon, WeaponMainMdr);
            this.regMdr(NewRoleViewType.Body, BodyMainMdr);

            this.regMdr(NewRoleViewType.RoleGod, RoleGodMdr);
            this.regMdr(NewRoleViewType.RoleGodDesc, RoleGodDescMdr);
            this.regMdr(NewRoleViewType.SuitEquipBagTips, SuitEquipBagTipsMdr);

            //修仙女仆
            this.regMdr(NewRoleViewType.XiuxianNvpuBuy, XiuxianNvpuBuyMdr);
            this.regMdr(NewRoleViewType.XiuxianNvpuGrowMain, XiuxianNvpuGrowMainMdr);
            this.regMdr(NewRoleViewType.XiuxianNvpuGiftMain, XiuxianNvpuGiftMainMdr);
            this.regMdr(NewRoleViewType.XiuxianNvpuLike, XiuxianNvpuLikeMdr);
            this.regMdr(NewRoleViewType.XiuxianNvpuOfflineSetting, XiuxianNvpuOfflineSettingMdr);
            this.regMdr(NewRoleViewType.XiuxianNvpuOnlineSetting, XiuxianNvpuOnlineSettingMdr);
            this.regMdr(NewRoleViewType.XiuxianNvpuResult, XiuxianNvpuResultMdr);
        }

    }

    gso.modCls.push(RoleMod);
}