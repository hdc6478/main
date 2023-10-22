namespace game.mod.god {


    import TiandiFengduBaiguiluConfig = game.config.TiandiFengduBaiguiluConfig;

    export class GodHauntedActivateMdr extends MdrBase {
        private _view: GodHauntedActivateView = this.mark("_view", GodHauntedActivateView);
        private _proxy: GodProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let index: number = this._showArgs;
            this._view.img_bg.source = ResUtil.getUiPng(`baicaolu_${index}`);
            let cfg: TiandiFengduBaiguiluConfig = getConfigByNameId(ConfigName.TiandiFengduBaiguilu, index);

            this._view.grp_desc.visible = cfg.text != "";
            if (cfg.text) {
                this._view.lab_desc.textFlow = TextUtil.parseHtml(cfg.text);
            }
            this._view.power.setPowerValue(cfg.power);
            this._view.name_item.updateShow(cfg.name);
        }
    }
}