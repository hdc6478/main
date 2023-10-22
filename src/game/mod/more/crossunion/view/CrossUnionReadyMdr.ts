namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;

    export class CrossUnionReadyMdr extends MdrBase implements base.UpdateItem {
        private _view: CrossUnionReadyView = this.mark("_view", CrossUnionReadyView);
        private _proxy: CrossUnionProxy;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();
        private _endTime: number;
        private _openState: CrossUnionOpenState;
        private _timeTips: string;

        /**1报名 2领取 3战斗 */
        private _state: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);

            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_READY_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_OVER_VIEW, this.onChangeView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_pk_root()
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            this.onUpdateTime();
            this.onUpdateView();
        }

        private onChangeView(): void {
            let openView: string = this._proxy.openView;
            if (openView == MoreViewType.CrossUnionReady) {
                return;
            }
            ViewMgr.getIns().showView(ModName.More, openView, null, false);
        }

        private onUpdateView(): void {
            if (this._proxy.status == 1) {
                this._listData.replaceAll(this._proxy.getRewards(this._proxy.ret));
                this.setBtn(true, "领取奖励");
                this._state = 2;
                return;
            }

            if (this._openState != CrossUnionOpenState.Open) {
                this._listData.replaceAll(this._proxy.guild_pk_show);
                this.setBtn(true, "报名");
                this._state = 1;
                return;
            }

            if (this._proxy.ret) {
                this._listData.replaceAll(this._proxy.getRewards(this._proxy.ret));
                if (this._proxy.is_join) {
                    if (this._proxy.status == 1) {
                        this.setBtn(true, "领取奖励");
                        this._state = 2;
                    } else {
                        this.setBtn(false, "lvseyilingqu");
                    }
                } else {
                    this.setBtn(false, "hongseyijieshu");
                }
                return;
            }

            this._listData.replaceAll(this._proxy.guild_pk_show);
            if (this._proxy.is_guild_join === false) {
                this.setBtn(false, "hongseyijieshu");
                return;
            }
            this.setBtn(true, "进入战斗");
            this._state = 3;
        }

        private onUpdateTime(): void {
            this._openState = this._proxy.openState;
            if (this._openState == CrossUnionOpenState.Ready) {
                this._endTime = this._proxy.matchTime;
                this._timeTips = "后开始匹配";
            } else if (this._openState == CrossUnionOpenState.Match) {
                this._endTime = this._proxy.openTime;
                this._timeTips = "后开始战斗";
            } else {
                this._endTime = 0;
                TimeMgr.removeUpdateItem(this);
            }
            // this.updateTime();
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, this._timeTips, getLanById(LanDef.relic33));
        }

        private onClickBtn(): void {
            if (!this._state) {
                return;
            }
            switch (this._state) {
                case 1:
                    // if (this._openState == CrossUnionOpenState.Match && !this._proxy.is_guild_join) {
                    //     PromptBox.getIns().show("报名阶段已结束");
                    //     return;
                    // }
                    this._proxy.c2s_guild_pk_oper(1);
                    break;
                case 2:
                    this._proxy.c2s_guild_pk_oper(4);
                    break;
                case 3:
                    this._proxy.c2s_guild_pk_oper(6);
                    break;
            }
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.onUpdateTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, this._timeTips, getLanById(LanDef.relic33));
        }

        private setBtn(v: boolean, str: string) {
            this._view.btn.visible = v;
            if (this._view.btn.visible) {
                this._view.btn.label = str;
            }
            this._view.img_end.visible = !v;
            if (this._view.img_end.visible) {
                this._view.img_end.source = str;
            }
        }
    }
}