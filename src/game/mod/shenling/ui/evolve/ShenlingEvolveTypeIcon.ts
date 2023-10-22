namespace game.mod.shenling {

    import ShenlingConfig = game.config.ShenlingConfig;

    export class ShenlingEvolveTypeIcon extends BaseListenerRenderer {
        public img_di: eui.Image;
        public img_sel: eui.Image;
        public img_icon: eui.Image;
        public img_shuxing: eui.Image;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public redPoint: eui.Image;
        public lb_act: eui.Label;
        public img_lock: eui.Image;

        data: IShenlingEvolveTypeIconData;

        protected onAddToStage() {
            super.onAddToStage();
            this.img_lock.visible = this.gr_lv.visible = this.lb_act.visible
                = this.redPoint.visible = false;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, data.index);
            if (!cfg || !cfg.subtype) {
                return;
            }
            let initQuality = cfg.character[0];
            let idx = data.quality - initQuality;
            let icons = cfg.icons.split(',');
            this.img_icon.source = icons[idx];
            this.img_shuxing.source = ResUtil.getSrQuality(0, data.quality);
            this.img_shuxing.scaleX = this.img_shuxing.scaleY = 1;
            this.img_di.source = `shenling_yuan_${SpecialQuality[data.quality]}`;//todo
        }
    }

    export interface IShenlingEvolveTypeIconData {
        index: number;
        quality: SpecialQualityType;
    }
}