namespace game.mod.more {

    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;
    import LanDef = game.localization.LanDef;

    export class ZhanduiCreateMdr extends MdrBase {
        private _view: ZhanduiCreateView = this.mark("_view", ZhanduiCreateView);
        private _proxy: ZhanduiProxy;
        private _listData: eui.ArrayCollection;
        private _selIdx = 0;
        private _cost: number[];
        private _selCfg: ZhanduiQizhiConfig;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list.itemRenderer = ZhanduiCreateItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_create, egret.TouchEvent.TOUCH_TAP, this.onClickCreate, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._listData.replaceAll(this._proxy.getQizhiCfgList());
            this._view.list.selectedIndex = this._selIdx;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._cost = null;
            this._view.lb_input.text = '';
        }

        private updateView(): void {
            let selCfg: ZhanduiQizhiConfig = this._listData.source[this._selIdx];
            if (!selCfg) {
                return;
            }

            this._selCfg = selCfg;
            this._view.costIcon.visible = true;
            this._cost = this._proxy.getCreateCost();
            this._view.costIcon.updateShow(this._cost);
        }

        private onClickCreate(): void {
            let text = this._view.lb_input.text;
            if (!text) {
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips7));
                return;
            }
            if (this._cost && !BagUtil.checkPropCnt(this._cost[0], this._cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.sendButtonClickCreate(this._selCfg.index, text);
            this.hide();
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this.updateView();
        }
    }
}