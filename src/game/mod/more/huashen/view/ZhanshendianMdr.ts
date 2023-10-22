namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import HorseConfig = game.config.HorseConfig;
    import facade = base.facade;
    import HuashenConfig = game.config.HuashenConfig;
    import task_data = msg.task_data;

    export class ZhanshendianMdr extends EffectMdrBase {
        private _view: ZhanshendianView = this.mark("_view", ZhanshendianView);
        private _proxy: HuashenProxy;
        private _surfaceProxy: ISurfaceProxy;
        private _taskList: ArrayCollection;
        private _effIdx: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Huashen);
            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);

            this._taskList = new ArrayCollection();
            this._view.list_task.itemRenderer = TaskRender2;
            this._view.list_task.dataProvider = this._taskList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(HuashenEvent.ON_UPDATE_HUASHEN_ZHANSHENDIAN_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateModel();
            this.updateTaskList();
        }

        protected onHide(): void {
            this._effIdx = 0;
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.HuashenZhanshendian) > -1) {
                this.updateTaskList();
            }
        }

        private onInfoUpdate(): void {
            this.updateModel();
        }

        private onClickAct(): void {
            let index = this._proxy.nowId;
            this._surfaceProxy.c2s_ride_oper_up_star(SurfaceStarOpType.Act, index, ConfigHead.Huashen);
        }

        private updateModel(): void {
            let index = this._proxy.nowId;
            if(!index){
                return;
            }
            if (this._effIdx) {
                this.removeEffect(this._effIdx);
            }
            this._effIdx = this.addAnimate(index, this._view.grp_eff);
            let cfg = getConfigById(index) as HorseConfig;
            this._view.name_item.updateShow(cfg.name, cfg.quality);
        }

        private updateTaskList(): void {
            let index = this._proxy.nowId;
            let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, index);
            if(!cfg){
                return;
            }
            let taskList = cfg.task;
            let tasks: task_data[] = [];
            let hasAllDraw = true;//是否全部领取奖励
            for(let taskId of taskList){
                let task = TaskUtil.getTask(taskId);
                if(!task){
                    continue;
                }
                if(task.status != TaskStatus.Draw){
                    hasAllDraw = false;
                }
                tasks.push(task);
            }
            tasks.sort(SortTools.sortTask);
            this._view.scr.visible = this._view.img_task.visible = !hasAllDraw;
            if(!hasAllDraw){
                if (this._taskList.source.length > 0) {
                    this._taskList.replaceAll(tasks);
                } else {
                    this._taskList.source = tasks;
                }
            }

            this._view.btn_act.visible = hasAllDraw;
            this._view.btn_act.redPoint.visible = true;
        }
    }
}