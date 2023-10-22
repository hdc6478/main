namespace game.mod.god {


    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class GodTravelItem extends BaseRenderer implements UpdateItem {

        private _proxy: GodProxy;

        public btn_get: Btn;
        public lab_time: eui.Label;
        public btn_reward: Btn;
        public btn_add: Btn;
        public name_item: AvatarNameItem;
        public img_icon: eui.Image;

        public data: TiandiShifangYouliConfig;
        private end_time: number;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onClickGet, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            let cfg = this.data;
            let info = this._proxy.getYouli(cfg.map_type);

            this.name_item.updateShow(cfg.name);
            if (!info) {
                this.currentState = "default";
                return;
            }
            this.end_time = info.endtime;
            if (info.endtime > TimeMgr.time.serverTimeSecond) {
                this.currentState = "ing";
                this.onUpdateTime();
                TimeMgr.addUpdateItem(this, 1000);
            } else {
                this.currentState = "reward";
            }
            this.img_icon.source = `god_icon_head_${info.index}`;
        }

        update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let leftTime = this.end_time - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                leftTime = 0;
                this.currentState = "reward";
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this.lab_time.text = "游历中：" + TimeUtil.formatSecond(leftTime, leftTime > Second.Day ? "d天HH时" : "HH时mm分");
        }

        private onClickGet(): void {
            this._proxy.c2s_tiandi_youli_get_rewards(this.data.map_type);
        }

        private onClickAdd(): void {
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodTravelTip);
        }

        private onClickReward(): void {
            ViewMgr.getIns().showBoxReward("", this.data.rewards);
        }

    }
}