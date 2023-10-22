namespace game.mod.role {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class WingMainMdr extends WndBaseMdr {
        private _proxy: ISurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: WingMainBtnType.Wing,
                icon: "wing_tab",
                mdr: SurfaceMdr,
                title: LanDef.wing_tips,
                bg: "horse_bg",
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing],
            },
            {
                btnType: WingMainBtnType.WingStar,
                icon: "huanhua_tab",
                mdr: SurfaceStarMdr,
                title: LanDef.wing_tips,
                hintTypes: [ModName.Role,NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.WingStar],
            }
        ];

        protected onShow(): void {
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this._proxy.headType = ConfigHead.Wing;
            super.onShow();
        }

        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string {
            if(this._proxy.getActHint(this._proxy.headType)){
                return WingMainBtnType.WingStar;
            }
            return "";
        }
    }
}