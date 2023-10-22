namespace game.mod {
    import TouchEvent = egret.TouchEvent;
    import task_data = msg.task_data;
    import LanDef = game.localization.LanDef;

    export class TaskRender2 extends BaseListenerRenderer {
        private lab_desc: eui.Label;
        private lab_schedule: eui.Label;
        private icon: game.mod.Icon;
        private img_finished: eui.Image;
        private btn_go: game.mod.Btn;

        public data: task_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickDraw, this);
        }

        protected dataChanged(): void {
            let task = this.data;
            if(!task){
                return;
            }
            this.lab_desc.text = TaskUtil.getTaskDescNotSchedule(task);

            let hasDraw = TaskUtil.hasRewardDraw(task);
            this.btn_go.visible = !hasDraw;
            this.img_finished.visible = hasDraw;
            if(this.btn_go.visible){
                let canDraw = TaskUtil.canRewardDraw(task);;
                this.btn_go.redPoint.visible = canDraw;
                if(canDraw){
                    this.btn_go.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_go.setYellow();
                }
                else {
                    this.btn_go.labelDisplay.text = getLanById(LanDef.goto);
                    this.btn_go.setBlue();
                }
                this.lab_schedule.textFlow = TextUtil.parseHtml(TaskUtil.getTaskSchedule(task));
            }
            else {
                this.lab_schedule.text = "";
            }
            let cfg = TaskUtil.getCfg(task.task_id);
            let reward = cfg.rewards.length > 0 ? cfg.rewards[0] : null;
            this.icon.data = reward;
        }

        private onClickDraw(): void {
            TaskUtil.clickTask(this.data);
        }
    }
}