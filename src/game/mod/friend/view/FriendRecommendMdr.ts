namespace game.mod.friend {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class FriendRecommendMdr extends EffectMdrBase {
        private _view: FriendRecommendView = this.mark("_view", FriendRecommendView);
        private _proxy: FriendProxy;
        private _itemList: ArrayCollection;
        private readonly TIME_TICK: number = 5;

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
            addEventListener(this._view.btn_change, TouchEvent.TOUCH_TAP, this.onClickChange);

            this.onNt(FriendEvent.ON_FRIEND_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.c2s_friend_list(FriendOpType.Recommend);//todo，看下是否需要优化下，打开仙友时候请求下数据
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAdd(): void {
            let infos = this._proxy.recommendList;
            this._proxy.onClickOneKeyAdd(infos);
        }

        private onClickChange(): void {
            let changeTime = this._proxy.changeTime;
            let curTime = TimeMgr.time.serverTimeSecond;
            let leftTime = this.TIME_TICK + changeTime - curTime;
            if(leftTime > 0){
                let tips = leftTime + getLanById(LanDef.friend_tips11);
                PromptBox.getIns().show(tips);
                return;
            }
            this._proxy.changeTime = curTime;
            this._proxy.c2s_change_recommond_friend();
        }

        private onInfoUpdate(): void {
            this.updateItemList();
        }

        private updateItemList(): void {
            let infos = this._proxy.recommendList;
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