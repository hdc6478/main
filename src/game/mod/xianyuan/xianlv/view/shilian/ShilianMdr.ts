namespace game.mod.xianyuan {

    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;
    import XianlvShilianFubenConfig = game.config.XianlvShilianFubenConfig;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class ShilianMdr extends MdrBase implements UpdateItem {
        private _view: ShilianView = this.mark("_view", ShilianView);
        private _proxy: XianlvShilianProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvShilian);
            this._view.list.itemRenderer = ShilianItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.scroller["$hasScissor"] = true;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank, this);
            addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
            this.onNt(XianyuanEvent.ON_UPDATE_SHILIAN_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_xianlv_shilian_openui();
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateBtnRankHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this.updateProp();
            let list: XianlvShilianFubenConfig[] = getConfigListByName(ConfigName.XianlvShilianFuben);
            this._listData.replaceAll(list);
        }

        private updateProp(): void {
            let cost = this._proxy.getChallengeCost();
            let idx = cost[0];
            let cnt = BagUtil.getPropCntByIdx(idx);
            let cfg = GameConfig.getPropConfigById(idx);
            this._view.img_cost.source = cfg.icon;
            this._view.lb_cost.text = cnt + '';
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianlv_tips29));
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Xianyuan, XianyuanViewType.ShilianRank, null, true);
        }

        private onClickAdd(): void {
            let cost = this._proxy.getChallengeCost();
            ViewMgr.getIns().showGainWaysTips(cost[0]);
        }

        update(time: base.Time) {
            this._view.timeItem.updateTime(this._endTime);
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let cost = this._proxy.getChallengeCost();
            if (indexs && indexs.indexOf(cost[0]) > -1) {
                this.updateView();
            }
        }

        private updateBtnRankHint(): void {
            this._view.btn_rank.setHint(this._proxy.getRankRewardHint());
        }
    }
}