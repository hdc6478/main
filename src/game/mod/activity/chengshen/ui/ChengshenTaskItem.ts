namespace game.mod.activity {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import task_data = msg.task_data;
    import LanDef = game.localization.LanDef;
    import MainTask1Config = game.config.MainTask1Config;

    export class ChengshenTaskItem extends BaseRenderer {
        private lab_desc: eui.Label;
        private icon: game.mod.Icon;
        private img_draw: eui.Image;
        private btn_draw: game.mod.Btn;

        private _proxy: ChengshenProxy;
        public data: task_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClickDraw, this);
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Chengshen);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let task = this.data;
            let cfg: MainTask1Config = TaskUtil.getCfg(task.task_id);

            // let descStr = getLanById("chengshen_task_tips" + this._proxy.type);
            // descStr = StringUtil.substitute(descStr, [task.target]);
            this.lab_desc.textFlow = TextUtil.parseHtml(cfg.desc);

            let reward = cfg.rewards.length > 0 ? cfg.rewards[0] : null;
            this.icon.data = reward;

            let hasDraw = TaskUtil.hasRewardDraw(task);
            this.btn_draw.visible = !hasDraw;
            this.img_draw.visible = hasDraw;
            if(this.btn_draw.visible){
                let canDraw = TaskUtil.canRewardDraw(task);;
                this.btn_draw.redPoint.visible = canDraw;
                if(canDraw){
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_draw.setYellow();
                }
                else {
                    let gotoStr = getLanById("chengshen_goto" + this._proxy.type);
                    this.btn_draw.labelDisplay.text = gotoStr;
                    this.btn_draw.setBlue();
                }
            }
        }

        private onClickDraw(): void {
            TaskUtil.clickTask(this.data);
        }

    }
}
