namespace game.mod.yishou {

    import GameNT = base.GameNT;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class YishouShouguMdr extends EffectMdrBase {
        private _view: YishouShouguView = this.mark("_view", YishouShouguView);
        private _proxy: YishouProxy;
        private _selIdx = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
            addEventListener(this._view.btn_jinjie, egret.TouchEvent.TOUCH_TAP, this.onClickJinjie, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
            addEventListener(this._view.btn_bag, egret.TouchEvent.TOUCH_TAP, this.onClickBag, this);
            addEventListener(this._view.btn_compose, egret.TouchEvent.TOUCH_TAP, this.onClickCompose, this);
            addEventListener(this._view.btn_decompose, egret.TouchEvent.TOUCH_TAP, this.onClickDecompose, this);
            addEventListener(this._view.iconListComp.list, eui.ItemTapEvent.ITEM_TAP, this.onClickIconList, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_BASE_INFO, this.updateView, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_EQUIP_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this._view.iconListComp.list.selectedIndex = this._selIdx = 0;
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
        }

        private getType(): YishouType {
            return YishouTypeAry[this._selIdx];
        }

        private updateView(): void {
            let type = this.getType();
            this._view.iconListComp.updateListView();
            this._view.skillComp.updateSkillView(type);
            this._view.equipListComp.updateEquipListView(type);
            this._view.power2.setPowerValue(this._proxy.getPower(type));
            this._view.img_icon.source = ResUtil.getUiPng(`yishou_model${type}`);

            //进阶按钮
            let canJinjie = this._proxy.canJinjie(type);
            this._view.gr_jinjie.visible = canJinjie;
            this._view.btn_jinjie.setHint(canJinjie);
            this._view.btn_jinjie.group_eft.removeChildren();
            if (this._view.gr_jinjie.visible){
                this.addEftByParent(UIEftSrc.XiTongJiHuo,this._view.btn_jinjie.group_eft,4,4);
            }
            //一键替换
            let canOnekey = this._proxy.canOnekey(type);
            this._view.btn_onekey.visible = !canJinjie && canOnekey;
            if (this._view.btn_onekey.visible) {
                this._view.btn_onekey.redPoint.visible = true;
            }

            this.updateBtnHint();
        }

        private onClickAttr(): void {
            let type = this.getType();
            let attr = this._proxy.getAttr(type);
            ViewMgr.getIns().showAttrTipsWithoutGod(getLanById(LanDef.yishou_tips14), attr, getLanById(LanDef.xiandan_tips9));
        }

        private onClickJinjie(): void {
            let type = this.getType();
            if (this._proxy.canJinjie(type)) {
                this._proxy.c2s_yishou_equip_up_level(type);
            }
        }

        private onClickOnekey(): void {
            let type = this.getType();
            if (this._proxy.canOnekey(type)) {
                this._proxy.c2s_yishou_equip_operate(type, 2, null);
            }
        }

        private onClickBag(): void {
            ViewMgr.getIns().showSecondPop(ModName.Yishou, YiShouViewType.Bag);
        }

        private onClickCompose(): void {
            ViewMgr.getIns().showSecondPop(ModName.Yishou, YiShouViewType.Compose, this.getType());
        }

        private onClickDecompose(): void {
            facade.showView(ModName.Yishou, YiShouViewType.Decompose);
        }

        private onClickIconList(e: eui.ItemTapEvent): void {
            let item = e.item as IYishouTypeIconData;
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx || !item
                || !this._proxy.checkTypeActed(item.type, true)) {
                this._view.iconListComp.list.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = e.itemIndex;
            this.updateView();
        }

        private updateBtnHint(): void {
            let type = this.getType();
            //合成按钮红点
            this._view.btn_compose.setHint(this._proxy.getComposeTypeHint(type));
            //背包红点
            this._view.btn_bag.setHint(this._proxy.canOnekey(type));
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.Yishou) > -1) {
                this._view.iconListComp.updateListView();
                this.updateView();
            }
        }

    }
}