namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;

    export class KuafuDoufaAchieveMdr extends MdrBase {

        private _view: KuafuDoufaAchieveView = this.mark("_view", KuafuDoufaAchieveView);
        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = KuafuDoufaAchieveItem;
            this._view.list_reward.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.KuafuDoufa) > -1) {
                this.updateItemList();
            }
        }
        
        private updateItemList(): void {
            let tasks = TaskUtil.getTaskList(TaskType.KuafuDoufa);
            if(this._itemList.source.length){
                this._itemList.replaceAll(tasks);
            }
            else {
                this._itemList.source = tasks;
            }
        }
    }
}
