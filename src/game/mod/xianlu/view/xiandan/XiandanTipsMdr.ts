namespace game.mod.xianlu {

    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    export class XiandanTipsMdr extends MdrBase {
        private _view: XiandanTipsView= this.mark("_view", XiandanTipsView);
        private _proxy: XianluProxy;
        public _showArgs: number;/**仙丹类型*/

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._view.lab_title.text = getLanById(LanDef.xiandan_tips8);

            let desc: string = "";
            let attr = this._proxy.getPillAttrByType(this._showArgs);
            if(attr && attr.showpower){
                desc = TextUtil.getAttrText(attr, BlackColor.GREEN);
            }

            let age = this._proxy.getPillAgeByType(this._showArgs);
            let buffIndex = this._proxy.getBuffIndex(this._showArgs, age);
            if(buffIndex){
                let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffIndex);
                desc += "\n" + (cfg ? cfg.des : "");
            }

            this._view.baseDescItem.updateShow(desc, getLanById(LanDef.xiandan_tips9), 20);
        }
    }
}