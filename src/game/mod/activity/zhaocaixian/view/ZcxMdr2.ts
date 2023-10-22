namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import ZcxCoinsBankConfig = game.config.ZcxCoinsBankConfig;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class ZcxMdr2 extends EffectMdrBase implements UpdateItem {
        private _view: ZcxView2 = this.mark("_view", ZcxView2);
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;
        private _saveCnt = 0;//存取仙玉数额
        private _endTime = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            let cfg = GameConfig.getParamConfigById('zcx_access_money');
            this._saveCnt = cfg.value;
            this._view.btn_get.setBlue();
            this._view.btn_get.setCost([PropIndex.Xianyu, this._saveCnt], getLanById(LanDef.zcx_tips37));
            this._view.btn_save.setCost([PropIndex.Xianyu, this._saveCnt], getLanById(LanDef.zcx_tips38));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet, this);
            addEventListener(this._view.btn_save, TouchEvent.TOUCH_TAP, this.onClickSave, this);
            addEventListener(this._view.btn_receive, TouchEvent.TOUCH_TAP, this.onClickReceive, this);
            this.onNt(ActivityEvent.ON_ZCX_COINS_BANK_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            let cfg = GameConfig.getParamConfigById('zcx_reward_time_max');
            let str = StringUtil.substitute(getLanById(LanDef.zcx_tips29), [cfg.value]);
            this._view.lb_interest.textFlow = TextUtil.parseHtml(str);

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        private updateView(): void {
            let model = this._proxy.model;
            let value = model.value.toNumber();
            this.addBmpFont(StringUtil.getPowerNumStr(value, 1, "", 6), BmpTextCfg[BmpTextType.XianYu1],
                this._view.gr_xianyu, true, 1, false, 0, true);
            let cfg: ZcxCoinsBankConfig = getConfigByNameId(ConfigName.ZcxCoinsBank, 1);//配置第一条

            if (model.item_list && model.item_list.length) {
                this._listData.source = model.item_list.concat();
            } else {
                let reward: number[][] = this._proxy.getBankReward(value);
                this._listData.source = reward;
            }

            this.updateTimeView();

            this._view.gr.visible = !value;
            if (!value) {
                let str = getLanById(LanDef.zcx_tips30);
                let propCfg = GameConfig.getPropConfigById(cfg.rewards[0]);
                if (propCfg) {
                    str += cfg.rewards[1] + propCfg.name;
                }
                propCfg = GameConfig.getPropConfigById(cfg.rewards2[0]);
                if (propCfg) {
                    str += cfg.rewards2[1] + propCfg.name;
                }
                this._view.lb_saveDesc.text = str;
            }
        }

        private updateTimeView(): void {
            let model = this._proxy.model;
            let value = model.value.toNumber();
            if (!value && !this._proxy.canGetBankInterest()) {
                this._view.lb_time.text = getLanById(LanDef.zcx_tips36);
                TimeMgr.removeUpdateItem(this);
                this._view.lb_time.visible = true;
                this._view.btn_receive.visible = this._view.timeItem.visible = false;
                return;
            }
            this._endTime = this._proxy.getBankEndTime();
            if (TimeMgr.time.serverTimeSecond < this._endTime) {
                this.updateTimeLb();
                TimeMgr.addUpdateItem(this, 1000);
                this._view.timeItem.visible = true;
                this._view.lb_time.visible = this._view.btn_receive.visible = false;
                return;
            }
            TimeMgr.removeUpdateItem(this);
            this._view.lb_time.visible = this._view.timeItem.visible = false;
            this._view.btn_receive.visible = true;
            this._view.btn_receive.setHint(this._proxy.canGetBankInterest());
        }

        private onClickGet(): void {
            let val = this._proxy.model.value.toNumber();
            if (val > this._saveCnt) {
                this._proxy.c2s_zcx_coins_bank_button(2);
                return;
            }
            if (val == this._saveCnt) {
                ViewMgr.getIns().showConfirm(getLanById(LanDef.zcx_tips31),
                    Handler.alloc(this, this.onGetConfirmFunc));
                return;
            }
            PromptBox.getIns().show(getLanById(LanDef.zcx_tips35));
        }

        private onGetConfirmFunc(): void {
            this._proxy.c2s_zcx_coins_bank_button(2);
        }

        private onClickSave(): void {
            if (this._proxy.isMaxBankSave()) {
                PromptBox.getIns().show(getLanById(LanDef.zcx_tips32));
                return;
            }
            if (BagUtil.checkPropCnt(PropIndex.Xianyu, this._saveCnt)) {
                this._proxy.c2s_zcx_coins_bank_button(1);
                return;
            }
            ViewMgr.getIns().showConfirm(getLanById(LanDef.zcx_tips33), Handler.alloc(this, this.onConfirmFunc));
        }

        private onConfirmFunc(): void {
            ViewMgr.getIns().openCommonRechargeView();
        }

        private onClickReceive(): void {
            if (this._proxy.canGetBankInterest()) {
                this._proxy.c2s_zcx_coins_bank_get_rewards();
            } else {
                PromptBox.getIns().show(getLanById(LanDef.zcx_tips34));
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                this.updateTimeView();
                return;
            }
            this.updateTimeLb();
        }

        private updateTimeLb(): void {
            this._view.timeItem.updateTime(this._endTime);
        }
    }
}