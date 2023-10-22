namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import DrawGiftConfig = game.config.DrawGiftConfig;

    export class SummonExchangeMdr extends MdrBase implements UpdateItem {
        private _view: ExchangeView = this.mark("_view", ExchangeView);
        private _proxy: SummonProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Summon);

            this._view.list.itemRenderer = SummonIconShopItem;
            this._view.list.dataProvider = this._listData;

            this._view.img_bg.source = ResUtil.getUiJpg("beijingtu_duihuan");
            this._view.img_banner.source = ResUtil.getUiJpg("guanggaotu_jinghuanjiemian");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_UPDATE_EXCHANGE, this.onUpdateList, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateList();
            this.onUpdateTime();

            TimeMgr.addUpdateItem(this, 1000);
        }

        private onUpdateList(): void {
            let cfgArr: DrawGiftConfig[] = getConfigListByName(ConfigName.DrawGift);
            // let list: ISummonShopData[] = this._proxy.getExchangeList();
            this._listData.source = cfgArr;

            let cfg: DrawGiftConfig = getConfigByNameId(ConfigName.DrawGift, 1);
            this._view.updateBigReward(cfg.items);
        }

        public update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let leftTime = TimeUtil.getNextWeekTime() - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, '', getLanById(LanDef.battle_cue29));
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }
    }
}