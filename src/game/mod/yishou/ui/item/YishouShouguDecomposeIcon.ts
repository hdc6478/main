namespace game.mod.yishou {

    export class YishouShouguDecomposeIcon extends IconSelMany {

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.prop) {
                return;
            }

            let prop = data.prop;
            this.icon.setData(prop, IconShowType.NotTips);
            this.icon.updateName();
            this.icon.updateQualityImg(ResUtil.getPropQualityImg(prop.quality));
            this.icon.updateIconImg(prop.cfg.icon);

            this.img_sel.visible = !!data.sel;
        }
    }
}