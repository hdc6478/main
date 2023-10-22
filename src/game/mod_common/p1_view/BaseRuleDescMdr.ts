namespace game.mod {

    /**
     * 规则说明
     */
    export class BaseRuleDescMdr extends MdrBase {
        private _view: BaseRuleDescView = this.mark('_view', BaseRuleDescView);

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit() {
            super.onInit();
        }

        protected onShow() {
            super.onShow();
            this._view.lb_desc.textFlow = TextUtil.parseHtml(this._showArgs[0]);
            this._view.secondPop.updateTitleStr(this._showArgs[1]);
        }
    }

}