namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class MeiriTehuiMdr extends MdrBase implements UpdateItem {
        private _view: MeiriTehuiView = this.mark("_view", MeiriTehuiView);
        private _proxy: MeiriTehuiProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.MeiriTehui);
            this._view.list.itemRenderer = MeiriTehuiItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.btn_go.img_bg.source = "yijianniuhuang";
            this._view.btn_go.img_bg.width = 205;
            this._view.btn_go.img_bg.height = 68;
            this._view.btn_go.setImage('hongyuncifu');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_buyTen, egret.TouchEvent.TOUCH_TAP, this.onClickBuyTen, this);
            addEventListener(this._view.btn_go, egret.TouchEvent.TOUCH_TAP, this.onClickGo, this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            this.onNt(ActivityEvent.ON_UDPATE_MEIRI_TEHUI_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.btn_buyTen.label = this._proxy.getBtnTenStr();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._endTime = 0;
        }

        private updateView(): void {
            let list: IMeiriTehuiItemData[] = [];
            let freeStatus = this._proxy.getStatus(0);
            list.push({
                productId: 0,
                rewards: this._proxy.getFreeRewards(),
                status: freeStatus
            });

            let cfgList = this._proxy.getDirectShopCfgList();
            for (let i = 0; i < cfgList.length - 1; i++) {
                let cfg = cfgList[i];
                let productId = cfg.product_id;
                let status = this._proxy.getStatus(productId);
                list.push({
                    productId: productId,
                    rewards: PayUtil.getRewards(productId),
                    status
                });
            }
            this._listData.replaceAll(list);

            let isBuyTen = this._proxy.isBuyTenDay();
            this._view.timeItem.visible = isBuyTen;
            this._view.btn_buyTen.visible = !this._view.timeItem.visible;

            if (isBuyTen) {
                if (!this._endTime) {
                    this._endTime = this._proxy.getEndTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                }
                this._view.lb_free.textFlow = TextUtil.parseHtml(`已获得海量优惠，还可领取${TextUtil.addColor(this._proxy.getLeftDays() + '', UIColor.GREEN)}天`);
            } else {
                if (TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.removeUpdateItem(this);
                }
                this._endTime = 0;
                let freeStr = '额外赠送 ';
                let tenCfg = cfgList[cfgList.length - 1];
                let rewards = PayUtil.getRewards(tenCfg.product_id);
                if (rewards) {
                    for (let item of rewards) {
                        let propCfg = GameConfig.getPropConfigById(item[0]);
                        if (!propCfg) {
                            continue;
                        }
                        freeStr += TextUtil.addColor(propCfg.name + 'x' + item[1], UIColor.GREEN);
                    }
                }
                this._view.lb_free.textFlow = TextUtil.parseHtml(freeStr);
                if (this._proxy.canBuyTenDay()) {
                    this._view.btn_buyTen.setYellow();
                } else {
                    this._view.btn_buyTen.setDisabled();
                }
            }
        }

        private onClickBuyTen(): void {
            if (this._proxy.isBuyTenDay()) {
                return;
            }
            let list = this._proxy.getDirectShopCfgList();
            let lastCfg = list ? list[list.length - 1] : null;
            if (!lastCfg) {
                return;
            }
            PayUtil.pay(lastCfg.product_id);
        }

        private onClickGo(): void {
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.WonderfulAct6, true)) {
                ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.WonderfulAct, [WonderfulActMainBtnType.Btn6]);
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                this._endTime = 0;
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}