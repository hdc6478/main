namespace game.mod.yijie {

    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;

    export class SeaTaskMdr extends MdrBase {
        private _view: SeaTaskView = this.mark("_view", SeaTaskView);
        private _taskList: ArrayCollection;
        private _proxy: SeaProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Sea);

            this._taskList = new ArrayCollection();
            this._view.list_task.itemRenderer = TaskRenderIcon;
            this._view.list_task.dataProvider = this._taskList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateTaskList();
        }



        protected onHide(): void {
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            let taskType = SeaTypeToTaskType[this._proxy.type];
            if (types.indexOf(taskType) > -1) {
                this.updateTaskList();
            }
        }

        private updateTaskList(): void {
            let taskType = SeaTypeToTaskType[this._proxy.type];
            let tasks = TaskUtil.getTaskList(taskType);
            if (this._taskList.source.length > 0) {
                this._taskList.replaceAll(tasks);
            } else {
                this._taskList.source = tasks;
            }
            if(tasks.length <= 0){
                this.hide();
            }
        }
    }
}