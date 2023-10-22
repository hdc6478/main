namespace game.mod.activity {


    export class XianlvGiftMdr extends EffectMdrBase {
        private _view: XianlvGiftView = this.mark("_view", XianlvGiftView);
        private _proxy: XianlvGiftProxy;
        private _type = 1;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvGift);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_buy, egret.TouchEvent.TOUCH_TAP, this.onClickBuy, this);
            addEventListener(this._view.btn1, egret.TouchEvent.TOUCH_TAP, this.onClickBtn1, this);
            addEventListener(this._view.btn2, egret.TouchEvent.TOUCH_TAP, this.onClickBtn2, this);

            this.onNt(ActivityEvent.ON_UPDATE_XIANLV_GIFT, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.hint = false;
            this.switchType(1);
            this.addEftByParentScale(this._view.btn_buy.group_eft);

        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let isBought = this._proxy.isBought(this._type);
            this._view.img_bought.visible = isBought;
            this._view.btn_buy.visible = !isBought;

            let rewards = [];
            if (this._type == 1) {
                let paramCfg = GameConfig.getParamConfigById('xianlv_gift_1');
                if (!paramCfg) {
                    return;
                }
                rewards = paramCfg.value.slice(1);
                this._view.btn_buy.setCost(paramCfg.value[0]);
                this._view.btn_buy.label = '';
            } else {
                rewards = PayUtil.getRewards(ProductId.Id200006);
                let rmb = PayUtil.getRmbValue(ProductId.Id200006);
                this._view.btn_buy.resetCost();
                this._view.btn_buy.label = rmb + PayUtil.getRmbUnit();
            }
            this._listData.source = rewards;
        }

        private onClickBuy(): void {
            if (this._type == 1) {
                this._proxy.c2s_xianlv_libao();
            } else {
                PayUtil.pay(ProductId.Id200006);
            }
        }

        private onClickBtn1(): void {
            this.switchType(1);
        }

        private onClickBtn2(): void {
            this.switchType(2);
        }

        private switchType(type: number): void {
            this._type = type;
            if (type == 1) {
                this._view.btn1.img_bg.source = `xin_huangseanniu`;
                this._view.btn2.img_bg.source = `xin_shenhongseanniu`;
            } else {
                this._view.btn1.img_bg.source = `xin_shenhongseanniu`;
                this._view.btn2.img_bg.source = `xin_huangseanniu`;
            }
            this.updateView();

            this._view.img_desc0.source = `xylb_desc_${type}0`;
            this._view.img_desc1.source = `xylb_desc_${type}1`;
            this._view.img_name0.source = `xylb_name_${type}0`;
            this._view.img_name1.source = `xylb_name_${type}1`;
            this._view.img_name2.source = `xylb_name_${type}2`;
        }
    }
}