namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class ZcxFirstMdr extends MdrBase {
        private _view: ZcxFirstView = this.mark("_view", ZcxFirstView);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;
        private _curIdx = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = ZcxFirstItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn_act.setImage(`1yuanjihuo`);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(ActivityEvent.ON_UPDATE_FIRST_RECHARGE_INFO, this.onUpdateByFirstCharge, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateList();
            this._view.list.selectedIndex = 0;
        }

        private updateList(): void {
            let list: IZCXFirstItemData[] = [];
            for (let i = 0; i < 4; i++) {
                list.push({
                    index: i + 1,
                    isSel: i == this._curIdx
                });
            }
            this._listData.replaceAll(list);
        }

        protected onHide(): void {
            super.onHide();
        }

        //todo
        private onClick(): void {
            // facade.showView(ModName.Activity, MainActivityViewType.FirstCharge);
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (e.itemIndex == this._curIdx) {
                return;
            }
            this._curIdx = e.itemIndex;
            this.updateList();
        }

        //首充后打开另一个界面
        private onUpdateByFirstCharge(): void {
            if (!this._proxy.isOpen()) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.ZcxMain);
        }
    }
}