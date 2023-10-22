namespace game.mod.xianlu {

    export class XianluMod extends ModBase {
        constructor() {
            super(ModName.Xianlu);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            let self = this;
            self.regProxy(ProxyType.Xianlu, XianluProxy);
        }

        protected initView(): void {
            super.initView();
            let self = this;
            self.regMdr(XianluViewType.XianluMain, XianluMainMdr);
            self.regMdr(XianluViewType.XiuxianPreview, XiuxianPreviewMdr);
            self.regMdr(XianluViewType.XiuxianTips, XiuxianTipsMdr);
            self.regMdr(XianluViewType.XiandanTips, XiandanTipsMdr);
            self.regMdr(XianluViewType.LingchiDetail, LingchiDetailMdr);
            self.regMdr(XianluViewType.LingchiBattle, LingchiBattleMdr);
            self.regMdr(XianluViewType.LingmaiDetail, LingmaiDetailMdr);
            self.regMdr(XianluViewType.LingmaiUp, LingmaiUpMdr);
            self.regMdr(XianluViewType.XiuxianBreakTips, XiuxianBreakTipsMdr);
        }
    }

    gso.modCls.push(XianluMod);
}