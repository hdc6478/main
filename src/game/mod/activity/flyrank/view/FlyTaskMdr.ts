namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;

    export class FlyTaskMdr extends EffectMdrBase {
        private _view: FlyTaskView = this.mark("_view", FlyTaskView);
        private _proxy: ActivityProxy;
        private _itemList: ArrayCollection;
        private _taskType: number;

        protected onInit(): void {
            super.onInit();

            this._proxy = this.retProxy(ProxyType.Activity);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = TaskRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            let actInfo = this._proxy.curOpenAct;
            this._taskType = actInfo && actInfo.param ? actInfo.param[1] : TaskType.Fly;//任务类型
            this.updateTaskList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(this._taskType) > -1) {
                this.updateTaskList();
            }
        }

        private updateTaskList(): void {
            let tasks = TaskUtil.getTaskList(this._taskType, true, true);
            if (this._itemList.source.length > 0) {
                this._itemList.replaceAll(tasks);
            } else {
                this._itemList.source = tasks;
            }
        }
    }
}