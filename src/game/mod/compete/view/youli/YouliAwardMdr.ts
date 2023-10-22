namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import TourpvpTargetConfig = game.config.TourpvpTargetConfig;

    export class YouliAwardMdr extends MdrBase {
        private _view: SurfaceGiftView = this.mark("_view", SurfaceGiftView);

        private _itemList: ArrayCollection;

        private _proxy: CompeteProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = YouliAwardItemRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(CompeteEvent.UPDATE_YOULI_AWARD, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.img_bg.source = ResUtil.getUiPng("youli_award_bg");
            this.updateReward();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateReward(): void {
            let items: TourpvpTargetConfig[] = getConfigListByName(ConfigName.TourpvpTarget);
            let cfg: TourpvpTargetConfig = items[items.length - 1];
            this._view.icon.setData(cfg.reward[0]);
        }

        private updateItemList(): void {
            let items: TourpvpTargetConfig[] = getConfigListByName(ConfigName.TourpvpTarget);
            let tmps: { cfg: TourpvpTargetConfig, sort: number }[] = [];
            for (let i = 0, len = items.length; i < len; ++i) {
                let cfg = items[i];
                let sort = i;
                let info = this._proxy.getStepAward(cfg.index);
                if (info && info.status == RewardStatus.Draw) {     // 已领取
                    sort += 10000;
                }
                tmps.push({ cfg: cfg, sort: sort });
            }
            tmps.sort(SortTools.sortByRort);
            items = [];
            for (let i of tmps) {
                items.push(i.cfg);
            }
            this._itemList.replaceAll(items);
        }
    }
}