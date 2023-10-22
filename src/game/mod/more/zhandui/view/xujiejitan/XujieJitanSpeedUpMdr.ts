namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class XujieJitanSpeedUpMdr extends MdrBase implements UpdateItem {
        private _view: XujieJitanSpeedUpView = this.mark("_view", XujieJitanSpeedUpView);
        private _proxy: XujieJitanProxy;

        private _leftTimeSingle: number;
        private _leftTimeTotal: number;
        private _prop: PropData;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieJitan);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.grp_tips, egret.TouchEvent.TOUCH_TAP, this.onClickSpeedUp, this);
            addEventListener(this._view.grp_all, egret.TouchEvent.TOUCH_TAP, this.onClickAllSpeedUp, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_GONGFENG_INFO, this.updateView, this);
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
            let sacrificeInfo = this._proxy.getSacrificeInfo();
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
                ViewMgr.getIns().showGainWaysTips(PropIndex.XujieJitanJiasu);
                return;
            }
            let time: number = Math.min(this._leftTimeSingle, this._proxy.total_speed_time);
            let str: string = `是否消耗${TextUtil.addColor(TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分"), Color.GREEN)}快速献祭`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.sendSpeedUp, [1]));
        }

        private onClickAllSpeedUp(): void {
            if (!this._proxy.total_speed_time) {
                ViewMgr.getIns().showGainWaysTips(PropIndex.XujieJitanJiasu);
                return;
            }
            let time: number = Math.min(this._leftTimeTotal, this._proxy.total_speed_time);
            let str: string = `是否消耗${TextUtil.addColor(TimeUtil.formatSecond(time, time > Second.Day ? "d天HH时" : "HH时mm分"), Color.GREEN)}快速献祭`;
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.sendSpeedUp, [2]));
        }

        //1单个加速，2全部加速
        private sendSpeedUp(oper = 1): void {
            this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper202, null, null, null, oper);
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