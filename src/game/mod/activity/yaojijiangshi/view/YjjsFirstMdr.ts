namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class YjjsFirstMdr extends MdrBase implements UpdateItem {
        private _view: YjjsFirstView = this.mark("_view", YjjsFirstView);
        private _proxy: YjjsProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list.itemRenderer = YjjsFirstItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
        }

        protected onShow(): void {
            super.onShow();

            this._endTime = this._proxy.getEndTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let list: IYjjsFirstItemData[] = [];
            for (let i = 0; i < 7; i++) {
                let progressAry = this._proxy.getProgressVal(i + 1);
                list.push({
                    hint: this._proxy.getHintByBtnType(i + 1),
                    val: progressAry[0],
                    max: progressAry[1]
                });
            }
            this._listData.replaceAll(list);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.YjjsMain, '0' + (e.itemIndex + 1));
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime < 1) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}