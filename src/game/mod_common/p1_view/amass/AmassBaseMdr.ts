namespace game.mod {

    import ArrayCollection = eui.ArrayCollection;
    import AmassSuitConfig = game.config.AmassSuitConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;
    import PropertyEvent = eui.PropertyEvent;
    import TextEvent = egret.TextEvent;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import SuitEffectConfig = game.config.SuitEffectConfig;
    import Tween = base.Tween;
    import GameNT = base.GameNT;

    export class AmassBaseMdr extends MdrBase {
        protected _view: AmassView = this.mark("_view", AmassView);
        protected _proxy: IConsecrateProxy;
        protected classId: number;//子类赋值

        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;
        private _suitList: ArrayCollection;
        /**当前选中的类型*/
        protected _selType: number;
        protected _curCnt: number;//当前激活的数量
        protected _types: number[];

        protected onInit(): void {
            super.onInit();
            this._proxy = facade.retMod(ModName.Consecrate).retProxy(ProxyType.Consecrate);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = AmassItem;
            this._view.list_item.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;

            this._suitList = new ArrayCollection();
            this._view.list_suit.itemRenderer = BaseZhuangshiItem;
            this._view.list_suit.dataProvider = this._suitList;

            this._view.lab_goto.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.go_collect), WhiteColor.GREEN, ""));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
            addEventListener(this._view.btn_last, TouchEvent.TOUCH_TAP, this.onScrollMove);
            addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onScrollMove);
            addEventListener(this._view.scr_type.viewport, PropertyEvent.PROPERTY_CHANGE, this.move);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);

            this.onNt(ConsecrateEvent.ON_UPDATE_AMASS_INFO, this.onInfoUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.onBagUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initTypeList();
            this.updateSelIndex();
            this.typeUpdateInfo();
        }

        protected onHide(): void {
            Tween.remove(this._view.scr_type.viewport);
            super.onHide();
        }

        private onClickUp(): void {
            this._proxy.c2s_amass_advance(this.classId, AmassOpType.OneKey, this._selType);
        }

        private onClickGoto(): void {
            let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, this._selType);
            ViewMgr.getIns().showViewByID(cfg.jump_id);
        }

        private onClickType(e: ItemTapEvent) {
            let data: TabBaseItemData = e.item;
            let cfg = data.param as AmassSuitConfig;
            let type = cfg.type;
            if (type == this._selType) {
                return;
            }
            this._selType = type;
            this.typeUpdateInfo();
        }

        private onClickItem(e: ItemTapEvent) {
            let index: number = e.item;
            let cfg = this._proxy.getAmassCfg(index);
            facade.showView(ModName.Consecrate, ConsecrateViewType.AmassUp, {classId: this.classId, cfg: cfg});
        }

        private onInfoUpdate(): void {
            this.updateSelIndex(true);
            this.typeUpdateInfo();
            this.updateTypeHint();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(this.getPropType()) < 0) {
                return;
            }
            this.updateBar();
            this.updateItemList();
            this.updateTypeHint();
        }

        /**道具物品类型DE*/
        protected getPropType(): PropType {
            return PropType.Amass;
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            let types = this._proxy.getAmassTypes(this.classId);
            this._types = types;
            for (let i = 0; i < types.length; ++i) {
                let type = types[i];
                let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, type);
                let typeStr = cfg.icon;
                let icon = "tujian_icon_" + typeStr;
                let nameIcon = "tujian_name_" + typeStr;
                let hint = this._proxy.canAmassTypeUp(this.classId, type);

                let data: TabBaseItemData = {icon: icon, nameIcon: nameIcon, showHint: hint, param: cfg};
                datas.push(data);
            }
            this._btnList.source = datas;
        }

        protected updateSelIndex(isUpdate?: boolean): void {
            let lastSelIndex = this._view.list_type.selectedIndex;
            let selIndex = lastSelIndex >= 0 ? lastSelIndex : 0;
            let canUp: boolean = false;//是否可以升级
            for (let i = 0; i < this._types.length; ++i) {
                let type = this._types[i];
                if (this._proxy.canAmassTypeUp(this.classId, type)) {
                    //选中可以升级的
                    selIndex = i;
                    canUp = true;
                    break;
                }
            }
            if (!canUp && isUpdate) {
                //当前classId的图鉴没有可升级图鉴时，判断另一个classId图鉴是否可升级，是的话跳转过去
                let classId = this.classId == AmassClassId.Amass ? AmassClassId.Amass2 : AmassClassId.Amass;
                if (this._proxy.canAmassClassIdUp(classId)) {
                    let btnType = classId == AmassClassId.Amass ? MdrTabBtnType.TabBtnType02 : MdrTabBtnType.TabBtnType03;
                    this.sendNt(MainEvent.UPDATE_WND_BASE_MDR_SEL_TAB, btnType);
                    return;
                }
            }
            this._selType = this._types[selIndex];
            this._view.list_type.selectedIndex = selIndex;
            if (selIndex > 3) {
                egret.callLater(() => {
                    ScrollUtil.moveHToAssign(this._view.scr_type, selIndex, 127);
                }, this);
            }
        }

        private updateTypeHint(): void {
            let list: TabBaseItemData[] = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let cfg: AmassSuitConfig = btnData.param;
                let hint = this._proxy.canAmassTypeUp(this.classId, cfg.type);
                if (!!btnData.showHint != hint) {//过滤undefined!=false
                    btnData.showHint = hint;
                    this._btnList.itemUpdated(btnData);
                }
            }
        }

        private typeUpdateInfo(): void {
            this.updateBar();
            this.updateItemList();
            this.updateSuitList();
        }

        private updateBar(): void {
            let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, this._selType);
            let typeStr = cfg.icon;
            let nameIcon = "tujian_name_" + typeStr;
            this._view.img_type.source = nameIcon;

            let curVal = this._proxy.getAmassActNum(this.classId, this._selType);
            this._curCnt = curVal;
            let indexList = this._proxy.getAmassIndexList(this.classId, this._selType);
            let maxVal = indexList.length;
            this._view.bar.show(curVal, maxVal, false, 0, false);

            let canUp = this._proxy.canAmassTypeUp(this.classId, this._selType);
            this._view.btn_up.visible = canUp;
            this._view.btn_up.redPoint.visible = canUp;
            this._view.lab_goto.visible = !canUp;
        }

        private updateItemList(): void {
            let indexList = this._proxy.getAmassIndexList(this.classId, this._selType).concat();
            if (this._itemList.source.length) {
                this._itemList.replaceAll(indexList);
            } else {
                this._itemList.source = indexList;
            }
        }

        private updateSuitList(): void {
            let suitList: string[] = [];
            let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, this._selType);
            for (let info of cfg.suit) {
                let needCnt = info[0];
                let suitId = info[1];
                let suitCfg: SuitEffectConfig = getConfigByNameId(ConfigName.SuitEffect, suitId);
                let desc = "";
                if (this._curCnt >= needCnt) {
                    //激活
                    desc = TextUtil.addColor("◆ " + suitCfg.effect_show, WhiteColor.DEFAULT) + TextUtil.addColor("（" + getLanById(LanDef.actived)
                        + "）", WhiteColor.GREEN);
                } else {
                    desc = "◆ " + suitCfg.effect_show + TextUtil.addColor("（" + getLanById(LanDef.collected)
                        + this._curCnt + "/" + needCnt + "）", WhiteColor.RED);
                }
                suitList.push(desc);
            }
            if (this._suitList.source.length) {
                this._suitList.replaceAll(suitList);
            } else {
                this._suitList.source = suitList;
            }
        }

        /** 滚动 */
        private onScrollMove(e: egret.TouchEvent) {
            ScrollUtil.moveH(this._view.scr_type, e.currentTarget == this._view.btn_last ? 1 : 2);
        }

        /** 滚动 */
        private move(e: eui.PropertyEvent) {
            if (e.property == "scrollH" || e.property == "contentWidth") {
                egret.callLater(this.refreshPos, this);
            }
        }

        /** 显示左右按钮 */
        private refreshPos() {
            ScrollUtil.changeBtnShow(this._view.scr_type, this._view.btn_last, this._view.btn_next, 127);
        }
    }
}