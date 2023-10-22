namespace game.mod.more {

    import facade = base.facade;
    import HuashenTianfuLeixingConfig = game.config.HuashenTianfuLeixingConfig;

    export class HuashenTianfuTabItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public redPoint: eui.Image;

        public data: HuashenTianfuLeixingConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let _proxy: HuashenProxy = facade.retMod(ModName.More).retProxy(ProxyType.Huashen);
            let isOpen = _proxy.isTianfuTypeOpen(cfg);
            let iconStr = isOpen ? "huashen_icon_" : "huashen_icon_hui_";
            this.img_icon.source = iconStr + cfg.type;
            this.redPoint.visible = _proxy.getTianfuTypeHint(cfg);
        }
    }
}
