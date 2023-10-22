namespace game.mod.more {

    // import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import ParamConfig = game.config.ParamConfig;
    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    import c2s_guild_pk_root = msg.c2s_guild_pk_root;
    import c2s_guild_pk_team_show = msg.c2s_guild_pk_team_show;
    import s2c_guild_pk_root = msg.s2c_guild_pk_root;
    import s2c_guild_pk_team_show = msg.s2c_guild_pk_team_show;
    import c2s_guild_pk_team_slide = msg.c2s_guild_pk_team_slide;
    import s2c_guild_pk_team_slide = msg.s2c_guild_pk_team_slide;
    import c2s_guild_pk_lineup_show = msg.c2s_guild_pk_lineup_show;
    import c2s_guild_pk_zhanbao = msg.c2s_guild_pk_zhanbao;
    import s2c_guild_pk_zhanbao = msg.s2c_guild_pk_zhanbao;
    import c2s_guild_pk_oper = msg.c2s_guild_pk_oper;
    import s2c_guild_pk_oper = msg.s2c_guild_pk_oper;
    import guild_pk_base = msg.guild_pk_base;
    import s2c_guild_pk_lineup_show = msg.s2c_guild_pk_lineup_show;
    import c2s_guild_pk_fight_show = msg.c2s_guild_pk_fight_show;
    import s2c_guild_pk_fight_show = msg.s2c_guild_pk_fight_show;
    import s2c_guild_pk_ret = msg.s2c_guild_pk_ret;

    export class CrossUnionProxy extends ProxyBase {
        private _model: CrossUnionModel;

        initialize(): void {
            super.initialize();
            this._model = new CrossUnionModel();

            this.onProto(s2c_guild_pk_root, this.s2c_guild_pk_root, this);
            this.onProto(s2c_guild_pk_team_show, this.s2c_guild_pk_team_show, this);
            this.onProto(s2c_guild_pk_team_slide, this.s2c_guild_pk_team_slide, this);
            this.onProto(s2c_guild_pk_zhanbao, this.s2c_guild_pk_zhanbao, this);
            this.onProto(s2c_guild_pk_oper, this.s2c_guild_pk_oper, this);
            this.onProto(s2c_guild_pk_lineup_show, this.s2c_guild_pk_lineup_show, this);
            this.onProto(s2c_guild_pk_fight_show, this.s2c_guild_pk_fight_show, this);
            this.onProto(s2c_guild_pk_ret, this.s2c_guild_pk_ret, this);
        }

        /**------------------------协议------------------------- */

        public c2s_guild_pk_root(): void {
            let msg: c2s_guild_pk_root = new c2s_guild_pk_root();
            this.sendProto(msg);
        }

        public c2s_guild_pk_team_show(type: number): void {
            let msg: c2s_guild_pk_team_show = new c2s_guild_pk_team_show();
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_guild_pk_team_slide(type: number, start_pos: number, end_pos: number): void {
            let msg: c2s_guild_pk_team_slide = new c2s_guild_pk_team_slide();
            msg.type = type;
            msg.start_pos = start_pos;
            msg.end_pos = end_pos;
            this.sendProto(msg);
        }

        public c2s_guild_pk_lineup_show(): void {
            let msg: c2s_guild_pk_lineup_show = new c2s_guild_pk_lineup_show();
            this.sendProto(msg);
        }

        public c2s_guild_pk_zhanbao(): void {
            let msg: c2s_guild_pk_zhanbao = new c2s_guild_pk_zhanbao();
            this.sendProto(msg);
        }

        /**1.报名2.加入队伍3.调整位置4.领取奖励(胜败奖励)5.领取观战奖励6.进入战斗场景 */
        public c2s_guild_pk_oper(oper: number, index?: number, start_id?: Long, end_id?: Long): void {
            let msg: c2s_guild_pk_oper = new c2s_guild_pk_oper();
            msg.oper = oper;
            if (index !== null) {
                msg.index = index;
            }
            if (start_id !== null) {
                msg.start_id = start_id;
            }
            if (end_id !== null) {
                msg.end_id = end_id;
            }
            this.sendProto(msg);
        }

        public c2s_guild_pk_fight_show(team_index: number): void {
            let msg: c2s_guild_pk_fight_show = new c2s_guild_pk_fight_show();
            msg.team_index = team_index;
            this.sendProto(msg);
        }

        private s2c_guild_pk_root(n: GameNT): void {
            let msg: s2c_guild_pk_root = n.body;
            this._model.is_join = msg.is_join || false;
            // this._model.status = msg.status || 0;
            // this._model.ret = msg.ret || 0;
            this.resetResult(msg.status, msg.ret);
            if (msg.hasOwnProperty("is_guild_join")) {
                this._model.is_guild_join = msg.is_guild_join;
            }
            let openView: string = this.openView;
            if (openView != MoreViewType.CrossUnionReady) {
                ViewMgr.getIns().showView(ModName.More, openView, null, false);
            }
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_READY_INFO);
        }

        /**备战界面 显示外显列表 */
        private s2c_guild_pk_team_show(n: GameNT): void {
            let msg: s2c_guild_pk_team_show = n.body;
            if (msg.my_base) {
                this._model.my_base = msg.my_base;
            }
            if (msg.target_base) {
                this._model.target_base = msg.target_base;
            }
            // if (msg.status) {
            //     this._model.status = msg.status;
            // }
            // if (msg.ret) {
            //     this._model.ret = msg.ret;
            // }
            this.resetResult(msg.status, msg.ret);
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_INFO);

            if (msg.team_list) {
                let list = this.getMap(msg.type)
                for (let team of msg.team_list) {
                    let team_index: number = team.team_index;
                    let map = list.get(team_index);
                    if (map) {
                        map.clear();
                    } else {
                        map = new Map();
                    }
                    for (let info of team.list) {
                        map.set(info.index, info);
                    }
                    list.set(team_index, map);
                }
                this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_LIST_RESET_INFO, msg.type);
            }
        }

        /**调整阵型主界面显示 */
        private s2c_guild_pk_lineup_show(n: GameNT): void {
            let msg: s2c_guild_pk_lineup_show = n.body;
            if (msg.team_list) {
                for (let team_list of msg.team_list) {
                    this._model.team_list.set(team_list.team_index, team_list);
                }
            }
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_TEAM_LIST_INFO);
        }

        /**滑动加载 */
        private s2c_guild_pk_team_slide(n: GameNT): void {
            let msg: s2c_guild_pk_team_slide = n.body;
            if (msg.team_list) {
                let list = this.getMap(msg.type)
                for (let team of msg.team_list) {
                    let team_index: number = team.team_index;
                    let map = list.get(team_index);
                    if (!map) {
                        map = new Map();
                    }
                    for (let info of team.list) {
                        map.set(info.index, info);
                    }
                }
            }
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_LIST_INFO, msg.type);
        }

        private s2c_guild_pk_zhanbao(n: GameNT): void {
            let msg: s2c_guild_pk_zhanbao = n.body;
            if (msg.list) {
                this._model.zhanbao = msg.list;
            }
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_ZHANBAO_INFO);
        }

        private s2c_guild_pk_oper(n: GameNT): void {
            let msg: s2c_guild_pk_oper = n.body;
            switch (msg.oper) {
                case 1:
                    this._model.is_join = true;
                    // this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_READY_INFO);
                    this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_OVER_VIEW);
                    break;
                case 2:
                    if (this.camp == CrossUnionType.Own) {
                        this.c2s_guild_pk_team_show(CrossUnionType.Own);
                    }
                    break;
                case 3:
                    let team_index: number = msg.lineup_list.team_index;
                    if (this._model.team_list.has(team_index)) {
                        this._model.team_list.delete(team_index);
                    }
                    this._model.team_list.set(team_index, msg.lineup_list);
                    this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_TEAM_LIST_INFO);
                    break;
                case 4:
                    // this._model.status = msg.status;
                    // if (this.openState == CrossUnionOpenState.Ready) {
                    //     this._model.ret = 0;
                    // }
                    this.resetResult(msg.status);
                    this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_READY_INFO);
                    break;
                // case 5:
                //     // TODO:观看奖励
                //     break;
                case 7:
                    break;
            }
        }

        private s2c_guild_pk_fight_show(n: GameNT): void {
            let msg: s2c_guild_pk_fight_show = n.body;
            this._model.fight_infos.set(msg.team_index, msg);
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_FIGHT_INFO);
        }

        private s2c_guild_pk_ret(n: GameNT): void {
            let msg: s2c_guild_pk_ret = n.body;
            this._model.ret = msg.is_win ? 1 : 2;
            this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_OVER_VIEW, msg);
        }

        /**------------------------协议------------------------- */

        /**-----------------------数据逻辑---------------------- */

        public getFightInfos(index: number): s2c_guild_pk_fight_show {
            return this._model.fight_infos.get(index) || null;
        }

        public getTeamInfo(type: number): guild_pk_base {
            if (type == CrossUnionType.Own) {
                return this._model.my_base;
            } else {
                return this._model.target_base;
            }
        }

        public getTeamList(index: number): CrossUnionFormatData[] {
            let list: CrossUnionFormatData[] = [];
            if (!index) {
                let team_lists: msg.guild_pk_lineup_base[] = Array.from(this._model.team_list.values());
                for (let team_list of team_lists) {
                    // list.concat(team_list.members);
                    for (let info of team_list.members) {
                        list.push({ team: index, info });
                    }
                }
                return list;
            }
            if (this._model.team_list.has(index)) {
                let infos = this._model.team_list.get(index);
                for (let info of infos.members) {
                    list.push({ team: index, info })
                }
                return list;
            }
            return list;
        }

        /**全部队伍的列表 */
        public getList(type: number): teammate[] {
            let list: teammate[] = [];
            let map = this.getMap(type);
            let teams: number = 4;
            for (let i = 1; i <= teams; i++) {
                let map_list: Map<number, teammate> = map.get(i) || new Map();
                let keys: number[] = Array.from(map_list.keys());
                for (let key of keys) {
                    let info: teammate = map_list.get(key);
                    /**获取索引 */
                    let pos: number = (key - 1) * 4 + (i - 1);
                    list[pos] = info;
                }
            }
            return list;
        }

        public get team_list_data(): { team_index: number, power: number, count: number }[] {
            let list: { team_index: number, power: number, count: number }[] = [];
            let team_lists: msg.guild_pk_lineup_base[] = Array.from(this._model.team_list.values());
            let teams: number = 4;
            // for (let team_list of teams) {
            for (let i = 0; i < teams; i++) {
                let team_list = team_lists[i];
                let power: number = 0;
                let count: number = 0;
                if (team_list) {
                    for (let info of team_list.members) {
                        power += info.power.toNumber();
                        count++;
                    }
                }
                list.push({ team_index: i + 1, power, count });
            }
            return list;
        }

        public get openHours(): number {
            return this._model.openHours;
        }

        public get openDays(): number[] {
            // return this._model.openDays;
            let list: number[] = [];
            for (let data of this.guild_pk_open) {
                list.push(data[0]);
            }
            return list;
        }

        public get openState(): CrossUnionOpenState {
            let ms: number = TimeMgr.time.serverTimeSecond * 1000;
            let day: number = TimeUtil.formatWeekday(ms);
            //开启阶段
            if (this.openDays.indexOf(day) > -1) {
                let hour: number = TimeUtil.formatHours(ms);
                if (hour >= this.openHours) {
                    return CrossUnionOpenState.Open;
                }
                return CrossUnionOpenState.Match;
            }
            //非开启阶段
            // for (let openDay of this.openDays) {
            //     if (openDay - 1 == day) {
            //         return CrossUnionOpenState.Match;
            //     }
            // }
            let len: number = this.openDays.length;
            for (let i = 0; i < len; i++) {
                if (day >= this.guild_mate_time[i] && day <= this.openDays[i] - 1) {
                    return CrossUnionOpenState.Match;
                }
            }
            return CrossUnionOpenState.Ready;
        }

        /**判断开启界面 */
        public get openView(): string {
            if (!this.is_join) {//没有报名
                return MoreViewType.CrossUnionReady;
            }
            if (this.ret) { //报名了战斗结束
                return MoreViewType.CrossUnionReady;
            }
            return MoreViewType.CrossUnion;
        }

        /**匹配开始时间 */
        public get matchTime(): number {
            if (this.openState == CrossUnionOpenState.Ready) {
                let ms: number = TimeMgr.time.serverTimeSecond * 1000;
                let day: number = TimeUtil.formatWeekday(ms);
                for (let openDay of this.openDays) {
                    if (day < openDay) {
                        return TimeUtil.getNextDayTime(ms, true, openDay - 1 - day);
                    }
                }
            }
            return 0;
        }

        /**战斗开始时间 */
        public get openTime(): number {
            if (this.openState != CrossUnionOpenState.Open) {
                let ms: number = TimeMgr.time.serverTimeSecond * 1000;
                let day: number = TimeUtil.formatWeekday(ms);
                for (let openDay of this.openDays) {
                    if (day < openDay) {
                        return TimeUtil.getNextDayTime(ms, true, openDay - day) + this.openHours * Second.Hour;
                    } else if (day == openDay) {
                        return TimeUtil.getNextDayTime(ms, true, 1) - 4 * Second.Hour;
                    }
                }
            }
            return 0;
        }

        public set select(v: number | Long) {
            this._model.select = v;
            if (this._model.select) {
                this.sendNt(MoreEvent.ON_UPDATE_CROSS_UNION_SELECT_INFO);
            }
        }

        public get select(): number | Long {
            return this._model.select || 0;
        }

        public get is_join(): boolean {
            return this._model.is_join;
        }

        public get status(): number {
            return this._model.status || 0;
        }

        public get ret(): number {
            return this._model.ret || 0;
        }

        public get is_guild_join(): boolean {
            return this._model.is_guild_join;
        }

        public set camp(v: number) {
            this._model.camp = v;
        }

        public get camp(): number {
            return this._model.camp;
        }

        public getMap(type: number): Map<number, Map<number, teammate>> {
            if (type == CrossUnionType.Own) {
                return this._model.list;
            } else {
                return this._model.list_emeny;
            }
        }

        public get team_oper(): boolean {
            let cfg: game.config.GuildJobDataConfig = getConfigByNameId(ConfigName.GuildJobData, RoleUtil.getGuildJob());
            return cfg && !!cfg.guild_pk;
        }

        public get zhanbao(): msg.guild_pk_zhanbao[] {
            return this._model.zhanbao || [];
        }

        public resetResult(status: number, ret: number = 0): void {
            this._model.status = status || 0;
            switch (this.openState) {
                case CrossUnionOpenState.Ready:
                case CrossUnionOpenState.Match:
                    this._model.ret = status == 2 ? 0 : ret;
                    break;
                default:
                    this._model.ret = ret;
                    break;
            }
        }

        /**-----------------------数据逻辑---------------------- */

        /**-------------------------参数表配置------------------------ */

        public getRewards(ret: number): number[][] {
            if (ret == 1) {
                return this.guild_pk_win_rewar;
            } else {
                return this.guild_pk_lose;
            }
        }

        public get guild_pk_win_rewar(): number[][] {
            if (!this._model.guild_pk_win_rewar) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_pk_win_rewar");
                this._model.guild_pk_win_rewar = param.value;
            }
            return this._model.guild_pk_win_rewar;
        }

        public get guild_pk_lose(): number[][] {
            if (!this._model.guild_pk_lose) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_pk_lose");
                this._model.guild_pk_lose = param.value;
            }
            return this._model.guild_pk_lose;
        }

        public get guild_pk_show(): number[][] {
            if (!this._model.guild_pk_show) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_pk_show");
                this._model.guild_pk_show = param.value;
            }
            return this._model.guild_pk_show;
        }

        public get guild_pk_see_reward(): number[][] {
            if (!this._model.guild_pk_see_reward) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_pk_see_reward");
                this._model.guild_pk_see_reward = param.value;
            }
            return this._model.guild_pk_see_reward;
        }

        public get guild_pk_open(): number[][] {
            if (!this._model.guild_pk_open) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_pk_open");
                this._model.guild_pk_open = param.value;
            }
            return this._model.guild_pk_open;
        }

        public get guild_mate_time(): number[] {
            if (!this._model.guild_mate_time) {
                let param: ParamConfig = GameConfig.getParamConfigById("guild_mate_time");
                this._model.guild_mate_time = param.value;
            }
            return this._model.guild_mate_time;
        }

        /**-------------------------参数表配置------------------------ */

        /**------------------------红点-------------------------*/

        /**------------------------红点-------------------------*/
    }

}