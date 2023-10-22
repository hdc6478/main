namespace game.mod.xianyuan {

    import ChildConfig = game.config.ChildConfig;

    export class ChildHuanzhuangIconSel extends IconSel {

        data: ChildConfig;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.icon.setImgActed(true);
            this.icon.updateIconImg(data.icon);
            this.icon.updateQualityImg(ResUtil.getPropQualityImg(data.quality));
            this.redPoint.visible = false;
        }
    }
}