namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import GameOrderTypeConfig = game.config.GameOrderTypeConfig;
    import TouchEvent = egret.TouchEvent;

    export class GameOrderUnlockMdr extends EffectMdrBase {
        private _view: GameOrderUnlockView = this.mark("_view", GameOrderUnlockView);
        private _proxy: GameOrderProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _listItemData: ArrayCollection = new ArrayCollection();
        /**战令类型*/
        private _gameOrderType: GameOrderType;
        /**0战令类型，1购买后累计可领取，2现在购买立即领取*/
        _showArgs: any[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.GameOrder);

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
        }

        protected onShow(): void {
            super.onShow();
            this._gameOrderType = this._showArgs[0] as number;
            this.onUpdateView();
            this.addEftByParentScale(this._view.btn.group_eft);
        }

        private onUpdateView(): void {
            let type: number = this._gameOrderType;
            let str: string = GameOrderUnlockTitle[type];
            this._view.secondPop.updateTitleStr(`解锁${str}`);
            this._view.lab_title.text = `购买后累计可领取`;

            this._listData.source = this._showArgs[1] || [];//购买后累计可领取

            this._listItemData.source = this._showArgs[2] || [];//现在购买立即领取

            let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, type);
            let rmb = PayUtil.getRmbValue(cfg.recharge_id);
            let fakeRmb = PayUtil.getFakeRmbValue(cfg.recharge_id);
            this._view.btn.setTwoPrice(rmb, fakeRmb);
        }

        private onClick(): void {
            let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, this._gameOrderType);
            PayUtil.pay(cfg.recharge_id);
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}