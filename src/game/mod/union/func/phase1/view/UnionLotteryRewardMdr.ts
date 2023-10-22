namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    /**圣坛更多大奖 */
    export class UnionLotteryRewardMdr extends MdrBase {
        private _view: UnionLotteryRewardView = this.mark("_view", UnionLotteryRewardView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionLotteryRewardItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateView();

            this._view.secondPop.updateTitleStr(getLanById(LanDef.union_title_10));
        }

        private onUpdateView(): void {
            this._listData.source = this._proxy.getShengRewardList();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}