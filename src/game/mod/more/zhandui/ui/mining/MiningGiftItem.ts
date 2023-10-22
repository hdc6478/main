namespace game.mod.more {

    import HelotTargetRewardConfig = game.config.HelotTargetRewardConfig;
    import MainTask1Config = game.config.MainTask1Config;

    export class MiningGiftItem extends BaseGiftItemRender {
        data: HelotTargetRewardConfig;

        private _proxy: MiningProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Mining);
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }

            this._listData.source = cfg.reward;

            let is_bought: boolean = this._proxy.getGiftBought(cfg.index);
            let task_data = TaskUtil.getTask(cfg.task_id);
            let color_str: string = TextUtil.addEnoughColor(task_data.schedule, task_data.target);
            let task_cfg: MainTask1Config = TaskUtil.getCfg(cfg.task_id);
            this.lb_desc.textFlow = TextUtil.parseHtml(task_cfg.desc + color_str);

            let bool: boolean = task_data.schedule >= task_data.target;
            this.img_bought.visible = is_bought || !bool;
            if (this.img_bought.visible) {
                this.img_bought.source = is_bought ? "lvseyigoumai" : "hongseweiwancheng";
            }
            this.btn_buy.visible = !is_bought && bool;

            if (this.btn_buy.visible) {
                this.btn_buy.resetCost();
                if (bool) {
                    if (cfg.cost) {
                        this.btn_buy.label = "";
                        this.btn_buy.setCost(cfg.cost);
                    } else {
                        this.btn_buy.label = "领取";
                    }
                }
                this.btn_buy.setHint(!is_bought && bool);
            }
        }

        protected onClick() {
            if (this.data.cost && !BagUtil.checkPropCnt(this.data.cost[0], this.data.cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_zhandui_target_buy(this.data.index);
        }
    }
}
