namespace game.mod.store {

    import DirectShopConfig = game.config.DirectShopConfig;
    import PropConfig = game.config.PropConfig;

    export class StoreType2Item extends BaseRenderer {
        public img_tag: eui.Image;
        public img_icon: eui.Image;
        public btn_buy: game.mod.Btn;
        public img_cost: eui.Image;
        public gr_num: eui.Group;

        data: DirectShopConfig;
        private _proxy: StoreProxy;

        constructor() {
            super();
            this.skinName = `skins.store.StoreType2ItemSkin`;
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
            let data = this.data;
            if (!data) {
                return;
            }

            let no_mul = this._proxy.model.no_multi_product_ids.indexOf(data.product_id) > -1;
            this.img_tag.visible = no_mul ? false : !!data.param1;
            if (this.img_tag.visible) {
                this.img_tag.source = `${data.param1}beifanli`;
            }
            let cfg: PropConfig = GameConfig.getPropConfigById(PropIndex.Xianyu);
            this.img_cost.source = cfg.icon;
            let rmb = PayUtil.getRmbValue(data.product_id);
            let cfgList: object = getConfigByNameId(ConfigName.DirectShop, DirectShopType.Xianyu);
            let dsCfg: DirectShopConfig = cfgList[data.product_id];
            let rate = dsCfg.param1 || 1;
            this.addBmpFont((rmb * 10 * rate) + '', BmpTextCfg[BmpTextType.XianYu], this.gr_num, true, 1, false, 0, true);
            this.img_icon.source = `xianyu_icon${data.product_id % 100}`;
            this.btn_buy.label = `${rmb}元`;
        }

        private onClick(): void {
            PayUtil.pay(this.data.product_id);
        }
    }
}