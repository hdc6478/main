namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import guild_data = msg.guild_data;
    import GuildDonateConfig = game.config.GuildDonateConfig;

    /**仙门列表item */
    export class UnionListItem extends BaseRenderer {

        private btn: Btn;
        private lab_name: eui.Label;
        private lab_limit: eui.Label;
        private lab_leader: eui.Label;
        private lab_count: eui.Label;
        private lab_level: eui.Label;
        private img_apply: eui.Image;

        private _proxy: UnionProxy;

        public data: guild_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            this.btn.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            let data: guild_data = this.data;
            if (!data) {
                return;
            }
            this.lab_name.text = data.guild_name;
            this.lab_leader.text = data.header_name;
            this.lab_level.text = `${data.level}`;
            let cfg: GuildDonateConfig = getConfigByNameId(ConfigName.GuildDonate, data.level);
            if (!cfg) {
                console.error(`仙宗捐献表没有${data.level}级配置`);
                let cfgArr: GuildDonateConfig[] = getConfigListByName(ConfigName.GuildDonate);
                cfg = cfgArr[cfgArr.length - 1];
            }
            this.lab_count.text = `人数：${data.num}/${cfg.num}`;

            if (!this._proxy.isInUnion) {
                let apply: boolean = this._proxy.getApplyStatus(data.id);
                let enough: boolean = data.num >= cfg.num;
                this.btn.visible = !apply && !enough;
                this.img_apply.visible = apply;
            } else {
                this.btn.visible = false;
                this.img_apply.visible = false;
            }

            if (!data.condition) {
                this.lab_limit.text = "无限制";
                return;
            }
            let val: number = data.condition.value;
            if (!data.condition.is_set) {
                this.lab_limit.text = val > 0 ? `${StringUtil.getHurtNumStr(val * 10000)}战力` : "无限制";
            } else {
                this.lab_limit.text = val > 0 ? `${StringUtil.getHurtNumStr(val * 10000)}战力` : "需要审核";
            }
        }

        private onClick(): void {
            if (this._proxy.isInCd) {
                PromptBox.getIns().show("退出仙宗后2小时方可加入");
                return;
            }
            let val: number = this.data.condition.value;
            if (val > 0 && +RoleVo.ins.showpower < val * 10000) {
                PromptBox.getIns().show(`申请需要${val}万战力`);
                return;
            }
            this._proxy.c2s_choice_apply_guild(this.data.id);
        }
    }
}