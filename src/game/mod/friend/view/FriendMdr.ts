namespace game.mod.friend {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TextEvent = egret.TextEvent;
    import friend_info = msg.friend_info;

    export class FriendMdr extends EffectMdrBase {
        private _view: FriendView = this.mark("_view", FriendView);
        private _proxy: FriendProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Friend);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = FriendItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
            this.onNt(FriendEvent.ON_FRIEND_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.c2s_friend_list(FriendOpType.Friend);//todo，看下是否需要优化下，打开仙友时候请求下数据
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGoto(): void {
            this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, FriendMainBtnType.Recommend);
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.updateGift();
        }

        private updateItemList(): void {
            let infos = this._proxy.friendList;
            let cnt = infos.length;
            let maxCnt = this._proxy.getMaxFriendCnt();
            let cntStr = getLanById(LanDef.friend_tips5) + TextUtil.addColor("(" + cnt + "/" + maxCnt + ")", WhiteColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);

            this._view.grp_tips.visible = cnt == 0;
            if(this._view.grp_tips.visible){
                let gotoStr = this._view.lab_goto.text;
                this._view.lab_goto.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(gotoStr, WhiteColor.GREEN, ""));
            }

            this._view.scr.visible = cnt > 0;
            if(this._view.scr.visible){
                //排序
                infos.sort(SortTools.sortFriend);
                if (this._itemList.source.length > 0) {
                    this._itemList.replaceAll(infos);
                } else {
                    this._itemList.source = infos;
                }
            }
        }

        private updateGift(): void {
            let cnt = this._proxy.getGiftCnt();
            let maxCnt = this._proxy.getMaxGiftCnt();
            let giftStr = getLanById(LanDef.friend_tips7) + "：" + TextUtil.addColor(cnt + "/" + maxCnt, WhiteColor.GREEN);
            this._view.lab_gift.textFlow = TextUtil.parseHtml(giftStr);
        }
    }
}