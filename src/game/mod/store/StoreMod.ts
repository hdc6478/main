namespace game.mod.store {

    export class StoreMod extends ModBase {
        constructor() {
            super(ModName.Store);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Store, StoreProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(StoreViewType.StoreMain, StoreMainMdr);
            this.regMdr(StoreViewType.StoreBuyTips, StoreBuyTipsMdr);
        }
    }

    gso.modCls.push(StoreMod);
}