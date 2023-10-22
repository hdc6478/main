namespace game.mod.bag {

    import ItemTapEvent = eui.ItemTapEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;
    import SynthesisConfig = game.config.SynthesisConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class BagComposeMdr extends MdrBase {
        private _view: BagComposeView = this.mark("_view", BagComposeView);
        private _proxy: BagProxy;

        private _typeList: ArrayCollection;
        private _selCnt: number;//选中的数量，默认1
        private _selCfg: SynthesisConfig;
        private _itemList: ArrayCollection;
        private _lastItemIndex: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Bag);

            this._typeList = new ArrayCollection();
            this._view.list_type.itemRenderer = BagComposeTabRender;
            this._view.list_type.dataProvider = this._typeList;
            this._view.scr["$hasScissor"] = true;
            this._view.list_type.useVirtualLayout = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = BtnTabItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose);
            addEventListener(this._view.btn_min, TouchEvent.TOUCH_TAP, this.onClickMin);
            addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_max, TouchEvent.TOUCH_TAP, this.onClickMax);

            this.onNt(BagEvent.ON_PROP_COMPOSE_SEL_UPDATE, this.onSelectedChanged, this);
            this.onNt(BagEvent.ON_PROP_COMPOSE_SUCCESS, this.onSuccess, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateTypeList();
            this.updateTypeListSel();
            this.updateItemList();
            this.updateInfo();
        }

        protected onHide(): void {
            this._proxy.selIndex = 0;
            this._proxy.lastSelIndex = 0;
            super.onHide();
        }

        private onSuccess(n: GameNT): void {
            this.updateTypeListSel();
            this.onSelectedChanged();
        }

        private onClickCompose(): void {
            if(!this._proxy.selIndex){
                return;
            }
            let propCost = this._selCfg.synthesis_prop;
            for(let info of propCost){
                let idx = info[0];
                let costCnt = info[1];
                if(!BagUtil.checkPropCnt(idx, costCnt)){
                    PromptBox.getIns().show(getLanById(LanDef.compose_tips));
                    return;
                }
            }
            let cost = this._selCfg.consume;
            if(cost && cost.length){
                for(let info of cost){
                    let idx = info[0];
                    let costCnt = info[1];
                    if(!BagUtil.checkPropCntUp(idx, costCnt)){
                        return;
                    }
                }
            }
            this._proxy.c2s_prop_synthesis(Long.fromValue(this._proxy.selIndex), this._selCnt);
        }

        private onClickMin(): void {
            this.checkCnt(1, false);
        }
        private onClickSubtract(): void {
            this.subtractSelCnt(1);
        }
        private onClickAdd(): void {
            if(!this._proxy.selIndex){
                return;
            }
            let maxCnt = this.getMaxCnt();
            let cnt = Math.min(maxCnt, this._selCnt + 1);
            this.checkCnt(cnt, true);
        }
        private onClickMax(): void {
            if(!this._proxy.selIndex){
                return;
            }
            let maxCnt = this.getMaxCnt();
            this.checkCnt(maxCnt, true);
        }

        private getMaxCnt(): number {
            let maxCnt = -1;
            let propCost = this._selCfg.synthesis_prop;
            for(let i = 0; i < propCost.length; ++i){
                let info = propCost[i];
                let idx = info[0];
                let costCnt = info[1];
                let cnt = BagUtil.calcPropCnt(idx, i, propCost,true);
                let perCnt = Math.floor(cnt / costCnt);
                if(maxCnt == -1 || perCnt < maxCnt){
                    maxCnt = perCnt;
                }
            }
            return Math.max(maxCnt, 1);
        }

        private subtractSelCnt(subtractCnt: number): void {
            if(!this._proxy.selIndex){
                return;
            }
            let cnt = Math.max(1, this._selCnt - subtractCnt);
            this.checkCnt(cnt, false);
        }

        private checkCnt(cnt: number, isAdd: boolean): void {
            if(cnt == this._selCnt){
                let tips = isAdd ? LanDef.max_value : LanDef.min_value;
                PromptBox.getIns().show(getLanById(tips));
                return;
            }
            this.setSelCnt(cnt);
        }

        private setSelCnt(cnt: number): void {
            this._selCnt = cnt;
            this.selCntUpdate();
            this.updateCost();
        }

        private onClickType(e: ItemTapEvent): void {
            if(this._proxy.selSub){
                this._proxy.selSub = false;
                return;
            }
            if(e.itemIndex == this._proxy.lastSelIndex){
                this._view.list_type.selectedIndex = -1;
                this._proxy.lastSelIndex = -1;
                this.updateTypeList();
                return;
            }
            this._proxy.lastSelIndex = this._view.list_type.selectedIndex;
            let info: SynthesisTypeConfig = e.item;
            this._proxy.selTypeCfg = info;
            this._proxy.selIndex = this._proxy.selTypeCfg.prop[0];

            this.onSelectedChanged();
            // if(this._view.scr.viewport.height <= this._view.scr.viewport.contentHeight) {
            //     this._view.scr.viewport.scrollV = 0;
            // }
        }

        private onClickItem(e: ItemTapEvent): void {
            let index = e.itemIndex;
            if(index == this._lastItemIndex){
                return;
            }
            this._lastItemIndex = index;
            let data: BtnTabItemData = e.item;
            this._proxy.selIndex = data.param;
            this.updateInfo();
        }

        /**选中类型刷新*/
        private onSelectedChanged() {
            this.updateTypeList();
            this.updateItemList();
            this.updateInfo();
        }

        private updateTypeList() {
            let infos: SynthesisTypeConfig[] = this._proxy.getShowComposeCfgs()
            if (this._typeList.source.length > 0) {
                this._typeList.replaceAll(infos);
            } else {
                this._typeList.source = infos;
            }
        }

        private updateItemList(): void {
            let infos: BtnTabItemData[] = [];

            let selTypeCfg = this._proxy.selTypeCfg;
            let pos = selTypeCfg.prop.indexOf(this._proxy.selIndex);
            let star = this._proxy.calcStar(selTypeCfg, pos);
            let itemList = this._proxy.getItemList(selTypeCfg.index, star);
            for(let i of itemList){
                let cfg: SynthesisConfig = getConfigByNameId(ConfigName.Synthesis, i);
                let posName = cfg.title;
                let data: BtnTabItemData = {name: posName, showHint: this._proxy.canComposeByIndex(i), param: i};
                infos.push(data);
            }

            if (this._itemList.source.length > 0) {
                this._itemList.replaceAll(infos);
            } else {
                this._itemList.source = infos;
            }
            let itemPos = itemList.indexOf(this._proxy.selIndex);//index计算部位
            this._view.list_item.selectedIndex = itemPos;
            this._lastItemIndex = itemPos;
        }
        /**首次进入界面，自动选中可合成选项*/
        private updateTypeListSel(): void {
            let typePos = this.genSelTypePos();
            this._proxy.selTypeCfg = this._typeList.source[typePos];
            this._proxy.selIndex = this.genSelIndex();
            this._view.list_type.selectedIndex = typePos;
            this._proxy.lastSelIndex = typePos;
        }
        /**返回的是列表下标*/
        private genSelTypePos(): number {
            let cfgList: SynthesisTypeConfig[] = this._typeList.source;
            for (let i = 0; i < cfgList.length; ++i) {
                let cfg = cfgList[i];
                if (this._proxy.canComposeByTypeCfg(cfg)) {
                    return i;
                }
            }
            return this._proxy.lastSelIndex;
        }
        /**返回的是道具index*/
        private genSelIndex(): number {
            let infos = this._proxy.selTypeCfg.prop;
            for (let i = 0; i < infos.length; ++i) {
                let index = infos[i];
                if (this._proxy.canComposeByIndex(index)) {
                    return index;
                }
            }
            return this._proxy.selIndex ? this._proxy.selIndex : infos[0];
        }

        /**选中刷新*/
        private updateInfo(): void {
            this.updateTarIcon();
            let idx = this._proxy.selIndex;
            this._selCfg = getConfigByNameId(ConfigName.Synthesis, idx);
            let maxCnt = this.getMaxCnt();
            this.setSelCnt(maxCnt);
        }

        private updateTarIcon(): void {
            let idx = this._proxy.selIndex;
            let prop: PropData = PropData.create(idx);
            this._view.icon.setData(prop);
            this._view.lab_name.textFlow = this._view.icon.getPropName();
        }

        private selCntUpdate(): void {
            this._view.lab_cnt.text = this._selCnt + "";
        }

        private updateCost(): void {
            let propCost = this._selCfg.synthesis_prop;
            for(let i = 0; i < 3; ++i){
                if(propCost[i]){
                    let prop: PropData = PropData.create(propCost[i][0]);
                    let bagPropDatas = this._proxy.getPropsByIndex(propCost[i][0]);
                    let bagProp = bagPropDatas && bagPropDatas[i] ? bagPropDatas[i] : null;
                    let iconShowType = IconShowType.NotTips;
                    if (bagProp) {
                        prop = bagProp;
                        iconShowType = IconShowType.Bag;//拥有对应装备才可点击
                    }
                    this._view["consume" + i].setData(prop, iconShowType);
                    let costInfo = propCost[i].concat();
                    if(this._selCnt > 1){
                        costInfo[1] = costInfo[1] * this._selCnt;
                    }
                    let costIdx = costInfo[0];
                    let cnt = BagUtil.calcPropCnt(costIdx, i, propCost, true);
                    this._view["consume" + i].updateCostLab(costInfo, cnt);
                    this._view["consume" + i].setImgGray('');
                }
                else {
                    this._view["consume" + i].defaultIcon();
                    this._view["consume" + i].setImgLock();
                }
            }
            let cost = this._selCfg.consume;
            let showCost = !!(cost && cost.length);
            this._view.currentState = showCost ? "cost" : "default";
            if(showCost){
                this._view.cost.updateShow(cost[0]);
            }
            this._view.btn_compose.redPoint.visible = this._proxy.canComposeByIndex(this._proxy.selIndex);
        }

    }
}