namespace game.mod.xianyuan {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;

    export class XianlvDoufaMdr extends MdrBase implements UpdateItem {
        private _view: XianlvDoufaView = this.mark("_view", XianlvDoufaView);

        private _proxy: XianlvDoufaProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        private _endTime: number;
        private _time: number;
        private _success: boolean;
        private readonly TIME_TICK: number = 3;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianlvDoufa);

            this._view.list.itemRenderer = XianlvDoufaLightItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_fight, egret.TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.checkbox, egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule);
            this.onNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_INFO, this.onUpdateView, this);
            this.onNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_AUTO, this.onUpdateSuccess, this);
        }

        protected onShow(): void {
            // this._proxy.c2s_xianlv_pvp_oper(1);
            super.onShow();
            this._success = false;
            this.onUpdateView();
            this.onUpdateTime();
            if (this._proxy.count) {
                this.onUpdateAuto();
            }

            if (this._proxy.show_tips) {
                ViewMgr.getIns().showSecondPop(ModName.Xianyuan, XianyuanViewType.XianlvDoufaTips);
            }
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateSuccess(n: GameNT): void {
            this._success = n.body;
            if (!this._success) {
                this.onUpdateAuto();
            }
        }

        private onUpdateView(): void {
            if (this._proxy.count) {
                this._view.currentState = "2";

                let xianlvdoufa_xiandeng: number = this._proxy.xianlvdoufa_xiandeng;
                let list: boolean[] = [];
                for (let i: number = 0; i < xianlvdoufa_xiandeng; i++) {
                    list.push(i < this._proxy.count)
                }
                this._listData.replaceAll(list);

                this._view.btn_fight.setHint(this._proxy.count > 0);
            } else {
                this._view.currentState = "1";
                this._proxy.auto = false;
                let xianlvdoufa_cost: number[] = this._proxy.xianlvdoufa_cost;
                this._view.coinItem.setData(xianlvdoufa_cost[0]);

                this._view.btn_fight.setHint(BagUtil.checkPropCnt(xianlvdoufa_cost[0], xianlvdoufa_cost[1]));
            }
            this._view.reward.updateShow();
        }

        private onUpdateAuto(): void {
            this._view.checkbox.selected = this._proxy.auto;
            if (this._proxy.auto) {
                this._time = this.TIME_TICK;
            }
            this.onUpdateAutoTime();
        }

        private onUpdateAutoTime(): void {
            if (this._proxy.auto) {
                if (this._time <= 0) {
                    this._view.checkbox.labelDisplay.text = getLanById(LanDef.xiuxiannvpu_tips7);
                } else {
                    this._view.checkbox.labelDisplay.text = `${this._time}S后自动挑战`;
                }
                // this._view.checkbox.labelDisplay.text = `${this._time}S后自动挑战`;
            } else {
                this._view.checkbox.labelDisplay.text = getLanById(LanDef.xiuxiannvpu_tips7);
            }
        }

        private onClickFight(): void {
            this._proxy.auto = false;
            this.onFight();
        }

        private onFight(): void {
            if (this._proxy.count) {
                this._proxy.c2s_xianlv_pvp_challenge(1);
            } else {
                if (!BagUtil.checkPropCnt(this._proxy.xianlvdoufa_cost[0], this._proxy.xianlvdoufa_cost[1])) {
                    let xianlvdoufa_buycost = this._proxy.xianlvdoufa_buycost;
                    let prop: PropData = PropData.create(xianlvdoufa_buycost[0], xianlvdoufa_buycost[1]);
                    let cost: string = `${prop.count}${prop.cfg.name}`;
                    let count: string = `${this._proxy.buy_count}/${this._proxy.xianlvdoufa_buy}`;
                    let content: string = StringUtil.substitute(getLanById(LanDef.xianlvdoufa_tips2), [cost, count]);
                    ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, () => {
                        this._proxy.c2s_xianlv_pvp_oper(5);
                    }))
                    return;
                }
                ViewMgr.getIns().showConfirm(getLanById(LanDef.xianlvdoufa_tips1), base.Handler.alloc(this, () => {
                    this._proxy.c2s_xianlv_pvp_oper(3);
                }))
            }
        }

        private onClickCheckBox(): void {
            this._proxy.auto = !this._proxy.auto;
            this.onUpdateAuto();
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Xianyuan, XianyuanViewType.XianlvDoufaRank);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xianlvdoufa_tips3));
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
            this._success = false;
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));

            if (this._proxy.auto) {
                this._time--;
                this.onUpdateAutoTime();
                if (this._time <= 0 && !this._success) {
                    this.onFight();
                }
            }
        }
    }
}