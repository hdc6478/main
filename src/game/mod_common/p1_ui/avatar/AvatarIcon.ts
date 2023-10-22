namespace game.mod {

    import ShenlingConfig = game.config.ShenlingConfig;

    export class AvatarIcon extends BaseRenderer {
        public img_quality: eui.Image;
        public img_icon: eui.Image;
        public img_battle: eui.Image;
        public img_type: eui.Image;
        public starListView: game.mod.StarListView;
        public redPoint: eui.Image;

        data: AvatarItemData;

        constructor() {
            super();
            this.skinName = `skins.common.AvatarIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.cfg) {
                this.defaultView();
                return;
            }

            let cfg = data.cfg;
            this.img_icon.source = cfg.icon;
            this.img_quality.source = ResUtil.getPropQualityImg(cfg.quality);
            this.img_battle.visible = !!data.isBattle;
            this.redPoint.visible = !!data.showHint;
            let star = this.data.star || 0;
            this.starListView.visible = true;
            this.starListView.updateStar(star, star);
            this.img_type.visible = false;

            let propData = PropData.create(data.cfg.index);
            if (propData.type == ConfigHead.Shenling) {
                //神灵
                let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let shenlingCfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, data.cfg.index);
                this.img_type.visible = true;
                this.img_type.source = `shuxingtubiao_${shenlingCfg.type}`;
                let star = this.data.star;
                if (star) {
                    let maxUpStar = shenlingProxy.getMaxStar(this.data.cfg.index);
                    let src = star > maxUpStar ? 'moon_yellow' : 'star_6';
                    let starCnt = star > maxUpStar ? star - maxUpStar : star;
                    this.starListView.updateStarSrc(starCnt, src);
                } else {
                    this.starListView.updateStar(0, 0);
                }
            }
        }

        //默认界面+
        protected defaultView(): void {
            this.img_icon.source = `icon_jia`;
            this.img_battle.visible = this.img_type.visible = this.starListView.visible = false;
            this.img_quality.source = ResUtil.getPropQualityImg(QualityType.DEFAULT);
            this.redPoint.visible = false;
        }
    }
}