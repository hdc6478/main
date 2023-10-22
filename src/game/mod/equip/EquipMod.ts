namespace game.mod.equip {


    export class EquipMod extends ModBase {
        constructor() {
            super(ModName.Equip);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Equip, EquipProxy);
        }

        protected initView(): void {
            super.initView();
        }
    }

    gso.modCls.push(EquipMod);
}
