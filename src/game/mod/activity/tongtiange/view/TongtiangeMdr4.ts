namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import AtticGiftConfig = game.config.AtticGiftConfig;

    export class TongtiangeMdr4 extends MdrBase implements UpdateItem {
        private _view: TongtiangeView4 = this.mark("_view", TongtiangeView4);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = TongtiangeItem4;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            // this._view.img_banner.source = ResUtil.getUiJpg(`tongtiange_banner4`);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_GIFT_INFO, this.updateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            this.updateView();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private updateView(): void {
            let cfgList: AtticGiftConfig[] = getConfigListByName(ConfigName.TongtiangeGift);
            this._listData.replaceAll(cfgList);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}