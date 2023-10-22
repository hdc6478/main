namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import task_data = msg.task_data;
    import ParamConfig = game.config.ParamConfig;

    export class PunshListTaskItem extends BaseListenerRenderer {

        public img_icon: eui.Image;
        public lab_num: eui.Label;
        public lab_desc: eui.Label;
        public progressComp: ProgressBarComp;
        public img_finished: eui.Image;
        public btn_go: game.mod.Btn;

        public data: task_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
        }

        private onClickGo() {
            TaskUtil.clickTask(this.data, this.btn_go);
        }

        protected dataChanged(): void {
            let cfg = TaskUtil.getCfg(this.data.task_id);
            let param: ParamConfig = GameConfig.getParamConfigById("chonglist_jifen");
            this.lab_num.text = `${param.value}`;
            this.lab_desc.text = cfg.desc;
            let hasDraw = TaskUtil.hasRewardDraw(this.data);
            if (hasDraw) {
                this.progressComp.show(this.data.schedule, this.data.target || this.data.schedule, false);
            } else {
                this.progressComp.show(this.data.schedule, this.data.target, false);
            }
            this.btn_go.labelDisplay.text = this.data.status == TaskStatus.Finish ? "领取" : "前往";
            this.btn_go.visible = this.data.status != TaskStatus.Draw;
            this.btn_go.redPoint.visible = this.data.status == TaskStatus.Finish;
            this.img_finished.visible = hasDraw;
        }

    }
}