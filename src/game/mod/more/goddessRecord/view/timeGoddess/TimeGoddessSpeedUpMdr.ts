namespace game.mod.more {


    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class TimeGoddessSpeedUpMdr extends MdrBase implements UpdateItem {
        private _view: TimeGoddessSpeedUpView = this.mark("_view", TimeGoddessSpeedUpView);
        private _proxy: GoddessRecordProxy;

        private _leftTimeSingle: number;
        private _leftTimeTotal: number;
        private _prop: PropData;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.grp_tips, TouchEvent.TOUCH_TAP, this.onClickSpeedUp, this);
            addEventListener(this._view.grp_all, TouchEvent.TOUCH_TAP, this.onClickAllSpeedUp, this);

            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_GONGFENG_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr(getLanById(LanDef.xujiejitan_tips5));
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg("gongfeng_bg3"));//todo
            this.updateView();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        protected onHide(): void {
            super.onHide();
            this._leftTimeSingle = 0;
            this._leftTimeTotal = 0;
            this._prop = null;
            TimeMgr.removeUpdateItem(this);
        }

        private updateView(): void {
            let sacrificeInfo = this._proxy.getGongfengInfo();
            if (!sacrificeInfo) {
                return;
            }
            this._leftTimeSingle = sacrificeInfo.endtime.toNumber() - TimeMgr.time.serverTimeSecond;
            this._leftTimeTotal = this._proxy.getTotalPropTime();

            this._prop = PropData.create(sacrificeInfo.idx);
            this._view.icon.setData(this._prop);
            this._view.lab_name.textFlow = this._view.icon.getPropName();

            let time = this._proxy.total_speed_time;
            let str: string = TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分");
            this._view.lab_havetime.text = `${str}`;
        }

        private onClickSpeedUp(): void {
            if (!this._proxy.total_speed_time) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.NvshenJiasu);
                return;
            }
            let time: number = Math.min(this._leftTimeSingle, this._proxy.total_speed_time);
            let str: string = `是否消耗${TextUtil.addColor(TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分"), Color.GREEN)}快速献祭`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.sendSpeedUp, [TimeGoddessOpType.GongfengSpeedup]));
        }

        private onClickAllSpeedUp(): void {
            if (!this._proxy.total_speed_time) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.NvshenJiasu);
                return;
            }
            let time: number = Math.min(this._leftTimeTotal, this._proxy.total_speed_time);
            let str: string = `是否消耗${TextUtil.addColor(TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分"), Color.GREEN)}快速献祭`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.sendSpeedUp, [TimeGoddessOpType.GongfengSpeedupAll]));
        }

        //单个加速，全部加速
        private sendSpeedUp(type: number): void {
            this._proxy.c2s_chuang_shi_nv_shen_system_click(type);
            this.hide();
        }

        update(time: base.Time) {
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            if (!this._prop) {
                return;
            }
            this._leftTimeSingle--;
            if (this._leftTimeSingle < 0) {
                this._leftTimeSingle = 0;
            }

            this._view.lab_time.text = TimeUtil.formatSecond(this._leftTimeSingle, this._leftTimeSingle > Second.Day ? "d天HH时" : "HH时mm分");

            this._leftTimeTotal--;
            if (this._leftTimeTotal < 0) {
                this._leftTimeTotal = 0;
            }

            this._view.lab_alltime.text = TimeUtil.formatSecond(this._leftTimeTotal, this._leftTimeTotal > Second.Day ? "d天HH时" : "HH时mm分");
        }

    }
}