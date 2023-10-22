namespace game.mod {

    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;

    /**
     * 具有长按弹出tips效果的外显组件
     */
    export class AvatarItemLongPress extends AvatarItem {
        private isBegin = false;
        private delayId = 0;

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_BEGIN, this, this.onBegin, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_CANCEL, this, this.onCancel, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onCancel, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_END, this, this.onCancel, this);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.onCancel();
        }

        private onBegin(): void {
            if (this.isBegin) {
                return;
            }
            this.isBegin = true;
            this.delayId = delayCall(Handler.alloc(this, this.callOpenTips), 1000);
        }

        private callOpenTips(): void {
            if (!this.data || !this.data.cfg) {
                return;
            }
            ViewMgr.getIns().showPropTips(this.data.cfg.index);
            this.onCancel();
        }

        private onCancel(): void {
            this.isBegin = false;
            this.delayId && clearDelay(this.delayId);
        }
    }

}