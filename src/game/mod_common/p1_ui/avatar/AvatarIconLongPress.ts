namespace game.mod {

    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Handler = base.Handler;
    import HuashenConfig = game.config.HuashenConfig;

    /**
     * 具有长按弹出tips效果的外显组件
     */
    export class AvatarIconLongPress extends AvatarIcon {
        private isBegin = false;
        private delayId = 0;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_BEGIN, this, this.onBegin, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_CANCEL, this, this.onCancel, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this, this.onCancel, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_END, this, this.onCancel, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.onCancel();
        }

        protected onBegin(): void {
            if (this.isBegin) {
                return;
            }
            this.isBegin = true;
            this.delayId = delayCall(Handler.alloc(this, this.callOpenTips), 1000);
        }

        //长按打开tips
        protected callOpenTips(): void {
            if (!this.data || !this.data.cfg) {
                return;
            }
            let index = this.data.cfg.index;
            let head = PropData.getPropParse(index);
            if (head && head == ConfigHead.Huashen) {
                //todo
                let huaShenCfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, index);
                if (huaShenCfg && huaShenCfg.material) {
                    let cost = huaShenCfg.material[0];
                    ViewMgr.getIns().showPropTips(cost[0]);
                }
                return;
            }
            ViewMgr.getIns().showPropTips(this.data.cfg.index);
            this.onCancel();
        }

        protected onCancel(): void {
            this.isBegin = false;
            this.delayId && clearDelay(this.delayId);
        }
    }
}