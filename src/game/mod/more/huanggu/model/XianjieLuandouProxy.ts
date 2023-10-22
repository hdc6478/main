namespace game.mod.more {

    import GameNT = base.GameNT;
    import XianjiebrawlScoreConfig = game.config.XianjiebrawlScoreConfig;
    import XianjiebrawlRankConfig = game.config.XianjiebrawlRankConfig;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import s2c_xianjie_pvp_base_info = msg.s2c_xianjie_pvp_base_info;
    import s2c_xianjie_pvp_rank_info = msg.s2c_xianjie_pvp_rank_info;
    import s2c_xianjie_pvp_scene_rank_info = msg.s2c_xianjie_pvp_scene_rank_info;
    import s2c_xianjie_pvp_score_reward = msg.s2c_xianjie_pvp_score_reward;
    import s2c_xianjie_pvp_boss_info = msg.s2c_xianjie_pvp_boss_info;
    import Handler = base.Handler;
    import c2s_xianjie_pvp_oper = msg.c2s_xianjie_pvp_oper;
    import c2s_xianjie_pvp_scene_use_buff = msg.c2s_xianjie_pvp_scene_use_buff;
    import s2c_xianjie_pvp_battle_report = msg.s2c_xianjie_pvp_battle_report;
    import DailyLimitTimeConfig = game.config.DailyLimitTimeConfig;
    import facade = base.facade;
    import XianjiebrawlBaseConfig = game.config.XianjiebrawlBaseConfig;
    import s2c_xianjie_pvp_kill_boss_info = msg.s2c_xianjie_pvp_kill_boss_info;
    import s2c_xianjie_pvp_scene_info = msg.s2c_xianjie_pvp_scene_info;
    import s2c_xianjie_luandou_scene_buff_index_cd = msg.s2c_xianjie_luandou_scene_buff_index_cd;
    import TimeMgr = base.TimeMgr;
    import xianjie_pvp_boss_info = msg.xianjie_pvp_boss_info;

    /**
     * @description 仙界乱斗
     */
    export class XianjieLuandouProxy extends ProxyBase {
        private _model: XianjieLuandouModel;

        initialize(): void {
            super.initialize();
            this._model = new XianjieLuandouModel();

            this.onProto(s2c_xianjie_pvp_base_info, this.s2c_xianjie_pvp_base_info, this);
            this.onProto(s2c_xianjie_pvp_rank_info, this.s2c_xianjie_pvp_rank_info, this);
            this.onProto(s2c_xianjie_pvp_scene_rank_info, this.s2c_xianjie_pvp_scene_rank_info, this);
            this.onProto(s2c_xianjie_pvp_score_reward, this.s2c_xianjie_pvp_score_reward, this);
            this.onProto(s2c_xianjie_pvp_boss_info, this.s2c_xianjie_pvp_boss_info, this);
            this.onProto(s2c_xianjie_pvp_battle_report, this.s2c_xianjie_pvp_battle_report, this);
            this.onProto(s2c_xianjie_pvp_kill_boss_info, this.s2c_xianjie_pvp_kill_boss_info, this);
            this.onProto(s2c_xianjie_pvp_scene_info, this.s2c_xianjie_pvp_scene_info, this);
            this.onProto(s2c_xianjie_luandou_scene_buff_index_cd, this.s2c_xianjie_luandou_scene_buff_index_cd, this);
        }

        /**
         * 1进入副本(s2c_xianjie_pvp_base_info)
         * 2查看活动排名(s2c_xianjie_pvp_rank_info)
         * 3获取战场积分排名(s2c_xianjie_pvp_scene_rank_info)
         * 4领取战场积分奖励(s2c_xianjie_pvp_score_reward)
         * 5发送宗门邀请
         * 6请求战报
         */
        public c2s_xianjie_pvp_oper(type: XianjieLuandouOperType, param?: number): void {
            let msg = new c2s_xianjie_pvp_oper();
            msg.type = type;
            if (param) {
                msg.param = param;
            }
            this.sendProto(msg);
        }

        private s2c_xianjie_pvp_base_info(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_base_info;
            if (msg.state != null) {
                this._model.state = msg.state;
            }
            if (msg.cd_sec != null) {
                this._model.cd_sec = msg.cd_sec;
            }
            if (this.is_first_open != null) {
                this._model.is_first_open = msg.is_first_open;
            }
            if (msg.state != null && msg.state == 1) {
                PropTipsMgr.getIns().showBoss(BossTipsType.XianjieLuandou, this.end_time);
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_BASE_INFO_UPDATE);
        }

        private s2c_xianjie_pvp_rank_info(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_rank_info;
            // msg.type
            if (msg.rank != null) {
                this._model.rank = msg.rank;
            }
            if (msg.my_rank != null) {
                this._model.my_rank = msg.my_rank;
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_RANK_INFO_UPDATE);
        }

        private s2c_xianjie_pvp_scene_rank_info(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_scene_rank_info;
            // msg.type
            if (msg.rank != null) {
                this._model.scene_rank = msg.rank;
            }
            if (msg.my_rank != null) {
                this._model.scene_my_rank = msg.my_rank;
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_SCENE_RANK_INFO_UPDATE);
        }

        //已领取的积分奖励列表
        private s2c_xianjie_pvp_score_reward(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_score_reward;
            if (msg.index != null) {
                this._model.index = msg.index;
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_SCORE_REWARD_UPDATE);
        }

        public c2s_xianjie_pvp_scene_use_buff(index: number): void {
            let msg = new c2s_xianjie_pvp_scene_use_buff();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_xianjie_pvp_boss_info(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_boss_info;
            if (msg.boss_list != null) {
                for (let item of msg.boss_list) {
                    this._model.boss_list[item.index.toNumber()] = item;
                }
            }
            if (msg.is_update == 1) {
                this._model.owner_info = msg.owner_info || null;
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_BOSS_INFO_UPDATE);
        }

        /// boss击杀归属战报
        private s2c_xianjie_pvp_battle_report(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_battle_report;
            if (msg.report_list != null) {
                this._model.report_list = msg.report_list;
            } else {
                this._model.report_list = [];
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_BATTLE_REPORT_UPDATE);
        }

        /// 击破灵石提示
        private s2c_xianjie_pvp_kill_boss_info(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_kill_boss_info;
            if (msg != null) {
                this._model.kill_boss_info = msg;
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_KILL_BOSS_INFO_UPDATE);
        }

        private s2c_xianjie_pvp_scene_info(n: GameNT): void {
            let msg = n.body as s2c_xianjie_pvp_scene_info;
            if (msg != null) {
                this._model.pvp_scene_info = msg;
            }
            this.sendNt(MoreEvent.ON_XIANJIE_PVP_SCENE_INFO_UPDATE);
        }

        private s2c_xianjie_luandou_scene_buff_index_cd(n: GameNT): void {
            let msg = n.body as s2c_xianjie_luandou_scene_buff_index_cd;
            if (msg.idx_cds != null) {
                for (let item of msg.idx_cds) {
                    this._model.skill_cds[item.index] = item;
                }
            }
            this.sendNt(MoreEvent.ON_XIANJIE_SCENE_SKILL_CD_UPDATE);
        }

        /**=========================协议end=========================*/

        //是否首次开启
        public get is_first_open(): boolean {
            return this._model.is_first_open == 1;
        }

        //结束时间
        public get end_time(): number {
            let date = TimeUtil.getServerTime();
            let cfg = this.dailyLimitTimeCfg;
            if (this.isOpen && cfg) {
                let curHour = date.getHours(); //当前时
                let curMin = date.getMinutes();//当前分
                //本次结束时间戳
                let actTime = cfg.act_time;
                let endTime = actTime[1];//此轮的结束时间点
                if (actTime.length > 2) {
                    //多个开启时间段
                    for (let i = 0; i < actTime.length; i += 2) {
                        let start = actTime[i];
                        let end = actTime[i + 1];
                        if (start[0] <= curHour && start[1] <= curMin && curHour <= end[0] && curMin <= end[1]) {
                            endTime = actTime[1];
                            break;
                        }
                    }
                }
                date.setHours(endTime[0], endTime[1], 0, 0);
                return date.getTime() / 1000;
            }
            return 0;
        }

        //日常玩法配置
        public get dailyLimitTimeCfg(): DailyLimitTimeConfig {
            return getConfigByNameId(ConfigName.DailyLimitTime, DailyLimitTimeType.XianjieLuandou);
        }

        //奖励
        public get show_rewards(): number[][] {
            let cfg = this.dailyLimitTimeCfg;
            return cfg && cfg.reward || [];
        }

        //是否开启，根据服务端判断 todo
        public get isOpen(): boolean {
            return this._model.state == 1;
        }

        //展示时间
        public get show_time_sec(): number {
            if (this.isOpen) {
                //本次结束时间戳
                return this.end_time;
            }
            if (!this.dailyLimitTimeCfg) {
                return 0;
            }
            let dailyLimitProxy: IDailyLimitTimeActProxy = facade.retMod(ModName.Daily).retProxy(ProxyType.DailyLimitTime);
            return dailyLimitProxy && dailyLimitProxy.getNextStartTime(DailyLimitTimeType.XianjieLuandou) || 0;
        }

        //技能列表 [[buff序列_buffid_冷却时间秒_消耗材料_数量]]
        public get skill_list(): number[][] {
            let cfg = GameConfig.getParamConfigById('xianjieluandou_skill');
            return cfg.value || [];
        }

        //复活技能
        public get revive_data(): number[] {
            let list = this.skill_list;
            return list && list[3] || [];
        }

        public get rank(): teammate[] {
            return this._model.rank;
        }

        public get my_rank(): teammate {
            return this._model.my_rank;
        }

        //我的积分
        public get my_score(): number {
            let info = this._model.pvp_scene_info;
            return info && info.my_score || 0;
        }

        //已领取的奖励id
        public get score_index(): number[] {
            return this._model.index || [];
        }

        //战报
        public get report_list(): msg.xianjie_pvp_battle_report[] {
            return this._model.report_list || [];
        }

        //战场统计
        public get scene_rank(): msg.xianjie_pvp_scene_score_info[] {
            return this._model.scene_rank || [];
        }

        //战场统计，我的
        public get scene_my_rank(): msg.xianjie_pvp_scene_score_info {
            return this._model.scene_my_rank || null;
        }

        //战场统计选中的类型
        public set sel_scene_rank(type: RankCommonType2) {
            this._model.sel_scene_rank = type;
        }

        public get sel_scene_rank(): RankCommonType2 {
            return this._model.sel_scene_rank;
        }

        //怪物配置列表，灵石类型1在中间（2,3,1,4,5）
        public get bossCfgList(): XianjiebrawlBaseConfig[] {
            if (this._model.bossCfgList && this._model.bossCfgList.length > 0) {
                return this._model.bossCfgList;
            }
            let cfgs: XianjiebrawlBaseConfig[] = getConfigListByName(ConfigName.XianjieLuandouBase);
            let list: XianjiebrawlBaseConfig[] = [];
            for (let cfg of cfgs) {
                let type = cfg.lingshi_type;
                list[type - 1] = cfg;
            }
            let rst = [].concat(list.slice(1, 3), list[0], list.slice(3));
            return this._model.bossCfgList = rst;
        }

        //怪物id列表
        public get bossIdxList(): number[] {
            if (this._model.bossIdxList && this._model.bossIdxList.length > 0) {
                return this._model.bossIdxList;
            }
            let cfgs: XianjiebrawlBaseConfig[] = this.bossCfgList;
            let list: number[] = [];
            for (let cfg of cfgs) {
                list.push(cfg.monster_index[0]);
            }
            return this._model.bossIdxList = list;
        }

        //boss信息
        public get boss_list(): { [index: number]: xianjie_pvp_boss_info } {
            return this._model.boss_list;
        }

        //boss是否全部死亡
        public get boss_all_died(): boolean {
            let list = this.boss_list;
            if (!list) {
                return true;
            }
            for (let key in list) {
                let item = list[key];
                if (item && item.percent > 0) {
                    return false;
                }
            }
            return true;
        }

        //怪物血量
        public getBossHp(idx: number): number {
            let list = this.boss_list;
            let info = list[idx];
            return info && info.percent || 0;
        }

        //获取boss信息
        public getBossInfo(idx: number): xianjie_pvp_boss_info {
            let list = this.boss_list;
            return list && list[idx] || null;
        }

        //中央灵石boss归属者信息
        public get owner_info(): teammate {
            return this._model.owner_info;
        }

        //夺得的灵石数
        public get boss_kill_count(): number {
            let info = this._model.pvp_scene_info;
            return info && info.boss_kill_count || 0;
        }

        //玩家的宗门参与人数
        public get guild_count(): number {
            let info = this._model.pvp_scene_info;
            return info && info.guild_count || 0;
        }

        //击破灵石提示
        public get kill_boss_info(): s2c_xianjie_pvp_kill_boss_info {
            return this._model.kill_boss_info;
        }

        public set kill_boss_info(data: s2c_xianjie_pvp_kill_boss_info) {
            this._model.kill_boss_info = data;
        }

        //技能cd时间
        public getSkillCd(index: number): number {
            let info = this._model.skill_cds[index];
            let endTime = info && info.cd_time ? info.cd_time.toNumber() : 0;
            if (endTime <= TimeMgr.time.serverTimeSecond) {
                return 0;
            }
            return endTime;
        }

        //有技能cd倒计时
        public haveSkillCd(): boolean {
            let info = this._model.skill_cds;
            return Object.keys(info).length > 0;
        }

        //仙界乱斗积分
        public getScoreCfgList(): XianjiebrawlScoreConfig[] {
            return getConfigListByName(ConfigName.XianjieLuandouScore);
        }

        //积分奖励红点
        public getScoreRewardHint(): boolean {
            let cfgList = this.getScoreCfgList();
            let indexs = this.score_index;
            let myScore = this.my_score;
            for (let cfg of cfgList) {
                if (indexs.indexOf(cfg.index) > -1) {
                    continue;
                }
                if (myScore >= cfg.scroe) {
                    return true;
                }
            }
            return false;
        }

        public getRankInfo(rankNo: number): teammate {
            let ranks = this.rank;
            return ranks && ranks[rankNo - 1] || null;
        }

        //排行榜数据
        public getRankRewardData(): RankRewardRenderData[] {
            let cfgs: XianjiebrawlRankConfig[] = getConfigListByName(ConfigName.XianjieLuandouRank);
            let list: RankRewardRenderData[] = [];
            for (let i = 0; i < cfgs.length; i++) {
                let cfg = cfgs[i];
                let section = cfg.rank_section;
                let rankStr: string;
                let name: string = '';
                let hurtStr: string = '';
                let lookHandler: Handler;
                if (section[0] == section[1]) {
                    let mate = this.getRankInfo(i + 1);
                    rankStr = section[0] + '';
                    if (mate) {
                        name = mate && mate.name;
                        hurtStr = mate.value && mate.value.toString();
                    } else {
                        name = getLanById(LanDef.tishi_2);
                    }
                } else if (i == cfgs.length - 1) {
                    rankStr = (section[0] - 1) + '+';
                } else {
                    rankStr = `${section[0]}-${section[1]}`;
                    lookHandler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianjieLuandouRankSection, section);
                    });
                }

                let data: RankRewardRenderData = {
                    rank: rankStr,
                    name: name,
                    hurtStr: hurtStr,
                    reward: cfg.reward,
                    lookHandler: lookHandler
                };
                list.push(data);
            }
            return list;
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianjieLuandou)) {
                return;
            }
            let hint = this.isOpen;
            HintMgr.setHint(hint, this._model.hintPath);
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let indexs = n.body as number[];
            if (indexs.indexOf(OpenIdx.XianjieLuandou) > -1) {
                this.updateHint();
            }
        }
    }
}