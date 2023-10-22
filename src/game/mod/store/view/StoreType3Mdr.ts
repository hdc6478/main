namespace game.mod.store {

    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import DirectShopConfig = game.config.DirectShopConfig;
    import LanDef = game.localization.LanDef;

    export class StoreType3Mdr extends MdrBase implements UpdateItem {
        protected _view: StoreType3View = this.mark("_view", StoreType3View);
        protected _proxy: StoreProxy;
        protected _listData: eui.ArrayCollection;
        protected _endTime = 0;// 结束时间戳
        protected _getMoney = 0;//领取大奖的指定充值金额

        //对应配置表类型，3每日，4每周
        protected _type = DirectShopType.Daily;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Store);
            this._view.list.itemRenderer = StoreType3Item;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_bg.source = ResUtil.getUiPng('meirishangchengguanggaotu');
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(StoreEvent.ON_UPDATE_DAILY_WEEKLY_INFO, this.onUpdateInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateInfo();
            this._endTime = this.getEndTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        protected getEndTime(): number {
            return TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        protected onUpdateInfo(): void {
            this.updateListData();
            this.updateBigRewardView();
        }

        protected updateListData(): void {
            let cfgs = this._proxy.getDirectShopCfgList(this._type);
            let list: { cfg: DirectShopConfig, type: number }[] = [];
            for (let cfg of cfgs) {
                if (!PayUtil.checkShowGift(cfg.product_id)) {
                    continue;
                }
                list.push({
                    cfg,
                    type: this.getPbType()
                });
            }
            this._listData.replaceAll(list);
        }

        protected updateBigRewardView(): void {
            let pbType = this.getPbType();
            let id = `direct_shop_big_award${pbType}`;
            let cfg = GameConfig.getParamConfigById(id);
            if (!cfg) {
                return;
            }
            this._view.icon_bigreward.data = cfg.value[0];
            this._view.icon_bigreward.setClickHandler(Handler.alloc(this, this.getBigReward));

            let info = this._proxy.model.infos[pbType];
            let change = info ? info.change : 0;
            let money = cfg.value[1];
            this._getMoney = money;
            this._view.bar.show(change, money, false, 0, false, ProgressBarType.Value);
            this._view.icon_bigreward.setHint(change >= money);
        }

        protected getBigReward(): void {
            let pbType = this.getPbType();
            let info = this._proxy.model.infos[pbType];
            if (info && info.change >= this._getMoney) {
                this._proxy.c2s_daily_mall_get_award(pbType);
            }else {
                let id = `direct_shop_big_award${pbType}`;
                let cfg = GameConfig.getParamConfigById(id);
                if (!cfg) {
                    return;
                }
                ViewMgr.getIns().showPropTips(cfg.value[0]);
            }
        }

        private getPbType(): number {
            return DirectType2PbType[this._type];
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                return;
            }
            let formatStr = this._type == DirectShopType.Daily ? 'HH时mm分' : 'dd天HH时';
            this._view.lb_time.textFlow = TextUtil.parseHtml(getLanById(LanDef.battle_cue40) + `：` + TimeUtil.formatSecond(leftTime, formatStr));
        }
    }
}