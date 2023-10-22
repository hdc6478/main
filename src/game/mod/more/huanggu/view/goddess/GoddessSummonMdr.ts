namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;
    import GameNT = base.GameNT;
    import Tween = base.Tween;

    export class GoddessSummonMdr extends EffectMdrBase {
        private _view: GoddessSummonView= this.mark("_view", GoddessSummonView);
        private _proxy: HuangguProxy;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Huanggu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_summon, TouchEvent.TOUCH_TAP, this.onClickSummon);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.updateView();
        }

        protected onHide(): void {
            Tween.remove(this._view.img_icon);
            super.onHide();
        }

        private onClickSummon(): void {
            let isOpen = this._proxy.isOpenSummon();
            if(!isOpen){
                PromptBox.getIns().show(getLanById(LanDef.huanggu_nvshen_tips21));
                return;
            }
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.Summon);
        }

        private onClickReward(): void {
            let rewards = this._proxy.getSummonRewards();
            let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_shuijing_gailv");
            let rate = cfg.value / 100;
            let tips = getLanById(LanDef.huanggu_nvshen_tips11) + "：" + TextUtil.addColor(rate + "%", WhiteColor.GREEN);
            let title = getLanById(LanDef.huanggu_nvshen_tips10);
            ViewMgr.getIns().rewardShow(rewards, tips, title);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let index = this._cost && this._cost[0];
            if(index && indexs.indexOf(index) > -1){
                this.updateView();
            }
        }

        private initShow(): void {
            this.addEftByParent(UIEftSrc.Nvshentexiao, this._view.grp_eft);
            Tween.remove(this._view.img_icon);
            this._view.img_icon.y = 429;
            Tween.get(this._view.img_icon, {loop: true})
                .to({y: 459}, 800)
                .to({y: 429}, 800);
        }

        private updateView(): void {
            let isOpen = this._proxy.isOpenSummon();
            let actStr = isOpen ? "" : getLanById(LanDef.huanggu_nvshen_tips20);
            this._view.lab_act.text = actStr;

            let cost = this._proxy.getSummonCost();//荒古水晶
            this._cost = cost;
            let costIndex = cost[0];
            let costCnt = cost[1];
            let curCnt = BagUtil.getPropCntByIdx(costIndex);
            this._view.bar.show(curCnt, costCnt, false, 0, false);

            this._view.btn_summon.redPoint.visible = isOpen && curCnt >= costCnt;
        }
    }
}