namespace game.mod.rank {
    import c2s_rank_req_rank = msg.c2s_rank_req_rank;
    import s2c_rank_info = msg.s2c_rank_info;
    import c2s_rank_worship = msg.c2s_rank_worship;
    import s2c_rank_worship = msg.s2c_rank_worship;
    import s2c_rank_base_info = msg.s2c_rank_base_info;
    import s2c_rank_update_reward = msg.s2c_rank_update_reward;
    import GameNT = base.GameNT;
    import RankConfConfig = game.config.RankConfConfig;
    import RankRewardConfig = game.config.RankRewardConfig;
    import LanDef = game.localization.LanDef;
    import c2s_dashen_rank_award = msg.c2s_dashen_rank_award;
    import TimeMgr = base.TimeMgr;
    import rank_info = msg.rank_info;

    /**
     * @description 排行榜系统，主界面上方排行榜按钮
     */
    export class NewRankProxy extends ProxyBase implements INewRankProxy {
        private _model: NewRankModel;

        initialize(): void {
            super.initialize();
            this._model = new NewRankModel();

            this.onProto(s2c_rank_info, this.s2c_rank_info, this);
            this.onProto(s2c_rank_worship, this.s2c_rank_worship, this);
            this.onProto(s2c_rank_base_info, this.s2c_rank_base_info, this);
            this.onProto(s2c_rank_update_reward, this.s2c_rank_update_reward, this);
        }

        /**
         * 获取排行榜信息
         * @param type 排行榜编号
         * @param event_type 1.排行榜界面2.大神榜
         * @param start  todo 后续补上滚动请求个数 2023.3.8
         * @param end
         */
        public c2s_rank_req_rank(type: RankType, event_type: number, start?: number, end?: number): void {
            let msg = new c2s_rank_req_rank();
            msg.index = type;
            msg.event_type = event_type;
            if (start != undefined) {
                msg.start_num = start;
            }
            if (end != undefined) {
                msg.end_num = end;
            }
            this.sendProto(msg);
        }

        //推送排行榜信息
        private s2c_rank_info(n: GameNT): void {
            let msg = n.body as s2c_rank_info;
            if (!msg) {
                return;
            }
            let rankType = msg.index;
            let rankInfo = this._model.rank_info[rankType];
            if (!rankInfo) {
                this._model.rank_info[rankType] = rankInfo = {};
            }
            rankInfo[msg.event_type] = msg;
            this._model.time_map[rankType] = TimeMgr.time.serverTimeSecond;//记录请求返回时间
            this.sendNt(RankEvent.ON_NEW_RANK_INFO_UPDATE, rankType);
        }

        //点赞
        public c2s_rank_worship(type: RankType): void {
            let msg = new c2s_rank_worship();
            msg.index = type;
            this.sendProto(msg);
        }

        //点赞返回
        private s2c_rank_worship(n: GameNT): void {
            let msg = n.body as s2c_rank_worship;
            let rankType = 0;
            if (msg.rank_type != null) {
                rankType = msg.rank_type;
                let idx = this._model.worship_list.indexOf(rankType);
                if (idx > -1) {
                    this._model.worship_list.splice(idx, 1);
                }
            }
            this.updateHint();
            this.sendNt(RankEvent.ON_RANK_WORSHIP_UPDATE, rankType);
        }

        //登录下发和跨天下发
        private s2c_rank_base_info(n: GameNT): void {
            let msg = n.body as s2c_rank_base_info;
            if (msg.reward_list != null) {
                for (let info of msg.reward_list) {
                    let map = this._model.reward_list[info.rank_type];
                    if (!map) {
                        this._model.reward_list[info.rank_type] = map = {};
                    }
                    map[info.index] = info;
                }
            } else {
                this._model.reward_list = [];
            }
            if (msg.worship_list != null) {
                this._model.worship_list = msg.worship_list;
            } else {
                this._model.worship_list = [];
            }
            this.updateHint();
            this.sendNt(RankEvent.ON_RANK_BASE_INFO_UPDATE);
        }

        //请求领取大神榜 奖励
        public c2s_dashen_rank_award(type: RankType, index: number): void {
            let msg = new c2s_dashen_rank_award();
            msg.ranktype = type;
            msg.index = index;
            this.sendProto(msg);
        }

        //更新奖励信息
        private s2c_rank_update_reward(n: GameNT): void {
            let msg = n.body as s2c_rank_update_reward;
            let rankType = 0;
            if (msg.reward_list != null) {
                for (let info of msg.reward_list) {
                    if (!rankType) {
                        rankType = info.rank_type;
                    }
                    let map = this._model.reward_list[info.rank_type];
                    if (!map) {
                        this._model.reward_list[info.rank_type] = map = {};
                    }
                    map[info.index] = info;
                }
            }
            this.updateHint();
            this.sendNt(RankEvent.ON_RANK_REWARD_UPDATE, rankType);
        }

        //在一个小时内，请求不生效
        public inOneHour(type: RankType): boolean {
            let lastReqTime = this._model.time_map[type];
            return lastReqTime && TimeMgr.time.serverTimeSecond < lastReqTime + Second.Hour;
        }

