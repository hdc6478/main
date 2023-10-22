namespace game.mod.more {

    import Handler = base.Handler;

    export class XianmaiFightSuccessMdr extends MdrBase {
        private _view: XianmaiFightSuccessView = this.mark("_view", XianmaiFightSuccessView);
        private _proxy: XianmaiProxy;
        private _props: msg.prop_tips_data[];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            this._props = this._showArgs;
            this.updateView();
            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
        }

        protected onHide(): void {
            super.onHide();
            this._props = null;
        }

        private updateView(): void {
            this._view.resultReward.updateRewardList(this._props || []);
        }
    }
}