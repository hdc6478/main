namespace game.mod.debug {
    export class DebugMod extends ModBase {
        constructor() {
            super(ModName.Debug)
        }

        protected initView(): void {
            super.initView();
            let self = this;
            self.regMdr("1", GmListMdr);
            self.regMdr("2", GmCmdMdr);
        }
    }

    gso.modCls.push(DebugMod);
}
