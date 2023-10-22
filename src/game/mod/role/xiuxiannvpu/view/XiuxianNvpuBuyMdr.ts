namespace game.mod.role {

    import DirectShopConfig = game.config.DirectShopConfig;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class XiuxianNvpuBuyMdr extends EffectMdrBase {
        private _view: XiuxianNvpuBuyView = this.mark("_view", XiuxianNvpuBuyView);
        private _proxy: XiuxianNvpuProxy;
        private _listData: eui.ArrayCollection;
        private _boughtCache = false;//是否购买，用于跳转界面
        private _listDesc: eui.ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.list_desc.itemRenderer = BaseZhuangshiItem;
            this._view.list_desc.dataProvider = this._listDesc = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.img_gotoact, egret.TouchEvent.TOUCH_TAP, this.onClickGotoAct, this);
            addEventListener(this._view.img_goto, egret.TouchEvent.TOUCH_TAP, this.onClickGoto, this);
            addEventListener(this._view.btn_buy, egret.TouchEvent.TOUCH_TAP, this.onClickBtnBuy, this);
            addEventListener(this._view.btn_renewal0, egret.TouchEvent.TOUCH_TAP, this.onClickBtnRenewal0, this);
            addEventListener(this._view.btn_renewal1, egret.TouchEvent.TOUCH_TAP, this.onClickBtnRenewal1, this);

            this.onNt(RoleEvent.ON_XIUXIANNVPU_INFO_UPDATE, this.onUpdateInfo, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._boughtCache = this._proxy.isBought();
            this.updateView();

            this._view.gr_eft.removeChildren();
            this.addEftByParent("assets/anim/general/general_16/ui_std4_5", this._view.gr_eft,0,0,0,null,0,1.3);
        }

        protected onHide(): void {
            super.onHide();
            this._boughtCache = false;
        }

        private updateView(): void {
            let rewards = PayUtil.getRewards(ProductId.Id201501);
            this._listData.replaceAll(rewards);
            let paramCfg = GameConfig.getParamConfigById('ayah_word');
            let desc: string = paramCfg && paramCfg.value || '';
            let descList = desc.split(/#n/gi);
            this._listDesc.replaceAll(descList || []);

            let paramCfg1 = GameConfig.getParamConfigById('ayah_show');
            let value = paramCfg1 ? paramCfg1.value : [];
            let power = value[2] || 0;
            this._view.power.setPowerValue(power);
            let shenlingCfg: ShenlingConfig = this._proxy.shenlingCfg;
            // if (shenlingCfg) {
            //     this._view.nameItem.updateShow(shenlingCfg.name, shenlingCfg.quality);
            // }
            //this.addAnimate(shenlingCfg.index, this._view.gr_eft);

            this.onUpdateInfo();
        }

        private onUpdateInfo(): void {
            let isBought = this._proxy.isBought();
            if (isBought && !this._boughtCache) {
                this.hide();
                ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.XiuxianNvpuGrowMain);//激活后立马跳转到养成界面
                return;
            }

            if (isBought) {
                this.renewalView();
            } else {
                this.buyView();
            }
        }

        //购买激活界面
        private buyView(): void {
            this._view.currentState = 'default';
            let roleRingProxy: IRoleRingProxy = getProxy(ModName.Activity, ProxyType.RoleRing);
            let isRoleActed = roleRingProxy.isRoleRingAct();//主角光环是否激活
            this._view.btn_buy.group_eft.removeChildren();
            this.addEftByParentScale(this._view.btn_buy.group_eft);

            let day: number;
            if (isRoleActed) {
                day = this.getRenewalDay(ProductId.Id201501);
                let rmb = PayUtil.getRmbValue(ProductId.Id201501);
                let fakeRmb = PayUtil.getFakeRmbValue(ProductId.Id201501);
                this._view.btn_buy.clearFontPrice();
                this._view.btn_buy.setTwoPrice(rmb, fakeRmb);
            } else {
                day = this.getRenewalDay(ProductId.Id201502);
                this._view.btn_buy.gr_price.visible = false;
                let rmb = PayUtil.getRmbValue(ProductId.Id201502);
                this._view.btn_buy.setFontPrice(rmb);
            }

            let paramCfg = GameConfig.getParamConfigById('ayah_show');
            let value = paramCfg ? paramCfg.value : [];
            let discount = value[1];//折扣
            this.addBmpFont(discount + '折', BmpTextCfg[BmpTextType.XiuxianNvpu], this._view.gr_font);
            this._view.img_gotoact.visible = !isRoleActed;

            this.addBmpFont(day + '', BmpTextCfg[BmpTextType.XiuxianNvpu], this._view.gr_font0, true, 1, false, 0, true);
        }

        //续费天数
        private getRenewalDay(productId: number): number {
            let shopCfg = getConfigByNameId(ConfigName.DirectShop, 18);
            if (shopCfg && shopCfg[productId]) {
                let cfg = shopCfg[productId] as DirectShopConfig;
                return cfg.param1 / Second.Day;
            }
            return 0;
        }

        //续费界面
        private renewalView(): void {
            this._view.currentState = 'bought';

            let unit = PayUtil.getRmbUnit();
            let rmb1 = PayUtil.getRmbValue(ProductId.Id201501);
            let day1 = this.getRenewalDay(ProductId.Id201501);
            this._view.btn_renewal0.label = `${rmb1 + unit}续费${day1}天`;

            let rmb2 = PayUtil.getRmbValue(ProductId.Id201503);
            let day2 = this.getRenewalDay(ProductId.Id201503);
            this._view.btn_renewal1.label = `${rmb2 + unit}续费${day2}天`;

            this.addBmpFont(this._proxy.day + '', BmpTextCfg[BmpTextType.XiuxianNvpu], this._view.gr_fontday, true, 1, false, 0, true);
        }

        //激活特权
        private onClickGotoAct(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.RoleRing);
        }

        //挂机设置
        private onClickGoto(): void {
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.XiuxianNvpuOnlineSetting);
            this.hide();
        }

        //购买
        private onClickBtnBuy(): void {
            let id = ProductId.Id201502;
            let roleRingProxy: IRoleRingProxy = getProxy(ModName.Activity, ProxyType.RoleRing);
            let isRoleActed = roleRingProxy.isRoleRingAct();//主角光环是否激活
            if (isRoleActed) {
                id = ProductId.Id201501;
            }
            PayUtil.pay(id);
        }

        //续费
        private onClickBtnRenewal0(): void {
            PayUtil.pay(ProductId.Id201501);
        }

        //续费
        private onClickBtnRenewal1(): void {
            PayUtil.pay(ProductId.Id201503);
        }
    }
}