namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import Tween = base.Tween;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class YijieSceneMdr extends MdrBase {
        private _view: YijieSceneView = this.mark("_view", YijieSceneView);
        private _proxy: YijieProxy;
        private _costIdx: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Yijie);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_rateBoss, TouchEvent.TOUCH_TAP, this.onClickRateBoss);
            addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);

            this.onNt(YijieEvent.ON_YIJIE_SCENE_UPDATE, this.updateInfo, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateGiftTips();
            this.updateInfo();
            this.updateCost();
        }

        protected onHide(): void {
            this.removeTipsTween();
            super.onHide();
        }

        private onClickGift(): void {
            this.setGiftTips(false);
            ViewMgr.getIns().showGift(ProductId.Id100015);
        }

        private onClickReward(): void {
            this._proxy.c2s_yijie_show_reward();
        }

        private onClickRateBoss(): void {
            let value = this._proxy.bossValue;
            let maxValue = this._proxy.getBossMaxValue();
            let cnt = maxValue - value;
            let tipsStr = StringUtil.substitute(getLanById(LanDef.yijie_tips5), [cnt]);
            PromptBox.getIns().show(tipsStr);
        }

        private onClickBoss(): void {
            ViewMgr.getIns().showSecondPop(ModName.Yijie, YijieViewType.YijieBossList);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(this._costIdx) < 0){
                return;
            }
            this.updateCost();
        }

        private updateGiftTips(): void {
            let productId = ProductId.Id100015;
            let showGift = PayUtil.checkShowGift(productId);
            this._view.grp_gift.visible = showGift;
            if(showGift){
                let hasBuy = PayUtil.hasBuy(productId);
                this.setGiftTips(!hasBuy);

                let cfgList = PayUtil.getPrivilegeCfgList(productId);
                let cfg = cfgList && cfgList[0] || null;
                let addVal = cfg && cfg.yijie_xianchong_count || 5;
                let addStr = getLanById(LanDef.yijie_tips3) + "+" + addVal;
                this._view.lab_add.text = addStr;
            }
        }

        private setGiftTips(show: boolean): void {
            this._view.img_tips.visible = show;
            if(show){
                this._view.img_tips.x = -57;
                Tween.get(this._view.img_tips, {loop: true})
                    .to({x: -20}, 500)
                    .to({x: -57}, 500);
            }
            else {
                this.removeTipsTween();
            }
        }

        private removeTipsTween(): void {
            Tween.remove(this._view.img_tips);
        }

        private updateInfo(): void {
            let luckyStr = getLanById(LanDef.yijie_tips3) + "：" + TextUtil.addColor(this._proxy.count + "", BlackColor.GREEN);
            this._view.lab_lucky.textFlow = TextUtil.parseHtml(luckyStr);

            let cntStr = getLanById(LanDef.yijie_tips4) + "：" + TextUtil.addColor(this._proxy.memberNum + "", BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);

            let value = this._proxy.bossValue;
            let maxValue = this._proxy.getBossMaxValue();
            this._view.bar.show(value, maxValue, false, 0, false);
        }

        private updateCost(): void {
            let cost = this._proxy.getCost();
            let index = cost[0];
            let cnt = cost[1];
            this._costIdx = index;
            this._view.cost.updateShow([index, cnt]);
        }

    }
}