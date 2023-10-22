namespace game.mod.shenling {

    import BuffConfig = game.config.BuffConfig;

    export class ShenLingLingQiSuitComp extends eui.Component {
        public lb_name: eui.Label;
        public lb_desc: eui.Label;
        public img_icon: eui.Image;
        public img_icongray: eui.Image;

        private _proxy: ShenLingLingQiProxy;
        private _index: number;//神灵index

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingLingQiSuitCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingqi);
        }

        /**神灵index*/
        public updateView(index: number): void {
            if (this._index == index) {
                return;
            }
            this._index = index;
            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, this._proxy.getBuffId(index));
            if (!cfg) {
                this.lb_desc.text = this.lb_name.text = '';
                this.img_icon.source = '';
                return;
            }
            this.img_icon.source = cfg.icon;
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.buff_quality)));
            let isAct = this._proxy.isActedSuit(index);
            this.img_icongray.visible = !isAct;
            let color = isAct ? WhiteColor.DEFAULT : WhiteColor.GRAY;
            this.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.des, color));
        }
    }
}