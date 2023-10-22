namespace game.mod.compete {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TourpvpTargetConfig = game.config.TourpvpTargetConfig;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class YouliAwardItemRender extends BaseListenerRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_buy: eui.Image;
        private btn_buy: game.mod.Btn;

        public data: TourpvpTargetConfig;
        private _proxy: CompeteProxy;
        private _rewardList: ArrayCollection;
        private _cost: number[];

        /**
         * 状态，0-前往，1-可领取，2-已领取
         */
        private _status: number = 0;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this.img_buy.source = "lvseyilingqu";       // 已领取
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let needCnt = this.data.count;
            let curCnt = this._proxy.challengeCnt;
            let desc = `完成${needCnt}次游历挑战` + TextUtil.addColor("（" + curCnt + "/" + needCnt + "）"
                , curCnt >= needCnt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);

            this._rewardList.source = this.data.reward.slice(0, 3);

            let awd = this._proxy.getStepAward(this.data.index);
            if(curCnt < needCnt) {          // 前往
                this._status = 0;
                this.btn_buy.visible = true;
                this.img_buy.visible = false;
                this.btn_buy.setBlue();
                this.btn_buy.labelDisplay.text = "前往";
                this.btn_buy.resetCost();
                this.btn_buy.redPoint.visible = false;
            } else if(awd && awd.status == RewardStatus.Finish) {       // 可领取
                this._status = 1;
                this.btn_buy.visible = true;
                this.img_buy.visible = false;
                this.btn_buy.setYellow();
                this.btn_buy.labelDisplay.text = "";
                this._cost = this.data.cost;
                this.btn_buy.setCost(this._cost);
                this.btn_buy.redPoint.visible = BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
            } else {    // 已领取
                this._status = 2;
                this.btn_buy.visible = false;
                this.img_buy.visible = true;
            }
        }

        private onClick(): void {
            if (!this.data) {
                return;
            }
            if (this._status == 0) {
                facade.sendNt(ViewEvent.ON_COMMON_BACK);
            } else if(this._status == 1) {
                if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                    return;
                }
                this._proxy.c2s_tour_stage_buy(this.data.index);
            }
        }

    }
}