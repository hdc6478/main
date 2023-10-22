namespace game.mod.activity {

    import task_data = msg.task_data;

    export class YjjsItem1 extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public bar: game.mod.ProgressBarComp;
        public btn_do: game.mod.Btn;
        public lb_desc: eui.Label;
        public img_done: eui.Image;

        data: task_data;
        private _jump: number;
        private _proxy: YjjsProxy;

        constructor() {
            super();
            this.skinName = `skins.activity.YjjsItemSkin1`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Yjjs)
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let taskId = this.data.task_id;
            let taskCfg = TaskUtil.getCfg(taskId);
            if (!taskCfg) {
                DEBUG && console.error(`没有任务id：${taskId}`);
                return;
            }

            this._jump = taskCfg.jump;

            this.lb_desc.text = taskCfg.desc;
            this.icon.data = taskCfg.rewards[0];

            let taskData = this.data;
            let schedule = taskData && taskData.schedule || 0;
            let target = taskData && taskData.target || 0;
            this.bar.show(schedule, target, false, 0, false);

            let state = taskData ? taskData.status : 0;
            if (state == 2) {
                this.btn_do.visible = false;
                this.img_done.visible = true;
            } else {
                this.btn_do.visible = true;
                this.img_done.visible = false;
                this.btn_do.label = state == 0 ? `前 往` : `领 取`;
                if (state == 0) {
                    this.btn_do.setBlue();
                } else {
                    this.btn_do.setYellow();
                }
                this.btn_do.setHint(state == 1);
            }
        }

        private onClick(): void {
            if (this.data && this.data.status == 1) {
                TaskUtil.clickTask(this.data);
                this._proxy.clickDrawReward = true;
                return;
            }
            if (this._jump) {
                ViewMgr.getIns().showViewByID(this._jump);
            }
        }
    }
}