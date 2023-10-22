namespace game.mod.surface {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import JianzhenConfig = game.config.JianzhenConfig;

    export class XianjianGroupMdr extends EffectMdrBase {
        private _view: XianjianGroupView = this.mark("_view", XianjianGroupView);

        private _listData: ArrayCollection;
        private _proxy: SurfaceProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);

            this._listData = new ArrayCollection();
            this._view.list.itemRenderer = XianjianGroupItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(SurfaceEvent.ON_UPDATE_SHANGZHEN_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let cfgArr: JianzhenConfig[] = getConfigListByName(ConfigName.Jianzhen);
            this._listData.replaceAll(cfgArr);
        }
    }
}