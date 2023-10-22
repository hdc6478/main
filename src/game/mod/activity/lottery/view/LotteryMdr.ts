namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import PowerDiaRewardConfig = game.config.PowerDiaRewardConfig;
    import Point = egret.Point;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;

    export class LotteryMdr extends EffectMdrBase {
        private _view: LotteryView = this.mark("_view", LotteryView);
        private _proxy: LotteryProxy;
        /**icon坐标和id */
        private posArr: LotteryPosAndId[] = [];
        /**动画圈数 */
        private readonly round: number = 2;
        /**中心点 */
        private readonly center: number = 47;
        /**动画当前位置索引 */
        private cur: number = 0;
        /**奖励id */
        private idx: number;

        private readonly _ingLay: number = 100;
        private readonly _default: number = 1500;

        private delay_idx: number;
        private eff_idx: number;

        /**正在抽奖 */
        private isTween: boolean = false;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Lottery);

            this._view.img_bg.source = ResUtil.getUiJpg("lottery_bg");
            this._view.img_banner.source = ResUtil.getUiJpg("lottery_banner");
            TextUtil.addLinkHtmlTxt2(this._view.lab_tips, "概率公示", "0x4DFB28");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_lottery, TouchEvent.TOUCH_TAP, this.onClickLottry);
            addEventListener(this._view.lab_tips, TouchEvent.TOUCH_TAP, this.onClickTips);
            addEventListener(this._view.btn_recharge, TouchEvent.TOUCH_TAP, this.onRecharge);

            this.onNt(ActivityEvent.ON_OPEN_LOTTERY_TWEEN, this.onOpenTween, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.isTween = false;
            this.onUpdateView();
            this.onInitView();
            this.onUpdateIcon();
        }

        private onUpdateView(): void {
            let over: boolean = this._proxy.isOver;
            this._view.currentState = over ? "over" : "defaut";

            if (over) {
                return;
            }
            let count = this._proxy.model.count;
            let bool: boolean = count > 0;

            this._view.btn_recharge.visible = !bool;
            if (this._view.btn_recharge.visible) {
                this._view.btn_recharge.setEffect(UIEftSrc.ShouChongQianWang);
            }

            this._view.btn_lottery.visible = bool;
            if (this._view.btn_lottery.visible) {
                this._view.btn_lottery.label = `抽奖(${count})`;
                this._view.btn_lottery.setEffect(UIEftSrc.ShouChongQianWang);
                this._view.btn_lottery.setHint(HintMgr.getHint([ModName.Activity, MainActivityViewType.Lottery]));
            }
        }

        private onInitView(): void {
            let cfg = this._proxy.cfgReward;
            this._view.icon.setData(cfg.award[0]);
            //是否是否全部抽完
            if (this._proxy.isOver) {
                return;
            }
            this._view.lab_cur.text = `当前战力：${RoleVo.ins.showpower.toNumber()}`;
            this._view.lab_tar.text = `目标战力：${this._proxy.targetPower}`;
        }

        private onUpdateIcon(): void {
            this.isTween = false;
            this.posArr.length = 0;
            let cfgArr = getConfigListByName(ConfigName.PowerDiaReward);
            for (let i = 1; i <= cfgArr.length; i++) {
                let icon: IconReward = this._view[`icon_${i}`];
                let cfg: PowerDiaRewardConfig = cfgArr[i - 1];
                let prop: PropData = PropData.create(cfg.award[0], cfg.award[1]);
                let isGot: boolean = this._proxy.getRewardGot(cfg.index);
                let isReward: boolean = !!cfg.luxury;
                icon.setData({prop, isGot, isReward});
                if (!isGot) {
                    this.posArr.push({pos: Point.create(icon.x, icon.y), id: cfg.index});
                }
            }
            this.onTween();
        }

        private onOpenTween(n: GameNT): void {
            this.idx = n.body;
            this.onUpdateView();
            this.cur = 0;
            this.onTween();
        }

        private onTween(): void {
            let posData: LotteryPosAndId = this.selectData;
            if (!posData) {
                this.onClear();
                return;
            }
            this._view.grp_eff.x = posData.pos.x + this.center;
            this._view.grp_eff.y = posData.pos.y + this.center;

            this.eff_idx && this.removeEffect(this.eff_idx);
            this.eff_idx = this.addEftByParent(UIEftSrc.PropEffect, this._view.grp_eff, 0, 0, 1, null, 1);
            this.cur++;

            let round: number = this.cur / this.posArr.length;
            if (this.isTween && posData.id == this.idx && round >= this.round) {
                this.onOver();
                return;
            }
            let delay: number = this.isTween ? this._ingLay : this._default;
            this.delay_idx && clearDelay(this.delay_idx);
            this.delay_idx = delayCall(Handler.alloc(this, this.onTween), delay);
        }

        private onOver(): void {
            this.onClear();

            let cfg: PowerDiaRewardConfig = getConfigByNameId(ConfigName.PowerDiaReward, this.idx);
            PropTipsMgr.getIns().showBestPropArray([cfg.award]);

            this.onUpdateIcon();
        }

        private onClickLottry(): void {
            if (this.isTween) {
                PromptBox.getIns().show(getLanById(LanDef.zhengzaichoujiang));
                return;
            }
            this.isTween = true;
            this._proxy.c2s_power_dia_draw();
        }

        /**提示说明 */
        private onClickTips(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.zhanlizhuanpantips3))
        }

        private onRecharge(): void {
            ViewMgr.getIns().openCommonRechargeView();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.Lottery])) {
                this._view.btn_lottery.redPoint.visible = data.value;
            }
        }

        private get selectData(): LotteryPosAndId {
            if (!this.posArr.length) {
                return this.posArr[0];
            }
            let idx: number = this.cur % this.posArr.length;
            return this.posArr[idx];
        }

        protected onHide(): void {
            this.isTween = false;
            this.onClear();
            super.onHide();
        }

        private onClear(): void {
            this.delay_idx && clearDelay(this.delay_idx);
            this.delay_idx = 0;
            this.eff_idx && this.removeEffect(this.eff_idx);
            this.eff_idx = 0;
        }
    }

    export interface LotteryPosAndId {
        pos: Point;
        id: number;
    }
}