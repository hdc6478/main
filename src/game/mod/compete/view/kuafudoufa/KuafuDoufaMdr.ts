namespace game.mod.compete {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import ParamConfig = game.config.ParamConfig;
    import GameNT = base.GameNT;

    export class KuafuDoufaMdr extends EffectMdrBase implements UpdateItem {
        private _view: KuafuDoufaView = this.mark("_view", KuafuDoufaView);
        private _proxy: CompeteProxy;
        private _itemList: ArrayCollection;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Compete);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_achieve, TouchEvent.TOUCH_TAP, this.onClickAchieve);
            addEventListener(this._view.btn_enter, TouchEvent.TOUCH_TAP, this.onClickEnter);

            this.onNt(CompeteEvent.KUAFU_DOUFA_COUNT_UPDATE, this.updateCnt, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_STATE_UPDATE, this.updateState, this);
            this.onNt(CompeteEvent.KUAFU_DOUFA_ENROLL_UPDATE, this.updateState, this);

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateState();
            this.updateTime();
            this.updateRankTime();
            this.updateTaskHint(HintMgr.getHint(this._proxy.taskHint));

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.kuafu_doufa_rule_tips));
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Compete, CompeteViewType.KuafuDoufaRankMain);
        }

        private onClickAchieve(): void {
            facade.showView(ModName.Compete, CompeteViewType.KuafuDoufaAchieve);
        }

        private onClickEnter(): void {
            let state = this._proxy.state;
            if ((state == KuafuDoufaState.Open || state == KuafuDoufaState.Enroll) && this._proxy.leftCnt <= 0 && !this._proxy.isJoin) {
                PromptBox.getIns().show(getLanById(LanDef.kuafu_doufa_tips4));
                return;
            }
            this._proxy.c2s_kuafudoufa_click(KuafuDoufaOpType.Enroll);
        }

        private initShow(): void {
            let cfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_reward");
            let list: number[][] = cfg.value;
            this._itemList.source = list;
        }

        private updateState(): void {
            let state = this._proxy.state;
            let hasEnroll = this._proxy.hasEnroll;//是否报名

            this._endTime = this._proxy.getNextTime();//计算时间

            let showEnroll = state == KuafuDoufaState.Enroll && !hasEnroll;//是否显示报名
            this._view.btn_enter.visible = state == KuafuDoufaState.Open || showEnroll;
            this._view.btn_enter.labelDisplay.text = showEnroll ? "报名" : "进入";
            this._view.btn_enter.redPoint.visible = state == KuafuDoufaState.Open || showEnroll;

            this._view.img_state.visible = !this._view.btn_enter.visible;
            //已结束，已报名，未报名
            this._view.img_state.source = state == KuafuDoufaState.End ? "yijieshu" : (hasEnroll ? "yibaoming" : "weibaoming");

            this._view.lab_cnt.visible = state == KuafuDoufaState.Open;
            this._view.img_tips.visible = state != KuafuDoufaState.Open;
            this.updateCnt();
        }

        private updateCnt(): void {
            if (this._view.lab_cnt.visible) {
                let leftCnt = this._proxy.leftCnt;
                let cfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_count");
                let maxCnt = cfg && cfg.value;
                this._view.lab_cnt.text = getLanById(LanDef.kuafu_doufa_tips3) + "：" + "（" + leftCnt + "/" + maxCnt + "）";
            }
        }

        update(time: base.Time): void {
            this.updateTime();
            this.updateRankTime();
        }

        private updateTime(): void {
            let state = this._proxy.state;
            let sufStr = getLanById(LanDef.kuafu_doufa_tips1) + getLanById("kuafu_doufa_state_tips" + state);
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem2.updateLeftTime(leftTime, sufStr);
        }

        private updateRankTime(): void {
            let endTime = TimeUtil.getNextWeekTime();
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime);
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.taskHint)) {
                this.updateTaskHint(data.value);
            }
        }

        private updateTaskHint(hint: boolean) {
            this._view.btn_achieve.redPoint.visible = hint;
        }
    }
}