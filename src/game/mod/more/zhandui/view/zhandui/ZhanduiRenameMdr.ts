namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhanduiRenameMdr extends MdrBase {
        private _view: ZhanduiRenameView = this.mark("_view", ZhanduiRenameView);
        private _proxy: ZhanduiProxy;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
        }

        protected onShow(): void {
            super.onShow();

            let cost: number[] = this._proxy.getRenameCost();
            this._view.btn_do.setCost(cost);
        }

        protected onHide(): void {
            super.onHide();
            this._view.lb_input.text = '';
        }

        private onClickDo(): void {
            let text = this._view.lb_input.text;
            if (!text) {
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips7));
                return;
            }
            this._proxy.sendButtonClickTeamname(ZhanduiOperType.Oper7, text);
            this.hide();
        }
    }
}