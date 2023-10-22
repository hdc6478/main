namespace game.mod.role {

    import attributes = msg.attributes;
    import TouchEvent = egret.TouchEvent;

    export class SuitAttrTipsMdr extends MdrBase {
        private _view: BaseAttrView = this.mark("_view", BaseAttrView);
        private _proxy: SuitProxy;
        private _listData: eui.ArrayCollection;

        /**
         * attr 直接展示
         * attr_id 如果没有attr的，请求attr_id，监听回调刷新界面
         */
        _showArgs: { title: string, attrTitle: string, attr?: attributes, attr_id?: number };

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
            this._view.currentState = 'oneattr';
            this._view.listAttr0.visible = false;
            this._view.listAttr1.itemRenderer = AttrItemRender;
            this._view.listAttr1.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateAttrView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            let args = this._showArgs;
            this._view.secondPop.updateTitleStr(args.title);
            this._view.name0.setTitle(args.attrTitle);
            let attr = args.attr;
            if (!attr && args.attr_id) {
                attr = RoleUtil.getAttr(args.attr_id);
            }
            this.updateAttrView(attr);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateAttrView(): void {
            if (!this._showArgs.attr_id) {
                return;
            }
            let attr = RoleUtil.getAttr(this._showArgs.attr_id);
            this.updateAttrView(attr);
        }

        private updateAttrView(attr: attributes): void {
            let str = TextUtil.getAttrTextAdd(attr);
            if (str) {
                this._listData.replaceAll(str.split('\n'));
            }
        }
    }
}