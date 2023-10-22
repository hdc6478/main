namespace game.mod.setting {


    export class SettingMod extends ModBase {

        constructor() {
            super(ModName.Setting);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
        }

        protected initView(): void {
            super.initView();
            this.regMdr(SettingViewType.SettingMain, SettingMainMdr);
        }
    }

    gso.modCls.push(SettingMod);
}
