namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import task_data = msg.task_data;
    import ArrayCollection = eui.ArrayCollection;
    import ChonglistTargetConfig = game.config.ChonglistTargetConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class PunshListMdr extends MdrBase implements UpdateItem {
        private _view: PunshListView = this.mark("_view", PunshListView);
        private _proxy: PunshListProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;
        private _scoreData: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.PunshList);

            this._view.list_task.itemRenderer = PunshListTaskItem;
            this._view.list_task.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.list.itemRenderer = PunshListItem;
            this._view.list.dataProvider = this._scoreData = new eui.ArrayCollection();

        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_1, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.btn_2, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.btn_3, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.btn_4, TouchEvent.TOUCH_TAP, this.onClickBtn);
            this.onNt(ActivityEvent.ON_UPDATE_PUNSHLIST_INFO, this.updateView, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            this.updateView();

            this._proxy.checkActTips(NotTipsType.PunshList);

        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private updateView(): void {
            let cfgs = getConfigByNameId(ConfigName.ChonglistTarget, this._proxy.type);
            let list: ChonglistTargetConfig[] = [];
            let nums: number[] = [];
            for (let k in cfgs) {
                let cfg: ChonglistTargetConfig = cfgs[k];
                list.unshift(cfg);
                nums.push(cfg.cnt);
                let btn: Btn = this._view[`btn_${cfg.index}`];
                btn.label = `${cfg.cnt}`;
                let data = this._proxy.getData(this._proxy.type, cfg.index);
                btn.setHint(data && data.status == 1);
            }
            this._scoreData.replaceAll(list);

            let score: number = this._proxy.model.score;
            this._view.lab_score.text = `${score}`;
            // this._view.btn.label = '积分';

            this.onUpdateProgress(nums);

            this.onUpdateTask();
        }

        private onUpdateProgress(nums: number[]): void {
            let score: number = this._proxy.model.score;
            if (!score) {
                this._view.progress.percentHeight = 0;
                return;
            }
            if (score >= nums[nums.length - 1]) {
                this._view.progress.percentHeight = 100;
                return;
            }
            let part: number = 25;
            for (var i = 0; i < nums.length; i++) {
                let num = nums[i];
                if (num > score) {
                    break
                }
            }
            if (!i) {
                let p = score / nums[i];
                this._view.progress.percentHeight = (i + p) * part;
            } else {
                let p = (score - nums[i - 1]) / (nums[i] - nums[i - 1]);
                this._view.progress.percentHeight = (i + p) * part;
            }
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.PunshList) > -1) {
                this.onUpdateTask();
            }
        }

        private onUpdateTask(): void {
            let tasks: task_data[] = TaskUtil.getTaskList(TaskType.PunshList);
            this._listData.replaceAll(tasks);
        }

        private onClickBtn(e: TouchEvent): void {
            let index: number = 0;
            switch (e.currentTarget) {
                case this._view.btn_1:
                    index = 1;
                    break;
                case this._view.btn_2:
                    index = 2;
                    break;
                case this._view.btn_3:
                    index = 3;
                    break;
                case this._view.btn_4:
                    index = 4;
                    break;
            }
            if (!index) {
                return;
            }
            let data = this._proxy.getData(this._proxy.type, index);
            if (data) {
                if (data.status == 1) {
                    this._proxy.c2s_chonglist_receive_reward(this._proxy.type, index)
                } else {
                    PromptBox.getIns().show(getLanById(LanDef.shoulie_point))
                }
            } else {
                PromptBox.getIns().show(getLanById(LanDef.general3))
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}