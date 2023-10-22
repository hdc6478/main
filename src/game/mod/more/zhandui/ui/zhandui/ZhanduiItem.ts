namespace game.mod.more {

    export class ZhanduiItem extends BaseRenderer {
        public redPoint: eui.Image;
        public img_bg: eui.Image;
        public gr_eft: eui.Group;
        public img_name: eui.Image;
        public lb_lv: eui.Label;

        data: { type: number, showHint: boolean };
        private _jitanProxy: XujieJitanProxy;
        private _jitanEft: number;

        constructor() {
            super();
            this.skinName = `skins.more.ZhanduiItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._jitanProxy = getProxy(ModName.More, ProxyType.XujieJitan);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.redPoint.visible = !!data.showHint;

            this.removeEffect(this._jitanEft);
            if (data.type == 3) {
                let cfg = this._jitanProxy.getHuanhuaCfg();
                if (cfg) {
                    this._jitanEft = this.addAnimate(cfg.index, this.gr_eft);
                }
                let lv = this._jitanProxy.jitan_level;
                this.lb_lv.text = lv + '';
            } else {
                this.img_name.source = `zhandui_jianzhu_name${data.type}`;
                this.img_bg.source = `zhandui_jianzhu${data.type}`;
            }
        }

        public setData(type: XujieType, showHint = false): void {
            this.data = {type, showHint};
        }
    }
}