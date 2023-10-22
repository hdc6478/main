namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;

    export class DoufaRecordMdr extends MdrBase {

        private _view: DoufaRecordView = this.mark("_view", DoufaRecordView);
        private _proxy: CompeteProxy;

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = DoufaRecordItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(CompeteEvent.UPDATE_DOUFA_RECORD, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_pvp_battle_get_pk_info();
            let recordList = this._proxy.recordList;
            if(recordList && recordList.length){
                this.updateItemList(recordList);
            }
        }

        protected onHide(): void {
            super.onHide();
        }

        private onInfoUpdate(): void {
            let recordList = this._proxy.recordList;
            this.updateItemList(recordList);
        }
        
        private updateItemList(recordList?: pvp_battle_pk_data[]): void {
            let items = recordList ? recordList : this._proxy.recordList;
            SortTools.sortMap(items, "pktime", ArraySort.LOWER);//排序
            if(this._itemList.source.length){
                this._itemList.replaceAll(items);
            }
            else {
                this._itemList.source = items;
            }
        }
    }
}
