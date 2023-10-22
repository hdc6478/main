namespace game.mod.shenling {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class ShenLingLingQiMdr extends EffectMdrBase {
        private _view: ShenLingLingQiView = this.mark("_view", ShenLingLingQiView);
        private _proxy: ShenLingLingQiProxy;
        private _slProxy: ShenLingProxy;
        private _selType: ShenLingType = 0;
        private _selIdx = 0;
        private _curIndex = 0;//当前选择神灵
        private _preIndex = 0;//一键操作的神灵index，没有下一个可一键操作的时候停留在此神灵
        private _listData: eui.ArrayCollection;
        private _effIdx = 0;

        protected onInit(): void {
            super.onInit();
            this._slProxy = this.retProxy(ProxyType.Shenling);
            this._proxy = this.retProxy(ProxyType.ShenlingLingqi);
            this._view.list.itemRenderer = AvatarItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_LING_QI_UPDATE, this.onUpdateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.typeListComp.updateListView(ShenLingMdrType.Lingqi);
            this.onSwitchType(ShenLingTypeAry[0]);
        }

        protected onHide(): void {
            super.onHide();
            this._selType = 0;
            this._selIdx = 0;
            this._curIndex = 0;
            this._preIndex = null;
            this.removeModelEft();
        }

        private removeModelEft(): void {
            if (this._effIdx) {
                this.removeEffect(this._effIdx);
            }
            this._effIdx = null;
        }

        private onSwitchType(type: ShenLingType): void {
            this._selIdx = 0;
            this._preIndex = null;
            this._selType = type;
            this._view.typeListComp.updateSelType(type);
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollH = 0;
            this.updateView();
        }

        //可一键操作的神灵类型
        private getNextOneKetType(): ShenLingType {
            if (this._proxy.getHintByType(this._selType)) {
                return this._selType;
            }
            for (let type of ShenLingTypeAry) {
                if (this._proxy.getHintByType(type)) {
                    return type;
                }
            }
            return this._selType;
        }

        private onUpdateView(): void {
            //下一个可一键操作的类型
            let nextType = this.getNextOneKetType();
            if (this._preIndex && nextType != this._selType) {
                this.onSwitchType(nextType);
                return;
            }

            this.updateView();
        }

        private updateView(): void {
            this._view.typeListComp.updateListHint(ShenLingMdrType.Lingqi);
            this.updateListView();
            this.updateTopView();
        }

        private updateListView(): void {
            let cfgList = this._slProxy.getShenLingCfgListByType(this._selType) || [];
            let canActOrUpList: { quality: number, data: AvatarItemData }[] = [];
            let actedList: { quality: number, data: AvatarItemData }[] = [];
            let notActedList: { quality: number, data: AvatarItemData }[] = [];
            let typeInfo = this._slProxy.getTypeInfo(this._selType);
            let atWhichList = 0;//1激活或升星，2上阵
            let selFirst = false;
            for (let cfg of cfgList) {
                if (!cfg.show) {
                    continue;
                }
                let info = this._slProxy.getInfoByIndex(cfg.index);
                let isAct = !!info;
                let isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == cfg.index;
                let canOneKey = this._proxy.canOneKey(cfg.index);
                let data = {
                    quality: cfg.quality,
                    data: {
                        cfg: cfg,
                        showHint: canOneKey,
                        star: info && info.star || 0,
                        isBattle: isBattle
                    }
                };
                if (canOneKey && isBattle) {
                    canActOrUpList.unshift(data);
                    atWhichList = 1;
                    selFirst = true;
                } else if (canOneKey) {
                    canActOrUpList.push(data);
                    selFirst = true;
                } else if (isBattle) {
                    actedList.unshift(data);
                    atWhichList = 2;
                } else if (isAct) {
                    actedList.push(data);
                } else {
                    notActedList.push(data);
                }
            }
            if (atWhichList == 1 && canActOrUpList.length > 1) {
                SortTools.sortMap(canActOrUpList.slice(1), 'quality');
            }
            if (atWhichList == 2 && actedList.length > 1) {
                SortTools.sortMap(actedList.slice(1), 'quality');
            }
            SortTools.sortMap(notActedList, 'quality');
            canActOrUpList = canActOrUpList.concat(actedList, notActedList);

            let list: AvatarItemData[] = [];
            for (let item of canActOrUpList) {
                list.push(item.data);
            }

            if (selFirst) {
                this._selIdx = 0; //有下一个可一键操作的，默认都已经排在第一位了
            } else {
                //没有下一个可一键操作的，停留在上次一键操作的神灵界面
                if (this._preIndex) {
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i];
                        if (item && item.cfg.index == this._preIndex) {
                            this._selIdx = i;
                            break;
                        }
                    }
                }
            }
            let size = list.length;
            for (let i = 0; i < size; i++) {
                list[i].isSel = this._selIdx == i;
            }
            this._listData.replaceAll(list);
            this._view.list.selectedIndex = this._selIdx;

            if (list[this._selIdx]) {
                this._curIndex = list[this._selIdx].cfg.index;
            }
        }

        private updateTopView(): void {
            let curIndex = this._curIndex;
            let cfg = this._slProxy.getShenLingCfg(curIndex);
            if (!cfg) {
                return;
            }
            this.removeModelEft();
            this._effIdx = this.addAnimate(cfg.index, this._view.gr_eff);

            this._view.power.setPowerValue(this._proxy.getPower(curIndex));

            let canOneKey = this._proxy.canOneKey(curIndex);
            this._view.btn_onekey.visible = canOneKey;//激活或者升星才会出现按钮
            if (canOneKey) {
                let isAct = this._proxy.haveOneLqActed(curIndex);
                this._view.btn_onekey.label = isAct ? getLanById(LanDef.onekeyup_jie) : getLanById(LanDef.yijianjihuo);
                this._view.btn_onekey.setHint(canOneKey);
            }

            this._view.suitComp.updateView(curIndex);

            let lingqiList = this._proxy.getLingQiIdList(curIndex);
            if (lingqiList && lingqiList.length) {
                for (let i = 0; i < lingqiList.length; i++) {
                    let icon = this._view[`icon${i}`];
                    if (!icon) {
                        continue;
                    }
                    let info = this._proxy.getLingQiInfo(curIndex, i + 1);
                    icon.data = {
                        slIndex: curIndex,
                        index: lingqiList[i],
                        idx: i + 1,
                        hint: this._proxy.canActOrUp(curIndex, i + 1),
                        isAct: !!info,
                        star: info && info.star || 0
                    } as IShenLingLingQiIconData;
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    this._view[`icon${i}`].data = null;
                }
            }
        }

        private onClickType(e: eui.ItemTapEvent): void {
            if (!e) {
                return;
            }
            let type = (e.item as ISLTypeIconData).type;
            if (type == this._selType) {
                return;
            }
            this.onSwitchType(type);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if (!e || !e.item || this._selIdx == e.itemIndex) {
                return;
            }

            let list: AvatarItemData[] = this._listData.source;
            let preData = list[this._selIdx];
            if (preData) {
                preData.isSel = false;
                this._listData.itemUpdated(preData);
            }

            let data: AvatarItemData = e.item;
            data.isSel = true;
            this._listData.itemUpdated(data);

            this._curIndex = data.cfg.index;
            this._selIdx = e.itemIndex;
            this._preIndex = null;
            this.updateTopView();
        }

        private onClickOneKey(): void {
            let curIndex = this._curIndex;
            if (this._proxy.canOneKey(curIndex)) {
                this._preIndex = curIndex;
                this._proxy.c2s_god_brother_lingqi_click(2, curIndex);
            }
        }

        private onUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.ShenlingEquip) > -1) {
                this.updateView();
            }
        }
    }
}