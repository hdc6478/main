namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;

    export class TimeGoddessShelfMdr extends MdrBase {
        private _view: TimeGoddessShelfView = this.mark("_view", TimeGoddessShelfView);
        private _proxy: GoddessRecordProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _list: PropData[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._proxy = this.retProxy(ProxyType.GoddessRecord);
            this._view.list.itemRenderer = TimeGoddessShelfItem;
            this._view.list.dataProvider = this._listData;
            this._view.secondPop.updateTitleStr("祭品");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);

            this.onNt(ConsecrateEvent.ON_CLOSE_CONSECRATE_SHELF, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._list = BagUtil.getBagsByTypeAndPropSubType(BagType.TimeGoddess, PropSubType37.Jipin);
            this._listData.replaceAll(this._list);
        }

        private onClick(): void {
            let num: number = this._proxy.getSpaceCount();
            let idxs: Long[] = [];
            for (let i = 0; i < this._list.length; i++) {
                if (num <= 0) {
                    break;
                }
                let info = this._list[i];
                let len: number = num > info.count ? info.count : num;
                for (let i = 0; i < len; i++) {
                    idxs.push(Long.fromValue(info.index));
                }
                num -= info.count;
            }
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.Gongfeng, null, idxs);
            this.hide();
        }

        protected onHide(): void {
            this._listData.removeAll();
            super.onHide();
        }
    }
}