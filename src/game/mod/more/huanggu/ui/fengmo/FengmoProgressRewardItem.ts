namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import FengmoTiaozhanRewardConfig = game.config.FengmoTiaozhanRewardConfig;
    import LanDef = game.localization.LanDef;

    export class FengmoProgressRewardItem extends BaseRenderer {

        public btn_box: Btn;
        public lab_value: eui.Label;
        public redPoint: eui.Image;
        public img_got: eui.Image;

        public data: FengmoTiaozhanRewardConfig;
        /**0不可领取 1可领取 2已领取 */
        private _state: number;
        private _proxy: FengmoProxy;

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Fengmo);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg: FengmoTiaozhanRewardConfig = this.data;
            this.currentState = `${this.itemIndex + 1}`;
            this.lab_value.text = `${cfg.tiaozhan_times}`;

            let indexs: number[] = this._proxy.times_indexs;
            if (indexs.indexOf(cfg.index) > -1) {
                this._state = 2;
            } else {
                this._state = +(this._proxy.total_times >= cfg.tiaozhan_times);
            }
            this.img_got.visible = this._state == 2;
            this.redPoint.visible = this._state == 1;
        }

        private onClickBtn(): void {
            if (!this._state) {
                let cfg: FengmoTiaozhanRewardConfig = this.data;
                let tips = StringUtil.substitute(getLanById(LanDef.xianzong_tips15), [cfg.tiaozhan_times]);
                let countStr: string = TextUtil.addEnoughColor(this._proxy.total_times, cfg.tiaozhan_times);
                ViewMgr.getIns().showBoxReward(tips + countStr, cfg.tiaozhan_awards);
                return;
            }
            if (this._state != 1) {
                return;
            }
            this._proxy.c2s_guild_fengmo_get_reward(2, this.data.index);
        }
    }
}