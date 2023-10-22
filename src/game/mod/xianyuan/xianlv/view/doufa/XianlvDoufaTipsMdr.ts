namespace game.mod.xianyuan {

    import s2c_instance_fin = msg.s2c_instance_fin;

    export class XianlvDoufaTipsMdr extends EffectMdrBase {
        protected _view: XianlvDoufaTipsView = this.mark("_view", XianlvDoufaTipsView);

        private _proxy: XianlvDoufaProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvDoufa);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.show_tips = false;
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this.addBmpFont(`${this._proxy.total_count}`, BmpTextCfg[BmpTextType.CommonStage], this._view.grp_font);

            this._view.lab_score.text = `+${this._proxy.total_score}`;
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}