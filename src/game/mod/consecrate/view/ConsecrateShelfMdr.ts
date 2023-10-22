namespace game.mod.consecrate {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import PropertyEvent = eui.PropertyEvent;

    export class ConsecrateShelfMdr extends MdrBase {
        private _view: ConsecrateShelfView = this.mark("_view", ConsecrateShelfView);
        private _proxy: ConsecrateProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _list: PropData[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Consecrate);

            this._view.list.itemRenderer = ConsecrateShelfItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.list, PropertyEvent.PROPERTY_CHANGE, this.onListChange);

            this.onNt(ConsecrateEvent.ON_CLOSE_CONSECRATE_SHELF, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
            this.showGuide();
        }

        private onUpdateView(): void {
            this._list = this._proxy.getPropList();
            // this._listData.source = this._list;
            this._listData.replaceAll(this._list);
        }

        private onClick(): void {
            let num: number = this._proxy.getSpaceCount();
            let idxs: number[] = [];
            for (let i = 0; i < this._list.length; i++) {
                if (num <= 0) {
                    break;
                }
                let info = this._list[i];
                let len: number = num > info.count ? info.count : num;
                for (let i = 0; i < len; i++) {
                    idxs.push(info.index);
                }
                num -= info.count;
            }
            this._proxy.c2s_consecrate_putin(idxs);
            this.hide();
        }

        protected onHide(): void {
            this._listData.removeAll();
            //this._view.list.removeChildren();//需要清除下数据
            GuideMgr.getIns().clear(GuideKey.ConsecrateShelfItem);//清除指引
            super.onHide();
        }

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            let num = this._view.list.numChildren;
            if (!num) {
                return;
            }
            let btn = this._view.list.getChildAt(0) as ConsecrateShelfItem;
            GuideMgr.getIns().show(GuideKey.ConsecrateShelfItem, btn, Handler.alloc(btn, btn.onClick));//指引
        }

        private onListChange(e: PropertyEvent): void {
            if (e.property == "contentHeight") {
                this.showGuide();
            }
        }
    }
}