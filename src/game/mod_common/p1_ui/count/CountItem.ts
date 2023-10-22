namespace game.mod {


    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;

    export class CountItem extends BaseListenerRenderer {

        public lb_cnt: eui.Label;
        public btn_add: Btn;
        public btn_addTen: Btn;
        public btn_subtract: Btn;
        public btn_subtractTen: Btn;

        private _leftCnt: number;
        /**回调 用于更新消耗之类的 */
        private _handler: Handler;

        constructor() {
            super();
            this.skinName = "skins.common.CountItemSkin";
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onAdd, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_addTen, this.onAddTen, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_subtract, this.onSubtract, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_subtractTen, this.onSubtractTen, this);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this._leftCnt = 0;
            if (this._handler) {
                this._handler.dispose();
                this._handler = null;
            }
        }

        public setData(_leftCnt: number, handler?: Handler): void {
            this._leftCnt = _leftCnt;
            if (handler) {
                this._handler = handler;
            }
            this.setCnt(_leftCnt);
        }

        private setCnt(cnt: number): void {
            this.lb_cnt.text = `${cnt}`;
            if (this._handler) {
                this._handler.exec();
            }
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

        public get getCnt(): number {
            return Number(this.lb_cnt.text) || 1;
        }
    }

}