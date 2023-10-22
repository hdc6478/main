namespace game.mod.activity {
    import ZcxExchangeConfig = game.config.ZcxExchangeConfig;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class ZcxBuyTipsMdr extends MdrBase {
        private _view: ZcxBuyTipsView = this.mark("_view", ZcxBuyTipsView);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;
        private _leftCnt = 0;
        private _cost: number[][] = [];

        _showArgs: ZcxExchangeConfig;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list_cost.itemRenderer = ZcxCoinItem;
            this._view.list_cost.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClickBuy, this);
            addEventListener(this._view.list_cost, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(ActivityEvent.ON_BTN_BUY_CNT_POST, this.onUpdateBuyCnt, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfg = this._showArgs;
            this._view.icon.data = cfg.rewards[0];
            let idx = cfg.rewards[0][0];
            let propCfg = GameConfig.getPropConfigById(idx);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(propCfg.name, ColorUtil.getColorByQuality1(propCfg.quality)));
            this._view.lb_own.text = getLanById(LanDef.have) + '：' + BagUtil.getPropCntByIdx(idx);
            this._leftCnt = this._proxy.getExchangeLeftCnt(cfg.index);
            this._view.btnView.setMaxCnt(this._leftCnt);
            this._view.lb_stock.text = getLanById(LanDef.zcx_tips21) + `：${this._leftCnt}/${cfg.count}`;
            this.updateCost(cfg.costs.concat());
        }

        private updateCost(ary: number[][]): void {
            this._listData.replaceAll(ary);
            this._cost = ary;
        }

        private onUpdateBuyCnt(n: GameNT): void {
            let cnt = n.body as number;
            this.setCnt(cnt);
        }

        private setCnt(cnt: number): void {
            let ary: number[][] = [];
            for (let cost of this._showArgs.costs) {
                ary.push([cost[0], cost[1] * cnt]);
            }
            this.updateCost(ary);
        }

        private onClickBuy(): void {
            for (let cost of this._cost) {
                if (!BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Dialog)) {
                    return;
                }
            }
            this._proxy.c2s_zcx_exchange_button(this._showArgs.index, this._view.btnView.getCnt());
            this.hide();
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let data = e.item as number[];
            if (data && data[0]) {
                ViewMgr.getIns().showPropTips(data[0]);
            }
        }

    }
}