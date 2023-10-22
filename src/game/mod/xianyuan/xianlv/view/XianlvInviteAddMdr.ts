namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;

    export class XianlvInviteAddMdr extends MdrBase {
        private _view: XianlvInviteAddView = this.mark("_view", XianlvInviteAddView);
        private _proxy: XianlvProxy;
        private _friendProxy: IFriendProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
            this._friendProxy = getProxy(ModName.Friend, ProxyType.Friend);
            this._view.list.itemRenderer = XianlvInviteAddItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.xianlv_tips33), WhiteColor.GREEN));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.lb_desc, egret.TouchEvent.TOUCH_TAP, this.onClickGo, this);
            this.onNt(FriendEvent.ON_FRIEND_UPDATE, this.onUpdateFriendInfo, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
            this.onNt(XianyuanEvent.ON_UPDATE_BANLV_INFO, this.onUpdateBanlvInfo, this);
        }

        protected onShow(): void {
            super.onShow();

            this._friendProxy.c2s_friend_list(FriendOpType.Friend);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateFriendInfo(): void {
            let list = this._friendProxy.friendList;
            this._view.currentState = list && list.length ? 'friend' : 'notfriend';
            if (list && list.length) {
                this._listData.replaceAll(list);
            }
        }

        private onUpdateBanlvInfo(): void {
            if (this._proxy.getBanlvInfo()) {
                this.hide();
            }
        }

        private onClickGo(): void {
            ViewMgr.getIns().showView(ModName.Friend, FriendViewType.FriendMain, FriendMainBtnType.Friend);
            this.hide();
        }
    }
}