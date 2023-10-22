namespace game.mod.more {


    import c2s_guild_fengmo_battle = msg.c2s_guild_fengmo_battle;
    import c2s_guild_fengmo_get_reward = msg.c2s_guild_fengmo_get_reward;
    import c2s_guild_fengmo_get_info = msg.c2s_guild_fengmo_get_info;
    import GameNT = base.GameNT;
    import s2c_guild_fengmo_info = msg.s2c_guild_fengmo_info;
    import s2c_guild_type_rank_list = msg.s2c_guild_type_rank_list;
    import teammate = msg.teammate;
    import c2s_guild_fengmo_get_rank = msg.c2s_guild_fengmo_get_rank;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import FengmoDamageRewardConfig = game.config.FengmoDamageRewardConfig;
    import c2s_buy_fengmo_tiaozhan_times = msg.c2s_buy_fengmo_tiaozhan_times;
    import prop_tips_data = msg.prop_tips_data;
    import FengmoTiaozhanRewardConfig = game.config.FengmoTiaozhanRewardConfig;
    import Handler = base.Handler;
    import FengmoRankConfig = game.config.FengmoRankConfig;
    import facade = base.facade;

    export class FengmoProxy extends ProxyBase {
        private _model: FengmoModel;

        initialize(): void {
            super.initialize();
            this._model = new FengmoModel();

            this.onProto(s2c_guild_fengmo_info, this.s2c_guild_fengmo_info, this);
            this.onProto(s2c_guild_type_rank_list, this.s2c_guild_type_rank_list, this);

            //仙宗id变化
            facade.onNt(UnionEvent.ON_UPDATE_IN_UNION, this.onUpdateUnionInfo, this);
        }

        /**------------------------协议------------------------- */
        public c2s_guild_fengmo_battle(type: number, param?: number): void {
            let msg: c2s_guild_fengmo_battle = new c2s_guild_fengmo_battle();
            msg.type = type;
            if (param) {
                msg.param = param;
            }
            this.sendProto(msg);
        }

        public c2s_guild_fengmo_get_reward(type: number, index: number): void {
            let msg: c2s_guild_fengmo_get_reward = new c2s_guild_fengmo_get_reward();
            msg.type = type;
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_guild_fengmo_get_info(): void {
            let msg: c2s_guild_fengmo_get_info = new c2s_guild_fengmo_get_info();
            this.sendProto(msg);
        }

        public c2s_guild_fengmo_get_rank(type: number): void {
            let msg: c2s_guild_fengmo_get_rank = new c2s_guild_fengmo_get_rank();
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_buy_fengmo_tiaozhan_times(buy_times: number): void {
            let msg: c2s_buy_fengmo_tiaozhan_times = new c2s_buy_fengmo_tiaozhan_times();
            msg.buy_times = buy_times;
            this.sendProto(msg);
        }

        private s2c_guild_fengmo_info(n: GameNT): void {
            let msg: s2c_guild_fengmo_info = n.body;
            if (msg.param == 1) {
                //更新全部 缺省赋予默认值
                this._model.my_max_damage = msg.my_max_damage && msg.my_max_damage.toNumber() || 0;
                this._model.damage_value = msg.damage_value && msg.damage_value.toNumber() || 0;
                this._model.buy_times = msg.buy_times || 0;
                this._model.times = msg.times || 0;
                this._model.total_times = msg.total_times || 0;
                this._model.mvp_info = msg.mvp_info || null;
                this._model.times_indexs = msg.cishu_index || [];
                this._model.damage_indexs = msg.damage_index || [];
                this._model.reward = msg.reward || [];
            } else {
                if (msg.my_max_damage) {
                    this._model.my_max_damage = msg.my_max_damage.toNumber();
                }
                if (msg.damage_value) {
                    this._model.damage_value = msg.damage_value.toNumber();
                }
                if (msg.buy_times) {
                    this._model.buy_times = msg.buy_times;
                }
                if (msg.times) {
                    this._model.times = msg.times;
                }
                if (msg.total_times) {
                    this._model.total_times = msg.total_times;
                }
                if (msg.mvp_info) {
                    this._model.mvp_info = msg.mvp_info;
                }
                if (msg.cishu_index) {
                    this._model.times_indexs = msg.cishu_index;
                }
                if (msg.damage_index) {
                    this._model.damage_indexs = msg.damage_index;
                }
                if (msg.reward) {
                    this._model.reward = msg.reward;
                }
            }
            this.onUpdateHint();
            this.checkAutoChallengeFengmo();
            this.sendNt(HuangguEvent.ON_UPDATE_FENGMO_INFO);
        }

        // private s2c_guild_fengmo_rank(n: GameNT): void {
        //     let msg: s2c_guild_fengmo_rank = n.body;
        //     if (msg.type == 1) {
        //         if (msg.my_info) {
        //             this._model.my_rank = msg.my_info;
        //         }
        //         if (msg.hurtlist) {
        //             this._model.person_ranks = msg.hurtlist;
        //         }
        //     } else {
        //         if (msg.my_info) {
        //             this._model.my_guild_rank = msg.my_info;
        //         }
        //         if (msg.hurtlist) {
        //             this._model.guild_ranks = msg.hurtlist;
        //         }
        //     }
        //     this.sendNt(HuangguEvent.ON_UPDATE_FENGMO_RANK);
        // }

        private s2c_guild_type_rank_list(n: GameNT): void {
            let msg: s2c_guild_type_rank_list = n.body;
            if (msg.rank_type !== UnionRank.Fengmo) {
                return;
            }
            let isGuild: boolean = msg.button_type == UnionRankType.Guild;
            if (isGuild) {
                this._model.guild_ranks = msg.all_ranks;
                this._model.my_guild_rank = msg.my_rank;
            } else {
                this._model.person_ranks = msg.all_ranks;
                this._model.my_rank = msg.my_rank;
            }
            this.sendNt(HuangguEvent.ON_UPDATE_FENGMO_RANK);

            this._model.last_rank_num = msg.last_rank_num || 0;
            this._model.props = msg.props || [];
            if (msg.last_rank_num && msg.props) {
                HintMgr.setHint(true, [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.Fengmo, HintType.UnionRank]);
            } else {
                HintMgr.setHint(false, [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.Fengmo, HintType.UnionRank]);
            }
        }

        /**------------------------协议------------------------- */

        public get mvp_info(): teammate {
            return this._model.mvp_info;
        }

        /**剩余次数 */
        public get times(): number {
            if (!this._model.times) {
                return this.guild_fengmo_meiricishu;
            }
            return this.guild_fengmo_meiricishu - this._model.times + this.buy_times;
        }

        public get my_max_damage(): number {
            return this._model.my_max_damage || 0;
        }

        public get damage_value(): number {
            return this._model.damage_value || 0;
        }

        public get damage_indexs(): number[] {
            return this._model.damage_indexs || [];
        }

        public get times_indexs(): number[] {
            return this._model.times_indexs || [];
        }

        public get total_times(): number {
            return this._model.total_times || 0;
        }

        public get buy_times(): number {
            return this._model.buy_times || 0;
        }

        public get reward(): prop_tips_data[] {
            return this._model.reward || [];
        }

        public get last_rank_num(): number {
            return this._model.last_rank_num || 0;
        }

        public get props(): prop_tips_data[] {
            return this._model.props || [];
        }

        public getRanks(type: number): teammate[] {
            if (type == UnionRankType.Person) {
                return this._model.person_ranks;
            } else {
                return this._model.guild_ranks;
            }
        }

        private getRankName(item: teammate, type: number): string {
            if (!item) {
                return getLanById(LanDef.tishi_2);
            }
            if (type == UnionRankType.Guild) {
                let content: string = getLanById(LanDef.guild_tips15);
                return StringUtil.substitute(content, [item.guild_name, item.name]);
            } else {
                return item.name;
            }
        }

        public getRankList(type: number): RankRewardRenderData[] {
            let ranks = this.getRanks(type);
            let cfgArr = getConfigByNameId(ConfigName.FengmoRank, type);
            let list: RankRewardRenderData[] = [];
            for (let k in cfgArr) {
                let cfg: FengmoRankConfig = cfgArr[k];
                let start: number = cfg.rank_no[0];
                let end: number = cfg.rank_no[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = this.getRankName(item, type);
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: cfg.awards
                    });
                } else {
                    // let str: string = TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, "");
                    let more: boolean = start > MAX_RANK_NUM;
                    let rank: string = more ? `${start - 1}+` : `${start}-${end}`;
                    let lookHandler: Handler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.FengmoRankTips, { rank, type });
                    })
                    list.push({
                        rank,
                        name: "",
                        reward: cfg.awards,
                        lookHandler: !more && lookHandler
                    });
                }
            }
            return list;
        }

        public getRankInfo(type: number): teammate {
            if (type == UnionRankType.Person) {
                return this._model.my_rank;
            }
            return this._model.my_guild_rank;
        }

        public getRankStr(type: number): string {
            let info: teammate = this.getRankInfo(type);
            if (info && info.rank_num) {
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                let lan: string = type == UnionRankType.Person ? getLanById(LanDef.compete_mars_4) : getLanById(LanDef.xianzong_tips8);
                return StringUtil.substitute(lan, [str]);
            } else {
                let param: ParamConfig = GameConfig.getParamConfigById(`guild_fengmo_shangbang${type}`);
                return StringUtil.substitute(getLanById(LanDef.xianzong_tips9), [param.value]);
            }
        }

        public getRankCountStr(type: number): string {
            let info: teammate = this.getRankInfo(type);
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            return StringUtil.substitute(getLanById(LanDef.xianzong_tips10), [str]);
        }

        /**获取区间排行榜列表 参数为排名 需要-1转换索引 */
        public getRankSection(rank: string, type: number): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let start: number = +strArr[0];
            let end: number = +strArr[1];
            let ranks: teammate[] = this.getRanks(type);
            let list: IRankSectionData[] = [];
            for (let i = start - 1; i < end; i++) {
                let item = ranks && ranks[i];
                let name: string = this.getRankName(item, type);
                if (item) {
                    list.push({ rank: item.rank_num, name, value: +item.value });
                } else {
                    list.push({ rank: i + 1, name, value: 0 });
                }
            }
            return list;
        }

        public get hurt_cfg(): FengmoDamageRewardConfig {
            let cfgArr: FengmoDamageRewardConfig[] = getConfigListByName(ConfigName.FengmoDamageReward);
            for (let cfg of cfgArr) {
                if (cfg.damage_value > this.damage_value / 10000) {
                    return cfg;
                }
            }
            return cfgArr[cfgArr.length - 1];
        }

        public getRewardState(cfg: FengmoTiaozhanRewardConfig): ComRewardState {
            let indexs: number[] = this.times_indexs;
            if (indexs.indexOf(cfg.index) > -1) {
                return ComRewardState.Done;
            } else {
                return +(this.total_times >= cfg.tiaozhan_times);
            }
        }

        /**-------------------------参数表配置------------------------ */
        public get guild_fengmo_model(): number {
            if (!this._model.guild_fengmo_model) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_fengmo_model");
                this._model.guild_fengmo_model = param.value;
            }
            return this._model.guild_fengmo_model;
        }

        public get guild_fengmo_meiricishu(): number {
            if (!this._model.guild_fengmo_meiricishu) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_fengmo_meiricishu");
                this._model.guild_fengmo_meiricishu = param.value;
            }
            return this._model.guild_fengmo_meiricishu;
        }

        public get guild_fengmo_meirixiangou(): number {
            if (!this._model.guild_fengmo_meirixiangou) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_fengmo_meirixiangou");
                this._model.guild_fengmo_meirixiangou = param.value;
            }
            return this._model.guild_fengmo_meirixiangou;
        }

        public get guild_fengmo_time(): number {
            if (!this._model.guild_fengmo_time) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_fengmo_time");
                this._model.guild_fengmo_time = param.value;
            }
            return this._model.guild_fengmo_time;
        }

        /**------------------------红点-------------------------*/
        private onUpdateHint(): void {
            let root: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Hundun, MoreViewType.Fengmo];

            if (this.times) {
                HintMgr.setHint(true, root);
                return;
            }

            let bool_times: boolean = this.getTimesHint();
            if (bool_times) {
                HintMgr.setHint(true, root);
                return;
            }

            let bool: boolean = this.getDamageHint();
            if (bool) {
                HintMgr.setHint(true, root);
                return;
            }

            HintMgr.setHint(false, root);
        }

        public getTimesHint(): boolean {
            if (!RoleUtil.isInUnion()) {
                return false;
            }
            let cfgArr: FengmoTiaozhanRewardConfig[] = getConfigListByName(ConfigName.FengmoTiaozhanReward);
            for (let cfg of cfgArr) {
                if (this.times_indexs.indexOf(cfg.index) > -1) {
                    continue;
                }
                if (this.total_times >= cfg.tiaozhan_times) {
                    return true;
                }
            }
            return false;
        }

        public getDamageHint(): boolean {
            if (!RoleUtil.isInUnion()) {
                return false;
            }
            let cfgArr: FengmoDamageRewardConfig[] = getConfigListByName(ConfigName.FengmoDamageReward);
            for (let cfg of cfgArr) {
                if (this.damage_indexs.indexOf(cfg.index) > -1) {
                    continue;
                }
                if (this.damage_value >= cfg.damage_value * 10000) {
                    return true;
                }
            }
            return false;
        }

        /**============== 修仙女仆自动挂机 ==============*/

        //加入宗门，每日三次挑战
        private canAutoChallenge(): boolean {
            if (!RoleUtil.getGuildId() || !ViewMgr.getIns().checkViewOpen(OpenIdx.Fengmo)) {
                return false;
            }
            return this._model.times < this.guild_fengmo_meiricishu && this.times > 0;
        }

        private sendAutoChallenge(): void {
            if (!this.canAutoChallenge()) {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianzongfengmo);
                return;
            }
            let type = 1;
            let cnt: number;
            if (this.my_max_damage) {
                type = 2;//扫荡
                cnt = Math.max(0, this.guild_fengmo_meiricishu - this._model.times);//扫荡次数
            }
            this.c2s_guild_fengmo_battle(type, cnt);
        }

        private checkAutoChallengeFengmo(): void {
            //退出仙宗
            if (!RoleUtil.getGuildId()) {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianzongfengmo, true);
                return;
            }
            if (this.canAutoChallenge()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Xianzongfengmo, Handler.alloc(this, this.sendAutoChallenge));
            } else {
                //扫荡处理的
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianzongfengmo);
            }
        }

        private onUpdateUnionInfo(): void {
            this.checkAutoChallengeFengmo();
        }

        /**============== 修仙女仆自动挂机 ==============*/

    }
}