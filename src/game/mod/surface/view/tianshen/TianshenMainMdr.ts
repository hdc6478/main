namespace game.mod.surface {

    import LanDef = game.localization.LanDef;

    export class TianshenMainMdr extends WndBaseMdr {
        private _proxy: SurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: TianshenMainBtnType.Tianshen,
                icon: "yuanling_tab",
                mdr: SurfaceMdr,
                title: LanDef.yuanling_tips,
                bg: "horse_bg",//todo
                hintTypes: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen],
            },
            {
                btnType: TianshenMainBtnType.TianshenStar,
                icon: "huanhua_tab",
                mdr: SurfaceStarMdr,
                title: LanDef.yuanling_tips,
                bg: "horse_bg",//todo
                hintTypes: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenStar],
            },
            {
                btnType: TianshenMainBtnType.TianshenEquip,
                icon: "lingzuang_tab",
                mdr: TianshenEquipMdr,
                title: LanDef.yuanling_tips,
                bg: "horse_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenEquip],
            }
        ];

        protected onShow(): void {
            this._proxy = this.retProxy(ProxyType.Surface);
            this._proxy.headType = ConfigHead.Tianshen;
            super.onShow();
        }

        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string {
            if(this._proxy.getActHint(this._proxy.headType)){
                return TianshenMainBtnType.TianshenStar;
            }
            return "";
        }
    }
}