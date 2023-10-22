namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class FuchenlinghuRefreshMdr extends MdrBase {
        private _view: FuchenlinghuRefreshView = this.mark("_view", FuchenlinghuRefreshView);
        private _proxy: FuchenlinghuProxy;
        private _listData: eui.ArrayCollection;
        private _selIdx: number = 0;
        private _seaType: SeaType;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
            this._view.list.itemRenderer = FuchenlinghuRefreshItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
        }

        protected onShow(): void {
            super.onShow();
            this._seaType = this._showArgs;
            this._selIdx = Math.max(0, this._seaType - 1);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
        }

        private updateView(): void {
            this._listData.replaceAll(SeaTypeAry);
            this._view.list.selectedIndex = this._selIdx;
        }

        private onClick(): void {
            let type = this._selIdx + 1;
            //跟当前选择的类型不一样才处理
            if (type != this._proxy.type) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper2, this._selIdx + 1);
            }
            this.hide();
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (this._selIdx == e.itemIndex) {
                return;
            }
            let type = e.itemIndex + 1;
            if (!this._proxy.isOpenSea(type)) {
                let desc = StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips17), [this._proxy.getSeaNameByType(type)]);
                PromptBox.getIns().show(desc);
                this._view.list.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = e.itemIndex;
        }
    }
}