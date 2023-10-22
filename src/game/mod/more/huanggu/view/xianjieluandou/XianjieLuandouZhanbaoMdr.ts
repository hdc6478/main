namespace game.mod.more {

    export class XianjieLuandouZhanbaoMdr extends MdrBase {
        private _view: XianjieLuandouZhanbaoView = this.mark("_view", XianjieLuandouZhanbaoView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._view.list.itemRenderer = XianjieLuandouZhanbaoItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.onNt(MoreEvent.ON_XIANJIE_PVP_BATTLE_REPORT_UPDATE, this.updateView, this);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper6);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._listData.replaceAll(this._proxy.report_list);
        }
    }
}