namespace game.mod.more {


    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import FengmoDamageRewardConfig = game.config.FengmoDamageRewardConfig;
    import ParamConfig = game.config.ParamConfig;
    import Handler = base.Handler;

    export class FengmoMdr extends EffectMdrBase implements UpdateItem {
        private _view: FengmoView = this.mark("_view", FengmoView);
        private _proxy: FengmoProxy;

        private _endTime: number;
        private _eftIdx: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Fengmo);

            this._view.lab_tips.text = getLanById(LanDef.xianzong_tips7);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);

            this.onNt(HuangguEvent.ON_UPDATE_FENGMO_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_guild_fengmo_get_info();
            super.onShow();
            // this.onUpdateView();
            this.onUpdateTime();
            this.onUpdateModel();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateModel(): void {
            if (this._eftIdx) {
                this.removeEffect(this._eftIdx);
            }
            let guild_fengmo_model: number = this._proxy.guild_fengmo_model;
            this._eftIdx = this.addMonster(guild_fengmo_model, this._view.grp_eft);
        }

        public onUpdateView(): void {
            let info = this._proxy.mvp_info;
            if (info) {
                this._view.headMvp.updateMvp({ info });
            } else {
                this._view.headMvp.updateMvp(null);
            }

            this._view.reward.updateShow(this._proxy.total_times);

            let cfg: FengmoDamageRewardConfig = this._proxy.hurt_cfg;
            let target: number = cfg.damage_value * 10000;
            this._view.progress.show(this._proxy.damage_value, target, false);
            let hurtStr: string = StringUtil.getHurtNumStr(this._proxy.damage_value);
            let maxStr: string = StringUtil.getHurtNumStr(target);
            this._view.progress.showLabel(`${this._proxy.damage_value > target ? maxStr : hurtStr}/${maxStr}`);

            let hurt: string = StringUtil.getHurtNumStr(this._proxy.my_max_damage);
            this.addBmpFont(hurt, BmpTextCfg[BmpTextType.CommonPower2], this._view.grp_hurt, true, 1, false, 0, true);

            this._view.btn_reward.setHint(this._proxy.getDamageHint());

            this._view.btn_fight.setHint(this._proxy.times > 0 && RoleUtil.isInUnion());

            this._view.btn_rank.setHint(HintMgr.getHint([ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.Fengmo, HintType.UnionRank]));

            this.onUpdateCnt();
        }

        private onUpdateCnt(): void {
            let cnt: number = this._proxy.times;
            let team_conquest_num: number = this._proxy.guild_fengmo_meiricishu;
            let color = !cnt ? BlackColor.RED : BlackColor.GREEN;
            this._view.lab_times.textFlow = TextUtil.parseHtml(`次数:${TextUtil.addColor(`${cnt}/${team_conquest_num}`, color)}`);
        }

        protected onHide(): void {
            super.onHide();
            if (this._eftIdx) {
                this.removeEffect(this._eftIdx);
                this._eftIdx = 0;
            }
        }

        private onClickFight(): void {
            if (!this._proxy.times) {
                PromptBox.getIns().show("次数不足");
                return;
            }
            if (!RoleUtil.isInUnion()) {
                PromptBox.getIns().show("请先加入仙宗");
                return;
            }
            if (!this._proxy.my_max_damage) {
                this._proxy.c2s_guild_fengmo_battle(1);
            } else {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.FengmoFight);
            }
        }

        private onClickAdd(): void {
            let maxBuyCnt: number = this._proxy.guild_fengmo_meiricishu - this._proxy.times;
            if (!maxBuyCnt) {
                PromptBox.getIns().show(getLanById(LanDef.compete_mars_8));
                return;
            }
            let param: ParamConfig = GameConfig.getParamConfigById("guild_goumai_xiaohao");
            if (!BagUtil.checkPropCnt(param.value[0], param.value[1], PropLackType.Dialog)) {
                return;
            }
            let maxCnt: number = this._proxy.guild_fengmo_meirixiangou;
            let cnt: number = maxCnt - this._proxy.buy_times;
            if (!cnt) {
                PromptBox.getIns().show(getLanById(LanDef.compete_mars_9));
                return;
            }
            let tips: string = "是否花费%s购买%s次挑战次数？";
            ViewMgr.getIns().showBuyTimes(tips, param.value, cnt, maxBuyCnt, maxCnt, Handler.alloc(this._proxy, this._proxy.c2s_buy_fengmo_tiaozhan_times));
        }

        private onClickReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.FengmoHurtReward);
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.FengmoRank);
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }
    }
}