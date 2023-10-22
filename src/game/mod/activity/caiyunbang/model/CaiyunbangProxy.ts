namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_activity_caiyun_qifu_info = msg.s2c_activity_caiyun_qifu_info;
    import s2c_activity_caiyun_leichong = msg.s2c_activity_caiyun_leichong;
    import s2c_activity_caiyun_duihuan = msg.s2c_activity_caiyun_duihuan;
    import s2c_activity_caiyun_login = msg.s2c_activity_caiyun_login;
    import c2s_activity_caiyun_qifu = msg.c2s_activity_caiyun_qifu;
    import c2s_activity_caiyun_leichong_reward = msg.c2s_activity_caiyun_leichong_reward;
    import c2s_activity_caiyun_duihuan = msg.c2s_activity_caiyun_duihuan;
    import c2s_activity_caiyun_login = msg.c2s_activity_caiyun_login;
    import oper_act_item = msg.oper_act_item;
    import prop_tips_data = msg.prop_tips_data;
    import teammate = msg.teammate;
    import s2c_activity_caiyun_rank_info = msg.s2c_activity_caiyun_rank_info;
    import reward_state = msg.reward_state;
    import Handler = base.Handler;

    /**
     * @description 财运榜系统
     */
    export class CaiyunbangProxy extends ProxyBase {
        private _model: CaiyunbangModel;
        private _actTypeList = [ActivityType.CaiyunbangTurntable, ActivityType.CaiyunbangRank,
            ActivityType.CaiyunbangCharge, ActivityType.CaiyunbangExchange, ActivityType.CaiyunbangLogin];

        initialize(): void {
            super.initialize();
            this._model = new CaiyunbangModel();
            this.onProto(s2c_activity_caiyun_qifu_info, this.s2c_activity_caiyun_qifu_info, this);
            this.onProto(s2c_activity_caiyun_leichong, this.s2c_activity_caiyun_leichong, this);
            this.onProto(s2c_activity_caiyun_duihuan, this.s2c_activity_caiyun_duihuan, this);
            this.onProto(s2c_activity_caiyun_login, this.s2c_activity_caiyun_login, this);
            this.onProto(s2c_activity_caiyun_rank_info, this.s2c_activity_caiyun_rank_info, this);
        }

        // 财运祈福抽奖 抽奖类型 1：单抽 2：十连
        public c2s_activity_caiyun_qifu(type: CommonCountType): void {
            let msg = new c2s_activity_caiyun_qifu();
            msg.type = type;
            msg.act_id = this.getActId(ActivityType.CaiyunbangTurntable);
            this.sendProto(msg);
        }

        private s2c_activity_caiyun_qifu_info(n: GameNT): void {
            let msg = n.body as s2c_activity_caiyun_qifu_info;
            this._model.item_list = msg.item_list || [];
            this._model.times = msg.times || 0;
            this.updateHint(ActivityType.CaiyunbangTurntable);
            this.sendNt(ActivityEvent.ON_CAIYUNBANG_QIFU_INFO_UPDATE);
        }

        // 领取财运累充奖励
        public c2s_activity_caiyun_leichong_reward(id: number): void {
            let msg = new c2s_activity_caiyun_leichong_reward();
            msg.id = id;
            msg.act_id = this.getActId(ActivityType.CaiyunbangCharge);
            this.sendProto(msg);
        }

        private s2c_activity_caiyun_leichong(n: GameNT): void {
            let msg = n.body as s2c_activity_caiyun_leichong;
            if (msg.info != null) {
                for (let item of msg.info) {
                    this._model.leichong_info[item.id] = item;
                }
            }
            if (msg.num != null) {
                this._model.leichong_num = msg.num.toNumber();
            }
            this.updateHint(ActivityType.CaiyunbangCharge);
            this.sendNt(ActivityEvent.ON_CAIYUNBANG_LEICHONG_INFO_UPDATE);
        }

        // 财运兑换
        public c2s_activity_caiyun_duihuan(id: number, cnt: number = 1): void {
            let msg = new c2s_activity_caiyun_duihuan();
            msg.id = id;
            msg.cnt = cnt;
            msg.act_id = this.getActId(ActivityType.CaiyunbangExchange);
            this.sendProto(msg);
        }

        private s2c_activity_caiyun_duihuan(n: GameNT): void {
            let msg = n.body as s2c_activity_caiyun_duihuan;
            if (msg.info != null) {
                for (let item of msg.info) {
                    this._model.duihuan_info[item.id] = item;
                }
            }
            this.updateHint(ActivityType.CaiyunbangExchange);
            this.sendNt(ActivityEvent.ON_CAIYUNBANG_DUIHUAN_INFO_UPDATE);
        }

        // 领取财运登录礼包
        public c2s_activity_caiyun_login(id: number): void {
            let msg = new c2s_activity_caiyun_login();
            msg.id = id;
            msg.act_id = this.getActId(ActivityType.CaiyunbangLogin);
            this.sendProto(msg);
        }

        private s2c_activity_caiyun_login(n: GameNT): void {
            let msg = n.body as s2c_activity_caiyun_login;
            if (msg.info != null) {
                for (let item of msg.info) {
                    this._model.login_info[item.id] = item;
                }
            }
            this.updateHint(ActivityType.CaiyunbangLogin);
            this.sendNt(ActivityEvent.ON_CAIYUNBANG_LOGIN_INFO_UPDATE);
        }

        // 财运榜
        private s2c_activity_caiyun_rank_info(n: GameNT): void {
            let msg = n.body as s2c_activity_caiyun_rank_info;
            let actData = this.getActData(ActivityType.CaiyunbangRank);
            if (!actData || !msg.act_id || actData.act_id != msg.act_id) {
                return;
            }
            this._model.rank_list = msg.rank_list || [];
            this._model.my_score = msg.my_score || 0;
            this._model.my_rank_no = msg.my_rank_no || 0;
            this.sendNt(ActivityEvent.ON_CAIYUNBANG_RANK_INFO_UPDATE);
        }

        /**====================================== 协议end ======================================*/

        public getCurOpenAct(): oper_act_item {
            let actProxy: ActivityProxy = getProxy(ModName.Activity, ProxyType.Activity);
            return actProxy.curOpenAct;
        }

        public getEndTime(): number {
            let endTime = this.getCurOpenAct().c_end_time;
            return endTime;
        }

        /**活动最后一天提示*/
        public checkActTips(type: NotTipsType): void {
            let endTime = this.getEndTime();
            ViewMgr.getIns().showActTips(endTime, type);
        }

        //活动数据，统一接口获取
        public getActData(type: ActivityType): oper_act_item {
            let actProxy: ActivityProxy = getProxy(ModName.Activity, ProxyType.Activity);
            return actProxy.getOperActByType(type);
        }

        public getActId(type: ActivityType): number {
            let actData = this.getCurOpenAct();
            if (!actData || actData.type != type) {
                return 0;
            }
            return actData.act_id;
        }

        //祈福消耗
        public getQifuCost(type: CommonCountType = CommonCountType.Once): number[] {
            let paramCfg = GameConfig.getParamConfigById('caiyunbang_xiaohao');
            let cost: number[] = paramCfg.value.concat();
            if (type == CommonCountType.Ten) {
                cost[1] = cost[1] * 10;
            }
            if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                return cost;
            }
            paramCfg = GameConfig.getParamConfigById('caiyunbang_xiaohao2');
            cost = paramCfg.value.concat();
            if (type == CommonCountType.Ten) {
                cost[1] = cost[1] * 10;
            }
            return cost;
        }

        //仙玉消耗
        private isXianyu(cost: number[]): boolean {
            let paramCfg = GameConfig.getParamConfigById('caiyunbang_xiaohao2');
            let idx = paramCfg.value[0];
            return cost && cost[0] == idx;
        }

        //能否祈福
        public canQifu(type: CommonCountType = CommonCountType.Once, isTips = false): boolean {
            let cost = this.getQifuCost(type);
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //祈福红点，仙玉不需要红点
        public getQifuHint(type = CommonCountType.Once): boolean {
            let cost = this.getQifuCost(type);
            let isXianyu = this.isXianyu(cost);
            if (isXianyu) {
                return false;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        //距离祈福次数
        public getQifuTimes(): number {
            if (this._model.times == undefined) {
                let paramCfg = GameConfig.getParamConfigById('caiyunbang_baodi');
                this._model.times = paramCfg.value;
            }
            return this._model.times;
        }

        private _qifuReward: prop_tips_data[];

        //祈福道具奖励
        public getQifuRewards(): prop_tips_data[] {
            if (this._qifuReward) {
                return this._qifuReward;
            }
            let actData = this.getActData(ActivityType.CaiyunbangTurntable);
            if (!actData || !actData.reward_list) {
                return [];
            }
            let list: prop_tips_data[] = [];
            for (let item of actData.reward_list) {
                if (item.cond_2 && item.cond_2[0] == 2) {
                    //2为大奖
                    list.unshift(item.rewards[0]);
                } else {
                    list.push(item.rewards[0]);
                }
            }
            this._qifuReward = list;
            return list;
        }

        //祈福得到的道具
        public getQifuProp(): prop_tips_data[] {
            return this._model.item_list;
        }

        //祈福抽取目标位置
        public getQifuTargetIdx(): number {
            let target = this.getQifuProp()[0];
            if (!target) {
                return 0;
            }
            let rewards = this.getQifuRewards();
            for (let i = 0; i < rewards.length; i++) {
                let item = rewards[i];
                if (item && item.idx.eq(target.idx)) {
                    return i;
                }
            }
            return 0;
        }

        //排行榜数据
        public getRankTeammate(rankNo: number): teammate {
            let rankList = this._model.rank_list;
            if (!rankList || !rankList.length) {
                return null;
            }
            for (let item of rankList) {
                if (item && item.rank_num == rankNo) {
                    return item;
                }
            }
            return null;
        }

        public getRankList(): teammate[] {
            return this._model.rank_list;
        }

        public getMyRankNo(): number {
            return this._model.my_rank_no;
        }

        public getMyScore(): number {
            return this._model.my_score;
        }

        //活动内累充金额
        public getChargeRmb(): number {
            return this._model.leichong_num;
        }

        //累充状态
        public getChargeStateInfo(id: number): reward_state {
            return this._model.leichong_info[id];
        }

        //登录奖励
        public getLoginStateInfo(id: number): reward_state {
            return this._model.login_info[id];
        }

        //兑换消耗
        public getExchangeCost(): number {
            let actData = this.getActData(ActivityType.CaiyunbangExchange);
            return actData && actData.param && actData.param[1] || PropIndex.Caiyunyinji;
        }

        //兑换已购买次数
        public getBoughtCnt(id: number): number {
            let info = this._model.duihuan_info[id];
            return info && info.times || 0;
        }

        protected onActivityInit(n: GameNT) {
            let actData = this.getActData(ActivityType.CaiyunbangTurntable);
            if (!actData) {
                return;//活动未开启
            }
            for (let type of this._actTypeList) {
                this.updateHint(type);
            }
        }

        protected onActivityUpdateByType(n: GameNT) {
            let types = n.body as number[];
            for (let type of this._actTypeList) {
                if (types.indexOf(type) > -1) {
                    this.updateHint(type);
                }
            }
        }

        private updateHint(type: ActivityType): void {
            let handler: { [type: number]: Function } = {
                [ActivityType.CaiyunbangTurntable]: this.getHintQifu,
                [ActivityType.CaiyunbangCharge]: this.getHintCharge,
                [ActivityType.CaiyunbangExchange]: this.getHintExchange,
                [ActivityType.CaiyunbangLogin]: this.getHintLogin
            };

            let proxy: ActivityProxy = getProxy(ModName.Activity, ProxyType.Activity);
            proxy.setActHint(type, Handler.alloc(this, handler[type]));
        }

        //祈福红点
        public getHintQifu(): boolean {
            if (this._model.qifuLoginHint) {
                return true;
            }
            return this.getQifuHint();
        }

        //累充红点
        public getHintCharge(): boolean {
            if (this._model.chargeLoginHint) {
                return true;
            }
            for (let key in this._model.leichong_info) {
                let item = this._model.leichong_info[key];
                if (item && item.statue == RewardStatus.Finish) {
                    return true;
                }
            }
            return false;
        }

        //兑换红点
        public getHintExchange(): boolean {
            let actData = this.getActData(ActivityType.CaiyunbangExchange);
            if (!actData || !actData.reward_list) {
                return false;
            }
            let costIdx = this.getExchangeCost();//消耗道具id
            for (let item of actData.reward_list) {
                if (!item.cond_1 || !item.cond_2) {
                    continue;
                }
                let limitCnt = item.cond_2[0];//限购次数
                let boughtCnt = this.getBoughtCnt(item.index);
                if (boughtCnt >= limitCnt) {
                    continue;
                }
                let costCnt = item.cond_1[0];//消耗数量
                if (BagUtil.checkPropCnt(costIdx, costCnt)) {
                    return true;
                }
            }
            return false;
        }

        //登录奖励红点
        public getHintLogin(): boolean {
            for (let key in this._model.login_info) {
                let item = this._model.login_info[key];
                if (item && item.statue == RewardStatus.Finish) {
                    return true;
                }
            }
            return false;
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];

            let qifuCost = this.getQifuCost();
            if (indexs.indexOf(qifuCost[0]) > -1) {
                this.updateHint(ActivityType.CaiyunbangTurntable);
            }
        }

        protected onRoleUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.caiyun_yinji) > -1) {
                this.updateHint(ActivityType.CaiyunbangExchange);
            }
            //仙玉的消耗
            let qifuCost = this.getQifuCost();
            if (qifuCost[0] == PropIndex.Xianyu && keys.indexOf(RolePropertyKey.diamond) > -1) {
                this.updateHint(ActivityType.CaiyunbangTurntable);
            }
        }

        //清理登陆红点
        public clearLoginHint(type: ActivityType): void {
            let lastHint = type == ActivityType.CaiyunbangTurntable ? this._model.qifuLoginHint : this._model.chargeLoginHint;
            if (type == ActivityType.CaiyunbangTurntable && lastHint) {
                this._model.qifuLoginHint = false;
            } else if (type == ActivityType.CaiyunbangCharge && lastHint) {
                this._model.chargeLoginHint = false;
            }
            if (lastHint) {
                this.updateHint(type);
            }
        }
    }
}