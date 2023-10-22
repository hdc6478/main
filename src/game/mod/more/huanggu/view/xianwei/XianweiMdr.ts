namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import UpdateItem = base.UpdateItem;
    import TouchEvent = egret.TouchEvent;
    // import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import xianwei_member_data = msg.xianwei_member_data;

    export class XianweiMdr extends MdrBase implements UpdateItem {
        private _view: XianweiView = this.mark("_view", XianweiView);
        private _proxy: XianweiProxy;
        private _listData: eui.ArrayCollection = new eui.ArrayCollection();

        // private _endTImes: number[] = [];
        private _endTime: number;
        private _delayIdx: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianwei);

            this._view.list.itemRenderer = XianweiTipsItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
            addEventListener(this._view.btn_tips, TouchEvent.TOUCH_TAP, this.onClickTips);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);

            let keys: string[] = Array.from(this._proxy.cfgArr.keys());
            for (let key of keys) {
                addEventListener(this._view[`item${key}`], TouchEvent.TOUCH_TAP, this.onClickItem);
            }

            this.onNt(MoreEvent.ON_UPDATE_XIANWEI_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_XIANWEI_CD_INFO, this.onUpdateFigth, this);
        }

        protected onShow(): void {
            this._proxy.c2s_xianwei_root_show();
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            // this.onUpdateView();
            this.update(null);
        }

        private onUpdateReward(): void {
            if (this._proxy.reward_data) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianweiProp);
            }
        }

        private onUpdateView(): void {
            this.onUpdateReward();

            // this._endTImes.length = 0;
            this._endTime = 0;

            let keys: string[] = Array.from(this._proxy.cfgArr.keys());
            for (let i = 0; i < keys.length; i++) {
                let key: string = keys[i];
                if (i < 3) {
                    let item: XianweiTopItem = this._view[`item${key}`];
                    item.setData(key);
                    let info: xianwei_member_data = this._proxy.list.get(key);
                    if (!info || !info.end_time) {
                        continue;
                    }
                    if (info.end_time <= TimeMgr.time.serverTimeSecond) {
                        this.onResult();
                        DEBUG && console.error("若重复发送协议即bug");
                        return;
                    }
                    if (!this._endTime) {
                        this._endTime = info.end_time;
                    } else {
                        this._endTime = info.end_time < this._endTime ? info.end_time : this._endTime;
                    }
                    continue;
                }
                let item: XianweiCommonItem = this._view[`item${key}`];
                item.setData(key);
            }

            this._view.infoItem.visible = this._proxy.my_place && !!this._proxy.my_place.stage;
            if (this._view.infoItem.visible) {
                this._view.infoItem.setData(this._proxy.my_place);
                let leftTime: number = TimeMgr.time.serverTimeSecond - this._proxy.my_place.start_time;
                this._view.infoItem.updateTime(leftTime);
            }

            this._listData.replaceAll(this._proxy.log_list);

            this.onUpdateFigth();
        }

        /**挑战cd */
        private onUpdateFigth(): void {
            this._view.cdItem.visible = !!this._proxy.attack_time;
            if (this._view.cdItem.visible) {
                let left: number = this._proxy.attack_time - TimeMgr.time.serverTimeSecond;
                this._view.cdItem.updateTime(left);
            }
        }

        private onClickExplain(): void {
            // TODO:提示
            ViewMgr.getIns().showRuleTips("待添加说明");
        }

        private onClickTips(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianweiTips);
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianweiRank);
        }

        private onClickItem(e: TouchEvent): void {
            let key: string = e.currentTarget.data;
            // console.error(key);
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianweiList, key);
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
            this.onClearDelay();
        }

        update(time: base.Time): void {
            let serverTime: number = TimeMgr.time.serverTimeSecond;
            let is_open: boolean = this._proxy.is_open;
            let suffix: string = is_open ? "后重置" : "后开启";
            let endTIme: number = is_open ? this._proxy.open_time : this._proxy.end_time;
            this._view.timeItem.updateLeftTime(endTIme - serverTime, suffix);

            // if (this._endTImes.length) {
            //     for (let time of this._endTImes) {
            //         if (serverTime >= time) {
            //             this.onResult();
            //             break;
            //         }
            //     }
            // }
            if (this._endTime > 0 && serverTime >= this._endTime) {
                this.onResult();
            }

            if (this._view.cdItem.visible) {
                let left: number = this._proxy.attack_time - serverTime;
                if (left <= 0) {
                    this.onResult();
                } else {
                    this._view.cdItem.updateTime(left);
                }
            }

            if (this._view.infoItem.visible) {
                let info = this._proxy.my_place;
                if (!info) {
                    this._view.infoItem.visible = false;
                    return;
                }
                if (serverTime >= info.end_time) {//时间结束 退位
                    this.onResult();
                    return;
                }
                let leftTime: number = serverTime - this._proxy.my_place.start_time;
                this._view.infoItem.updateTime(leftTime);
            }
        }

        private onResult(): void {
            this.onClearDelay();
            this._delayIdx = base.delayCall(base.Handler.alloc(this, () => {
                this._proxy.c2s_xianwei_root_show();
                this._delayIdx = 0;
            }), 200);
        }

        private onClearDelay(): void {
            if (this._delayIdx) {
                base.clearDelay(this._delayIdx);
                this._delayIdx = 0;
            }
        }
    }
}