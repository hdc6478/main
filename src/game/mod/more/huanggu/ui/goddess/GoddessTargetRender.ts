namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import HuangguGiftConfig = game.config.HuangguGiftConfig;

    export class GoddessTargetRender extends BaseListenerRenderer {
        public lb_cond: eui.Label;
        public icon: game.mod.IconGot;
        public btn_go: game.mod.Btn;
        public btn_buy: game.mod.Btn;
        public list: eui.List;
        public img_got: eui.Image;
        public img_got0: eui.Image;

        private _rewardList: ArrayCollection;

        private _proxy: HuangguProxy;
        private _productId: number;//商品ID
        private _cost: number[];//仙玉消耗
        private _canDraw: boolean;

        public data: HuangguGiftConfig;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.Huanggu);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }

            let curCnt = this._proxy.cnt;
            let needCnt = data.times;
            this._canDraw = curCnt >= needCnt;
            let cntStr = TextUtil.addColor("(" + curCnt + "/" + needCnt + ")", this._canDraw ? WhiteColor.GREEN : WhiteColor.RED);
            let condStr = StringUtil.substitute(getLanById(LanDef.huanggu_nvshen_tips17), [cntStr]);
            this.lb_cond.textFlow = TextUtil.parseHtml(condStr);

            let index = data.index;
            let hasFreeDraw = this._proxy.hasFreeDraw(index);

            let iconData: IconRewardData = {
                prop: data.reward[0],
                isGot: hasFreeDraw,
                showTips: true
            };
            this.icon.data = iconData;
            this.img_got.visible = hasFreeDraw;
            this.btn_go.visible = !hasFreeDraw;
            if(this.btn_go.visible){
                this.btn_go.redPoint.visible = this._canDraw;
                if(this._canDraw){
                    this.btn_go.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_go.setYellow();
                }
                else {
                    this.btn_go.labelDisplay.text = getLanById(LanDef.goto);
                    this.btn_go.setBlue();
                }
            }
            this._productId = data.gift_id;
            let reward2 = this._productId ? PayUtil.getRewards(this._productId) : data.reward2;
            this._rewardList.source = reward2.slice(0,3);
            let hasBuyDraw = this._proxy.hasBuyDraw(index);
            this.img_got0.visible = hasBuyDraw;
            this.btn_buy.visible = !hasBuyDraw;
            if(this.btn_buy.visible){
                if(this._productId){
                    //人民币购买
                    let rmbStr = PayUtil.getRmbValue(this._productId) + PayUtil.getRmbUnit();
                    this.btn_buy.labelDisplay.text = rmbStr;
                    this.btn_buy.redPoint.visible = false;
                    this.btn_buy.resetCost();
                }
                else {
                    //仙玉购买
                    this._cost = data.cost[0];
                    this.btn_buy.setCost(this._cost);
                    this.btn_buy.redPoint.visible = this._canDraw && BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                    this.btn_buy.labelDisplay.text = "";
                }
            }
        }

        private onClickGo(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(!this._canDraw){
                //前往
                facade.sendNt(ViewEvent.ON_COMMON_BACK);
                return;
            }
            this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.Target, data.index, GoddessTargetType.Free);
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(!this._canDraw){
                PromptBox.getIns().show(getLanById(LanDef.jinjielibao_tips2));
                return;
            }
            if(this._productId){
                //人民币购买
                PayUtil.pay(this._productId);
            }
            else {
                //仙玉购买
                if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                    return;
                }
                this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.Target, data.index, GoddessTargetType.Buy);
            }
        }
    }
}