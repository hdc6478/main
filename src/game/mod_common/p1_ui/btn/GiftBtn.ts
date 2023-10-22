namespace game.mod {

    import Handler = base.Handler;
    import Event = egret.Event;
    import TouchEvent = egret.TouchEvent;

    export class GiftBtn extends Btn {
        private _eftId_sel: number;//特效
        private _eftId_sel2: number;//特效
        private _productId: number;//商品ID
        private _clickHandler: Handler;

        constructor() {
            super();
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onClick(): void {
            if(this._clickHandler){
                this._clickHandler.exec();
                return;
            }
            if(!this._productId){
                return;
            }
            ViewMgr.getIns().showGift(this._productId);
        }

        private removeEftSel(): void {
            if (this._eftId_sel) {
                this.clearEffect(this._eftId_sel);
                this._eftId_sel = null;
            }
            if (this._eftId_sel2) {
                this.clearEffect(this._eftId_sel2);
                this._eftId_sel2 = null;
            }
        }

        //传入商品ID，默认显示特效
        public updateGift(productId: number, showEffect: boolean = true, clickHandler?: Handler): void {
            this._productId = productId;
            this._clickHandler = clickHandler;
            if(productId){
                let isShow = PayUtil.checkShowGift(productId);
                this.visible = isShow;
            }
            if(!this.visible || !showEffect){
                return;
            }
            this.iconDisplay.visible = false;
            this.removeEftSel();
            let self = this;
            this._eftId_sel = this.setEffect(UIEftSrc.Fuben_1, this.group_eft, 0, 0, 0, Handler.alloc(this, () => {
                self.iconDisplay.visible = true;
                self._eftId_sel2 = self.setEffect(UIEftSrc.Fuben_5, self.group_eft);
            }), 1);
        }

    }
}
