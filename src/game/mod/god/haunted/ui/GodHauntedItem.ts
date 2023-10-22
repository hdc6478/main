namespace game.mod.god {

    import facade = base.facade;
    import TiandiFengduBaiguiluConfig = game.config.TiandiFengduBaiguiluConfig;

    export class GodHauntedItem extends BaseRenderer {
        private _proxy: GodProxy;
        private img_sr: eui.Image;
        private img_mark: eui.Image;
        private img_bg: eui.Image;
        private name_item: AvatarNameItem;

        public data: TiandiFengduBaiguiluConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data;
            this.img_mark.visible = !this._proxy.getActivateCard(cfg.index);
            this.name_item.updateShow(cfg.name);
            this.name_item.updateSr("");
            this.img_sr.source = `avatarquality${cfg.quality}`;

            this.img_bg.source = `tiandilu_datu${cfg.index}`;
        }
    }
}