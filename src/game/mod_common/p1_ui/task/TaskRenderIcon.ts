namespace game.mod {
    import task_data = msg.task_data;
    import PropConfig = game.config.PropConfig;

    //显示两个奖励的任务
    export class TaskRenderIcon extends TaskRender {
        private img_icon: eui.Image;
        private lab_icon: eui.Label;

        public data: task_data;

        protected dataChanged(): void {
            super.dataChanged();
            let task = this.data;
            if(!task){
                return;
            }
            let cfg = TaskUtil.getCfg(task.task_id);
            this.currentState = cfg.is_special ? "special" : "default";
            let rewards: number[][] = cfg.rewards;
            if(rewards.length > 1){
                let index = rewards[1][0];
                let iconCnt = rewards[1][1];
                let propCfg: PropConfig = GameConfig.getPropConfigById(index);
                this.img_icon.source = propCfg.icon;
                this.lab_icon.text = StringUtil.getHurtNumStr(iconCnt);
            }
            else {
                this.img_icon.source = "";
                this.lab_icon.text = "";
            }
        }
    }
}