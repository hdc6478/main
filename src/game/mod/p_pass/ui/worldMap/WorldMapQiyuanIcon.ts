namespace game.mod.pass {

    import QiyuanConfig = game.config.QiyuanConfig;

    export class WorldMapQiyuanIcon extends eui.ItemRenderer {

        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapQiyuanIconSkin";
        }

        protected dataChanged(): void {
            super.dataChanged();
            if (!this.data) {
                return;
            }

            let cfg: QiyuanConfig = getConfigByNameId(ConfigName.Qiyuan, this.data);
            if(cfg) {
                this.img_icon.source = cfg.picture;
            }
        }

    }
}