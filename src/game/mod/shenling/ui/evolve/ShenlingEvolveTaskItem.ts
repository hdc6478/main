namespace game.mod.shenling {

    import task_data = msg.task_data;

    export class ShenlingEvolveTaskItem extends BaseListenerRenderer {
        public lab_desc: eui.Label;
        public lab_schedule: eui.Label;
        public icon: game.mod.Icon;
        public img_done: eui.Image;
        public btn_do: game.mod.Btn;

        data: task_data;
        private _jump: number;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenlingEvolveTaskItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let taskId = data.task_id;
            let taskCfg = TaskUtil.getCfg(taskId);
            if (!taskCfg) {
                return;
            }
            this._jump = taskCfg.jump;

            this.lab_desc.text = taskCfg.desc;
            this.icon.data = taskCfg.rewards[0];

            let state = data.status || RewardStatus.NotFinish;
            if (state == RewardStatus.Draw) {
                this.btn_do.visible = false;
                this.img_done.visible = true;
                this.lab_schedule.text = '';
            } else {
                this.btn_do.visible = true;
                this.img_done.visible = false;
                this.btn_do.label = state == 0 ? `前 往` : `领 取`;
                if (state == RewardStatus.NotFinish) {
                    this.btn_do.setBlue();
                } else {
                    this.btn_do.setYellow();
                }
                this.btn_do.setHint(state == 1);
                this.lab_schedule.textFlow = TextUtil.parseHtml(TaskUtil.getTaskSchedule(data));
            }
        }

        private onClick(): void {
            if (this.data && this.data.status == RewardStatus.Finish) {
                TaskUtil.clickTask(this.data);
                return;
            }
            if (this._jump) {
                ViewMgr.getIns().showViewByID(this._jump);
            }
        }
    }
}