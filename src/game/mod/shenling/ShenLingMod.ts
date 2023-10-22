namespace game.mod.shenling {

    export class ShenLingMod extends ModBase {
        constructor() {
            super(ModName.Shenling);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Shenling, ShenLingProxy);
            this.regProxy(ProxyType.ShenlingLingqi, ShenLingLingQiProxy);
            this.regProxy(ProxyType.ShenlingLingpo, ShenlingLingpoProxy);
            this.regProxy(ProxyType.ShenlingLingli, ShenlingLingliProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(ShenLingViewType.ShenLingMain, ShenLingMainMdr);
            this.regMdr(ShenLingViewType.ShenLingAttr, ShenLingAttrMdr);
            this.regMdr(ShenLingViewType.ShenLingShangZhen, ShenlingShanzhenSecondMainMdr);
            this.regMdr(ShenLingViewType.ShenLingAwaken, ShenLingAwakenMdr);
            this.regMdr(ShenLingViewType.ShenLingSkill, ShenLingSkillTipsMdr);
            this.regMdr(ShenLingViewType.ShenLingShenJi, ShenLingShenJiMdr);
            this.regMdr(ShenLingViewType.ShenlingLingqiTips, ShenLingLingQiTipsMdr);
            this.regMdr(ShenLingViewType.ShenlingLingpoTips, ShenlingLingpoIconTipsMdr);
            this.regMdr(ShenLingViewType.ShenlingLingpoSuitTips, ShenlingLingpoSuitTipsMdr);
            this.regMdr(ShenLingViewType.ShenlingLingqiBagTips, ShenlingLingqiBagTipsMdr);
            this.regMdr(ShenLingViewType.ShenlingEvolve, ShenlingEvolveMdr);
            this.regMdr(ShenLingViewType.ShenlingEvolvePreview, ShenlingEvolvePreviewMdr);
            this.regMdr(ShenLingViewType.ShenlingLingpoIconTipsBag, ShenlingLingpoIconTipsBagMdr);
        }
    }

    gso.modCls.push(ShenLingMod);
}