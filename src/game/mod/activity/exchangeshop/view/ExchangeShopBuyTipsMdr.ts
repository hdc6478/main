namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class ExchangeShopBuyTipsMdr extends MdrBase {
        private _view: StoreBuyTipsView = this.mark("_view", StoreBuyTipsView);

        _showArgs: ShopBuyBulkData;
        private _cost = 0; //购买消耗数量
        private _leftCnt = 0; //剩余限购次数

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            //addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_confirm, egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
            addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
            addEventListener(this._view.btn_addTen, egret.TouchEvent.TOUCH_TAP, this.onAddTen, this);
            addEventListener(this._view.btn_subtract, egret.TouchEvent.TOUCH_TAP, this.onSubtract, this);
            addEventListener(this._view.btn_subtractTen, egret.TouchEvent.TOUCH_TAP, this.onSubtractTen, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }

            this.updateView();
            this.setCnt(1);//重置次数
        }

        private updateView(): void {
            let {prop, lmt_cnt, lmt_type, cost, left_cnt} = this._showArgs;
            let propCfg = GameConfig.getPropConfigById(prop[0]);
            if (!propCfg) {
                return;
            }
            this._view.lb_name.text = propCfg.name;
            this._view.icon.data = PropData.create(prop[0], prop[1]);

            if (left_cnt != null && lmt_type != null) {
                let str = '';
                if (lmt_type == StoreLimitBuy.Daily) {
                    str = getLanById(LanDef.store5);
                } else if (lmt_type == StoreLimitBuy.Lifetime) {
                    str = getLanById(LanDef.store6);
                } else if (lmt_type == StoreLimitBuy.Weekly) {
                    str = getLanById(LanDef.store7);
                } else if (lmt_type == StoreLimitBuy.Limit) {
                    str = '限购:';
                }
                // let str = lmt_type == 1 ? getLanById(LanDef.store5) : (lmt_type == 2 ? getLanById(LanDef.store6) : getLanById(LanDef.store7));
                this._view.lb_buyDesc.textFlow = TextUtil.parseHtml(str + TextUtil.addColor(`${left_cnt}/${lmt_cnt}`, BlackColor.GREEN));
            } else {
                this._view.lb_buyDesc.text = "";
            }
            this._leftCnt = left_cnt || 0;//剩余购买次数

            this._cost = cost[1];

            let costCfg = GameConfig.getPropConfigById(cost[0]);
            this._view.costIcon.imgCost = costCfg.icon;
            this.updateCostIcon();
        }

        private updateCostIcon(): void {
            let cost: number = this._cost * this.getCnt();
            let color: number = BagUtil.checkPropCnt(this._showArgs.cost[0], cost) ? WhiteColor.GREEN : WhiteColor.RED;
            this._view.costIcon.setLabCost(`${cost}`, color);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onConfirm(): void {
            let cnt = this.getCnt();
            if (this._leftCnt && this._leftCnt < cnt) {
                return;
            }
            if (!BagUtil.checkPropCnt(this._showArgs.cost[0], this._cost * cnt, PropLackType.Dialog)) {
                this.hide();
                return;
            }
            let handler: Handler = this._showArgs.handler;
            handler.exec(cnt);
            this.hide();
        }

        private getCnt(): number {
            return Number(this._view.lb_cnt.text) || 1;
        }

        private setCnt(cnt: number): void {
            this._view.lb_cnt.text = cnt + '';
            this.updateCostIcon();
        }

        private onAdd(): void {
            let cnt = this.getCnt();
            if (this._leftCnt && cnt >= this._leftCnt) {
                return;
            }
            this.setCnt(++cnt);
        }

        private onAddTen(): void {
            let cnt = this.getCnt();
            if (this._leftCnt && cnt >= this._leftCnt) {
                return;
            }
            if (this._leftCnt) {
                this.setCnt(Math.min(cnt + 10, this._leftCnt));
            } else {
                this.setCnt(cnt + 10);
            }
        }

        private onSubtract(): void {
            let cnt = this.getCnt();
            if (cnt <= 1) {
                return;
            }
            this.setCnt(--cnt);
        }

        private onSubtractTen(): void {
            let cnt = this.getCnt();
            if (cnt <= 1) {
                return;
            }
            this.setCnt(Math.max(cnt - 10, 1));
        }
    }
}