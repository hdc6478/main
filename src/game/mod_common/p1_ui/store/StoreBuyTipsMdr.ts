namespace game.mod {

    import ShopConfig = game.config.ShopConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    /**通用的批量购买tips*/
    export class StoreBuyTipsMdr extends MdrBase {
        private _view: StoreBuyTipsView = this.mark("_view", StoreBuyTipsView);

        _showArgs: {
            index: number;//商店表的商品index
            left_cnt: number;//剩余购买数量
            handler: Handler;//购买回调
        };

        private _cfg: ShopConfig;
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
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
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
            this._cfg = getConfigByNameId(ConfigName.Store, this._showArgs.index);
            if (!this._cfg) {
                DEBUG && console.error(`没有 ${this._showArgs.index} 的商品`);
                return;
            }
            this.updateView();
            this.setCnt(1);//重置次数
        }

        private updateView(): void {
            let prop = this._cfg.prop[0];
            let propCfg = GameConfig.getPropConfigById(prop[0]);
            if (!propCfg) {
                return;
            }
            this._view.lb_name.text = propCfg.name;
            this._view.icon.data = PropData.create(prop[0], prop[1]);

            // let bought_cnt = this._showArgs.bought_cnt;//已购买次数
            this._leftCnt = this._showArgs.left_cnt;//剩余购买次数
            let str = this._cfg.lmt_type == 1 ? getLanById(LanDef.store5) : (this._cfg.lmt_type == 2 ? getLanById(LanDef.store6) : getLanById(LanDef.store7));
            this._view.lb_buyDesc.textFlow = TextUtil.parseHtml(str + TextUtil.addColor(`${this._leftCnt}/${this._cfg.lmt_cnt}`, BlackColor.GREEN));

            if (this._cfg.discount) {
                this._cost = Math.floor(this._cfg.price * this._cfg.discount / 10000);
            } else {
                this._cost = this._cfg.price;
            }

            let costCfg = GameConfig.getPropConfigById(this._cfg.coin_type);
            this._view.costIcon.imgCost = costCfg.icon;
            this.updateCostIcon();
        }

        //更新购买n次所需消耗数量
        private updateCostIcon(): void {
            let cost = this._cost * this.getCnt();
            let color = BlackColor.GREEN;
            if (!BagUtil.checkPropCnt(this._cfg.coin_type, cost)) {
                color = BlackColor.RED;
            }
            this._view.costIcon.setLabCost(cost + '', color);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onConfirm(): void {
            let cnt = this.getCnt();
            if (this._leftCnt < cnt) {
                return;
            }
            if (!BagUtil.checkPropCnt(this._cfg.coin_type, this._cost * cnt, PropLackType.Dialog)) {
                if(this._cfg.coin_type == PropIndex.Xianyu){
                    ViewMgr.getIns().openCommonRechargeView();
                    this.hide();
                }
                return;
            }
            let handler = this._showArgs.handler;
            if (handler) {
                handler.exec(cnt);//回调购买次数，其他参数构建handler时携带
            }
            this.hide();
        }

        /**todo 有通用组件，待处理*/

        private getCnt(): number {
            return Number(this._view.lb_cnt.text) || 1;
        }

        private setCnt(cnt: number): void {
            this._view.lb_cnt.text = cnt + '';
            this.updateCostIcon();
        }

        private onAdd(): void {
            let cnt = this.getCnt();
            if (cnt >= this._leftCnt) {
                return;
            }
            this.setCnt(++cnt);
        }

        private onAddTen(): void {
            let cnt = this.getCnt();
            if (cnt >= this._leftCnt) {
                return;
            }
            this.setCnt(Math.min(cnt + 10, this._leftCnt));
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