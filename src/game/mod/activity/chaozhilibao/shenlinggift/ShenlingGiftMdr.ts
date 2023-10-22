namespace game.mod.activity {

    import GiftBagConfig = game.config.GiftBagConfig;

    export class ShenlingGiftMdr extends MdrBase {
        private _view: ShenlingGiftView = this.mark("_view", ShenlingGiftView);
        private _proxy: ShenlingGiftProxy;
        private _productId: number;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.ShenlingGift);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_buy, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ActivityEvent.ON_SHENLING_GIFT_INFO_UPDATE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._productId = null;
        }

        private updateView(): void {
            let productId = this._proxy.getProductId();
            if (!productId) {
                return;
            }
            let giftBagCfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, productId);
            if (!giftBagCfg) {
                return;
            }
            this._productId = productId;
            this._view.icon.data = giftBagCfg.awards[0];
            this._listData.replaceAll(giftBagCfg.awards.slice(1));

            let rmb = PayUtil.getRmbValue(productId);
            let fakeRmb = PayUtil.getFakeRmbValue(productId);
            this._view.btn_buy.setTwoPrice(rmb, fakeRmb);

            let type = productId % 4;
            this._view.img_type.source = `shenlinggift_type${type}`;
            this._view.img_name.source = giftBagCfg.icon || '';
        }

        private onClick(): void {
            if (this._productId) {
                PayUtil.pay(this._productId);
            }
        }
    }
}