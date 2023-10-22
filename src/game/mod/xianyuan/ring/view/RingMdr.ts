namespace game.mod.xianyuan {

    import RingConfig = game.config.RingConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class RingMdr extends EffectMdrBase {
        private _view: RingView = this.mark("_view", RingView);
        private _proxy: RingProxy;
        private _listItem: eui.ArrayCollection;
        private _eftIdx: number;
        private _index: number;
        private _cfg: RingConfig;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.gr_eft.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Ring);
            this._view.list_item.itemRenderer = RingItem;
            this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
            addEventListener(this._view.btn_gift, egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);

            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
            this.onNt(XianyuanEvent.ON_UPDATE_RING_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._index = this._proxy.getUplvIndex();
            this._cfg = this._proxy.getConfig(this._index);
            this.updateModel();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._index = null;
            this._eftIdx = null;
        }

        private updateView(): void {
            if (!this._index) {
                return;
            }
            let list: number[] = [];
            list.length = this._proxy.getStagePerLv();
            this._listItem.replaceAll(list);

            this.updateCost();
            this.updatePower();

            let lv = this._proxy.getStage();
            lv = SurfaceUtil.calcSurfaceStage(lv, ConfigHead.Ring);
            let lvStr = ResUtil.getChineseFontStr(lv) + "j";
            this.addBmpFont(lvStr, BmpTextCfg[BmpTextType.Stage], this._view.gr_lv, false, 1, true);

            this._view.btn_gift.setHint(this._proxy.getGiftHint());
        }

        private updateModel(): void {
            // this.removeEffect(this._eftIdx);
            // this._eftIdx = this.addAnimate(this._index, this._view.gr_eft);
            this._view.img_icon.source = ResUtil.getRingSrc(this._index);
            this._view.specialAttr.updateDesc(this._cfg);
            this._view.nameItem.updateShow(this._cfg.name, this._cfg.quality);
        }

        private updatePower(): void {
            let info = this._proxy.getUplvInfo();
            let attr = info && info.attr ? info.attr : null;
            let power = attr && attr.showpower ? attr.showpower : 0;
            this._view.power.setPowerValue(power);
        }

        private updateCost(): void {
            if (this._proxy.isMaxLv()) {
                this.switchCurrentState(true);
                this._view.bar.showMax();
                return;
            }
            this.switchCurrentState(false);
            let lv = this._proxy.getStage();
            let cost = this._proxy.getLvCost(lv);
            this._view.costIcon.updateShow(cost);
            this._view.btn_onekey.setHint(this._proxy.canOnekey());

            let cfg = this._proxy.getLvConfig(lv);
            let info = this._proxy.getUplvInfo();
            let exp = info && info.exp ? info.exp * SurfacePerExp : 0;
            let upExp = cfg && cfg.exp ? cfg.exp * SurfacePerExp : 0;
            this._view.bar.show(exp * cost[1], upExp * cost[1], false, lv);
        }

        private switchCurrentState(showMax = true): void {
            this._view.img_max.visible = showMax;
            this._view.btn_up.visible = this._view.btn_onekey.visible = this._view.costIcon.visible = !showMax;
        }

        private onClickUp(): void {
            if (this._proxy.canUplv(true)) {
                this._proxy.c2s_ring_uplv(1);
            }
        }

        private onClickOnekey(): void {
            if (this._proxy.canOnekey(true)) {
                this._proxy.c2s_ring_uplv(2);
            }
        }

        private onClickGift(): void {
            if (!this._proxy.canOpenGift()) {
                facade.showView(ModName.Xianyuan, XianyuanViewType.RingGiftTips);
                return;
            }
            ViewMgr.getIns().showViewByID(JumpIdx.XianlvRing);
        }

        private onClickAttr(): void {
            let info = this._proxy.getUplvInfo();
            ViewMgr.getIns().showAttrTips(getLanById(LanDef.ring_tips2), info && info.attr ? info.attr : null);
        }
    }
}