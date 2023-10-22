namespace game.mod {

    import facade = base.facade;

    export class SurfaceLvItemRender extends eui.ItemRenderer {
        public img_icon: eui.Image;

        protected dataChanged(): void {
            let lv = this.itemIndex + 1;
            let _proxy: ISurfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            let smallLv = _proxy.getSurfaceSmallLv(_proxy.headType);
            this.img_icon.source = smallLv >= lv ? "lv_icon_" + _proxy.headType : "lv_icon_gray_" + _proxy.headType;
        }
    }
}