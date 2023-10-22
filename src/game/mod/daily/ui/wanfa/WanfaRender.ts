namespace game.mod.daily {

    import TouchEvent = egret.TouchEvent;
    import DailyWanfaConfig = game.config.DailyWanfaConfig;
    import facade = base.facade;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import ParamConfig = game.config.ParamConfig;
    import TimeMgr = base.TimeMgr;

    export class WanfaRender extends BaseListenerRenderer {

        public img_icon: eui.Image;
        public lab_desc: eui.Label;
        public lab_state: eui.Label;
        public lab_open_tip: eui.Label;
        public btn_go: game.mod.Btn;

        public data: DailyWanfaConfig;
        private _proxy: DailyProxy;
        private _bossProxy: IBossProxy;
        private _competeProxy: ICompeteProxy;
        private _consecrateProxy: IConsecrateProxy;
        private _target: number;//目标值
        private _curVal: number;//当前次数

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
            this._proxy = facade.retMod(ModName.Daily).retProxy(ProxyType.Daily);
            this._bossProxy = facade.retMod(ModName.Boss).retProxy(ProxyType.Boss);
            this._competeProxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            this._consecrateProxy = facade.retMod(ModName.Consecrate).retProxy(ProxyType.Consecrate);
        }

        private onClickGo() {
            if (!this.data.jump) {
                return;
            }
            ViewMgr.getIns().showViewByID(this.data.jump);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.img_icon.source = "wanfa_icon_" + this.data.index;//图标

            let openIdx = this.data.open_id;
            let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, openIdx);
            let descStr = cfg.name;
            let target = this.data.target;
            this._target = target;
            if (target) {
                let curVal = this.getCurVal(openIdx);
                this._curVal = curVal;
                descStr += "(" + curVal + "/" + target + ")";//(0/1)
            } else {
                descStr += "(" + target + ")";//(0)
            }
            this.lab_desc.text = descStr;//描述文本+进度显示

            let isOpen = ViewMgr.getIns().checkViewOpen(openIdx);
            this.lab_open_tip.text = isOpen ? "" : ViewMgr.getIns().getOpenFuncShow(openIdx, 4);

            this.btn_go.visible = isOpen;
            if (this.btn_go.visible) {
                let hint = HintMgr.getHintByOpenIdx(openIdx);
                this.btn_go.redPoint.visible = hint;
            }

            this.updateState();
        }

        /**获取状态文本*/
        private getStateStr(status: number): string {
            switch (status) {
                case WanfaStatus.None:
                    return "闲置";
                case WanfaStatus.Challenge:
                    return "可挑战";
                case WanfaStatus.Gongfeng:
                    return "可供奉";
            }
            return "";
        }

        /**获取当前进度*/
        private getCurVal(openIdx: number): number {
            //todo
            switch (openIdx) {
                case OpenIdx.Boss:
                    return this._bossProxy.getCurVal();
                case OpenIdx.Youli:
                    return this._competeProxy.getCurVal();
                case OpenIdx.Yijie:
                    let cfg: ParamConfig = GameConfig.getParamConfigById("yijie_cost");
                    let index = cfg && cfg.value;
                    return BagUtil.getPropCntByIdx(index);
                case OpenIdx.Doufa:
                    return this._competeProxy.getCurValDoufa();
                case OpenIdx.Consecrate:
                    return this._consecrateProxy.getConsecrateCount();
            }
            return 0;
        }

        /**获取冷却时间*/
        private getNextTime(openIdx: number): number {
            switch (openIdx) {
                case OpenIdx.Boss:
                    return this._bossProxy.bossTime;
                case OpenIdx.Youli:
                    let time = this._competeProxy.nextFightTime;
                    if(time){
                        return time;
                    }
                    break;
                case OpenIdx.Consecrate:
                    return this._consecrateProxy.getEndTime()
            }
            //默认取第二天的0点时间戳
            let curTime = TimeMgr.time.serverTimeSecond;
            return TimeUtil.getNextDayTime(curTime, false, 1);
        }

        /**刷新状态文本显示*/
        public updateState(): void {
            let stateStr = "";
            let nextTime = this.getNextTime(this.data.open_id);
            if (this._target && this.isShowTime) {
                //存在目标值，且当前值为0时
                let leftTime = nextTime - TimeMgr.time.serverTimeSecond;
                if (leftTime == 0) {
                    facade.sendNt(WanfaEvent.UPDATE_WANFAN_LIST);//倒计时结束时候，刷新列表
                }
                stateStr = TextUtil.addColor(TimeUtil.formatSecond(leftTime, "d天H时", true), UIColor.WHITE);
            } else {
                stateStr = TextUtil.addColor(this.getStateStr(this.data.status), WhiteColor.GREEN);
            }
            this.lab_state.textFlow = TextUtil.parseHtml(stateStr)//状态文本
        }

        private get isShowTime(): boolean {
            if (this.data.open_id == OpenIdx.Consecrate) {
                let nextTime = this.getNextTime(this.data.open_id);
                if (this._curVal && nextTime > 0) {
                    return true;
                }
            } else {
                if (!this._curVal) {
                    return true;
                }
            }
            return false;
        }
    }
}