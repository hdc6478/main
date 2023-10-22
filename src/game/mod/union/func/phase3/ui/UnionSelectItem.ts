namespace game.mod.union {


    export class UnionSelectItem extends BaseRenderer {

        private lab_select: eui.Label;

        protected dataChanged(): void {
            // let proxy: UnionProxy = getProxy(ModName.Union, ProxyType.Union);
            // this.lab_select.text = proxy.getEquipString(this.data);

            this.lab_select.text = this.data.value;
        }
    }

}