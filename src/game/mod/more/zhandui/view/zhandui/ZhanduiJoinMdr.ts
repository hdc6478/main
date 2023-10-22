namespace game.mod.more {


    export class ZhanduiJoinMdr extends MdrBase {
        private _view: ZhanduiJoinView = this.mark("_view", ZhanduiJoinView);
        private _proxy: ZhanduiProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list.itemRenderer = ZhanduiJoinItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_refresh, egret.TouchEvent.TOUCH_TAP, this.onClickRefresh, this);
            addEventListener(this._view.btn_search, egret.TouchEvent.TOUCH_TAP, this.onClickSearch, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_APPLY_LIST_INFO, this.updateView, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            // this._proxy.sendButtonClick(3); //从聊天频道点击跳转的，只需要展示一条
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.lb_input.text = '';
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        private updateView(): void {
            let list = this._proxy.can_apply_list || [];
            this._listData.replaceAll(list);
        }

        private onClickRefresh(): void {
            this._proxy.sendButtonClick(ZhanduiOperType.Oper5);
        }

        private onClickSearch(): void {
            let text = this._view.lb_input.text;
            if (!text) {
                return;
            }
            this._proxy.sendButtonClickTeamname(ZhanduiOperType.Oper6, text);
        }
    }
}