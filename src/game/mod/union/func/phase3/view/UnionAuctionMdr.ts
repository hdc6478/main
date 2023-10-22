namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import guild_auction_data = msg.guild_auction_data;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    /**拍卖 */
    export class UnionAuctionMdr extends MdrBase {
        private _view: UnionAuctionView = this.mark("_view", UnionAuctionView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionAuctionItem;
            this._view.list.dataProvider = this._listData;

            this._view.lab_explain.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lab_explain.text, 0x309539));
            this._view.lab_jump.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lab_jump.text, 0x309539));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.lab_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
            addEventListener(this._view.lab_jump, TouchEvent.TOUCH_TAP, this.onClickJump);

            this.onNt(UnionEvent.ON_UPDATE_AUCTION_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_auction_show();
            super.onShow();
        }

        private onUpdateView(): void {
            let model: UnionModel = this._proxy.model;
            let second: number = TimeMgr.time.serverTimeSecond;
            let list: guild_auction_data[] = model.auction_list && model.auction_list.filter(v => {
                return v.time > second
            }) || [];
            let len: number = list.length;
            this._view.grp_tips.visible = !len;
            this._listData.replaceAll(list);
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.guild_tips11));
        }

        private onClickJump(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.Yijie);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}