namespace game.mod.store {

    import DirectShopConfig = game.config.DirectShopConfig;
    import LanDef = game.localization.LanDef;

    export class StoreType3Item extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public lb_limit: eui.Label;
        public list: eui.List;
        public btn_buy: game.mod.Btn;
        public img_bought: eui.Image;

        private _proxy: StoreProxy;
        private _listData: eui.ArrayCollection;
        /**type: 1每日，2每周*/
        data: { cfg: DirectShopConfig, type: number };

        constructor() {
            super();
            this.skinName = `skins.store.StoreType3ItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Store, ProxyType.Store);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if (!this.data || !this.data.cfg) {
                return;
            }
            let cfg = this.data.cfg;
            this.img_icon.source = `xianyu_icon${cfg.product_id % 100}`;
            let rewards = PayUtil.getRewards(cfg.product_id) || [];
            this._listData.replaceAll([...rewards]);

            let bought_cnt = this._proxy.getBoughtCnt(this.data.type, cfg.product_id);
            let isSoldOut = bought_cnt >= cfg.param1;//购买完全部
            let left_cnt = cfg.param1 - bought_cnt;
            let str = isSoldOut ? getLanById(LanDef.tongtiange_tips7)
                : getLanById(LanDef.tongtiange_tips8) + TextUtil.addColor(`${left_cnt}/${cfg.param1}`, left_cnt >= 0 ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_limit.textFlow = TextUtil.parseHtml(str);

            let rmb = PayUtil.getRmbValue(cfg.product_id);
            this.img_bought.visible = isSoldOut;
            this.btn_buy.visible = !isSoldOut;
            this.btn_buy.label = rmb == 0 ? getLanById(LanDef.bosshome_tips5) : (rmb + PayUtil.getRmbUnit());

            //0元购红点
            if (!isSoldOut) {
                this.btn_buy.setHint(rmb == 0);
            }
        }

        public onClick(): void {
            if (this.data && this.data.cfg) {
                PayUtil.pay(this.data.cfg.product_id);
            }
        }
    }
}