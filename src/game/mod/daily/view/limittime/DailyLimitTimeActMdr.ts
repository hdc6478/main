namespace game.mod.daily {

    export class DailyLimitTimeActMdr extends MdrBase {
        private _view: DailyLimitTimeActView = this.mark('_view', DailyLimitTimeActView);
        private _proxy: DailyLimitTimeActProxy;
        private _listData: eui.ArrayCollection;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.DailyLimitTime);

            this._view.list.itemRenderer = DailyLimitTimeActItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners() {
            super.addListeners();
            this.onNt(DailyLimitTimeEvent.UPDATE_LIMIT_ACT_INFO, this.updateView, this);
        }

        protected onShow() {
            super.onShow();
            this._view.list.scrollV = 0;
            this.updateView();
        }

        private updateView(): void {
            let list = this._proxy.getConfigList();
            this._listData.replaceAll(list);
        }

        protected onHide() {
            super.onHide();
        }
    }

}