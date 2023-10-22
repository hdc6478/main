namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import GameNT = base.GameNT;
    import guild_pk_base = msg.guild_pk_base;

    export class CrossUnionMdr extends MdrBase implements base.UpdateItem {
        private _view: CrossUnionView = this.mark("_view", CrossUnionView);
        private _proxy: CrossUnionProxy;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();
        private readonly _listLen: number = 12;
        private _endTime: number;
        private _openState: CrossUnionOpenState;
        private _timeTips: string;

        private _enemy: guild_pk_base;

        //滑动加载参数
        private _delayIdx: number = 0;
        private _start: number;
        private _end: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list_item.itemRenderer = CrossUnionPlayerItem;
            this._view.list_item.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.item_1, TouchEvent.TOUCH_TAP, this.onClickTeam);
            addEventListener(this._view.item_2, TouchEvent.TOUCH_TAP, this.onClickTeam);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_formation, TouchEvent.TOUCH_TAP, this.onClickFormat);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
            addEventListener(this._view.btn_tips, TouchEvent.TOUCH_TAP, this.onClickZhanbao);

            addEventListener(this._view.scroller, Event.CHANGE, this.onUpdateChange);

            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_LIST_INFO, this.onUpdateList, this);
            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_LIST_RESET_INFO, this.onUpdateList, this);
            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_OVER_VIEW, this.onChangeView, this);
        }

        protected onShow(): void {
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            this.onUpdateTime();

            this.select = CrossUnionType.Own;
            // this.onUpdateView();
        }

        private onChangeView(): void {
            let openView: string = this._proxy.openView;
            if (openView == MoreViewType.CrossUnion) {
                return;
            }
            ViewMgr.getIns().showView(ModName.More, openView, null, false);
        }

        private onUpdateView(): void {
            this._view.item_1.setData(this._proxy.getTeamInfo(CrossUnionType.Own));
            this._enemy = this._proxy.getTeamInfo(CrossUnionType.Target)
            this._view.item_2.setData(this._enemy);

            this._view.btn.label = this._openState == CrossUnionOpenState.Open ? "进入战斗" : "调整阵型";

            this.onUpdateList();
        }

        private onUpdateList(n?: GameNT): void {
            let type: number = n && n.body;
            if (type && type != this._proxy.camp) {
                return;
            }
            let event: string = n && n.type;
            if (event == MoreEvent.ON_UPDATE_CROSS_UNION_LIST_RESET_INFO) {
                this._view.list_item.scrollV = 0;
            }
            let list: msg.teammate[] = this._proxy.getList(this._proxy.camp);
            if (list.length < 12) {
                list.length = 12;
            }
            this._listData.replaceAll(list);
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
                // this.onUpdateView();
                this._view.btn.label = this._openState == CrossUnionOpenState.Open ? "进入战斗" : "调整阵型";
            }
            // this.updateTime();
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, this._timeTips, getLanById(LanDef.relic33));
        }

        private onClickBtn(): void {
            //test
            // if (DEBUG) {
            //     this._proxy.c2s_guild_pk_oper(6);
            //     return;
            // }
            if (this._openState == CrossUnionOpenState.Open) {
                if (!this._proxy.ret) {
                    this._proxy.c2s_guild_pk_oper(6);
                }
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionTeam);
        }

        private onClickTeam(e: TouchEvent): void {
            if (e.currentTarget == this._view.item_1) {
                this.select = CrossUnionType.Own;
            } else {
                if (!this._enemy) {
                    PromptBox.getIns().show("尚未匹配仙宗");
                    return;
                }
                this.select = CrossUnionType.Target;
            }
        }

        private onClickReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionReward);
        }

        private onClickFormat(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionFormat);
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.kuafuxianzong_tips9));
        }

        private onClickZhanbao(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.CrossUnionZhanbao);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
            this._proxy.camp = this._start = this._end = 0;
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

        private set select(v: number) {
            if (this._proxy.camp == v) {
                return;
            }
            this._proxy.camp = v;
            this._proxy.c2s_guild_pk_team_show(v);

            this._view.item_1.isSelect = v == CrossUnionType.Own;
            this._view.item_2.isSelect = v == CrossUnionType.Target;
        }

        /**-----------------滑动加载-------------------- */
        private onUpdateChange(e: Event): void {
            let scrollV: number = this._view.scroller.viewport.scrollV;
            let itemHeight = 260 + 6;
            //滑动容器高度
            let height = 744;

            //获取列表高度
            let contentHeight: number = this._view.scroller.viewport.contentHeight;

            if (scrollV < 0) {
                this.onRequest(1, 4);
                return;
            }

            if (scrollV >= contentHeight - height) {
                let len = this._listData.source.length;
                this.onRequest(len + 1, len + 5);
                return;
            }

            let showHeight = scrollV + height;

            /**后端1开始判断 需要加1 */
            let start: number = Math.floor(scrollV / itemHeight) + 1;
            let end: number = Math.ceil(showHeight / itemHeight);
            this.onRequest(start, end);
        }

        private onRequest(start: number, end: number): void {
            //不做重复更新
            if (this._start == start || this._end == end) {
                return;
            }
            this._start = start;
            this._end = end;

            if (this._delayIdx) {
                base.clearDelay(this._delayIdx);
            }
            this._delayIdx = base.delayCall(base.Handler.alloc(this, () => {
                // console.error(start, end);
                this._proxy.c2s_guild_pk_team_slide(this._proxy.camp, start, end);
            }), 500);
        }
    }
}