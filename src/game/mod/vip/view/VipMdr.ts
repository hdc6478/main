namespace game.mod.vip {

    import TouchEvent = egret.TouchEvent;
    import Tween = base.Tween;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import VipConfig = game.config.VipConfig;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;

    export class VipMdr extends EffectMdrBase implements UpdateItem {
        private _view: VipView = this.mark("_view", VipView);
        private _proxy: VipProxy;
        private _listData: eui.ArrayCollection;
        private _showTween = false;
        private _curIdx = 0;//当前展示vip的index
        private _effIdx = 0;
        private _cost: number[];//购买消耗
        private _effCompY = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Vip);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.lb_privilege.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lb_privilege.text,0x41ff28));
            this._effCompY = this._view.effComp.y;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onClickLeft, this);
            addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onClickRight, this);
            addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGoCharge, this);
            addEventListener(this._view.lb_privilege, TouchEvent.TOUCH_TAP, this.onClickGo, this);
            addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClickBuy, this);
            this.onNt(VipEvent.UPDATE_VIP_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._curIdx = this.getIdx();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            if (TimeMgr.hasUpdateItem(this)) {
                TimeMgr.removeUpdateItem(this);
            }
            this._showTween = false;
            Tween.remove(this._view.effComp);
            this._view.effComp.y = this._effCompY;
            this._cost = null;
        }

        //跳到下一个可以领取奖励的，没有则是当前等级的下一级
        private getIdx(): number {
            let minIdx = this._proxy.getMinBuyIdx();
            if (minIdx) {
                return minIdx;
            }
            let idx = this._proxy.model.idx;
            if (this._proxy.isMaxVip()) {
                return idx;
            }
            return idx + 1;
        }

        private onUpdateView(): void {
            this._curIdx = this.getIdx();
            this.updateView();
        }

        private updateView(): void {
            let cfg = this._proxy.getVipCfg(this._curIdx);
            if (!cfg) {
                return;
            }
            this._view.btn_left.visible = (VipUtil.getShowVipLv(this._curIdx)) != 0;
            this._view.btn_left.setHint(this.getBtnHint());
            this._view.btn_right.visible = this.canShowRightBtn();
            this._view.btn_right.setHint(this.getBtnHint(false));

            this._view.img_next.text = StringUtil.substitute(getLanById(LanDef.vip_tips1), [VipUtil.getVipStr(this._curIdx)]);

            this._view.img_vipdesc.source = ResUtil.getUiPng(cfg.tagline2);

            let info = this._proxy.getRewardInfo(this._curIdx);
            let curTime = TimeMgr.time.serverTimeSecond;
            this._view.lb_time.text = '';
            let rewards: number[][];
            if (info && info.timer != 0 && info.timer > curTime) {
                this._view.btn_buy.visible = this._view.btn_go.visible = false;
                let leftTime = info.timer - curTime;
                this.updateTime(leftTime);
                TimeMgr.addUpdateItem(this, leftTime > Second.Hour ? 1000 * 60 : 1000);
                rewards = cfg.daily_gift_bag;
            } else if (info && info.state == 2) {
                let cost: number[];
                if (info.timer) {
                    cost = cfg.daily_cost_item[0];
                } else {
                    cost = cfg.cost_item[0];
                }
                this._view.btn_buy.setCost(cost);
                this._cost = cost;
                this._view.btn_buy.visible = true;
                this._view.btn_go.visible = false;
                this._view.btn_buy.setHint(cost && BagUtil.checkPropCnt(cost[0], cost[1]));
                TimeMgr.removeUpdateItem(this);
                rewards = info.timer ? cfg.daily_gift_bag : cfg.privilege_gift_bag;//有时间，表示非第一次购买
            } else {
                let vipLv = VipUtil.getShowVipLv(this._curIdx);
                if (vipLv == 0) {
                    this._view.btn_buy.visible = true;
                    let cost = cfg.cost_item[0];
                    this._cost = cost;
                    this._view.btn_buy.setCost(cost);
                    this._view.btn_go.visible = false;
                    this._view.btn_buy.setHint(cost && BagUtil.checkPropCnt(cost[0], cost[1]));
                } else {
                    this._view.btn_buy.visible = false;
                    this._view.btn_go.visible = true;
                    let canGet = this._proxy.canGetReward(this._curIdx);
                    this._view.btn_go.label = canGet ? getLanById(LanDef.tishi_29) : getLanById(LanDef.exp_pool15);
                    this._view.btn_go.setHint(canGet);
                }
                TimeMgr.removeUpdateItem(this);
                rewards = cfg.privilege_gift_bag;
            }
            this._listData.source = rewards;

            this.removeEffect(this._effIdx);
            this._view.gr_eff.y = cfg.modelY;
            if (cfg.showmodel) {
                this._effIdx = this.addEftByParent(cfg.showmodel, this._view.gr_eff, 0, 0, -1, null, 0,
                    cfg.modelSize || 1);
            } else if (rewards && rewards[0]) {
                let propCfg: PropConfig = GameConfig.getPropConfigById(rewards[0][0]);
                if (propCfg && propCfg.param1) {
                    this._effIdx = this.addAnimate(propCfg.param1[0][0], this._view.gr_eff);
                }
            }

            this.updateEffCompView();
            this._view.barComp.updateView(cfg);

            let ary = cfg && cfg.explain ? cfg.explain.split('#N') : [];
            let cnt = ary.length;

            this._view.lb_privilegecnt.text = StringUtil.substitute(getLanById(LanDef.vip_tips2), [cnt]);
        }

        private updateEffCompView(): void {
            if (!this._showTween) {
                let cfg = this._proxy.getVipCfg(this._curIdx);
                this._view.effComp.visible = true;
                this._view.effComp.updateView(cfg);
                this.showTween();
            } else {
                Tween.remove(this._view.effComp);
                this._view.effComp.visible = false;
            }
        }

        private showTween(): void {
            this._showTween = true;
            let y = this._effCompY;
            Tween.get(this._view.effComp, {loop: true})
                .to({y: y + 15}, 1000)
                .to({y: y}, 1000);
        }

        private onClickLeft(): void {
            this._curIdx--;
            this.updateView();
        }

        private onClickRight(): void {
            if (!this.canShowRightBtn()) {
                return;
            }
            this._curIdx++;
            this.updateView();
        }

        private canShowRightBtn(): boolean {
            let curLv = VipUtil.getShowVipLv(this._proxy.model.idx);
            let nextLv = VipUtil.getShowVipLv(this._curIdx);
            let maxShowVip = this._proxy.getMaxShowVip();
            if (curLv <= maxShowVip && nextLv + 1 > maxShowVip) {
                return false;
            }
            return true;
        }

        private onClickGoCharge(): void {
            if (this._view.btn_go.redPoint.visible) {
                this._proxy.c2s_vip_receive_gift(1, this._curIdx);
                return;
            }
            ViewMgr.getIns().openCommonRechargeView();
        }

        // 调整到vip特权界面
        private onClickGo(): void {
            ViewMgr.getIns().showView(ModName.Vip, VipViewType.VipMain, VipMainBtnType.VipPrivilege);
        }

        private onClickBuy(): void {
            if (!this._cost || !BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                return;
            }
            this._proxy.c2s_vip_receive_gift(2, this._curIdx);
        }

        update(time: base.Time) {
            let info = this._proxy.getRewardInfo(this._curIdx);
            let cfg: VipConfig = this._proxy.getVipCfg(this._curIdx);
            let leftTime = (info && info.timer || 0) - time.serverTimeSecond;
            if (!info || !cfg || leftTime < 1) {
                TimeMgr.removeUpdateItem(this);
                this.updateView();
                return;
            }
            this.updateTime(leftTime);
        }

        private updateTime(leftTime: number): void {
            this._view.lb_time.text = TimeUtil.formatSecond(leftTime, leftTime > Second.Hour ? getLanById(LanDef.time_tips1) : getLanById(LanDef.time_tips2)) + '后可继续购买';
        }

        public getBtnHint(isLeft = true): boolean {
            let cfgList = this._proxy.getShowVipCfgList();
            for (let cfg of cfgList) {
                if (!cfg) {
                    continue;
                }
                if ((isLeft && cfg.index < this._curIdx) || (!isLeft && cfg.index > this._curIdx)) {
                    if (this._proxy.canBuy(cfg.index) || this._proxy.canGetReward(cfg.index)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}