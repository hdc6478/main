namespace game.mod.xianyuan {

    import c2s_challenge_shilian = msg.c2s_challenge_shilian;
    import c2s_shilian_sweep = msg.c2s_shilian_sweep;
    import c2s_shilian_get_reward = msg.c2s_shilian_get_reward;
    import GameNT = base.GameNT;
    import s2c_shilian_info = msg.s2c_shilian_info;
    import XianlvShilianFubenConfig = game.config.XianlvShilianFubenConfig;
    import XianlvShilianSceneConfig = game.config.XianlvShilianSceneConfig;
    import shilian_info = msg.shilian_info;
    import c2s_xianlv_shilian_openui = msg.c2s_xianlv_shilian_openui;
    import s2c_shilian_damage = msg.s2c_shilian_damage;
    import ParamConfig = game.config.ParamConfig;
    import XianlvRankConfig = game.config.XianlvRankConfig;
    import c2s_shilian_rank_info = msg.c2s_shilian_rank_info;
    import s2c_shilian_rank_info = msg.s2c_shilian_rank_info;
    import XianlvJifenConfig = game.config.XianlvJifenConfig;
    import c2s_shilian_jifen_info = msg.c2s_shilian_jifen_info;
    import c2s_shilian_jifen_oper = msg.c2s_shilian_jifen_oper;
    import s2c_shilian_jifen_info = msg.s2c_shilian_jifen_info;
    import Handler = base.Handler;

    /**
     * @description 仙侣试炼系统
     */
    export class XianlvShilianProxy extends ProxyBase {
        private _model: XianlvShilianModel;
        /**当前挑战的副本类型*/
        public curType = 0;

        public get model(): XianlvShilianModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new XianlvShilianModel();
            this.onProto(s2c_shilian_info, this.s2c_shilian_info, this);
            this.onProto(s2c_shilian_damage, this.s2c_shilian_damage, this);
            this.onProto(s2c_shilian_rank_info, this.s2c_shilian_rank_info, this);
            this.onProto(s2c_shilian_jifen_info, this.s2c_shilian_jifen_info, this);
        }

        // 挑战副本
        public c2s_challenge_shilian(type: number): void {
            let msg = new c2s_challenge_shilian();
            msg.type = type;
            this.curType = type;
            this.sendProto(msg);
        }

        // 副本扫荡
        public c2s_shilian_sweep(type: number, cnt: number): void {
            let msg = new c2s_shilian_sweep();
            msg.type = type;
            msg.cnt = cnt;
            this.sendProto(msg);
        }

        // 领取类型奖励
        public c2s_shilian_get_reward(type: number): void {
            let msg = new c2s_shilian_get_reward();
            msg.type = type;
            this.sendProto(msg);
        }

        // 试炼数据
        public s2c_shilian_info(n: GameNT): void {
            let msg = n.body as s2c_shilian_info;
            if (msg.list != null) {
                for (let item of msg.list) {
                    this._model.list[item.type] = item;
                }
            }
            if (msg.score != null) {
                this._model.my_score = msg.score;
            }

            this.checkAutoChallengeShilian();
            this.updateHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_SHILIAN_INFO);
        }

        //请求主界面
        public c2s_xianlv_shilian_openui(): void {
            let msg = new c2s_xianlv_shilian_openui();
            this.sendProto(msg);
        }

        private s2c_shilian_damage(n: GameNT): void {
            let msg = n.body as s2c_shilian_damage;
            let damage = msg.damage && msg.damage.toNumber() || 0;
            this.sendNt(XianyuanEvent.ON_UPDATE_SHILIAN_DAMAGE, damage);
        }

        /// 排行榜请求
        public c2s_shilian_rank_info(): void {
            let msg = new c2s_shilian_rank_info();
            this.sendProto(msg);
        }

        private s2c_shilian_rank_info(n: GameNT): void {
            let msg = n.body as s2c_shilian_rank_info;
            if (msg.rank_info != null) {
                this._model.rank_info = msg.rank_info;
            }
            if (msg.my_score != null) {
                this._model.my_score = msg.my_score;
            }
            if (msg.my_rank_no != null) {
                this._model.my_rank_no = msg.my_rank_no;
            }
            if (msg.rank_one_info != null) {
                this._model.rank_one_info = msg.rank_one_info;
            }
            this.updateHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_SHILIAN_RANK_INFO);
        }

        // 请求排行榜积分奖励信息
        public c2s_shilian_jifen_info(): void {
            let msg = new c2s_shilian_jifen_info();
            this.sendProto(msg);
        }

        public c2s_shilian_jifen_oper(index: number): void {
            let msg = new c2s_shilian_jifen_oper();
            msg.index = index;
            this.sendProto(msg);
        }

        public s2c_shilian_jifen_info(n: GameNT): void {
            let msg = n.body as s2c_shilian_jifen_info;
            if (msg.info != null) {
                this._model.jifen_info = msg.info;
            }
            this.updateHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_SHILIAN_JIFEN_INFO);
        }

        public getSceneConfig(type: number, layer?: number): XianlvShilianSceneConfig {
            let cfgObj = getConfigByNameId(ConfigName.XianlvShilianScene, type);
            if (!layer) {
                let info = this.getInfo(type);
                layer = info && info.layer || 1;
            }
            return cfgObj[layer];
        }

        public getInfo(type: number): shilian_info {
            return this._model.list[type];
        }

        private _maxLayer: { [type: number]: number } = {};

        public getMaxLayer(type: number): number {
            if (this._maxLayer[type]) {
                return this._maxLayer[type];
            }
            let cfgObj = getConfigByNameId(ConfigName.XianlvShilianScene, type);
            let len = Object.keys(cfgObj).length;
            return this._maxLayer[type] = len;
        }

        public isMaxLayer(type: number): boolean {
            let info = this.getInfo(type);
            if (!info) {
                return false;
            }
            let curLayer = info && info.layer || 1;
            return curLayer >= this.getMaxLayer(type);
        }

        public canChallenge(type: number, isTips = false): boolean {
            // if (this.isMaxLayer(type)) {
            //     if (isTips) {
            //         PromptBox.getIns().show(getLanById(LanDef.cross_boss_tips4));
            //     }
            //     return false;
            // }
            let cost = this.getChallengeCost();
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        public getChallengeCost(): number[] {
            let paramCfg = GameConfig.getParamConfigById('xianlv_fuben_cost');
            let idx = paramCfg.value as number;
            return [idx, 1];
        }

        //展示排行名次
        public getRankShow(): number {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById('xianlv_rankshow');
            return paramCfg.value || MAX_RANK_NUM;
        }

        public getRankReward(rank_no: number): number[][] {
            let cfgList: XianlvRankConfig[] = getConfigListByName(ConfigName.XianlvRank);
            for (let cfg of cfgList) {
                let section = cfg.rank_section;
                if (section[0] <= rank_no && rank_no <= section[1]) {
                    return cfg.reward;
                }
            }
            return [];
        }

        public getJifenCfgList(): XianlvJifenConfig[] {
            return getConfigListByName(ConfigName.XianlvJifen);
        }

        public isJifenGotten(index: number): boolean {
            return this._model.jifen_info.indexOf(index) > -1;
        }

        public getRankRewardHint(): boolean {
            let cfgList = this.getJifenCfgList();
            let myScore = this._model.my_score;
            for (let cfg of cfgList) {
                if (!this.isJifenGotten(cfg.index) && myScore >= cfg.score) {
                    return true;
                }
            }

            return false;
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvShilian)) {
                return;
            }
            //未结婚
            if (!RoleUtil.getBanlvInfo()) {
                HintMgr.setHint(false, this._model.hintPath);
                return;
            }

            let cfgList: XianlvShilianFubenConfig[] = getConfigListByName(ConfigName.XianlvShilianFuben);

            //排行榜红点
            let hint = this.getRankRewardHint();
            HintMgr.setHint(hint, this._model.rankHintPath);

            //挑战和奖励红点
            if (!hint) {
                for (let cfg of cfgList) {
                    if (cfg && this.canChallenge(cfg.type)) {
                        hint = true;
                        break;
                    }
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }

        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let cost = this.getChallengeCost();
            if (cost && indexs && indexs.indexOf(cost[0]) > -1) {
                this.updateHint();
                this.checkAutoChallengeShilian();
            }
        }

        /**============== 修仙女仆自动挂机 ==============*/

        private canAutoChallengeShilian(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvShilian) || !RoleUtil.getBanlvInfo()) {
                return false;
            }
            let cost = this.getChallengeCost();
            if (cost && !BagUtil.checkPropCnt(cost[0], cost[1])) {
                return false;
            }
            let type = this.getAutoChallengeShilianType();
            return !!type;
        }

        private getAutoChallengeShilianType(): number {
            let list = this.model.list;
            if (!list) {
                return null;
            }
            for (let key in list) {
                let info = list[key];
                if (info && !info.max_damage_record && info.status == 0) {
                    return info.type;
                }
            }
            return null;
        }

        private sendAutoChallengeShilian(): void {
            let type = this.getAutoChallengeShilianType();
            if (type) {
                this.c2s_challenge_shilian(type);
            }
        }

        private checkAutoChallengeShilian(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvShilian)) {
                return;
            }
            //突然被离婚
            if (!RoleUtil.getBanlvInfo()) {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianlvshilian, true);
                return;
            }
            if (this.canAutoChallengeShilian()) {
                RoleUtil.addAutoChallengeEvent(XiuxianNvpuEventType.Xianlvshilian, Handler.alloc(this, this.sendAutoChallengeShilian));
            } else {
                RoleUtil.removeAutoChallengeEvent(XiuxianNvpuEventType.Xianlvshilian);
            }
        }

        protected onBanlvInfoUpdate() {
            this.updateHint();
            this.checkAutoChallengeShilian();
        }

        /**============== 修仙女仆自动挂机 ==============*/

    }
}