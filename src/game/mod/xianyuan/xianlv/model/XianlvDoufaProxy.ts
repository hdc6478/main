namespace game.mod.xianyuan {

    import s2c_xianlv_pvp_base_info = msg.s2c_xianlv_pvp_base_info;
    import s2c_xianlv_pvp_rank_info = msg.s2c_xianlv_pvp_rank_info;
    import s2c_xianlv_pvp_challenge_info = msg.s2c_xianlv_pvp_challenge_info;
    import s2c_xianlv_pvp_nianya_win = msg.s2c_xianlv_pvp_nianya_win;
    import c2s_xianlv_pvp_challenge = msg.c2s_xianlv_pvp_challenge;
    import c2s_xianlv_pvp_oper = msg.c2s_xianlv_pvp_oper;
    import GameNT = base.GameNT;
    import teammate = msg.teammate;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import XianlvdoufaRewardConfig = game.config.XianlvdoufaRewardConfig;
    import Handler = base.Handler;
    import facade = base.facade;

    export class XianlvDoufaProxy extends ProxyBase {
        private _model: XianlvDoufaModel;

        initialize(): void {
            super.initialize();
            this._model = new XianlvDoufaModel();

            this.onProto(s2c_xianlv_pvp_base_info, this.s2c_xianlv_pvp_base_info, this);
            this.onProto(s2c_xianlv_pvp_rank_info, this.s2c_xianlv_pvp_rank_info, this);
            this.onProto(s2c_xianlv_pvp_challenge_info, this.s2c_xianlv_pvp_challenge_info, this);
            this.onProto(s2c_xianlv_pvp_nianya_win, this.s2c_xianlv_pvp_nianya_win, this);
        }

        /**1 基础信息 3 入场 4 一键领取奖励(s2c_xianlv_pvp_base_info) 2 排行信息(s2c_xianlv_pvp_rank_info)  */
        public c2s_xianlv_pvp_oper(type: number): void {
            let msg: c2s_xianlv_pvp_oper = new c2s_xianlv_pvp_oper();
            msg.type = type;
            this.sendProto(msg);
        }

        /**1 开始匹配 2 开始战斗 3 自动战斗 */
        public c2s_xianlv_pvp_challenge(type: number): void {
            let msg: c2s_xianlv_pvp_challenge = new c2s_xianlv_pvp_challenge();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_xianlv_pvp_base_info(n: GameNT): void {
            let msg: s2c_xianlv_pvp_base_info = n.body;
            this._model.count = msg.count || 0;
            this._model.buy_count = msg.buy_count || 0;
            this._model.reward = msg.reward || 0;
            this._model.max_win_count = msg.max_win_count || 0;

            if (msg.hasOwnProperty("total_count") && msg.hasOwnProperty("total_score")) {
                this._model.total_count = msg.total_count;
                this._model.total_score = msg.total_score;
                this.show_tips = true;
            }
            this.onUpdateHint();
            this.checkAutoChallengeDoufa();
            this.sendNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_INFO);
        }

        private s2c_xianlv_pvp_rank_info(n: GameNT): void {
            let msg: s2c_xianlv_pvp_rank_info = n.body;
            if (msg.my_rank) {
                this._model.my_rank = msg.my_rank;
            }
            if (msg.geren_rank) {
                this._model.geren_rank = msg.geren_rank;
            }
            if (msg.first_info) {
                this._model.first_info = msg.first_info;
            }
            this.sendNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_RANK);
        }

        private s2c_xianlv_pvp_challenge_info(n: GameNT): void {
            let msg: s2c_xianlv_pvp_challenge_info = n.body;
            if (!msg.is_success) {
                this.auto = false;
                PromptBox.getIns().show("匹配失败,请重新开始挑战");
                this.resetAutoChallengeDoufa();
                return;
            }
            let myData = {name: RoleVo.ins.name, sex: RoleVo.ins.sex, showpower: RoleVo.ins.showpower};
            if (msg.player_info) {
                this._model.player_info = msg.player_info;
                ViewMgr.getIns().showCommonMatch({
                    type: 2,
                    players: [myData, RoleUtil.getBanlvInfo()],
                    enemys: msg.player_info,
                    handler: base.Handler.alloc(this, () => {
                        this.c2s_xianlv_pvp_challenge(2);
                    })
                });
            }
            this.sendNt(XianyuanEvent.ON_UPDATE_XIANLV_DOUFA_AUTO, true);
        }

        private s2c_xianlv_pvp_nianya_win(n: GameNT): void {
            let msg: s2c_xianlv_pvp_nianya_win = n.body;
            ViewMgr.getIns().showSecondPop(ModName.Xianyuan, XianyuanViewType.XianlvDoufaWin, msg);
        }

        /**----------------------- 数据 --------------------------- */

        public get count(): number {
            return this._model.count || 0;
        }

        public set auto(v: boolean) {
            this._model.auto = v;
        }

        public get auto(): boolean {
            return this._model.auto;
        }

        public get my_rank(): teammate {
            return this._model.my_rank;
        }

        public get ranks(): teammate[] {
            return this._model.geren_rank || [];
        }

        public get first_info(): teammate[] {
            return this._model.first_info || [];
        }

        public get player_info(): teammate[] {
            return this._model.player_info;
        }

        public getRankList(): RankRewardRenderData[] {
            let ranks = this.ranks;
            let cfgArr: game.config.XianlvdoufaRankConfig[] = getConfigListByName(ConfigName.XianlvDoufaRank);
            let list: RankRewardRenderData[] = [];
            for (let k in cfgArr) {
                let cfg = cfgArr[k];
                let start: number = cfg.ranks[0];
                let end: number = cfg.ranks[1];
                if (start == end) {
                    let item = ranks && ranks[start - 1];
                    let name: string = this.getRankItemName(item);
                    list.push({
                        rank: start,
                        name,
                        hurtStr: item && item.value.toString() || "",
                        reward: cfg.rewards
                    });
                } else {
                    // let str: string = TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12),
                    // WhiteColor.DEFAULT, "");
                    let isMax: boolean = start > MAX_RANK_NUM;
                    let rank: string = isMax ? `${start - 1}+` : `${start}-${end}`;
                    let lookHandler: base.Handler = base.Handler.alloc(this, () => {
                        ViewMgr.getIns().showSecondPop(ModName.Xianyuan, XianyuanViewType.XianlvDoufaSection, {rank});
                    });
                    list.push({
                        rank,
                        // name: start > MAX_RANK_NUM ? "" : str,
                        name: "",
                        reward: cfg.rewards,
                        lookHandler: !isMax && lookHandler
                    });
                }
            }
            return list;
        }

        private getRankItemName(item: teammate): string {
            if (!item) {
                return getLanById(LanDef.tishi_2);
            }
            return `${item.name}\n${item.xianlv_name}`;
        }

        public getRankSection(rank: string): IRankSectionData[] {
            let strArr: string[] = rank.split("-");
            let start: number = +strArr[0];
            let end: number = +strArr[1];
            let ranks: teammate[] = this.ranks;
            let list: IRankSectionData[] = [];
            for (let i = start - 1; i < end; i++) {
                let item = ranks && ranks[i];
                let rank: number = item && item.rank_num || i + 1;
                let name: string = this.getRankItemName(item);
                let value: number = item && +item.value || 0;
                list.push({rank, name, value});
            }
            return list;
        }

        public getRankStr(): string {
            let info = this.my_rank;
            if (info && info.rank_num) {
                let str: string = TextUtil.addColor(`${info.rank_num}`, WhiteColor.GREEN);
                let lan: string = getLanById(LanDef.compete_mars_4);
                return StringUtil.substitute(lan, [str]);
            }
            let param: ParamConfig = GameConfig.getParamConfigById(`xianlvdoufa_rank`);
            return StringUtil.substitute(getLanById(LanDef.xianlvdoufa_tips4), [param.value]);
        }

        public getRankCountStr(): string {
            let info = this.my_rank;
            let str: string = TextUtil.addColor(`${info && info.value || 0}`, WhiteColor.GREEN);
            return StringUtil.substitute(getLanById(LanDef.fairy_my_point), [str]);
        }

        public set show_tips(v: boolean) {
            this._model.show_tips = v;
        }

        public get show_tips(): boolean {
            return this._model.show_tips;
        }

        public get total_score(): number {
            return this._model.total_score || 0;
        }

        public get total_count(): number {
            return this._model.total_count || 0;
        }

        public get reward(): number {
            return this._model.reward || 0;
        }

        public get max_win_count(): number {
            return this._model.max_win_count || 0;
        }

        public getRewardState(cfg: game.config.XianlvdoufaRewardConfig): ComRewardState {
            if (this.max_win_count >= cfg.win_time) {
                if (this.reward >= cfg.index) {
                    return ComRewardState.Done;
                } else {
                    return ComRewardState.Reward;
                }
            }
            return ComRewardState.NotReward;
        }

        public get buy_count(): number {
            return this.xianlvdoufa_buy - this._model.buy_count;
        }

        /**----------------------- 数据 --------------------------- */

        /**----------------------- 参数表 --------------------------- */
        public get xianlvdoufa_xiandeng(): number {
            if (!this._model.xianlvdoufa_xiandeng) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianlvdoufa_xiandeng");
                this._model.xianlvdoufa_xiandeng = param.value;
            }
            return this._model.xianlvdoufa_xiandeng;
        }

        public get xianlvdoufa_cost(): number[] {
            if (!this._model.xianlvdoufa_cost) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianlvdoufa_cost");
                this._model.xianlvdoufa_cost = param.value;
            }
            return this._model.xianlvdoufa_cost;
        }

        public get xianlvdoufa_buycost(): number[] {
            if (!this._model.xianlvdoufa_buycost) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianlvdoufa_buycost");
                this._model.xianlvdoufa_buycost = param.value;
            }
            return this._model.xianlvdoufa_buycost;
        }

        public get xianlvdoufa_rank(): number {
            if (!this._model.xianlvdoufa_rank) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianlvdoufa_rank");
                this._model.xianlvdoufa_rank = param.value;
            }
            return this._model.xianlvdoufa_rank;
        }

        public get xianlvdoufa_time(): number {
            if (!this._model.xianlvdoufa_time) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianlvdoufa_time");
                this._model.xianlvdoufa_time = param.value;
            }
            return this._model.xianlvdoufa_time;
        }

        public get xianlvdoufa_buy(): number {
            if (!this._model.xianlvdoufa_buy) {
                let param: ParamConfig = GameConfig.getParamConfigById("xianlvdoufa_buy");
                this._model.xianlvdoufa_buy = param.value;
            }
            return this._model.xianlvdoufa_buy;
        }

        /**----------------------- 参数表 --------------------------- */

        /**----------------------- 红点 --------------------------- */
        private onUpdateHint(): void {
            let roots: string[] = [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Zhanchang];
            if (!RoleUtil.getBanlvInfo()) {
                HintMgr.setHint(false, roots);
                return;
            }
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvZhanchang)) {
                return;
            }
            let cfgArr: XianlvdoufaRewardConfig[] = getConfigListByName(ConfigName.XianlvDoufaReward);
            for (let cfg of cfgArr) {
                let state: number = this.getRewardState(cfg);
                if (state == ComRewardState.Reward) {
                    HintMgr.setHint(true, roots);
                    return;
                }
            }

            let cnt: number = BagUtil.getPropCntByIdx(this.xianlvdoufa_cost[0]);
            if (cnt > 0 || this.count > 0) {
                HintMgr.setHint(true, roots);
                return;
            }
            HintMgr.setHint(false, roots);
        }

        /**----------------------- 红点 --------------------------- */

        /**============== 修仙女仆自动挂机 ==============*/

        private _sendAutoChallengeEnter = false;//入场标识

        private canAutoChallengeDoufa(): boolean {
            //没有伴侣
            if (!RoleUtil.getBanlvInfo()) {
                return false;
            }
            //可以挑战
            if (this.count > 0) {
                return true;
            }
            //可以入场
            if (this.count == 0) {
                return true;
            }
            return false;
        }

        private sendChallengeDoufa(): void {
            if (this.count) {
                this.c2s_xianlv_pvp_challenge(1);//开始匹配
            } else {
                this._sendAutoChallengeEnter = false;
                let cost = this.xianlvdoufa_cost;
                if (cost && BagUtil.checkPropCnt(cost[0], cost[1])) {
                    this._sendAutoChallengeEnter = true;
                    this.c2s_xianlv_pvp_oper(3);//入场
                }
            }
        }

        //伴侣信息变化
        protected onBanlvInfoUpdate(): void {
            this.onUpdateHint();
            this.checkAutoChallengeDoufa();
        }

        //7.仙侣斗法
        private checkAutoChallengeDoufa(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvZhanchang)) {
                return;
            }
            //突然离婚
            if (!RoleUtil.getBanlvInfo()) {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianlvdoufa, true);
                return;
            }
            //发了入场协议的，回调时候马上匹配战斗
            if (this._sendAutoChallengeEnter) {
                this._sendAutoChallengeEnter = false;
                this.sendChallengeDoufa();
                return;
            }
            if (this.canAutoChallengeDoufa()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Xianlvdoufa, Handler.alloc(this, this.sendChallengeDoufa));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianlvdoufa);
            }
        }

        //失败情况处理
        private resetAutoChallengeDoufa(): void {
            RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianlvdoufa);
            facade.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);
            this.checkAutoChallengeDoufa();
        }

        /**============== 修仙女仆自动挂机 ==============*/
    }
}