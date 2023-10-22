namespace game.mod.activity {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ShopConfig = game.config.ShopConfig;
    import GiftBagConfig = game.config.GiftBagConfig;
    import GameNT = base.GameNT;

    export class YjjsMdr6 extends MdrBase implements UpdateItem {
        private _view: YjjsView6 = this.mark("_view", YjjsView6);
        private _proxy: YjjsProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list.itemRenderer = YjjsItem6;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);
            this.onNt(ActivityEvent.ON_YJJS_HAOLI_INFO_UPDATE, this.updateView, this);
            this.onNt(PayEvent.ON_DIRECT_BUY_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
            this.updateBigReward();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        private onUpdateTask(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Yaojijiangshi) > -1) {
                this.updateView();
            }
        }

        private updateView(): void {
            let list = this._proxy.getHaoliCfgList();
            this._listData.replaceAll(list);
        }

        private updateBigReward(): void {
            let list = this._proxy.getHaoliCfgList();
            if (!list || !list.length) {
                return;
            }
            let bigCfg = list[list.length - 1];
            let payType = bigCfg.pay_type;
            let reward: number[] = [];
            if (payType == 1) {
                let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, bigCfg.pay_index);
                if (shopCfg) {
                    reward = shopCfg.prop[0];
                }
            } else {
                let giftBagCfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, bigCfg.pay_index);
                if (giftBagCfg) {
                    reward = giftBagCfg.awards[0];
                }
            }
            this._view.icon.data = reward;
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