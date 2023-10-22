namespace game.mod.xianyuan {

    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class XianlvBreakupMdr extends MdrBase {
        private _view: XianlvBreakupView = this.mark("_view", XianlvBreakupView);
        private _proxy: XianlvProxy;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClick(): void {
            let banlvInfo = this._proxy.getBanlvInfo();
            let name = banlvInfo ? banlvInfo.name : '';
            let txt = StringUtil.substitute(getLanById(LanDef.xianlv_tips6), [name]);
            ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.confirm));
        }

        private confirm(): void {
            this._proxy.c2s_xianlv_lihun();
            this.hide();
        }
    }
}