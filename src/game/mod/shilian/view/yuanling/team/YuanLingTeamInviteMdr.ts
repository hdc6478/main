namespace game.mod.shilian {

    import TouchEvent = egret.TouchEvent;

    /**元灵组队邀请*/
    export class YuanLingTeamInviteMdr extends MdrBase {
        private _view: YuanLingTeamInviteView = this.mark("_view", YuanLingTeamInviteView);
        private _proxy: YuanLingProxy;
        private _listData: eui.ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list.itemRenderer = YuanLingTeamInviteItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_kuafu, egret.TouchEvent.TOUCH_TAP, this.onClickKuafu, this);
            addEventListener(this._view.btn_zongmen, egret.TouchEvent.TOUCH_TAP, this.onClickZongmen, this);
            this.onNt(ShilianEvent.ON_YUANLING_ROLE_LIST_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_yuanling_role_list(this._proxy.curDiffType);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._listData.replaceAll(this._proxy.model.invite_list);
        }

        private onClickKuafu(): void {
            this._proxy.c2s_yuanling_room_invita(ChatChannel.Cross);
        }

        private onClickZongmen(): void {
            this._proxy.c2s_yuanling_room_invita(ChatChannel.Union);
        }
    }
}