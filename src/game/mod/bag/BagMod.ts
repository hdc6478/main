namespace game.mod.bag {

    export class BagMod extends ModBase {
        constructor() {
            super(ModName.Bag);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Bag, BagProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(BagViewType.BagMain, BagMainMdr);
            this.regMdr(BagViewType.PropGain, PropGainMdr);
            this.regMdr(BagViewType.BestPropTips, BestPropTipsMdr);
            this.regMdr(BagViewType.PropTips1, PropTipsMdr);/**道具提示，道具提示需要支持同时存在多个界面*/
            this.regMdr(BagViewType.PropTips2, PropTipsMdr);
            this.regMdr(BagViewType.PropTips3, PropTipsMdr);
            this.regMdr(BagViewType.PropTips4, PropTipsMdr);
            this.regMdr(BagViewType.PropTips5, PropTipsMdr);
            this.regMdr(BagViewType.GainWaysTips, GainWaysTipsMdr);
            this.regMdr(BagViewType.PropSurfaceTips, PropSurfaceTipsMdr);
            this.regMdr(BagViewType.MeltTips, MeltTipsMdr);
            this.regMdr(BagViewType.PropPillTips, PropPillTipsMdr);
        }
    }

    gso.modCls.push(BagMod)
}