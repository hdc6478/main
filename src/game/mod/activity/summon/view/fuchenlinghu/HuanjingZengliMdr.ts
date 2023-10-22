namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import HuanjingZengliConfig = game.config.HuanjingZengliConfig;

    /**幻境赠礼*/
    export class HuanjingZengliMdr extends MdrBase implements UpdateItem {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: FuchenlinghuProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
            this._view.list.itemRenderer = HuanjingZengliItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.updateBanner('huanjingzengli_banner', true);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgList: HuanjingZengliConfig[] = getConfigListByName(ConfigName.HuanjingZengli);
            let list: IHuanjingZengliItemData[] = [];
            let cnt = this._proxy.total_count;
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    cnt,
                    status: this._proxy.getZengliStatus(cfg.index)
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);

            if (cfgList && cfgList[cfgList.length - 1]) {
                let rewards = cfgList[cfgList.length - 1].reward;
                if (rewards && rewards[0]) {
                    this._view.updateBigReward(rewards[0]);
                }
            }
        }

        update(time: base.Time) {
            let endTime = TimeUtil.getNextWeekTime();
            this._view.timeItem.updateTime(endTime);
        }
    }
}