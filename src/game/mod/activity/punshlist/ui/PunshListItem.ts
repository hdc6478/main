namespace game.mod.activity {

    import facade = base.facade;
    import ChonglistTargetConfig = game.config.ChonglistTargetConfig;
    import ArrayCollection = eui.ArrayCollection;

    export class PunshListItem extends BaseRenderer {
        private list: eui.List;
        private grp: eui.Group;
        private _listData: ArrayCollection;

        private _proxy: PunshListProxy;

        data: ChonglistTargetConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this._listData.replaceAll(this.data.reward);

            let data = this._proxy.getData(this._proxy.type, this.data.index);
            this.grp.visible = data && data.status == 2;
        }

    }
}