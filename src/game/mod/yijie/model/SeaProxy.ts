namespace game.mod.yijie {


    import c2s_huanjingzhihai_click = msg.c2s_huanjingzhihai_click;
    import s2c_huanjingzhihai_info = msg.s2c_huanjingzhihai_info;
    import GameNT = base.GameNT;
    import huanjinzhihai_quyu_shuju = msg.huanjinzhihai_quyu_shuju;
    import HuanjingzhihaiGateConfig = game.config.HuanjingzhihaiGateConfig;
    import HuanjingzhihaiTypeConfig = game.config.HuanjingzhihaiTypeConfig;
    import HuanjingzhihaiIndexConfig = game.config.HuanjingzhihaiIndexConfig;
    import TimeMgr = base.TimeMgr;
    import s2c_huanjingzhihai_single_rank_info = msg.s2c_huanjingzhihai_single_rank_info;
    import HuanjingzhihaiBossConfig = game.config.HuanjingzhihaiBossConfig;
    import teammate = msg.teammate;
    import HuanjingzhihaiBossRankConfig = game.config.HuanjingzhihaiBossRankConfig;

    export class SeaProxy extends ProxyBase implements ISeaProxy {
        private _model: SeaModel;

        initialize(): void {
            super.initialize();
            this._model = new SeaModel();

            this.onProto(s2c_huanjingzhihai_info, this.s2c_huanjingzhihai_info, this);
            this.onProto(s2c_huanjingzhihai_single_rank_info, this.s2c_huanjingzhihai_single_rank_info, this);
        }

        public c2s_huanjingzhihai_click(opType: number, index: number) {
            let msg = new c2s_huanjingzhihai_click();
            msg.button_type = opType;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_huanjingzhihai_info(n: GameNT) {
            let msg: s2c_huanjingzhihai_info = n.body;
            if(!msg || !msg.datas){
                return;
            }
            let openSea: SeaType[] = [];//已开启的区域
            for(let info of msg.datas){
                if (info && !!info.is_open) {
                    openSea.push(info.index);
                }
                let oldInfo = this.getInfo(info.index);
                if(!oldInfo){
                    this._model.infoList[info.index] = info;
                    continue;
                }
                //更新
                for(let k in info){
                    this._model.infoList[info.index][k] = info[k];
                }
            }
            this.updateHint();
            this.sendNt(SeaEvent.ON_SEA_INFO_UPDATE, openSea);
        }

        private getInfo(type: number): huanjinzhihai_quyu_shuju {
            return this._model.infoList[type] || null;
        }

        public set type(type: number) {
            this._model.type = type;
        }
        public get type(): number {
            return this._model.type;
        }
        public set rankType(type: number) {
            this._model.rankType = type;
        }
        public get rankType(): number {
            return this._model.rankType;
        }

        public set bigGate(bigGate: number) {
            this._model.bigGate = bigGate;
        }
        public get bigGate(): number {
            return this._model.bigGate;
        }

        public isEnter(type: number): boolean {
            let info = this.getInfo(type);
            return info && !!info.is_open;
        }

        public getEnterCnt(type: number): number {
            let info = this.getInfo(type);
            return info && info.count || 0;
        }

        //当前通关的大关id
        public getCurBigGate(type: number): number {
            let info = this.getInfo(type);
            return info && info.big_gate || (type * 100 + 1);//默认101，201，301
        }

        //已通关的小关id
        public getPassSmallGate(type: number): number {
            let info = this.getInfo(type);
            return info && info.small_gate || 0;
        }

        //每个大关卡已通关的小关id
        public getSmallGate(type: number, bigGate: number): number {
            let curBigGate = this.getCurBigGate(type);
            if(bigGate == curBigGate){
                return this.getPassSmallGate(type);
            }
            else if(bigGate > curBigGate){
                return 0
            }
            else {
                return this.getMaxSmallGate(bigGate);
            }
        }

        public getMaxSmallGate(bigGate: number): number {
            if(!this._model.maxSmallGate[bigGate]){
                let maxSmallGate = 0;
                let cfgList: object = getConfigByNameId(ConfigName.HuanjingzhihaiGate, bigGate);
                for(let k in cfgList) {
                    let cfg: HuanjingzhihaiGateConfig = cfgList[k];
                    if(cfg.small_gate > maxSmallGate){
                        maxSmallGate = cfg.small_gate;
                    }
                }
                this._model.maxSmallGate[bigGate] = maxSmallGate;
            }
            return this._model.maxSmallGate[bigGate];
        }

        public isOpen(type: number, bigGate: number): boolean {
            let lastBigGate = bigGate - 1;
            let cfgList: object = getConfigByNameId(ConfigName.HuanjingzhihaiGate, lastBigGate);
            if(!cfgList){
                return true;
            }
            return this.isFinish(type, lastBigGate);
        }

        public isFinish(type: number, bigGate: number): boolean {
            let smallGate = this.getSmallGate(type, bigGate);
            if(smallGate <= 0){
                return false;
            }
            let maxSmallGate = this.getMaxSmallGate(bigGate);
            return smallGate >= maxSmallGate;
        }

        public getBigGateCfg(type: number, bigGate: number): HuanjingzhihaiTypeConfig {
            let cfgInfos: object = getConfigByNameId(ConfigName.HuanjingzhihaiType, type);
            let cfg: HuanjingzhihaiTypeConfig = cfgInfos[bigGate];
            return cfg;
        }

        public getSmallGateCfg(bigGate: number, smallGate: number): HuanjingzhihaiGateConfig {
            let cfgInfos: object = getConfigByNameId(ConfigName.HuanjingzhihaiGate, bigGate);
            let cfg: HuanjingzhihaiGateConfig = cfgInfos[smallGate];
            return cfg;
        }

        public checkBigGateHint(type: number, bigGate: number): boolean {
            let isOpen = this.isOpen(type, bigGate);
            if(!isOpen){
                return false;
            }
            let isFinish = this.isFinish(type, bigGate);
            if(isFinish){
                return false;
            }
            let smallGate = this.getSmallGate(type, bigGate);
            let curSmallGate = smallGate + 1;//当前挑战的关卡
            let smallGateCfg = this.getSmallGateCfg(bigGate, curSmallGate);
            let curPower = RoleVo.ins.showpower.toNumber();
            return curPower >= smallGateCfg.show_power;
        }

        //是否解锁挂机收益
        public isRewardOpen(type: number): boolean {
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            let openGate = cfg.gate;
            if(!openGate){
                return true;
            }
            let openBigGate = openGate[0];
            let openSmallGate = openGate[1];
            let bigGate = this.getCurBigGate(type);
            if(bigGate > openBigGate){
                return true;
            }
            let smallGate = this.getPassSmallGate(type);
            return bigGate == openBigGate && smallGate >= openSmallGate;
        }

        //是否可以领取挂机收益
        public canRewardDraw(type: number): boolean {
            let nextTime = this.getNextTime(type);
            if(!nextTime){
                return false;
            }
            let curTime = TimeMgr.time.serverTimeSecond;
            return curTime >= nextTime;
        }

        public getNextTime(type: number): number {
            let info = this.getInfo(type);
            let rewardTime = info && info.reward_time;
            if(!rewardTime || rewardTime.isZero()){
                return 0;
            }
            let startTime = rewardTime.toNumber();
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            return startTime + cfg.per_time * Second.Hour;
        }

        /** 本次挂机收益开始时间戳 */
        public getStartTime(type: number):number{
            let info = this.getInfo(type);
            let rewardTime = info && info.reward_time;
            if(!rewardTime || rewardTime.isZero()){
                return 0;
            }
            let startTime = rewardTime.toNumber();
            return startTime;
        }

        public getHintType(type: number): string[] {
            return this._model.hintType[type];
        }

        private updateHint(): void {
            this.updateEnterHint();
            this.updateRewardHint();
            this.updateFubenHint();
            this.updateBossAttackHint();
            this.updateRankHint();
            this.updateOrderHint();
        }

        private updateEnterHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea)){
                return;//功能未开启
            }
            for(let type = 1; type <= SeaType.Sea3; ++type){
                this.updateEnterHintByType(type);
            }
        }

        private updateEnterHintByType(type: number): void {
            let hint = this.checkEnterHint(type);
            let hintType = this.getEnterHintType(type);
            HintMgr.setHint(hint, hintType);
        }

        private getEnterHintType(type: number): string[] {
            return this._model.enterHintType[type];
        }

        private checkEnterHint(type: number): boolean {
            let openIdx = this._model.openIdxList[type];
            if(!ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            let isEnter = this.isEnter(type);
            if(isEnter){
                return false;
            }
            let taskType = SeaTypeToTaskType[type];
            let taskHint = TaskUtil.getTaskHint(taskType);
            if(taskHint){
                return true;//任务红点
            }
            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            let cost = cfg.active_cost[0];
            let costIndex = cost[0];
            let costCnt = cost[1];
            let curCnt = BagUtil.getPropCntByIdx(costIndex);
            return curCnt >= costCnt;
        }

        private updateRewardHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea)){
                return;//功能未开启
            }
            for(let type = 1; type <= SeaType.Sea3; ++type){
                this.updateRewardHintByType(type);
            }
        }
        private updateRewardHintByType(type: number): void {
            let hint = this.checkRewardHint(type);
            if(!hint){
                let nextTime = this.getNextTime(type);
                if(nextTime > 0){
                    let timeEventType = this._model.timeEventTypeList[type];
                    HintMgr.addTimeEvent(timeEventType, nextTime, this, this.updateRewardHintByType, [type]);
                }
            }
            let hintType = this.getRewardHintType(type);
            HintMgr.setHint(hint, hintType);
        }

        public getRewardHintType(type: number): string[] {
            return this._model.rewardHintType[type];
        }

        private checkRewardHint(type: number): boolean {
            let openIdx = this._model.openIdxList[type];
            if(!ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            if(this.canRewardDraw(type)){
                return true;
            }
            return false;
        }

        private updateFubenHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea)){
                return;//功能未开启
            }
            for(let type = 1; type <= SeaType.Sea3; ++type){
                let hint = this.checkFubenHint(type);
                let hintType = this.getFubenHintType(type);
                HintMgr.setHint(hint, hintType);
            }
        }

        private checkFubenHint(type: number): boolean {
            let openIdx = this._model.openIdxList[type];
            if(!ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            let isEnter = this.isEnter(type);
            if(!isEnter){
                return false;
            }
            let bigGate = this.getCurBigGate(type);
            return this.checkBigGateHint(type, bigGate);
        }

        public getFubenHintType(type: number): string[] {
            return this._model.fubenHintType[type];
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.showpower) >= 0) {
                this.updateFubenHint();//战力变更时刷新挑战红点
            }
            if (keys.indexOf(RolePropertyKey.xjzh_nl) >= 0) {
                this.updateEnterHintByType(SeaType.Sea1);
            }
            if (keys.indexOf(RolePropertyKey.sjzh_nl) >= 0) {
                this.updateEnterHintByType(SeaType.Sea2);
            }
            if (keys.indexOf(RolePropertyKey.sgjzh_nl) >= 0) {
                this.updateEnterHintByType(SeaType.Sea3);
            }
        }
        protected onTaskHint(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(TaskType.Sea1) >= 0){
                this.updateEnterHintByType(SeaType.Sea1);
            }
            if(types.indexOf(TaskType.Sea2) >= 0){
                this.updateEnterHintByType(SeaType.Sea2);
            }
            if(types.indexOf(TaskType.Sea3) >= 0){
                this.updateEnterHintByType(SeaType.Sea3);
            }
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(PropIndex.HuanjingBossTiaozhanling) > -1){
                this.updateBossAttackHint();
            }
        }

        /********************************幻境boss**********************************/
        private s2c_huanjingzhihai_single_rank_info(n: GameNT) {
            let msg: s2c_huanjingzhihai_single_rank_info = n.body;
            if (!msg) {
                return;
            }
            this._model.rankList[msg.index] = msg;
            this.sendNt(SeaEvent.ON_SEA_RANK_UPDATE);
        }

        public isRankRewardDraw(type: number): boolean {
            let info = this.getInfo(type);
            return info && info.is_get == RewardStatus.Draw;
        }

        public getBossIndex(type: number): number {
            let info = this.getInfo(type);
            return info && info.boss_index || 1;
        }

        public getBossHp(type: number): number {
            let info = this.getInfo(type);
            return info && info.boss_hp || 0;
        }

        public getBossStartIndex(type: number): number {
            let index = this.getBossIndex(type);
            return Math.floor((index - 1) / SeaBossPosNum) * SeaBossPosNum + 1;
        }

        public getBossCfg(type: number, bossIndex: number): HuanjingzhihaiBossConfig {
            let cfgInfos: object = getConfigByNameId(ConfigName.HuanjingzhihaiBoss, type);
            let cfg: HuanjingzhihaiBossConfig = cfgInfos[bossIndex];
            return cfg;
        }

        public getMyRank(type: number): teammate {
            let info = this._model.rankList[type];
            return info && info.my_rank || null;
        }

        public getRankList(type: number): teammate[] {
            let info = this._model.rankList[type];
            return info && info.all_ranks || [];
        }

        public getTopRank(type: number): teammate {
            let rankList = this.getRankList(type);
            return rankList.length && rankList[0] || null;
        }

        public getMaxRank(type: number): number {
            let maxRank = 0;
            let cfgList: object = getConfigByNameId(ConfigName.HuanjingzhihaiBossRank, type);
            for(let k in cfgList) {
                let cfg: HuanjingzhihaiBossRankConfig = cfgList[k];
                let rankStart = cfg.ranks[0];
                if(maxRank < rankStart){
                    maxRank = rankStart - 1;
                }
            }
            return maxRank;
        }

        public getBossHintType(type: number): string[] {
            return this._model.bossHintType[type];
        }

        private updateBossAttackHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea)){
                return;//功能未开启
            }
            for(let type = 1; type <= SeaType.Sea3; ++type){
                let hint = this.checkBossAttackHint(type);
                let hintType = this.getBossAttackHintType(type);
                HintMgr.setHint(hint, hintType);
            }
        }

        private checkBossAttackHint(type: number): boolean {
            let openIdx = this._model.openIdxList[type];
            if(!ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            let isEnter = this.isEnter(type);
            if(!isEnter){
                return false;
            }
            return BagUtil.checkPropCnt(PropIndex.HuanjingBossTiaozhanling);
        }

        public getBossAttackHintType(type: number): string[] {
            return this._model.bossAttackHintType[type];
        }

        private updateRankHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea)){
                return;//功能未开启
            }
            for(let type = 1; type <= SeaType.Sea3; ++type){
                let hint = this.checkRankHint(type);
                let hintType = this.getRankHintType(type);
                HintMgr.setHint(hint, hintType);
            }
        }

        private checkRankHint(type: number): boolean {
            let openIdx = this._model.openIdxList[type];
            if(!ViewMgr.getIns().checkViewOpen(openIdx)){
                return false;
            }
            let isEnter = this.isEnter(type);
            if(!isEnter){
                return false;
            }
            return !this.isRankRewardDraw(type);
        }

        public getRankHintType(type: number): string[] {
            return this._model.rankHintType[type];
        }

        //战令红点
        protected onUpdateGivingList(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(GameOrderType.Huanjing) > -1) {
                this.updateOrderHint();
            }
        }

        private updateOrderHint(): void {
            let hintPath = [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType06];
            let hint = HintMgr.getHint(hintPath);
            for(let type = 1; type <= SeaType.Sea3; ++type){
                let isEnter = this.isEnter(type);
                if(!isEnter){
                    continue;
                }
                let hintType = this.getOrderHintType(type);
                HintMgr.setHint(hint, hintType);
            }
        }

        public getOrderHintType(type: number): string[] {
            return this._model.orderHintType[type];
        }

        /**能否开启排行榜，幻境系统有用到*/
        public canOpenRank(): boolean {
            let ary = [SeaMainBtnType.Sea1, SeaMainBtnType.Sea2, SeaMainBtnType.Sea3]
            for (let type of ary) {
                if (this.isEnter(parseInt(type))) {
                    return true;
                }
            }
            return false;
        }
    }
}