namespace game.mod.more {

    import GameNT = base.GameNT;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;
    import xianwei_log_data = msg.xianwei_log_data;
    import xianwei_place_data = msg.xianwei_place_data;
    import xianwei_reward_data = msg.xianwei_reward_data;
    import xianwei_member_data = msg.xianwei_member_data;
    import c2s_xianwei_buy_time = msg.c2s_xianwei_buy_time;
    import s2c_xianwei_buy_time = msg.s2c_xianwei_buy_time;
    import XianweiBaseConfig = game.config.XianweiBaseConfig;
    import c2s_xianwei_root_show = msg.c2s_xianwei_root_show;
    import s2c_xianwei_root_show = msg.s2c_xianwei_root_show;
    import c2s_xianwei_challenge = msg.c2s_xianwei_challenge;
    import c2s_xianwei_rank_show = msg.c2s_xianwei_rank_show;
    import s2c_xianwei_rank_show = msg.s2c_xianwei_rank_show;
    import c2s_xianwei_branch_show = msg.c2s_xianwei_branch_show;
    import s2c_xianwei_branch_show = msg.s2c_xianwei_branch_show;
    import xianwei_common_log_data = msg.xianwei_common_log_data;
    import c2s_xianwei_zhanbao_show = msg.c2s_xianwei_zhanbao_show;
    import s2c_xianwei_zhanbao_show = msg.s2c_xianwei_zhanbao_show;
    import XianweiRankRewardConfig = game.config.XianweiRankRewardConfig;

    export class XianweiProxy extends ProxyBase {
        private _model: XianweiModel;

        initialize(): void {
            super.initialize();
            this._model = new XianweiModel();

            this.onProto(s2c_xianwei_root_show, this.s2c_xianwei_root_show, this);
            this.onProto(s2c_xianwei_buy_time, this.s2c_xianwei_buy_time, this);
            this.onProto(s2c_xianwei_branch_show, this.s2c_xianwei_branch_show, this);
            this.onProto(s2c_xianwei_zhanbao_show, this.s2c_xianwei_zhanbao_show, this);
            this.onProto(s2c_xianwei_rank_show, this.s2c_xianwei_rank_show, this);
        }

        public c2s_xianwei_root_show(): void {
            let msg: c2s_xianwei_root_show = new c2s_xianwei_root_show();
            this.sendProto(msg);
        }

        public c2s_xianwei_buy_time(): void {
            let msg: c2s_xianwei_buy_time = new c2s_xianwei_buy_time();
            this.sendProto(msg);
        }

        public c2s_xianwei_branch_show(stage: number, index: number): void {
            let msg: c2s_xianwei_branch_show = new c2s_xianwei_branch_show();
            msg.stage = stage;
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_xianwei_zhanbao_show(): void {
            let msg: c2s_xianwei_zhanbao_show = new c2s_xianwei_zhanbao_show();
            this.sendProto(msg);
        }

        public c2s_xianwei_challenge(stage: number, index: number, pos: number): void {
            let msg: c2s_xianwei_challenge = new c2s_xianwei_challenge();
            msg.stage = stage;
            msg.index = index;
            msg.pos = pos;
            this.sendProto(msg);
        }

        public c2s_xianwei_rank_show(): void {
            let msg: c2s_xianwei_rank_show = new c2s_xianwei_rank_show();
            this.sendProto(msg);
        }

        private s2c_xianwei_root_show(n: GameNT): void {
            let msg: s2c_xianwei_root_show = n.body;
            if (msg.list) {
                for (let info of msg.list) {
                    this._model.list.set(`${info.stage}_${info.index}`, info);
                }
            }
            this._model.my_place = msg.my_place || null;
            this._model.attack_time = msg.my_place && msg.my_place.attack_time || 0;
            if (msg.reward_data) {
                this.reward_data = msg.reward_data;
            }
            if (msg.log_list) {
                this._model.log_list = msg.log_list;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANWEI_INFO);
        }

        private s2c_xianwei_buy_time(n: GameNT): void {
            let msg: s2c_xianwei_buy_time = n.body;
            this._model.attack_time = msg.attack_time;
            this.sendNt(MoreEvent.ON_UPDATE_XIANWEI_CD_INFO);
        }

        private s2c_xianwei_branch_show(n: GameNT): void {
            let msg: s2c_xianwei_branch_show = n.body;
            if (msg.list) {
                this._model.member_list = msg.list;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANWEI_LIST_INFO);
        }

        private s2c_xianwei_zhanbao_show(n: GameNT): void {
            let msg: s2c_xianwei_zhanbao_show = n.body;
            if (msg.list) {
                this._model.zhanbao_list = msg.list;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANWEI_ZHANBAO_INFO);
        }

        private s2c_xianwei_rank_show(n: GameNT): void {
            let msg: s2c_xianwei_rank_show = n.body;
            if (msg.ranks) {
                this._model.ranks = msg.ranks;
            }
            if (msg.my_rank) {
                this._model.my_rank = msg.my_rank;
            }
            this.sendNt(MoreEvent.ON_UPDATE_XIANWEI_RANK_INFO);
        }

        // private s2c_update_xianwei_data(n: GameNT): void {
        //     let msg: s2c_update_xianwei_data = n.body;
        // }

        // public get cfgs(): Map<number, XianweiBaseConfig[]> {
        //     if (!this._model.cfgs) {
        //         let cfgArr = getConfigListByName(ConfigName.XianweiBase);
        //         for (let k in cfgArr) {
        //             let cfgs: { [key: number]: XianweiBaseConfig } = cfgArr[k];
        //             let list: XianweiBaseConfig[] = [];
        //             for (let k2 in cfgs) {
        //                 let cfg: XianweiBaseConfig = cfgs[k2];
        //                 list.push(cfg);
        //             }
        //             this._model.cfgs.set(+k, list)
        //             console.error(cfgs);
        //         }
        //     }
        //     return this._model.cfgs;
        // }

        public get reward_data(): xianwei_reward_data {
            return this._model.reward_data || null;
        }

        public set reward_data(v: xianwei_reward_data) {
            this._model.reward_data = v;
        }

        public get attack_time(): number {
            return this._model.attack_time;
        }

        public get zhanbao_list(): xianwei_log_data[] {
            return this._model.zhanbao_list || [];
        }

        public get member_list(): xianwei_member_data[] {
            return this._model.member_list || [];
        }

        public get ranks(): teammate[] {
            return this._model.ranks;
        }

        public get my_rank(): teammate {
            return this._model.my_rank;
        }

        public get is_open(): boolean {
            let week: number = TimeUtil.getServerTime().getDay() || 7;
            let hours: number = TimeUtil.getServerTime().getHours();
            for (let i = 0; i < this.xianwei_act.length; i++) {
                let time = this.xianwei_act[i];
                if (week != time[0]) {
                    return true;
                }
                if (!i) {
                    return hours >= time[1];
                }
                return hours < time[1];
            }
            return false;
        }

        public get open_time(): number {
            let next_week: number = TimeUtil.getNextWeekTime();
            return next_week - Second.Hour;
        }

        /**开启时返回结束时间 未开启返回开启时间 */
        public get end_time(): number {
            let next_week: number = TimeUtil.getNextWeekTime();
            // if (this.is_open) {
            //     return next_week - Second.Hour;
            // }
            let week: number = TimeUtil.getServerTime().getDay() || 7;
            if (week == 7) {
                return next_week + this.xianwei_act[0][1] * Second.Hour;
            }
            let time = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false);
            return time + this.xianwei_act[0][1] * Second.Hour;
        }

