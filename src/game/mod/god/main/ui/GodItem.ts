namespace game.mod.god {

    import facade = base.facade;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class GodItem extends BaseRenderer {
        private _proxy: GodProxy;
        private redPoint: eui.Image;
        private img_mask: eui.Image;
        private name_item: AvatarNameItem;
        private img_bg: eui.Image;
        private group_eft:eui.Group;

        public data: GodListData;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.God).retProxy(ProxyType.God);
        }

        protected onRemoveFromStage(): void {
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this.data.type);
            this.img_mask.visible = !this._proxy.getActivate(this.itemIndex + 1);
            this.img_bg.source = ResUtil.getUiPng(`god_big_card_${cfg.itype}`);
            this.redPoint.visible = HintMgr.getHint([ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain, `0${this.itemIndex + 1}`]);

            let shenling: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, cfg.image_id);
            this.name_item.updateShow(cfg.name, shenling.quality);
            let pin: number = this._proxy.getPin() || 1;
            this.name_item.updateSr(`pin_${pin}`);

            this.removeEft();
            this.addEftByParent(UIEftSrc.Nvshenlu, this.group_eft);
        }
    }
}