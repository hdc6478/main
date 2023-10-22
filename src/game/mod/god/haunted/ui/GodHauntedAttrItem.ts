namespace game.mod.god {

    import facade = base.facade;
    import TiandiFengduTaozhuangConfig = game.config.TiandiFengduTaozhuangConfig;

    export class GodHauntedAttrItem extends BaseRenderer {
        private _proxy: GodProxy;
        private lab: eui.Label;

        public data: TiandiFengduTaozhuangConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
        }

        protected onRemoveFromStage(): void {

        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data;
            let count: number = this._proxy.getActivateCount();
            this.lab.textFlow = TextUtil.parseHtml(cfg.describe + TextUtil.addEnoughColor( count, cfg.num));
        }
    }
}