namespace game.mod.activity {

    export class FeishengLibaoMdr extends EffectMdrBase {
        private _view: FeishengLibaoView = this.mark("_view", FeishengLibaoView);
        private _proxy: FeishengLibaoProxy;
        private _listData: eui.ArrayCollection;
        private _openIdx: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.FeishengLibao);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_buy, egret.TouchEvent.TOUCH_TAP, this.onClickBuy, this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(ActivityEvent.ON_UPDATE_FEISHENGLIBAO_INFO, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._openIdx = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let productId = this._proxy.getProductId(this._openIdx);
            if (!productId) {
                return;
            }
            this._view.btn_buy.setTwoPrice(PayUtil.getRmbValue(productId), PayUtil.getFakeRmbValue(productId));
            let rewards = PayUtil.getRewards(productId);
            if (rewards && rewards[0]) {
                let cfg = GameConfig.getPropConfigById(rewards[0][0]);
                if (cfg && cfg.param1) {
                    let surfaceCfg = getConfigById(cfg.param1[0][0]);
                    if (surfaceCfg) {
                        this._view.nameItem.updateShow(surfaceCfg.name, surfaceCfg.quality);
                    }
                    this.addAnimate(cfg.param1[0][0], this._view.gr_eft);
                } else {
                    this._view.nameItem.updateShow(cfg.name, cfg.quality);
                }
                this._view.power.setPowerValue(cfg && cfg.showPower || 0);
            }
            this._listData.replaceAll(rewards);

            let idx = this._proxy.getIdx(this._openIdx);
            this._view.img_title.source = `feishenglibao_title${idx}`;
            this._view.img_desc.source = `feishenglibao_desc${idx}`;

            let upNumStr = this._proxy.getUpNumStr(this._openIdx);
            this.addBmpFont(upNumStr, BmpTextCfg[BmpTextType.Feishenglibao], this._view.gr_font);
        }

        private onClickBuy(): void {
            let productId = this._proxy.getProductId(this._openIdx);
            PayUtil.pay(productId);
        }
    }
}