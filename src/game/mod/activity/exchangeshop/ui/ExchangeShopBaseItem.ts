namespace game.mod.activity {

    import ExchangeShopProxy = game.mod.activity.ExchangeShopProxy;

    export class ExchangeShopBaseItem extends BaseRenderer {

        protected icon: Icon;
        protected btn: Btn;
        protected img_bought: eui.Image;
        protected lab_name: eui.Label;
        protected lab_limit: eui.Label;
        protected img_tag: eui.Image;
        protected img_bg: eui.Image;

        protected _proxy: ExchangeShopProxy;
        protected args: ShopBuyBulkData;

        protected lmt_type: number;
        /**限购次数 */
        protected lmt_cnt: number;
        /**剩余购买次数 */
        protected left_cnt: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.ExchangeShop);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            this.img_bg.source = "common_shop_bg";
            this.img_bought.source = "yishouqing2";

            this.icon.setData(cfg.prop[0]);
            this.lab_name.textFlow = this.icon.getPropName(true, true);
            this.lab_limit.visible = cfg.lmt_type != 0;

            this.img_tag.visible = !!cfg.tag;
            if (cfg.tag) {
                this.img_tag.source = cfg.tag;
            }

            this.btn.visible = (!this.left_cnt && this.left_cnt !== 0) || this.left_cnt > 0;
            this.lab_limit.visible = this.btn.visible;
            this.img_bought.visible = !this.btn.visible;
            if (this.btn.visible) {
                this.btn.setCost([cfg.coin_type, cfg.price]);
                this.btn.setHint(BagUtil.checkPropCnt(cfg.coin_type, cfg.price));
            }

            this.args = {
                prop: cfg.prop[0],
                cost: [cfg.coin_type, cfg.price],
                lmt_type: this.lmt_type,
                lmt_cnt: this.lmt_cnt,
                left_cnt: this.left_cnt,
                // handler: Handler.alloc(this, this.onHandler, [cfg.index])
            };
        }

        private onClick(): void {
            // facade.showView();
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.ExchangeShopTips, this.args);
        }

    }
}