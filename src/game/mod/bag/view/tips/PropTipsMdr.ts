namespace game.mod.bag {

    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import prop_use = msg.prop_use;
    import LanDef = game.localization.LanDef;
    import prop_use_params = msg.prop_use_params;
    import Handler = base.Handler;

    export class PropTipsMdr extends MdrBase {
        private _view: PropTipsView = this.mark("_view", PropTipsView);
        private _proxy: BagProxy;
        public _showArgs: PropData;
        private _propData: PropData;
        private _selCnt: number;//选中的数量，默认1
        //private _curCnt: number;
        private _isSel: boolean;//选中奖励
        private readonly SCR_H_USE_AND_EXCHANGE: number = 426;//有使用按钮或者兑换时，滚动区域高度
        private readonly SCR_H_GOTO: number = 500;//有前往按钮时，滚动区域高度
        private readonly SCR_H: number = 624;//没有使用按钮时，滚动区域高度

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Bag);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickUse);
            addEventListener(this._view.btn_subtractTen, TouchEvent.TOUCH_TAP, this.onClickSubtractTen);
            addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_addTen, TouchEvent.TOUCH_TAP, this.onClickAddTen);
            addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);

            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.updateReward();
            this.updateUse();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickUse(): void {
            if (!this._propData) {
                return;
            }
            let prop: prop_use = new prop_use();
            prop.prop_id = this._propData.prop_id;
            prop.use_cnt = this._selCnt;
            if (this._isSel) {
                //选中奖励
                let index = this._view.baseRewardList.getSelIndex();
                if (index < 0) {
                    PromptBox.getIns().show(getLanById(LanDef.select_reward_tips));
                    return;
                }
                prop.use_params = new prop_use_params();
                prop.use_params.choose = index + 1;//服务端需要下标+1
            }
            this._proxy.c2s_prop_list_use([prop]);
            this.hide();
        }

        private onClickSubtractTen(): void {
            this.subtractSelCnt(10);
        }

        private onClickSubtract(): void {
            this.subtractSelCnt(1);
        }

        private onClickAdd(): void {
            this.addSelCnt(1);
        }

        private onClickAddTen(): void {
            this.addSelCnt(10);
        }

        private subtractSelCnt(subtractCnt: number): void {
            let cnt = Math.max(1, this._selCnt - subtractCnt);
            if (cnt == this._selCnt) {
                PromptBox.getIns().show(getLanById(LanDef.min_value));
                return;
            }
            this.setSelCnt(cnt);
        }

        private addSelCnt(addCnt: number): void {
            let cnt = Math.min(this._propData.count, this._selCnt + addCnt);
            if (cnt == this._selCnt) {
                PromptBox.getIns().show(getLanById(LanDef.max_value));
                return;
            }
            this.setSelCnt(cnt);
        }

        private setSelCnt(cnt: number): void {
            this._selCnt = cnt;
            this.updateUseCnt();
        }

        private onClickGoto(): void {
            if (!this._propData) {
                return;
            }
            let cfg = this._propData.cfg as PropConfig;
            let jumpIdx = cfg.jump_id;
            ViewMgr.getIns().showViewByID(jumpIdx);
        }

        private updateShow(): void {
            this._propData = this._showArgs;
            let cfg = this._propData.cfg as PropConfig;
            this._view.basePropTips.updateShow(this._propData);
            let curCnt = BagUtil.getPropCntByIdx(this._propData.index);
            let cntStr = "拥有数量：" + curCnt;
            if (cfg.condition && cfg.condition.length) {
                //背包使用条件
                cntStr = this.getLimitStr(cfg.condition) + "\n" + cntStr;
            }
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            this._view.baseDescItem.updateShow(this._propData.desc);

            if (this._view.basePropGainList) {
                this._view.basePropGainList.updateShow(this._propData.gain_id);
            }
        }

        //显示奖励
        private updateReward(): void {
            let cfg = this._propData.cfg as PropConfig;
            let rewards: number[][] | number[] = [];
            this._isSel = false;//是否可选择
            if (cfg.show_reward) {
                //策划配置了展示道具
                rewards = cfg.show_reward;
            } else if (this._propData.propType == PropType.Box && this._propData.propSubType == PropSubType3.Type2) {
                //自选宝箱
                rewards = cfg.param1;
                this._isSel = true;
            }
            if (!rewards.length) {
                this._view.currentState = "default";
                return;
            }
            this._view.currentState = "reward";
            this._view.baseRewardList.updateShow(rewards, this._isSel);
        }

        private updateUse(): void {
            //优先显示兑换
            this._view.exchangeTips.updateExchangeTips(this._propData, Handler.alloc(this, this.hide));
            let showExchange = this._view.exchangeTips.visible;

            let iconShowType = this._propData.iconShowType;
            let cfg = this._propData.cfg as PropConfig;
            let showUse = false;//显示使用
            let showGoto = false;//显示前往

            if (!showExchange && iconShowType == IconShowType.Bag) {
                showUse = !!cfg.usable;
                showGoto = !showUse && !!cfg.jump_id;//两者只能二选一
            }
            this._view.grp_use.visible = showUse;
            this._view.btn_goto.visible = showGoto;
            this._view.scr.height = showUse || showExchange ? this.SCR_H_USE_AND_EXCHANGE : ( showGoto ? this.SCR_H_GOTO : this.SCR_H);
            if (showUse) {
                //判断选择最大数量
                let selCnt = cfg.max_number ? this._propData.count : 1;
                this.setSelCnt(selCnt);
                //使用时判断使用条件
                let useStr = this._proxy.getUseStr(cfg.condition, this._propData);
                this._view.lab_useTips.text = useStr;
                this._view.btn_use.visible = useStr == "";//返回空的时候，表示能使用
            }
        }

        private updateUseCnt(): void {
            this._view.lab_useCnt.text = this._selCnt + "";
        }

        //使用条件文本
        private getLimitStr(condition: number[][]): string {
            let limitStr = getLanById(LanDef.bag_use_tips) + "：";
            for (let info of condition) {
                let type = info[0];
                let limitValue = info[1];
                switch (type) {
                    case PropUseLimitType.VIP_INDEX:
                        //vip
                        limitStr += VipUtil.getVipStr(limitValue);
                        break;
                    case PropUseLimitType.LOGINDAY :
                        //登录天数
                        limitStr += StringUtil.substitute(getLanById(LanDef.bag_use_tips2), [limitValue]);
                        break;
                    case PropUseLimitType.OwnLoginDay:
                        //拥有天数
                        limitStr += StringUtil.substitute(getLanById(LanDef.bag_use_tips2), [limitValue]);
                        break;
                }
            }
            return limitStr;
        }
    }
}