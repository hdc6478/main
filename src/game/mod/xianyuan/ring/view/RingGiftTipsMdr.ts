namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;

    export class RingGiftTipsMdr extends EffectMdrBase {
        private _view: RingGiftTipsView = this.mark("_view", RingGiftTipsView);
        private _proxy: RingProxy;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Ring);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);

            this.onNt(XianyuanEvent.ON_UPDATE_RING_INFO, this.onUpdateInfo, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let prop = this._proxy.getGiftProp();
            if (!prop) {
                return;
            }
            let propData = PropData.create(prop[0], prop[1]);
            this._view.basePropTips.updateShow(propData);
            let cfg = GameConfig.getPropConfigById(prop[0]);
            this._view.power.setPowerValue(cfg.showPower);

            this._view.baseSurfaceItem.updateShow(cfg.param1[0][0], 0, false, null, false);

            this._view.icon.data = propData;

            let stage = this._proxy.getGiftStage();
            this._view.lb_cond.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.ring_tips3), [stage]));

            let canGet = this._proxy.canGetClassReward();
            this._view.btn_do.visible = canGet;
            this._view.btn_do.setHint(canGet);
            this._view.lb_cond.visible = !canGet;
        }

        private onClick(): void {
            if (!this._proxy.canGetClassReward()) {
                return;
            }
            this._proxy.c2s_ring_get_reward();
        }

        private onUpdateInfo(): void {
            if (this._proxy.is_get_class_reward) {
                this.hide();
                ViewMgr.getIns().showViewByID(JumpIdx.XianlvRing);
            }
        }
    }
}