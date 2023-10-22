namespace game.mod.consecrate {


    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import consecrate_infos = msg.consecrate_infos;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;

    export class ConsecrateSpeedUpMdr extends MdrBase implements UpdateItem {
        private _view: ConsecrateSpeedUpView = this.mark("_view", ConsecrateSpeedUpView);
        private _proxy: ConsecrateProxy;
        private _doing: consecrate_infos;
        private _prop: PropData;
        private _allTime: number;

        private _leftTime: number;
        private _leftTime2: number;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Consecrate);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.grp_tips, TouchEvent.TOUCH_TAP, this.onClickSpeedUp, this);
            addEventListener(this._view.grp_all, TouchEvent.TOUCH_TAP, this.onClickAllSpeedUp, this);

            this.onNt(ConsecrateEvent.ON_UPDATE_CONSECRATE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            this.onUpdateView();
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg("gongfeng_bg3"));
            this.showGuide();
            this.onUpdateTime();
        }

        private onUpdateView(): void {
            this._doing = this._proxy.getDoingInfo();
            this._prop = PropData.create(this._doing.prop_id);
            this._allTime = this._proxy.getListSpeedUpTime();

            this._view.icon.setData(this._prop);
            this._view.lab_name.textFlow = this._view.icon.getPropName();

            let time: number = this._proxy.model.storage_time;
            let str: string = TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分");
            this._view.lab_havetime.text = `${str}`;

            console.error("this._doing.begin_time", this._doing.begin_time)
        }

        update(time: base.Time): void {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let cfg: PropConfig = this._prop.cfg;
            let seconds: number = cfg.param1[0][0];
            let endTime: number = this._doing.begin_time + seconds;
            this._leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (this._leftTime < 0) {
                this._leftTime = 0;
            }

            this._view.lab_time.text = TimeUtil.formatSecond(this._leftTime, this._leftTime > Second.Day ? "d天HH时" : "HH时mm分");

            let allTime: number = this._doing.begin_time + this._allTime;
            this._leftTime2 = allTime - TimeMgr.time.serverTimeSecond;
            if (this._leftTime2 < 0) {
                this._leftTime2 = 0;
            }

            this._view.lab_alltime.text = TimeUtil.formatSecond(this._leftTime2, this._leftTime2 > Second.Day ? "d天HH时" : "HH时mm分");
        }

        private onClickSpeedUp(): void {
            if (!this._proxy.model.storage_time) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.Gongfeng);
                return;
            }
            let time: number = Math.min(this._leftTime, this._proxy.model.storage_time);
            let str: string = `是否消耗${TextUtil.addColor(TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分"), Color.GREEN)}快速供奉`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.onSpeedUp));
        }

        private onSpeedUp(): void {
            this._proxy.c2s_consecrate_speedup(1, this._doing.pos);
            this.hide();
        }

        private onClickAllSpeedUp(notTips?: boolean): void {
            if (!this._proxy.model.storage_time) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.Gongfeng);
                return;
            }
            if(notTips){
                this.onAllSpeedUp();
                return;
            }
            let time: number = Math.min(this._leftTime2, this._proxy.model.storage_time);
            let str: string = `是否消耗${TextUtil.addColor(TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分"), Color.GREEN)}快速供奉`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.onAllSpeedUp));
        }

        private onAllSpeedUp(): void {
            this._proxy.c2s_consecrate_speedup(2);
            this.hide();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            GuideMgr.getIns().clear(GuideKey.ConsecrateSpeedAll);//清除指引
            super.onHide();
        }

        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.ConsecrateSpeedAll, this._view.grp_all, Handler.alloc(this, this.onClickAllSpeedUp, [true]));//指引
        }
    }
}