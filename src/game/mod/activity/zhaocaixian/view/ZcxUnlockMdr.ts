namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class ZcxUnlockMdr extends EffectMdrBase {
        private _view: GameOrderUnlockView = this.mark("_view", GameOrderUnlockView);
        private _listData: ArrayCollection = new ArrayCollection();
        private _listItemData: ArrayCollection = new ArrayCollection();
        private _proxy: ZcxProxy;
        private _type: ZcxFundType;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);

            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData;

            this._view.list_item.itemRenderer = Icon;
            this._view.list_item.dataProvider = this._listItemData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
            this.onNt(ActivityEvent.ON_ZCX_FUND_REWARD_SHOW, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._type = this._showArgs as number;
            this._view.secondPop.updateTitleStr(getLanById(LanDef.zcx_tips17));
            this._view.lab_title.textFlow = TextUtil.parseHtml(getLanById(LanDef.zcx_tips18));
            this._proxy.c2s_zcx_fund_reward_show(this._type);
        }

        private updateView(): void {
            //购买后累计可领取
            this._listData.source = this._proxy.getAllRewards(this._type);

            //现在购买立即领取
            this._listItemData.source = this._proxy.getRewardsAfterPay(this._type);

            let payId = this._proxy.getFundProductId(this._type);
            let rmb = PayUtil.getRmbValue(payId);
            let fakeRmb = PayUtil.getFakeRmbValue(payId);
            if (fakeRmb) {
                this._view.btn.setTwoPrice(rmb, fakeRmb);
            } else {
                this._view.btn.setFontPrice(rmb);
            }
            this.addEftByParentScale(this._view.btn.group_eft);
        }

        private onClick(): void {
            let payId = this._proxy.getFundProductId(this._type);
            PayUtil.pay(payId);
            this.hide();
        }
    }

}