namespace game.mod.surface {

    export class SurfaceMod extends ModBase {
        constructor() {
            super(ModName.Surface);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Surface, SurfaceProxy);
            this.regProxy(ProxyType.Lingchong, LingChongProxy);
            this.regProxy(ProxyType.Xianjian, XianjianProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(SurfaceViewType.SurfaceMain, SurfaceMainMdr);
            this.regMdr(SurfaceViewType.HorseMain, HorseMainMdr);
            this.regMdr(SurfaceViewType.SurfaceSkillTips, SurfaceSkillTipsMdr);
            this.regMdr(SurfaceViewType.SurfaceGiftMain, SurfaceGiftMainMdr);
            this.regMdr(SurfaceViewType.SurfacePillTips, SurfacePillTipsMdr);
            this.regMdr(SurfaceViewType.SkillTips, SkillTipsMdr);
            this.regMdr(SurfaceViewType.TianshenMain, TianshenMainMdr);
            this.regMdr(SurfaceViewType.TianshenEquip, TianshenEquipMdr);
            this.regMdr(SurfaceViewType.TianshenEquipTips, TianshenEquipTipsMdr);
            this.regMdr(SurfaceViewType.TianshenSuitTips, TianshenSuitTipsMdr);
            this.regMdr(SurfaceViewType.LingChongMain, LingChongMainMdr);
            this.regMdr(SurfaceViewType.LingChongTreasure, LingChongTreasureMdr);
            this.regMdr(SurfaceViewType.LingChongTask, LingChongTaskMdr);
            this.regMdr(SurfaceViewType.Xianjian, XianjianMainMdr);
            this.regMdr(SurfaceViewType.XianjianUp, XianjianUpMdr);
            this.regMdr(SurfaceViewType.XianjianChoose, XianjianChooseMdr);
            this.regMdr(SurfaceViewType.XianjianBuwei, XianjianBuweiTipsMdr);
            this.regMdr(SurfaceViewType.XianjianSkillTips, XianjianSkillTipsMdr);
            this.regMdr(SurfaceViewType.XianjianBattleSkillTips, XianjianBattleSkillTipsMdr);

            this.regMdr(SurfaceViewType.SurfaceTips, SurfaceTipsMdr);
            this.regMdr(SurfaceViewType.SurfaceUpTips, SurfaceUpTipsMdr);
            this.regMdr(SurfaceViewType.SurfaceUpTips2, SurfaceUpTipsMdr2);

            this.regMdr(SurfaceViewType.SkillNormalTips, SkillNormalTipsMdr);
        }
    }

    gso.modCls.push(SurfaceMod);
}