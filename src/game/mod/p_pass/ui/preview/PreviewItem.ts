namespace game.mod.pass {

    import PreviewConfig = game.config.PreviewConfig;
    import facade = base.facade;
    import Gate1Config = game.config.Gate1Config;
    import LanDef = game.localization.LanDef;

    export class PreviewItem extends BaseRenderer {

        private _proxy: PassProxy;

        private icon: eui.Image;
        private lab: eui.Label;
        private img_name: eui.Image;
        private img_gray: eui.Image;
        private img_bg: eui.Image;
        private redPoint: eui.Image;

        public data: PreviewConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg: PreviewConfig = this.data;

            this.icon.source = cfg.icon;
            this.redPoint.visible = false;

            let bool: boolean = ViewMgr.getIns().checkMainLine(cfg.scence_limit);
            let bought: boolean = this._proxy.checkBought(cfg.index);
            if (!bool) {
                let gate: Gate1Config = getConfigByNameId(ConfigName.Gate, cfg.scence_limit + 1);
                this.lab.text = `${gate.gate_name}开启`;
            } else {
                this.lab.text = bought ? getLanById(LanDef.tongtian4) : "已开启";
            }
            let enough: boolean = BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1]);
            this.redPoint.visible = bool && !bought && enough;
            this.img_gray.visible = !bool;
        }
    }

}