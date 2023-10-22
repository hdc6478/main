namespace game.mod.god {


    import ArrayCollection = eui.ArrayCollection;
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import TouchEvent = egret.TouchEvent;

    export class GodTravelMdr extends EffectMdrBase {
        private _view: GodTravelView = this.mark("_view", GodTravelView);
        private _proxy: GodProxy;
        private _listData: ArrayCollection = new ArrayCollection();


        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodTravelItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet);
            addEventListener(this._view.btn_travel, TouchEvent.TOUCH_TAP, this.onClickTravel);

            this.onNt(GodEvent.ON_UPDATE_TRAVEL_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: TiandiShifangYouliConfig[] = this._proxy.getYouliArr();
            this._listData.replaceAll(cfgArr);
        }

        private onClickGet(): void {
            this._proxy.c2s_tiandi_youli_get_rewards();
        }

        private onClickTravel(): void {
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodTravelTip);
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}