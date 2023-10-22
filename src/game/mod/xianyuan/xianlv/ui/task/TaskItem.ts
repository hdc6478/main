namespace game.mod.xianyuan {

    import task_data = msg.task_data;
    import MainTask1Config = game.config.MainTask1Config;
    import LanDef = game.localization.LanDef;

    export class TaskItem extends BaseGiftItemRender {

        data: task_data;
        private _jump: number;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let taskId = data.task_id;
            let taskCfg: MainTask1Config = TaskUtil.getCfg(taskId);
            if (!taskCfg) {
                return;
            }
            this._jump = taskCfg.jump;
            this._listData.source = taskCfg.rewards.concat();

            let schedule = data.schedule;
            let target = data.target;
            this.lb_desc.textFlow = TextUtil.parseHtml(taskCfg.desc + TextUtil.addColor(`(${schedule}/${target})`,
                schedule >= target ? WhiteColor.GREEN : WhiteColor.RED));

            let status = data.status;
            if (status == TaskStatus.Draw) {
                this.btn_buy.visible = false;
                this.img_bought.visible = true;
                return;
            }
            this.btn_buy.visible = true;
            this.img_bought.visible = false;
            this.btn_buy.label = status == TaskStatus.NotFinish ? getLanById(LanDef.goto) : getLanById(LanDef.tishi_29);
            if (status == TaskStatus.NotFinish) {
                this.btn_buy.setBlue();
            } else {
                this.btn_buy.setYellow();
            }
            this.btn_buy.setHint(status == TaskStatus.Finish);
        }

        protected onClick() {
            if (this.data && this.data.status == TaskStatus.Finish) {
                TaskUtil.clickTask(this.data);
                return;
            }
            if (this._jump) {
                ViewMgr.getIns().showViewByID(this._jump);
            }
        }
    }
}