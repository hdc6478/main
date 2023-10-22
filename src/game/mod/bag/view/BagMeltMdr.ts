namespace game.mod.bag {

    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;
    import TextEvent = egret.TextEvent;

    export class BagMeltMdr extends MdrBase {
        private _view: BagMeltView = this.mark("_view", BagMeltView);
        private _proxy: BagProxy;

        private _itemList: ArrayCollection;
        private _items: PropData[];
        private _itemCnt: number = 25;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Bag);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = Icon;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_shop, TouchEvent.TOUCH_TAP, this.onClickShop);
            addEventListener(this._view.lab_add, TextEvent.LINK, this.onClickVip);
            addEventListener(this._view.btn_roleRing, TouchEvent.TOUCH_TAP, this.onClickRoleRing);
            addEventListener(this._view.btn_melt, TouchEvent.TOUCH_TAP, this.onClickMelt);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(BagEvent.ON_BAG_MELT_VALUE_UPDATE, this.updateMeltCnt, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initViewShow();
            this.updateItemList();
            this.updateCnt();
            this.updateMeltCnt();
            this.updateHint();
            this.updateRoleRing();
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(BagType.RoleEquip) < 0){
                return;
            }
            this.updateItemList();
        }
        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(PropIndex.Ronglianjingshi) < 0){
                return;
            }
            this.updateCnt();
        }

        private onClickShop(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.ExchangeType1);
        }

        private onClickVip(): void {
            ViewMgr.getIns().openVipView();
        }

        private onClickMelt(): void {
            if(!this._items || !this._items.length){
                PromptBox.getIns().show(getLanById(LanDef.ronglian_tips2));
                return;
            }
            this._proxy.clickMelt(this._items);
        }

        private initViewShow(): void {
            this._view.item.setData(PropIndex.Ronglianjingshi);
            let cfg: PropConfig = GameConfig.getPropConfigById(PropIndex.Ronglianjingshi);
            this._view.img_icon.source = cfg.icon;

            this._view.lab_desc.text = getLanById(LanDef.ronglian_tips4);
            this._view.lab_add.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.equip_Rresolve_tips4), WhiteColor.GREEN, ""));

            this._view.lab_tips.textFlow = TextUtil.parseHtml(TextUtil.addColor(getLanById(LanDef.ronglian_tips3), WhiteColor.GREEN));
        }

        private updateItemList(): void {
            this._items = this._proxy.getMeltBag();
            let items = this._items.concat();
            if(items.length < this._itemCnt){
                items.length = this._itemCnt;
            }
            this._itemList.replaceAll(items);
        }

        private updateCnt(): void {
            this._view.item.updateShow();
        }

        private updateMeltCnt(): void {
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._proxy.meltVal + "/" + this._proxy.meltMaxVal, WhiteColor.GREEN));
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.meltHint)) {
                this.updateMeltHint(data.value);
            }
        }

        /** 更新红点 */
        private updateHint() {
            this.updateMeltHint(HintMgr.getHint(this._proxy.meltHint));
        }

        private updateMeltHint(hint: boolean) {
            this._view.btn_melt.redPoint.visible = hint;
        }

        private updateRoleRing(): void {
            let isAct = RoleUtil.isRoleRingAct();
            this._view.grp_roleRing.visible = !isAct;
        }
        private onClickRoleRing(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.RoleRing);
        }
    }
}