namespace game.mod.more {

    import HonourConfig = game.config.HonourConfig;
    import LanDef = game.localization.LanDef;

    export class HonourItem extends BaseListenerRenderer {
        public lb_limitcnt: eui.Label;
        public lb_taskdef: eui.Label;
        public icon: game.mod.Icon;
        public lb_status: eui.Label;
        public img_status: eui.Image;
        public redPoint: eui.Image;

        data: IHonourItemData;
        private _proxy: HonourProxy;

        constructor() {
            super();
            this.skinName = `skins.more.HonourItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = base.facade.retMod(ModName.More).retProxy(ProxyType.Honour);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = data.cfg;
            this.lb_limitcnt.text = StringUtil.substitute(getLanById(LanDef.honour_tips2), [cfg.person_limit]);
            let taskId = cfg.target;
            let taskData = TaskUtil.getTask(taskId);
            let taskDesc = TaskUtil.getTaskDescNotSchedule(taskData);
            this.lb_taskdef.textFlow = TextUtil.parseHtml(taskDesc);
            this.icon.data = cfg.rewards[0];

            this.redPoint.visible = this._proxy.getHintByTypeIndex(data.type, cfg.index);

            let hasDraw = TaskUtil.hasRewardDraw(taskData);
            if (hasDraw) {
                //已领取
                this.img_status.visible = true;
                this.img_status.source = 'lvseyilingqu';
                this.lb_status.textFlow = TextUtil.parseHtml(TextUtil.addColor(getLanById(LanDef.maid_cue16), WhiteColor.GREEN));
            } else {
                //未完成，已领完
                let isFinish = data.info && data.info.is_finish == 1;
                this.img_status.visible = isFinish;
                this.img_status.source = isFinish ? 'hongseyilingwan' : '';
                this.lb_status.textFlow = TextUtil.parseHtml(TextUtil.addColor(getLanById(LanDef.maid_cue17), WhiteColor.RED));
            }
        }
    }

    export interface IHonourItemData {
        type: HonourType;
        cfg: HonourConfig;
        info: msg.honour_info;
    }
}