namespace game.mod.jiban {

    import BodyJibanConfig = game.config.BodyJibanConfig;

    export class RoleHuanHuaItem extends IconSel {

        data: BodyJibanConfig;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.icon.updateIconImg(data.icon);
            this.icon.updateQualityImg(ResUtil.getPropQualityImg(data['quality'] || 5));

            let proxy: ShoujiHuanhuaProxy = getProxy(ModName.Jiban, ProxyType.ShoujiHuanhua);
            let isAct = proxy.isActed(data.index);
            if (isAct) {
                this.icon.setImgGray('');
            } else {
                this.icon.setImgGray();
            }

            this.redPoint.visible = proxy.getHuanHuaHint(data.index);
        }
    }
}