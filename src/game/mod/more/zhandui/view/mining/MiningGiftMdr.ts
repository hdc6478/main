namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import GameNT = base.GameNT;

    export class MiningGiftMdr extends MdrBase {
        private _view: MiningGiftView = this.mark("_view", MiningGiftView);
        private _proxy: MiningProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _btnList: ArrayCollection = new ArrayCollection();

        private _type: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Mining);

            this._view.list.itemRenderer = MiningGiftItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onTabChanged, this);

            this.onNt(MoreEvent.ON_UPDATE_MINING_GIFT_INFO, this.onUpdateView, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onUpdateTask, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateType();
            this.onUpdateView();
        }

        private onUpdateType(): void {
            let list: TabBaseItemData[] = [
                {
                    icon: "tubiao_kuangzhu",
                    showHint: false
                },
                {
                    icon: "tubiao_xiannu",
                    showHint: false
                }
            ];
            this._btnList.source = list;
            this._view.list_type.selectedIndex = 0;
            this._type = this._view.list_type.selectedIndex + 1;
        }

        private onUpdateView(): void {
            // this._view.img_bg.source = ResUtil.getUiJpg("guanggaotu_mingyunhaoli_ouhuang");

            let list = this._proxy.getGiftList(this._type);
            this._listData.replaceAll(list);
            this._view.list.scrollV = 0;
        }

        private onUpdateTask(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Mining) > -1) {
                this.onUpdateView();
            }
        }

        protected onTabChanged(e: ItemTapEvent) {
            this._type = e.itemIndex + 1;
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}