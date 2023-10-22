namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import CanzhengeConfig = game.config.CanzhengeConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;

    export class WonderfulActMdr2 extends MdrBase implements UpdateItem {
        private _view: WonderfulActView2 = this.mark("_view", WonderfulActView2);
        private _proxy: WonderfulActProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;
        private _cost: number[];
        private _bigData: IconRewardData;
        private _type = ActivityType.Cangzhenge;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
            this._view.list.itemRenderer = WonderfulActIcon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            addEventListener(this._view.icon_bigreward, egret.TouchEvent.TOUCH_TAP, this.onClickBigReward, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_CANGZHENGE, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onUpdateByPropIndex, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_CLOSE, this.onActivityClose, this);
        }

        private onActivityClose(n: GameNT) {
            let actId: number = n.body;
            if (actId == this._proxy.getActId(this._type)) {
                ViewMgr.getIns().showMain();
            }
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTimeSec(this._type);
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        private updateView(): void {
            let cfg: CanzhengeConfig = getConfigByNameId(ConfigName.Cangzhenge, 0);
            let bigData: IconRewardData = {
                prop: cfg.prix_id,
                isGot: this._proxy.model.big_box_status == 1
            };
            this._bigData = bigData;
            this._view.icon_bigreward.setData(bigData);

            let cnt = this._proxy.getCzgRewardGottenCnt();
            let maxCnt = this._proxy.getCzgRewardMaxCnt();
            this._view.bar.show(cnt, maxCnt, false, 0, false, ProgressBarType.Value);

            let list: number[] = [];
            for (let i = 1; i <= maxCnt; i++) {
                let box = this._proxy.model.box_list[i];
                list.push(box ? box.status : 0);
            }
            this._listData.replaceAll(list);

            this._view.lb_desc.text = `开启剩余的${Math.max(maxCnt - cnt, 0)}个宝箱可领取大奖`;

            this.updateCost();
        }

        private updateCost(): void {
            let cfg: CanzhengeConfig = getConfigByNameId(ConfigName.Cangzhenge, 1);
            if (!cfg || !cfg.costs) {
                return;
            }
            let cost = cfg.costs[0];
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            this._view.costIcon.imgCost = propCfg.icon;
            this._view.costIcon.setLabCost(BagUtil.getPropCntByIdx(cost[0]) + '');
            if (!this._cost) {
                this._cost = cfg.costs[0];
            }
        }

        private onClickReward(): void {
            this.showView(MainActivityViewType.WonderfulActReward);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.jingcaihuodong_tips6));
        }

        private onClickAdd(): void {
            if (this._cost) {
                ViewMgr.getIns().showGainWaysTips(this._cost[0]);
            }
        }

        private onClickBigReward(): void {
            if (!this._bigData) {
                return;
            }
            ViewMgr.getIns().showPropTips(this._bigData.prop[0]);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let data = e.item as number;
            if (data == 1) {
                return;
            }
            let index = e.itemIndex + 1;
            if (!this._proxy.canOpenCzgReward(index, true)) {
                return;
            }
            this._proxy.c2s_jingcai_cangzhenge_open(index);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            if (indexs.indexOf(this._proxy.getCzgCostId()) > -1) {
                this.updateCost();
            }
        }
    }
}