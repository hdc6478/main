namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import GiftBagConfig = game.config.GiftBagConfig;
    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class TehuiLibaoMdr extends MdrBase implements UpdateItem {
        private _view: TehuiLibaoView = this.mark("_view", TehuiLibaoView);
        private _proxy: TehuiLibaoProxy;
        private _listData: eui.ArrayCollection = new ArrayCollection();
        private _endTime = 0;

        private _productId: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.TehuiLibao);

            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);

            this.onNt(ActivityEvent.ON_UPDATE_TEHUI_LIBAO_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        private onUpdateView(): void {
            this._view.img_bg.source = ResUtil.getUiPng(`bg_tehuilibao${this._showArgs}`);
            this._view.img_zhekou.source = `tehuilibao_zhekou${this._showArgs}`;

            this._productId = this._proxy.getInfo(this._showArgs);
            if (!this._productId) {
                this.hide();
                return;
            }
            let gift: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, this._productId);
            if (gift) {
                this._listData.replaceAll(gift.awards);
            }

            let rmb = PayUtil.getRmbValue(this._productId);
            let fakeRmb = PayUtil.getFakeRmbValue(this._productId);
            this._view.btn.setTwoPrice(rmb, fakeRmb);
        }

        private onClick(): void {
            PayUtil.pay(this._productId);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            this._endTime = 0;
            super.onHide();
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

    }
}