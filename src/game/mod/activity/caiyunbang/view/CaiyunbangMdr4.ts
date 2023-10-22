namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import prop_tips_data = msg.prop_tips_data;

    export class CaiyunbangMdr4 extends MdrBase implements UpdateItem {
        private _view: ExchangeView = this.mark("_view", ExchangeView);
        private _proxy: CaiyunbangProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Caiyunbang);
            this._view.list.itemRenderer = CaiyunbangItem4;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_banner.source = ResUtil.getUiJpg('caishenduihuanguanggaotu');
            this._view.img_bg.source = ResUtil.getUiJpg('caishenduihuanbeijingtu');
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_CAIYUNBANG_DUIHUAN_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getCurOpenAct().c_end_time;
            if (this._endTime) {
                this.update(TimeMgr.time);
                TimeMgr.addUpdateItem(this, 1000);
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let actData = this._proxy.getCurOpenAct();
            if (!actData || !actData.reward_list) {
                return;
            }

            let bigReward: prop_tips_data = null;
            let list: ICaiyunbangItemData[] = [];

            let size = actData.reward_list.length;
            for (let i = 0; i < size; i++) {
                let item = actData.reward_list[i];
                if (i == 0 && !bigReward) {
                    bigReward = item.rewards[0];
                }
                list.push({
                    actType: ActivityType.CaiyunbangExchange,
                    reward: item,
                    status: 0 //item里处理
                });
            }

            this._view.updateBigReward(bigReward);//大奖
            this._listData.replaceAll(list);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            // this._view.lb_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}