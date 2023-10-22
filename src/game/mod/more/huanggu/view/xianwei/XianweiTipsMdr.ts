namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;

    export class XianweiTipsMdr extends MdrBase {
        private _view: XianweiTipsView = this.mark("_view", XianweiTipsView);

        private _proxy: XianweiProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianwei);

            this._view.list.itemRenderer = XianweiTipsItem2;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MoreEvent.ON_UPDATE_XIANWEI_ZHANBAO_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_xianwei_zhanbao_show();
            super.onShow();
            // this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.zhanbao_list);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}