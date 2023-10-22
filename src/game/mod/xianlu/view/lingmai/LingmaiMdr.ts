namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import LingmaiConfig = game.config.LingmaiConfig;

    export class LingmaiMdr extends EffectMdrBase {
        private _view: LingmaiView = this.mark("_view", LingmaiView);
        private _proxy: XianluProxy;
        private _cfgList: LingmaiConfig[];
        private _btnList: game.mod.Btn[] = [];

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this._btnList = [];
            for (let i = 1; i < LingmaiMaxLv; ++i) {
                let btn = this._view["btn_icon" + i];
                this._btnList.push(btn);
                addEventListener(btn, TouchEvent.TOUCH_TAP, this.onClickIcon);
            }
            this.onNt(XianluEvent.LINGMAI_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initCfgList();
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickIcon(e: TouchEvent): void {
            let clickBtn = e.target;
            for (let i = 1; i < LingmaiMaxLv; ++i) {
                let btn = this._view["btn_icon" + i];
                if (btn == clickBtn) {
                    let cfg = this._cfgList[i - 1];
                    ViewMgr.getIns().showSecondPop(ModName.Xianlu, XianluViewType.LingmaiDetail, cfg);
                    break;
                }
            }
        }

        private onInfoUpdate(): void {
            this.updateIconList();
            this.updatePower();
        }

        private initCfgList(): void {
            this._cfgList = getConfigListByName(ConfigName.Lingmai);
        }

        private updateIconList(): void {
            for (let i = 1; i < LingmaiMaxLv && i <= this._cfgList.length; ++i) {
                let btn: Btn = this._view["btn_icon" + i];
                let cfg = this._cfgList[i - 1];
                let info = this._proxy.getLingmaiInfo(cfg.index);
                let isAct = !!info;
                btn.group_eft.removeChildren();
                if (isAct) {
                    btn.iconDisplay.source = "";
                    this.addEftByParent(UIEftSrc.Xianlu_8, btn.group_eft);
                } else {
                    btn.iconDisplay.source = "lingmai_lingqiuhui";
                }
                btn.redPoint.visible = this._proxy.canLingmaiUp(cfg);
            }
        }

        private updatePower(): void {
            let power = this._proxy.getLingmaiPower();
            this._view.power.setPowerValue(power);
        }
    }
}