namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import HuanjingBaozangConfig = game.config.HuanjingBaozangConfig;
    import LanDef = game.localization.LanDef;

    /**幻境宝藏*/
    export class HuanjingBaozangMdr extends MdrBase implements UpdateItem {
        private _view: HuanjingBaozangView = this.mark("_view", HuanjingBaozangView);
        private _proxy: FuchenlinghuProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
            this._view.list.itemRenderer = HuanjingBaozangItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.scr["$hasScissor"] = true;
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
            let cfgList: HuanjingBaozangConfig[] = getConfigListByName(ConfigName.HuanjingBaozang);
            let list: IHuanjingBaozangItemData[] = [];
            let val = this._proxy.total_count;
            for (let i = 0; i < cfgList.length; i++) {
                let cfg = cfgList[i];
                let cfgBefore = cfgList[i - 1];
                let cfgNext = cfgList[i + 1];
                let freeStatus = this._proxy.getBaozangStatus(cfg.index, true);
                let payStatus = this._proxy.getBaozangStatus(cfg.index, false);
                let before = (cfgBefore && Math.floor((cfg.times - cfgBefore.times) / 2) + cfgBefore.times) || 0;
                let next = (cfgNext && Math.floor((cfgNext.times - cfg.times) / 2) + cfg.times) || 0;
                list.push({
                    cfg,
                    val,
                    freeStatus,
                    payStatus,
                    before,
                    next
                });
            }
            this._listData.replaceAll(list);

            if (cfgList && cfgList[cfgList.length - 1]) {
                let cfg = cfgList[cfgList.length - 1];
                if (cfg.gift_id) {
                    let rewards = PayUtil.getRewards(cfg.gift_id);
                    this._view.iconBigReward.data = rewards ? rewards[0] : null;
                } else if (cfg.reward2) {
                    this._view.iconBigReward.data = cfg.reward2[0];
                } else if (cfg.reward) {
                    this._view.iconBigReward.data = cfg.reward[0];
                }
            }

            this._view.lb_cnt.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips12), [val]));
        }

        update(time: base.Time) {
            let endTime = TimeUtil.getNextWeekTime();
            this._view.timeItem.updateTime(endTime);
        }
    }
}