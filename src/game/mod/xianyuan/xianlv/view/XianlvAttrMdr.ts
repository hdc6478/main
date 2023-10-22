namespace game.mod.xianyuan {

    import LanDef = game.localization.LanDef;

    export class XianlvAttrMdr extends MdrBase {
        private _view: XianlvAttrView = this.mark("_view", XianlvAttrView);
        private _proxy: XianlvProxy;
        private _childProxy: ChildProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
            this._childProxy = this.retProxy(ProxyType.Child);
            this._view.list.itemRenderer = XianlvAttrItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let isMarried = this._proxy.isMarried();
            let list: IXianlvAttrItemData[] = [];
            list.push({
                title: 1,
                attrStr: StringUtil.substitute(getLanById(LanDef.xianlv_tips20), [TextUtil.addColor(this._childProxy.getSharePower() + '', WhiteColor.GREEN)])
            });
            if (isMarried) {
                list.push({
                    title: 2,
                    attrStr: StringUtil.substitute(getLanById(LanDef.xianlv_tips20), [TextUtil.addColor('0', WhiteColor.GREEN)])//todo
                });
            }
            this._listData.replaceAll(list);
        }
    }
}