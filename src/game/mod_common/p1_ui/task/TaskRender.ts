namespace game.mod {

    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import task_data = msg.task_data;

    export class TaskRender extends BaseListenerRenderer {
        protected lab_num: eui.Label;
        private lab_desc: eui.Label;
        private bar: ProgressBarComp;
        private img_finished: eui.Image;
        protected btn_go: game.mod.Btn;

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
            let cfg = TaskUtil.getCfg(task.task_id);

            this.lab_desc.text = TaskUtil.getTaskDescNotSchedule(task);
            this.bar.show(task.schedule, task.target, false, 0, false);

            let hasDraw = TaskUtil.hasRewardDraw(task);
            this.btn_go.visible = !hasDraw;
            this.img_finished.visible = hasDraw;
            if(this.btn_go.visible){
                let canDraw = TaskUtil.canRewardDraw(task);
                this.btn_go.redPoint.visible = canDraw;
                if(canDraw){
                    this.btn_go.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_go.setYellow();
                }
                else {
                    this.btn_go.labelDisplay.text = getLanById(LanDef.goto);
                    this.btn_go.setBlue();
                }
            }

            let rewards: number[][] = cfg && cfg.rewards;
            let cnt = rewards && rewards[0][1] || 0;
            this.lab_num.text = StringUtil.getHurtNumStr(cnt);
        }

        protected onClickDraw(): void {
            TaskUtil.clickTask(this.data);
        }
    }
}