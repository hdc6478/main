namespace game.mod.xianyuan {

    export class XianlvInviteRecordMdr extends MdrBase {
        private _view: XianlvInviteRecordView = this.mark("_view", XianlvInviteRecordView);
        private _proxy: XianlvProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianlv);
            this._view.list.itemRenderer = XianlvInviteRecordItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(XianyuanEvent.ON_UPDATE_INVITE_RECORDS, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_xianlv_seeking_info();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let records = this._proxy.getInviteRecords();
            if (records && records.length) {
                this._view.currentState = 'record';
                this._listData.replaceAll(records);
            } else {
                this._view.currentState = 'notrecord';
            }
        }
    }
}