namespace game.mod.role {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class WeaponMainMdr extends WndBaseMdr {
        private _proxy: ISurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: WeaponMainBtnType.Weapon,
                icon: "weapon_tab",
                mdr: SurfaceMdr,
                title: LanDef.weapon_tips,
                bg: "horse_bg",
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.Weapon],
            },
            {
                btnType: WeaponMainBtnType.WeaponStar,
                icon: "huanhua_tab",
                mdr: SurfaceStarMdr,
                title: LanDef.weapon_tips,
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.WeaponStar],
            }
        ];

        protected onShow(): void {
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this._proxy.headType = ConfigHead.Weapon;
            super.onShow();
        }

        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string {
            if(this._proxy.getActHint(this._proxy.headType)){
                return WeaponMainBtnType.WeaponStar;
            }
            return "";
        }
    }
}