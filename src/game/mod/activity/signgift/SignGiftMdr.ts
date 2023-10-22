namespace game.mod.activity {

    import DailySignConfig = game.config.DailySignConfig;

    export class SignGiftMdr extends MdrBase {
        private _view: SignGiftView = this.mark("_view", SignGiftView);
        private _proxy: SignGiftProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.SignGift);
            this._view.list.itemRenderer = SignGiftItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(ActivityEvent.ON_UPDATE_SIGN_GIFT_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let model = this._proxy.model;
            this._view.lb_signDay.textFlow = TextUtil.parseHtml(`已签到 `
                + TextUtil.addColor(model.count + '天', 0x00ff00));//策划需求0x0f0

            let cfgs: DailySignConfig[] = getConfigListByName(ConfigName.SignGift);
            let list: ISignGiftItemData[] = [];
            for (let cfg of cfgs) {
                let signed = this._proxy.isSigned(cfg.index);//已签到
                let canSign = model.index > 0 && cfg.index == model.index;//可签到领奖
                let state = signed ? 2 : (canSign ? 1 : 0);
                list.push({
                    cfg,
                    state
                });
            }
            this._listData.replaceAll(list);
            this.updateBigReward();
        }

        private updateBigReward(): void {
            let cnt = (this._proxy.model.count % 20) + 1;
            let bigIdx = Math.ceil(cnt / 4) * 4;//一组4个，第4个为大奖
            let cfg: DailySignConfig = getConfigByNameId(ConfigName.SignGift, bigIdx);
            if (cfg) {
                this._view.icon_bigReward.updateData(cfg.reward);
            }
        }
    }
}