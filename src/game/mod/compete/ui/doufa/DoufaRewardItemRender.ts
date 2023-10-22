namespace game.mod.compete {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import MagicTargetConfig = game.config.MagicTargetConfig;

    export class DoufaRewardItemRender extends BaseRenderer {
        private lab_desc: eui.Label;
        private list_reward: eui.List;
        private img_buy: eui.Image;
        private btn_buy: game.mod.Btn;

        public data: MagicTargetConfig;
        private _proxy: CompeteProxy;
        private _cost: number[];
        private _rewardList: ArrayCollection;
        private _canBuy: boolean = false;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
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
            let cnt = this.data.count;
            let curCnt = this._proxy.curCnt;
            let desc = StringUtil.substitute(getLanById(LanDef.doufa_tips5), [cnt])
                +TextUtil.addColor("（" + curCnt + "/" + cnt + "）", curCnt >= cnt ? WhiteColor.GREEN : WhiteColor.RED);
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);

            let rewards = this.data.reward;
            this._rewardList.source = rewards.slice(0, 3);//显示前三个

            let status = this._proxy.getRewardStatus(index);
            let hasBuy = status == RewardStatus.Draw;
            this._canBuy = curCnt >= cnt;
            this.btn_buy.visible = !hasBuy;
            this.img_buy.visible = hasBuy;
            if(this.btn_buy.visible){
                if(this._canBuy){
                    this.btn_buy.setYellow();
                    this._cost = this.data.cost;
                    this.btn_buy.setCost(this._cost);
                    this.btn_buy.labelDisplay.text = "";
                }
                else {
                    this.btn_buy.setBlue();
                    this.btn_buy.resetCost();
                    this.btn_buy.labelDisplay.text = getLanById(LanDef.goto);
                }

                this.btn_buy.redPoint.visible = this._canBuy && BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
            }
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            let index = this.data.index;
            if(!this._canBuy){
                facade.sendNt(ViewEvent.ON_COMMON_BACK);
                return;
            }
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            this._proxy.c2s_pvp_battle_win_count_rewards(index);
        }
    }
}