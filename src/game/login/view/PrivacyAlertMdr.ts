namespace game.login {
    import Mdr = base.Mdr;
    import TouchEvent = egret.TouchEvent;
    import TextFieldBase = uilib.TextFieldBase;
    import Pool = base.Pool;
    import TextEvent = egret.TextEvent;

    export class PrivacyAlertMdr extends Mdr {
        private _view: PrivacyAlertView = this.mark("_view", PrivacyAlertView);
        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            let self = this;
            let addEventListener = self.onEgret.bind(self);
            addEventListener(self._view.btnClose, TouchEvent.TOUCH_TAP, self.hide);
            addEventListener(self._view.btnCancel, TouchEvent.TOUCH_TAP, self.hide);
            addEventListener(self._view.btnConfirm, TouchEvent.TOUCH_TAP, self.hide);
            addEventListener(self._view.labAgree, TextEvent.LINK, self.onTapLink);

        }
        protected onShow(): void {
            let self = this;
            let v = self._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
        }

        private clearLabContainer(): void {
            let self = this;
            while (self._view.labelContainer.numChildren) {
                let child = self._view.labelContainer.removeChildAt(0);
                if (child instanceof TextFieldBase) {
                    child.name = "";
                }
                Pool.release(child);
            }
        }

        protected onHide(): void {
            let self = this;
            self.clearLabContainer();
            super.onHide();
        }

        private onTapLink(e: egret.TextEvent) {
            let txt = e.text;
            //用户协议
            // if(txt == GameUtil.yhxy) {
            //     this.showView(LoginViewType.Privacy,GameUtil.yhxy)
            // }
            //隐私政策
            // else if(txt = GameUtil.yszc){
            //     this.showView(LoginViewType.Privacy,GameUtil.yszc);
            // }
            this.hide();
        }
    }
}