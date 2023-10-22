namespace game.mod.activity {

    import ShopConfig = game.config.ShopConfig;
    import AtticGiftConfig = game.config.AtticGiftConfig;
    import GiftBagConfig = game.config.GiftBagConfig;
    import LanDef = game.localization.LanDef;

    export class TongtiangeItem4 extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public lb_limit: eui.Label;
        public list: eui.List;
        public img_bought: eui.Image;
        public btn_buy: game.mod.Btn;

        private _listData: eui.ArrayCollection;
        private _proxy: TongtiangeProxy;
        private _cost: number[];
        data: AtticGiftConfig;

        constructor() {
            super();
            this.skinName = `skins.common.IconShopSkin2`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Tongtiange);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
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
            this._listData.replaceAll(this.getRewards());
            let boughtCnt = this._proxy.getGiftBoughtCnt(cfg.index);
            let limitCnt = this._proxy.getGiftLimitCnt(cfg.index);
            let leftCnt = Math.max(limitCnt - boughtCnt, 0);
            let limitDesc = getLanById(LanDef.tongtiange_tips7);
            if (leftCnt != 0) {
                limitDesc = getLanById(LanDef.tongtiange_tips8) + TextUtil.addColor(`${leftCnt}/${limitCnt}`, leftCnt > 0 ? WhiteColor.GREEN : WhiteColor.RED);
            }
            this.lb_limit.textFlow = TextUtil.parseHtml(limitDesc);

            this.img_bought.visible = leftCnt == 0;
            this.btn_buy.visible = !this.img_bought.visible;

            this.img_icon.source = this.getIcon();

            if (this.btn_buy.visible) {
                if (cfg.type == 1) {
                    //商店表
                    this.btn_buy.label = '';
                    let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.shop_index);
                    if (shopCfg) {
                        let price = Math.floor(shopCfg.price * (shopCfg.discount / 10000));
                        this._cost = [shopCfg.coin_type, price];
                        this.btn_buy.setCost(this._cost);
                    }
                    this.btn_buy.setHint(this._proxy.canBuyGift(cfg.index));
                } else {
                    //商品id表
                    this.btn_buy.label = PayUtil.getRmbValue(cfg.shop_index) + PayUtil.getRmbUnit();
                }
            }
        }

        public onClick(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            if (cfg.type == 2) {
                PayUtil.pay(cfg.shop_index);
                return;
            }
            if (this._cost && BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                this._proxy.c2s_attic_item_buy_gift(cfg.index);
            }
        }

        //奖励
        private getRewards(): number[][] {
            if (!this.data) {
                return [];
            }
            let cfg = this.data;
            if (cfg.type == 1) {
                let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.shop_index);
                return shopCfg ? shopCfg.prop : [];
            }
            return PayUtil.getRewards(cfg.shop_index);
        }

        private getIcon(): string {
            if (!this.data) {
                return '';
            }
            let cfg = this.data;
            if (cfg.type == 1) {
                let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.shop_index);
                return shopCfg && shopCfg.icon || '';
            }
            let giftCfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, cfg.shop_index);
            return giftCfg && giftCfg.icon || '';
        }
    }
}