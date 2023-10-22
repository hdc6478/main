namespace game.mod.god {


    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;

    export class GodTravelChooseMdr extends EffectMdrBase {
        private _view: GodTravelChooseView = this.mark("_view", GodTravelChooseView);
        private _proxy: GodProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();

            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = GodTravelChooseItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            // this.onNt(GodEvent.ON_UPDATE_TRAVEL_LIST_INFO, this.onClose, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listData.source = this._proxy.getYouliChoose();
        }

        protected onHide(): void {
            super.onHide();
        }

    }
}