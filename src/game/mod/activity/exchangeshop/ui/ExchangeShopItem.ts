namespace game.mod.activity {

    import ShopConfig = game.config.ShopConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import ExchangeShopProxy = game.mod.activity.ExchangeShopProxy;
    import treasure_house_info = msg.treasure_house_info;
    import Handler = base.Handler;

    export class ExchangeShopItem extends ExchangeShopBaseItem {

        public data: ShopConfig;

        protected dataChanged(): void {
            let cfg = this.data;

            let info: treasure_house_info = this._proxy.getInfoByTypeIndex(cfg.index) as treasure_house_info;
            let bought_cnt = info ? info.bought_cnt : 0;//已购买次数
            this.lmt_cnt = cfg.lmt_cnt;
            this.left_cnt = this.lmt_cnt - bought_cnt;
            this.lmt_type = cfg.lmt_type;
            let str = "";
            if (cfg.lmt_type == 1) {
                //getLanById(LanDef.store5)
                str = "每日:";
            } else if (cfg.lmt_type == 2) {
                str = getLanById(LanDef.store6);
            } else {
                //getLanById(LanDef.store7)
                str = "每周:";
            }
            this.lab_limit.textFlow = TextUtil.parseHtml(str + TextUtil.addColor(`${this.left_cnt}/${this.lmt_cnt}`,
                this.left_cnt > 0 ? "0x238e2c" : BlackColor.RED));

            super.dataChanged();

            this.args = {
                ...this.args,
                handler: Handler.alloc(this._proxy, this._proxy.c2s_exchange_shop_buy_prop, [cfg.index])
            }
        }
    }
}