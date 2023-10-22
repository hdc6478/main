namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class WonderfulActMdr1 extends EffectMdrBase implements UpdateItem {
        private _view: WonderfulActView1 = this.mark("_view", WonderfulActView1);
        private _proxy: WonderfulActProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn_do.setImage('common_get');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_XIANNV_GIFT, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
            this.addEftByParentScale(this._view.btn_do.group_eft);
        }

        private updateView(): void {
            let cfg = GameConfig.getParamConfigById('xiannvsongli_jiangli');
            this._listData.replaceAll(cfg.value);

            let timeList: { h: number, m: number }[] = this._proxy.getXiannvTimeObjList();
            let str: string[] = [];
            for (let i = 0; i < timeList.length; i += 2) {
                let startObj = timeList[i];
                let endObj = timeList[i + 1];
                let h = this.getFormatTimeStr(startObj.h);
                let m = this.getFormatTimeStr(startObj.m);
                let h1 = this.getFormatTimeStr(endObj.h);
                let m1 = this.getFormatTimeStr(endObj.m);
                str.push(`${h}:${m}-${h1}:${m1}`);
            }
            this._view.lb_time.text = str.join('、');
            this.onUpdateView();
        }

        private getFormatTimeStr(time: number): string {
            return time >= 10 ? time + '' : '0' + time;
        }

        private onUpdateView(): void {
            let canGet = this._proxy.canGetXiannvReward();
            this._view.btn_do.visible = canGet;
            canGet && this._view.btn_do.setHint(canGet);
            this._view.gr_time.visible = !canGet;

            if (!canGet) {
                this._endTime = this._proxy.getXiannvNextTimeSec();
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            } else {
                TimeMgr.removeUpdateItem(this);
            }
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                this.onUpdateView();
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime, '后可领取');
        }

        private onClick(): void {
            if (this._proxy.canGetXiannvReward()) {
                this._proxy.c2s_xiannv_gift_get_rewards();
            }
        }
    }
}