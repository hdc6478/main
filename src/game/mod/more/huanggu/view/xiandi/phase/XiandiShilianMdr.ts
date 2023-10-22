namespace game.mod.more {

    import TiandiXianqiFubenConfig = game.config.TiandiXianqiFubenConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class XiandiShilianMdr extends MdrBase {
        private _view: XiandiShilianView = this.mark("_view", XiandiShilianView);

        private _proxy: XiandiProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._view.icon.setData(this._proxy.xianqi_fuben_reward);

            this._view.btn.label = this._proxy.reward_status == 1 ? getLanById(LanDef.lingqu) : getLanById(LanDef.tishi_14);
            this._view.btn.setHint(this._proxy.reward_status == 1);

            let cfg: TiandiXianqiFubenConfig = getConfigByNameId(ConfigName.TiandiXianqiFuben, this._proxy.xianqi_stage);
            this._view.recommendPower.setPowerValue(cfg.power_show);

            this._view.lab_tips.textFlow = TextUtil.parseHtml(getLanById(LanDef.xiandi_tips24));
        }

        private onClickBtn(): void {
            if (this._proxy.reward_status == 1) {
                this._proxy.c2s_tiandi_box_oper(3);
            } else {
                this._proxy.c2s_tiandi_box_challenge();
            }
            this.hide();
            this.sendNt(HuangguEvent.ON_CLOSE_XIANDI_POPUP);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}