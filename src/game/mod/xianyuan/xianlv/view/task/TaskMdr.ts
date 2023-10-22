namespace game.mod.xianyuan {

    import GameNT = base.GameNT;

    export class TaskMdr extends MdrBase {
        private _view: TaskView = this.mark("_view", TaskView);
        private _proxy: XianlvProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
            this._view.list.itemRenderer = TaskItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let taskList = TaskUtil.getTaskList(TaskType.Xianlv) || [];
            this._listData.source = taskList;
        }

        private onUpdateTask(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(TaskType.Xianlv) > -1) {
                this.updateView();
            }
        }
    }
}