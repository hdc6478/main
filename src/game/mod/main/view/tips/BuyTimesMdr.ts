namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class BuyTimesMdr extends MdrBase {
        private _view: BuyTimesView = this.mark("_view", BuyTimesView);
        /**
         * 通用的购买次数
         * @param tips 描述文本
         * @param cost 单次购买消耗
         * @param cnt 剩余可购买次数
         * @param maxBuyCnt 当前可购买次数
         * @param maxCnt 最大可购买次数
         * @param handler 点击购买按钮回调
         */
        protected _showArgs: {tips: string, cost: number[], cnt: number, maxBuyCnt: number, maxCnt: number, handler: Handler};

        private _curCnt: number;// 当前购买次数

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_subtract10, TouchEvent.TOUCH_TAP, this.onClickSubtract10);
            addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
            addEventListener(this._view.btn_add10, TouchEvent.TOUCH_TAP, this.onClickAdd10);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_ok, TouchEvent.TOUCH_TAP, this.onOkClick);
        }

        protected onShow(): void {
            super.onShow();

            this._curCnt = this.getMaxCnt();//默认最大次数
            this.updateNum();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickSubtract10(): void {
            this.delNum(10);
        }

        private onClickSubtract(): void {
            this.delNum(1);
        }

        private delNum(num: number): void {
            this._curCnt = Math.max(1, this._curCnt - num);
            this.updateNum();
        }

        private onClickAdd10(): void {
            this.addNum(10);
        }

        private onClickAdd(): void {
            this.addNum(1);
        }

        private addNum(num: number): void {
            let maxCnt = this.getMaxCnt();
            if(this._curCnt >= maxCnt){
                PromptBox.getIns().show(getLanById(LanDef.max_buy_tips));
                return;
            }
            this._curCnt = Math.min(maxCnt, this._curCnt + num);
            this.updateNum();
        }
        //当前最大可购买次数
        private getMaxCnt(): number {
            let cnt = this._showArgs.cnt;
            let maxBuyCnt = this._showArgs.maxBuyCnt;
            return Math.max(Math.min(cnt, maxBuyCnt), 1);
        }

        private onOkClick(evt: TouchEvent): void {
            this._showArgs.handler.exec([this._curCnt]);
            this.hide();
        }

        private updateNum(): void {
            this._view.lbl_num.text = this._curCnt + "";

            //"是否花费%s购买%s次游历挑战次数？";
            let tips = this._showArgs.tips;
            let cost = this._showArgs.cost;
            let cnt = this._showArgs.cnt;
            let maxCnt = this._showArgs.maxCnt;

            let idx = cost[0];
            let costCnt = cost[1];
            let cfg = GameConfig.getPropConfigById(idx);
            let totalCost = this._curCnt * costCnt;
            let tip1 = TextUtil.addColor(totalCost + "", WhiteColor.GREEN) + cfg.name;
            let tip2 = TextUtil.addColor(this._curCnt + "", WhiteColor.GREEN);
            tips = StringUtil.substitute(tips, [tip1, tip2]);
            tips += "\n今日剩余购买次数"+ TextUtil.addColor(`(${cnt}/${maxCnt})`, WhiteColor.GREEN);
            this._view.lab_tip.textFlow = TextUtil.parseHtml(tips);
        }

    }
}