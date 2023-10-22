namespace game.mod.more {

    import xianwei_common_log_data = msg.xianwei_common_log_data;

    export class XianweiTipsItem extends BaseRenderer {

        private lab: eui.Label;
        private _proxy: XianweiProxy;
        data: xianwei_common_log_data;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);
        }

        protected dataChanged(): void {
            let cfg = this._proxy.cfgArr.get(`${this.data.stage}_${this.data.index}`);
            let lose_name: string = this.data.lose_name || cfg.name;
            let str: string = `${this.data.win_name}成功挑战${lose_name}，成为${cfg.name}。`
            this.lab.textFlow = TextUtil.parseHtml(str);
        }
    }
}
