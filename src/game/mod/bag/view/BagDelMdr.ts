namespace game.mod.bag {

    import ItemTapEvent = eui.ItemTapEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import prop_tips_data = msg.prop_tips_data;

    export class BagDelMdr extends MdrBase {
        private _view: BagDelView = this.mark("_view", BagDelView);
        private _proxy: BagProxy;

        private _itemList2: ArrayCollection;
        private _itemList: ArrayCollection;

        private _itemCnt2: number = 5;//格子数
        private _itemCnt: number = 20;//格子数

        private _items: PropData[];
        private _selItems: PropData[];//显示选中的item列表
        private _finalItems: PropData[];//最终选中分解的物品，包含具体数量

        private _selCnt: number;//选中的数量，默认1
        private _selItem: PropData;//显示选中的item

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Bag);

            this._itemList2 = new ArrayCollection();
            this._view.list_item2.itemRenderer = Icon;
            this._view.list_item2.dataProvider = this._itemList2;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = IconSelMany;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_del, TouchEvent.TOUCH_TAP, this.onClickDel);
            addEventListener(this._view.btn_min, TouchEvent.TOUCH_TAP, this.onClickMin);
            addEventListener(this._view.btn_subtractTen, TouchEvent.TOUCH_TAP, this.onClickSubtractTen);
            addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_addTen, TouchEvent.TOUCH_TAP, this.onClickAddTen);
            addEventListener(this._view.btn_max, TouchEvent.TOUCH_TAP, this.onClickMax);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_gotoact, egret.TouchEvent.TOUCH_TAP, this.onClickGotoAct, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initViewShow();
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(BagType.Material) < 0 && types.indexOf(BagType.RoleEquip) < 0) {
                return;
            }
            this.onInfoUpdate();
        }

        //前往捐献
        private onClickGotoAct(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.UnionStorage, null, true, getLanById(LanDef.xianzong_tips21));
        }

        private onClickItem(e: ItemTapEvent): void {
            let data: IconSelManyData = e.item;
            if (!data) {
                return;
            }
            let item = e.itemRenderer as IconSelMany;
            data.selTrue = data.sel = !data.sel;
            item.setData(data);
            this.updateItemSel(data);
            this.selItemUpdate();
        }

        private onClickDel(): void {
            if (!this._finalItems || !this._finalItems.length) {
                PromptBox.getIns().show(getLanById(LanDef.resolve_tips5));
                return;
            }
            let props: prop_tips_data[] = [];
            for (let p of this._finalItems) {
                let d = new prop_tips_data();
                d.idx = p.prop_id;
                d.cnt = p.count;
                props.push(d);
            }
            this._proxy.c2s_prop_one_key_resolve(props);
        }

        private onClickMin(): void {
            this.checkCnt(1, false);
        }
        private onClickSubtractTen(): void {
            this.subtractSelCnt(10);
        }
        private onClickSubtract(): void {
            this.subtractSelCnt(1);
        }
        private onClickAdd(): void {
            this.addSelCnt(1);
        }
        private onClickAddTen(): void {
            this.addSelCnt(10);
        }
        private onClickMax(): void {
            if (!this._selItem) {
                return;
            }
            let maxCnt = this._selItem.count;
            this.checkCnt(maxCnt, true);
        }

        private subtractSelCnt(subtractCnt: number): void {
            if (!this._selItem) {
                return;
            }
            let cnt = Math.max(1, this._selCnt - subtractCnt);
            this.checkCnt(cnt, false);
        }

        private addSelCnt(addCnt: number): void {
            if (!this._selItem) {
                return;
            }
            let cnt = Math.min(this._selItem.count, this._selCnt + addCnt);
            this.checkCnt(cnt, true);
        }

        private checkCnt(cnt: number, isAdd: boolean): void {
            if (cnt == this._selCnt) {
                let tips = isAdd ? LanDef.max_value : LanDef.min_value;
                PromptBox.getIns().show(getLanById(tips));
                return;
            }
            this.setSelCnt(cnt);
        }

        private setSelCnt(cnt: number): void {
            this._selCnt = cnt;
            this.selCntUpdate();
        }

        private initViewShow(): void {
            this._view.lab_desc1.text = getLanById(LanDef.resolve_tips2);
            this._view.lab_desc2.text = getLanById(LanDef.resolve_tips4);
            this._selCnt = 1;
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.initSelItems();
            this.selItemUpdate();
        }

        private updateItemList(): void {
            this._items = BagUtil.getBagsByTypeAndQuality(BagType.RoleEquip, EquipMeltQuality + 1);
            let propList = BagUtil.getBagsByType(BagType.Material);
            for (let p of propList) {
                if (!p.resolve || !p.resolve.length) {
                    continue;
                }
                this._items.push(p);
            }
            this._items.sort(SortTools.sortProp);

            let items: IconSelManyData[] = [];
            for (let p of this._items) {
                items.push({ prop: p, sel: false, selTrue: false });
            }

            if (items.length < this._itemCnt) {
                items.length = this._itemCnt;
            }
            this._itemList.replaceAll(items);
        }

        /**【ID1015569】分解优化。不需要默认勾选第一个，满足品质全勾选即可*/
        private initSelItems(): void {
            // this._selItems = this._items.length ? [this._items[0]] : [];
            // this._finalItems = this._items.length ? [PropData.clone(this._items[0])] : [];
            // if(this._selItems.length){
            //     let list: IconSelManyData[]  = this._itemList.source;
            //     let itemData = list[0];
            //     itemData.sel = true;
            //     this._itemList.itemUpdated(itemData);
            // }

            //【ID1015424】 分解优化
            let selItems: PropData[] = [];
            if (this._items.length) {
                let list: IconSelManyData[] = this._itemList.source;
                let size = list.length;
                for (let i = 0; i < size; i++) {
                    let itemData = list[i];
                    if (!itemData || !itemData.prop) {
                        continue;
                    }
                    //【ID1015569】分解优化。不需要默认勾选第一个，满足品质全勾选即可
                    let prop = itemData.prop;
                    let headType = PropData.getPropParse(prop.index);
                    if (headType == ConfigHead.Equip) {
                        let propType = PropData.getPropParse(prop.index, PropParseType.PropType);
                        if (propType == EquipPropType.RoleEquip && prop.quality <= QualityType.RED) {//需求是选中红色品质以下的角色装备
                            itemData.selTrue = itemData.sel = true;
                            selItems.push(PropData.clone(itemData.prop))
                        }
                    }
                    this._itemList.itemUpdated(itemData)
                }
            }
            this._selItems = selItems.concat();
            this._finalItems = selItems.concat();
        }

        private updateItemSel(data: IconSelManyData): void {
            if (data.sel) {
                //选中
                this._selItems.push(data.prop);
                this._finalItems.push(PropData.clone(data.prop));
            }
            else {
                //取消选中
                for (let i = 0; i < this._selItems.length; ++i) {
                    let p = this._selItems[i];
                    if (p.prop_id.eq(data.prop.prop_id)) {
                        this._selItems.splice(i, 1);
                        this._finalItems.splice(i, 1);
                        break;
                    }
                }
            }
        }
        /**选中刷新时候更新*/
        private selItemUpdate(): void {
            this.updateSelItem();
            this.selCntUpdate();
        }

        //显示最后一个选中的道具
        private updateSelItem(): void {
            let lastSelId: Long = this._selItem ? this._selItem.prop_id : null;
            this._selItem = this._selItems.length ? this._selItems[this._selItems.length - 1] : null;
            this._view.item.setData(PropData.clone(this._selItem), IconShowType.Reward);
            this._view.item.lab_cnt.visible = false;
            let cnt = this._selItem ? 1 : 0;
            this._view.lab_sel.text = StringUtil.substitute(getLanById(LanDef.resolve_tips1), [cnt]);
            if (!this._selItem || (lastSelId && lastSelId.neq(this._selItem.prop_id))) {
                this._selCnt = 1;
            }
        }

        private selCntUpdate(): void {
            this._view.lab_cnt.text = this._selCnt + "";

            //分解可获得
            let items: PropData[] = [];
            for (let p of this._finalItems) {
                if (this._selItem.prop_id.eq(p.prop_id)) {
                    p.count = this._selCnt;
                }
                for (let info of p.resolve) {
                    let index = info[0];
                    let cnt = info[1] * p.count;
                    let prop = PropData.create(index, cnt);
                    items.push(prop);
                }
            }
            items = BagUtil.mergeRewards(items);
            if (items.length < this._itemCnt2) {
                items.length = this._itemCnt2;
            }
            this._itemList2.replaceAll(items);
        }
    }
}