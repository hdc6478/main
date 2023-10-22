namespace game.mod.daily {

    export class DailyMod extends ModBase {
        constructor() {
            super(ModName.Daily);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Daily, DailyProxy);
            this.regProxy(ProxyType.DailyLimitTime, DailyLimitTimeActProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(DailyViewType.DailyMain, DailyMainMdr);
        }
    }

    gso.modCls.push(DailyMod);
}