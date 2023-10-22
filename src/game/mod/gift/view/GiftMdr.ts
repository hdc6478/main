namespace game.mod.gift {

    export class GiftMdr extends MdrBase {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: GiftProxy;
        /**进阶礼包类型*/
        private _giftType: GiftType;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Gift);
            this._view.list.itemRenderer = GiftItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.timeItem.visible = false;
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(GiftEvent.ON_UPDATE_GIFT_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._giftType = this._showArgs;
            let banner = this._proxy.getBanner(this._giftType);
            this._view.updateBanner(banner);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateView(): void {
            let cfgList = this._proxy.getCfgListByType(this._giftType);
            let bigCfg = cfgList[cfgList.length - 1];
            this._view.updateBigReward(bigCfg.award[0]);

            let list: IGiftItemData[] = [];
            for (let cfg of cfgList) {
                let rewardStatus = this._proxy.getGiftStatus(this._giftType, cfg.index);
                let status = rewardStatus ? rewardStatus.status : RewardStatus.NotFinish;
                list.push({
                    cfg,
                    finishCnt: rewardStatus && rewardStatus.finish_cnt || 0,
                    status,
                    giftType: this._giftType
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);
        }
    }
}