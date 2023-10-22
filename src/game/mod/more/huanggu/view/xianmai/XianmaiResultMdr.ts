namespace game.mod.more {

    export class XianmaiResultMdr extends MdrBase {
        private _view: XianmaiResultView = this.mark("_view", XianmaiResultView);
        private _proxy: XianmaiProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._proxy.c2s_xianmai_get_reward();
            this._proxy.reward_items = null;//关闭就清空
        }

        private updateView(): void {
            this._listData.replaceAll(this._proxy.reward_items);
        }

        private onClick(): void {
            // this._proxy.c2s_xianmai_get_reward();
            this.hide();
        }
    }
}