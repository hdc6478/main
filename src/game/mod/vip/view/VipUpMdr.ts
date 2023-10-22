namespace game.mod.vip {

    export class VipUpMdr extends EffectMdrBase {
        private _view: VipUpView = this.mark("_view", VipUpView);
        private _proxy: VipProxy;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Vip);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();

            let idx = this._proxy.getIdx();
            this.addBmpFont((VipUtil.getShowVipLv(idx)) + '', BmpTextCfg[BmpTextType.Vip1], this._view.gr_eff, true, 2, true);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}