        public get log_list(): xianwei_common_log_data[] {
            return this._model.log_list;
        }

        public get xianwei_act(): number[][] {
            if (!this._model.xianwei_act) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianwei_act");
                this._model.xianwei_act = param.value;
            }
            return this._model.xianwei_act;
        }

        public get my_place(): xianwei_place_data {
            return this._model.my_place;
        }

        public checkJob(key: string): boolean {
            if (!this.my_place) {
                return false;
            }
            let info = this.my_place;
            let my_key: string = `${info.stage}_${info.index}`;
            return my_key == key;
        }

        public get list(): Map<string, xianwei_member_data> {
            return this._model.list;
        }

        public get cfgArr(): Map<string, XianweiBaseConfig> {
            if (!this._model.cfgArr || !this._model.cfgArr.size) {
                let cfgArr = getConfigListByName(ConfigName.XianweiBase);
                for (let k in cfgArr) {
                    let cfgs: { [key: number]: XianweiBaseConfig } = cfgArr[k];
                    for (let k2 in cfgs) {
                        this._model.cfgArr.set(`${+k + 1}_${k2}`, cfgs[k2]);
                    }
                }
            }
            return this._model.cfgArr;
        }

        public get xianwei_buy_time(): number[] {
            if (!this._model.xianwei_buy_time) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianwei_buy_time");
                this._model.xianwei_buy_time = param.value;
            }
            return this._model.xianwei_buy_time;
        }

        public getRankName(item: teammate): string {
            if (!item) {
                return getLanById(LanDef.tishi_2);
            }
            return item.name;
        }

        public getRanks(): RankRewardRenderData[] {
            let ranks = this.ranks;
            let cfgArr: XianweiRankRewardConfig[] = getConfigListByName(ConfigName.XianweiRankReward);
            let list: RankRewardRenderData[] = [];
            for (let cfg of cfgArr) {
                if (cfg.rank_no.length == 1) {
                    let item = ranks && ranks[cfg.rank_no[0] - 1];
                    let name: string = this.getRankName(item);
                    list.push({
                        rank: cfg.rank_no[0],
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: cfg.reward
                    })
                } else {
                    let start: number = cfg.rank_no[0];
                    let end: number = cfg.rank_no[1];
                    let more: boolean = start > MAX_RANK_NUM;
                    let rank: string = more ? `${start - 1}+` : `${start}-${end}`;
                    let lookHandler: Handler = Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XianweiSection, { rank })
                    })
                    list.push({
                        rank,
                        name: "",
                        reward: cfg.reward,
                        lookHandler: !more && lookHandler
                    })
                }
            }
            return list;
        }

        public getRankStr(): string {
            let info: teammate = this.my_rank;
            if (!info || !info.rank_num) {
                let param: ParamConfig = getConfigByNameId(ConfigName.Param, "xianwei_rank_score");
                // TODO:LanDef.guild_tips14
                return StringUtil.substitute(getLanById(LanDef.guild_tips14), [param.value]);
            } else {
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                let content: string = getLanById(LanDef.compete_mars_4);
                return StringUtil.substitute(content, [str]);
            }
        }

        public getRankCountStr(): string {
            let info: teammate = this.my_rank;
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            return `战神积分：${str}`;
        }

        public getRankSection(rank: string): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let start: number = +strArr[0];
            let end: number = +strArr[1];
            let ranks: teammate[] = this.ranks;
            let list: IRankSectionData[] = [];
            for (let i = start - 1; i < end; i++) {
                let item = ranks && ranks[i];
                let name: string = this.getRankName(item);
                if (item) {
                    list.push({ rank: item.rank_num, name, value: +item.value });
                } else {
                    list.push({ rank: i + 1, name, value: 0 });
                }
            }
            return list;
        }


    }
}