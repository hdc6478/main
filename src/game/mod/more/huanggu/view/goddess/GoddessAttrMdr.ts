namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class GoddessAttrMdr extends MdrBase {
        private _view: GoddessAttrView = this.mark("_view", GoddessAttrView);
        private _proxy: HuangguProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Huanggu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAct(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.GoddessTargetMain);
            this.hide();
        }

        private updateView(): void {
            // this._view.baseDescItem2.visible = false;//todo
            this._view.btn_act.visible = !this._proxy.isAct;

            let lv = this._proxy.lv;
            let desc = getLanById(LanDef.huanggu_nvshen_tips4) + "：" + TextUtil.addColor(lv + getLanById(LanDef.lv), BlackColor.GREEN);
            this._view.baseDescItem1.updateShow(desc, getLanById(LanDef.huanggu_nvshen_tips3));

            let param: ParamConfig = GameConfig.getParamConfigById("huanggu_nvshen_show_attr");
            let desc2: string = getLanById(LanDef.huanggu_nvshen_tips29) + "：" + TextUtil.addColor(`${param.value * lv}`, BlackColor.GREEN)
                + ` (${getLanById(LanDef.huanggu_nvshen_tips30)})`
                + "\n" + getLanById(LanDef.huanggu_nvshen_tips28);
            let color = TextUtil.addColor(` (${getLanById(LanDef.huanggu_nvshen_tips27)})`, BlackColor.GREEN);
            this._view.baseDescItem2.updateShow(desc2, getLanById(LanDef.huanggu_nvshen_tips26) + color);
        }
    }
}