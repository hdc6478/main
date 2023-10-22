namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;

    export class XiandiInfoMdr extends EffectMdrBase {
        private _view: XiandiInfoView = this.mark("_view", XiandiInfoView);

        private _proxy: XiandiProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.touchChildren = false;
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.img_bg, egret.TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let tiandi_info = this._proxy.tiandi_info;
            this._view.item1.setData(tiandi_info);
            this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xiandi_tips3));

            let xianhou_info = this._proxy.xianhou_info;
            this._view.item2.setData(xianhou_info);

            let hongyan_info = this._proxy.hongyan_info;
            this._view.item3.setData(hongyan_info);

            this._view.item.showInfo();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}