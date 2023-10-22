namespace game.mod.more {

    import XianweiBaseConfig = game.config.XianweiBaseConfig;

    export class XianweiCommonItem extends BaseRenderer {
        private img_role: eui.Image;
        private img_title: eui.Image;
        private lab_cnt: eui.Label;

        private _proxy: XianweiProxy;
        data: string;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianwei);
        }

        protected dataChanged(): void {
            let key: string = this.data;
            let cfg: XianweiBaseConfig = this._proxy.cfgArr.get(key);
            this.img_title.source = `xianweititle${key}`;
            this.lab_cnt.text = `${cfg.position_quantity}`;
            this.img_role.visible = this._proxy.checkJob(key);
        }

        public setData(key: string): void {
            this.data = key;
        }
    }
}