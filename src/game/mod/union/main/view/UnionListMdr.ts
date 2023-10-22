namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;

    /**宗门列表界面 */
    export class UnionListMdr extends MdrBase {
        private _view: UnionListView = this.mark("_view", UnionListView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionListItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(UnionEvent.ON_UPDATE_UNION_LIST, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_ask_guild_list();
            super.onShow();
        }

        private onUpdateView(): void {
            this._listData.source = this._proxy.getUnionList();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}