namespace game.mod.union {

    import facade = base.facade;
    import guild_yibao_help_struct = msg.guild_yibao_help_struct;
    import GuildYibaoBoxConfig = game.config.GuildYibaoBoxConfig;
    import TouchEvent = egret.TouchEvent;

    export class UnionTreasureHelpItem extends BaseRenderer {

        private lab: eui.Label;
        private btn: Btn;

        private _proxy: UnionProxy;
        public data: guild_yibao_help_struct;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let job_str: string = `[${this._proxy.getJobTextByJob(this.data.guild_job)}]`;
            let name_str: string = this.data.name;
            let content: string = "邀请你协助开启";
            let cfg: GuildYibaoBoxConfig = getConfigByNameId(ConfigName.GuildYibaoBox, this.data.boss_index);
            let box_str: string = TextUtil.addColor(cfg.box_name, ColorUtil.getColorByQuality1(cfg.box_quality));
            this.lab.textFlow = TextUtil.parseHtml(job_str + name_str + content + box_str);
        }

        private onClick(): void {
            this._proxy.c2s_guild_yibao_click(6, null, this.data.u_id);
        }

    }

}