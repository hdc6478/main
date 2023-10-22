namespace game.mod.boss {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import Event = egret.Event;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import TextEvent = egret.TextEvent;
    import CrossBossConfig = game.config.CrossBossConfig;
    import Handler = base.Handler;
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;

    export class CrossBossMdr extends EffectMdrBase implements UpdateItem {
        private _view: CrossBossView = this.mark("_view", CrossBossView);
        private _proxy: BossProxy;

        private _itemList: ArrayCollection;
        private _bossList: ArrayCollection;

        private _selIndex: number;/**当前选中的boss*/
        private _selCfg: CrossBossConfig;/**当前选中的配置*/
        private _effId: number;
        private _lastIndex: number;//上一次显示的外显
        private _time: number;//定时请求boss信息
        private readonly TIME_TICK: number = 3;//定时请求boss信息
        private _lastShowTime: boolean = true;//显示复活倒计时

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._bossList = new ArrayCollection();
            this._view.list_boss.itemRenderer = CrossBossItem;
            this._view.list_boss.dataProvider = this._bossList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_boss, Event.CHANGING, this.onClickBoss);

            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
            addEventListener(this._view.lab_rank, TextEvent.LINK, this.onClickRank);
            this._view.lab_rank.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.pass_rank), BlackColor.GREEN, ""));

            this.onNt(BossEvent.ON_CROSS_BOSS_UPDATE, this.onInfoUpdate, this);
            this.onNt(BossEvent.ON_CROSS_BOSS_RANK_UPDATE, this.updateRank, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateItemList();
            this.indexUpdateInfo();

            this.reqBossInfo();
            this.reqRankInfo();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            this._effId = 0;
            this._lastIndex = 0;
            this._lastShowTime = true;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickBoss(e: Event): void {
            let index = this._view.list_boss.selectedIndex;
            if(index == this._selIndex){
                return;
            }
            e.preventDefault();
            PromptBox.getIns().show(getLanById(LanDef.cross_boss_tips4));
        }

        private onClickReward(): void {
            if(!this._selCfg){
                return;
            }
            ViewMgr.getIns().bossReward(this._selCfg.reward_big);
            // 测试数据
            // let msg: s2c_new_cross_boss_roll_point = new s2c_new_cross_boss_roll_point();
            // msg.percent = 8000;
            // msg.my_roll_point = 666;
            // msg.point_list = [];
            // for(let i = 0; i < 10; ++i){
            //     let info: teammate = new teammate();
            //     if(i == 0){
            //         info.name = RoleVo.ins.name;
            //         info.role_id = RoleVo.ins.role_id;
            //         info.value = Long.fromValue(666);
            //     }
            //     else {
            //         info.name = "测试玩家名字" + i;
            //         info.role_id = Long.fromValue(1000);
            //         info.value = Long.fromValue(Math.random() * 700);
            //     }
            //     msg.point_list.push(info);
            // }
            // facade.showView(ModName.Boss,BossViewType.CrossBossLuckyReward, msg);
        }

        private onClickAdd(): void {
            let buyCnt = this._proxy.crossBossInfo && this._proxy.crossBossInfo.buycount || 0;
            let cfg: ParamConfig = GameConfig.getParamConfigById("cross_boss_count_buy");
            let maxBuyCnt = cfg && cfg.value;
            let leftBuyCnt = maxBuyCnt - buyCnt;
            if(leftBuyCnt <= 0){
                PromptBox.getIns().show(getLanById(LanDef.yuanling_tips8));
                return;
            }
            let costCfg: ParamConfig = GameConfig.getParamConfigById("cross_boss_count_consume");
            let costIdx = costCfg.value[0];
            let costCnt = costCfg.value[1];
            let propCfg: PropConfig = GameConfig.getPropConfigById(costIdx);
            let tips1 = costCnt + propCfg.name;
            let tips2 = leftBuyCnt + "";
            let tipsStr = StringUtil.substitute(getLanById(LanDef.bahuang_tips13), [tips1, tips2]);
            ViewMgr.getIns().showConfirm(tipsStr, Handler.alloc(this, () => {
                this._proxy.c2s_new_cross_boss_buy_count();
            }));
        }

        private onClickChallenge(): void {
            if(!this._selCfg){
                return;
            }
            if (BagUtil.checkBagFull()) {
                return;
            }
            SceneUtil.setReward(SceneType.ManyBoss, this._selCfg.reward_big);
            this._proxy.c2s_new_cross_boss_challenge(this._selCfg.index);
        }

        private onClickRank(): void {
            this._proxy.crossBossSceneRank = false;
            ViewMgr.getIns().showView(ModName.Boss, BossViewType.CrossBossRankMain);
        }

        private onInfoUpdate(): void {
            this.updateCount();
        }

        private updateItemList(): void {
            let cfgList: CrossBossConfig[] = getConfigListByName(ConfigName.CrossBoss);
            let bossList: CrossBossConfig[] = [];
            let selIndex = -1;
            for(let cfg of cfgList){
                bossList.push(cfg);
                let lv = cfg.open[0];
                if(!ViewMgr.getIns().checkRebirth(lv)){
                    //转生条件未开启
                    break;
                }
                selIndex++;
            }
            selIndex = Math.max(selIndex, 0);//默认选第一个

            if(this._bossList.source.length){
                this._bossList.replaceAll(bossList);
            }
            else {
                this._bossList.source = bossList;
            }
            this._selIndex = selIndex;
            this._view.list_boss.selectedIndex = selIndex;
            this._selCfg = bossList[selIndex];
            this._proxy.selCrossBossCfg = this._selCfg;
        }

        private indexUpdateInfo(): void {
            if(!this._selCfg){
                return;
            }
            this.updateBoss();
            this.updateReward();
            this.updateRank();
            this.updateReviveTime();
            this.updateBossHp();
        }

        private updateBoss(): void {
            let index = this._selCfg.index;
            if(index == this._lastIndex){
                return;
            }
            this._lastIndex = index;
            if(this._effId) {
                this.removeEffect(this._effId);
            }
            let monsterIndex = this._selCfg.monster_index[0];
            this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this._view.avatarNameItem.updateShow(monsterCfg.name);
        }

        private updateReward(): void {
            let index = this._selCfg.reward_big;
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, index);
            this._itemList.source = cfg.content.slice(0,8);//取前面奖励
        }

        private updateRank(): void {
            let bossInfo = this._proxy.crossBossRankInfo;
            let info = bossInfo && bossInfo.player_ranks && bossInfo.player_ranks.length ? bossInfo.player_ranks[0] : null;
            let nameStr = "";
            if(info && info.name){
                nameStr = info.name + "\n" + getLanById(LanDef.exp_tip10) + ":" + StringUtil.getHurtNumStr(info.value.toNumber());
            }
            else {
                nameStr = getLanById(LanDef.tishi_2);//虚位以待
            }
            this._view.lab_name.text = nameStr;
        }

        private updateReviveTime(): void {
            let bossInfo = this._proxy.crossBossInfo;
            let hp = bossInfo && bossInfo.hp || 0;
            let endTime = bossInfo && bossInfo.endtime ? bossInfo.endtime.toNumber() : 0;//0说明boss未开，有时间表示boss已开，时间为本次结束时间
            let curTime = TimeMgr.time.serverTimeSecond;

            let showTime = !endTime || curTime > endTime || !hp;//boss未开启或者已结束或者已死亡
            if(showTime){
                let bossTime = bossInfo && bossInfo.next_recover_time ? bossInfo.next_recover_time.toNumber() : 0;//下一次复活时间戳
                let nextTime = bossTime - curTime;
                this._view.timeItem.updateLeftTime(nextTime);
            }
            this._view.timeItem.visible = showTime;
            this._view.btn_challenge.visible = this._view.bar.visible = !showTime;
            if(showTime != this._lastShowTime){
                this._lastShowTime = showTime;
                if(!showTime){
                    this.reqBossInfo();//切换状态时请求boss血量
                }
            }
        }

        private updateBossHp(): void {
            if(!this._view.bar.visible){
                return;
            }
            let bossInfo = this._proxy.crossBossInfo;
            let hp = bossInfo && bossInfo.hp || 0;
            this._view.bar.show(hp, 100, false, 0, false, ProgressBarType.Percent);//boss血量
        }

        update(time: base.Time): void {
            this.updateReviveTime();
            this.updateBossHp();
            //if(this._view.bar.visible){
                this._time--;
                if(this._time <= 0){
                    this.reqBossInfo();
                }
            //}
        }

        private updateCount(): void {
            let cnt = this._proxy.crossBossInfo && this._proxy.crossBossInfo.count || 0;
            let cfg: ParamConfig = GameConfig.getParamConfigById("cross_boss_count");
            let maxCnt = cfg && cfg.value;
            let cntStr = getLanById(LanDef.times) + "：" + TextUtil.addColor(cnt + "/" + maxCnt, BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
            this._view.btn_challenge.redPoint.visible = cnt > 0;
        }

        private reqBossInfo(): void {
            this._proxy.c2s_new_cross_boss(this._selCfg.index, CrossBossType.Base);
            this._time = this.TIME_TICK;
        }

        private reqRankInfo(): void {
            this._proxy.c2s_new_cross_boss(this._selCfg.index, CrossBossType.Rank);
        }

    }
}