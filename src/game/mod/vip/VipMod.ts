namespace game.mod.vip {

    export class VipMod extends ModBase {
        constructor() {
            super(ModName.Vip);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Vip, VipProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(VipViewType.VipMain, VipMainMdr);
            this.regMdr(VipViewType.VipUp, VipUpMdr);
        }
    }

    gso.modCls.push(VipMod);
}