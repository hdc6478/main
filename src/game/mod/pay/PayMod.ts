namespace game.mod.pay {

    export class PayMod extends ModBase {
        constructor() {
            super(ModName.Pay);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Pay, PayProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(PayViewType.Gift, GiftMdr);
        }
    }

    gso.modCls.push(PayMod)
}