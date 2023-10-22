namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import ArrayCollection = eui.ArrayCollection;

    export class CrossUnionZhanbaoMdr extends MdrBase {
        private _view: CrossUnionZhanbaoView = this.mark("_view", CrossUnionZhanbaoView);
        private _proxy: CrossUnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list.itemRenderer = CrossUnionZhanbaoItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_ZHANBAO_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_pk_zhanbao();
            super.onShow();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.zhanbao);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}