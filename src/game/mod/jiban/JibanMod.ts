namespace game.mod.jiban {

    export class JibanMod extends ModBase {
        constructor() {
            super(ModName.Jiban);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Jiban, JibanProxy);
            this.regProxy(ProxyType.ShoujiHuanhua, ShoujiHuanhuaProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(JibanViewType.JibanMain, JibanMainMdr);
            this.regMdr(JibanViewType.ShenLingJiBanAward, ShenLingJiBanAwardMdr);
        }
    }

    gso.modCls.push(JibanMod);
}