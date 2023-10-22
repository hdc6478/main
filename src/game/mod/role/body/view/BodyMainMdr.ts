namespace game.mod.role {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class BodyMainMdr extends WndBaseMdr {
        private _proxy: ISurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            // {
            //     btnType: WeaponMainBtnType.Weapon,
            //     icon: "body_tab",
            //     mdr: SurfaceMdr,
            //     title: LanDef.surface_tips1,
            //     bg: "horse_bg",
            //     hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body],
            // },
            {
                btnType: BodyMainBtnType.BodyStar,
                icon: "huanhua_tab",
                mdr: SurfaceStarMdr,
                title: LanDef.surface_tips1,
                bg: "horse_bg",
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.BodyStar],
            }
        ];

        protected onShow(): void {
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this._proxy.headType = ConfigHead.Body;
            super.onShow();
        }
    }
}