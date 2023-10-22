namespace game.mod.surface {

    import LanDef = game.localization.LanDef;

    export class HorseMainMdr extends WndBaseMdr {
        private _proxy: SurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: HorseMainBtnType.Horse,
                icon: "horse_tab",
                mdr: SurfaceMdr,
                title: LanDef.horse_tips,
                bg: "horse_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse],
            },
            {
                btnType: HorseMainBtnType.HorseStar,
                icon: "huanhua_tab",
                mdr: SurfaceStarMdr,
                title: LanDef.horse_tips,
                hintTypes: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.HorseStar],
            }
        ];

        protected onShow(): void {
            this._proxy = this.retProxy(ProxyType.Surface);
            this._proxy.headType = ConfigHead.Horse;
            super.onShow();
        }

        /**默认选中的BtnType，可重写*/
        protected getDefaultBtnType(): string {
            if(this._proxy.getActHint(this._proxy.headType)){
                return HorseMainBtnType.HorseStar;
            }
            return "";
        }
    }
}