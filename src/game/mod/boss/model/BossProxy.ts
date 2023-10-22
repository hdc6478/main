namespace game.mod.boss {

    import c2s_new_vip_boss_enter = msg.c2s_new_vip_boss_enter;
    import s2c_new_vip_boss_info = msg.s2c_new_vip_boss_info;
    import c2s_new_vip_boss_sweep = msg.c2s_new_vip_boss_sweep;
    import new_vip_boss = msg.new_vip_boss;
    import NewVipBossFubenConfig = game.config.NewVipBossFubenConfig;
    import NewVipBossConfig = game.config.NewVipBossConfig;
    import c2s_new_multiple_boss_challenge = msg.c2s_new_multiple_boss_challenge;
    import c2s_new_multiple_boss_info = msg.c2s_new_multiple_boss_info;
    import s2c_new_multiple_boss_list = msg.s2c_new_multiple_boss_list;
    import GameNT = base.GameNT;
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import new_multiple_boss_data = msg.new_multiple_boss_data;
    import ParamConfig = game.config.ParamConfig;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    import c2s_single_boss_sweep = msg.c2s_single_boss_sweep;
    import c2s_single_boss_enter = msg.c2s_single_boss_enter;
    import s2c_single_boss_info = msg.s2c_single_boss_info;
    import single_boss = msg.single_boss;
    import PersonalBossConfig = game.config.PersonalBossConfig;
    import c2s_new_cross_boss_challenge = msg.c2s_new_cross_boss_challenge;
    import c2s_new_cross_boss_hurt_reward = msg.c2s_new_cross_boss_hurt_reward;
    import s2c_new_cross_boss = msg.s2c_new_cross_boss;
    import c2s_new_cross_boss_buy_count = msg.c2s_new_cross_boss_buy_count;
    import CrossBossConfig = game.config.CrossBossConfig;
    import s2c_new_cross_boss_scene = msg.s2c_new_cross_boss_scene;
    import teammate = msg.teammate;
    import guild_hurt_rank = msg.guild_hurt_rank;
    import s2c_new_cross_boss_hurt_reward = msg.s2c_new_cross_boss_hurt_reward;
    import s2c_new_cross_boss_roll_point = msg.s2c_new_cross_boss_roll_point;
    import c2s_new_cross_boss = msg.c2s_new_cross_boss;
    import LanDef = game.localization.LanDef;
    import c2s_zhuimo_open_ui = msg.c2s_zhuimo_open_ui;
    import c2s_zhuimo_boss_challenge = msg.c2s_zhuimo_boss_challenge;
    import c2s_zhuimo_boss_info = msg.c2s_zhuimo_boss_info;
    import c2s_zhuimo_show_reward = msg.c2s_zhuimo_show_reward;
    import c2s_zhuimo_army_ui_show = msg.c2s_zhuimo_army_ui_show;
    import c2s_zhuimo_army_oper = msg.c2s_zhuimo_army_oper;
    import s2c_zhuimo_boss_info_ret = msg.s2c_zhuimo_boss_info_ret;
    import s2c_zhuimo_update_date = msg.s2c_zhuimo_update_date;
    import s2c_zhuimo_open_ui_ret = msg.s2c_zhuimo_open_ui_ret;
    import s2c_zhuimo_show_reward_ret = msg.s2c_zhuimo_show_reward_ret;
    import s2c_zhuimo_boss_roll_point = msg.s2c_zhuimo_boss_roll_point;
    import s2c_zhuimo_army_ui_show = msg.s2c_zhuimo_army_ui_show;
    import zhuimo_boss_data = msg.zhuimo_boss_data;
    import zhuimo_army_data = msg.zhuimo_army_data;
    import s2c_zhuimo_update_buff_info = msg.s2c_zhuimo_update_buff_info;
    import s2c_new_cross_boss_ranks_list = msg.s2c_new_cross_boss_ranks_list;
    import Handler = base.Handler;

    export class BossProxy extends ProxyBase implements IBossProxy {
        private _model: BossModel;

        initialize(): void {
            super.initialize();
            this._model = new BossModel();

            this.onProto(s2c_new_vip_boss_info, this.s2c_new_vip_boss_info, this);
            this.onProto(s2c_new_multiple_boss_list, this.s2c_new_multiple_boss_list, this);
            this.onProto(s2c_single_boss_info, this.s2c_single_boss_info, this);
            this.onProto(s2c_new_cross_boss, this.s2c_new_cross_boss, this);
            this.onProto(s2c_new_cross_boss_scene, this.s2c_new_cross_boss_scene, this);
            this.onProto(s2c_new_cross_boss_hurt_reward, this.s2c_new_cross_boss_hurt_reward, this);
            this.onProto(s2c_new_cross_boss_roll_point, this.s2c_new_cross_boss_roll_point, this);
            this.onProto(s2c_new_cross_boss_ranks_list, this.s2c_new_cross_boss_ranks_list, this);

            this.onProto(s2c_zhuimo_boss_info_ret, this.s2c_zhuimo_boss_info_ret, this);
            // this.onProto(s2c_zhuimo_boss_hurt_rank, this.s2c_zhuimo_boss_hurt_rank, this);
            this.onProto(s2c_zhuimo_update_date, this.s2c_zhuimo_update_date, this);
            this.onProto(s2c_zhuimo_open_ui_ret, this.s2c_zhuimo_open_ui_ret, this);
            this.onProto(s2c_zhuimo_show_reward_ret, this.s2c_zhuimo_show_reward_ret, this);
            this.onProto(s2c_zhuimo_boss_roll_point, this.s2c_zhuimo_boss_roll_point, this);
            this.onProto(s2c_zhuimo_army_ui_show, this.s2c_zhuimo_army_ui_show, this);
            this.onProto(s2c_zhuimo_update_buff_info, this.s2c_zhuimo_update_buff_info, this);
        }

        public onUpdateTips(): void {
            let time: number = this.openTime;
            if (!time) {
                // if (SceneUtil.isShowMain()) {
                //     facade.showView(ModName.Boss, BossViewType.AbyssTips);
                // }
                PropTipsMgr.getIns().showBoss(BossTipsType.Abyss, this.endTime);
                this.onUpdateHintByAbyss();
                HintMgr.addTimeEvent(TimeEventType.AbyssBossClose, this.endTime, this, this.onUpdateHintByAbyss);

                let openTime: number = this.getOpenTime(false);
                HintMgr.addTimeEvent(TimeEventType.AbyssBoss, openTime, this, this.onUpdateTips);
                return;
            }
            HintMgr.addTimeEvent(TimeEventType.AbyssBoss, time, this, this.onUpdateTips);
        }

        public onStartReconnect(): void {
            super.onStartReconnect();
        }

        public c2s_new_multiple_boss_challenge(index: number) {
            let msg = new c2s_new_multiple_boss_challenge();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_new_multiple_boss_info() {
            let msg = new c2s_new_multiple_boss_info();
            this.sendProto(msg);
        }

        private s2c_new_multiple_boss_list(n: GameNT) {
            let msg: s2c_new_multiple_boss_list = n.body;
            if (!msg) {
                return;
            }
            if (msg.count != undefined) {
                this._model.bossCount = msg.count;
            }
            if (msg.recover_count_time != undefined) {
                this._model.bossTime = msg.recover_count_time.toNumber();
            }
            if (msg.use_luck_count != undefined) {
                this._model.luckyCount = msg.use_luck_count;
            }
            if (msg.bosslit) {
                if (!this._model.bossInfos) {
                    this._model.bossInfos = msg.bosslit;
                } else {
                    for (let info of msg.bosslit) {
                        let pos = this.getInfoPos(info.index);
                        if (pos >= 0) {
                            this._model.bossInfos[pos] = info;
                        } else {
                            this._model.bossInfos.push(info);
                        }
                    }
                }
            }
            this.updateBossHint();
            this.checkBossRevive();//检测BOSS复活
            this.sendNt(BossEvent.ON_MANY_BOSS_UPDATE);
        }

        private getInfoPos(index: number): number {
            if (!this._model.bossInfos || !this._model.bossInfos.length) {
                return -1;
            }
            let len = this._model.bossInfos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.bossInfos[i];
                if (info.index == index) {
                    return i;
                }
            }
            return -1;
        }

        /**boss信息*/
        public getBossInfo(index: number): new_multiple_boss_data {
            let pos = this.getInfoPos(index);
            if (pos >= 0) {
                return this._model.bossInfos[pos];
            }
            return null;
        }

        /**boss挑战次数*/
        public get bossCount(): number {
            return this._model.bossCount;
        }

        /**boss挑战次数上限*/
        public get bossMaxCount(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("BOSS_challenge_limit");
            return cfg.value;
        }

        /**boss次数恢复时间戳*/
        public get bossTime(): number {
            return this._model.bossTime;
        }

        /**boss挑战次数道具*/
        public get bossCostIndex(): number {
            return PropIndex.DuorenBoss;
        }

        /**幸运爆率次数*/
        public get luckyCount(): number {
            return this._model.luckyCount;
        }

        //玩法总次数获取
        public getCurVal(): number {
            return this.bossCount + BagUtil.getPropCntByIdx(this.bossCostIndex);//每日剩余次数+物品剩余数量
        }

        public getBossCfgs(): { [type: number]: NewMultipleBossConfig[] } {
            if (!this._model.bossCfgs) {
                this._model.bossCfgs = {};
                let type = 0;
                let cfgList: NewMultipleBossConfig[] = getConfigListByName(ConfigName.NewMultipleBoss);
                for (let cfg of cfgList) {
                    if (!this._model.bossCfgs[type]) {
                        this._model.bossCfgs[type] = [cfg];
                        continue;
                    }
                    let firstCfg = this._model.bossCfgs[type][0];
                    if (cfg.open[0] != firstCfg.open[0] || cfg.open[1] != firstCfg.open[1]) {
                        type++;
                        this._model.bossCfgs[type] = [cfg];
                        continue;
                    }
                    this._model.bossCfgs[type].push(cfg);
                }
            }
            return this._model.bossCfgs;
        }

        public isBossOpen(type: number, showTips?: boolean): boolean {
            let cfgs = this.getBossCfgs();
            let cfgList = cfgs[type];
            let cfg = cfgList[0];
            let bossType = cfg.open[0];
            let lv = cfg.open[1];
            let isOpen: boolean;
            if (bossType == ManyBossType.Lv) {
                isOpen = ViewMgr.getIns().checkLv(lv);
                if (!isOpen && showTips) {
                    PromptBox.getIns().show(ViewMgr.getIns().checkLvStr(lv));
                }
            } else {
                isOpen = ViewMgr.getIns().checkRebirth(lv);
                if (!isOpen && showTips) {
                    PromptBox.getIns().show(ViewMgr.getIns().checkRebirthStr(lv));
                }
            }
            return isOpen;
        }

        // /**是否可以挑战*/
        // public canChallengeBoss(): boolean {
        //     let cnt = this.bossCount;
        //     if(cnt > 0){
        //         return true;
        //     }
        //     let index = this.bossCostIndex;
        //     let propCnt = BagUtil.getPropCntByIdx(index);
        //     return propCnt > 0;
        // }

        // private getBossHint(index: number): boolean {
        //     let info = this.getBossInfo(index);
        //     let isDied = !info || info.hp <= 0;//boss已死亡
        //     return !isDied;
        // }

        // public getBossHintByType(type: number): boolean {
        //     if(!this.isBossOpen(type)){
        //         return false;
        //     }
        //     let cfgs = this.getBossCfgs();
        //     let cfgList = cfgs[type];
        //     for(let cfg of cfgList){
        //         if(this.getBossHint(cfg.index)){
        //             return true;
        //         }
        //     }
        //     return false;
        // }

        /**更新红点*/
        private updateBossHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Boss)) {
                return;
            }
            let hint = this.checkBossChallengeHint();
            if (!hint) {
                HintMgr.addTimeEvent(TimeEventType.ManyBoss, this.bossTime, this, this.c2s_new_multiple_boss_info);
            }
            let hintType = this._model.bossChallengeHint;
            HintMgr.setHint(hint, hintType, OpenIdx.Boss);
            this.checkAutoChallengeManyBoss();
        }

        private checkBossChallengeHint(): boolean {
            // if(!this.canChallengeBoss()){
            //     //没有挑战次数时
            //     return false;
            // }
            // let cfgs = this.getBossCfgs();
            // for(let k in cfgs){
            //     let type = parseInt(k);
            //     if(this.getBossHintByType(type)){
            //         return true;
            //     }
            // }
            return this.bossCount > 0;
        }

        //检测BOSS复活
        private checkBossRevive(): void {
            if (!this.bossCount) {
                return;//没有次数时候不需要检测
            }
            if (HintMgr.hasTimeEvent(TimeEventType.ManyBossRevive)) {
                return;//已经存在定时器
            }
            let selType = 0;
            let cfgs = this.getBossCfgs();
            for (let k in cfgs) {
                let type = parseInt(k);
                let isOpen = this.isBossOpen(type);
                if (isOpen) {
                    selType = type;//默认选中最高的
                } else {
                    break;
                }
            }
            //取到最近一只复活的BOSS
            let nextTime = 0;
            let monsterIndex: number;//boss怪物index
            let bossList = cfgs[selType].concat();//防止修改配置数据
            for (let cfg of bossList) {
                let info = this.getBossInfo(cfg.index);
                if (!info) {
                    continue;
                }
                let isDied = info.hp <= 0;//boss已死亡
                if (!isDied) {
                    continue;
                }
                let bossTime = info.recover_time.toNumber();
                if ((!nextTime || nextTime > bossTime) && bossTime) {
                    nextTime = bossTime;//取最小值
                    monsterIndex = cfg.monster_index[0];
                }
            }
            if (!nextTime) {
                return;//没有死亡的BOSS
            }
            HintMgr.addTimeEvent(TimeEventType.ManyBossRevive, nextTime, this, this.onBossRevive, [monsterIndex]);
        }

        private onBossRevive(index: number): void {
            let nameStr = getLanById(LanDef.many_boss_title);
            let data: BossReviveData = {
                nameStr: nameStr,
                index: index,
                jumpId: JumpIdx.Boss
            };
            this.checkAutoChallengeManyBoss();
            this.sendNt(BossEvent.ON_BOSS_REVIVE_UPDATE, data);
        }

        protected reincarnateInfoUpdate(n: GameNT): void {
            HintMgr.removeTimeEvent(TimeEventType.ManyBossRevive);
            this.checkBossRevive();//检测BOSS复活
            HintMgr.removeTimeEvent(TimeEventType.VipBossRevive);
            this.checkVipBossRevive();//检测BOSS复活
        }

        /************************** 个人 boss *************************/
        public c2s_single_boss_enter(index: number) {
            let msg = new c2s_single_boss_enter();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_single_boss_sweep() {
            let msg = new c2s_single_boss_sweep();
            this.sendProto(msg);
        }

        private s2c_single_boss_info(n: GameNT) {
            let msg: s2c_single_boss_info = n.body;
            if (!msg || !msg.infos) {
                return;
            }
            if (!this._model.personalBossInfos) {
                this._model.personalBossInfos = msg.infos;
            } else {
                for (let info of msg.infos) {
                    let pos = this.getPersonalInfoPos(info.index);
                    if (pos >= 0) {
                        this._model.personalBossInfos[pos] = info;
                    } else {
                        this._model.personalBossInfos.push(info);
                    }
                }
            }
            this.updatePersonalBossHint();
            this.sendNt(BossEvent.ON_PERSONAL_BOSS_UPDATE);
        }

        private getPersonalInfoPos(index: number): number {
            if (!this._model.personalBossInfos || !this._model.personalBossInfos.length) {
                return -1;
            }
            let len = this._model.personalBossInfos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.personalBossInfos[i];
                if (info.index == index) {
                    return i;
                }
            }
            return -1;
        }

        /**boss信息*/
        public getPersonalBossInfo(index: number): single_boss {
            let pos = this.getPersonalInfoPos(index);
            if (pos >= 0) {
                return this._model.personalBossInfos[pos];
            }
            return null;
        }

        public isPersonalBossOpen(cfg: PersonalBossConfig): boolean {
            let bossType = cfg.open[0];
            let lv = cfg.open[1];
            let isOpen: boolean;
            if (bossType == ManyBossType.Lv) {
                isOpen = ViewMgr.getIns().checkLv(lv);
            } else {
                isOpen = ViewMgr.getIns().checkRebirth(lv);
            }
            return isOpen;
        }

        /**更新红点*/
        private updatePersonalBossHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.PersonalBoss)) {
                return;
            }
            let hint = this.checkPersonalBossChallengeHint();
            if (!hint) {
                let reviveTime = this.getPersonalBossMinReviveTime();
                if (reviveTime) {
                    HintMgr.addTimeEvent(TimeEventType.PersonalBoss, reviveTime, this, this.updatePersonalBossHint);
                }
            }
            this.checkAutoChallengePersonalBoss();
            let hintType = this._model.personalBossChallengeHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkPersonalBossChallengeHint(): boolean {
            let cfgList = getConfigListByName(ConfigName.PersonalBoss);
            let maxCnt = this.getPersonalBossMaxCnt();
            for (let cfg of cfgList) {
                if (!this.isPersonalBossOpen(cfg)) {
                    continue;
                }
                let info = this.getPersonalBossInfo(cfg.index);
                let bossTime = info && info.revive_time || 0;
                let isDied = bossTime - TimeMgr.time.serverTimeSecond > 0;
                if (isDied) {
                    continue;
                }
                let useCnt = info && info.used_cnt || 0;
                if (maxCnt - useCnt > 0) {
                    return true;//剩余可挑战
                }
            }
            return false;
        }

        /**获取个人boss最小复活时间*/
        private getPersonalBossMinReviveTime(): number {
            let reviveTime = 0;
            if (!this._model.personalBossInfos || !this._model.personalBossInfos.length) {
                return reviveTime;
            }
            let maxCnt = this.getPersonalBossMaxCnt();
            let len = this._model.personalBossInfos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.personalBossInfos[i];
                let bossTime = info && info.revive_time || 0;
                let useCnt = info && info.used_cnt || 0;
                if (useCnt < maxCnt && bossTime && (bossTime < reviveTime || reviveTime == 0)) {
                    reviveTime = bossTime;
                }
            }
            return reviveTime;
        }

        public getPersonalBossMaxCnt(): number {
            let cfg = GameConfig.getParamConfigById("personal_count");
            return cfg && cfg.value;
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.level) >= 0 || keys.indexOf(RolePropertyKey.reincarnate) >= 0) {
                this.updatePersonalBossHint();
            }
        }

        /************************** 跨服 boss *************************/
        public c2s_new_cross_boss_challenge(index: number) {
            let msg = new c2s_new_cross_boss_challenge();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_new_cross_boss(index: number, type: number) {
            let msg = new c2s_new_cross_boss();
            msg.index = index;
            msg.button_type = type;
            this.sendProto(msg);
        }

        public c2s_new_cross_boss_hurt_reward(index: number) {
            let msg = new c2s_new_cross_boss_hurt_reward();
            msg.index = Long.fromValue(index);
            msg.boss_index = this.selCrossBossCfg.index;//服务端要求加上boss index
            this.sendProto(msg);
        }

        public c2s_new_cross_boss_buy_count() {
            let msg = new c2s_new_cross_boss_buy_count();
            this.sendProto(msg);
        }

        private s2c_new_cross_boss(n: GameNT) {
            let msg: s2c_new_cross_boss = n.body;
            if (!msg) {
                return;
            }
            if (!this._model.crossBossInfo) {
                this._model.crossBossInfo = msg;
            } else {
                for (let k in msg) {
                    this._model.crossBossInfo[k] = msg[k];
                }
            }
            // 1.请求boss数据(role_id, index,hp, next_recover_time,endtime,count,buycount)
            // 2.boss开启 复活(hp, next_recover_time,endtime,count)
            // 3.购买次数(count,buycount)
            if (msg.count != undefined || msg.endtime || msg.next_recover_time) {
                this.updateCrossBossHint();//只有这些数据需要刷新红点
            }
            if (msg.endtime && !msg.index) {
                this.updateCrossBossTips();//跨服boss开启
            }
            if (msg.count != undefined || msg.buycount != undefined) {
                this.sendNt(BossEvent.ON_CROSS_BOSS_UPDATE);//只有次数需要监听刷新
            }
        }

        private s2c_new_cross_boss_ranks_list(n: GameNT) {
            let msg: s2c_new_cross_boss_ranks_list = n.body;
            this._model.crossBossRankInfo = msg;
            this.sendNt(BossEvent.ON_CROSS_BOSS_RANK_UPDATE);
        }

        private s2c_new_cross_boss_scene(n: GameNT) {
            let msg: s2c_new_cross_boss_scene = n.body;
            if (!msg) {
                return;
            }
            if (!this._model.crossBossSceneRankInfo) {
                this._model.crossBossSceneRankInfo = msg;
            } else {
                for (let k in msg) {
                    this._model.crossBossSceneRankInfo[k] = msg[k];
                }
            }
            if (msg.player_ranks || msg.my_info) {
                let info: SceneRankData = { hurtList: msg.player_ranks || [], myInfo: msg.my_info };//防报错处理
                this.sendNt(SceneEvent.ON_SCENE_RANK_UPDATE, info);//场景排行榜数据
            }
        }

        private s2c_new_cross_boss_hurt_reward(n: GameNT) {
            let msg: s2c_new_cross_boss_hurt_reward = n.body;
            if (!msg) {
                return;
            }
            if (!this._model.crossBossReward) {
                this._model.crossBossReward = msg.list;
            } else {
                for (let info of msg.list) {
                    let pos = this.getRewardPos(info.index.toNumber());
                    if (pos >= 0) {
                        this._model.crossBossReward[pos] = info;
                    } else {
                        this._model.crossBossReward.push(info);
                    }
                }
            }
            this.sendNt(BossEvent.ON_CROSS_BOSS_REWARD_UPDATE);
        }

        private getRewardPos(index: number): number {
            if (!this._model.crossBossReward) {
                return -1;
            }
            let len = this._model.crossBossReward.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.crossBossReward[i];
                if (info.index.toNumber() == index) {
                    return i;
                }
            }
            return -1;
        }

        private s2c_new_cross_boss_roll_point(n: GameNT) {
            let msg: s2c_new_cross_boss_roll_point = n.body;
            if (!msg) {
                return;
            }
            facade.hideView(ModName.Boss, BossViewType.CrossBossLuckyReward);
            facade.showView(ModName.Boss, BossViewType.CrossBossLuckyReward, msg);
        }

        public get crossBossInfo(): s2c_new_cross_boss {
            return this._model.crossBossInfo;
        }

        public get crossBossRankInfo(): s2c_new_cross_boss_ranks_list {
            return this._model.crossBossRankInfo;
        }

        public set selCrossBossCfg(cfg: CrossBossConfig) {
            this._model.selCrossBossCfg = cfg;
        }

        public get selCrossBossCfg(): CrossBossConfig {
            return this._model.selCrossBossCfg;
        }

        public set crossBossSceneRank(val: boolean) {
            this._model.crossBossSceneRank = val;
        }

        public get crossBossSceneRank(): boolean {
            return this._model.crossBossSceneRank;
        }

        public clearCrossBossSceneRankInfo(): void {
            this._model.crossBossSceneRankInfo = null;
            this._model.crossBossReward = null;
        }

        public getPersonalRanks(): teammate[] {
            if (this.crossBossSceneRank) {
                //场景排行榜
                return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.player_ranks || [];
            }
            return this._model.crossBossRankInfo && this._model.crossBossRankInfo.player_ranks || [];
        }

        public getMyPersonalRank(): teammate {
            if (this.crossBossSceneRank) {
                //场景排行榜
                return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.my_info || null;
            }
            return this._model.crossBossRankInfo && this._model.crossBossRankInfo.my_info || null;
        }

        public getGuildRanks(): guild_hurt_rank[] {
            if (this.crossBossSceneRank) {
                //场景排行榜
                return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.guild_ranks || [];
            }
            return this._model.crossBossRankInfo && this._model.crossBossRankInfo.guild_ranks || [];
        }

        public getMyGuildRank(): guild_hurt_rank {
            if (this.crossBossSceneRank) {
                //场景排行榜
                return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.my_guild_info || null;
            }
            return this._model.crossBossRankInfo && this._model.crossBossRankInfo.my_guild_info || null;
        }

        /**实际状态为客户端用的排序状态*/
        public getCrossBossRewardStatus(index: number): number {
            let pos = this.getRewardPos(index);
            if (pos >= 0) {
                let info = this._model.crossBossReward[pos];
                return info.status == RewardStatus.NotFinish ? RankRewardStatus.NotFinish :
                    (info.status == RewardStatus.Finish ? RankRewardStatus.Finish : RankRewardStatus.Draw);
            }
            return RankRewardStatus.NotFinish;
        }

        /**跨服boss开启，登录时候客户端主动检测下*/
        public updateCrossBossTips(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.CrossBoss)) {
                return;
            }
            let bossInfo = this.crossBossInfo;
            let cnt = bossInfo && bossInfo.count || 0;
            if (!cnt) {
                return;//没次数时不提示
            }
            let endTime = bossInfo && bossInfo.endtime ? bossInfo.endtime.toNumber() : 0;//0说明boss未开，有时间表示boss已开，时间为本次结束时间
            let curTime = TimeMgr.time.serverTimeSecond;
            if (endTime > curTime && bossInfo.hp > 0) {
                //修改：BOSS死亡的时候不弹窗
                //facade.showView(ModName.Boss, BossViewType.CrossBossTips);
                PropTipsMgr.getIns().showBoss(BossTipsType.CrossBoss, endTime);
            }
        }

        /**更新红点*/
        private updateCrossBossHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.CrossBoss)) {
                return;
            }
            let hint = this.checkCrossBossChallengeHint();
            let hintType = this._model.crossBossChallengeHint;
            HintMgr.setHint(hint, hintType);
            this.checkAutoChallengeCrossBoss();//修仙女仆的自动挑战跨服boss
        }

        private checkCrossBossChallengeHint(): boolean {
            let bossInfo = this.crossBossInfo;
            let cnt = bossInfo && bossInfo.count || 0;
            if (!cnt) {
                return false;
            }
            let hp = bossInfo && bossInfo.hp || 0;
            let endTime = bossInfo && bossInfo.endtime ? bossInfo.endtime.toNumber() : 0;//0说明boss未开，有时间表示boss已开，时间为本次结束时间
            let curTime = TimeMgr.time.serverTimeSecond;

            let showTime = !endTime || curTime > endTime || !hp;//boss未开启或者已结束或者已死亡
            return !showTime;
        }

        /************************** vip boss *************************/

        /**
         * 请求进入对应BOSS关卡
         * @param index 关卡id
         */
        public c2s_new_vip_boss_enter(index: number): void {
            let msg: c2s_new_vip_boss_enter = new c2s_new_vip_boss_enter();
            msg.index = index;
            this.sendProto(msg);
        }

        /**
         * vip boss基本信息
         */
        private s2c_new_vip_boss_info(n: GameNT) {
            let msg: s2c_new_vip_boss_info = n.body;
            if (!msg.infos) {
                return;
            }

            if (!this._model.vipBossInfos) {
                this._model.vipBossInfos = {};
            }
            for (let info of msg.infos) {
                let cfg = this.getVipBossFubenCfgByBossId(info.boss_id.toNumber());
                if (!cfg) {
                    continue;
                }
                this._model.vipBossInfos[cfg.index] = info;
            }

            this.updateVipBossHint();
            this.checkVipBossRevive();//检测BOSS复活
            this.sendNt(BossEvent.ON_VIP_BOSS_INFO_UPDATE);
        }

        /**
         * 碾压
         * @param index 关卡id
         */
        public c2s_new_vip_boss_sweep(index: number): void {
            let msg: c2s_new_vip_boss_sweep = new c2s_new_vip_boss_sweep();
            msg.index = index;
            this.sendProto(msg);
        }

        /**
         * 取 vip boss 信息
         * @param index new_vip_boss 表 index
         * @returns
         */
        public getVipBossInfo(index: number): new_vip_boss {
            let gateId: number = index % 10;
            return this._model.vipBossInfos && this._model.vipBossInfos[gateId] || null;
        }

        /**
         * vip boss 副本配置
         * @param index new_vip_boss_fuben 表 index
         * @returns
         */
        public getVipBossFubenCfg(index: number): NewVipBossFubenConfig {
            if (this._model.vipBossFubenCfg[index]) {
                return this._model.vipBossFubenCfg[index];
            }
            let cfgs: NewVipBossFubenConfig[] = getConfigListByName(ConfigName.NewVipBossFuben);
            for (let cfg of cfgs) {
                this._model.vipBossFubenCfg[cfg.index] = cfg;
            }
            return this._model.vipBossFubenCfg[index];
        }

        /**
         * vip boss 副本配置
         * @param bossId
         * @returns
         */
        public getVipBossFubenCfgByBossId(bossId: number): NewVipBossFubenConfig {
            if (this._model.vipBossFubenCfg2[bossId]) {
                return this._model.vipBossFubenCfg2[bossId];
            }
            let cfgs: NewVipBossFubenConfig[] = getConfigListByName(ConfigName.NewVipBossFuben);
            for (let cfg of cfgs) {
                this._model.vipBossFubenCfg2[cfg.bossId[0]] = cfg;
            }
            return this._model.vipBossFubenCfg2[bossId];
        }

        /**
         * vip boss 配置
         * @param index
         * @returns
         */
        public getVipBossCfg(index: number): NewVipBossConfig {
            if (this._model.vipBossCfg[index]) {
                return this._model.vipBossCfg[index];
            }
            let cfgs: NewVipBossConfig[] = getConfigListByName(ConfigName.NewVipBoss);
            for (let cfg of cfgs) {
                this._model.vipBossCfg[cfg.index] = cfg;
            }
            return this._model.vipBossCfg[index];
        }

        /**
         * 当前转生对应的 vip boss 配置列表
         * @returns
         */
        public getRebVipBossCfg(): { [index: string]: NewVipBossConfig } {
            let curZs = RoleUtil.getRebirthLv();        // 当前转生数
            if (this._model.rebVipBossCfg[curZs]) {
                return this._model.rebVipBossCfg[curZs];
            }
            let vipBossCfg: { [index: string]: NewVipBossConfig } = {};
            let cfgs: NewVipBossConfig[] = getConfigListByName(ConfigName.NewVipBoss);
            for (let cfg of cfgs) {
                let isOpen = this.isVipBossOpen(cfg.open[0]);
                if (isOpen) {
                    vipBossCfg[cfg.index] = cfg;
                }
            }
            this._model.rebVipBossCfg[curZs] = vipBossCfg;
            return vipBossCfg;
        }

        /**
         * 当前 vip 等级是否达到指定关卡vip限制
         * @param index new_vip_boss_fuben 表 index
         */
        public isVipEnough(index: number): boolean {
            let cfg = this.getVipBossFubenCfg(index);
            let curVip = VipUtil.getShowVipLv();
            return curVip >= cfg.VIP_lv;
        }

        /**
         * 取关卡状态
         * @param index new_vip_boss 表 index
         */
        public getState(index: number): VipBossState {
            let gateId: number = index % 10;
            return this.getState2(gateId);
        }

        /**
         * 取关卡状态
         * @param gateId new_vip_boss_fuben 表 index
         */
        private getState2(gateId: number): VipBossState {
            let vipEnough = this.isVipEnough(gateId);
            if (!vipEnough) {
                return VipBossState.NonActivited;
            }

            let info = this.getVipBossInfo(gateId);
            if (!info) {
                return VipBossState.NonActivited;
            }

            if (info.is_finished) {
                if (info.next_boss_time > TimeMgr.time.serverTimeSecond) {
                    return VipBossState.CD;
                }
                let cfg_next: game.config.NewVipBossFubenConfig = this.getVipBossFubenCfg(gateId % 10 + 1);
                if (!cfg_next || this.isVipEnough(gateId + 1)) {
                    return VipBossState.CanSaoDan;
                }
            }
            return VipBossState.CanFight;
        }

        /**
         * 所有转生 id
         */
        public get vipBossRebirthIds(): number[] {
            if (this._model.vipBossRebirthIds.length) {
                return this._model.vipBossRebirthIds;
            }

            let cfgs: NewVipBossConfig[] = getConfigListByName(ConfigName.NewVipBoss);
            for (let cfg of cfgs) {
                if (this._model.vipBossRebirthIds.indexOf(cfg.open[0]) == -1) {
                    this._model.vipBossRebirthIds.push(cfg.open[0]);
                }
            }
            return this._model.vipBossRebirthIds;
        }

        public isVipBossOpen(index: number): boolean {
            let curLv = RoleUtil.getRebirthLv();// 当前转生数
            let lv = RoleUtil.getRebirthLv(index);// 转生数
            return curLv == lv;
        }

        private updateVipBossHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.VipBoss)) {
                return;
            }

            let reIds: number[] = this.vipBossRebirthIds;

            let flag;
            for (let reid of reIds) {
                let isOpen = this.isVipBossOpen(reid);
                if (isOpen) {
                    flag = true;
                    break;
                }
            }

            if (!flag) {             // 转生条件没达到
                return;
            }

            let hint = false;
            for (let type = VipBossType.Type1; type <= VipBossType.Type5; type++) {
                let state = this.getState2(type);
                hint = (state == VipBossState.CanFight || state == VipBossState.CanSaoDan);
                if (hint) {
                    break;
                }
            }

            HintMgr.setHint(hint, this._model.vipBossHint);
            this.checkAutoChallengeVipBoss();
        }

        //检测BOSS复活
        private checkVipBossRevive(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.VipBoss)) {
                return;
            }
            if (HintMgr.hasTimeEvent(TimeEventType.VipBossRevive)) {
                return;//已经存在定时器
            }
            //取到最近一只复活的BOSS
            let nextTime = 0;
            let monsterIndex: number;//boss怪物index
            let cfgs: { [index: string]: NewVipBossConfig } = this.getRebVipBossCfg();
            for (let idx in cfgs) {
                let cfg = cfgs[idx];
                let info: new_vip_boss = this.getVipBossInfo(cfg.index);
                if (!info) {
                    continue;
                }
                let gateId = cfg.index % 10;
                let vipEnough = this.isVipEnough(gateId);
                if (!vipEnough) {
                    continue;
                }
                let bossTime = info.next_boss_time;
                if ((!nextTime || nextTime > bossTime) && bossTime) {
                    nextTime = bossTime;//取最小值
                    let fbCfg: NewVipBossFubenConfig = getConfigByNameId(ConfigName.NewVipBossFuben, cfg.index % 10);
                    monsterIndex = fbCfg.bossId[0];
                }
            }

            if (!nextTime) {
                return;//没有死亡的BOSS
            }
            HintMgr.addTimeEvent(TimeEventType.VipBossRevive, nextTime, this, this.onVipBossRevive, [monsterIndex]);
        }

        private onVipBossRevive(index: number): void {
            let nameStr = getLanById(LanDef.boss_vip);
            let data: BossReviveData = {
                nameStr: nameStr,
                index: index,
                jumpId: JumpIdx.VipBoos
            };
            this.checkAutoChallengeVipBoss();
            this.sendNt(BossEvent.ON_BOSS_REVIVE_UPDATE, data);
        }

        //---------------------------坠魔深渊---------------------------

        public c2s_zhuimo_open_ui(): void {
            let msg: c2s_zhuimo_open_ui = new c2s_zhuimo_open_ui();
            this.sendProto(msg);
        }

        public c2s_zhuimo_boss_challenge(): void {
            let msg: c2s_zhuimo_boss_challenge = new c2s_zhuimo_boss_challenge();
            this.sendProto(msg);
        }

        public c2s_zhuimo_boss_info(): void {
            let msg: c2s_zhuimo_boss_info = new c2s_zhuimo_boss_info();
            this.sendProto(msg);
        }

        public c2s_zhuimo_show_reward(): void {
            let msg: c2s_zhuimo_show_reward = new c2s_zhuimo_show_reward();
            this.sendProto(msg);
        }

        public c2s_zhuimo_army_ui_show(type: number): void {
            let msg: c2s_zhuimo_army_ui_show = new c2s_zhuimo_army_ui_show();
            msg.type = type;
            this.sendProto(msg);
            this._model.open_view = type == 3;
        }

        public c2s_zhuimo_army_oper(type: number, role_id?: Long, army_id?: number): void {
            let msg: c2s_zhuimo_army_oper = new c2s_zhuimo_army_oper();
            this._model.oper_type = msg.type = type;
            if (role_id) {
                msg.role_id = role_id;
            }
            if (army_id) {
                msg.army_id = army_id;
            }
            this.sendProto(msg);
        }

        private s2c_zhuimo_boss_info_ret(n: GameNT): void {
            let msg: s2c_zhuimo_boss_info_ret = n.body;
            if (msg.boss_list) {
                this._model.bossList = msg.boss_list;
            }
            this.sendNt(BossEvent.BOSS_LIST_INFO_UPDATE);
        }

        // private s2c_zhuimo_boss_hurt_rank(n: GameNT): void {
        //     let msg: s2c_zhuimo_boss_hurt_rank = n.body;
        // }

        private s2c_zhuimo_update_date(n: GameNT): void {
            let msg: s2c_zhuimo_update_date = n.body;
            if (msg.total) {
                this._model.total = msg.total;
            }
            if (msg.member_num) {
                this._model.member_num = msg.member_num;
            }
            this.sendNt(BossEvent.ON_ABYSS_SCENE_UPDATE);
        }

        private s2c_zhuimo_open_ui_ret(n: GameNT): void {
            let msg: s2c_zhuimo_open_ui_ret = n.body;
            if (msg.reward_name_list) {
                this._model.reward_name_list = msg.reward_name_list;
            }
            this.sendNt(BossEvent.ON_ABYSS_MAIN_UPDATE);
        }

        private s2c_zhuimo_show_reward_ret(n: GameNT): void {
            let msg: s2c_zhuimo_show_reward_ret = n.body;
            ViewMgr.getIns().bossRewardShow(msg.props);
        }

        private s2c_zhuimo_boss_roll_point(n: GameNT): void {
            let msg: s2c_zhuimo_boss_roll_point = n.body;
            ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssLucky, msg);
        }

        private s2c_zhuimo_army_ui_show(n: GameNT): void {
            let msg: s2c_zhuimo_army_ui_show = n.body;
            if (msg.army_id) {
                this._model.army_id = msg.army_id;
                if (!this._model.army_id) {
                    this._model.my_team = [];
                }
            }
            // if (msg.army_list) {
            // }
            this._model.army_list = msg.army_list || [];
            if (msg.my_team) {
                this._model.my_team = msg.my_team;
            }
            if (msg.duiyou_list) {
                this._model.duiyou_list = msg.duiyou_list;
                this.sendNt(BossEvent.ON_ABYSS_TEAM_INVITE_UPDATE);
            }
            if (this._model.oper_type) {
                switch (this._model.oper_type) {
                    case 1:
                        facade.hideView(ModName.Boss, BossViewType.AbyssInvite);
                        ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssMyTeam);
                        break;
                    case 2:
                        facade.hideView(ModName.Boss, BossViewType.AbyssTeam);
                        ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssMyTeam);
                        break;
                    case 3:
                        facade.hideView(ModName.Boss, BossViewType.AbyssMyTeam);
                        break;
                }
                this._model.oper_type = 0;
            }

            if (this._model.open_view) {
                this._model.open_view = false;
                if (msg.my_team && msg.my_team.length > 1) {
                    ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssMyTeam);
                } else {
                    ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssNoTeam);
                }
            }
        }

        private s2c_zhuimo_update_buff_info(n: GameNT): void {
            let msg: s2c_zhuimo_update_buff_info = n.body;
            this._model.army_step = msg.army_step || 0;
            this._model.guild_step = msg.guild_step || 0;
            this.sendNt(BossEvent.ON_ABYSS_HURT_UPDATE);
        }

        /**return second */
        public get openTime(): number {
            return this.getOpenTime();
        }

        /**bool是否返回0做开启判断 */
        public getOpenTime(bool: boolean = true): number {
            let serverTime: number = TimeMgr.time.serverTimeSecond * 1000;
            let time = new Date(serverTime);
            let hours: number = time.getHours();
            let endTime: number = 0;
            if (bool && hours == this.openHours1 || hours == this.openHours2) {
                return endTime;
            }
            if (hours < this.openHours1) {
                endTime = time.setHours(this.openHours1, 0, 0, 0);
            } else if (hours < this.openHours2) {
                endTime = time.setHours(this.openHours2, 0, 0, 0);
            } else {
                time.setDate(time.getDate() + 1);
                endTime = time.setHours(this.openHours1, 0, 0, 0);
            }
            return Math.floor(endTime / 1000);
        }

        public get endTime(): number {
            let serverTime: number = TimeMgr.time.serverTimeSecond * 1000;
            let time = new Date(serverTime);
            let hours: number = time.getHours();
            if (hours == this.openHours1 || hours == this.openHours2) {
                return time.setHours(hours + 1, 0, 0, 0) / 1000;
            }
            return 0;
        }

        public get openHours1(): number {
            return this._model.openHours1;
        }

        public get openHours2(): number {
            return this._model.openHours2;
        }

        public get bossList(): zhuimo_boss_data[] {
            return this._model.bossList;
        }

        public get total(): number {
            return this._model.total || 0;
        }

        public get memberNum(): number {
            return this._model.member_num || 0;
        }

        public get reward_name_list(): string[] {
            return this._model.reward_name_list || [];
        }

        public get team_add_hurt(): number {
            let zhuimo_zudui: ParamConfig = GameConfig.getParamConfigById("zhuimo_zudui");
            let zhuimo_xianzong: ParamConfig = GameConfig.getParamConfigById("zhuimo_xianzong");
            let count: number = 0;
            count += zhuimo_zudui.value * this._model.army_step;
            count += zhuimo_xianzong.value * this._model.guild_step;
            return count;
        }

        public get my_team(): teammate[] {
            return this._model.my_team || [];
        }

        public get army_list(): zhuimo_army_data[] {
            return this._model.army_list || [];
        }

        public get duiyou_list(): teammate[] {
            return this._model.duiyou_list || [];
        }

        public get leader(): teammate {
            return this._model.my_team[0];
        }

        public get preview_id(): number {
            return this._model.previewId;
        }

        public get zhuimo_jiangli(): number[][] {
            if (!this._model.zhuimo_jiangli) {
                let cfg: game.config.RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this.preview_id);
                this._model.zhuimo_jiangli = cfg.content;
            }
            return this._model.zhuimo_jiangli;
        }

        public get zhuimo_dajiang(): number {
            if (!this._model.zhuimo_dajiang) {
                let param: ParamConfig = GameConfig.getParamConfigById("zhuimo_dajinag");
                this._model.zhuimo_dajiang = param.value;
            }
            return this._model.zhuimo_dajiang;
        }

        public get zhuimo_cost(): number[] {
            if (!this._model.zhuimo_cost) {
                let param: ParamConfig = GameConfig.getParamConfigById("zhuimo_cost");
                this._model.zhuimo_cost = param.value;
            }
            return this._model.zhuimo_cost;
        }

        public onUpdateHintByAbyss(): void {
            let open: boolean = !this.openTime;
            let bool: boolean = BagUtil.checkPropCnt(this.zhuimo_cost[0], this.zhuimo_cost[1]);
            HintMgr.setHint(open && bool, [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Abyss]);

            this.checkAutoChallengeAbyss();//自动挑战abyss
        }

        protected onUpdateSceneEnter(n: GameNT) {
            let sceneProxy: ISceneProxy = getProxy(ModName.Scene, ProxyType.Scene);
            let lastType = sceneProxy.getSceneType(sceneProxy.lastSceneIdx);
            if (lastType == SceneType.Abyss) {
                //从场景中退出，判断下还可以挑战否。限时被动退出检测 todo
                this.checkAutoChallengeAbyss();
            }
        }

        //---------------------------坠魔深渊---------------------------

        /**============== 修仙女仆自动挂机 ==============*/

        //可挑战id
        public getChallengeManyBossIdx(): number {
            let cfgObj = this.getBossCfgs();
            let rebirthLv = RoleUtil.getRebirthLv();//转数
            if (rebirthLv == 0 && RoleVo.ins.level < 50) {
                return null;//0转且未达50级
            }
            let cfgList = cfgObj[rebirthLv];
            if (!cfgList) {
                return null;
            }
            for (let cfg of cfgList) {
                let bossInfo = this.getBossInfo(cfg.index);
                let bossTime = bossInfo ? bossInfo.recover_time.toNumber() : 0;
                let nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                let showTime = bossTime && nextTime >= 0;
                if (!showTime && this.bossCount > 0) {
                    return cfg.index;
                }
            }
            return null;
        }

        private canChallengeManyBoss(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Boss)) {
                return false;
            }
            let idx = this.getChallengeManyBossIdx();
            return !!idx;
        }

        //挑战boss
        public sendAutoChallengeManyBoss(): void {
            let idx = this.getChallengeManyBossIdx();
            if (idx) {
                this.c2s_new_multiple_boss_challenge(idx);
            }
        }

        // 1.多人boss
        public checkAutoChallengeManyBoss(): void {
            if (this.canChallengeManyBoss()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.ManyBoss, Handler.alloc(this, this.sendAutoChallengeManyBoss));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.ManyBoss);
            }
        }

        public canChallengeAbyss(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Abyss) || this.openTime > 0) {
                return false;
            }
            let cost = this.zhuimo_cost;
            return cost && BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        // 2.坠魔深渊
        private checkAutoChallengeAbyss(): void {
            let index = this.zhuimo_cost[0];
            let curCnt = BagUtil.getPropCntByIdx(index);
            if (curCnt <= 0 && RoleUtil.getAutoChallengeEventType() == XiuxianNvpuEventType.Zhuimoshenyuan) {
                SceneUtil.exitScene();
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Zhuimoshenyuan);
                return;
            }
            if (this.canChallengeAbyss()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Zhuimoshenyuan, Handler.alloc(this, this.c2s_zhuimo_boss_challenge));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Zhuimoshenyuan);
            }
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];
            let cost = this.zhuimo_cost;
            if (cost && indexs.indexOf(cost[0]) > -1) {
                this.checkAutoChallengeAbyss();//数量变化处理
                this.onUpdateHintByAbyss();
            }
        }

        private getCanChallengePersonalBossCfg(): PersonalBossConfig {
            let cfgList: PersonalBossConfig[] = getConfigListByName(ConfigName.PersonalBoss);
            let maxCnt = this.getPersonalBossMaxCnt();
            for (let cfg of cfgList) {
                //未开启
                if (!this.isPersonalBossOpen(cfg)) {
                    continue;
                }
                let info = this.getPersonalBossInfo(cfg.index);
                let useCnt = info && info.used_cnt || 0;
                let leftCnt = maxCnt - useCnt;
                //次数挑战完毕
                if (leftCnt <= 0) {
                    continue;
                }
                let bossTime = info && info.revive_time || 0;
                let isDied = bossTime - TimeMgr.time.serverTimeSecond > 0;
                //已死亡
                if (isDied) {
                    continue;
                }
                return cfg;
            }
            return null;
        }

        private canChallengePersonalBoss(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.PersonalBoss)) {
                return false;
            }
            let cfg = this.getCanChallengePersonalBossCfg();
            return !!cfg;
        }

        private sendAutoChallengePersonalBoss(): void {
            let cfg = this.getCanChallengePersonalBossCfg();
            if (cfg) {
                this.c2s_single_boss_enter(cfg.index);
            }
        }

        // 9.个人boss
        private checkAutoChallengePersonalBoss(): void {
            if (this.canChallengePersonalBoss()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.PersonalBoss, Handler.alloc(this, this.sendAutoChallengePersonalBoss));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.PersonalBoss);
            }
        }

        private getCanChallengeVipBossCfg(): NewVipBossConfig {
            let cfgs: { [index: string]: NewVipBossConfig } = this.getRebVipBossCfg();
            for (let idx in cfgs) {
                let cfg = cfgs[idx];
                let info = this.getVipBossInfo(cfg.index);
                if (!info) {
                    continue;
                }
                let state = this.getState(cfg.index);
                if (state == VipBossState.CanFight) {
                    return cfg;
                }
            }
            return null;
        }

        private canChallengeVipBoss(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.VipBoss)) {
                return false;
            }
            let cfg = this.getCanChallengeVipBossCfg();
            return !!cfg;
        }

        private sendAutoChallengeVipBoss(): void {
            let cfg = this.getCanChallengeVipBossCfg();
            if (cfg) {
                this.c2s_new_vip_boss_enter(cfg.index);
            }
        }

        // 10.vipboss
        private checkAutoChallengeVipBoss(): void {
            if (this.canChallengeVipBoss()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.VipBoss, Handler.alloc(this, this.sendAutoChallengeVipBoss));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.VipBoss);
            }
        }

        private canAutoChallengeCrossBoss(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.CrossBoss)) {
                return false;
            }
            let cfg = this.getAutoChallengeCrossBossCfg();
            if (!cfg) {
                return false;
            }
            return this.checkCrossBossChallengeHint();
        }

        private getAutoChallengeCrossBossCfg(): CrossBossConfig {
            let cfgList: CrossBossConfig[] = getConfigListByName(ConfigName.CrossBoss);
            let bossList: CrossBossConfig[] = [];
            let selIndex = -1;
            for (let cfg of cfgList) {
                bossList.push(cfg);
                let lv = cfg.open[0];
                if (!ViewMgr.getIns().checkRebirth(lv)) {
                    //转生条件未开启
                    break;
                }
                selIndex++;
            }
            selIndex = Math.max(selIndex, 0);//默认选第一个
            return bossList[selIndex];
        }

        private sendAutoChallengeCrossBoss(): void {
            let cfg = this.getAutoChallengeCrossBossCfg();
            if (cfg) {
                this.selCrossBossCfg = cfg;
                this.c2s_new_cross_boss_challenge(cfg.index);
            }
        }

        //14.跨服boss
        private checkAutoChallengeCrossBoss(): void {
            if (this.canAutoChallengeCrossBoss()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.KuafuBoss, Handler.alloc(this, this.sendAutoChallengeCrossBoss));
            } else {
                // this.selCrossBossCfg = null;
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.KuafuBoss);
            }
        }

        /**============== 修仙女仆自动挂机 ==============*/
    }
}