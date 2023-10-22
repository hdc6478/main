namespace game.mod.activity {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;

    export class CarnivalGiftMdr extends EffectMdrBase implements UpdateItem{
        private _view: CarnivalGiftView = this.mark("_view", CarnivalGiftView);
        private _proxy: ActivityProxy;
        private _carnivalProxy: CarnivalProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._carnivalProxy = this.retProxy(ProxyType.Carnival);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = CarnivalGiftRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_CARNIVAL_GIFT_UPDATE, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateTime();
            this.updateItemList();

            this._carnivalProxy.setZhaohuanlibaoIsFirst(false);

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateItemList(): void {
            let actInfo = this._proxy.curOpenAct;
            let rewardList = actInfo.reward_list;
            if(this._itemList.source.length){
                this._itemList.replaceAll(rewardList);
            }
            else {
                this._itemList.source = rewardList;
            }
        }
    }
}