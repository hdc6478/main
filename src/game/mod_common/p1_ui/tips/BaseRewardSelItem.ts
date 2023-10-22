namespace game.mod {

    import TouchEvent = egret.TouchEvent;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Handler = base.Handler;
    import facade = base.facade;

    export class BaseRewardSelItem extends IconSel {
        private _delayProp: number;
        public data: number[];//道具index，数量

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_BEGIN, this, this.onClickBegin, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_CANCEL, this, this.onClickEnd, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onClickEnd, this);
            this.addEventListenerEx(TouchEvent.TOUCH_END, this, this.onClickEnd, this);
        }

        protected onRemoveFromStage(): void {
            this.clearDelayProp();
            super.onRemoveFromStage();
        }

        private onClickBegin(): void {
            this._delayProp = delayCall(Handler.alloc(this, this.showPropTips), 2000);
        }

        private onClickEnd(): void {
            this.clearDelayProp();
        }

        private clearDelayProp(): void {
            if (this._delayProp) {
                clearDelay(this._delayProp);
            }
        }

        private showPropTips(): void {
            if (!this.data) {
                return;
            }
            this._delayProp = 0;
            // facade.sendNt(BagEvent.ON_BAG_REWARD_SELECT_SHOW);
            //todo
            let propData: PropData = PropData.create(this.data[0], this.data[1]);
            ViewMgr.getIns().showPropTips(propData);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.icon.setData(this.data, IconShowType.NotTips);
        }
    }
}