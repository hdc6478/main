namespace game.mod.activity {
    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import GameNT = base.GameNT;

    export class XianchiMdr extends EffectMdrBase {
        private _view: XianchiView = this.mark("_view", XianchiView);
        private _proxy: XianchiProxy;
        private _cost: number[];
        private _itemList: XianchiItem[];
        private _canDraw: boolean;

        protected onInit(): void {
            super.onInit();

            this._proxy = this.retProxy(ProxyType.Xianchi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_big, TouchEvent.TOUCH_TAP, this.onClickBig);
            addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);

            this.onNt(ActivityEvent.ON_UPDATE_XIANCHI_INFO, this.onInfoUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTips();
            this.updateCost();
            this.updateItemList();
            this.updateHint(HintMgr.getHint(this._proxy.hintType));
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianchi_tips5));
        }

        private onClickReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.XianchiReward);
        }

        private onClickBig(): void {
            //只做tips展示
            let index = this._proxy.getLayerRewardIndex();
            ViewMgr.getIns().showPropTips(index);
        }

        private onClickDraw(): void {
            if(this._canDraw){
                this._proxy.c2s_xian_chi_qi_yuan_click(XianchiOpType.Big);
                return;
            }
            if (!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_xian_chi_qi_yuan_click(XianchiOpType.Draw);
        }

        private onInfoUpdate(): void {
            //数据刷新
            this.updateItemList();
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let costIdx = this._cost[0];
            if(indexs.indexOf(costIdx) < 0){
                return;
            }
            this.updateCost();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.hintType)) {
                this.updateHint(data.value);
            }
        }

        private initShow(): void {
            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5,
                this._view.item6,
                this._view.item7,
                this._view.item8,
                this._view.item9
            ];
        }

        private updateTips(): void {
            //今日充值达到%s元赠送[%s]
            let cfg: ParamConfig = GameConfig.getParamConfigById("xianchi_recharge");
            let costInfo: number[][] = cfg && cfg.value;
            let rmb = costInfo[0][0];//充值金额
            let index = costInfo[1][0];//赠送道具
            let cnt = costInfo[1][1];//赠送道具数量
            let prop = PropData.create(index);
            let propName = prop.getPropNameStr();
            let curRmb = Math.min(RoleVo.ins.day_charge_rmb, rmb);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.xianchi_tips2), [rmb, propName]) +
            "X" + cnt + TextUtil.addColor("(" + curRmb + "/" + rmb + ")", curRmb >= rmb ? WhiteColor.GREEN : WhiteColor.RED);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

        private updateCost(): void {
            this._cost = this._proxy.getCost();
            this._view.cost.updateShow(this._cost);
        }

        private updateItemList(): void {
            for(let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                let index = i + 1;
                let reward = this._proxy.getReward(index);
                item.data = reward;
            }

            //刷新按钮状态
            let canDraw = this._proxy.canDraw();
            this._canDraw = canDraw;
            let drawStr = canDraw ? getLanById(LanDef.xianchi_tips7) : getLanById(LanDef.xianchi_tips6);
            this._view.btn_draw.labelDisplay.text = drawStr;
        }

        private updateHint(hint: boolean) {
            this._view.btn_draw.redPoint.visible = hint;
        }
    }
}