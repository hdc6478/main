namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class ZcxWinnerListMdr extends MdrBase {
        private _view: ZcxWinnerListView = this.mark("_view", ZcxWinnerListView);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = ZcxWinnerItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(ActivityEvent.ON_ZCX_LUCK_NUM_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_get_zcx_luck_number(3);
        }

        private updateView(): void {
            let list = this._proxy.model.list;
            let top = list[0];
            if (top) {
                this._view.headVip.updateShow(top.head, top.head_frame, top.sex, top.vip);
                this._view.lb_top.text = `${top.name}\n${getLanById(LanDef.zcx_tips22)}:${this._proxy.getSixLuckNum(top.value.toNumber())}`;
            } else {
                this._view.headVip.defaultHeadShow();
                this._view.lb_top.text = '';
            }

            this._listData.replaceAll(list.slice(1));
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}