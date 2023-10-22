namespace game.mod.surface {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import JinjiejiangliConfig = game.config.JinjiejiangliConfig;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class SurfaceGiftItemRender extends BaseRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_buy: eui.Image;
        private btn_buy: game.mod.Btn;

        public data: JinjiejiangliConfig;
        private _proxy: SurfaceProxy;
        private _cost: number[];
        private _rewardList: ArrayCollection;
        private _canBuy: boolean = false;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this.btn_buy.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn_buy.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let index = this.data.index;
            let curStage = this._proxy.getSurfaceStage(this._proxy.headType);
            let desc = StringUtil.substitute(getLanById(SurfaceConfigList[this._proxy.headType] + "_gift_tips"), [index])
                +TextUtil.addColor("（" + curStage + "/" + index + "）", curStage >= index ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);

            let rewards = this.data[SurfaceConfigList[this._proxy.headType] + "_award"];
            this._rewardList.source = rewards;

            let hasBuy = this._proxy.hasGiftBuy(this._proxy.headType, index);
            this._canBuy = curStage >= index;
            this.btn_buy.visible = !hasBuy;
            this.img_buy.visible = hasBuy;
            if(this.btn_buy.visible){
                this._cost = this.data.award_buy[0];
                this.btn_buy.setCost(this._cost);
                this.btn_buy.redPoint.visible = this._canBuy && BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
            }
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let index = this.data.index;
            if(!this._canBuy){
                PromptBox.getIns().show(getLanById(LanDef.jinjielibao_tips2));
                return;
            }
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            this._proxy.c2s_buy_reward(this._proxy.headType, index);
        }
    }
}