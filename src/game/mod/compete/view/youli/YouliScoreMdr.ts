namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import TourpvpFuliConfig = game.config.TourpvpFuliConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class YouliScoreMdr extends MdrBase implements UpdateItem {
        private _view: YouliScoreView = this.mark("_view", YouliScoreView);

        private _itemList: ArrayCollection;

        private _proxy: CompeteProxy;

        private _time: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = YouliScoreItemRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(CompeteEvent.UPDATE_YOULI_SCORE, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this._view.lab_score.text = this._proxy.dayScore + "";

            let date = new Date(TimeMgr.time.serverTime);
            let cur = date.getTime();
            let next = date.setHours(0, 0, 0, 0) + 24 * 3600 * 1000;
            this._time = (next - cur) / 1000;
            if(this._time > 0) {                // 下次重置时间
                this.update(null);
                TimeMgr.addUpdateItem(this, 1000);
            } else {
                this._view.lab_time.text = "";
            }
            this.updateItemList();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this._time--;
            let timeStr = TimeUtil.formatSecond(this._time, "HH" + getLanById(LanDef.shijian_2) 
                + "mm" + getLanById(LanDef.shijian_3) + "ss" + getLanById(LanDef.shijian_4));
            this._view.lab_time.text = timeStr;
            if (this._time <= 0) {
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateItemList(): void {
            let items: TourpvpFuliConfig[] = getConfigListByName(ConfigName.TourpvpFuli);
            let tmps: { cfg: TourpvpFuliConfig, sort: number }[] = [];
            for (let i = 0, len = items.length; i < len; ++i) {
                let cfg = items[i];
                let sort = i;
                let info = this._proxy.getScoreAward(cfg.index);
                if (info && info.status == RewardStatus.Draw) {     // 已领取
                    sort += 10000;
                }
                tmps.push({ cfg: cfg, sort: sort });
            }
            tmps.sort(SortTools.sortByRort);
            items = [];
            for (let i of tmps) {
                items.push(i.cfg);
            }
            this._itemList.replaceAll(items);
        }
    }
}