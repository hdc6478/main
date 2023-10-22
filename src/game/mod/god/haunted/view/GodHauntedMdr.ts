namespace game.mod.god {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import TiandiFengduBaiguiluConfig = game.config.TiandiFengduBaiguiluConfig;
    import TiandiFengduTaozhuangConfig = game.config.TiandiFengduTaozhuangConfig;

    export class GodHauntedMdr extends MdrBase {
        private _view: GodHauntedView = this.mark("_view", GodHauntedView);
        private _listData: ArrayCollection = new ArrayCollection();
        private _attrsData: ArrayCollection = new ArrayCollection();
        private _proxy: GodProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodHauntedItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_attr.itemRenderer = GodHauntedAttrItem;
            this._view.list_attr.dataProvider = this._attrsData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
            this.onNt(GodEvent.ON_UPDATE_HAUNTED_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: TiandiFengduBaiguiluConfig[] = getConfigListByName(ConfigName.TiandiFengduBaiguilu);
            this._listData.replaceAll(cfgArr);

            let cfgAttrs: TiandiFengduTaozhuangConfig[] = getConfigListByName(ConfigName.TiandiFengduTaozhuang);
            this._attrsData.replaceAll(cfgAttrs);

            let count: number = this._proxy.getActivateCount();
            this._view.bar.setProValue(count, cfgArr.length);
        }

        private onClick(e: ItemTapEvent): void {
            let cfg: TiandiFengduBaiguiluConfig = e.item;
            let bool: boolean = this._proxy.getActivateCard(cfg.index);
            if (bool) {
                ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodHauntedActivate, cfg.index);
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodHauntedDetail, cfg.index);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}