namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import task_data = msg.task_data;

    export class KuafuDoufaAchieveItem extends BaseListenerRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_not: eui.Image;
        private img_draw: eui.Image;
        private btn_draw: game.mod.Btn;

        private _proxy: CompeteProxy;
        private _rewardList: ArrayCollection;

        public data: task_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected dataChanged(): void {
            let task = this.data;
            if(!task){
                return;
            }
            this.lab_desc.textFlow = TextUtil.parseHtml(TaskUtil.getTaskDesc(task));

            let cfg = TaskUtil.getCfg(task.task_id);
            this._rewardList.source = cfg.rewards.slice(0, 3);

            let canDraw = TaskUtil.canRewardDraw(task);
            let hasDraw = TaskUtil.hasRewardDraw(task);
            let notFinish = !canDraw && !hasDraw;
            this.img_not.visible = notFinish;
            this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
            this.img_draw.visible = hasDraw;
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            TaskUtil.clickTask(this.data);
        }
    }
}
