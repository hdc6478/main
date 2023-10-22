namespace game.mod.union {


    import LanDef = game.localization.LanDef;

    /**首次欢迎界面 */
    export class UnionFirstMdr extends MdrBase {
        private _view: UnionFirstView = this.mark("_view", UnionFirstView);
        private _proxy: UnionProxy;


        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.img_bg.source = ResUtil.getUiPng("yuanhua_1");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let model = this._proxy.model;
            model.show_welcome = false;
            this._view.head.updateHeadShow(model.hero.head, model.hero.head_frame, model.hero.sex);
            this._view.lab_name.text = model.hero.name;

            this._view.lab_tips.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.union_tips_1), [
                TextUtil.addColor(RoleVo.ins.name, "0x238e2c"),
                TextUtil.addColor(this._proxy.model.name, "0x238e2c")
            ]));
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}