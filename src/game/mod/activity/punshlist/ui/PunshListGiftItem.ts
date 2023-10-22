namespace game.mod.activity {

    import ChonglistGiftConfig = game.config.ChonglistGiftConfig;
    import ShopConfig = game.config.ShopConfig;
    import DirectShopConfig = game.config.DirectShopConfig;
    import GiftBagConfig = game.config.GiftBagConfig;
    import ProductIdConfig = game.config.ProductIdConfig;
    import facade = base.facade;
    import Handler = base.Handler;

    export class PunshListGiftItem extends BaseGiftItemRender {
        protected lab_limit: eui.Label;
        protected grp_buy: eui.Group;
        protected img_lab: eui.Image;
        private _proxy: PunshListProxy;

        data: ChonglistGiftConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            //%超值资源显示
            this.img_lab.source = `chaozhi_${this.itemIndex + 1}`;
            let data = this._proxy.getGift(this._proxy.type, this.data.index);
            let count: number = data && data.count || 0;
            let lmt: number = 0;
            let datas: number[][] = [];
            // let title: string = "";
            if (this.data.buy_type == 1) {
                let cfg: ShopConfig = getConfigByNameId(ConfigName.Store, this.data.shop_index);
                lmt = cfg.lmt_cnt;
                datas = cfg.prop;
                // title = cfg.des;

                this.btn_buy.setCost([cfg.coin_type, cfg.price]);
            } else {
                let cfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, this.data.shop_index);
                let lmtCfgs = getConfigByNameId(ConfigName.DirectShop, 11);
                for (let k in lmtCfgs) {
                    let lmtCfg: DirectShopConfig = lmtCfgs[k];
                    if (lmtCfg.product_id == this.data.shop_index) {
                        lmt = lmtCfg.param1;
                    }
                }
                datas = cfg.awards;
                // title = cfg.name;

                let product: ProductIdConfig = getConfigByNameId(ConfigName.ProductId, this.data.shop_index);
                this.btn_buy.resetCost();
                this.btn_buy.label = `${product.rmb}元`;
            }

            if (count < lmt) {
                this.lab_limit.textFlow = TextUtil.parseHtml("限购:" + TextUtil.addColor(`${lmt - count}/${lmt}`, WhiteColor.GREEN));
                this.grp_buy.visible = true;
                this.img_bought.visible = false;
            } else {
                this.grp_buy.visible = false;
                this.img_bought.visible = true;
            }
            if (this.data.vip_cond > VipUtil.getShowVipLv()) {
                this.lab_limit.text = `VIP${this.data.vip_cond}可购买`;
            }
            this._listData.replaceAll(datas);
            this.lb_desc.textFlow = TextUtil.parseHtml(this.data.desc);
        }

        /**点击购买*/
        protected onClick(): void {
            if (this.data.vip_cond > 0 && VipUtil.getShowVipLv() < this.data.vip_cond) {
                let str: string = `VIP${this.data.vip_cond}可购买，是否前往?`;
                ViewMgr.getIns().showConfirm(str, Handler.alloc(this, () => {
                    ViewMgr.getIns().openCommonRechargeView();
                }));
                return;
            }
            if (this.data.buy_type == 1) {
                let cfg: ShopConfig = getConfigByNameId(ConfigName.Store, this.data.shop_index);
                if (!BagUtil.checkPropCnt(cfg.coin_type, cfg.price)) {
                    ViewMgr.getIns().openCommonRechargeView();
                    return;
                }
                let prop: PropData = PropData.create(cfg.coin_type);
                let str: string = `是否花费${TextUtil.addColor(`${cfg.price}`, WhiteColor.GREEN)}${prop.cfg.name}购买`;
                ViewMgr.getIns().showConfirm(str, Handler.alloc(this, () => {
                    this._proxy.c2s_chonglist_item_buy_gift(this._proxy.type, this.data.index);
                }));
                // this._proxy.c2s_chonglist_item_buy_gift(this._proxy.type, this.data.index);
            } else {
                PayUtil.pay(this.data.shop_index);
            }
        }
    }
}