namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;

    export class UnionTreasureHelpMdr extends MdrBase {
        private _view: UnionTreasureHelpView = this.mark("_view", UnionTreasureHelpView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionTreasureHelpItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
            this.onNt(UnionEvent.ON_UPDATE_TREASURE_HELP_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_yibao_request(3);
            // todo skin标题
            super.onShow();
            // this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.help_list);
        }

        private onClick(): void {
            if (!this._listData || !this._listData.source || !this._listData.source.length) {
                return;
            }
            this._proxy.c2s_guild_yibao_click(7);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}