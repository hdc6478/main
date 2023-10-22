namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class SummonGiftMdr extends MdrBase {
        private _view: SummonGiftView = this.mark("_view", SummonGiftView);
        private _proxy: SummonProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _btnList: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Summon);

            this._view.list.itemRenderer = SummonGiftItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;


        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onTabChanged, this);

            this.onNt(ActivityEvent.ON_UPDATE_SUMMON_GIFT, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr(getLanById(LanDef.mingyunhaoli));

            this.onUpdateType();
            this.onUpdateView();
        }

        private onUpdateType(): void {
            let list: TabBaseItemData[] = [
                {
                    icon: "jifentubiao",
                    showHint: false
                },
                {
                    icon: "feiqiutubiao",
                    showHint: false
                },
                {
                    icon: "ouhuangtubiao",
                    showHint: false
                }
            ];
            this._btnList.source = list;
            this._view.list_type.selectedIndex = 0;
            this._proxy.mdrType = this._view.list_type.selectedIndex + 1;
        }

        private onUpdateView(): void {
            const type: number = this._proxy.mdrType;
            if (type == 3) {
                this._view.img_bg.source = ResUtil.getUiJpg("guanggaotu_mingyunhaoli_ouhuang");
                this._view.img_type.source = "";
                this._view.lab_count.text = "";
            } else {
                this._view.img_bg.source = ResUtil.getUiJpg("guanggaotu_mingyunhaoli");
                this._view.img_type.source = `jifen_${type}`;
                this._view.lab_count.text = `${this._proxy.getCountByType(type)}`;
            }
            this._view.lab_tips.text = getLanById(this._proxy.getTipsByType(type));

            let list = this._proxy.getGiftCfgByType(type);
            this._listData.source = list;
            this._view.list.scrollV = 0;
        }

        protected onTabChanged(e: ItemTapEvent) {
            this._proxy.mdrType = e.itemIndex + 1;
            this.onUpdateView();
        }

        protected onHide(): void {
            this._proxy.mdrType = 1;
            super.onHide();
        }
    }
}