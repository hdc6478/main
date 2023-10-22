namespace game.mod.surface {

    import ArrayCollection = eui.ArrayCollection;
    import JinjiejiangliConfig = game.config.JinjiejiangliConfig;

    export class SurfaceGiftMdr extends MdrBase {
        private _view: SurfaceGiftView = this.mark("_view", SurfaceGiftView);

        private _itemList: ArrayCollection;

        private _proxy: SurfaceProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Surface);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = SurfaceGiftItemRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(SurfaceEvent.SURFACE_GIFT_INFO_UPDATE, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initView();
            this.updateReward();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        /**初始化显示不同的ui*/
        private initView(): void {
            this._view.img_bg.source = ResUtil.getUiJpg("jinjiehaoli_" + this._proxy.headType);
        }

        private updateReward(): void {
            let items: JinjiejiangliConfig[] = getConfigListByName(ConfigName.Jinjiejiangli);
            let cfg: JinjiejiangliConfig = items[items.length - 1];
            let rewards = cfg[SurfaceConfigList[this._proxy.headType] + "_award"];
            this._view.icon.setData(rewards[0]);
        }

        private updateItemList(): void {
            let items: JinjiejiangliConfig[] = getConfigListByName(ConfigName.Jinjiejiangli);
            let tmps: {cfg: JinjiejiangliConfig, sort: number}[] = [];
            for(let i = 0; i < items.length; ++i){
                let cfg = items[i];
                let sort = i;
                if(this._proxy.hasGiftBuy(this._proxy.headType, cfg.index)){
                    sort += 10000;
                }
                tmps.push({cfg: cfg, sort: sort});
            }
            tmps.sort(SortTools.sortByRort);
            items = [];
            for(let i of tmps){
                items.push(i.cfg);
            }
            this._itemList.replaceAll(items);
        }
    }
}