namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class FlyGiftRender extends BaseListenerRenderer {
        public img_type: eui.Image;
        public lab_desc: eui.Label;
        public list_reward: eui.List;
        public img_bought: eui.Image;
        public btn_buy: game.mod.Btn;
        public lab_limit: eui.Label;

        private _rewardList: ArrayCollection;

        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;
        private _isRmb: boolean;
        private _cnt: number;//仙玉数量或者商品ID

        public data: act_reward;//奖励数据

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            this._flyRankProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.FlyRank);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let index = data.index;
            this.img_type.source = "chaozhi_lab" + index;
            let descStr = data.desc || "";
            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);
            this._rewardList.source = data.rewards.slice(0,3);
            let actInfo = this._proxy.curOpenAct;
            let buyCnt = this._flyRankProxy.getGiftBuyCnt(actInfo.act_id, index);
            //条件1：购买类型1仙玉2人民币，条件2：仙玉数量或商品ID，条件3：每日限购次数
            let limitCnt = data.cond_3 && data.cond_3[0] || 0;
            let hasBuy = this._flyRankProxy.hasGiftBuy(actInfo.act_id, data);
            this.img_bought.visible = hasBuy;
            this.btn_buy.visible = !hasBuy;
            let limitStr = "";
            if(!hasBuy){
                let leftCnt = limitCnt - buyCnt;
                limitStr = getLanById(LanDef.store5) + TextUtil.addColor(leftCnt + "/" + limitCnt, WhiteColor.GREEN);
            }
            this.lab_limit.textFlow = TextUtil.parseHtml(limitStr);

            if(this.btn_buy.visible){
                let buyType = this._flyRankProxy.getGiftType(data);
                let cnt = this._flyRankProxy.getGiftCost(data);
                this._cnt = cnt;
                this._isRmb = buyType == GiftBuyType.Rmb;

                if(this._isRmb){
                    //人民币购买
                    let rmbStr = PayUtil.getRmbValue(cnt) + PayUtil.getRmbUnit();
                    this.btn_buy.labelDisplay.text = rmbStr;
                    this.btn_buy.redPoint.visible = false;
                    this.btn_buy.resetCost();
                }
                else {
                    //仙玉购买
                    this.btn_buy.setCost([PropIndex.Xianyu, cnt]);
                    this.btn_buy.redPoint.visible = BagUtil.checkPropCnt(PropIndex.Xianyu, cnt);
                    this.btn_buy.labelDisplay.text = "";
                }
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(this._isRmb){
                //人民币购买
                PayUtil.pay(this._cnt);
            }
            else {
                //仙玉购买
                if(!BagUtil.checkPropCntUp(PropIndex.Xianyu, this._cnt)){
                    return;
                }
                let index = data.index;
                let actInfo = this._proxy.curOpenAct;
                this._flyRankProxy.c2s_activity_feishen_gift_info(actInfo.act_id, index);
            }
        }
    }
}