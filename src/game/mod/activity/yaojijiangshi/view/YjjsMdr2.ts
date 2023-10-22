namespace game.mod.activity {

    import TotalMainConfig = game.config.TotalMainConfig;
    import GameNT = base.GameNT;
    import task_data = msg.task_data;
    import PropConfig = game.config.PropConfig;

    export class YjjsMdr2 extends EffectMdrBase {
        private _view: YjjsView2 = this.mark("_view", YjjsView2);
        private _proxy: YjjsProxy;
        private _listData: eui.ArrayCollection;
        private _curStage = 0;//当前阶段
        private _iconGotList: IconGot[] = [];
        private _effId: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eff.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Yjjs);
            this._view.list.itemRenderer = YjjsItem2;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            let i = 0;
            while (this._view[`icon${i}`]) {
                this._iconGotList.push(this._view[`icon${i}`]);
                i++;
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            let i = 0;
            while (this._view[`icon${i}`]) {
                addEventListener(this._view[`icon${i}`], egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                i++;
            }
            this.onNt(ActivityEvent.ON_YJJS_SANSHI_INFO_UPDATE, this.updateView, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);
        }

        protected onShow(): void {
            super.onShow();
            this._curStage = this._proxy.model.sanshi_stage || 1;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._effId && this.removeEffect(this._effId);
            this._effId = null;
        }

        private onUpdateTask(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Yaojijiangshi) > -1) {
                this.updateView();
            }
        }

        private updateView(): void {
            this._curStage = this._proxy.model.sanshi_stage;

            let cfg: TotalMainConfig = getConfigByNameId(ConfigName.TotalMain, TotalMainIdx.Yjjs);
            if (!cfg || !cfg.gift2_list) {
                return;
            }
            let maxBar = 0;
            let finishedCnt = this._proxy.getFinishedTaskCnt2();
            for (let i = 0; i < cfg.gift2_list.length; i++) {
                if (!this._view[`icon${i}`]) {
                    continue;
                }
                let item = cfg.gift2_list[i];
                let targetInfo = this._proxy.getTargetInfo(2, i + 1);
                let state = targetInfo ? targetInfo.state : 0;
                let isBig = i == cfg.gift2_list.length - 1;
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
                this._view[`barCnt${i}`].updateShow(item[2], item[2] <= finishedCnt);
                maxBar = Math.max(maxBar, item[2]);
            }
            this._view.bar.show(finishedCnt, maxBar, false, 0, false, ProgressBarType.NoValue);

            this.updateListView();

            let bigReward = cfg.gift2_list[cfg.gift2_list.length - 1];
            if (bigReward && !this._effId) {
                let propCfg: PropConfig = GameConfig.getPropConfigById(bigReward[0]);
                if (propCfg && propCfg.param1) {
                    this._effId = this.addAnimate(propCfg.param1[0][0], this._view.gr_eff);
                }
            }
        }

        private updateListView(): void {
            let taskIds = this._proxy.getSanShiTaskListByStage(this._curStage);
            let list: task_data[] = [];
            let doneList: task_data[] = [];
            for (let id of taskIds) {
                let taskData = TaskUtil.getTask(id);
                if (!taskData) {
                    DEBUG && console.error(`没有任务数据TaskData,id：${id}`);
                    continue;
                }
                if (TaskUtil.hasRewardDraw(taskData)) {
                    doneList.push(taskData);
                } else {
                    list.push(taskData);
                }
            }
            list = list.concat(doneList);
            this._listData.replaceAll(list);
        }

        private onClickIcon(e: egret.TouchEvent): void {
            let data = e.currentTarget.data as IconRewardData;
            if (data && data.showHint) {
                let idx = this._iconGotList.indexOf(e.currentTarget) + 1;
                this._proxy.c2s_yaoji_target_reward(2, idx);
                return;
            }
            ViewMgr.getIns().showPropTips(data.prop[0]);
        }
    }
}