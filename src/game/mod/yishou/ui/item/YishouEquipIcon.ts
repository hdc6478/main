namespace game.mod.yishou {


    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class YishouEquipIcon extends BaseRenderer {
        public gr_star: eui.Group;
        public starListView: game.mod.StarListView;
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public gr_eft: eui.Group;
        public img_quality: eui.Image;

        data: IYishouEquipIconData;

        constructor() {
            super();
            this.skinName = `skins.yishou.YishouEquipIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.removeEft();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this.redPoint.visible = !!data.showHint;
            this.gr_star.visible = !!data.isActed;

            if (!data.isActed) {
                this.img_icon.source = `icon_jia`;
                this.img_quality.source = ResUtil.getPropQualityImg(0, true);
            } else {
                let cfg = GameConfig.getEquipmentCfg(data.index);
                this.img_quality.source = ResUtil.getPropQualityImg(cfg && cfg.quality || 0, true);
                this.img_icon.source = cfg && cfg.icon || '';
                let star = Math.floor(data.index / 10) % 10;
                this.gr_star.visible = star > 0;
                this.starListView.updateStar(star, star);
            }

            this.addIconEft();
        }

        private onClick(): void {
            let data = this.data;
            if (data && data.index) {
                facade.showView(ModName.Yishou, YiShouViewType.ShouguEquipTips, data.index);
            } else {
                PromptBox.getIns().show(getLanById(LanDef.not_equip));
            }
        }

        private addIconEft(): void {
            let cfg = this.data.index ? GameConfig.getEquipmentCfg(this.data.index) : null;
            if (!cfg || cfg.quality < QualityType.RED) {
                this.removeEft();
                return;
            }
            let eftSrc = "pinzhihex_" + cfg.quality;
            if (this.eftSrc == eftSrc) {
                return;
            }
            this.removeEft();
            this.addEftByParent(eftSrc, this.gr_eft);
        }
    }

    export interface IYishouEquipIconData {
        isActed: boolean;
        showHint: boolean;
        index: number;//装备id
    }
}