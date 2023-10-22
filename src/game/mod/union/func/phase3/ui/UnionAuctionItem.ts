namespace game.mod.union {


    import TouchEvent = egret.TouchEvent;
    import guild_auction_data = msg.guild_auction_data;
    import GuildAuctionConfig = game.config.GuildAuctionConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;

    export class UnionAuctionItem extends BaseRenderer implements UpdateItem {

        private icon: Icon;
        private lab_title: eui.Label;
        private btn_buy: Btn;
        private timeItem: TimeItem;

        private _proxy: UnionProxy;
        private _cost: number[];

        public data: guild_auction_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClickBtn, this);

            this._proxy = getProxy(ModName.Union, ProxyType.Union);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            TimeMgr.removeUpdateItem(this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.icon.setData(this.data.item_id);
            let name: string = TextUtil.addColor(this.data.name, WhiteColor.YELLOW);
            this.lab_title.textFlow = TextUtil.parseHtml(`${name}在妖怪入侵中夺取：`);

            let cfg: GuildAuctionConfig = getConfigByNameId(ConfigName.GuildAuction, this.data.item_id.toNumber());
            this._cost = cfg.cost;
            this.btn_buy.setCost(this._cost);

            if (this.data.time) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        update(time: base.Time): void {
            let leftTime = this.data.time - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                facade.sendNt(UnionEvent.ON_UPDATE_AUCTION_INFO);
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this.timeItem.updateLeftTime(leftTime);
        }

        private onClickBtn(): void {
            if (!BagUtil.checkPropCnt(this._cost[0], this._cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_guild_auction_buy(this.data.id);
        }

    }

}