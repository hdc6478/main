namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;

    export class HunkaMdr extends MdrBase{
        private _view: HunkaView = this.mark("_view", HunkaView);
        private _proxy: GoddessRecordProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = HunkaItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_INFO, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateItemList(): void {
            let infos: number[] = [PropSubType38.Yaohun1, PropSubType38.Xianhun2, PropSubType38.Shenhun3];
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
        }
    }
}