namespace game.mod.god {


    import facade = base.facade;
    import TiandiShifangConfig = game.config.TiandiShifangConfig;

    export class GodAvatarItem extends BaseRenderer {
        private _proxy: GodProxy;
        private img_icon: eui.Image;
        private img_gray: eui.Image;
        private redPoint: eui.Image;
        private img_name: eui.Image;

        public data: TiandiShifangConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info = this._proxy.getType4Info(this.data.itype);
            this.img_gray.visible = !info;
            this.img_name.source = `god_name_${this.data.itype}`;
            this.img_icon.source = `god_icon_head_${this.data.itype}`;

            this.redPoint.visible = false;
        }

    }
}