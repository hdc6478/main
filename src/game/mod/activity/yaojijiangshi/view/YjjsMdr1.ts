namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TotalMainConfig = game.config.TotalMainConfig;
    import GameNT = base.GameNT;
    import task_data = msg.task_data;

    export class YjjsMdr1 extends EffectMdrBase implements UpdateItem {
        private _view: YjjsView1 = this.mark("_view", YjjsView1);
        private _proxy: YjjsProxy;
        private _listDay: eui.ArrayCollection;
        private _listItem: eui.ArrayCollection;
        private _endTime = 0;
        private _curDay = 1;//当前第几天，默认第1天
        private _iconGotList: IconGot[] = [];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list_day.itemRenderer = YjjsDayItem;
            this._view.list_day.dataProvider = this._listDay = new eui.ArrayCollection();
            this._view.list_item.itemRenderer = YjjsItem1;
            this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
            let i = 0;
            while (this._view[`icon${i}`]) {
                this._iconGotList.push(this._view[`icon${i}`]);
                i++;
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_day, eui.ItemTapEvent.ITEM_TAP, this.onClickDay, this);
            let i = 0;
            while (this._view[`icon${i}`]) {
                addEventListener(this._view[`icon${i}`], egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                i++;
            }

            this.onNt(ActivityEvent.ON_YJJS_SANSHENG_INFO_UPDATE, this.updateView, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);
            // this.onNt(RoleEvent.ON_SERVER_DAY_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._curDay = this._proxy.getSelDay();//选择天数
            this._proxy.clickDay = this._curDay;
            this._endTime = this._proxy.getEndTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
            this._proxy.clickDrawReward = false;
            this._proxy.clickDay = 0;
        }

        private onUpdateTask(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Yaojijiangshi) > -1) {
                //当前界面奖励全部领取完后：按天数顺序跳转至第一个有奖励可领取的天数
                let day = this._proxy.getDrawDay();
                if (this._proxy.clickDay == this._curDay && this._proxy.clickDrawReward
                    && day && day != this._curDay) {
                    this._curDay = day;
                    this._proxy.clickDay = day;
                    this._proxy.clickDrawReward = false;
                }
                this.updateView();
            }
        }

        private updateView(): void {
            this.updateTopView();
            this.updateDayView();
            this.updateItemView();
        }

        private updateTopView(): void {
            let cfg: TotalMainConfig = getConfigByNameId(ConfigName.TotalMain, TotalMainIdx.Yjjs);
            if (!cfg) {
                DEBUG && console.error(`total_main.json: 无配置 ${TotalMainIdx.Yjjs}`);
                return;
            }
            let itemMin = 0;//每段进度条最小值
            let finishedCnt = this._proxy.getFinishedTaskCnt();
            for (let i = 0; i < cfg.gift_list.length; i++) {
                if (!this._view[`icon${i}`]) {
                    continue;
                }
                let item = cfg.gift_list[i];
                let targetInfo = this._proxy.getTargetInfo(1, i + 1);
                let state = targetInfo ? targetInfo.state : 0;
                let isBig = i == cfg.gift_list.length - 1;
                let iconData: IconRewardData = {
                    prop: [item[0], item[1]],
                    showHint: state == 1,
                    isGot: state == 2,
                    isReward: isBig
                };
                this._view[`icon${i}`].data = iconData;
                if (isBig && state != 2) {
                    (this._view[`icon${i}`] as IconGot).icon.setImgLock();
                }
                (this._view[`barCntComp${i}`] as ProgressBarCntComp2).updateShow(finishedCnt, itemMin, item[2]);
                itemMin = item[2] + 1;
            }

            this.addBmpFont(finishedCnt + '', BmpTextCfg[BmpTextType.VipFont], this._view.gr_font, true, 1, true);
        }

        private updateDayView(): void {
            let list: IYjjsDayItemData[] = [];
            let taskList = this._proxy.getSanshengTaskListByDay(this._curDay);
            let max = taskList && taskList.length || 0;
            for (let i = 1; i <= 7; i++) {
                list.push({
                    day: i,
                    unlock: this._proxy.isOpenByDay(i),
                    hint: this._proxy.getHintByDay(i),
                    val: this._proxy.getSanShengTaskFinishedCntByDay(i),
                    max: max,
                    sel: i == this._curDay
                });
            }
            this._listDay.replaceAll(list);
            let preSel = this._view.list_day.selectedIndex || 0;
            this._view.list_day.selectedIndex = this._curDay - 1;
            if (preSel < 5 && this._curDay >= 6) {
                egret.callLater(() => {
                    ScrollUtil.moveHToAssign(this._view.scroller, this._curDay - 1, 119);
                }, this);
            }
        }

        private updateItemView(): void {
            let taskIds = this._proxy.getSanshengTaskListByDay(this._curDay) || [];
            let list: task_data[] = [];
            for (let id of taskIds) {
                let taskData = TaskUtil.getTask(id);
                list.push(taskData);
            }
            list.sort(SortTools.sortTask);
            this._listItem.replaceAll(list);
        }

        private onClickDay(e: eui.ItemTapEvent): void {
            let data = e.item as IYjjsDayItemData;
            if (!data || data.day == this._curDay) {
                return;
            }
            if (!this._proxy.isOpenByDay(data.day)) {
                PromptBox.getIns().show(`暂未开启`);
                this._view.list_day.selectedIndex = this._curDay - 1;
                return;
            }
            this._curDay = data.day;
            if (this._proxy.clickDay != this._curDay) {
                this._proxy.clickDrawReward = false;//重置
                this._proxy.clickDay = this._curDay;
            }
            this.updateView();
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime < 1) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onClickIcon(e: egret.TouchEvent): void {
            let data = e.currentTarget.data as IconRewardData;
            if (data && data.showHint) {
                let idx = this._iconGotList.indexOf(e.currentTarget) + 1;
                this._proxy.c2s_yaoji_target_reward(1, idx);
                return;
            }
            ViewMgr.getIns().showPropTips(data.prop[0]);
        }
    }
}