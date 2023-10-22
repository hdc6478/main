namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;

    /**设置仙尊 */
    export class UnionSetHeroMdr extends MdrBase {
        private _view: UnionSetHeroView = this.mark("_view", UnionSetHeroView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionSetHeroItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(UnionEvent.ON_UPDATE_SET_HERO_LIST, this.onUpdateView, this);
            this.onNt(UnionEvent.ON_UPDATE_MEMBER_LIST, this.onUpdateView, this);
        }

        protected onShow(): void {
            if (!this._proxy.model.member_list || !this._proxy.model.member_list.length) {
                this._proxy.c2s_ask_guild_member();
            }
            super.onShow();

            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listData.source = this._proxy.getMemberList();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}