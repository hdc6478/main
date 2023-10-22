namespace game.mod.pass {

    import ArrayCollection = eui.ArrayCollection;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import QiyuanConfig = game.config.QiyuanConfig;
    import QiyuanFubenConfig = game.config.QiyuanFubenConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import Event = egret.Event;
    import GameNT = base.GameNT;
    import TaskData = msg.task_data;
    import LanDef = game.localization.LanDef;
    import MainTask1Config = game.config.MainTask1Config;

    export class QiyuanMdr extends MdrBase {

        private _view: QiyuanView = this.mark("_view", QiyuanView);
        private _proxy: PassProxy;
        private _model: PassModel;

        private _cfgs: QiyuanConfig[];
        private _offHight = 140;

        private _itemDatas: ArrayCollection;

        private _isChecked: boolean = false;

        constructor(parent: DisplayObjectContainer) {
            super(parent);
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Pass);
            this._model = this._proxy.getModel();

            this._itemDatas = new ArrayCollection();
            this._view.list_item.itemRenderer = QiyuanItem;
            this._view.list_item.dataProvider = this._itemDatas;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(PassEvent.UPDATE_PASS_FB_QI_YUAN_INFO, this.updateData, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.check, Event.CHANGE, this.onCheckChange);
        }

        protected onShow(): void {
            super.onShow();
            this.updateData();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateData() {
            if (!this._cfgs) {
                this._cfgs = getConfigListByName(ConfigName.Qiyuan);
                this._cfgs.sort((a, b) => {
                    if (a.limit == b.limit) {
                        if (a.rank == b.rank) {
                            return a.index - b.index;
                        }else {
                            return a.rank - b.rank;
                        }
                    } else {
                        return a.limit - b.limit;
                    }
                });
            }

            let qyFbGotsAwdCnt: number = 0;
            let qyFbTotalAwdCnt: number = 0;
            let scrollCtn = 0;
            let flag = false;
            let qyDatas: IPassQiyuanData[] = [];
            let j = 0;
            let len = this._cfgs.length;
            for (let i: number = 0; i < len; i++) {
                let cfg = this._cfgs[i];
                if (!cfg) {
                    continue;
                }

                let isFinish: boolean = false;
                let task: TaskData;
                let desc: string = "";

                if (cfg.event_type == 1 || cfg.event_type == 4) {
                    let index: number = 0;
                    if (cfg.event_type == 1) {
                        index = this._proxy.getIndexByCfgIndex(cfg.index);
                        index = Math.min(index, 4);
                    }

                    let qyfbCfg: QiyuanFubenConfig = getConfigByNameId(ConfigName.QiyuanFuben, cfg.param1[index]);
                    if (!qyfbCfg) {
                        DEBUG && console.error(`奇缘副本缺少${cfg.param1[index]}配置`);
                        break;
                    }

                    desc = qyfbCfg.name;
                    let show_rewards = qyfbCfg.show_rewards;
                    if (show_rewards && show_rewards.length > 0) {
                        qyFbTotalAwdCnt += show_rewards[0][1];
                    }
                    isFinish = this._model.qyFbFinishIds.indexOf(cfg.index) != -1;
                    if (isFinish) {
                        qyFbGotsAwdCnt += show_rewards.length;
                    }

                } else {
                    let taskCfg: MainTask1Config = TaskUtil.getCfg(cfg.param1[0]);
                    desc = taskCfg.title;
                    task = TaskUtil.getTask(cfg.param1[0]);
                    if (task) {
                        isFinish = task.status == TaskStatus.Draw;
                    }
                }

                if (!this._isChecked && isFinish) {
                    continue;
                }

                j++;

                if (this._model.worldMapCurTaskId > 0 && !flag) {
                    scrollCtn++;
                    if (task && task.task_id == this._model.worldMapCurTaskId) {
                        flag = true;
                    }
                }

                let isInStep: boolean = (cfg.limit <= this._model.curStep);
                let qyData: IPassQiyuanData = {
                    cfg: cfg,
                    task: task,
                    state: (j % 2 == 1) ? 2 : 1,
                    isFinish: isFinish,
                    isInStep: isInStep,
                    desc: desc
                };
                qyDatas.push(qyData);
            }

            if (this._itemDatas) {
                this._itemDatas.replaceAll(qyDatas);
            } else {
                this._itemDatas.source = qyDatas;
            }

            this._model.qyFbGotsAwdCnt = qyFbGotsAwdCnt;
            this._model.qyFbTotalAwdCnt = qyFbTotalAwdCnt;

            if (this._model.worldMapCurTaskId > 0) {
                this._view.scr.viewport.scrollV = scrollCtn * this._offHight + 40;
                this._model.worldMapCurTaskId = 0;
            }
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Qiyuan) > -1) {
                this.updateData();
            }
        }

        private onClickItem(e: ItemTapEvent): void {
            let itemData: IPassQiyuanData = e.item;
            if (!itemData.cfg) {
                return;
            }

            let event_type = itemData.cfg.event_type;
            if (!itemData.isInStep) {
                PromptBox.getIns().show(getLanById(LanDef.pass_qiyuan_1));
                return;
            } else if (itemData.isFinish) {
                PromptBox.getIns().show(getLanById(LanDef.pass_qiyuan_2));
                return;
            }
            if (event_type == 1 || event_type == 4) {
                ViewMgr.getIns().showSecondPop(ModName.Pass, PassViewType.QiyuanDetail1, itemData.cfg);
            } else {
                ViewMgr.getIns().showSecondPop(ModName.Pass, PassViewType.QiyuanDetail2, itemData);
            }
        }

        private onCheckChange(e: Event): void {
            this._isChecked = this._view.check.selected;
            this.updateData();
        }

    }
}