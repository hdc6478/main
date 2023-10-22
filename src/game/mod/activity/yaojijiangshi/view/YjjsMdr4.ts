namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class YjjsMdr4 extends MdrBase implements UpdateItem {
        private _view: YjjsView4 = this.mark("_view", YjjsView4);
        private _proxy: YjjsProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list.itemRenderer = YjjsItem4;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(ActivityEvent.ON_YJJS_BAOKU_INFO_UPDATE, this.updateView, this);
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
            let list = StoreUtil.getStoreCfgListByType(StoreType.Yaojibaoku);
            if (!list || !list.length) {
                return;
            }
            let shopCfg = list[0];
            this._view.icon_bigreward.data = shopCfg.prop[0];
            this._listData.replaceAll(list.concat());
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