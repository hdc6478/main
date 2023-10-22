namespace game.mod.activity {


    export class ExchangeShopSpecialMdr extends ExchangeShopMdr {

        protected onInitList(): void {
            this._view.list.itemRenderer = ExchangeShopSpecialItem;
            this._view.list.dataProvider = this._listData;
        }

        protected onUpdateList(): void {
            let list = this._proxy.getSpecialList();
            this._listData.source = list;
        }

    }
}