namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import ZeroBuyConfig = game.config.ZeroBuyConfig;

    export class ZeroBuyRender extends BaseRenderer {
        private img_bg: eui.Image;
        private btn: Btn;
        private special_attr: SpecialAttrView;
        private name_item: AvatarNameSrItem;
        private lab_limit: eui.Label;
        private grp_eff: eui.Group;
        private list: eui.List;
        private img_close: eui.Image;
        private img_got: eui.Image;
        private gr_font: eui.Group;

        public data: ZeroBuyConfig;
        private _proxy: ZeroBuyProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        private _effId: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.ZeroBuy);

            this.img_bg.source = ResUtil.getUiPng("di_0yuangou");
            this.touchEnabled = false;

            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData;

            this.btn.img_bg.source = "huangseanniu";
            this.btn.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            this.img_close.touchEnabled = true;
            this.img_close.addEventListener(TouchEvent.TOUCH_TAP, this.onClickClose, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            this.img_close.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickClose, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this.lab_limit.text = `${VipUtil.getVipStr(data.vip_idx)}可购买`;
            this._listData.source = data.reward;
            if (this._effId) {
                this.removeEffect(this._effId);
                this._effId = null;
            }
            this._effId = this.addAnimate(data.surface[0], this.grp_eff);

            let xianyuStr = data.cost[1];
            this.addBmpFont(xianyuStr + "", BmpTextCfg[BmpTextType.LingYuanGou], this.gr_font);

            let cfg = getConfigById(data.surface[0]);
            this.name_item.updateShow(cfg.name, cfg.quality);

            this.special_attr.updateDesc(cfg, 203);

            // this.special_attr.updateDesc(cfg);

            // let isBought: boolean = this._proxy.getStatusByIndex(data.index) == 1;
            // if (isBought) {
            //     this.btn.visible = false;
            //     this.img_got.visible = true;
            //     return;
            // }
            // this.btn.visible = true;
            // this.img_got.visible = false;

            let bool: boolean = this._proxy.getStatusByIndex(data.index) > 0;
            this.img_got.visible = bool;
            this.btn.visible = !bool;

            let limit = VipUtil.getShowVipLv(data.vip_idx);
            let vip = VipUtil.getShowVipLv();
            if (vip < limit) {
                this.btn.label = "前往充值";
                this.btn.resetCost();
            } else {
                this.btn.label = "";
                this.btn.setCost(data.cost);
            }
            this.btn.setHint(BagUtil.checkPropCnt(data.cost[0], data.cost[1]) && vip >= limit);
        }

        private onClickClose(): void {
            // ViewMgr.getIns().back();
            facade.sendNt(ViewEvent.ON_COMMON_BACK);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let limit = VipUtil.getShowVipLv(data.vip_idx);
            let vip = VipUtil.getShowVipLv();
            if (vip < limit) {
                ViewMgr.getIns().openCommonRechargeView();
                return;
            }
            if (data && data.cost) {
                if (!BagUtil.checkPropCnt(data.cost[0], data.cost[1], PropLackType.Text)) {
                    return;
                }
            }
            this._proxy.c2s_zero_buy_get(data.index);
        }
    }
}
