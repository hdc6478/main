namespace game.mod.god {


    import TiandiTianlongJihuoConfig = game.config.TiandiTianlongJihuoConfig;
    import facade = base.facade;

    export class GodDragonoathItem extends BaseRenderer {

        private _proxy: GodProxy;

        public img_icon: eui.Image;
        // public lab_name: eui.Label;
        public img_lock: eui.Image;
        public lab_level: eui.Label;
        public redPoint: eui.Image;
        public name_item: AvatarNameItem;

        public data: TiandiTianlongJihuoConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data;
            let info = this._proxy.getType3Info(cfg.itype);
            let level: number = info && info.level || 0;
            this.img_lock.visible = level == 0;
            this.lab_level.text = `${level}`;
            this.name_item.updateShow(cfg.name);
            this.img_icon.source = `god_icon_img_${cfg.itype}`;
        }

    }
}