        public getConfCfg(type: RankType): RankConfConfig {
            return getConfigByNameId(ConfigName.RankConf, type);
        }

        public getRewardCfgList(type: RankType): RankRewardConfig[] {
            let cfgList: RankRewardConfig[] = [];
            let cfgs = getConfigByNameId(ConfigName.RankReward, type);
            for (let k in cfgs) {
                if (cfgs[k]) {
                    cfgList.push(cfgs[k]);
                }
            }
            return cfgList;
        }

        public getRankTypeList(): RankType[] {
            let list: RankType[] = [];
            let cfgList: RankConfConfig[] = getConfigListByName(ConfigName.RankConf);
            for (let cfg of cfgList) {
                list.push(cfg.index);
            }
            return list;
        }

        public getRankInfo(type: RankType, eventType = 1): s2c_rank_info {
            let info = this._model.rank_info[type];
            if (!info) {
                return null;
            }
            return info[eventType];
        }

        //大神榜奖励状态
        public getRankRewardStatus(type: RankType, index: number): RankRewardStatus {
            let map = this._model.reward_list[type];
            if (!map || !map[index]) {
                return RankRewardStatus.NotFinish;
            }
            let data = map[index];
            return data.status == 2 ? RankRewardStatus.Draw : RankRewardStatus.Finish;
        }

        public canWorship(type: RankType): boolean {
            return this._model.worship_list.indexOf(type) > -1;
        }

        public canGetReward(type: RankType): boolean {
            let list = this._model.reward_list[type];
            if (list) {
                for (let key in list) {
                    let data = list[key];
                    if (data && data.status == 1) {
                        return true;
                    }
                }
            }
            return false;
        }

        public getMyRankTypeDesc(type: RankType, powerCN: boolean = false): string {
            let ins = RoleVo.ins;
            switch (type) {
                case RankType.Zhanli:
                    let power = ins.showpower && ins.showpower.toNumber() || 0;
                    let powerStr = TextUtil.addColor(StringUtil.getHurtNumStr(power), WhiteColor.GREEN);
                    return this.getMyPowerDesc(type, true) + powerStr;
                case RankType.Dengji:
                    return getLanById(LanDef.rank_txt1) + getLanById(LanDef.level) + ':'
                        + TextUtil.addColor(ins.level + '', WhiteColor.GREEN);
                case RankType.Xiuxian:
                    return TextUtil.addColor(RoleUtil.getRebirthStr(), WhiteColor.GREEN);
                case RankType.Shenling:
                case RankType.Zuoqi:
                case RankType.Feijian:
                case RankType.Yuyi:
                case RankType.Shenbing:
                case RankType.Shizhuang:
                case RankType.Yuanling:
                    let info = this.getRankInfo(type);
                    let val = info && info.my_value ? info.my_value.toNumber() : 0;
                    return this.getMyPowerDesc(type) + TextUtil.addColor(`${powerCN ? StringUtil.getHurtNumStr(val) : val}`, WhiteColor.GREEN);
            }
            return '';
        }

        //返回：我的xx战力:
        private getMyPowerDesc(type: RankType, isPower = false): string {
            if (isPower) {
                return getLanById(LanDef.rank_txt1) + getLanById(LanDef.showpower) + ':';
            }
            return getLanById(LanDef.rank_txt1) + getLanById(RankTypeName[type]) + getLanById(LanDef.showpower) + ':';
        }

        public getHintByType(type: RankType): boolean {
            return this.canWorship(type) || this.canGetReward(type);
        }

        public updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Rank)) {
                return;
            }
            let hint = false;
            let typeList = this.getRankTypeList();
            for (let type of typeList) {
                if (this.getHintByType(type)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }

        //可点赞类型
        public getWorshipList(): number[] {
            return this._model.worship_list.sort((a, b) => a - b);
        }

        //大神榜达标条件
        public getGodCondition(type: RankType, param: number): string {
            if (type == RankType.Xiuxian) {
                return RoleUtil.getRebirthStr(param);
            }
            return param + '';
        }

        //数值文本
        public getPowerByRankInfo(type: RankType, data: rank_info): string {
            if (!data) {
                return '0';
            }
            let power: Long;
            switch (type) {
                case RankType.Zhanli:
                    power = data.showpower;
                    break;
                case RankType.Shenling:
                    power = data.shenling_showpower;
                    break;
                case RankType.Dengji:
                    return getLanById(LanDef.level) + ' ' + data.level;//等级
                case RankType.Xiuxian:
                    return RoleUtil.getRebirthStr(data.xiuxian);//修仙
                case RankType.Zuoqi:
                    power = data.ride_showpower;
                    break;
                case RankType.Feijian:
                    power = data.feijian_showpower;
                    break;
                case RankType.Yuyi:
                    power = data.wings_showpower;
                    break;
                case RankType.Shenbing:
                    power = data.weapon_showpower;
                    break;
                case RankType.Shizhuang:
                    power = data.fashion_showpower;
                    break;
                case RankType.Yuanling:
                    power = data.yuanling_showpower;
                    break;
            }
            return power ? power.toString() : '0';
        }
    }
}