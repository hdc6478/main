namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import GuildYibaoBoxConfig = game.config.GuildYibaoBoxConfig;
    import GameNT = base.GameNT;
    import Handler = base.Handler;

    /**遗宝 */
    export class UnionTreasureMdr extends EffectMdrBase implements UpdateItem {
        private _view: UnionTreasureView = this.mark("_view", UnionTreasureView);
        private _proxy: UnionProxy;

        private readonly _len: number = 4;
        private eft_id: number;
        private _endTime: number;
        private _cfg: GuildYibaoBoxConfig;
        private _costIdx: number;
        private _recoverTime: number;

        private _beginTime: number = 0;
        private _isHasGuide = false;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list_item.itemRenderer = UnionTreasureItem;
            this._view.list_item.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.hpItem.btn_reward, TouchEvent.TOUCH_TAP, this.onClickPreview);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_help, TouchEvent.TOUCH_TAP, this.onClickHelp);
            addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClickOneKey);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_once, TouchEvent.TOUCH_TAP, this.onClickOnce);
            this.onNt(UnionEvent.ON_UPDATE_TREASURE_INFO, this.onUpdateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
            addEventListener(this._view, TouchEvent.TOUCH_TAP, this.onClickKey);
        }

        private onClickKey(): void {
            this._beginTime = Date.now();
        }

        protected onShow(): void {
            this._proxy.c2s_guild_yibao_request(1);
            super.onShow();
            // this.onUpdateView();
            this._proxy.open_fun = UnionMainType.UnionTreasure;
            this._isHasGuide = false;
            this._beginTime = Date.now();

            this.onUpdateTime();

        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateView(): void {
            this._recoverTime = this._proxy.recover_time;

            let list = this._proxy.box_list || [];
            for (let i = 0; i < this._len; i++) {
                if (!list || !list[i]) {
                    list.push(null);
                }
            }
            this._listData.replaceAll(list);

            this._cfg = getConfigByNameId(ConfigName.GuildYibaoBox, this._proxy.boss_index);
            this._costIdx = this._cfg.boss_cost[0];
            this.onUpdateProp();

            if (this.eft_id) {
                this.removeEffect(this.eft_id);
            }
            this.eft_id = this.addMonster(this._cfg.boss_model, this._view.grp_eff);

            let hp: number = this._proxy.boss_hp;
            let boss_hp: number = this._cfg.boss_hp;
            let index: number = this._cfg.boss_model;
            this._view.hpItem.setData({ index, hp, boss_hp });

            this._view.btn_reward.setHint(this._proxy.getTaskHint());
            this._view.btn_rank.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure, HintType.UnionRank]));
        }

        private onUpdateProp(): void {
            let count: number = BagUtil.getPropCntByIdx(this._costIdx);
            this._view.timeItem2.visible = !count;
            if (this._view.timeItem2.visible) {
                // this.update(TimeMgr.time);
                let leftTime2 = this._recoverTime - TimeMgr.time.serverTimeSecond;
                this._view.timeItem2.updateLeftTime(leftTime2, "后恢复10次");
            }
            this._view.btn_onekey.visible = !!count && RoleUtil.hasPrivilege(RolePrivilegeKey.zong_sweep);
            this._view.coinItem.lab_cost.textColor = count <= 0 ? WhiteColor.RED : 0xffffff;
            this._view.coinItem.setData(this._costIdx);
            if (this._view.btn_onekey.visible) {
                this._view.btn_onekey.setHint(BagUtil.checkPropCnt(this._cfg.boss_cost[0], this._cfg.boss_cost[1]));
            }
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if (indexs.indexOf(this._costIdx) > -1) {
                this.onUpdateProp();
            }
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));

            if (this._view.timeItem2.visible && this._recoverTime) {
                let leftTime2 = this._recoverTime - TimeMgr.time.serverTimeSecond;
                if (leftTime2 > 0) {
                    this._view.timeItem2.updateLeftTime(leftTime2, "后恢复10次");
                } else {
                    // this.onUpdateProp();
                    this._view.timeItem2.visible = false;
                    this._proxy.c2s_guild_yibao_request(1);
                }
            }

            if (!this._isHasGuide && Date.now() - this._beginTime >= 2000) {
                this._isHasGuide = true;
                GuideMgr.getIns().show(GuideKey.GongNengTips, this._view.grp_eff, Handler.alloc(this, this.onClickOnce), null, { x: 0, y: -80 });
            }
        }

        private onClickPreview(): void {
            ViewMgr.getIns().showBoxReward("", this._cfg.rewards2);
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionTreasureRank);
        }

        private onClickHelp(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionTreasureHelp);
        }

        private onClickOneKey(): void {
            if (!BagUtil.checkPropCnt(this._cfg.boss_cost[0], this._cfg.boss_cost[1], PropLackType.Dialog)) {
                return;
            }
            if (this._proxy.box_list.length >= this._len) {
                ViewMgr.getIns().showConfirm(getLanById(LanDef.guild_oper_tips_3), Handler.alloc(this, () => {
                    this._proxy.c2s_guild_yibao_click(2);
                }));
                return;
            }
            this._proxy.c2s_guild_yibao_click(2);
        }

        private onClickOnce(): void {
            GuideMgr.getIns().clear(GuideKey.GongNengTips);
            if (!BagUtil.checkPropCnt(this._cfg.boss_cost[0], this._cfg.boss_cost[1], PropLackType.Dialog)) {
                PromptBox.getIns().show("道具不足");
                return;
            }
            this._proxy.c2s_guild_yibao_click(1);
        }

        private onClickReward(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionTreasureReward);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            GuideMgr.getIns().clear(GuideKey.GongNengTips);
            super.onHide();
        }
    }
}