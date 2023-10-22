namespace game.mod.yishou {

    export class YishouMod extends ModBase {
        constructor() {
            super(ModName.Yishou);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Yishou, YishouProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(YiShouViewType.Main, YishouMainMdr);
            this.regMdr(YiShouViewType.Bag, YishouShouguBagMdr);
            this.regMdr(YiShouViewType.Compose, YishouShouguComposeMdr);
            this.regMdr(YiShouViewType.Decompose, YishouShouguDecomposeMdr);
            this.regMdr(YiShouViewType.ShouguSkillTips, YishouShouguSkillTipsMdr);
            this.regMdr(YiShouViewType.ShouguEquipTips, YishouShouguEquipTipsMdr);
            this.regMdr(YiShouViewType.ShouhunSkillTips, YishouShouhunSkillTipsMdr);
            this.regMdr(YiShouViewType.ShouguEquipTips2, YishouShouguEquipTipsMdr2);
            this.regMdr(YiShouViewType.ShoulingSkillTips, YishouShoulingSkillTipsMdr);
            this.regMdr(YiShouViewType.ShoulingEquipTips, YishouShoulingEquipTipsMdr);
            this.regMdr(YiShouViewType.ShoulingEquipTipsBag, YishouShoulingEquipTipsBagMdr);
        }
    }

    gso.modCls.push(YishouMod);
}