namespace game.mod.friend {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;

    export class FriendBlackMdr extends EffectMdrBase {
        private _view: FriendBlackView = this.mark("_view", FriendBlackView);
        private _chatProxy: IChatProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._chatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = FriendBlackItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ChatEvent.ON_CHAT_BLACK_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onInfoUpdate();
            this._chatProxy.c2s_chat_open_blacklist();//主动请求黑名单信息
        }

        protected onHide(): void {
            super.onHide();
        }

        private onInfoUpdate(): void {
            this.updateItemList();
        }

        private updateItemList(): void {
            let infos = this._chatProxy.blackInfos;
            let cnt = infos.length;
            this._view.grp_tips.visible = cnt == 0;
            this._view.scr.visible = cnt > 0;
            if(this._view.scr.visible) {
                if (this._itemList.source.length > 0) {
                    this._itemList.replaceAll(infos);
                } else {
                    this._itemList.source = infos;
                }
            }
        }
    }
}