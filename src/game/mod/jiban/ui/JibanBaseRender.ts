namespace game.mod.jiban {

    import PropConfig = game.config.PropConfig;

    export class JibanBaseRender extends IconSel {
        public data: IJibanBaseRenderData;

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data.cfg;
            let propIndex = cfg.partners[0];
            let propCfg = getConfigById(propIndex) as PropConfig;
            this.icon.updateQualityImg(ResUtil.getPropQualityImg(propCfg.quality));
            this.icon.updateIconImg(propCfg.icon);

            let isAct = this.data.isActed;
            if (!isAct) {
                this.icon.setImgGray();
            } else {
                this.icon.setImgGray("");
            }
            this.redPoint.visible = this.data.showHint;
        }
    }

}