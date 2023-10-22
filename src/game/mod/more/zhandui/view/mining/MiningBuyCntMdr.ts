namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class MiningBuyCntMdr extends MdrBase {
        private _view: MiningBuyCntView = this.mark("_view", MiningBuyCntView);
        private _proxy: MiningProxy;

        /**单次兑换需要材道具数量 */
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
            this._proxy = this.retProxy(ProxyType.Mining);
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

            this.count = this._proxy.team_buy_pay_num;
            this.num = this._proxy.team_buy_num;

            this._leftCnt = this._proxy.dail_buy_num || 0;
            let str3: string = TextUtil.addColor(`${this._leftCnt}/${this.num}`, !!this._leftCnt ? WhiteColor.GREEN : WhiteColor.RED);
            let str4: string = StringUtil.substitute(getLanById(LanDef.shengyugoumaicishu), [str3]);
            this._view.lab_2.textFlow = TextUtil.parseHtml(str4);

            this.onUpdateCost();
        }

        private onUpdateCost(): void {
            let param: game.config.ParamConfig = GameConfig.getParamConfigById("team_buy_num");
            this._view.coinItem.initIcon(param.value[0]);
            this._view.coinItem.lab_cost.text = `${this.getCnt * this.count}`;
        }

        protected onHide(): void {
            super.onHide();
        }

        private onConfirm(): void {
            this._proxy.c2s_zhandui_buy_conquer_num(this.getCnt);
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