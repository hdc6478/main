namespace game.mod.compete {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TourpvpFuliConfig = game.config.TourpvpFuliConfig;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class YouliScoreItemRender extends BaseListenerRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_buy: eui.Image;
        private btn_buy: game.mod.Btn;

        public data: TourpvpFuliConfig;
        private _proxy: CompeteProxy;
        private _rewardList: ArrayCollection;

        /**
         * 状态，0-不可领取，1-可领取，2-已领取
         */
         private _status: number = 0;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this.btn_buy.labelDisplay.text = "领取";
            this.img_buy.source = "lvseyilingqu";       // 已领取
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let needCnt = this.data.count;
            let curScore = this._proxy.dayScore;
            let desc = `游历积分达到${needCnt}可领取` + TextUtil.addColor("（" + curScore + "/" + needCnt + "）"
                , curScore >= needCnt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);

            this._rewardList.source = this.data.reward;

            let awd = this._proxy.getScoreAward(this.data.index);
            if(awd && awd.status == RewardStatus.Draw){    // 已领取
                this._status = 2;
                this.btn_buy.visible = false;
                this.img_buy.visible = true;
            }else if(curScore >= needCnt) {       // 可领取
                this._status = 1;
                this.btn_buy.visible = true;
                this.img_buy.visible = false;
                this.btn_buy.redPoint.visible = true;
            } else {        // 不可领取
                this._status = 0;
                this.btn_buy.visible = true;
                this.img_buy.visible = false;
                this.btn_buy.redPoint.visible = false;
            }
        }

        private onClick(): void {
            if (!this.data) {
                return;
            }
            if(this._status == 1) {
                this._proxy.c2s_tour_fuli_buy(this.data.index);
            }
        }

    }
}