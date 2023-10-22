namespace game.mod.god {


    import ArrayCollection = eui.ArrayCollection;
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class GodTravelTipMdr extends EffectMdrBase {
        private _view: GodTravelTipView = this.mark("_view", GodTravelTipView);
        private _proxy: GodProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodTravelTipItem;
            this._view.list.dataProvider = this._listData;

            this._view.btn_travel.label = `开始${getLanById(LanDef.tiandilu_tips_3)}`;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_travel, TouchEvent.TOUCH_TAP, this.onClick);

            this.onNt(GodEvent.ON_UPDATE_TRAVEL_LIST_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: TiandiShifangYouliConfig[] = this._proxy.getYouliArr();
            this._listData.replaceAll(cfgArr);
        }

        private onClick(): void {
            this._proxy.c2s_tiandi_youli_paiqian(this._proxy.model.saveChoose);
            this._proxy.model.saveChoose = [];
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}