/** @internal */

namespace game.login {
    import Mdr = base.Mdr;
    import TouchEvent = egret.TouchEvent;
    import HorizontalAlign = egret.HorizontalAlign;

    export class AdultAlertMdr extends Mdr {
        private _view: AlertView = this.mark("_view", AlertView);

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {

            this._view.btnCancel.label = "暂时跳过";
            this._view.btnConfirm.label = "前往认证";

            this._view.labelContent.textAlign = HorizontalAlign.LEFT;
            this._view.btnCancel.visible = true;
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.onConfirm);
            addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            let self = this;
            let v = self._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            self._view.labelContent.text = "亲爱的玩家\n根据国家相关规定，游戏需要进行实名认证，否则将被纳入防沉迷名单\n请及时认证以保证正常游戏";
        }

        protected onHide(): void {
            super.onHide();
        }

        private onConfirm() {
            this.showView(LoginViewType.AdultId);
            this.hide();
        }
    }
}