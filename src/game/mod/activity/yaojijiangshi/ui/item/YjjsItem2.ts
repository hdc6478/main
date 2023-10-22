namespace game.mod.activity {

    import task_data = msg.task_data;

    export class YjjsItem2 extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public lb_cond: eui.Label;
        public img_done: eui.Image;
        public btn_do: game.mod.Btn;
        public icon: game.mod.Icon;

        data: task_data;
        private _jump: number;

        constructor() {
            super();
            this.skinName = `skins.activity.YjjsItemSkin2`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
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
                DEBUG && console.error(`没有任务配置id：${taskId}`);
                return;
            }

            this._jump = taskCfg.jump;
            this.lb_desc.text = taskCfg.desc;
            this.icon.data = taskCfg.rewards[0];

            let taskData = this.data;
            let str = TextUtil.addColor(`(${taskData.schedule}/${taskData.target})`, taskData.schedule >= taskData.target ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_cond.textFlow = TextUtil.parseHtml(str);
            if (taskData.status == 2) {
                this.img_done.visible = true;
                this.btn_do.visible = false;
            } else {
                this.img_done.visible = false;
                this.btn_do.visible = true;
                this.btn_do.label = taskData.status == 0 ? `前 往` : `领 取`;
                if (taskData.status == 0) {
                    this.btn_do.setBlue();
                } else {
                    this.btn_do.setYellow();
                }
                this.btn_do.setHint(taskData.status == 1);
            }
        }

        private onClick(): void {
            if (this.data && this.data.status == 1) {
                TaskUtil.clickTask(this.data);
                return;
            }
            if (this._jump) {
                ViewMgr.getIns().showViewByID(this._jump);
            }
        }
    }
}