namespace game.mod.surface {

    import LanDef = game.localization.LanDef;

    export class XianjianMainMdr extends WndBaseMdr {
        private _proxy: SurfaceProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "xianjiantubiao",
                mdr: XianjianMdr,
                title: LanDef.xianjian_tips1,
                bg: "horse_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "xianfatubiao",
                mdr: XianjianSkillMdr,
                title: LanDef.xianjian_tips2,
                bg: "jianfa_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType02]
            },
            {
                btnType: MdrTabBtnType.TabBtnType03,
                icon: "jianzhentubiao",
                mdr: XianjianGroupMdr,
                title: LanDef.xianjian_tips3,
                bg: "horse_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType03]
            }
        ];

        protected onShow(): void {
            this._proxy = this.retProxy(ProxyType.Surface);
            this._proxy.headType = ConfigHead.Xianjian;
            super.onShow();
        }
    }
}