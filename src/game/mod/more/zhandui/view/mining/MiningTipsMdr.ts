namespace game.mod.more {


    import ArrayCollection = eui.ArrayCollection;

    export class MiningTipsMdr extends EffectMdrBase {
        private _view: MiningTipsView = this.mark("_view", MiningTipsView);
        private _proxy: MiningProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Mining);

            this._view.list.itemRenderer = MiningTipsItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MoreEvent.ON_UPDATE_MINING_LOGS_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_zhandui_zhanbao_show();
            super.onShow();
            // this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.logs);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}