namespace game.mod.yishou {

    import GameNT = base.GameNT;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class YishouShouguBagMdr extends MdrBase {
        private _view: YishouShouguBagView = this.mark("_view", YishouShouguBagView);
        private _proxy: YishouProxy;
        private _listIcon: eui.ArrayCollection;
        private _listType: eui.ArrayCollection;
        private _selIdx = 0;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
            this._view.list.itemRenderer = YishouShouguBagIconName;
            this._view.list.dataProvider = this._listIcon = new eui.ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._listType = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickListType, this);
            // addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickIcon, this);
            // this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_EQUIP_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this.initScroller();
        }

        private initScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        private onUpdateView(): void {
            this.updateListType();
            this.updateView();
        }

        private updateListType(): void {
            let ary = YishouTypeAry;
            let list: TabBaseItemData[] = [];
            for (let type of ary) {
                list.push({
                    icon: `yishou_second_tap${type}`,
                    showHint: this._proxy.canOnekey(type)
                });
            }
            this._listType.replaceAll(list);
            this._view.list_type.selectedIndex = this._selIdx = 0;
        }

        private updateView(): void {
            let list = this.getIconList();
            let cnt = list.length;
            if (list.length < YishouBagCnt) {
                list.length = YishouBagCnt;
            }
            this._listIcon.replaceAll(list);

            let bagProxy: IBagProxy = getProxy(ModName.Bag, ProxyType.Bag);
            let totalCnt = bagProxy.getBagMaxCnt(BagType.Yishou);
            this._view.lb_num.textFlow = TextUtil.parseHtml(getLanById(LanDef.yishou_tips9)
                + TextUtil.addColor(`${cnt}/${totalCnt}`, WhiteColor.GREEN));
        }

        private getIconList(): PropData[] {
            let type = this.getType();
            return this._proxy.getBagDatas(type);
        }

        private onClickListType(e: eui.ItemTapEvent): void {
            let idx = e.itemIndex;
            if (this._selIdx == idx) {
                return;
            }
            let type = YishouTypeAry[idx];
            if (!this._proxy.checkTypeActed(type, true)) {
                this._view.list_type.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = idx;
            this.initScroller();
            this.updateView();
        }

        //获取类型
        private getType(): YishouType {
            return YishouTypeAry[this._selIdx];
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.Yishou) > -1) {
                this.onUpdateView();
            }
        }

        private onClickIcon(e: eui.ItemTapEvent): void {
            let data = e.item as PropData;
            if (!data) {
                return;
            }
            facade.showView(ModName.Yishou, YiShouViewType.ShouguEquipTips2, data);
        }
    }
}