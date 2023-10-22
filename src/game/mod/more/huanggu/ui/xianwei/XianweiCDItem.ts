namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;

    export class XianweiCDItem extends BaseRenderer {

        private lab_time: eui.Label;
        private btn: Btn;

        private _proxy: XianweiProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClickBtn, this);
        }

        public updateTime(leftTime: number): void {
            if (leftTime <= 0) {
                this.lab_time.text = "";
                return;
            }
            this.lab_time.text = TimeUtil.formatSecond(leftTime, 'd天H时', true);
        }

        private onClickBtn(): void {
            if (!BagUtil.checkPropCnt(this._proxy.xianwei_buy_time[0], this._proxy.xianwei_buy_time[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_xianwei_buy_time();
        }
    }
}