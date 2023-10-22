namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import ChonglistGiftConfig = game.config.ChonglistGiftConfig;

    export class PunshListGiftMdr extends MdrBase implements UpdateItem {
        private _view: PunshListGiftView = this.mark("_view", PunshListGiftView);
        private _proxy: PunshListProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.PunshList);
            this._view.list.itemRenderer = PunshListGiftItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            //todo
            // this._view.img_banner.source = ResUtil.getUiJpg(`tongtiange_banner6`);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO, this.updateView, this);
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
            let cfgs = getConfigByNameId(ConfigName.ChonglistGift, this._proxy.type);
            let list: ChonglistGiftConfig[] = [];
            for (let k in cfgs) {
                let cfg = cfgs[k];
                list.push(cfg)
            }
            this._listData.replaceAll(list);

            let cfg = list[list.length - 1];
            let bigReward = this._proxy.getBigReward(cfg);
            this._view.big_reward.setData(bigReward);
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