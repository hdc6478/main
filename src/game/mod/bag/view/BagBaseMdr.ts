namespace game.mod.bag {

    import ItemTapEvent = eui.ItemTapEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import TouchEvent = egret.TouchEvent;

    export class BagBaseMdr extends MdrBase {
        private _view: BagView = this.mark("_view", BagView);
        private _proxy: BagProxy;

        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _selType: number;/**当前选中的背包类型*/

        protected typeList: {bagType: number, hintTypes?: string[]}[];/**当前选中的背包类型*/
        protected btnType: string;//分页按钮类型

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Bag);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = IconBag;
            this._view.list_item.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initTypeList();
            this.initScroller();
            this.typeUpdateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(this._selType) < 0){
                return;
            }
            this.typeUpdateInfo();
        }

        private onClickAdd() {
            //todo，统一跳转VIP特权
            ViewMgr.getIns().showViewByID(JumpIdx.VipPrivilege);
        }

        private onClickType(e: ItemTapEvent) {
            let type = this.typeList[e.itemIndex].bagType;
            if(type == this._selType){
                return;
            }
            this.setSelType(type);
            this.initScroller();
            this.typeUpdateInfo();
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            for(let i = 0; i < this.typeList.length; ++i){
                let type = this.typeList[i].bagType;
                let hintType = this.typeList[i].hintTypes;
                let icon = "bag_icon" + type;
                let hint = false;
                if(hintType){
                    hint = HintMgr.getHint(hintType);
                }
                datas.push({icon: icon, showHint: hint});
            }
            this._btnList.source = datas;

            let selIndex = 0;//默认选中第一个
            let type = this.typeList[selIndex].bagType;

            let selType = super.decodeShowArgs(true);
            if (selType != null) {
                type = selType;
                for(let i = 0; i < this.typeList.length; ++i){
                    if(type == this.typeList[i].bagType){
                        selIndex = i;
                        break;
                    }
                }
            }
            this.setSelType(type);
            this._view.list_type.selectedIndex = selIndex;
        }

        private setSelType(type: number): void {
            this._selType = type;
            ViewMgr.getIns().lastData = [this.btnType, this._selType + ""];
        }

        private initScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
        }

        private updateItemList(): void {
            let items = BagUtil.getBagsByType(this._selType, true);
            let curCnt = items.length;
            let baseCnt = this._proxy.getBagBaseCnt(this._selType);
            if(items.length < baseCnt){
                items.length = baseCnt;
            }
            this._itemList.replaceAll(items);

            let maxCnt = this._proxy.getBagMaxCnt(this._selType);
            let isTips = curCnt + BagEquipTipsCnt >= maxCnt;
            let cntStr = BagTypeToName[this._selType] + "：" + TextUtil.addColor(curCnt + "/" + maxCnt, isTips ? BlackColor.RED : Color.WHITE);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let list: TabBaseItemData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len && i < this.typeList.length; i++) {
                let btnData = list[i];
                let hintType = this.typeList[i].hintTypes;
                if(!hintType){
                    continue;
                }
                let type = HintMgr.getType(hintType);/**转化为红点类型*/
                if (type != data.node) {
                    continue;
                }
                if(!!btnData.showHint != data.value){//过滤undefined!=false
                    btnData.showHint = data.value;
                    this._btnList.itemUpdated(btnData);
                }
                break;/**找到对应红点后则break，减少循环*/
            }
        }

    }
}