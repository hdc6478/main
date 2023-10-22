namespace game.mod.compete {

    import GameNT = base.GameNT;
    import s2c_tour_update_list = msg.s2c_tour_update_list;
    import s2c_tour_wish_get_list = msg.s2c_tour_wish_get_list;
    import c2s_tour_refresh_defender = msg.c2s_tour_refresh_defender;
    import c2s_tour_challenge = msg.c2s_tour_challenge;
    import c2s_tour_buy_times = msg.c2s_tour_buy_times;
    import c2s_tour_stage_get_list = msg.c2s_tour_stage_get_list;
    import s2c_tour_stage_get_list = msg.s2c_tour_stage_get_list;
    import c2s_tour_stage_buy = msg.c2s_tour_stage_buy;
    import c2s_tour_fuli_get_list = msg.c2s_tour_fuli_get_list;
    import s2c_tour_fuli_get_list = msg.s2c_tour_fuli_get_list;
    import c2s_tour_fuli_buy = msg.c2s_tour_fuli_buy;
    import s2c_city_war_fight_update = msg.s2c_city_war_fight_update;
    import tour_role_info = msg.tour_role_info;
    import common_reward_status = msg.common_reward_status;
    import ParamConfig = game.config.ParamConfig;
    import TourpvpPaimingConfig = game.config.TourpvpPaimingConfig;
    import TourpvpChallengeConfig = game.config.TourpvpChallengeConfig;
    import TourpvpPreciousConfig = game.config.TourpvpPreciousConfig;
    import c2s_pvp_battle_get_player_challenge_info = msg.c2s_pvp_battle_get_player_challenge_info;
    import c2s_pvp_battle_rank_challenge = msg.c2s_pvp_battle_rank_challenge;
    import c2s_pvp_battle_keep_win_rewards = msg.c2s_pvp_battle_keep_win_rewards;
    import c2s_pvp_battle_win_count_rewards = msg.c2s_pvp_battle_win_count_rewards;
    import c2s_pvp_battle_buy_count = msg.c2s_pvp_battle_buy_count;
    import c2s_pvp_battle_get_rank_info = msg.c2s_pvp_battle_get_rank_info;
    import c2s_pvp_battle_get_pk_info = msg.c2s_pvp_battle_get_pk_info;
    import s2c_pvp_battle_get_player_challenge_info = msg.s2c_pvp_battle_get_player_challenge_info;
    import s2c_pvp_battle_more_power_end = msg.s2c_pvp_battle_more_power_end;
    import s2c_pvp_battle_base_info = msg.s2c_pvp_battle_base_info;
    import s2c_pvp_battle_rank_info = msg.s2c_pvp_battle_rank_info;
    import s2c_pvp_battle_pk_info = msg.s2c_pvp_battle_pk_info;
    import MagicUpConfig = game.config.MagicUpConfig;
    import facade = base.facade;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;
    import teammate = msg.teammate;
    import MagicTargetConfig = game.config.MagicTargetConfig;
    import MagicWinConfig = game.config.MagicWinConfig;
    import c2s_pvp_battle_group_pk_info = msg.c2s_pvp_battle_group_pk_info;
    import s2c_pvp_battle_group_pk = msg.s2c_pvp_battle_group_pk;
    import pvp_battle_group_pk = msg.pvp_battle_group_pk;
    import c2s_pvp_battle_guess = msg.c2s_pvp_battle_guess;
    import s2c_pvp_battle_guess_list = msg.s2c_pvp_battle_guess_list;
    import TimeMgr = base.TimeMgr;
    import c2s_tour_win_get_list = msg.c2s_tour_win_get_list;
    import TourpvpWinConfig = game.config.TourpvpWinConfig;
    import tour_wish_reward_status = msg.tour_wish_reward_status;
    import TourpvpDatiConfig = game.config.TourpvpDatiConfig;
    import c2s_tour_dati_select = msg.c2s_tour_dati_select;
    import s2c_tour_dati_select = msg.s2c_tour_dati_select;
    import Handler = base.Handler;
    import c2s_kuafudoufa_click = msg.c2s_kuafudoufa_click;
    import s2c_kuafudoufa_rank_info = msg.s2c_kuafudoufa_rank_info;
    import s2c_kuafudoufa_zhanchang_paiming = msg.s2c_kuafudoufa_zhanchang_paiming;
    import s2c_kuafudoufa_base_info = msg.s2c_kuafudoufa_base_info;
    import s2c_kuafudoufa_score_info = msg.s2c_kuafudoufa_score_info;
    import s2c_kuafudoufa_zhanchang_jifen = msg.s2c_kuafudoufa_zhanchang_jifen;
    import DoufaJifenConfig = game.config.DoufaJifenConfig;
    import s2c_kuafudoufa_boss_info = msg.s2c_kuafudoufa_boss_info;
    import s2c_kuafudoufa_attack_status = msg.s2c_kuafudoufa_attack_status;
    import s2c_scene_kill_notice = msg.s2c_scene_kill_notice;
    import c2s_kuafudoufa_scene_use_buff = msg.c2s_kuafudoufa_scene_use_buff;
    import s2c_kuafudoufa_scene_buff_index_cd = msg.s2c_kuafudoufa_scene_buff_index_cd;

    export class CompeteProxy extends ProxyBase implements ICompeteProxy {

        private _model: CompeteModel;

        // public getModel(): CompeteModel {
        //     return this._model;
        // }

        initialize(): void {
            super.initialize();
            this._model = new CompeteModel();
            this.onProto(s2c_tour_update_list, this.s2c_tour_update_list, this);
            this.onProto(s2c_tour_wish_get_list, this.s2c_tour_wish_get_list, this);
            this.onProto(s2c_tour_stage_get_list, this.s2c_tour_stage_get_list, this);
            this.onProto(s2c_tour_fuli_get_list, this.s2c_tour_fuli_get_list, this);
            this.onProto(s2c_city_war_fight_update, this.s2c_city_war_fight_update, this);
            this.onProto(s2c_tour_dati_select, this.s2c_tour_dati_select, this);
            this.onProto(s2c_pvp_battle_get_player_challenge_info, this.s2c_pvp_battle_get_player_challenge_info, this);
            this.onProto(s2c_pvp_battle_more_power_end, this.s2c_pvp_battle_more_power_end, this);
            this.onProto(s2c_pvp_battle_base_info, this.s2c_pvp_battle_base_info, this);
            this.onProto(s2c_pvp_battle_rank_info, this.s2c_pvp_battle_rank_info, this);
            this.onProto(s2c_pvp_battle_pk_info, this.s2c_pvp_battle_pk_info, this);
            this.onProto(s2c_pvp_battle_group_pk, this.s2c_pvp_battle_group_pk, this);
            this.onProto(s2c_pvp_battle_guess_list, this.s2c_pvp_battle_guess_list, this);
            this.onProto(s2c_kuafudoufa_rank_info, this.s2c_kuafudoufa_rank_info, this);
            this.onProto(s2c_kuafudoufa_zhanchang_paiming, this.s2c_kuafudoufa_zhanchang_paiming, this);
            this.onProto(s2c_kuafudoufa_base_info, this.s2c_kuafudoufa_base_info, this);
            this.onProto(s2c_kuafudoufa_score_info, this.s2c_kuafudoufa_score_info, this);
            this.onProto(s2c_kuafudoufa_zhanchang_jifen, this.s2c_kuafudoufa_zhanchang_jifen, this);
            this.onProto(s2c_kuafudoufa_boss_info, this.s2c_kuafudoufa_boss_info, this);
            this.onProto(s2c_kuafudoufa_attack_status, this.s2c_kuafudoufa_attack_status, this);
            this.onProto(s2c_scene_kill_notice, this.s2c_scene_kill_notice, this);
            this.onProto(s2c_kuafudoufa_scene_buff_index_cd, this.s2c_kuafudoufa_scene_buff_index_cd, this);
        }

        public c2s_tour_win_get_list(index: number) {
            let msg = new c2s_tour_win_get_list();
            msg.index = index;
            this.sendProto(msg);
        }

        public s2c_tour_update_list(n: GameNT): void {
            let msg: s2c_tour_update_list = n.body;
            if (!msg) {
                return;
            }
            this._model.curBuyCnt = msg.buy;
            this._model.curFightTimes = msg.done_times;
            this._model.nextFightTime = msg.next_time;
            this._model.rankEndTime = msg.rank_end_time;
            this._model.youliWinCnt = msg.today_win_cnt;
            this._model.youliWinList = msg.award_list || [];

            if (msg.top_rank) {
                for (let rank of msg.top_rank) {
                    this._model.topRank[rank.pos] = rank;
                }
            }
            this._model.type = msg.type;
            this._model.giftIndex = msg.gift_index;

            this.checkAutoChallengeYouli();
            this.updateYouliHint();
            this.sendNt(CompeteEvent.UPDATE_YOULI_INFO);
        }

        public get youliWinCnt(): number {
            return this._model.youliWinCnt;
        }

        public getYouliWinRewardStatus(cfg: TourpvpWinConfig): number {
            let rewards = this._model.youliWinList;
            let index = cfg.index;
            if (rewards.indexOf(index) >= 0) {
                return RewardStatus.Draw;
            }
            if (this.youliWinCnt >= cfg.count) {
                return RewardStatus.Finish;
            }
            return RewardStatus.NotFinish;
        }

        public s2c_tour_wish_get_list(n: GameNT): void {
            let msg: s2c_tour_wish_get_list = n.body;
            if (!msg) {
                return;
            }
            this._model.wishBoxAwardArr = msg.list;
            this.sendNt(CompeteEvent.UPDATE_YOULI_WISH_BOX);
        }

        public c2s_tour_challenge(pos: number, type: YouliType = YouliType.Normal): void {
            let req: c2s_tour_challenge = new c2s_tour_challenge();
            req.rank_no = pos;
            req.type = type;
            this.sendProto(req);
        }

        public c2s_tour_refresh_defender(): void {
            let req: c2s_tour_refresh_defender = new c2s_tour_refresh_defender();
            this.sendProto(req);
        }

        public c2s_tour_buy_times(cnt: number): void {
            let req: c2s_tour_buy_times = new c2s_tour_buy_times();
            req.cnt = cnt;
            this.sendProto(req);
        }

        public c2s_tour_stage_get_list(): void {
            let req: c2s_tour_stage_get_list = new c2s_tour_stage_get_list();
            this.sendProto(req);
        }

        public s2c_tour_stage_get_list(n: GameNT): void {
            let msg: s2c_tour_stage_get_list = n.body;
            if (!msg) {
                return;
            }
            this._model.challengeCnt = msg.challenge_cnt;

            if (msg.list) {
                for (let awd of msg.list) {
                    this._model.stepAwards[awd.index.toString()] = awd;
                }
            }

            this.updateYouliHint();
            this.sendNt(CompeteEvent.UPDATE_YOULI_AWARD);
        }

        public c2s_tour_stage_buy(index: number): void {
            let req: c2s_tour_stage_buy = new c2s_tour_stage_buy();
            req.index = index;
            this.sendProto(req);
        }

        public c2s_tour_fuli_get_list(): void {
            let req: c2s_tour_fuli_get_list = new c2s_tour_fuli_get_list();
            this.sendProto(req);
        }

        public s2c_tour_fuli_get_list(n: GameNT): void {
            let msg: s2c_tour_fuli_get_list = n.body;
            if (!msg) {
                return;
            }
            this._model.dayScore = msg.tourpvp_day_score;

            if (msg.list) {
                for (let awd of msg.list) {
                    this._model.scoreAwards[awd.index.toString()] = awd;
                }
            }

            this.updateYouliHint();
            this.sendNt(CompeteEvent.UPDATE_YOULI_SCORE);
        }

        public c2s_tour_fuli_buy(index: number): void {
            let req: c2s_tour_fuli_buy = new c2s_tour_fuli_buy();
            req.index = index;
            this.sendProto(req);
        }

        public s2c_city_war_fight_update(n: GameNT): void {
            let msg: s2c_city_war_fight_update = n.body;
            if (!msg) {
                return;
            }
            this._model.fightData = msg;
            this.sendNt(CompeteEvent.UPDATE_YOULI_KILLER_FIGHT);
        }

        /**
         * 今日已购买次数
         */
        public get curBuyCnt(): number {
            return this._model.curBuyCnt;
        }

        /**
         * 已挑战次数
         */
        public get curFightTimes(): number {
            return this._model.curFightTimes;
        }

        /**
         * 刷新1次的花费
         */
        public get refreshCost(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("youli_buy_cost");
            return cfg.value[0][1];
        }

        /**
         * 最大可购买挑战次数
         */
        public get maxBuyFightTimes(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("youli_value");
            return cfg.value[2];
        }

        /**
         * 最大挑战次数
         */
        public get maxFightTimes(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("youli_value");
            return cfg.value[1];    // + this._model.curBuyCnt;
        }

        public get remainTimes(): number {
            return this.maxFightTimes - this.curFightTimes || 0;
        }

        public getRankCfg(rankNo: number): TourpvpPaimingConfig {
            let rankCfg: TourpvpPaimingConfig[] = getConfigListByName(ConfigName.TourpvpPaiming);
            for (let rank of rankCfg) {
                if (rankNo >= rank.rank_section[0] && rankNo <= rank.rank_section[1]) {
                    return rank;
                }
            }
            return null;
        }

        public getChallengeCfg(id: number): TourpvpChallengeConfig {
            let cfg: TourpvpChallengeConfig = getConfigByNameId(ConfigName.TourpvpChallenge, id);
            return cfg;
        }

        public getPreciousCfg(id: number): TourpvpPreciousConfig {
            let cfg: TourpvpPreciousConfig = getConfigByNameId(ConfigName.TourpvpPrecious, id);
            return cfg;
        }

        /**
         * 下次挑战次数恢复1次的时间
         */
        public get nextFightTime(): number {
            return this._model.nextFightTime;
        }

        /**
         * 排行榜结束时间戳
         */
        public get rankEndTime(): number {
            return this._model.rankEndTime;
        }

        /**
         * 我的名次
         */
        public get myRank(): number {
            let rankInfo = RankUtil.getRankInfo(RankType.Type4);
            let rankNo = rankInfo && rankInfo.my_info ? rankInfo.my_info.rank_no : 0;
            return rankNo;
        }

        /**
         * 站位信息
         */
        public getTopRank(pos: number): tour_role_info {
            return this._model.topRank[pos];
        }

        /**
         * 玩法类型，0 正常 1 宝箱  2宝藏 3异形 4杀手
         */
        public get type(): YouliType {
            return this._model.type;
        }

        /**
         * 奖励宝藏对应的礼包id
         */
        public get giftIndex(): number {
            return this._model.giftIndex;
        }

        /**
         * 累计完成游历次数
         */
        public get challengeCnt(): number {
            return this._model.challengeCnt;
        }

        /**
         * 可领取、已领取的阶段奖励列表
         */
        public getStepAward(index: number): common_reward_status {
            return this._model.stepAwards[index];
        }

        /**
         * 今日获得的分数
         */
        public get dayScore(): number {
            return this._model.dayScore || 0;
        }

        /**
         * 可领取、已领取的积分奖励列表
         */
        public getScoreAward(index: number): common_reward_status {
            return this._model.scoreAwards[index];
        }

        /**
         * 已领取的许愿奖励列表
         */
        public getWishBoxAwardArr(): tour_wish_reward_status[] {
            return this._model.wishBoxAwardArr;
        }

        public clearWishBoxAwardArr(): void {
            this._model.wishBoxAwardArr = [];
        }

        public set datiCfg(cfg: TourpvpDatiConfig) {
            this._model.datiCfg = cfg;
        }

        public get datiCfg(): TourpvpDatiConfig {
            return this._model.datiCfg;
        }

        /**
         * 异形、积分杀手战斗数据
         */
        public get fightData(): s2c_city_war_fight_update {
            return this._model.fightData;
        }

        private updateYouliHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Youli)) {
                return;
            }
            let challengeHint = this.remainTimes > 0;
            HintMgr.setHint(challengeHint, this._model.youliChallengeHint, OpenIdx.Youli);

            let hint = this.getYouliHint() || challengeHint;
            HintMgr.setHint(hint, this._model.youliHint);
        }

        private getYouliHint(): boolean {
            let hint = this.getYouliAwardHint() || this.getYouliScoreHint() || this.checkYouliWinRewardHint();
            return hint;
        }

        public getYouliAwardHint(): boolean {
            let hint = false;
            let awds: { [idx: string]: common_reward_status } = this._model.stepAwards;
            for (let idx in awds) {
                let awd = awds[idx];
                if (awd.status == RewardStatus.Finish) {     // 可领取
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        public getYouliScoreHint(): boolean {
            let hint = false;
            let awds: { [idx: string]: common_reward_status } = this._model.scoreAwards;
            for (let idx in awds) {
                let awd = awds[idx];
                if (awd.status == RewardStatus.Finish) {     // 可领取
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        private checkYouliWinRewardHint(): boolean {
            let cfgList: TourpvpWinConfig[] = getConfigListByName(ConfigName.TourpvpWin);
            for (let cfg of cfgList) {
                let status = this.getYouliWinRewardStatus(cfg);
                let canDraw = status == RewardStatus.Finish;
                if (canDraw) {
                    return true;
                }
            }
            return false;
        }

        public c2s_tour_dati_select(index: number): void {
            let msg: c2s_tour_dati_select = new c2s_tour_dati_select();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_tour_dati_select(n: GameNT) {
            let msg: s2c_tour_dati_select = n.body;
            if (!msg) {
                return;
            }
            this.sendNt(CompeteEvent.UPDATE_YOULI_DATI);
            facade.showView(ModName.Compete, CompeteViewType.YouliDatiResult, msg);
        }

        //玩法总次数获取
        public getCurVal(): number {
            return this.remainTimes + BagUtil.getPropCntByIdx(PropIndex.YouliJuanzhou);//每日剩余次数+物品剩余数量
        }

        public getCurValDoufa(): number {
            return this.cnt + BagUtil.getPropCntByIdx(PropIndex.DoufaJuanzhou);//每日剩余次数+物品剩余数量
        }

        /************************** 斗法 *************************/
        public c2s_pvp_battle_get_player_challenge_info() {
            let msg = new c2s_pvp_battle_get_player_challenge_info();
            this.sendProto(msg);
            this.clearRecordList();//挑战时清除战报信息
        }

        public c2s_pvp_battle_rank_challenge() {
            let msg = new c2s_pvp_battle_rank_challenge();
            this.sendProto(msg);
        }

        public c2s_pvp_battle_keep_win_rewards(index: number) {
            let msg = new c2s_pvp_battle_keep_win_rewards();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_pvp_battle_win_count_rewards(index: number) {
            let msg = new c2s_pvp_battle_win_count_rewards();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_pvp_battle_buy_count(count: number) {
            let msg = new c2s_pvp_battle_buy_count();
            msg.buycount = count;
            this.sendProto(msg);
        }

        public c2s_pvp_battle_get_rank_info(rankType: number) {
            let msg = new c2s_pvp_battle_get_rank_info();
            msg.rank_type = rankType;
            this.sendProto(msg);
        }

        public c2s_pvp_battle_get_pk_info() {
            if (this.recordList && this.recordList.length) {
                return;//存在战报时不请求新战报
            }
            let msg = new c2s_pvp_battle_get_pk_info();
            this.sendProto(msg);
        }

        public c2s_pvp_battle_group_pk_info() {
            let msg = new c2s_pvp_battle_group_pk_info();
            this.sendProto(msg);
        }

        private s2c_pvp_battle_get_player_challenge_info(n: GameNT) {
            let msg: s2c_pvp_battle_get_player_challenge_info = n.body;
            if (!msg || !msg.is_success) {
                this.sendNt(CompeteEvent.DOUFA_RESET_CHALLENGE);
                this.resetAutoChallengeDoufa();
                return;
            }
            facade.showView(ModName.Compete, CompeteViewType.DoufaVs, msg.player_info);
        }

        private s2c_pvp_battle_more_power_end(n: GameNT) {
            let msg: s2c_pvp_battle_more_power_end = n.body;
            if (!msg) {
                return;
            }
            facade.showView(ModName.Compete, CompeteViewType.DoufaQuickWin, msg);
        }

        private s2c_pvp_battle_base_info(n: GameNT) {
            let msg: s2c_pvp_battle_base_info = n.body;
            if (!msg) {
                return;
            }
            if (!this._model.info || msg.oper == 1) {
                this._model.info = msg;
            } else {
                for (let k in msg) {
                    this._model.info[k] = msg[k];
                }
            }

            this.checkAutoChallengeDoufa();
            this.updateDoufaHint();
            this.sendNt(CompeteEvent.UPDATE_DOUFA_INFO);
        }

        // public get info(): s2c_pvp_battle_base_info {
        //     return this._model.info;
        // }
        //我的积分
        public get score(): number {
            return this._model.info && this._model.info.score || 0;
        }

        //我的段位
        public get lv(): number {
            return this.getLv(this.score);
        }

        //通过积分获取段位
        public getLv(score: number): number {
            let cfgList: MagicUpConfig[] = getConfigListByName(ConfigName.MagicUp);
            let len = cfgList.length;
            for (let i = len - 1; i >= 0; --i) {
                let cfg = cfgList[i];
                if (score >= cfg.score) {
                    return cfg.index;
                }
            }
            return 1;
        }

        //获取段位最大积分
        public getMaxScore(): number {
            let lv = this.lv;
            let cfg: MagicUpConfig = getConfigByNameId(ConfigName.MagicUp, lv);
            let nextLv = lv + 1;
            let nextCfg: MagicUpConfig = getConfigByNameId(ConfigName.MagicUp, nextLv);
            let isMaxLv = !nextCfg;//最高段位
            return isMaxLv ? cfg.score : nextCfg.score;
        }

        public get winCnt(): number {
            return this._model.info && this._model.info.keepwin_num || 0;
        }

        public get curCnt(): number {
            return this._model.info && this._model.info.use_count || 0;
        }

        public get cnt(): number {
            return this._model.info && this._model.info.count || 0;
        }

        public get buyCnt(): number {
            return this._model.info && this._model.info.buycount || 0;
        }

        private get winRewards(): common_reward_status[] {
            return this._model.info && this._model.info.keep_win_list || [];
        }

        private get rewards(): common_reward_status[] {
            return this._model.info && this._model.info.count_list || [];
        }

        public getRewardStatus(index: number): number {
            let rewards = this.rewards;
            for (let info of rewards) {
                if (info.index.toNumber() == index) {
                    return info.status;
                }
            }
            return RewardStatus.NotFinish;
        }

        public getWinRewardStatus(index: number): number {
            let rewards = this.winRewards;
            for (let info of rewards) {
                if (info.index.toNumber() == index) {
                    return info.status;
                }
            }
            return RewardStatus.NotFinish;
        }

        private s2c_pvp_battle_rank_info(n: GameNT) {
            let msg: s2c_pvp_battle_rank_info = n.body;
            if (!msg) {
                return;
            }
            //数据分开储存，巅峰排行榜数据不做频繁请求
            switch (msg.rank_type) {
                case RankCommonType.Type1:
                    this._model.rankList1 = msg.server_player_ranks || [];
                    this._model.topInfo1 = msg.top_one;
                    if (msg.endtime) {
                        this._model.endTime1 = msg.endtime.toNumber();
                    }
                    break;
                case RankCommonType.Type2:
                    this._model.rankList2 = msg.server_player_ranks || [];
                    this._model.topInfo2 = msg.top_one;
                    if (msg.endtime) {
                        this._model.endTime2 = msg.endtime.toNumber();
                    }
                    break;
                case RankCommonType.Type3:
                    this._model.rankList3 = msg.server_player_ranks || [];
                    this._model.topInfo3 = msg.top_one;
                    if (msg.endtime) {
                        this._model.endTime3 = msg.endtime.toNumber();
                    }
                    break;
            }
            this.sendNt(CompeteEvent.UPDATE_DOUFA_RANK);
        }

        public getRankList(type: number): teammate[] {
            switch (type) {
                case RankCommonType.Type1:
                    return this._model.rankList1;
                case RankCommonType.Type2:
                    return this._model.rankList2;
            }
            return this._model.rankList3;
        }

        public getMyRankInfo(type: number): teammate {
            let ranks = this.getRankList(type);
            for (let info of ranks) {
                if (info.role_id.eq(RoleVo.ins.role_id)) {
                    return info;
                }
            }
            return null;
        }

        //重置巅峰排行榜数据
        public resetTopRank(): void {
            this._model.rankList3 = [];
        }

        public getTopInfo(type: number): teammate {
            switch (type) {
                case RankCommonType.Type1:
                    return this._model.topInfo1;
                case RankCommonType.Type2:
                    return this._model.topInfo2;
            }
            return this._model.topInfo3;
        }

        public getEndTime(type: number): number {
            switch (type) {
                case RankCommonType.Type1:
                    // if(!this._model.endTime1){
                    //     this.c2s_pvp_battle_get_rank_info(type);
                    // }
                    return this._model.endTime1;
                case RankCommonType.Type2:
                    return this._model.endTime2;
            }
            return this._model.endTime3;
        }

        private s2c_pvp_battle_pk_info(n: GameNT) {
            let msg: s2c_pvp_battle_pk_info = n.body;
            if (!msg) {
                return;
            }
            this._model.recordList = msg.list || [];
            this.sendNt(CompeteEvent.UPDATE_DOUFA_RECORD);
        }

        public get recordList(): pvp_battle_pk_data[] {
            return this._model.recordList;
        }

        private clearRecordList(): void {
            this._model.recordList = [];
        }

        /**更新红点*/
        private updateDoufaHint(): void {
            this.updateChallengeHint();
            this.updateRewardHint();
            this.updateWinRewardHint();
        }

        private updateChallengeHint(): void {
            let hint = this.checkChallengeHint();
            let hintType = this._model.challengeHint;
            HintMgr.setHint(hint, hintType, OpenIdx.Doufa);
        }

        private checkChallengeHint(): boolean {
            if (this.groupStatus != DoufaGroupStatus.Score) {
                return false;
            }
            return this.cnt > 0;
        }

        public get rewardHint(): string[] {
            return this._model.rewardHint;
        }

        private updateRewardHint(): void {
            let hint = this.checkRewardHint();
            let hintType = this._model.rewardHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkRewardHint(): boolean {
            let curCnt = this.curCnt;
            let cfgList: MagicTargetConfig[] = getConfigListByName(ConfigName.MagicTarget);
            for (let cfg of cfgList) {
                let cnt = cfg.count;
                if (curCnt < cnt) {
                    continue;
                }
                let index = cfg.index;
                let status = this.getRewardStatus(index);
                let hasBuy = status == RewardStatus.Draw;
                if (hasBuy) {
                    continue;
                }
                let cost = cfg.cost;
                let costIdx = cost[0];
                let indexKey = PropIndexToKey[costIdx];
                if (this._model.rewardCostIndexs.indexOf(indexKey) < 0) {
                    this._model.rewardCostIndexs.push(indexKey);//缓存消耗道具
                }
                if (BagUtil.checkPropCnt(costIdx, cost[1])) {
                    return true;
                }
            }
            return false;
        }

        private updateWinRewardHint(): void {
            let hint = this.checkWinRewardHint();
            let hintType = this._model.winRewardHint;
            HintMgr.setHint(hint, hintType);
        }

        private checkWinRewardHint(): boolean {
            let cfgList: MagicWinConfig[] = getConfigListByName(ConfigName.MagicWin);
            for (let cfg of cfgList) {
                let status = this.getWinRewardStatus(cfg.index);
                let canDraw = status == RewardStatus.Finish;
                if (canDraw) {
                    return true;
                }
            }
            return false;
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            for (let k of keys) {
                if (this._model.rewardCostIndexs.indexOf(k) >= 0) {
                    this.updateRewardHint();
                    break;
                }
            }
        }

        public set auto(auto: boolean) {
            this._model.auto = auto;
        }

        public get auto(): boolean {
            return this._model.auto;
        }

        public c2s_pvp_battle_guess(roleId: Long) {
            let msg = new c2s_pvp_battle_guess();
            msg.role_id = roleId;
            this.sendProto(msg);
        }

        private s2c_pvp_battle_guess_list(n: GameNT) {
            let msg: s2c_pvp_battle_guess_list = n.body;
            if (!msg) {
                return;
            }
            this._model.guessList = msg.role_id_list;
            this.sendNt(CompeteEvent.UPDATE_DOUFA_GUESS_INFO);
        }

        private s2c_pvp_battle_group_pk(n: GameNT) {
            let msg: s2c_pvp_battle_group_pk = n.body;
            if (!msg) {
                return;
            }
            if (msg.type != undefined) {
                this._model.groupStatus = msg.type;
            }
            if (msg.pktime) {
                this._model.groupTime = msg.pktime.toNumber();
            }
            if (msg.list) {
                this._model.groupList = msg.list;
            }
            this.sendNt(CompeteEvent.UPDATE_DOUFA_GROUP_INFO);
        }

        public getGroupInfo(type: number): pvp_battle_group_pk {
            if (!this._model.groupList || !this._model.groupList.length) {
                return null;
            }
            for (let info of this._model.groupList) {
                if (info.group_type == type) {
                    return info;
                }
            }
            return null;
        }

        public get groupStatus(): number {
            return this._model.groupStatus;
        }

        public get groupTime(): number {
            return this._model.groupTime;
        }

        public get guessMaxCnt(): number {
            return 1;//最大次数为1
        }

        public getGuessCnt(): number {
            if (this.hasGuess()) {
                return 0;
            }
            return 1;//次数为1
        }

        //是否押注
        public isGuess(roleId: Long): boolean {
            if (!this._model.guessList || !this._model.guessList.length) {
                return false;
            }
            for (let i of this._model.guessList) {
                if (i.eq(roleId)) {
                    return true;
                }
            }
            return false;
        }

        //已押注
        public hasGuess(): boolean {
            return this._model.guessList && !!this._model.guessList.length;
        }

        //可押注
        public canGuess(): boolean {
            if (this.groupStatus == DoufaGroupStatus.Score) {
                //积分赛不可押注
                return false;
            }
            let cnt = this.getGuessCnt();
            if (cnt <= 0) {
                //没有押注次数不可押注(已押注)
                return false;
            }
            if (TimeMgr.time.serverTimeSecond >= this.groupTime) {
                //战斗已开始不可押注
                return false;
            }
            if (this.isEnterGroup()) {
                //参赛的玩家不可押注
                return false;
            }
            return false;
        }

        //是否进入决赛分组
        public isEnterGroup(): boolean {
            if (!this._model.groupList || !this._model.groupList.length) {
                return false;
            }
            let roleId = RoleVo.ins.role_id;
            for (let info of this._model.groupList) {
                for (let i of info.info) {
                    if (i.role_info1 && i.role_info1.role_id.eq(roleId)) {
                        return true;
                    }
                    if (i.role_info2 && i.role_info2.role_id.eq(roleId)) {
                        return true;
                    }
                }
            }
            return false;
        }

        /************************** 斗法 *************************/

        /**============== 修仙女仆自动挂机 ==============*/

        private getAutoChallengeYouliRankInfo(): tour_role_info {
            for (let i = 1; i <= 4; i++) {
                let data = this.getTopRank(i);
                if (!data) {
                    continue;
                }
                if (data.pos != 1 || this.type == YouliType.Normal) {
                    return data;
                }
            }
            return null;
        }

        private canAutoChallengeYouli(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Youli)) {
                return false;
            }
            let remainTimes = this.remainTimes;
            if (remainTimes <= 0) {
                return false;
            }
            let rankInfo = this.getAutoChallengeYouliRankInfo();
            return !!rankInfo;
        }

        private sendAutoChallengeYouli(): void {
            let rankInfo = this.getAutoChallengeYouliRankInfo();
            if (rankInfo) {
                this.c2s_tour_challenge(rankInfo.pos);
            }
        }

        //自动挑战游历
        private checkAutoChallengeYouli(): void {
            if (this.canAutoChallengeYouli()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Youli, Handler.alloc(this, this.sendAutoChallengeYouli));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Youli);
            }
        }

        //有挑战次数是皮肤状态1的情况
        private canAutoChallengeDoufa(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Doufa)) {
                return false;
            }
            return this.groupStatus == DoufaGroupStatus.Score && this.cnt > 0;
        }

        //自动挑战斗法
        private checkAutoChallengeDoufa(): void {
            if (this.canAutoChallengeDoufa()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Doufa, Handler.alloc(this, this.c2s_pvp_battle_get_player_challenge_info));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Doufa);
            }
        }

        //斗法匹配失败
        private resetAutoChallengeDoufa(): void {
            RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Doufa);
        }

        /**============== 修仙女仆自动挂机 ==============*/

        /**============== 跨服斗法 ==============*/

        public c2s_kuafudoufa_click(type: number) {
            let msg = new c2s_kuafudoufa_click();
            msg.button_type = type;
            this.sendProto(msg);
        }

        private s2c_kuafudoufa_rank_info(n: GameNT) {
            let msg: s2c_kuafudoufa_rank_info = n.body;
            if (!msg) {
                return;
            }
            if (msg.button_type != undefined) {
                this._model.rankList[msg.button_type] = msg.all_ranks || [];
                this._model.myRank[msg.button_type] = msg.my_rank || null;
                this.sendNt(CompeteEvent.KUAFU_DOUFA_RANK_UPDATE);
            }
        }

        public c2s_kuafudoufa_scene_use_buff(index: number) {
            let msg = new c2s_kuafudoufa_scene_use_buff();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_kuafudoufa_zhanchang_paiming(n: GameNT) {
            let msg: s2c_kuafudoufa_zhanchang_paiming = n.body;
            if (!msg) {
                return;
            }
            this.sendNt(CompeteEvent.KUAFU_DOUFA_SCENE_RANK_UPDATE, msg.rank_list);
        }

        private s2c_kuafudoufa_base_info(n: GameNT) {
            let msg: s2c_kuafudoufa_base_info = n.body;
            if (!msg) {
                return;
            }
            if (msg.is_join != undefined) {
                this._model.isJoin = !!msg.is_join;
            }
            if (msg.count != undefined) {
                this._model.leftCnt = msg.count;
                this.sendNt(CompeteEvent.KUAFU_DOUFA_COUNT_UPDATE);
            }
            if (msg.status != undefined) {
                this._model.state = msg.status;
                if (this._model.state == KuafuDoufaState.Open) {
                    let endTime = this.getNextTime();//计算时间
                    PropTipsMgr.getIns().showBoss(BossTipsType.KuafuDoufa, endTime);
                }
                this.sendNt(CompeteEvent.KUAFU_DOUFA_STATE_UPDATE);
            }
            if (msg.is_sgin != undefined) {
                this._model.hasEnroll = !!msg.is_sgin;
                this.sendNt(CompeteEvent.KUAFU_DOUFA_ENROLL_UPDATE);
            }
            this.updateKuafuDoufaHint();
        }

        private s2c_kuafudoufa_score_info(n: GameNT) {
            let msg: s2c_kuafudoufa_score_info = n.body;
            if (!msg) {
                return;
            }
            if (msg.my_score != undefined) {
                this._model.myScore = msg.my_score;
                this.sendNt(CompeteEvent.KUAFU_DOUFA_MY_SCORE_UPDATE);//积分奖励界面用
            }
            if (msg.red_camp_score != undefined) {
                this._model.redCampScore = msg.red_camp_score;
            }
            if (msg.red_camp_num != undefined) {
                this._model.redCampNum = msg.red_camp_num;
            }
            if (msg.blue_camp_score != undefined) {
                this._model.blueCampScore = msg.blue_camp_score;
            }
            if (msg.blue_camp_num != undefined) {
                this._model.blueCampNum = msg.blue_camp_num;
            }
            this.sendNt(CompeteEvent.KUAFU_DOUFA_SCORE_UPDATE);
        }

        private s2c_kuafudoufa_zhanchang_jifen(n: GameNT) {
            let msg: s2c_kuafudoufa_zhanchang_jifen = n.body;
            this._model.scoreList = msg && msg.ids || [];
            this.sendNt(CompeteEvent.KUAFU_DOUFA_SCORE_REWARD_UPDATE);
        }

        private s2c_kuafudoufa_boss_info(n: GameNT) {
            let msg: s2c_kuafudoufa_boss_info = n.body;
            if (msg.boss_list) {
                for (let info of msg.boss_list) {
                    this._model.bossHpInfos[info.index.toNumber()] = info.percent;
                }
            } else {
                this._model.bossHpInfos = {};
            }
            this.sendNt(CompeteEvent.KUAFU_DOUFA_BOSS_UPDATE);
        }

        private s2c_kuafudoufa_attack_status(n: GameNT) {
            let msg: s2c_kuafudoufa_attack_status = n.body;
            this._model.attackStatus = msg.status;
            this.sendNt(CompeteEvent.KUAFU_DOUFA_ATTACK_UPDATE);
        }

        private s2c_scene_kill_notice(n: GameNT) {
            let msg: s2c_scene_kill_notice = n.body;
            this._model.noticeList.push(msg);
            this.sendNt(CompeteEvent.KUAFU_DOUFA_NOTICE_UPDATE);
        }

        private s2c_kuafudoufa_scene_buff_index_cd(n: GameNT): void {
            let msg = n.body as s2c_kuafudoufa_scene_buff_index_cd;
            if (msg.idx_cds != null) {
                for (let item of msg.idx_cds) {
                    this._model.idx_cds[item.index] = item;
                }
            }
            this.sendNt(CompeteEvent.KUAFU_DOUFA_SKILL_CD_UPDATE);
        }

        //技能cd时间
        public getSkillCd(index: number): number {
            let info = this._model.idx_cds[index];
            let endTime = info && info.cd_time ? info.cd_time.toNumber() : 0;
            if (endTime <= TimeMgr.time.serverTimeSecond) {
                return 0;
            }
            return endTime;
        }

        //有技能cd倒计时
        public haveSkillCd(): boolean {
            let info = this._model.idx_cds;
            return Object.keys(info).length > 0;
        }

        public getNextTime(): number {
            let nextTime = 0;
            //10_30_7200，10:30开启，提前报名时间7200
            let cfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_open_time");
            let timeInfos: number[][] = cfg && cfg.value;
            let curTime = TimeMgr.time.serverTimeSecond;

            let zeroTime = TimeUtil.getNextDayTime(curTime);//今天0点时间戳
            let curStartTime = 0;//当前活动开启的时间戳
            let nextStartTime = 0;//下一次活动开启的时间戳
            let enrollTime = 0;//提前报名时间

            for (let i of timeInfos) {
                let h = i[0];
                let m = i[1];
                let startTime = h * 3600 + m * 60 + zeroTime;//开启时间
                if (startTime > curTime) {
                    nextStartTime = startTime;
                    enrollTime = i[2];
                    break;
                } else {
                    curStartTime = startTime;
                }
            }
            switch (this._model.state) {
                case KuafuDoufaState.Enroll:
                    //报名阶段，取报名结束时间，下一次活动开启时间-提前报名时间-一分钟
                    nextTime = nextStartTime - enrollTime - KuafuDoufaWaitTime;
                    break;
                case KuafuDoufaState.Wait:
                    //等待阶段，取战场开启时间
                    nextTime = nextStartTime;
                    break;
                case KuafuDoufaState.Open:
                    //开启阶段，取战场结束时间
                    let continueCfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_continue_time");
                    let continueTime = continueCfg && continueCfg.value;//活动持续时间
                    nextTime = curStartTime + continueTime;
                    break;
                case KuafuDoufaState.End:
                    //结束阶段，取下一次报名开启时间

                    //6,7，周六日开启
                    let dayCfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_open_day");
                    let dayInfos: number[] = dayCfg && dayCfg.value;
                    let curDay = RoleUtil.getCurWeekDay();//今天星期几
                    let isTodayOpen = dayInfos.indexOf(curDay) > -1;//是否今天开启
                    let nextDay = 0;//下一次活动星期几开

                    if (isTodayOpen && nextStartTime) {
                        //今日是活动日，且当天还有活动，则取当天下一次活动,下一次活动开启时间-提前报名时间
                        nextTime = nextStartTime - enrollTime;
                    } else {
                        //否则取下一次活动日的第一个活动开启时间
                        for (let d of dayInfos) {
                            if (d > curDay) {
                                nextDay = d;
                                break;
                            }
                        }
                        let leftDay;//几天后开启下一次活动
                        if (nextDay == 0) {
                            nextDay = dayInfos[0];//当前星期没有活动，则取下一周星期几
                            leftDay = 7 - curDay + nextDay;//当前周剩余天数+下一周星期几
                        } else {
                            leftDay = nextDay - curDay;
                        }
                        let nextZeroTime = TimeUtil.getNextDayTime(curTime, false, leftDay);//几天后0点时间戳
                        let h = timeInfos[0][0];
                        let m = timeInfos[0][1];
                        nextTime = h * 3600 + m * 60 + nextZeroTime - enrollTime;//当天最小开启时间,下一次活动开启时间-提前报名时间
                    }
                    break;
            }
            return nextTime;
        }

        public get state(): number {
            return this._model.state;
        }

        public get hasEnroll(): boolean {
            return this._model.hasEnroll;
        }

        public get leftCnt(): number {
            return this._model.leftCnt;
        }

        public get isJoin(): boolean {
            return this._model.isJoin;
        }

        public getRanks(type: number): teammate[] {
            return this._model.rankList[type] || [];
        }

        public getMyRank(type: number): teammate {
            return this._model.myRank[type] || null;
        }

        public getScoreHint(): boolean {
            let cfgList: DoufaJifenConfig[] = getConfigListByName(ConfigName.DoufaJifen);
            for (let cfg of cfgList) {
                let status = this.getScoreStatus(cfg);
                if (status == RewardStatus.Finish) {
                    return true;
                }
            }
            return false;
        }

        public getScoreStatus(cfg: DoufaJifenConfig): number {
            if (this._model.scoreList.indexOf(cfg.index) > -1) {
                return RewardStatus.Draw;
            }
            if (this._model.myScore >= cfg.count) {
                return RewardStatus.Finish;
            }
            return RewardStatus.NotFinish;
        }

        public get myScore(): number {
            return this._model.myScore;
        }

        public get redCampScore(): number {
            return this._model.redCampScore;
        }

        public get redCampNum(): number {
            return this._model.redCampNum;
        }

        public get blueCampScore(): number {
            return this._model.blueCampScore;
        }

        public get blueCampNum(): number {
            return this._model.blueCampNum;
        }

        public getBossHp(index: number): number {
            return this._model.bossHpInfos[index] || 0;
        }

        //寻找当前可攻击的怪物index
        public findCurMonsterIndex(camp: number): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("kuafu_doufa_guaiwu_zuobiao" + camp);
            let infos: number[][] = cfg && cfg.value;
            for (let i = 0; i < infos.length; ++i) {
                let index = infos[i][0];
                let hp = this.getBossHp(index);
                if (hp > 0) {
                    return index;
                }
            }
            return 0;
        }

        public get attackStatus(): number {
            return this._model.attackStatus;
        }

        public get noticeList(): s2c_scene_kill_notice[] {
            return this._model.noticeList;
        }

        public clearNotice(): void {
            this._model.noticeList = [];
        }

        private updateKuafuDoufaHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.KuafuDoufa)) {
                return;
            }
            let hint = TaskUtil.getTaskHint(TaskType.KuafuDoufa);
            let hintType = this._model.taskHint;
            // HintMgr.setHint(hint, hintType);
            let hintType2 = this._model.taskHint2;
            HintMgr.setHint(hint, hintType2);

            //可进入或者报名红点（从KuafuDoufaMdr.updateState复制）
            let state = this.state;
            let hasEnroll = this.hasEnroll;//是否报名
            let showEnroll = state == KuafuDoufaState.Enroll && !hasEnroll;//是否显示报名
            let hint1 = state == KuafuDoufaState.Open || showEnroll;
            HintMgr.setHint(hint1 || hint, hintType);
        }

        public get taskHint(): string [] {
            return this._model.taskHint;
        }

        protected onTaskHint(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.KuafuDoufa) >= 0) {
                this.updateKuafuDoufaHint();
            }
        }
    }
}