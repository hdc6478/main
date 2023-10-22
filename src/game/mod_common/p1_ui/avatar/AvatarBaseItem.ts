namespace game.mod {

    import PropConfig = game.config.PropConfig;

    export class AvatarBaseItem extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public img_frame: eui.Image;
        public img_avatar: eui.Image;
        public img_quality: eui.Image;

        /**外显配置 */
        public data: PropConfig;

        constructor() {
            super();
            this.skinName = "skins.common.AvatarBaseItemSkin";
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.updateShow(this.data);
        }

        /**
         * 更新
         * @param cfg 配置中须有quality,icon字段
         */
        public updateShow(cfg: any): void {
            if (!cfg) {
                return;
            }
            this.img_bg.source = ResUtil.getBigBg(cfg.quality);
            this.img_frame.source = ResUtil.getBigFrame(cfg.quality);
            this.img_avatar.source = ResUtil.getBigIcon(cfg.icon);
            this.img_quality.source = ResUtil.getSrQuality(cfg.quality);
        }

        /**单个item设置用*/
        public setData(data: PropConfig): void {
            this.data = data;
        }
    }

}