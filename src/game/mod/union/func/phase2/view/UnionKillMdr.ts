namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;
    import GuildZhanyaotaiConfig = game.config.GuildZhanyaotaiConfig;
    import guild_zhanyaotai_boss_struct = msg.guild_zhanyaotai_boss_struct;

    export class UnionKillMdr extends EffectMdrBase implements UpdateItem {
        private _view: UnionKillView = this.mark("_view", UnionKillView);
        private _proxy: UnionProxy;
        /**排行榜时间 */
        private _endTime: number;
        /**boss时间 */
        private _endTime2: number;
        /**0没召唤 1召唤中 2领取 */
        private _status: number = 0;
        private _cfg: GuildZhanyaotaiConfig;
        private _cost: number[];
        private _data: guild_zhanyaotai_boss_struct;

        private _listData: ArrayCollection = new ArrayCollection();
        private _rewardData: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionKillItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardData;

            this._view.lab_help.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt("请求协助", WhiteColor.BLUE));
            this._view.btn_summon.setImage("zhaohuanmeishuzi");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
            addEventListener(this._view.btn_summon, TouchEvent.TOUCH_TAP, this.onClickSummon);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.lab_help, TouchEvent.TOUCH_TAP, this.onClickHelp);

            this.onNt(UnionEvent.ON_UPDATE_KILL_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            // this.onUpdateView();
            this._proxy.c2s_guild_zhanyaotai_request(1);
            this._proxy.open_fun = UnionMainType.UnionKill;

            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateView(): void {
            this._listData.replaceAll(this._proxy.boss_list);

            this._view.grp_tips_private.visible = this._proxy.boss_list.length <= 0;

            this._data = this._proxy.boss_data;
            let data = this._data;
            if (data) {
                this._cfg = getConfigByNameId(ConfigName.GuildZhanyaotai, data.index);
                this._endTime2 = data.boss_hp > 0 ? data.endtime.toNumber() : 0;
                this.update(TimeMgr.time);
                this._status = data.boss_hp == 0 ? 2 : 1;
                this._view.progress.show(data.boss_hp, this._cfg.boss_hp);
                this._view.lab_master.textFlow = TextUtil.parseHtml("召唤:" + TextUtil.addColor(RoleVo.ins.name, WhiteColor.DEFAULT));
            } else {
                this._cfg = this._proxy.vip_boss;
                this._status = 0;
                this._view.lab_master.text = "我的召唤";
                this._view.progress.show(this._cfg.boss_hp, this._cfg.boss_hp);
            }
            // this._view.head2.updateBossHeadShow(this._cfg.BOSS, 0);
            this._view.img_head.source = `touxiang_boss_${this._cfg.index}`;
            // this._view.lab_boss.textFlow = TextUtil.parseHtml(TextUtil.addColor(this._cfg.name, ColorUtil.getColorByQuality1(this._cfg.quality)));
            this._view.img_name.source = `union_kill_boss_${this._cfg.index}`;

            this.onUpdateStatus();

            if (this._view.coinItem) {
                this._cost = this._cfg.atk_cost[0];
                this._view.coinItem.setData(this._cfg.atk_cost[0][0]);
            }
            if (this._view.list_reward.visible) {
                this._rewardData.replaceAll(this._cfg.rewards3);
            }

            this._view.btn_fight.setHint(this._proxy.getMyBossHint());
            this._view.btn_summon.setHint(this._proxy.getZhaohuanHint());
            this._view.btn_rank.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill, HintType.UnionRank]));

            this.onUpdateMvp();
        }

        private onUpdateStatus(): void {
            switch (this._status) {
                case 1:
                    this._view.lab_wait.visible = false;
                    this._view.btn_summon.visible = false;
                    this._view.list_reward.visible = false;
                    this._view.timeItem2.visible = true;
                    this._view.coinItem.visible = true;
                    this._view.lab_master.visible = true;
                    this._view.lab_help.visible = true;
                    this._view.progress.visible = true;
                    this._view.btn_preview.visible = true;
                    this._view.btn_fight.visible = true;
                    this._view.btn_fight.label = "斩妖";
                    break;
                case 2:
                    this._view.btn_summon.visible = false;
                    this._view.btn_preview.visible = false;
                    this._view.lab_master.visible = false;
                    this._view.timeItem2.visible = false;
                    this._view.coinItem.visible = false;
                    this._view.lab_help.visible = false;
                    this._view.progress.visible = false;
                    this._view.list_reward.visible = true;
                    this._view.btn_fight.visible = true;
                    this._view.btn_fight.label = "一键领取";
                    this._view.lab_wait.visible = true;
                    this._view.lab_wait.text = "成功击杀";
                    break;
                default:
                    this._view.list_reward.visible = false;
                    this._view.btn_fight.visible = false;
                    this._view.lab_help.visible = false;
                    this._view.timeItem2.visible = false;
                    this._view.coinItem.visible = false;
                    this._view.btn_summon.visible = true;
                    this._view.lab_master.visible = true;
                    this._view.btn_preview.visible = true;
                    this._view.progress.visible = true;
                    this._view.lab_wait.visible = true;
                    this._view.lab_wait.text = "等待召唤";
                    break;
            }
        }

        private onUpdateMvp(): void {
            let mvp = this._proxy.boss_mvp;
            if (!mvp || !mvp.name) {
                this._view.lab_nobody.visible = true;
                // this._view.img_nobody.visible = true;
                this._view.lab_count.visible = false;
                this._view.lab_name.visible = false;
                this._view.lab_power.visible = false;
                this._view.img_zhanli.visible = false;
                // this._view.head.visible = false;
                this._view.head.defaultHeadShow();
            } else {
                this._view.lab_nobody.visible = false;
                // this._view.img_nobody.visible = false;
                this._view.lab_count.visible = true;
                this._view.lab_name.visible = true;
                // this._view.head.visible = true;
                this._view.lab_power.visible = true;
                this._view.img_zhanli.visible = true;

                this._view.head.updateShow(mvp.head, mvp.head_frame, mvp.sex, mvp.vip);
                this._view.lab_name.text = mvp.name;
                this._view.lab_count.textFlow = TextUtil.parseHtml(`斩妖积分：${TextUtil.addColor(`${mvp.value}`, "0xeca240")}`);
                this._view.lab_power.text = StringUtil.getPowerNumStr(mvp.showpower && mvp.showpower.toNumber() || 0);
            }

        }

        update(time: base.Time): void {
            let serverTime = TimeMgr.time.serverTimeSecond;
            let leftTime = this._endTime - serverTime;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));

            let leftTime2 = this._endTime2 - serverTime;
            this._view.timeItem2.updateLeftTime(leftTime2, "", getLanById(LanDef.battle_cue29));
            // if (leftTime2 <= 0) {
            //     this._proxy.c2s_guild_zhanyaotai_request(1);
            // }
        }

        private onClickRank(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionKillRank);
        }

        private onClickPreview(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionKillTips, { showBtn: false });
        }

        private onClickSummon(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionKillTips, { showBtn: true });
        }

        private onClickFight(): void {
            if (this._status == 1) {
                if (!BagUtil.checkPropCnt(this._cost[0], this._cost[1], PropLackType.Dialog)) {
                    return;
                }
                ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionFight, {
                    boss_all: this._cfg.boss_hp,
                    boss_hp: this._data.boss_hp,
                    boss_deduct: this._cfg.atk_cost_hp,
                    boss_index: this._cfg.BOSS,
                    id: this._data.id
                });
                // this._proxy.c2s_guild_zhanyaotai_click(2, this._data.id);
            } else if (this._status == 2) {
                this._proxy.c2s_guild_zhanyaotai_click(3, this._data.id);
            }
        }

        private onClickHelp(): void {
            this._proxy.c2s_guild_zhanyaotai_help_chat(this._data.id);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }
    }
}