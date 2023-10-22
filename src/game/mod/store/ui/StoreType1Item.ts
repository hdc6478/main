namespace game.mod.store {

    import ShopConfig = game.config.ShopConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class StoreType1Item extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public lb_cnt: eui.Label;
        public btn_buy: game.mod.Btn;
        public priceItem0: game.mod.store.StorePriceItem;
        public priceItem1: game.mod.store.StorePriceItem;
        public img_bought: eui.Image;
        public img_tag: eui.Image;
        public lb_name: eui.Label;

        data: ShopConfig;
        private _proxy: StoreProxy;
        private _cost = 0;//消耗数量
        private _leftCnt = 0;

        constructor() {
            super();
            this.skinName = `skins.store.StoreType1ItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Store, ProxyType.Store);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            this.icon.data = cfg.prop[0];
            let propCfg = GameConfig.getPropConfigById(cfg.prop[0][0]);
            let name: string = TextUtil.truncateString(propCfg.name);
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(name, ColorUtil.getColorByQuality1(propCfg.quality)));
            this.lb_cnt.visible = cfg.lmt_type != 0;
            let info = this._proxy.model.treasureInfos[cfg.index];
            let bought_cnt = info ? info.bought_cnt : 0;//已购买次数
            let lmt_cnt = cfg.lmt_cnt;//限购次数
            let left_cnt = lmt_cnt - bought_cnt;//剩余购买次数
            this._leftCnt = left_cnt;
            let str = cfg.lmt_type == 1 ? getLanById(LanDef.store5) : (cfg.lmt_type == 2 ? getLanById(LanDef.store6) : getLanById(LanDef.store7));
            this.lb_cnt.textFlow = TextUtil.parseHtml(str + TextUtil.addColor(`${left_cnt}/${lmt_cnt}`,
                left_cnt > 0 ? WhiteColor.GREEN : WhiteColor.RED));

            if (cfg.discount) {
                this.priceItem0.updateView(cfg.coin_type, cfg.price, true);
                this.priceItem1.visible = true;
                this._cost = Math.floor(cfg.price * cfg.discount / 10000);
                this.priceItem1.updateView(cfg.coin_type, this._cost, false);
            } else {
                this._cost = cfg.price;
                this.priceItem0.updateView(cfg.coin_type, cfg.price, false);
                this.priceItem1.visible = false;
            }

            this.btn_buy.visible = left_cnt > 0;
            this.img_bought.visible = left_cnt <= 0;

            if (left_cnt > 0) {
                this.btn_buy.setHint(BagUtil.checkPropCnt(cfg.coin_type, this._cost));
            }

            this.img_tag.visible = !!cfg.tag;
            if (cfg.tag) {
                this.img_tag.source = cfg.tag;
            }
        }

        private onClick(): void {
            ViewMgr.getIns().openStoreBuyTips(this.data.index, this._leftCnt,
                Handler.alloc(this._proxy, this._proxy.c2s_treasure_house_buy_prop, [this.data.index]));
        }
    }
}