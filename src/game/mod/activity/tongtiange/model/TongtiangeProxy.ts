namespace game.mod.activity {

    import c2s_attic_storey_show = msg.c2s_attic_storey_show;
    import GameNT = base.GameNT;
    import s2c_attic_storey_show = msg.s2c_attic_storey_show;
    import c2s_attic_rank_show = msg.c2s_attic_rank_show;
    import s2c_attic_rank_show = msg.s2c_attic_rank_show;
    import c2s_attic_build = msg.c2s_attic_build;
    import s2c_attic_build = msg.s2c_attic_build;
    import s2c_attic_role_info = msg.s2c_attic_role_info;
    import c2s_attic_guild_challenge_show = msg.c2s_attic_guild_challenge_show;
    import s2c_attic_guild_challenge_show = msg.s2c_attic_guild_challenge_show;
    import c2s_attic_exchange = msg.c2s_attic_exchange;
    import s2c_attic_exchange = msg.s2c_attic_exchange;
    import s2c_update_attic_login_reward = msg.s2c_update_attic_login_reward;
    import c2s_attic_get_reward = msg.c2s_attic_get_reward;
    import c2s_attic_item_buy_gift = msg.c2s_attic_item_buy_gift;
    import s2c_attic_item_buy_gift = msg.s2c_attic_item_buy_gift;
    import s2c_update_attic_challenge_data = msg.s2c_update_attic_challenge_data;
    import oper_act_item = msg.oper_act_item;
    import TimeMgr = base.TimeMgr;
    import teammate = msg.teammate;
    import AtticChallengeConfig = game.config.AtticChallengeConfig;
    import AtticGiftConfig = game.config.AtticGiftConfig;
    import c2s_attic_done_rank_show = msg.c2s_attic_done_rank_show;
    import s2c_attic_done_rank_show = msg.s2c_attic_done_rank_show;
    import ShopConfig = game.config.ShopConfig;
    import DirectShopConfig = game.config.DirectShopConfig;
    import facade = base.facade;
    import AtticExchangeConfig = game.config.AtticExchangeConfig;
    import LanDef = game.localization.LanDef;
    import VipConfig = game.config.VipConfig;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;

    /**
     * @description 通天阁系统
     */
    export class TongtiangeProxy extends ProxyBase {
        private _model: TongtiangeModel;
        //礼包登录红点
        public giftLoginHint = true;
        //请求的最后一名
        public minRankNo: number;

        public get model(): TongtiangeModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new TongtiangeModel();
            this.onProto(s2c_attic_storey_show, this.s2c_attic_storey_show, this);
            this.onProto(s2c_attic_rank_show, this.s2c_attic_rank_show, this);
            this.onProto(s2c_attic_build, this.s2c_attic_build, this);
            this.onProto(s2c_attic_role_info, this.s2c_attic_role_info, this);
            this.onProto(s2c_update_attic_challenge_data, this.s2c_update_attic_challenge_data, this);
            this.onProto(s2c_attic_guild_challenge_show, this.s2c_attic_guild_challenge_show, this);
            this.onProto(s2c_attic_exchange, this.s2c_attic_exchange, this);
            this.onProto(s2c_update_attic_login_reward, this.s2c_update_attic_login_reward, this);
            this.onProto(s2c_attic_item_buy_gift, this.s2c_attic_item_buy_gift, this);
            this.onProto(s2c_attic_done_rank_show, this.s2c_attic_done_rank_show, this);
        }

        /**
         * 请求摘星楼界面
         * @param type 1.首次打开界面2.进行滑动
         * @param start 起始层
         * @param end 结束层
         */
        public c2s_attic_storey_show(type: number, start?: number, end?: number): void {
            let msg = new c2s_attic_storey_show();
            msg.act_id = this.getActId();
            msg.type = type;
            if (start != null) {
                msg.start_num = start;
            }
            if (end != null) {
                msg.end_num = end;
            }
            this.sendProto(msg);
        }

        //返回摘星楼界面
        private s2c_attic_storey_show(n: GameNT): void {
            let msg = n.body as s2c_attic_storey_show;
            if (msg.first_data != null) {
                this._model.first_data = msg.first_data;
            }
            if (msg.role_list != null) {
                for (let item of msg.role_list) {
                    this._model.role_list[item.rank_num] = item;
                    //保留请求的最后一名
                    if (!this.minRankNo) {
                        this.minRankNo = item.rank_num;
                    }
                    this.minRankNo = Math.min(this.minRankNo, item.rank_num);
                }
            }
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_STOREY_INFO);
        }

        /**
         * 请求通天阁排行界面
         * @param type 1.个人2.宗门
         * @param start 默认请求1
         * @param end 默认请求3
         */
        public c2s_attic_rank_show(type: number, start = 1, end = 3): void {
            let msg = new c2s_attic_rank_show();
            msg.act_id = this.getActId(true);
            msg.type = type;
            msg.start_num = start;
            msg.end_num = end;
            this.sendProto(msg);
        }

        //返回通天阁排行界面
        private s2c_attic_rank_show(n: GameNT): void {
            let msg = n.body as s2c_attic_rank_show;
            this._model.rank_no = msg.rank_no != null ? msg.rank_no : 0;
            this._model.rank_value = msg.my_value != null ? msg.my_value : 0;

            if (msg.role_list != null) {
                for (let item of msg.role_list) {
                    this._model.role_rank_list[item.rank_num] = item;
                }
            }

            if (msg.guild_list != null) {
                for (let item of msg.guild_list) {
                    this._model.guild_rank_list[item.rank_num] = item;
                }
            }
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_RANK_INFO);
        }

        //建造 1.单词2.十次3.勾选
        public c2s_attic_build(type: number): void {
            let msg = new c2s_attic_build();
            msg.act_id = this.getActId();
            msg.type = type;
            this.sendProto(msg);
        }

        //建造返回
        private s2c_attic_build(n: GameNT): void {
            let msg = n.body as s2c_attic_build;
            if (msg.num != null) {
                this._model.my_build_num = msg.num;
            }
            if (msg.role_list != null) {
                for (let item of msg.role_list) {
                    this._model.role_list[item.rank_num] = item;
                }
            }
            this.updateHint1();
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_BUILD_SUCCESS);
        }

        //登录下发或者隔天下发
        private s2c_attic_role_info(n: GameNT): void {
            let msg = n.body as s2c_attic_role_info;
            this._model.my_build_num = msg.num != null ? msg.num : 0;
            this._model.role_challenge_list = {};
            if (msg.role_challenge_list != null) {
                for (let item of msg.role_challenge_list) {
                    this._model.role_challenge_list[item.index] = item;
                }
            }
            this._model.guild_challenge_list = {};
            if (msg.guild_challenge_list != null) {
                for (let item of msg.guild_challenge_list) {
                    this._model.guild_challenge_list[item.index] = item;
                }
            }
            this._model.stage_list = {};
            if (msg.stage_list != null) {
                for (let item of msg.stage_list) {
                    this._model.stage_list[item.stage] = item;
                }
            }
            this._model.exchange_list = {};
            if (msg.exchange_list != null) {
                for (let item of msg.exchange_list) {
                    this._model.exchange_list[item.index] = item;
                }
            }
            this._model.login_reward_list = {};
            if (msg.login_reward_list != null) {
                for (let item of msg.login_reward_list) {
                    this._model.login_reward_list[item.index] = item;
                }
            }
            this._model.gift_list = {};
            if (msg.gift_list != null) {
                for (let item of msg.gift_list) {
                    this._model.gift_list[item.index] = item;
                }
            }
            this.checkOpen();
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_INFO);
        }

        //更新数据(只更新数据)
        private s2c_update_attic_challenge_data(n: GameNT): void {
            let msg = n.body as s2c_update_attic_challenge_data;
            let types: number[] = [];
            if (msg.challenge_list != null) {
                for (let item of msg.challenge_list) {
                    let type = item.type;//区分类型更新
                    if (type == 1) {
                        this._model.role_challenge_list[item.index] = item;
                        if (types.indexOf(1) < 0) {
                            types.push(1);
                        }
                    } else {
                        this._model.guild_challenge_list[item.index] = item;
                        if (types.indexOf(2) < 0) {
                            types.push(2);
                        }
                    }
                }
            }
            if (msg.stage_list != null) {
                for (let item of msg.stage_list) {
                    this._model.stage_list[item.stage] = item;
                }
                if (types.indexOf(1) < 0) {
                    types.push(1);
                }
            }
            if (types.indexOf(1) > -1) {
                this.updateHint2();
            }
            if (types.indexOf(2) > -1) {
                this.updateHint3();
            }
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_CHALLENGE_INFO);
        }

        //请求宗门挑战界面
        public c2s_attic_guild_challenge_show(): void {
            let msg = new c2s_attic_guild_challenge_show();
            this.sendProto(msg);
        }

        //返回宗门挑战界面数据
        private s2c_attic_guild_challenge_show(n: GameNT): void {
            let msg = n.body as s2c_attic_guild_challenge_show;
            this._model.guild_build_num = msg.num != null ? msg.num : 0;
            if (msg.challenge_list != null) {
                for (let item of msg.challenge_list) {
                    this._model.guild_challenge_list[item.index] = item;
                }
            }
            this.updateHint3();
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_GUILD_CHALLENGE_INFO);
        }

        //兑换道具, place数组索引
        public c2s_attic_exchange(index: number, place: number): void {
            let msg = new c2s_attic_exchange();
            msg.index = index;
            msg.place = place;
            this.sendProto(msg);
        }

        //兑换道具返回
        private s2c_attic_exchange(n: GameNT): void {
            let msg = n.body as s2c_attic_exchange;
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.exchange_list[item.index] = item;
                }
            }
            this.updateHint5();
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_EXCHANGE_INFO);
        }

        //更新登录奖励数据
        private s2c_update_attic_login_reward(n: GameNT): void {
            let msg = n.body as s2c_update_attic_login_reward;
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.login_reward_list[item.index] = item;
                }
            }
            this.updateHint6();
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_LOGIN_INFO);
        }

        //通天阁领取奖励(通用) type:1.挑战领取2.挑战目标领取3.宗门挑战领取4.登录领取
        public c2s_attic_get_reward(type: number, index: number): void {
            let msg = new c2s_attic_get_reward();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        //礼包:购买道具
        public c2s_attic_item_buy_gift(index: number): void {
            let msg = new c2s_attic_item_buy_gift();
            msg.index = index;
            this.sendProto(msg);
        }

        //返回:礼包:购买道具数据
        private s2c_attic_item_buy_gift(n: GameNT): void {
            let msg = n.body as s2c_attic_item_buy_gift;
            if (msg.data != null) {
                this._model.gift_list[msg.data.index] = msg.data;
            }
            this.updateHint4();
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_GIFT_INFO);
        }

        /**
         * 请求通天阁上一期排行界面
         * @param type 1.个人2.宗门
         * @param start 起始层
         * @param end 结束层
         */
        public c2s_attic_done_rank_show(type: number, start = 1, end = 10): void {
            let msg = new c2s_attic_done_rank_show();
            msg.act_id = this.getActId(true);
            msg.type = type;
            msg.start_num = start;
            msg.end_num = end;
            this.sendProto(msg);
        }

        // 返回请求通天阁上一期排行界面
        private s2c_attic_done_rank_show(n: GameNT): void {
            let msg = n.body as s2c_attic_done_rank_show;
            if (msg.rank_no != null) {
                this._model.last_rank_no = msg.rank_no;
            }
            if (msg.my_value != null) {
                this._model.last_build_cnt = msg.my_value;
            }
            if (msg.role_list != null) {
                for (let item of msg.role_list) {
                    this._model.last_role_list[item.rank_num] = item;
                }
            }
            if (msg.guild_list != null) {
                for (let item of msg.guild_list) {
                    this._model.last_guild_list[item.rank_num] = item;
                }
            }
            this.sendNt(ActivityEvent.ON_UPDATE_TONGTIANGE_LAST_RANK_INFO);
        }

        /**================================= 协议end =================================*/

        protected onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Tongtiange) > -1) {
                this.checkOpen();
            }
        }

        protected onOpenFuncInit(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Tongtiange) > -1) {
                this.checkOpen();
            }
        }

        protected onActivityInit(n: GameNT) {
            this.checkOpen();
        }

        protected onActivityUpdateByType(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(ActivityType.TongtiangeRankReward) > -1
                || types.indexOf(ActivityType.TongtiangeReward) > -1) {
                this.checkOpen();
            }
        }

        public checkOpen(): void {
            let isOpen = this.isOpen();
            DEBUG && console.log(`tongtiange attic`, isOpen);
            BtnIconMgr.insLeft().updateOpen(BtnIconId.Tongtiange, isOpen);
            if (isOpen) {
                this.updateHint();
            }
        }

        //isRank=true，为排行榜奖励
        public getActId(isRank = false): number {
            let actData = this.getActData(isRank);
            return actData ? actData.act_id : 0;
        }

        public getActData(isRank = false): oper_act_item {
            let actType = isRank ? ActivityType.TongtiangeRankReward : ActivityType.TongtiangeReward;
            let proxy: ActivityProxy = getProxy(ModName.Activity, ProxyType.Activity);
            return proxy.getOperActByType(actType);
        }

        //活动开启否
        public isOpen(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Tongtiange)) {
                return false;
            }
            let actData: oper_act_item = this.getActData();
            if (!actData) {
                return false;
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            return actData.c_begin_time <= curTime && curTime <= actData.c_end_time;
        }

        //活动结束时间
        public getEndTime(): number {
            let actData: oper_act_item = this.getActData();
            return actData && actData.c_end_time || 0;
        }

        /**活动最后一天提示*/
        public checkActTips(type: NotTipsType): void {
            let endTime = this.getEndTime();
            ViewMgr.getIns().showActTips(endTime, type);
        }

        private _buildCost: { [type: number]: number[] } = {};

        //建造消耗
        public getBuildCost(isTen = false): number[] {
            let cnt = isTen ? 10 : 1;
            if (this._buildCost[cnt]) {
                return this._buildCost[cnt];
            }
            let paramCfg = GameConfig.getParamConfigById('attic_cost');
            let value = paramCfg.value as number[];
            let cost: number[] = [value[0], value[1] * cnt];
            this._buildCost[cnt] = cost;
            return cost;
        }

        //能否建造
        public canBuild(isTen = false, isTips = false): boolean {
            let cost = this.getBuildCost(isTen);
            if (!cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //登陆奖励的状态
        public getLoginStatus(index: number): RewardStatus {
            let info = this._model.login_reward_list[index];
            if (info) {
                return info.status;
            }
            return RewardStatus.NotFinish;
        }

        //礼包限购次数
        public getGiftLimitCnt(index: number): number {
            let cfg: AtticGiftConfig = getConfigByNameId(ConfigName.TongtiangeGift, index);
            if (!cfg) {
                return 0;
            }
            if (cfg.type == 1) {
                let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.shop_index);
                return shopCfg && shopCfg.lmt_cnt || 0;
            }
            let cfgObj = getConfigByNameId(ConfigName.DirectShop, DirectShopType.Tongtiange);
            if (cfgObj && cfgObj[cfg.shop_index]) {
                return (cfgObj[cfg.shop_index] as DirectShopConfig).param1;
            }
            return 0;
        }

        //礼包剩余购买次数
        public getGiftLeftCnt(index: number): number {
            let boughtCnt = this.getGiftBoughtCnt(index);
            let limitCnt = this.getGiftLimitCnt(index);
            return Math.max(0, limitCnt - boughtCnt);
        }

        //礼包的已购买次数
        public getGiftBoughtCnt(index: number): number {
            let info = this._model.gift_list[index];
            return info ? info.count : 0;
        }

        private _previewRewardMap: { [type: number]: number[][] } = {};

        //奖励预览 1金装2普通
        public getPreviewRewards(type: number): number[][] {
            if (this._previewRewardMap[type]) {
                return this._previewRewardMap[type];
            }
            let actData = this.getActData();
            if (!actData || !actData.reward_list) {
                return [];
            }
            for (let item of actData.reward_list) {
                let itemType = item.cond_1[0];
                if (!this._previewRewardMap[itemType]) {
                    this._previewRewardMap[itemType] = [];
                }
                for (let reward of item.rewards) {
                    this._previewRewardMap[itemType].push([reward.idx.toNumber(), reward.cnt]);
                }
            }
            return this._previewRewardMap[type];
        }

        //第一名玩家信息
        public getTopPlayerInfo(): teammate {
            return this._model.first_data;
        }

        //建造次数
        public getBuildCnt(isGuild = false): number {
            return isGuild ? this._model.guild_build_num : this._model.my_build_num;
        }

        //排行榜排名（个人，宗门）
        public getRankNo(): number {
            return this._model.rank_no;
        }

        //上榜所需次数
        public getRankCnt(isGuild = false): number {
            let actData = this.getActData(true);
            if (!actData || !actData.param) {
                return 0;
            }
            return actData.param[isGuild ? 1 : 0];
        }

        public getChallengeCfgByType(type: number): { [index: number]: AtticChallengeConfig } {
            return getConfigByNameId(ConfigName.TongtiangeChallenge, type);
        }

        private _maxPersonalType: number = 0;

        //个人挑战的最大轮次
        private getMaxPersonalType(): number {
            if (this._maxPersonalType) {
                return this._maxPersonalType;
            }
            let cfgObj = this.getChallengeCfgByType(1);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                if (cfg) {
                    this._maxPersonalType = Math.max(this._maxPersonalType, cfg.stage);
                }
            }
            return this._maxPersonalType;
        }

        private _personChallengeCfg: { [stage: number]: AtticChallengeConfig[] } = {};

        //个人挑战的阶段配置
        public getPersonChallengeCfg(stage: number): AtticChallengeConfig[] {
            if (this._personChallengeCfg[stage]) {
                return this._personChallengeCfg[stage];
            }
            let cfgObj = this.getChallengeCfgByType(1);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                if (!this._personChallengeCfg[cfg.stage]) {
                    this._personChallengeCfg[cfg.stage] = [];
                }
                this._personChallengeCfg[cfg.stage].push(cfg);
            }
            return this._personChallengeCfg[stage];
        }

        private _totalStage = 0;

        //获取挑战的全部轮次
        public getTotalStage(): number {
            if (this._totalStage) {
                return this._totalStage;
            }
            let stageAry: number[] = [];
            let cfgObj = this.getChallengeCfgByType(1);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                if (cfg && stageAry.indexOf(cfg.stage) < 0) {
                    stageAry.push(cfg.stage);
                }
            }
            this._totalStage = stageAry.length;
            return stageAry.length;
        }

        //获取完成的挑战轮次
        public getDoneStage(): number {
            let stageMap = this._model.stage_list;
            let doneCnt = 0;
            for (let key in stageMap) {
                let item = stageMap[key];
                if (item && item.is_finish) {
                    doneCnt++;
                }
            }
            return doneCnt;
        }

        //某一阶段的全部完成
        private isStageDone(stage: number): boolean {
            let cfgList = this.getPersonChallengeCfg(stage);
            for (let cfg of cfgList) {
                let info = this._model.role_challenge_list[cfg.index];
                if (!info || (info && info.status != 2)) {
                    return false;
                }
            }
            return true;
        }

        //当前轮次
        public getCurStage(): number {
            //某一阶段的任务全部完成就跳到下一阶段，不需要阶段奖励领取
            let maxStage = this.getMaxPersonalType();
            for (let i = 1; i <= maxStage; i++) {
                let stageInfo = this._model.stage_list[i];
                if (!stageInfo) {
                    return i;
                }
                if (!this.isStageDone(i)) {
                    return i;
                }
            }
            let doneStage = this.getDoneStage();
            let totalStage = this.getTotalStage();
            if (doneStage >= totalStage) {
                return totalStage;
            }
            return 1;
        }

        //前面轮次的最大次数总和
        public getPreStagesCnt(): number {
            let curStage = this.getCurStage();//当前轮次
            let cnt = 0;
            for (let i = 1; i < curStage; i++) {
                let cfgList = this.getPersonChallengeCfg(i);
                if (!cfgList || !cfgList.length) {
                    continue;
                }
                let lastCfg = cfgList[cfgList.length - 1];
                if (lastCfg) {
                    cnt += lastCfg.cnt;
                }
            }
            return cnt;
        }

        //个人挑战状态
        public getPersonChallengeStatus(index: number): RewardStatus {
            let info = this._model.role_challenge_list[index];
            if (info) {
                return info.status;
            }
            return RewardStatus.NotFinish;
        }

        //宗门挑战状态
        public getGuildChallengeStatus(index: number): RewardStatus {
            let info = this._model.guild_challenge_list[index];
            if (info) {
                return info.status;
            }
            return RewardStatus.NotFinish;
        }

        //轮次奖励红点
        public getStageHint(stage: number): boolean {
            let info = this._model.stage_list[stage];
            if (info) {
                return info.status == 1;
            }
            return false;
        }

        //兑换限购次数，写死1了
        public getExchangeMaxCnt(): number {
            return 1;
        }

        //兑换获取购买次数
        public getExchangeBoughtCnt(index: number, pos: number): number {
            let info = this._model.exchange_list[index];
            if (info && info.list && info.list.indexOf(pos) > -1) {
                return 1;
            }
            return 0;
        }

        //兑换状态
        public getExchangeStatus(index: number, pos: number): number {
            let info = this._model.exchange_list[index];
            if (!info || !info.list) {
                return RewardStatus.NotFinish;
            }
            return info.list.indexOf(pos) > -1 ? RewardStatus.Draw : RewardStatus.NotFinish;
        }

        //能否兑换
        public canExchange(curIndex: number, isTips = false): boolean {
            let info = this._model.exchange_list[curIndex - 1];//上一层的数据
            if (!info || !info.list || !info.list.length) {
                // if (isTips) {
                //     PromptBox.getIns().show(getLanById(LanDef.tongtiange_tips14));
                // }
                return false;
            }
            return true;
        }

        //某层是否激活了
        public isLayerActed(layer: number, isTips = false): boolean {
            if (layer == 1) {
                return true;//第一层默认解锁
            }
            let info = this._model.exchange_list[layer - 1];
            //上一层的任一个解锁就算激活
            let isAct = info && info.list && info.list.length > 0;
            if (!isAct) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.tongtiange_tips14));
                }
                return false;
            }
            return true;
        }

        private updateHint(): void {
            if (!this.isOpen()) {
                return;
            }
            this.updateHint1();
            this.updateHint2();
            this.updateHint3();
            this.updateHint4();
            this.updateHint5();
            this.updateHint6();
        }

        private updateHint1(): void {
            let cost = this.getBuildCost();
            let hint = false;
            if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                hint = true;
            }
            HintMgr.setHint(hint, this._model.hintPath[1]);
        }

        //个人挑战
        private updateHint2(): void {
            let map = this._model.role_challenge_list;
            let hint = false;
            for (let key in map) {
                let item = map[key];
                if (item && item.status == 1) {
                    hint = true;
                    break;
                }
            }
            if (!hint) {
                let stageMap = this._model.stage_list;
                for (let key in stageMap) {
                    let item = stageMap[key];
                    if (item && item.status == 1) {
                        hint = true;
                        break;
                    }
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[2]);
        }

        //仙宗挑战
        private updateHint3(): void {
            let map = this._model.guild_challenge_list;
            let hint = false;
            for (let key in map) {
                let item = map[key];
                if (item && item.status == 1) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[3]);
        }

        //礼包能否购买
        public canBuyGift(index: number): boolean {
            let cfg: AtticGiftConfig = getConfigByNameId(ConfigName.TongtiangeGift, index);
            if (!cfg) {
                return false;
            }
            let leftCnt = this.getGiftLeftCnt(cfg.index);
            //rmb购买
            if (cfg.type == 2) {
                return leftCnt > 0;
            }
            //道具购买
            if (leftCnt < 1) {
                return false;
            }
            let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.shop_index);
            if (!shopCfg) {
                return false;
            }
            let price = Math.floor(shopCfg.price * (shopCfg.discount / 10000));
            return BagUtil.checkPropCnt(shopCfg.coin_type, price);
        }

        //礼包全部售罄
        public isSoldOut(): boolean {
            let cfgList: AtticGiftConfig[] = getConfigListByName(ConfigName.TongtiangeGift);
            for (let cfg of cfgList) {
                let leftCnt = this.getGiftLeftCnt(cfg.index);
                if (leftCnt > 0) {
                    return false;
                }
            }
            this.giftLoginHint = false;//当日已售罄则设为false
            return true;
        }

        //礼包红点
        public updateHint4(): void {
            let cfgList: AtticGiftConfig[] = getConfigListByName(ConfigName.TongtiangeGift);
            let hint = false;
            for (let cfg of cfgList) {
                if (cfg.type == 1 && this.canBuyGift(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            if (!hint && !this.isSoldOut()) {
                hint = this.giftLoginHint;
            }
            HintMgr.setHint(hint, this._model.hintPath[4]);
        }

        //兑换每层红点
        public getExchangeLayerHint(layer: number): boolean {
            if (!this.isLayerActed(layer)) {
                return false;
            }
            let cfg: AtticExchangeConfig = getConfigByNameId(ConfigName.TongtiangeExchange, layer);
            if (!cfg) {
                return false;
            }
            let size = cfg.give_items.length;
            let info = this._model.exchange_list[layer];
            let exchangeList = info && info.list ? info.list : [];
            //已兑换全部
            if (exchangeList && exchangeList.length == size) {
                return false;
            }
            for (let i = 1; i <= size; i++) {
                let isExchange = exchangeList.indexOf(i) > -1;//已兑换
                if (isExchange) {
                    continue;
                }
                let cost = cfg.cost_items[i - 1];
                if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                    return true;
                }
            }

            return false;
        }

        //兑换红点
        private updateHint5(): void {
            let cfgList: AtticExchangeConfig[] = getConfigListByName(ConfigName.TongtiangeExchange);
            let hint = false;
            for (let cfg of cfgList) {
                if (this.getExchangeLayerHint(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[5]);
        }

        //登录奖励红点
        private updateHint6(): void {
            let map = this._model.login_reward_list;
            let hint = false;
            for (let key in map) {
                let item = map[key];
                if (item && item.status == 1) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[6]);
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            if (!this.isOpen()) {
                return;
            }
            let indexs = n.body as number[];
            let cost = this.getBuildCost();
            if (indexs.indexOf(cost[0]) > -1) {
                this.updateHint1();
            }
        }

        protected onRoleUpdate(n: GameNT) {
            if (!this.isOpen()) {
                return;
            }
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.Tianxingzhu) > -1) {
                this.updateHint5();
            }
            if (keys.indexOf(RolePropertyKey.diamond) > -1) {
                this.updateHint4();
            }
        }

        private _autoBuildVip: number;

        //开始自动建造的vip等级
        public getAutoBuildVip(): number {
            if (this._autoBuildVip) {
                return this._autoBuildVip;
            }
            let vipCfgList: VipConfig[] = getConfigListByName(ConfigName.Vip);
            for (let cfg of vipCfgList) {
                if (!cfg || !cfg.privilege_id) {
                    continue;
                }
                let privilegeCfg: NewPrivilegeConfig = getConfigByNameId(ConfigName.NewPrivilege, cfg.privilege_id);
                if (privilegeCfg && privilegeCfg.pick_star) {
                    this._autoBuildVip = cfg.level;
                    break;
                }
            }
            return this._autoBuildVip;
        }
    }
}