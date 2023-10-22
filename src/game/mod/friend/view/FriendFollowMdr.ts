namespace game.mod.friend {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;

    export class FriendFollowMdr extends EffectMdrBase {
        private _view: FriendFollowView = this.mark("_view", FriendFollowView);
        private _proxy: FriendProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Friend);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = FriendItem2;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);

            this.onNt(FriendEvent.ON_FRIEND_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.c2s_friend_list(FriendOpType.Follow);//todo，看下是否需要优化下，打开仙友时候请求下数据
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAdd(): void {
            let infos = this._proxy.followList;
            this._proxy.onClickOneKeyAdd(infos);
        }

        private onInfoUpdate(): void {
            this.updateItemList();
        }

        private updateItemList(): void {
            let infos = this._proxy.followList;
            let cnt = infos.length;
            this._view.grp_tips.visible = cnt == 0;
            this._view.scr.visible = cnt > 0;
            if(this._view.scr.visible) {
                //排序
                infos.sort(SortTools.sortFriend);
                if (this._itemList.source.length > 0) {
                    this._itemList.replaceAll(infos);
                } else {
                    this._itemList.source = infos;
                }
            }
        }
    }
}