namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;

    export class XianjieLuandouSkillBtn extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public img_mask: eui.Image;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;

        data: number;
        private _proxy: XianjieLuandouProxy;
        private _shape: egret.Shape;

        constructor() {
            super();
            this.skinName = `skins.more.XianjianLuandouSkillBtnSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = base.facade.retMod(ModName.More).retProxy(ProxyType.XianjieLuandou);
            this._shape = new egret.Shape();
            this._shape.x = this.width * 0.5;
            this._shape.y = this.height * 0.5;
            this.addChild(this._shape);

            this.img_mask.mask = this._shape;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (data == null) {
                return;
            }
            let cfg = GameConfig.getParamConfigById('xianjieluandou_lingshi_buff');
            let cfgValue = cfg.value as number[][];
            let value = cfgValue[data];
            let buffId = value[1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            this.img_icon.source = buffCfg && buffCfg.icon || '';
            this.lb_num.text = data + '';

            this.changeGraphics(data);
        }

        private changeGraphics(cnt: number): void {
            let angle = cnt / 4 * 360;
            let height = 190 * 0.5;

            let radius = height * 0.5;
            let shape = this._shape;
            shape.graphics.clear();
            shape.graphics.beginFill(0xffffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(0, height * 0.5);
            shape.graphics.drawArc(0, 0, radius, 90 * Math.PI / 180, (angle + 90) * Math.PI / 180, false);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    }
}