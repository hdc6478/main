namespace game.mod.more {

    export class XujieTansuoZhanbaoMdr extends MdrBase {
        private _view: XujieTansuoZhanbaoView = this.mark("_view", XujieTansuoZhanbaoView);
        private _proxy: XujieTansuoProxy;
        private _listData: eui.ArrayCollection;
        private _gridItemData: IXujieTansuoGridItemData;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list.itemRenderer = XujieTansuoZhanbaoItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._gridItemData = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let data = this._gridItemData;
            let gridInfo = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
            if (gridInfo && gridInfo.records) {
                this._listData.replaceAll(gridInfo.records);
            }
        }
    }
}