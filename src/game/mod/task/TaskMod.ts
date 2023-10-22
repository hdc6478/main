namespace game.mod.task {

    export class TaskMod extends ModBase {

        constructor() {
            super(ModName.Task);
        }

        protected initCmd(): void {
            super.initCmd();
            let self = this;
        }

        protected initModel(): void {
            super.initModel();
            let self = this;
            self.regProxy(ProxyType.Task, TaskProxy);
        }

        protected initView(): void {
            super.initView();
            let self = this;
        }
    }

    gso.modCls.push(TaskMod);
}