namespace game.mod.enhance {

    export class EnhanceMod extends ModBase {

        constructor() {
            super(ModName.Enhance);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Enhance, EnhanceProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(EnhanceViewType.StrengthMain, EnhanceMainMdr);
            this.regMdr(EnhanceViewType.StrengthMaster, StrengthMasterMdr);
            this.regMdr(EnhanceViewType.GemSyn, GemSynMdr);
            this.regMdr(EnhanceViewType.GemMaster, GemMasterMdr);
            this.regMdr(EnhanceViewType.GemAttr, GemAttrInfoMdr);
            this.regMdr(EnhanceViewType.AdvancedMaster, AdvancedMasterMdr);
        }
    }

    gso.modCls.push(EnhanceMod);
}