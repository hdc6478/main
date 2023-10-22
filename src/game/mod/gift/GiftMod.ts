namespace game.mod.gift {

    export class GiftMod extends ModBase {
        constructor() {
            super(ModName.Gift);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Gift, GiftProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(GiftViewType.Main, GiftMainMdr);
        }
    }

    gso.modCls.push(GiftMod);
}