namespace game.mod.rank {

    import c2s_new_rank_req_rank = msg.c2s_new_rank_req_rank;
    import s2c_new_rank_info = msg.s2c_new_rank_info;
    import GameNT = base.GameNT;
    import c2s_first_rank_award = msg.c2s_first_rank_award;
    import s2c_first_rank_server_award = msg.s2c_first_rank_server_award;
    import s2c_first_rank_award = msg.s2c_first_rank_award;
    import ChapterawardConfig = game.config.ChapterawardConfig;
    import teammate = msg.teammate;
    import XiantaFubenConfig = game.config.XiantaFubenConfig;

    export class RankProxy extends ProxyBase implements IRankProxy {
        private _model: RankModel;

        initialize(): void {
            super.initialize();
            this._model = new RankModel();

            this.onProto(s2c_new_rank_info, this.s2c_new_rank_info, this);
            this.onProto(s2c_first_rank_server_award, this.s2c_first_rank_server_award, this);
            this.onProto(s2c_first_rank_award, this.s2c_first_rank_award, this);
        }

        /**请求排行榜信息*/
        public c2s_new_rank_req_rank(rankType: number): void {
            let msg = new c2s_new_rank_req_rank();
            msg.ranktype = rankType;
            this.sendProto(msg);
        }

        private s2c_new_rank_info(n: GameNT) {
            let msg: s2c_new_rank_info = n.body;
            if(!msg){
                return;
            }
            this._model.infos[msg.ranktype] = msg;
            this.sendNt(RankEvent.ON_RANK_INFO_UPDATE, msg.ranktype);
        }

        /**请求领取大神榜 奖励*/
        public c2s_first_rank_award(rankType: number, index: number): void {
            let msg = new c2s_first_rank_award();
            msg.ranktype = rankType;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_first_rank_server_award(n: GameNT) {
            let msg: s2c_first_rank_server_award = n.body;
            if(!msg){
                return;
            }
            for(let info of msg.list){
                if(!info.infos){
                    continue;
                }
                this.updateGodInfos(info.ranktype, info.infos);
            }
        }

        private s2c_first_rank_award(n: GameNT) {
            let msg: s2c_first_rank_award = n.body;
            if(!msg){
                return;
            }
            this.updateGodRewardInfos(msg.ranktype, msg.index_list);
        }

        /**获取排行榜信息*/
        public getRankInfo(rankType: number): s2c_new_rank_info {
            return this._model.infos[rankType];
        }

        /**获取大神榜信息*/
        public getGodInfos(rankType: number): RankGodRenderData[] {
            if(!this._model.godInfos[rankType]){
                this.initGodInfos(rankType);
            }
            return this._model.godInfos[rankType];
        }

        /**初始化大神榜信息*/
        private initGodInfos(rankType: number): void {
            let godInfos: RankGodRenderData[] = [];
            let cfgList = this.getCfgList(rankType);
            for(let cfg of cfgList){
                let info: RankGodRenderData = {};
                info.rankType = rankType;
                info.cfg = cfg;
                info.status = RankRewardStatus.NotFinish;
                godInfos.push(info);
            }
            this._model.godInfos[rankType] = godInfos;
        }

        /**更新大神榜信息*/
        private updateGodInfos(rankType: number, rankInfos: teammate[]): void {
            let godInfos = this.getGodInfos(rankType);
            for(let i = 0; i < godInfos.length; ++i){
                let info = godInfos[i];
                let cfg = info.cfg as ChapterawardConfig;
                for(let j = 0; j < rankInfos.length; ++j){
                    let rankInfo = rankInfos[j];
                    if(rankInfo.index == cfg.index){
                        godInfos[i].status = info.status == RankRewardStatus.NotFinish ? RankRewardStatus.Finish : info.status;//切换为可领取状态
                        godInfos[i].rankInfo = rankInfo;
                        break;
                    }
                }
            }
            this.setRankUpdate(rankType);
        }

        /**更新大神榜奖励信息*/
        private updateGodRewardInfos(rankType: number, indexList: number[]): void {
            let godInfos = this.getGodInfos(rankType);
            for(let i = 0; i < godInfos.length; ++i){
                let info = godInfos[i];
                let cfg = info.cfg as ChapterawardConfig;
                godInfos[i].status = indexList && indexList.indexOf(cfg.index) > -1 ? RankRewardStatus.Draw : info.status;//切换为已领取状态
            }
            this.setRankUpdate(rankType);
        }

        private setRankUpdate(rankType: number): void {
            SortTools.sortMap(this.getGodInfos(rankType), "status");//排序
            this.updateHint(rankType);
            this.sendNt(RankEvent.ON_RANK_REWARD_INFO_UPDATE, rankType);
        }

        /**获取红点类型*/
        public getHintTypes(rankType: number): string[] {
            return this._model.rankTypeToHintTypes[rankType];
        }

        private updateHint(rankType: number): void {
            let hint = this.checkHint(rankType);
            let hintType = this.getHintTypes(rankType);
            if(!hintType){
                return;
            }
            HintMgr.setHint(hint, hintType);
        }

        private checkHint(rankType: number): boolean {
            let openIdx = this._model.rankTypeToOpenIdx[rankType];
            switch (rankType) {
                case RankType.Type1:
                case RankType.Type2:
                case RankType.Type3:
                    let cfg: XiantaFubenConfig = getConfigByNameId(ConfigName.XiantaFuben, rankType);
                    openIdx = cfg.copy_open;
                    break;
            }
            if(openIdx && !ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            let godInfos = this.getGodInfos(rankType);
            for(let i = 0; i < godInfos.length; ++i){
                let info = godInfos[i];
                if(info.status == RankRewardStatus.Finish){
                    return true;
                }
            }
            return false;
        }

        private getCfgList(rankType: number): ChapterawardConfig[] {
            let cfgList: ChapterawardConfig[] = [];
            switch (rankType) {
                case RankType.Type1:
                case RankType.Type2:
                case RankType.Type3:
                    let cfgs: object = getConfigByNameId(ConfigName.XiantaReward, rankType);
                    for(let k in cfgs){
                        let cfg = cfgs[k] as ChapterawardConfig;
                        cfgList.push(cfg);
                    }
                    break;
                    //不同排行榜奖励配置不同，todo
            }
            let newRankProxy: NewRankProxy = getProxy(ModName.Rank, ProxyType.NewRank);
            let typeList = newRankProxy.getRankTypeList();
            if (typeList && typeList.indexOf(rankType) > -1) {
                let cfgs = getConfigByNameId(ConfigName.RankReward, rankType);
                for (let k in cfgs) {
                    if (cfgs[k]) {
                        cfgList.push(cfgs[k]);
                    }
                }
            }
            return cfgList;
        }

        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            for (let k in this._model.rankTypeToOpenIdx) {
                let openIdx = this._model.rankTypeToOpenIdx[k];
                if (addIdx.indexOf(openIdx) > -1) {
                    let rankType = parseInt(k);
                    this.updateHint(rankType);
                }
            }
        }
    }
}