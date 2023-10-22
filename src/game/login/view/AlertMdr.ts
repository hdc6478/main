/** @internal */
namespace game.login {
    import Mdr = base.Mdr;
    import Handler = base.Handler;
    import Pool = base.Pool;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;

    export class AlertMdr extends Mdr {
        private _view: AlertView = this.mark("_view", AlertView);

        private static _checked: {[type: number]: boolean} = {};

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            this._view.btnConfirm.label = LoginLan.Confirm;
            this._view.btnCancel.label = LoginLan.Cancel;
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.onConfirm);
            addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.onCancel);
            addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.onCancel);
            addEventListener(this._view.check, Event.CHANGE, this.onCheckChange);
        }


        protected onShow(): void {
            let self = this;
            if(this._showArgs.checkType != undefined && AlertMdr._checked[this._showArgs.checkType]) {
                this.onConfirm();
                return;
            }

            let v = self._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            let txt = self._showArgs.lab ||self._showArgs;
            self._view.labelContent.text = txt;
            self._view.btnCancel.visible = self._showArgs.cancel != undefined;
            self._view.btnConfirm.x = self._view.btnCancel.visible ? 392 : 276;
            if(self._showArgs.ConfirmTxt){
                this._view.btnConfirm.label = self._showArgs.ConfirmTxt;
            }
            if(self._showArgs.CancelTxt) {
                this._view.btnCancel.label = self._showArgs.CancelTxt;
            }
            let showCheck: boolean = !!this._showArgs.checkType;
            this._view.showCheck = showCheck;
        }

        protected onHide(): void {
            let confirm = this._showArgs && this._showArgs.confirm;
            if (confirm) {
                this._showArgs.confirm = null;
                Pool.release(confirm);
            }
            let cancel = this._showArgs && this._showArgs.cancel;
            if (cancel) {
                this._showArgs.cancel = null;
                Pool.release(confirm);
            }
            super.onHide();
        }

        private onConfirm() {
            if (!this._showArgs || !this._showArgs.confirm) {
                this.hide();
                return;
            }
            this.execAndHide(this._showArgs.confirm);
        }

        private onCancel() {
            if (!this._showArgs || !this._showArgs.cancel) {
                this.hide();
                return;
            }
            this.execAndHide(this._showArgs.cancel);
        }

        private onCheckChange(e: Event) : void {
            if(this._showArgs.checkType != undefined) {
                AlertMdr._checked[this._showArgs.checkType] = this._view.isChecked;
            }
        }

        private execAndHide(handler: Handler): void {
            let r = false;
            if (handler) {
                r = !!handler.exec();
            }
            if (r) { // 回调里阻止关闭弹框
                return;
            }
            this.hide();
        }

    }
}