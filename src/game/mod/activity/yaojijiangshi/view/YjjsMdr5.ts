namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TotalCumulativeConfig = game.config.TotalCumulativeConfig;

    export class YjjsMdr5 extends MdrBase implements UpdateItem {
        private _view: YjjsView5 = this.mark("_view", YjjsView5);
        private _proxy: YjjsProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list.itemRenderer = YjjsItem5;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(ActivityEvent.ON_YJJS_CHARGE_INFO_UPDATE, this.updateView, this);
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
            TimeMgr.removeUpdateItem(this);
        }

        private updateView(): void {
            let list = this._proxy.getChargeCfgList();
            if (!list || !list.length) {
                return;
            }
            let doneList: TotalCumulativeConfig[] = [];
            let notList: TotalCumulativeConfig[] = [];
            for (let cfg of list) {
                let info = this._proxy.getChargeInfo(cfg.index);
                if (info && info.state == 2) {
                    doneList.push(cfg);
                } else {
                    notList.push(cfg);
                }
            }
            notList = notList.concat(doneList);
            this._listData.replaceAll(notList);

            let cfg = list[list.length - 1];
            let reward = cfg.cumulative_reward[cfg.cumulative_reward.length - 1];
            this._view.icon_bigreward.data = reward;
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime < 1) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            let str = TimeUtil.formatSecond(leftTime, leftTime > Second.Hour ? 'dd天HH时' : 'HH时mm秒');
            this._view.lb_time.textFlow = TextUtil.parseHtml(str);
        }
    }
}