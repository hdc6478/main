namespace game.mod.god {

    import ArrayCollection = eui.ArrayCollection;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;
    import TiandiLevelrewardsConfig = game.config.TiandiLevelrewardsConfig;

    export class GodGiftMdr extends MdrBase {
        private _view: SurfaceGiftView = this.mark("_view", SurfaceGiftView);

        private _itemList: ArrayCollection;

        private _proxy: GodProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = GodGiftItemRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(GodEvent.ON_UPDATE_ROAD_INFO, this.updateItemList, this);
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
            this._view.img_bg.source = ResUtil.getUiJpg("tiandilu_gift_bg");
        }

        private updateReward(): void {
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this._proxy.iType);
            this._view.icon.setData(cfg.rewards[0]);
        }

        private updateItemList(): void {
            let cfgs: { [index: number]: TiandiLevelrewardsConfig } = getConfigByNameId(ConfigName.TiandiLevelrewards, this._proxy.iType);
            let cfgArr: TiandiLevelrewardsConfig[] = [];
            for (let key in cfgs) {
                cfgArr.push(cfgs[key]);
            }
            let self = this;
            cfgArr.sort((a: TiandiLevelrewardsConfig, b: TiandiLevelrewardsConfig) => {
                let b1: boolean = self._proxy.getBool(self._proxy.iType, a.index);
                let b2: boolean = self._proxy.getBool(self._proxy.iType, b.index);
                if (b1 != b2) {
                    return b1 ? 1 : -1;
                }
                return a.index - b.index;
            });
            this._itemList.source = cfgArr;
        }
    }
}