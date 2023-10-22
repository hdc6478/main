namespace game.mod {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    /**
     * 购买按钮组件
     * 设置最大购买次数 setMaxCnt(cnt:number)
     * 抛出 ActivityEvent.ON_BTN_BUY_CNT_POST，带有文本的购买次数
     */
    export class BuyBtnListView extends eui.Component {
        private btn_subTen: game.mod.Btn;
        private btn_sub: game.mod.Btn;
        private btn_add: game.mod.Btn;
        private btn_addTen: game.mod.Btn;
        private lb_cnt: eui.Label;
        public img_cost: eui.Image;

        /**最大购买数量*/
        private _maxCnt = 0;

        constructor() {
            super();
            this.skinName = "skins.common.BuyBtnListSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_add.addEventListener(TouchEvent.TOUCH_TAP, this.onAdd, this);
            this.btn_addTen.addEventListener(TouchEvent.TOUCH_TAP, this.onAddTen, this);
            this.btn_sub.addEventListener(TouchEvent.TOUCH_TAP, this.onSub, this);
            this.btn_subTen.addEventListener(TouchEvent.TOUCH_TAP, this.onSubTen, this);
            this.setCnt(1);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.btn_add.removeEventListener(TouchEvent.TOUCH_TAP, this.onAdd, this);
            this.btn_addTen.removeEventListener(TouchEvent.TOUCH_TAP, this.onAddTen, this);
            this.btn_sub.removeEventListener(TouchEvent.TOUCH_TAP, this.onSub, this);
            this.btn_subTen.removeEventListener(TouchEvent.TOUCH_TAP, this.onSubTen, this);
        }

        private onSub(): void {
            let cnt = this.getCnt();
            if (cnt <= 1) {
                return;
            }
            this.setCntAndNt(--cnt);
        }

        private onSubTen(): void {
            let cnt = this.getCnt();
            if (cnt <= 1) {
                return;
            }
            this.setCntAndNt(Math.max(cnt - 10, 1));
        }

        private onAdd(): void {
            let cnt = this.getCnt();
            if (cnt >= this._maxCnt) {
                return;
            }
            this.setCntAndNt(++cnt);
        }

        private onAddTen(): void {
            let cnt = this.getCnt();
            if (cnt >= this._maxCnt) {
                return;
            }
            this.setCntAndNt(Math.min(cnt + 10, this._maxCnt));
        }

        /**
         * 设置购买次数，并抛出事件 ActivityEvent.ON_BTN_BUY_CNT_POST
         * @param cnt
         * @private
         */
        private setCntAndNt(cnt: number): void {
            this.setCnt(cnt);
            facade.sendNt(ActivityEvent.ON_BTN_BUY_CNT_POST, cnt);
        }

        /**
         * 购买数量
         * @param cnt 默认1
         */
        private setCnt(cnt: number = 1): void {
            this.lb_cnt.text = cnt + '';
        }

        /**
         * 设置最大购买数量
         * @param cnt 默认1
         */
        public setMaxCnt(cnt: number = 1): void {
            this._maxCnt = cnt;
        }

        /**
         * 获取购买数量
         */
        public getCnt(): number {
            return Number(this.lb_cnt.text) || 1;
        }

        /**
         * 设置消耗道具icon和数量
         * @param index
         * @param cnt
         * @param color 数量色号，默认 BlackColor.GREEN
         */
        public setCostCnt(index: number, cnt: number, color = BlackColor.GREEN): void {
            let cfg = GameConfig.getPropConfigById(index);
            this.img_cost.source = cfg && cfg.icon || '';
            let str = cnt + '';
            if (color) {
                str = TextUtil.addColor(cnt + '', color);
            }
            this.lb_cnt.textFlow = TextUtil.parseHtml(str);
        }
    }
}