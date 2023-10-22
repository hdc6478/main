namespace game.mod.union {

    import ParamConfig = game.config.ParamConfig;

    export class UnionStoreTipsMdr extends MdrBase {
        private _view: UnionStoreTipsView = this.mark("_view", UnionStoreTipsView);
        private _proxy: UnionProxy;

        private index: number;
        /**单次兑换数量 */
        private count: number;
        /**总兑换次数 */
        private num: number;
        /**剩余可兑换次数 */
        private _leftCnt: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_cancel, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.btn_confirm, egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
            addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
            addEventListener(this._view.btn_addTen, egret.TouchEvent.TOUCH_TAP, this.onAddTen, this);
            addEventListener(this._view.btn_subtract, egret.TouchEvent.TOUCH_TAP, this.onSubtract, this);
            addEventListener(this._view.btn_subtractTen, egret.TouchEvent.TOUCH_TAP, this.onSubtractTen, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
            this.setCnt(1);//重置次数
        }

        private onUpdateView(): void {
            let param1: ParamConfig = GameConfig.getParamConfigById("guild_exchange_item");
            this.index = param1.value;
            let param2: ParamConfig = GameConfig.getParamConfigById("guild_duihuan");
            this.count = param2.value;
            let param3: ParamConfig = GameConfig.getParamConfigById("guild_exchange_num");
            this.num = param3.value;

            let str1: string = TextUtil.addColor(`${this.count}仙玉`, WhiteColor.GREEN);
            let prop: PropData = PropData.create(this.index);
            let str2: string = TextUtil.addColor(`${this.count}${prop.cfg.name}`, WhiteColor.GREEN);
            this._view.lab_1.textFlow = TextUtil.parseHtml(`是否花费${str1}购买${str2}`);

            this._leftCnt = this._proxy.model.store_count || 0;
            let str3: string = TextUtil.addColor(`${this._leftCnt}/${this.num}`, this._leftCnt >= this.num ? WhiteColor.GREEN : WhiteColor.RED);
            this._view.lab_2.textFlow = TextUtil.parseHtml(`本周剩余购买次数${str3}`);

            this.onUpdateCost();
        }

        private onUpdateCost(): void {
            this._view.coinItem.lab_cost.text = `${this.getCnt * this.count}`;
        }

        protected onHide(): void {
            super.onHide();
        }

        private onConfirm(): void {
            this._proxy.c2s_guild_exchange_item(this.getCnt);
            this.hide();
        }

        private setCnt(cnt: number): void {
            this._view.lb_cnt.text = `${cnt}`;
            this.onUpdateCost();
        }

        private onAdd(): void {
            let cnt = this.getCnt;
            if (cnt >= this._leftCnt) {
                return;
            }
            this.setCnt(++cnt);
        }

        private onAddTen(): void {
            let cnt = this.getCnt;
            if (cnt >= this._leftCnt) {
                return;
            }
            this.setCnt(Math.min(cnt + 10, this._leftCnt));
        }

        private onSubtract(): void {
            let cnt = this.getCnt;
            if (cnt <= 1) {
                return;
            }
            this.setCnt(--cnt);
        }

        private onSubtractTen(): void {
            let cnt = this.getCnt;
            if (cnt <= 1) {
                return;
            }
            this.setCnt(Math.max(cnt - 10, 1));
        }

        private get getCnt(): number {
            return Number(this._view.lb_cnt.text) || 1;
        }
    }
}