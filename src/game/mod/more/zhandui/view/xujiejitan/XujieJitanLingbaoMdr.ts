namespace game.mod.more {

    import facade = base.facade;
    import GameNT = base.GameNT;
    import AmassSuitConfig = game.config.AmassSuitConfig;
    import SuitEffectConfig = game.config.SuitEffectConfig;
    import LanDef = game.localization.LanDef;

    export class XujieJitanLingbaoMdr extends MdrBase {
        private _view: XujieJitanLingbaoView = this.mark("_view", XujieJitanLingbaoView);
        private _proxy: XujieJitanProxy;
        private _consecrateProxy: IConsecrateProxy;

        private _classId = AmassClassId.Amass3;
        private _itemList: eui.ArrayCollection;
        private _suitList: eui.ArrayCollection;
        protected _type = XujieType.Jitan;

        private _selType: number;
        private _curCnt: number;//当前激活的数量
        private _types: number[];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieJitan);
            this._consecrateProxy = facade.retMod(ModName.Consecrate).retProxy(ProxyType.Consecrate);

            this._view.list_item.itemRenderer = AmassItem;
            this._view.list_item.dataProvider = this._itemList = new eui.ArrayCollection();
            this._view.list_suit.itemRenderer = BaseZhuangshiItem;
            this._view.list_suit.dataProvider = this._suitList = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.img_goto, egret.TouchEvent.TOUCH_TAP, this.onClickGoto, this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickBtnUp, this);
            addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickItem, this);

            this.onNt(ConsecrateEvent.ON_UPDATE_AMASS_INFO, this.onInfoUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.onBagUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._types = this._consecrateProxy.getAmassTypes(this._classId);
            if (this._type == XujieType.Jitan) {
                this._selType = this._types[0];
            } else {
                this._selType = this._types[1];
            }
            this.typeUpdateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        private typeUpdateInfo(): void {
            this.updateBar();
            this.updateItemList();
            this.updateSuitList();
        }

        private onInfoUpdate(): void {
            this.typeUpdateInfo();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(PropType.ZhanduiLingbao) < 0) {
                return;
            }
            this.updateBar();
            this.updateItemList();
        }

        private updateBar(): void {
            let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, this._selType);
            let typeStr = cfg.icon;
            this._view.img_type.source = "tujian_name_" + typeStr;

            let curVal = this._consecrateProxy.getAmassActNum(this._classId, this._selType);
            this._curCnt = curVal;
            let indexList = this._consecrateProxy.getAmassIndexList(this._classId, this._selType);
            let maxVal = indexList.length;
            this._view.bar.show(curVal, maxVal, false, 0, false);

            let canUp = this._consecrateProxy.canAmassTypeUp(this._classId, this._selType);
            this._view.btn_up.visible = canUp;
            this._view.btn_up.redPoint.visible = canUp;
            this._view.img_goto.visible = !canUp;
        }

        private updateItemList(): void {
            let indexList = this._consecrateProxy.getAmassIndexList(this._classId, this._selType).concat();
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

        private onClickGoto(): void {
            let cfg: AmassSuitConfig = getConfigByNameId(ConfigName.AmassSuit, this._selType);
            ViewMgr.getIns().showViewByID(cfg.jump_id);
        }

        private onClickBtnUp(): void {
            this._consecrateProxy.c2s_amass_advance(this._classId, AmassOpType.OneKey, this._selType);
        }

        private onClickItem(e: eui.ItemTapEvent): void {
            let index: number = e.item;
            let cfg = this._consecrateProxy.getAmassCfg(index);
            facade.showView(ModName.Consecrate, ConsecrateViewType.AmassUp, {classId: this._classId, cfg: cfg});
        }
    }

    export class XujieJitanLingbaoMdr2 extends XujieJitanLingbaoMdr {
        protected _type = XujieType.Kuangmai;

    }
}