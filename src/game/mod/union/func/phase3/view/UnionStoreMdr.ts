namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GuildBaoKuConfig = game.config.GuildBaoKuConfig;
    import LanDef = game.localization.LanDef;

    /**宗门宝库 */
    export class UnionStoreMdr extends MdrBase implements UpdateItem {
        private _view: ExchangeView = this.mark("_view", ExchangeView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionStoreItem;
            this._view.list.dataProvider = this._listData;

            this._view.img_banner.source = ResUtil.getUiJpg("xianzongbaokuguanggaotu");

            /**个人数据 不用每次打开请求 */
            this._proxy.c2s_guild_baoku_show();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(UnionEvent.ON_UPDATE_STORE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateView(): void {
            let cfgArr: GuildBaoKuConfig[] = getConfigListByName(ConfigName.GuildBaoKu);
            this._listData.replaceAll(cfgArr);

            this._view.iconBigReward.setData(cfgArr[0].reward);
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
                leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            }
            this._view.timeItem.updateLeftTime(leftTime, '', getLanById(LanDef.battle_cue29));
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }
    }
}