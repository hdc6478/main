namespace game.mod.xianlu {

    import LinggenLeixingConfig = game.config.LinggenLeixingConfig;
    import facade = base.facade;

    export class LinggenTabItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public redPoint: eui.Image;

        public data: LinggenLeixingConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let _proxy: XianluProxy = facade.retMod(ModName.Xianlu).retProxy(ProxyType.Xianlu);
            let isOpen = _proxy.isLinggenTypeOpen(cfg);
            let iconStr = isOpen ? "linggen_icon" : "linggen_icon_hui";
            this.img_icon.source = iconStr + cfg.type;
            this.redPoint.visible = _proxy.getLinggenTypeHint(cfg);
        }
    }
}
