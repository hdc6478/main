namespace game.mod.more {

    export class XianmaiZhanbaoMdr extends MdrBase {
        private _view: XianmaiZhanbaoView = this.mark("_view", XianmaiZhanbaoView);
        private _proxy: XianmaiProxy;
        private _listData: eui.ArrayCollection;
        private _listBtn: eui.ArrayCollection;
        private _selIdx: number = 0;

        //todo 个人，宗门
        private _btnData: TabBaseItemData[] = [
            {
                icon: 'gerenzhanbao',
                showHint: false
            },
            {
                icon: 'zongmenzhanbao',
                showHint: false
            }
        ];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();

            this._view.list.itemRenderer = XianmaiZhanbaoItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_ZHANBAO, this.updateView, this);
            this.onNt(MoreEvent.ON_XIANMAI_VIEW_CLOSE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this._listBtn.replaceAll(this._btnData);
            this._view.list_btn.selectedIndex = this._selIdx;
            this._proxy.c2s_xianmai_zhanbao(this._selIdx + 1);
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
        }

        private updateView(): void {
            let logs = this._proxy.getZhanbao(this._selIdx + 1);

            this._view.scroller.visible = logs && logs.length > 0;
            this._view.lb_desc.visible = !this._view.scroller.visible;

            if (this._view.scroller.visible) {
                let list: { type: number, info: msg.xianmai_zhanbao_data }[] = [];
                for (let item of logs) {
                    list.push({
                        type: this._selIdx + 1,
                        info: item
                    });
                }
                this._listData.replaceAll(list);
            }
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;

            this._proxy.c2s_xianmai_zhanbao(this._selIdx + 1);
        }
    }
}