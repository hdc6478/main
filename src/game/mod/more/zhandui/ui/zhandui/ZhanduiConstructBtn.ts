namespace game.mod.more {

    import JumpConfig = game.config.JumpConfig;
    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;

    export class ZhanduiConstructBtn extends BaseRenderer {
        public iconDisplay: eui.Image;
        public labelDisplay: eui.Label;
        public redPoint: eui.Image;
        public gr_font: eui.Group;

        data: IZhanduiConstructBtnData;

        constructor() {
            super();
            this.skinName = `skins.more.ZhanduiConstructBtnSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this.iconDisplay.scaleX = this.iconDisplay.scaleY = 1;
            this.clearFont(this.gr_font);

            //跳转id
            if (data.gainId) {
                let cfg: JumpConfig = getConfigByNameId(ConfigName.Jump, data.gainId);
                this.iconDisplay.source = cfg && cfg.icon || '';
                return;
            }
            //福利
            if (data.bonus) {
                this.iconDisplay.source = `icon_fuli`;
                this.addBmpFont(data.bonus + '级福', BmpTextCfg[BmpTextType.Zhandui], this.gr_font, true, 1, true, -2);
                return;
            }
            //战旗
            if (data.flag) {
                this.iconDisplay.source = ResUtil.getZhanduiFlag(data.flag);
                this.iconDisplay.scaleX = this.iconDisplay.scaleY = 0.7;
                let cfg: ZhanduiQizhiConfig = getConfigByNameId(ConfigName.ZhanduiQizhi, data.flag);
                this.addBmpFont((cfg.cond || 0) + '级战', BmpTextCfg[BmpTextType.Zhandui], this.gr_font, true, 1, true, -2);
            }
        }
    }

    export interface IZhanduiConstructBtnData {
        gainId?: number;//跳转id
        bonus?: number;//福利
        flag?: number;//战旗
    }
}