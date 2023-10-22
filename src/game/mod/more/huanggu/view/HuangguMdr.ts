namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;

    export class HuangguMdr extends EffectMdrBase {
        private _view: HuangguView = this.mark("_view", HuangguView);
        private _proxy: HuangguProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Huanggu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_goddess, TouchEvent.TOUCH_TAP, this.onClickGoddess);
            addEventListener(this._view.btn_xiandi, TouchEvent.TOUCH_TAP, this.onClickXiandi);
            addEventListener(this._view.btn_doufa, TouchEvent.TOUCH_TAP, this.onClickDoufa);
            addEventListener(this._view.btn_shenqi, TouchEvent.TOUCH_TAP, this.onClickShenqi);
            addEventListener(this._view.btn_xianwei, TouchEvent.TOUCH_TAP, this.onClickXianwei);
        }

        protected onShow(): void {
            super.onShow();
            this.updateHint();

            this._view.item.showInfo();

            this._view.btn_xiandi.setEffect(UIEftSrc.HuangGuTianGong);
            this._view.btn_goddess.setEffect(UIEftSrc.NvShenJuSuo);
            this._view.btn_doufa.setEffect(UIEftSrc.WanXianTai);
            this._view.btn_shenqi.setEffect(UIEftSrc.Huanggushenqi);
            this._view.btn_xianwei.setEffect(UIEftSrc.Xianweizhengduo);
        }

        protected onHide(): void {
            this._view.btn_xiandi.clearEffect();
            this._view.btn_goddess.clearEffect();
            this._view.btn_doufa.clearEffect();
            this._view.btn_shenqi.clearEffect();
            this._view.btn_xianwei.clearEffect();
            super.onHide();
        }

        private onClickGoddess(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.GoddessMain);
        }

        private onClickXiandi(): void {
            let proxy: XiandiProxy = getProxy(ModName.More, ProxyType.Xiandi);
            if (proxy.checkOpen()) {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.Xiandi);
            } else {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiShow);
            }
        }

        private onClickDoufa(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.KuafuDoufa);
        }

        private onClickShenqi(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.SkyPalace);
        }

        private onClickXianwei(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.Xianwei);
        }

        private updateHint(): void {
            this._view.btn_goddess.redPoint.visible = HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.GoddessMain]);
            this._view.btn_xiandi.redPoint.visible = HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xiandi]);
            this._view.btn_doufa.redPoint.visible = HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.KuafuDoufa]);
            this._view.btn_doufa.redPoint.visible = HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.SkyPalace]);
            this._view.btn_xianwei.redPoint.visible = HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.Xianwei]);
        }
    }
}