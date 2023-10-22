namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import MainTask1Config = game.config.MainTask1Config;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class QiyuanDetail2Mdr extends MdrBase {
        private _view: QiyuanDetail2View = this.mark("_view", QiyuanDetail2View);

        private _proxy: PassProxy;

        private _data: IPassQiyuanData;
        private _tasCfg: MainTask1Config;

        private _rewardDatas: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._rewardDatas = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardDatas;

            this._proxy = this.retProxy(ProxyType.Pass);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.updateTask, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
        }

        protected onShow(): void {
            super.onShow();

            this._data = this._showArgs;
            if (!this._data || !this._data.cfg) {
                return;
            }

            this._tasCfg = TaskUtil.getCfg(this._data.cfg.param1[0]);
            this.updateData();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateData() {
            this._view.lab_task.visible = false;
            this._view.lab_task.text = "";
            this._view.lab_desc.text = this._tasCfg.desc2;
            // if (this._rewardDatas.length) {
            //     this._rewardDatas.replaceAll(this._tasCfg.rewards);
            // } else {
            //     this._rewardDatas.source = this._tasCfg.rewards;
            // }
            this._rewardDatas.source = this._tasCfg.rewards;
            this._view.btn_get.redPoint.visible = this._data.task && (this._data.task.schedule >= this._data.task.target);

            if (this._data.cfg.event_type != 3) {            // 非炼丹任务
                this._view.currentState = "canGet";
                this._view.btn_get.labelDisplay.text = getLanById(LanDef.tishi_29);
                let bool: boolean = this._data.task.target <= this._data.task.schedule;
                this._view.lab_task.visible = true;
                this._view.lab_task.textFlow = TextUtil.parseHtml(`${this._tasCfg.title}${TextUtil.addColor(`(${this._data.task.schedule}/${this._data.task.target})`, bool ? BlackColor.GREEN : BlackColor.RED)}`)
                return;
            }

            if (!this._data.task) {          // 未接受
                this._view.currentState = "notAccept";
                this._view.cost.updateShow([PropIndex.Yuanbao, Number(this._tasCfg.param3)]);
                this._view.btn_get.labelDisplay.text = getLanById(LanDef.pass_buy_awd);
                return;
            }

            switch (this._data.task.status) {
                case TaskStatus.NotFinish:             // 炼制中
                    this._view.currentState = "refining";
                    let time = this._data.task.target - this._data.task.schedule;
                    let timeStr = TimeUtil.formatSecond(time * 60, "dd" + getLanById(LanDef.shijian_1) + "HH" + getLanById(LanDef.shijian_2) + "mm" + getLanById(LanDef.shijian_3));
                    this._view.lab_tip.textFlow = TextUtil.parseHtml(getLanById(LanDef.pass_refining) + "   " + TextUtil.addColor(timeStr + getLanById(LanDef.pass_refine_tip1), UIColor.GREEN));
                    let idx = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[0] : PropIndex.Xianyu;
                    let cnt = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[1] : 0;
                    // let cnt: number = +this._tasCfg.param3;
                    this._view.cost.updateShow([idx, cnt]);
                    this._view.btn_get.labelDisplay.text = getLanById(LanDef.get_award_quick);
                    break;
                case TaskStatus.Finish:             // 可领取
                    this._view.currentState = "canGet";
                    this._view.btn_get.labelDisplay.text = getLanById(LanDef.tishi_29);
                    break;
                case TaskStatus.Draw:             // 已领取
                    this._view.currentState = "got";
                    break;
                default:
                    break;
            }
        }

        private updateTask(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Qiyuan) == -1) {
                return;
            }

            let task = TaskUtil.getTask(this._data.cfg.param1[0]);
            if (task) {
                this._data.task = task;
            }
            this.updateData();
        }

        private onGetBtnClick(e: TouchEvent): void {
            if (!this._data.task) {          // 未接受
                this._proxy.c2s_qiyuan_enter(this._data.cfg.index);
                return;
            }

            if (this._data.cfg.event_type != 3) {            // 非炼丹任务
                TaskUtil.clickTask(this._data.task);
                this.hide();
                return;
            }
            switch (this._data.task.status) {
                case TaskStatus.NotFinish:             // 炼制中
                    let idx = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[0] : PropIndex.Xianyu;
                    let cnt = this._tasCfg.quick_cost && this._tasCfg.quick_cost.length ? this._tasCfg.quick_cost[1] : 0;
                    // let cnt: number = +this._tasCfg.param3;
                    let isEnough: boolean = BagUtil.checkPropCnt(idx, cnt, PropLackType.Text);
                    if (isEnough) {
                        TaskUtil.quickTask(this._data.task);
                    }
                    break;
                case TaskStatus.Finish:             // 可领取
                    TaskUtil.clickTask(this._data.task);
                    this.hide();
                    break;
                default:
                    break;
            }
        }

    }
}