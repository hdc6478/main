namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import prop_tips_data = msg.prop_tips_data;

    export class CaiyunbangMdr3 extends MdrBase implements UpdateItem {
        protected _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: CaiyunbangProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;
        protected _actType = ActivityType.CaiyunbangCharge;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Caiyunbang);
            this._view.list.itemRenderer = CaiyunbangItem3;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();

            let eventType = this._actType == ActivityType.CaiyunbangCharge
                ? ActivityEvent.ON_CAIYUNBANG_LEICHONG_INFO_UPDATE
                : ActivityEvent.ON_CAIYUNBANG_LOGIN_INFO_UPDATE;
            this.onNt(eventType, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.clearLoginHint(this._actType);
            this._endTime = this._proxy.getCurOpenAct().c_end_time;
            if (this._endTime) {
                this.update(TimeMgr.time);
                TimeMgr.addUpdateItem(this, 1000);
            }

            let banner = this._actType == ActivityType.CaiyunbangCharge ? 'leichonghaoliguanggaotu' : 'denglufuliguanggaotu';
            this._view.updateBanner(banner, true);

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

            let list: ICaiyunbangItemData[] = [];
            for (let item of actData.reward_list) {
                let stateInfo = this._actType == ActivityType.CaiyunbangCharge
                    ? this._proxy.getChargeStateInfo(item.index)
                    : this._proxy.getLoginStateInfo(item.index);
                list.push({
                    actType: this._actType,
                    reward: item,
                    status: stateInfo && stateInfo.statue || RewardStatus.NotFinish
                });
            }

            //大奖展示
            let bigReward: prop_tips_data;
            if (this._actType == ActivityType.CaiyunbangCharge) {
                bigReward = actData.reward_list[actData.reward_list.length - 1].rewards[0];
            }
            this._view.updateBigReward(bigReward);

            SortTools.sortReward(list);
            this._listData.replaceAll(list);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}