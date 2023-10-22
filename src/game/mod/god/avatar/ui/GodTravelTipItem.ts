namespace game.mod.god {


    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class GodTravelTipItem extends BaseRenderer implements UpdateItem {

        private _proxy: GodProxy;

        private img_icon: eui.Image;
        public btn_get: Btn;
        public grp_time: eui.Group;
        public lab_time: eui.Label;
        public btn_add: Btn;
        public name_item: AvatarNameItem;

        public data: TiandiShifangYouliConfig;
        private end_time: number;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onClickGet, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.img_icon, this.onClickAdd, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info = this._proxy.getYouli(this.data.map_type);
            if (info) {
                this.end_time = info.endtime;
                this.btn_add.visible = false;
                this.img_icon.source = `god_icon_head_${info.index}`;
                if (this.end_time <= TimeMgr.time.serverTimeSecond) {
                    this.currentState = "reward";
                    TimeMgr.removeUpdateItem(this);
                } else {
                    this.currentState = "default";
                    this.grp_time.visible = true;
                    this.onUpdateTime();
                    TimeMgr.addUpdateItem(this, 1000);
                }
            } else {
                this.currentState = "default";
                this.grp_time.visible = false;
                let data = this._proxy.getSaveChoose(this.data.map_type);
                if (data) {
                    this.btn_add.visible = false;
                    this.img_icon.visible = true;
                    this.img_icon.source = `god_icon_head_${data.index}`;
                } else {
                    this.btn_add.visible = true;
                    this.img_icon.visible = false;
                }
            }
            this.name_item.updateShow(this.data.name);
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
            this.lab_time.text = TimeUtil.formatSecond(leftTime, leftTime > Second.Day ? "d天HH时" : "HH时mm分");
        }

        private onClickGet(): void {
            this._proxy.c2s_tiandi_youli_get_rewards(this.data.map_type);
        }

        private onClickAdd(): void {
            if (this.end_time > 0) {
                return;
            }
            this._proxy.model.map_type = this.data.map_type;
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodTravelChoose);
        }
    }
}