namespace game.mod.consecrate {

    export class ConsecrateMod extends ModBase {
        constructor() {
            super(ModName.Consecrate);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Consecrate, ConsecrateProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(ConsecrateViewType.Consecrate, ConsecrateMainMdr);
            this.regMdr(ConsecrateViewType.ConsecrateShelf, ConsecrateShelfMdr);
            this.regMdr(ConsecrateViewType.ConsecrateSpeedUp, ConsecrateSpeedUpMdr);
            this.regMdr(ConsecrateViewType.ConsecrateLottery, ConsecrateLotteryMdr);
            this.regMdr(ConsecrateViewType.ConsecratePreview, ConsecratePreviewRewardMdr);

            this.regMdr(ConsecrateViewType.AmassUp, AmassUpMdr);
            this.regMdr(ConsecrateViewType.AmassTips, AmassTipsMdr);
        }
    }

    gso.modCls.push(ConsecrateMod);
}