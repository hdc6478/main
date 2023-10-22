namespace game.mod.god {

    export class GodMod extends ModBase {
        constructor() {
            super(ModName.God);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.God, GodProxy);
        }

        protected initView(): void {
            super.initView();

            this.regMdr(GodViewType.GodMain, GodMainMdr);
            this.regMdr(GodViewType.GodCommonMain, GodCommonMainMdr);
            this.regMdr(GodViewType.GodGiftMain, GodGiftMainMdr);
            this.regMdr(GodViewType.GodTreasure, GodTreasureMainMdr);
            this.regMdr(GodViewType.GodHaunted, GodHauntedMainMdr);
            this.regMdr(GodViewType.GodHauntedActivate, GodHauntedActivateMdr);
            this.regMdr(GodViewType.GodHauntedFight, GodHauntedFightMdr);
            this.regMdr(GodViewType.GodHauntedDetail, GodHauntedDetailMdr);
            this.regMdr(GodViewType.GodAvatar, GodAvatarMainMdr);
            this.regMdr(GodViewType.GodDragonoath, GodDragonoathMainMdr);
            this.regMdr(GodViewType.GodTravelTip, GodTravelTipMdr);
            this.regMdr(GodViewType.GodTravelChoose, GodTravelChooseMdr);
            this.regMdr(GodViewType.GodBuffTips, GodBuffTipsMdr);
            this.regMdr(GodViewType.GodDragonoathBuffTips, GodDragonoathBuffTipsMdr);
        }
    }

    gso.modCls.push(GodMod)
}