namespace game.mod.more {

    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;

    export class ArtifactTypeItem extends BaseRenderer {

        // private lab_name: eui.Label;
        private img_name: eui.Image;
        private img_icon: eui.Image;
        private img_mask: eui.Image;
        private redPoint: eui.Image;

        public data: HuangguShenqiConfig;

        protected onAddToStage(): void {
        }

        protected onRemoveFromStage(): void {
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg: HuangguShenqiConfig = this.data;
            // this.lab_name.text = cfg.name;
            this.img_name.source = `shenqi_name_${cfg.index}`;
            this.img_icon.source = `shenqi_${cfg.index}`;

            let proxy: SkyPalaceProxy = getProxy(ModName.More, ProxyType.SkyPalace);
            let info = proxy.getInfo(cfg.index);
            this.img_mask.visible = !info || !info.level;

            this.redPoint.visible = HintMgr.getHint([ModName.More, MoreViewType.SkyPalace, MdrTabBtnType.TabBtnType01, `${cfg.index}`]);
        }
    }
}