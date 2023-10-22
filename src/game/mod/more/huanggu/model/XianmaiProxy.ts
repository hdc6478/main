namespace game.mod.more {

    import c2s_xianmai_stage_show = msg.c2s_xianmai_stage_show;
    import GameNT = base.GameNT;
    import s2c_xianmai_stage_show = msg.s2c_xianmai_stage_show;
    import c2s_xianmai_buy_time = msg.c2s_xianmai_buy_time;
    import s2c_xianmai_buy_time = msg.s2c_xianmai_buy_time;
    import c2s_xianmai_my_show = msg.c2s_xianmai_my_show;
    import s2c_xianmai_my_show = msg.s2c_xianmai_my_show;
    import s2c_xianmai_search = msg.s2c_xianmai_search;
    import s2c_xianmai_reward_show = msg.s2c_xianmai_reward_show;
    import s2c_xianmai_list_show = msg.s2c_xianmai_list_show;
    import s2c_xianmai_zhanbao = msg.s2c_xianmai_zhanbao;
    import s2c_xianmai_rank_show = msg.s2c_xianmai_rank_show;
    import c2s_xianmai_pvp_oper = msg.c2s_xianmai_pvp_oper;
    import c2s_xianmai_get_reward = msg.c2s_xianmai_get_reward;
    import c2s_xianmai_list_show = msg.c2s_xianmai_list_show;
    import c2s_xianmai_guild_invite = msg.c2s_xianmai_guild_invite;
    import c2s_xianmai_zhanbao = msg.c2s_xianmai_zhanbao;
    import c2s_xianmai_rank_show = msg.c2s_xianmai_rank_show;
    import XianmaiStageConfig = game.config.XianmaiStageConfig;
    import TimeMgr = base.TimeMgr;
    import xianmai_zhanbao_data = msg.xianmai_zhanbao_data;
    import xianmai_stage_data = msg.xianmai_stage_data;
    import xianmai_role_data = msg.xianmai_role_data;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import s2c_city_moment_fight_update = msg.s2c_city_moment_fight_update;
    import facade = base.facade;
    import s2c_update_xianmai_data = msg.s2c_update_xianmai_data;
    import c2s_xianmai_search = msg.c2s_xianmai_search;
    import prop_tips_data = msg.prop_tips_data;

    /**
     * @description 仙脉争夺系统
     */
    export class XianmaiProxy extends ProxyBase implements IXianmaiProxy {
        private _model: XianmaiModel;
        public reqStage: number;//当前请求的层数

        onStartReconnect() {
            super.onStartReconnect();
            this.reqStage = null;
        }

        initialize(): void {
            super.initialize();
            this._model = new XianmaiModel();

            this.onProto(s2c_xianmai_stage_show, this.s2c_xianmai_stage_show, this);
            this.onProto(s2c_update_xianmai_data, this.s2c_update_xianmai_data, this);
            this.onProto(s2c_xianmai_buy_time, this.s2c_xianmai_buy_time, this);
            this.onProto(s2c_xianmai_my_show, this.s2c_xianmai_my_show, this);
            this.onProto(s2c_xianmai_search, this.s2c_xianmai_search, this);
            this.onProto(s2c_xianmai_reward_show, this.s2c_xianmai_reward_show, this);
            this.onProto(s2c_xianmai_list_show, this.s2c_xianmai_list_show, this);
            this.onProto(s2c_xianmai_zhanbao, this.s2c_xianmai_zhanbao, this);
            this.onProto(s2c_xianmai_rank_show, this.s2c_xianmai_rank_show, this);
            this.onProto(s2c_city_moment_fight_update, this.s2c_city_moment_fight_update, this);
        }

        //仙脉主界面展示
        public c2s_xianmai_stage_show(stage: number): void {
            let msg = new c2s_xianmai_stage_show();
            msg.stage = stage;
            this.reqStage = stage;
            this.sendProto(msg);
        }

        //仙脉主界面展示 返回
        private s2c_xianmai_stage_show(n: GameNT): void {
            let msg = n.body as s2c_xianmai_stage_show;
            if (msg.mvp_role != null) {
                this._model.mvp_role = msg.mvp_role;
            } else {
                this._model.mvp_role = null;
            }
            if (msg.role_list != null) {
                this._model.role_list = {};
                this._model.stage_index_map[msg.role_list[0].stage] = {};

                for (let item of msg.role_list) {
                    this._model.role_list[item.index] = item;
                    this._model.stage_index_map[item.stage][item.index] = item;
                }
            } else {
                this._model.role_list = {};
                this._model.stage_index_map = {};
            }
            if (msg.attack_time != null) {
                this._model.attack_time = msg.attack_time;
            } else {
                this._model.attack_time = 0;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_STAGE_SHOW);
        }

        //更新仙脉数据改变: 只更新改变的
        private s2c_update_xianmai_data(n: GameNT): void {
            let msg = n.body as s2c_update_xianmai_data;

            let haveCurStage = false;
            let isMine = false;

            if (msg.list != null) {
                let myData = this._model.my_data;//我的仙脉数据
                for (let item of msg.list) {
                    if (this.reqStage && !haveCurStage && item.stage == this.reqStage) {
                        haveCurStage = true;
                    }

                    if (myData && myData.stage == item.stage && myData.index == item.index) {
                        //我的占领被清空
                        isMine = true;
                        let roleData = item.data;
                        if (!roleData) {
                            this._model.my_data = null;//我的仙脉变空
                            this._model.penglai_score = 0;
                            this._model.lingshi = 0;
                        }

                    } else if (item && item.data && item.data.role_id.eq(RoleVo.ins.role_id)) {
                        //我占领某个位置
                        isMine = true;
                        this._model.my_data = item;
                        this._model.penglai_score = 0;
                        this._model.lingshi = 0;
                    }
                    this.updateRoleList(item);
                }
            }

            //是更新我的仙脉数据
            if (isMine) {
                this.updateHint();
                this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_MY_SHOW);
            }

            //有当前请求层的更新，再抛出
            if (haveCurStage) {
                this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_STAGE_SHOW);
            }

            this.checkAutoChallengeXianmai();
        }

        private updateRoleList(roleData: xianmai_role_data): void {
            if (!roleData) {
                return;
            }

            if (!this._model.stage_index_map[roleData.stage]) {
                this._model.stage_index_map[roleData.stage] = {};
            }
            if (!roleData.data) {
                this._model.stage_index_map[roleData.stage][roleData.index] = null;
                delete this._model.stage_index_map[roleData.stage][roleData.index];
            } else {
                this._model.stage_index_map[roleData.stage][roleData.index] = roleData;
            }

            if (!this.reqStage || this.reqStage != roleData.stage) {
                return; //不属于当前请求层
            }
            if (!roleData.data) {
                //移除
                this._model.role_list[roleData.index] = null;
                delete this._model.role_list[roleData.index];
            } else {
                this._model.role_list[roleData.index] = roleData;
            }
        }

        //购买冷却时间
        public c2s_xianmai_buy_time(): void {
            let msg = new c2s_xianmai_buy_time();
            this.sendProto(msg);
        }

        //购买冷却时间 返回
        private s2c_xianmai_buy_time(n: GameNT): void {
            let msg = n.body as s2c_xianmai_buy_time;
            if (msg.attack_time != null) {
                this._model.attack_time = msg.attack_time;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_STAGE_SHOW);
        }

        //我的仙脉
        public c2s_xianmai_my_show(): void {
            let msg = new c2s_xianmai_my_show();
            this.sendProto(msg);
        }

        //我的仙脉 返回
        private s2c_xianmai_my_show(n: GameNT): void {
            let msg = n.body as s2c_xianmai_my_show;
            if (msg.my_data != null) {
                this._model.my_data = msg.my_data;
            } else {
                this._model.my_data = null;
            }
            this._model.penglai_score = msg.penglai_score != null ? msg.penglai_score : 0;
            this._model.lingshi = msg.lingshi != null ? msg.lingshi : 0;
            this.updateHint();
            this.checkAutoChallengeXianmai();
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_MY_SHOW);
            this.setTimeInterval();
        }

        //一键寻脉
        public c2s_xianmai_search(): void {
            this.sendProto(new c2s_xianmai_search());
        }

        //一键寻脉 返回
        private s2c_xianmai_search(n: GameNT): void {
            let msg = n.body as s2c_xianmai_search;
            this._model.search_index = null;
            this._model.search_stage = null;
            if (msg.stage != null) {
                this._model.search_stage = msg.stage;
            }
            if (msg.index != null) {
                this._model.search_index = msg.index;
            }
            this.checkAutoChallengeXianmai(true);
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_SEARCH);
        }

        //仙脉战斗操作 type 1.撤离2.驱逐3.攻占4.占领
        public c2s_xianmai_pvp_oper(type: XianmaiOperType, stage: number, index: number): void {
            let msg = new c2s_xianmai_pvp_oper();
            msg.type = type;
            msg.stage = stage;
            msg.index = index;

            this._stage = stage;
            this._index = index;
            this.sendProto(msg);
        }

        //奖励框
        private s2c_xianmai_reward_show(n: GameNT): void {
            let msg = n.body as s2c_xianmai_reward_show;
            if (msg.items != null) {
                this._model.reward_items = msg.items;
            } else {
                this._model.reward_items = [];
            }
            // //我的占领结束了，清空我的数据
            // this._model.my_data = null;
            // this._model.penglai_score = 0;
            // this._model.lingshi = 0;
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_REWARD_SHOW);
        }

        //获取结算奖励
        public c2s_xianmai_get_reward(): void {
            let msg = new c2s_xianmai_get_reward;
            this.sendProto(msg);
        }

        //点击 仙脉列表
        public c2s_xianmai_list_show(): void {
            let msg = new c2s_xianmai_list_show();
            this.sendProto(msg);
        }

        //点击 仙脉列表 返回
        private s2c_xianmai_list_show(n: GameNT): void {
            let msg = n.body as s2c_xianmai_list_show;
            if (msg.list != null) {
                this._model.list = msg.list;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_LIST_SHOW);
        }

        //宗门邀请
        public c2s_xianmai_guild_invite(): void {
            let msg = new c2s_xianmai_guild_invite();
            this.sendProto(msg);
        }

        //战报显示 type 1.个人2.宗门
        public c2s_xianmai_zhanbao(type: number): void {
            let msg = new c2s_xianmai_zhanbao();
            msg.type = type;
            this.sendProto(msg);
        }

        //战报显示 返回
        private s2c_xianmai_zhanbao(n: GameNT): void {
            let msg = n.body as s2c_xianmai_zhanbao;
            if (msg.type != null) {
                this._model.logs[msg.type] = msg.logs != null ? msg.logs : [];
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_ZHANBAO);
        }

        //请求排行榜 type:1.个人2.宗门
        public c2s_xianmai_rank_show(type: number, start: number, end: number): void {
            let msg = new c2s_xianmai_rank_show();
            msg.type = type;
            msg.start_pos = start;
            msg.end_pos = end;
            this.sendProto(msg);
        }

        //请求排行榜 返回
        private s2c_xianmai_rank_show(n: GameNT): void {
            let msg = n.body as s2c_xianmai_rank_show;
            if (msg.guild_ranks != null) {
                this._model.guild_ranks = msg.guild_ranks;
            }
            if (msg.person_ranks != null) {
                this._model.person_ranks = msg.person_ranks;
            }
            if (msg.my_guild_rank != null) {
                this._model.my_guild_rank = msg.my_guild_rank;
            }
            if (msg.my_rank != null) {
                this._model.my_rank = msg.my_rank;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANMAI_RANK_SHOW);
        }

        //动画PK直接计算结果
        private s2c_city_moment_fight_update(n: GameNT): void {
            let msg = n.body as s2c_city_moment_fight_update;
            if (msg != null) {
                this._model.fight_data = msg;
                facade.showView(ModName.More, MoreViewType.XianmaiFight, msg);
            }
        }

        private _stage: number;
        private _index: number;

        //todo 获取初始血量比例，后期协议改通用可自行调整协议加字段
        public getInitEnemyHp(): number {
            if (this._stage && this._index) {
                let info = this.getStageInfo(this._index);
                if (info && info.stage == this._stage) {
                    return info.hp / 10000;
                }
            }
            return 1;
        }

        /**==================================协议end==================================*/

        //怪物默认战力
        public getBossPower(idx: number): number {
            let cfg = GameConfig.getParamConfigById('xianmai_boss');
            let values: number[] = cfg.value;
            return (values[idx] || 0) * 10000;
        }

        public getBossNames(): string[] {
            return [getLanById(LanDef.xianmaizhengduo_tips26), getLanById(LanDef.xianmaizhengduo_tips27)];
        }

        public getBossIcon(): string {
            return 'guaiwu';
        }

        //宗门人数，客户端自己统计
        public get guild_num(): number {
            let list = this._model.role_list;
            let myGuildId = RoleUtil.getGuildId();
            if (!myGuildId) {
                return 0;
            }
            let num = 0;
            if (list) {
                for (let key in list) {
                    let info = list[key];
                    if (info && info.data && info.data.guild_id == myGuildId) {
                        num++;
                    }
                }
            }
            return num;
        }

        //宗门人数对应的收益万分比
        public getEarnCnt(cnt?: number): number {
            if (cnt == undefined) {
                cnt = this.guild_num;
            }
            let cfg = GameConfig.getParamConfigById('xianmai_income');
            let value = cfg.value[cnt] as number[];
            return value[1] / 100;
        }

        public get mvp_role(): msg.teammate {
            return this._model.mvp_role || null;
        }

        //攻击冷却时间
        public get cool_time(): number {
            return this._model.attack_time || 0;
        }

        //仙脉列表
        public get stage_list(): xianmai_stage_data[] {
            return this._model.list || [];
        }

        //奖励列表
        public get reward_items(): msg.prop_tips_data[] {
            return this._model.reward_items || [];
        }

        public set reward_items(item: prop_tips_data[]) {
            this._model.reward_items = item;
        }

        //我的占领数据
        public get my_data(): xianmai_role_data {
            return this._model.my_data;
        }

        ////仙脉积分累计
        public get penglai_score(): number {
            return this._model.penglai_score || 0;
        }

        //灵石积分累计
        public get lingshi(): number {
            return this._model.lingshi || 0;
        }

        //一键寻脉
        public get search_stage(): number {
            return this._model.search_stage;
        }

        public get search_index(): number {
            return this._model.search_index;
        }

        public get person_ranks(): msg.teammate[] {
            return this._model.person_ranks || [];
        }

        //活动时间
        public getActTimeRange(): number[][] {
            let cfg = GameConfig.getParamConfigById('xianmai_act');
            return cfg ? cfg.value : [[10, 0], [22, 0]];
        }

        //开始时间，秒
        public getStartTime(): number {
            let timeAry = this.getActTimeRange()[0];
            let day = new Date(TimeMgr.time.serverTime);
            day.setHours(timeAry[0], timeAry[1], 0, 0);
            return day.getTime() / 1000;
        }

        //结束时间，秒
        public getEndTime(): number {
            let timeAry = this.getActTimeRange()[1];
            let day = new Date(TimeMgr.time.serverTime);
            day.setHours(timeAry[0], timeAry[1], 0, 0);
            return day.getTime() / 1000;
        }

        //是否在活动时间内
        public isActTime(): boolean {
            let startTime = this.getStartTime();
            let endTime = this.getEndTime();
            let curTime = TimeMgr.time.serverTimeSecond;
            return startTime <= curTime && curTime <= endTime;
        }

        /**
         * 开启时间或结束时间，秒
         * @param isStart true表示开始时间10点，false表示结束时间22点
         */
        public getShowStartTime(isStart = true): number {
            let idx = isStart ? 0 : 1;
            let date = new Date(TimeMgr.time.serverTime);
            let curHour = date.getHours();//当前小时
            let timeAry = this.getActTimeRange()[idx];
            let isCurDay = curHour <= timeAry[0];//是否是今天
            if (!isStart) {
                let curMins = date.getMinutes();
                isCurDay = curHour <= timeAry[0] && curMins <= timeAry[1];
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            let nextDayTime = TimeUtil.getNextDayTime(curTime, false, isCurDay ? 0 : 1);
            let timeSecond = timeAry[0] * Second.Hour + timeAry[1] * Second.Minute;
            return nextDayTime + timeSecond;
        }

        //type 1.个人2.宗门
        public getZhanbao(type: number): xianmai_zhanbao_data[] {
            return this._model.logs[type] || [];
        }

        //冷却时间消耗
        public getCoolTimeCostStr(): string {
            let cfg = GameConfig.getParamConfigById('xianmai_time_buy');
            let cost: number[] = cfg && cfg.value;
            if (!cost) {
                return null;
            }
            let propCfg = GameConfig.getPropConfigById(cost[0]);
            let str = cost[1] + (propCfg && propCfg.name || '');
            return '是否花费' + TextUtil.addColor(str, WhiteColor.GREEN) + '加速' + TextUtil.addColor('1小时', WhiteColor.GREEN);
        }

        //占领的信息
        public getStageInfo(index: number): xianmai_role_data {
            return this._model.role_list[index];
        }

        //获取最小占领过期时间戳
        public getMinEndTime(): number {
            let list = this._model.role_list;
            let minTime: number;
            for (let key in list) {
                let item = list[key];
                if (!item || !item.end_time) {
                    continue;
                }
                if (minTime == undefined) {
                    minTime = item.end_time;
                }
                minTime = Math.min(minTime, item.end_time);
            }
            return minTime;
        }

        private _stageCfgs: { [type: number]: XianmaiStageConfig[] } = {};

        public getStageCfgs(type: number): XianmaiStageConfig[] {
            if (this._stageCfgs[type]) {
                return this._stageCfgs[type];
            }
            let list: XianmaiStageConfig[] = [];
            let cfgObj: { [index: number]: XianmaiStageConfig } = getConfigByNameId(ConfigName.XianmaiStage, type);
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                list.push(cfg);
            }
            this._stageCfgs[type] = list;
            return list;
        }

        public getStageCfg(stage: number, index: number): XianmaiStageConfig {
            let cfgObj = getConfigByNameId(ConfigName.XianmaiStage, stage);
            return cfgObj[index];
        }

        private _maxStage: number;

        //最大层级
        public getMaxStage(): number {
            if (this._maxStage) {
                return this._maxStage;
            }
            let cfgList = getConfigListByName(ConfigName.XianmaiStage);
            this._maxStage = cfgList.length;
            return this._maxStage;
        }

        //两个小时秒数
        public get coolTimeLimit(): number {
            return 2 * Second.Hour;
        }

        //冷却时间大于2小时
        public isCoolTimeLarge(): boolean {
            let coolTime = this.cool_time;
            let leftTime = coolTime - TimeMgr.time.serverTimeSecond;
            return leftTime > this.coolTimeLimit;
        }

        //剩余冷却时间
        public getLeftCoolTime(): number {
            let coolTime = this.cool_time;
            let leftTime = coolTime - TimeMgr.time.serverTimeSecond;
            return leftTime > 0 ? leftTime : 0;
        }

        //冷却时间倒计时
        public getCoolTimeStr(): string {
            let leftTime = this.getLeftCoolTime();
            let coolTimeStr = '';
            if (leftTime > 0) {
                coolTimeStr = TimeUtil.formatSecond(leftTime, 'HH时mm分');
            }
            let color = this.isCoolTimeLarge() ? WhiteColor.RED : 0xFEFAE5;//特殊色号
            return StringUtil.substitute(getLanById(LanDef.xianmaizhengduo_tips12), [TextUtil.addColor(coolTimeStr, color)]);
        }

        //冷却时间处理
        public dealCoolTime(): void {
            if (this.isCoolTimeLarge()) {
                let str = this.getCoolTimeCostStr();
                ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.c2s_xianmai_buy_time));
            }
        }

        //兑换红点
        public getExchangeHint(): boolean {
            let proxy: IExchangeShopProxy = getProxy(ModName.Activity, ProxyType.ExchangeShop);
            return proxy.getHintByExchangeType(ExchangeShopType.Type6);
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianmaiZhengduo)) {
                return;
            }
            let isActTime = this.isActTime();
            let hint = false;
            if (isActTime) {
                hint = this.my_data == null || this.getExchangeHint();
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }

        protected onRoleUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(PropIndexToKey[PropIndex.Lmcoin]) > -1) {
                this.updateHint();
            }
        }

        /**==================排行榜==================*/

        public getRanks(type: number): msg.teammate[] {
            if (type == 2) {
                return this._model.guild_ranks;
            } else {
                return this._model.person_ranks;
            }
        }

        public getRankList(type: number): RankRewardRenderData[] {
            let ranks = this.getRanks(type);
            let cfgArr = getConfigByNameId(ConfigName.XianmaiRankReward, type);
            let list: RankRewardRenderData[] = [];
            for (let cfg in cfgArr) {
                let cfg1 = cfgArr[cfg];
                let start: number = cfg1.rank_no[0];
                let end: number = cfg1.rank_no[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = item ? item.name + "\n" + "仙宗:" + item.guild_name : "虚位以待";
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: cfg1.reward
                    });
                } else {
                    let rank: string = start > MAX_RANK_NUM ? `${start - 1}+` : `${start}-${end}`;
                    list.push({
                        rank,
                        name: "",
                        reward: cfg1.reward,
                        param: type,
                        lookHandler: base.Handler.alloc(this, () => {
                            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianmaiRankSectionTips, {
                                rank,
                                type
                            });
                        })
                    });
                }
            }
            return list;
        }

        public getRankStr(type: number): string {
            if (type == 2) {
                let info = this._model.my_guild_rank;
                let str: string = "";
                if (info && info.rank_num) {
                    str = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                } else {
                    let param = getConfigByNameId(ConfigName.Param, "xianmai_rank");
                    return `仙宗仙脉积分${param.value[0]}上榜`;
                }
                return `仙宗排名：${str}`;
            } else {
                let info = this._model.my_rank;
                if (info && info.rank_num) {
                    let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                    return StringUtil.substitute(getLanById(LanDef.compete_mars_4), [str]);
                } else {
                    let param = getConfigByNameId(ConfigName.Param, "xianmai_rank");
                    return `个人仙脉积分${param.value[1]}上榜`;
                }
            }
        }

        public getRankCountStr(type: number): string {
            if (type == 2) {
                let info = this._model.my_guild_rank;
                let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
                return `仙宗积分：${str}`;
            } else {
                let info = this._model.my_rank;
                let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
                return `我的积分：${str}`;
            }
        }

        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        public getRankSection(rank: string, type: number): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let start: number = +strArr[0];
            let end: number = +strArr[1];
            let ranks: msg.teammate[];
            ranks = type == 2 ? this._model.guild_ranks : this._model.person_ranks;
            let list: IRankSectionData[] = [];
            for (let i = start - 1; i < end; i++) {
                let item = ranks && ranks[i];
                if (item) {
                    list.push({
                        rank: item.rank_num,
                        name: item.name + "\n" + "仙宗:" + item.guild_name,
                        value: +item.value
                    });
                } else {
                    list.push({rank: i + 1, name: "虚位以待", value: 0});
                }
            }
            return list;
        }

        //层数对应资源索引
        public getLayerIdx(layer: number): number {
            if (layer == 1) {
                return 0;
            }
            if (1 < layer && layer < 4) {
                return 1;
            }
            return 2;
        }

        public getSecondPopTitle(layer: number): string {
            let idx = this.getLayerIdx(layer);
            if (idx == 0) {
                return getLanById(LanDef.xianmaizhengduo_tips29);
            } else if (idx == 1) {
                return getLanById(LanDef.xianmaizhengduo_tips28);
            }
            return getLanById(LanDef.xianmaizhengduo_tips4);
        }

        //时间节点处理，10点，22点
        private setTimeInterval(): void {
            let startShowTime = this.getShowStartTime();
            HintMgr.addTimeEvent(TimeEventType.XianmaiStart, startShowTime, this, this.c2s_xianmai_my_show);

            let endShowTime = this.getShowStartTime(false);
            HintMgr.addTimeEvent(TimeEventType.XianmaiEnd, endShowTime, this, this.c2s_xianmai_my_show);
        }

        /**============== 修仙女仆自动挂机 ==============*/

        private _sendSearch = false;//请求一键寻脉协议标识，设为false才可以重新请求。用于自动挂机处理
        private _sendPvpOper4 = false;//请求一键寻脉后，占领该位置

        private canAutoChallengeXianmai(): boolean {
            //不在活动时间内，我的数据不空
            if (!this.isActTime() || this.my_data || this.isCoolTimeLarge()) {
                return false;
            }
            //处理请求
            if (!this.search_stage || !this.search_index) {
                if (!this._sendSearch) {
                    this.c2s_xianmai_search();//要处理_sendSearch，否则会进入无限循环
                    this._sendSearch = true;
                }
            }
            return this.search_stage != null && this.search_index != null;
        }

        private sendAutoChallengeXianmai(): void {
            if (this.search_stage && this.search_index) {
                this.c2s_xianmai_pvp_oper(XianmaiOperType.Oper4, this.search_stage, this.search_index);
                this._sendPvpOper4 = true;
            }
        }

        /**
         * 21.仙脉争夺
         * @param searchBack true表示一键寻脉协议返回
         */
        private checkAutoChallengeXianmai(searchBack = false): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianmaiZhengduo)) {
                return;
            }
            if (!searchBack) {
                this._sendSearch = false;//不是一键寻脉协议返回
            }
            if (this._sendPvpOper4) {
                //占领返回
                this._sendPvpOper4 = false;
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianmai);
                facade.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);
                return;
            }
            if (this.canAutoChallengeXianmai()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Xianmai, Handler.alloc(this, this.sendAutoChallengeXianmai));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianmai);
            }
        }

        /**============== 修仙女仆自动挂机 ==============*/
    }
}

