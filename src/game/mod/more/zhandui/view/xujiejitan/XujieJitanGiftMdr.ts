namespace game.mod.more {

    import ZhanduiJitanLibaoConfig = game.config.ZhanduiJitanLibaoConfig;

    export class XujieJitanGiftMdr extends MdrBase {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: XujieJitanProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieJitan);
            this._view.timeItem.visible = this._view.iconBigReward.visible = false;
            this._view.list.itemRenderer = XujieJitanGiftItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.updateBanner('xujiejitan_guanggaotu', true);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_BASE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgs: ZhanduiJitanLibaoConfig[] = getConfigListByName(ConfigName.ZhanduiJitanLibao);
            let list: IXujieJitanGiftItemData[] = [];
            let drawList: IXujieJitanGiftItemData[] = [];
            for (let cfg of cfgs) {
                if (!cfg) {
                    continue;
                }
                let canReceive = this._proxy.canReceiveGift(cfg.index);
                let status = RewardStatus.NotFinish;
                let isReceived = this._proxy.isGiftReceived(cfg.index);
                if (isReceived) {
                    status = RewardStatus.Draw;
                } else if (canReceive) {
                    status = RewardStatus.Finish;
                }

                let itemData: IXujieJitanGiftItemData = {
                    cfg,
                    status,
                    curLv: this._proxy.jitan_level
                };
                if (isReceived) {
                    drawList.push(itemData);
                } else {
                    list.push(itemData);
                }
            }
            //仅展示10条数据
            if (list.length < 10) {
                let disCnt = 10 - list.length;//缺几条数据
                let drawLen = drawList.length;
                let starI = drawLen > disCnt ? drawLen - disCnt : 0;
                for (let i = starI; i < drawLen; i++) {
                    list.push(drawList[i]);//取后面几条补齐
                }
            } else {
                list.length = 10;
            }
            // SortTools.sortReward(list);
            this._listData.replaceAll(list);
        }
    }
}