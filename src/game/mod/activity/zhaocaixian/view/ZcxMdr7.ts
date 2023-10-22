namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class ZcxMdr7 extends EffectMdrBase {
        protected _view: ZcxFundView = this.mark("_view", ZcxFundView);
        protected _proxy: ZcxProxy;
        protected _listData: eui.ArrayCollection;
        protected _type = ZcxFundType.Fuli;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = ZcxFundItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_buy, egret.TouchEvent.TOUCH_TAP, this.onClickBuy, this);
            addEventListener(this._view.btn_gift, egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            this.onNt(ActivityEvent.ON_ZCX_FUND_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.img_fundtype.source = `zcx_fund` + this._type;
            let param = GameConfig.getParamConfigById("zhaocai_show" + this._type);
            let str1 = param.value[1][1];
            let str2 = param.value[2][1];
            this.addBmpFont(str1 + "", BmpTextCfg[BmpTextType.HuanJingFont], this._view.gr_font1);
            this.addBmpFont(str2 + "", BmpTextCfg[BmpTextType.HuanJingFont], this._view.gr_font2);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        protected updateView(): void {
            let cfgs = this._proxy.getFundCfgList(this._type);
            let list: IZcxFundItemData[] = [];
            for (let cfg of cfgs) {
                list.push({
                    cfg,
                    status: this._proxy.getReceiveStatus(this._type, cfg.index)
                });
            }
            this._listData.replaceAll(list);

            let isBought = this._proxy.isBought(this._type);
            if (isBought) {
                this._view.btnTipsBase.visible = false;
                let isReceiveAll = this._proxy.isReceiveAll(this._type);
                let isReceiveToday = this._proxy.isReceiveToday(this._type);
                if (isReceiveAll || isReceiveToday) {
                    this._view.lb_desc.visible = true;
                    this._view.btn_buy.visible = false;
                    this._view.lb_desc.textFlow = TextUtil.parseHtml(getLanById(isReceiveAll ? LanDef.zcx_tips16 : LanDef.zcx_tips15));
                } else {
                    this._view.btn_buy.visible = true;
                    this._view.lb_desc.visible = false;
                    this._view.btn_buy.setImage('common_get', true);
                    this.addEftByParentScale(this._view.btn_buy.group_eft);
                    this._view.btn_buy.setHint(!isReceiveToday);
                }
            } else {
                this._view.lb_desc.visible = false;
                this._view.btn_buy.visible = true;
                this._view.btnTipsBase.visible = true;
                let productId = this._proxy.getFundProductId(this._type);
                let rmb = PayUtil.getRmbValue(productId);
                this._view.btn_buy.setFontPrice(rmb);
                this._view.btnTipsBase.updateShow(getLanById(LanDef.zcx_tips20));
                this.addEftByParentScale(this._view.btn_buy.group_eft);
            }
            this._view.img_baoxiang.source = isBought ? 'zcx_dabaoxiang' : 'zcx_dabaoxiang_hui';
            this.updateBtnGift();
        }

        //福利按钮状态
        private updateBtnGift(): void {
            let status = this._proxy.getBoxStatus(this._type);
            this._view.btn_gift.setHint(status == RewardStatus.Finish);

            let isDraw = status == RewardStatus.Draw;
            this._view.btn_gift.icon = isDraw ? 'box_open' : 'box_close';
        }

        protected onClickBuy(): void {
            if (!this._proxy.isBought(this._type)) {
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.ZcxUnlock, this._type);
            } else {
                this._proxy.c2s_zcx_fund_day_reward(this._type);
            }
        }

        protected onClickGift(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.ZcxFuli, this._type);
        }
    }
}