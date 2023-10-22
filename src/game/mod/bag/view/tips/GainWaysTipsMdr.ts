namespace game.mod.bag {

    import ArrayCollection = eui.ArrayCollection;
    import PropConfig = game.config.PropConfig;

    export class GainWaysTipsMdr extends MdrBase {
        private _view: GainWaysTipsView = this.mark("_view", GainWaysTipsView);
        public _showArgs: number;/**道具index*/
        private _attrList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._attrList = new ArrayCollection();
            this._view.list_item.itemRenderer = GainWaysTipsItem;
            this._view.list_item.dataProvider = this._attrList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateShow(): void {
            let index = this._showArgs;
            let prop = PropData.create(index);
            this._view.icon.setData(prop);
            let cfg: PropConfig = prop.cfg;
            let itemList = cfg.gain_id || [];
            this._attrList.source = itemList;
            if(prop.quality==QualityType.GREEN){
                this._view.lab_name.textColor=0x2FFA28;
                this._view.lab_name.text=cfg.name;
                return;
            }
            this._view.lab_name.textFlow = prop.getPropName();
        }
    }
}