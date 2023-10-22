namespace game.mod.hint {
    export class HintMod extends ModBase {
        constructor() {
            super(ModName.Hint);//ModName类型
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            this.regProxy(ProxyType.Hint,HintProxy);
            super.initModel();
        }

        protected initView(): void {
            super.initView();
        }
    }

    gso.modCls.push(HintMod);
}