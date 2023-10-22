namespace game.mod.union {


    import shengtai_data = msg.shengtai_data;
    import ShengtanItemConfig = game.config.ShengtanItemConfig;
    import facade = base.facade;

    export class UnionLotteryRewardItem extends BaseRenderer {
        public icon: Icon;
        public lab: eui.Label;
        public lab_time: eui.Label;

        public data: shengtai_data;
        private _proxy: UnionProxy;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            let cfg: ShengtanItemConfig = getConfigByNameId(ConfigName.ShengtanItem, this.data.index);
            this.icon.setData(cfg.reward);
            let prop = getConfigById(cfg.reward[0]);
            let tips: string = getLanById(this._proxy.getTipsByType(this.data.type));
            this.lab.textFlow = TextUtil.parseHtml(StringUtil.substitute(tips, [
                TextUtil.addColor(this.data.name, "0xb14725"),
                TextUtil.addColor(prop.name, "0x238e2c")
            ]));

            this.lab_time.text = TimeUtil.formatTime(this.data.time);
        }
    }

}