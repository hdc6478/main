namespace game.mod.god {

    import facade = base.facade;

    export class GodLvItemRender extends eui.ItemRenderer {
        public img_icon: eui.Image;

        protected dataChanged(): void {
            let lv = this.itemIndex + 1;
            let _proxy: GodProxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
            let info = _proxy.getInfo(_proxy.iType);
            let level: number = info && info.level || 0;
            // this.img_icon.source = level >= lv ? "lv_icon_404" : "lv_icon_gray_404";
            this.img_icon.source = level % 10 >= lv || level % 10 == 0 && level > 0 ? "shengpin_huangse" : "shengpin_huise";
        }
    }
}