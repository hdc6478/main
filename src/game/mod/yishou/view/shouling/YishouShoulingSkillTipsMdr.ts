namespace game.mod.yishou {

    import YishouShoulingConfig = game.config.YishouShoulingConfig;
    import LanDef = game.localization.LanDef;

    export class YishouShoulingSkillTipsMdr extends MdrBase {
        private _view: YishouShoulingSkillTipsView = this.mark("_view", YishouShoulingSkillTipsView);
        private _proxy: YishouProxy;
        private _surfaceProxy: ISurfaceProxy;
        _showArgs: YishouShoulingConfig;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
            this._surfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_SHOULING_INFO, this.updateState, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfg = this._showArgs;
            this._view.skillItem.img_icon.source = cfg.icon;
            this._view.lb_name.text = cfg.skill_name;
            this._view.img_type.source = `jineng_show_type_${cfg.skill_type}`;

            let descStr = this._proxy.getSpecialAttrDesc(cfg.index);
            this._view.descItem.updateShow(descStr, getLanById(LanDef.base_attr));

            let isActed = this._proxy.isShoulingActed(cfg.index);
            this._view.currentState = isActed ? 'acted' : 'default';

            this._view.btn_do.setHint(this._proxy.canShoulingAct(cfg.index));
        }

        private updateState(): void {
            let cfg = this._showArgs;
            let isActed = this._proxy.isShoulingActed(cfg.index);
            this._view.currentState = isActed ? 'acted' : 'default';
        }

        private onClick(): void {
            let cfg = this._showArgs;
            if (this._proxy.canShoulingAct(cfg.index, true)) {
                this._proxy.c2s_yishou_shouling_active(cfg.index);
            }
        }
    }
}