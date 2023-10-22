namespace game.mod {

    import PropConfig = game.config.PropConfig;
    import facade = base.facade;

    export class AmassItem extends eui.ItemRenderer {

        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public lab_lv: eui.Label;
        public img_gray: eui.Image;
        public redPoint: eui.Image;

        public data: number;

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let index = this.data;
            let _proxy: IConsecrateProxy = facade.retMod(ModName.Consecrate).retProxy(ProxyType.Consecrate);
            let cfg = _proxy.getAmassCfg(index);
            this.lab_name.text = cfg.name;
            let propCfg: PropConfig = GameConfig.getPropConfigById(index);
            this.lab_name.textColor = ColorUtil.getColorByQuality2(propCfg.quality);
            this.img_icon.source = ResUtil.getBigIcon(propCfg.icon);


            let lv = _proxy.getAmassLv(index);
            this.img_gray.visible = lv <= 0;
            this.lab_lv.text = lv + "";
            this.redPoint.visible = _proxy.canAmassItemUp(index);
        }
    }

}