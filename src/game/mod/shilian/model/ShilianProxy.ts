namespace game.mod.shilian {

    import MaterialFubenConfig = game.config.MaterialFubenConfig;
    import s2c_material_update = msg.s2c_material_update;
    import GameNT = base.GameNT;
    import c2s_material_enter = msg.c2s_material_enter;
    import c2s_material_reset = msg.c2s_material_reset;
    import c2s_material_sweep = msg.c2s_material_sweep;
    import s2c_material_skip = msg.s2c_material_skip;
    import s2c_material_lvl = msg.s2c_material_lvl;
    import s2c_forbidden_update = msg.s2c_forbidden_update;
    import c2s_forbidden_get_info = msg.c2s_forbidden_get_info;
    import s2c_forbidden_reward = msg.s2c_forbidden_reward;
    import c2s_get_reward = msg.c2s_get_reward;
    import c2s_forbidden_enter = msg.c2s_forbidden_enter;
    import c2s_forbidden_sweep = msg.c2s_forbidden_sweep;
    import material_item = msg.material_item;
    import forbidden_item = msg.forbidden_item;
    import forbidden_reward_list = msg.forbidden_reward_list;
    import MaterialSceneConfig = game.config.MaterialSceneConfig;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import XiantaFubenConfig = game.config.XiantaFubenConfig;
    import c2s_challenge_xiantower = msg.c2s_challenge_xiantower;
    import c2s_xiantower_sweep = msg.c2s_xiantower_sweep;
    import c2s_xiantower_get_rewards = msg.c2s_xiantower_get_rewards;
    import s2c_xiantower_info = msg.s2c_xiantower_info;
    import xiantower_info = msg.xiantower_info;
    import XiantaSceneConfig = game.config.XiantaSceneConfig;
    import LanDef = game.localization.LanDef;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;
    import AyahEventFuncConfig = game.config.AyahEventFuncConfig;
    import Handler = base.Handler;

    export class ShilianProxy extends ProxyBase implements IShilianProxy {
        private _model: ShilianModel;

        onStartReconnect() {
            super.onStartReconnect();
            this._sendFubenReset = false;
        }

        initialize(): void {
            super.initialize();
            this._model = new ShilianModel();

            this.onProto(s2c_material_update, this.s2c_material_update, this);
            this.onProto(s2c_material_lvl, this.s2c_material_lvl, this);
            this.onProto(s2c_material_skip, this.s2c_material_skip, this);
            this.onProto(s2c_forbidden_update, this.s2c_forbidden_update, this);
            this.onProto(s2c_forbidden_reward, this.s2c_forbidden_reward, this);
            this.onProto(s2c_xiantower_info, this.s2c_xiantower_info, this);
        }

        public c2s_material_enter(type: number) {
            let msg = new c2s_material_enter();
            msg.type = type;
            this._model.type = type;//用于服务端数据未及时返回时候
            this.sendProto(msg);
        }

        public c2s_material_reset(type: number) {
            let msg = new c2s_material_reset();
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_material_sweep(type: number) {
            let msg = new c2s_material_sweep();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_material_update(n: GameNT) {
            let msg: s2c_material_update = n.body;
            if (!this._model.infos) {
                this._model.infos = msg.infos;
            } else {
                for (let info of msg.infos) {
                    let pos = this.getInfoPos(info.type);
                    if (pos >= 0) {
                        this._model.infos[pos] = info;
                    } else {
                        this._model.infos.push(info);
                    }
                }
            }
            if (this._sendFubenReset) {
                //先发送重置协议，收到监听再处理挑战或者扫荡
                this._sendFubenReset = false;
                this.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);//发送重置协议，需重新处理
            }
            this.updateFubenHint();
            this.sendNt(ShilianEvent.ON_FUBEN_INFO_UPDATE);
        }

        private getInfoPos(type: number): number {
            if (!this._model.infos || !this._model.infos.length) {
                return -1;
            }
            let len = this._model.infos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.infos[i];
                if (info.type == type) {
                    return i;
                }
            }
            return -1;
        }

        /**副本信息*/
        public getFubenInfo(type: number): material_item {
            let pos = this.getInfoPos(type);
            if (pos >= 0) {
                return this._model.infos[pos];
            }
            return null;
        }

        private s2c_material_lvl(n: GameNT) {
            let msg: s2c_material_lvl = n.body;
            if (msg.type != undefined) {
                this._model.type = msg.type;
            }
            if (msg.lv != undefined) {
                this._model.lv = msg.lv;
            }
            if (msg.total_count != undefined) {
                this._model.total_count = msg.total_count;
            }
            this.sendNt(ShilianEvent.ON_FUBEN_SCENE_UPDATE);
        }

        public get type(): number {
            return this._model.type;
        }

        public get lv(): number {
            return this._model.lv;
        }

        public get totalCount(): number {
            return this._model.total_count;
        }

        public get selType(): number {
            return this._model.selType;
        }

        public set selType(type: number) {
            this._model.selType = type;
        }

        private s2c_material_skip(n: GameNT) {
            let msg: s2c_material_skip = n.body;
            if (msg.st_lv != undefined) {
                this._model.st_lv = msg.st_lv;
            }
            if (msg.end_lv != undefined) {
                this._model.end_lv = msg.end_lv;
            }
            this.sendNt(ShilianEvent.ON_FUBEN_SKIP_UPDATE);
        }

        public get stLv(): number {
            return this._model.st_lv;
        }

        public get endLv(): number {
            return this._model.end_lv;
        }

        public resetLvInfo(): void {
            this._model.st_lv = this._model.end_lv = this._model.lv = 0;
        }

        /**默认道具index*/
        public getPropIndex(type: number): number {
            return this._model.typeToPropIndex[type];
        }

        public isFubenOpen(type: number, showTips?: boolean): boolean {
            let cfg: MaterialFubenConfig = getConfigByNameId(ConfigName.MaterialFuben, type);
            return ViewMgr.getIns().checkViewOpen(cfg.copy_open, showTips);
        }

        //材料副本，仙塔副本共用，需要时再分开
        public get typeList(): number[] {
            return this._model.typeList;
        }

        //获取特权加成，返回百分比
        public getPrivilegeAdd(cfg: NewPrivilegeConfig, type: number): number {
            let addVal = 0;
            if (!cfg) {
                return addVal;
            }
            switch (type) {
                case FubenType.Type1:
                    addVal = cfg.fenmo_income;
                    break;
                case FubenType.Type2:
                    addVal = cfg.jingui_income;
                    break;
                case FubenType.Type3:
                    addVal = cfg.penglai_income;
                    break;
            }
            return addVal / 100;
        }

        /**挑战红点类型*/
        public getChallengeHintType(type: number): string[] {
            return this._model.challengeHints[type - 1];
        }

        /**重置红点类型*/
        public getResetHintType(type: number): string[] {
            return this._model.resetHints[type - 1];
        }

        /**更新红点*/
        private updateFubenHint(): void {
            this.updateAllChallengeHint();
            this.updateAllResetHint();

            this.checkAutoChallengeFuben();
        }

        /**更新挑战红点*/
        private updateAllChallengeHint(): void {
            let typeList = this._model.typeList;
            for (let i = 0; i < typeList.length; ++i) {
                let type = typeList[i];
                this.updateChallengeHint(type);
            }
        }

        private updateChallengeHint(type: number): void {
            if (!this.isFubenOpen(type)) {
                return;
            }
            let hint = this.checkChallengeHint(type);
            let hintType = this.getChallengeHintType(type);
            let cfg: MaterialFubenConfig = getConfigByNameId(ConfigName.MaterialFuben, type);
            HintMgr.setHint(hint, hintType, cfg.copy_open);
        }

        private checkChallengeHint(type: number): boolean {
            let selInfo = this.getFubenInfo(type);
            let maxLv = selInfo && selInfo.history_lv ? selInfo.history_lv : 0;
            let curLv = selInfo && selInfo.lvl ? selInfo.lvl : 1;
            let cfgList: MaterialSceneConfig[] = getConfigByNameId(ConfigName.MaterialScene, type);
            let isMax = maxLv == curLv && !cfgList[maxLv + 1];

            let selCfg = getConfigByNameId(ConfigName.MaterialFuben, type);
            let openLimit = selCfg.mopup_open;
            let canSweep = maxLv >= openLimit && maxLv > curLv - 1 && !isMax;//可扫荡
            if (canSweep) {
                return true;
            }

            let cfg = cfgList[curLv];
            let power = cfg.show_power;
            let canChallenge = RoleVo.ins.showpower.toNumber() >= power && !isMax;
            return canChallenge;
        }

        /**更新重置红点*/
        private updateAllResetHint(): void {
            let typeList = this._model.typeList;
            for (let i = 0; i < typeList.length; ++i) {
                let type = typeList[i];
                this.updateResetHint(type);
            }
        }

        private updateResetHint(type: number): void {
            if (!this.isFubenOpen(type)) {
                return;
            }
            let hint = this.checkResetHint(type);
            let hintType = this.getResetHintType(type);
            HintMgr.setHint(hint, hintType);
        }

        private checkResetHint(type: number): boolean {
            let selInfo = this.getFubenInfo(type);
            let curLv = selInfo && selInfo.lvl ? selInfo.lvl : 1;
            if (curLv <= 1) {
                return false;
            }
            let isFree = selInfo && !!selInfo.free;
            if (isFree) {
                return true;
            }
            let selCfg = getConfigByNameId(ConfigName.MaterialFuben, type);
            let cost = selCfg.cost[0];
            let idx = cost[0];
            let costCnt = cost[1];
            return BagUtil.checkPropCnt(idx, costCnt);
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.showpower) >= 0) {
                this.updateAllChallengeHint();
                this.updateAllXiantaChallengeHint();
                this.updateFbdHint();
            }
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            if (indexs.indexOf(PropIndex.Jinguiling) >= 0) {
                this.updateResetHint(FubenType.Type1);
            } else if (indexs.indexOf(PropIndex.Fengmoling) >= 0) {
                this.updateResetHint(FubenType.Type2);
            } else if (indexs.indexOf(PropIndex.Penglailing) >= 0) {
                this.updateResetHint(FubenType.Type3);
            }
        }


        /************************** 禁地副本 *************************/
        /**
         * 禁地副本基本信息
         */
        private s2c_forbidden_update(n: GameNT) {
            let msg: s2c_forbidden_update = n.body;
            if (!msg.infos) {
                return;
            }

            if (!this._model.fbdInfos) {
                this._model.fbdInfos = {};
            }

            let isSend = false;
            for (let info of msg.infos) {
                let lastInfo = this._model.fbdInfos[info.tab_id];
                let lastCnt = lastInfo && lastInfo.free || 0;
                let curCnt = info && info.free || 0;

                this._model.fbdInfos[info.tab_id] = info;

                //扫荡次数变化
                if (!isSend && lastCnt && curCnt != lastCnt) {
                    isSend = true;
                    this.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);//扫荡重置
                }
            }

            this.checkAutoSweepJindi();
            this.updateFbdHint();
            this.sendNt(ShilianEvent.ON_FORBIDDEN_INFO_UPDATE);
        }

        /**
         * 取禁地信息
         */
        public c2s_forbidden_get_info(): void {
            let msg: c2s_forbidden_get_info = new c2s_forbidden_get_info();
            this.sendProto(msg);
        }

        /**
         * 通关大奖推送
         */
        private s2c_forbidden_reward(n: GameNT) {
            let msg: s2c_forbidden_reward = n.body;
            if (!msg.infos) {
                return;
            }

            if (!this._model.fbdAwds) {
                this._model.fbdAwds = {};
            }
            for (let info of msg.infos) {
                if (info.flag == 2) {
                    //已领取
                    this.updateFbdHasDrawAwds(info.index, info.id);
                }
                if (info.flag != 1) {
                    continue;
                }
                let cfg: ForbiddenFubenConfig = getConfigByNameId(ConfigName.ForbiddenFuben, info.index);
                if (!this._model.fbdAwds[cfg.tabid]) {
                    this._model.fbdAwds[cfg.tabid] = {};
                }
                if (!this._model.fbdAwds[cfg.tabid][info.index]) {
                    this._model.fbdAwds[cfg.tabid][info.index] = [];
                }

                let curAwds = this._model.fbdAwds[cfg.tabid][info.index];
                let exist: boolean;
                for (let awd of curAwds) {
                    if (awd.index == info.index && awd.id == info.id) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    curAwds.push(info);
                }
            }

            this.updateFbdHint();
            this.sendNt(ShilianEvent.ON_FORBIDDEN_AWD_UPDATE);
        }

        //更新已领取列表
        private updateFbdHasDrawAwds(index: number, id: number): void {
            if (!this._model.hasDrawAwds[index]) {
                this._model.hasDrawAwds[index] = [];
            }
            let pos = this._model.hasDrawAwds[index].indexOf(id);
            if (pos < 0) {
                this._model.hasDrawAwds[index].push(id);
            }
        }

        //是否已领取
        public hasDrawAwds(index: number, id: number): boolean {
            if (!this._model.hasDrawAwds[index]) {
                return false;
            }
            return this._model.hasDrawAwds[index].indexOf(id) >= 0;
        }

        /**
         * 领取通关大奖
         * @param bigGateId
         * @param smallGateId
         */
        public c2s_get_reward(bigGateId: number, smallGateId: number): void {
            let msg: c2s_get_reward = new c2s_get_reward();
            msg.index = bigGateId;
            msg.id = smallGateId;
            this.sendProto(msg);
        }

        /**
         * 进入挑战
         * @param type
         */
        public c2s_forbidden_enter(type: number): void {
            let msg: c2s_forbidden_enter = new c2s_forbidden_enter();
            msg.index = type;
            this.sendProto(msg);
        }

        /**
         * 请求扫荡
         */
        public c2s_forbidden_sweep(type: number): void {
            let msg: c2s_forbidden_sweep = new c2s_forbidden_sweep();
            msg.tab_id = type;
            this.sendProto(msg);
        }

        /**
         * 指定类型禁地副本是否已开启
         * @param type
         */
        public isFbdTypeOpen(type: number, showTips?: boolean): boolean {
            let cfg = this.getFbdFirstFubenCfg(type);
            if (!cfg) {
                return false;
            }
            let isOpen = RoleUtil.isLimitOpen(cfg.open);
            if (!isOpen && showTips) {
                let openStr = RoleUtil.getLimitStr(cfg.open, false, false);
                PromptBox.getIns().show(openStr);
            }
            return isOpen;
        }

        public getFbdTypes(): ForbiddenType[] {
            return this._model.fbdTypes;
        }

        public getFbdInfo(type: number): forbidden_item {
            return this._model.fbdInfos[type];
        }

        /**
         * 取通关大奖
         * @param type
         * @param bigGateId
         * @returns
         */
        public getFbdAwd(type: number): forbidden_reward_list[] {
            let awds: forbidden_reward_list[] = [];
            let awds1 = this._model.fbdAwds[type];
            for (let id in awds1) {
                let awds2 = awds1[id];
                awds = awds.concat(awds2);
            }

            return awds;
        }

        /**
         * 取通关大奖
         * @param type
         * @param bigGateId
         * @returns
         */
        public getFbdAwd2(type: number, bigGateId: number): forbidden_reward_list[] {
            let typeAwds = this._model.fbdAwds[type];
            let awds: forbidden_reward_list[] = typeAwds ? typeAwds[bigGateId] : [];
            return awds;
        }

        public getFbdFubenCfgByType(type: number): { [bigGateId: string]: ForbiddenFubenConfig } {
            if (this._model.fbdFubenCfg[type]) {
                return this._model.fbdFubenCfg[type];
            }
            let cfgs: ForbiddenFubenConfig[] = getConfigListByName(ConfigName.ForbiddenFuben);
            let cfgs1: { [bigGateId: string]: ForbiddenFubenConfig } = {};
            for (let cfg of cfgs) {
                if (cfg.tabid == type) {
                    cfgs1[cfg.index] = cfg;
                }
            }
            this._model.fbdFubenCfg[type] = cfgs1;
            return cfgs1;
        }

        /**
         * 取指定类型的第一个禁地副本配置
         * @param type
         * @returns
         */
        public getFbdFirstFubenCfg(type: number): ForbiddenFubenConfig {
            if (this._model.fbdFirstFubenCfg[type]) {
                return this._model.fbdFirstFubenCfg[type];
            }
            let cfgs: ForbiddenFubenConfig[] = getConfigListByName(ConfigName.ForbiddenFuben);
            let cfg1: ForbiddenFubenConfig;
            for (let cfg of cfgs) {
                if (cfg.tabid == type) {
                    cfg1 = cfg;
                    break;
                }
            }
            if (!cfg1) {
                return null;
            }
            this._model.fbdFirstFubenCfg[type] = cfg1;
            return cfg1;
        }

        /**
         * 取当前已通关的最大小关卡id
         * @param type
         * @param bigGateId
         */
        public getCurSmallGateId(type: number, bigGateId: number): number {
            let isPass: boolean = this.isBigGateFinished(type, bigGateId);
            if (isPass) {
                return this.getGateEndCfg(bigGateId).gate_id;
            }

            let info: forbidden_item = this.getFbdInfo(type);
            if (!info || bigGateId > info.index) {
                return 0;
            }
            return info ? info.id : 0;
        }

        /**
         * 取领取通关大奖需完成的小关卡数量
         * @param bigGateId
         * @param curSmallGateId
         * @returns
         */
        public getBigAwdCondition(bigGateId: number, curSmallGateId: number): number {
            let cnt: number = 0;
            let cfgs = getConfigByNameId(ConfigName.ForbiddenGate, bigGateId);
            if (!cfgs) {
                return 0;
            }

            for (let id in cfgs) {
                let cfg: ForbiddenGateConfig = cfgs[id];
                if (cfg.gate_id < curSmallGateId) {
                    continue;
                }
                cnt++;
                if (cfg.gate_show_reward > 0) {
                    break;
                }
            }
            return cnt;
        }

        /**
         * 取最近的可领取的通关大奖配置（已领取的排除）
         * @param bigGateId
         * @returns
         */
        public getNearBigAwdCfg(bigGateId: number): ForbiddenGateConfig {
            let cfgs = getConfigByNameId(ConfigName.ForbiddenGate, bigGateId);
            if (!cfgs) {
                return null;
            }
            let cfg1: ForbiddenGateConfig;
            for (let id in cfgs) {
                let cfg: ForbiddenGateConfig = cfgs[id];
                if (!cfg.gate_show_reward) {
                    //不存在奖励
                    continue;
                }
                cfg1 = cfg;

                let hasDraw = this.hasDrawAwds(bigGateId, cfg.gate_id);
                if (!hasDraw) {
                    //未领取时，结束循环
                    break;
                }
            }
            return cfg1;
        }

        /**
         * 每大关的最后一小关配置（扫荡奖励等用）
         * @param bigGateId
         * @returns
         */
        public getGateEndCfg(bigGateId: number): ForbiddenGateConfig {
            if (this._model.fbdGateEndCfg[bigGateId]) {
                return this._model.fbdGateEndCfg[bigGateId];
            }
            let cfgs = getConfigByNameId(ConfigName.ForbiddenGate, bigGateId);
            if (!cfgs) {
                return null;
            }

            let cfg: ForbiddenGateConfig;
            for (let id in cfgs) {           // 取最后一个
                cfg = cfgs[id];
            }
            if (cfg) {
                this._model.fbdGateEndCfg[bigGateId] = cfg;
            }
            return cfg;
        }

        /**
         * 大关卡是否已通关
         * @param bigGateId
         * @returns
         */
        public isBigGateFinished(type: number, bigGateId: number): boolean {
            // let passSmallGateId = this.getCurSmallGateId(type, bigGateId);
            // let fbdGateCfg = this.getGateEndCfg(bigGateId);
            // return passSmallGateId >= fbdGateCfg.gate_id;

            let info: forbidden_item = this.getFbdInfo(type);
            let isFinished = info ? info.index > bigGateId ||
                info.index >= bigGateId && this.isEndSmallGate2(bigGateId, info.id) : false;
            return isFinished;
        }

        public isFinishByType(type: number): boolean {
            let cfgMap: { [bigGateId: string]: ForbiddenFubenConfig } = this.getFbdFubenCfgByType(type);
            for (let k in cfgMap) {
                let cfg = cfgMap[k];
                let bool: boolean = this.isBigGateFinished(type, cfg.index);
                if (!bool) {
                    return false;
                }
            }
            return true;
        }

        /**
         * 已通关最后一小关卡
         */
        public get isEndSmallGate(): boolean {
            let info = this.getFbdInfo(this.curFbdType);
            if (!info) {
                return false;
            }
            return this.isEndSmallGate2(info.index, info.id);
        }

        /**
         * 是否为最后一小关卡
         */
        public isEndSmallGate2(bigGateId: number, curSmallGateId: number): boolean {
            let endCfg = this.getGateEndCfg(bigGateId);
            if (curSmallGateId >= endCfg.gate_id) {
                return true;
            }
            return false;
        }

        /**
         * 有无大奖可领取
         * @param type
         * @returns
         */
        public hasBigAwd(type: number, bigGateId: number): boolean {
            let awd = this.getFbdAwd2(type, bigGateId);
            return awd ? !!awd.length : false;
        }

        /**
         * 取剩余扫荡次数
         * @param type
         */
        public getSaodangTimes(type: number): number {
            let info: forbidden_item = this.getFbdInfo(type);
            return info ? info.free : 0;
        }

        private updateFbdHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Forbidden)) {
                return;
            }

            let hint = false;
            for (let type = ForbiddenType.Type1; type <= ForbiddenType.Type5; type++) {
                if (this.getFbdTypeHint(type)) {
                    hint = true;
                    break;
                }
            }

            HintMgr.setHint(hint, this._model.fbdHint);
        }

        public getFbdTypeHint(type: number): boolean {
            if (this.getSaodangHint(type)) {
                return true;
            }
            let awd = this.getFbdAwd(type);
            if (awd && awd.length) {
                return true;
            }
            return this.getChallengeHint(type);
        }

        //扫荡红点应该是绑定类型的，而不是具体的关卡，跟设定有关
        public getSaodangHint(type: number): boolean {
            let finished = false;//只要有一个关卡通关，即可扫荡
            let cfgs: { [bigGateId: string]: ForbiddenFubenConfig } = this.getFbdFubenCfgByType(type);
            for (let idx in cfgs) {
                let cfg = cfgs[idx];
                if (this.isBigGateFinished(type, cfg.index)) {
                    finished = true;
                    break;
                }
            }
            if (!finished) {
                return false;
            }
            let times = this.getSaodangTimes(type);
            return times > 0;
        }

        //挑战红点，达到推荐战力时候显示，跟类型绑定就行了
        public getChallengeHint(type: number): boolean {
            let cfgs: { [bigGateId: string]: ForbiddenFubenConfig } = this.getFbdFubenCfgByType(type);
            let curCfg: ForbiddenFubenConfig;//当前挑战的大关卡配置
            for (let idx in cfgs) {
                let cfg = cfgs[idx];
                if (this.isBigGateFinished(type, cfg.index)) {
                    continue;//已通关的关卡跳过判断
                }
                curCfg = cfg;
                break;
            }
            if (!curCfg) {
                return false;//全部关卡已通关，不提示挑战红点，不能根据服务端的数据做判断，拿到的数据可能是已挑战的关卡
            }
            let isLimitOpen = RoleUtil.isLimitOpen(curCfg.open);//是否达到开启限制条件
            if (!isLimitOpen) {
                return false;//未开启时候不提示
            }
            let curInfo = this.getFbdInfo(type);
            //取当前小关卡ID，服务端传的可能是0
            let gateId = curInfo && curInfo.index == curCfg.index && curInfo.id ? curInfo.id : 0;
            gateId++;
            // 红点判断的是下一关的战力 gateId取的是已通关的id
            let gateCfgs = getConfigByNameId(ConfigName.ForbiddenGate, curCfg.index);
            let gateCfg: ForbiddenGateConfig = gateCfgs[gateId];
            let power = gateCfg.show_power;
            return RoleVo.ins.showpower.toNumber() >= power;
        }

        public get curFbdType(): ForbiddenType {
            return this._model.curFbdType;
        }

        public set curFbdType(value: ForbiddenType) {
            this._model.curFbdType = value;
        }

        public get curFbdBigGateId(): number {
            return this._model.curFbdBigGateId;
        }

        public set curFbdBigGateId(value: number) {
            this._model.curFbdBigGateId = value;
        }

        /********************************仙塔副本*********************************/
        public c2s_challenge_xiantower(type: number) {
            let msg = new c2s_challenge_xiantower();
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_xiantower_sweep(type: number) {
            let msg = new c2s_xiantower_sweep();
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_xiantower_get_rewards(type: number) {
            let msg = new c2s_xiantower_get_rewards();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_xiantower_info(n: GameNT) {
            let msg: s2c_xiantower_info = n.body;
            if (!this._model.xiantaInfos) {
                this._model.xiantaInfos = msg.list;
            } else {
                let isSend = false;
                for (let info of msg.list) {
                    let pos = this.getXiantaInfoPos(info.type);
                    if (pos >= 0) {
                        let lastInfo = this._model.xiantaInfos[pos];
                        let lastSweepCnt = lastInfo && lastInfo.count || 0;//上一次扫荡次数

                        this._model.xiantaInfos[pos] = info;

                        let curSweepCnt = info.count;//当前扫荡次数
                        if (!isSend && lastSweepCnt && lastSweepCnt != curSweepCnt) {
                            isSend = true;
                            this.sendNt(RoleEvent.ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT);//扫荡次数变化，抛出事件
                        }
                    } else {
                        this._model.xiantaInfos.push(info);
                    }
                }
            }
            this.updateXiantaHint();
            this.sendNt(ShilianEvent.ON_XIANTA_INFO_UPDATE);
        }

        private getXiantaInfoPos(type: number): number {
            if (!this._model.xiantaInfos || !this._model.xiantaInfos.length) {
                return -1;
            }
            let len = this._model.xiantaInfos.length;
            for (let i = 0; i < len; ++i) {
                let info = this._model.xiantaInfos[i];
                if (info.type == type) {
                    return i;
                }
            }
            return -1;
        }

        /**副本信息*/
        public getXiantaInfo(type: number): xiantower_info {
            let pos = this.getXiantaInfoPos(type);
            if (pos >= 0) {
                return this._model.xiantaInfos[pos];
            }
            return null;
        }

        public getXiantaBigRewardCfg(type: number): XiantaSceneConfig {
            let cfgList: object = getConfigByNameId(ConfigName.XiantaScene, type);//层数配置
            let lv = 1;
            let info = this.getXiantaInfo(type);
            if (info && info.reward) {
                lv = info.reward.layer + 1;//从已领取的奖励开始算起
            }
            let cfg: XiantaSceneConfig = cfgList[lv];
            while (cfg && !cfg.big_reward) {
                lv++;
                cfg = cfgList[lv];//向下寻找奖励
            }
            return cfg;//返回空时不显示大奖
        }

        public isXiantaOpen(type: number, showTips?: boolean): boolean {
            //todo，客户端关闭第三个仙塔
            if (type == RankType.Type3) {
                if (showTips) {
                    PromptBox.getIns().show(getLanById(LanDef.world_boss1));
                }
                return false;
            }
            let cfg: XiantaFubenConfig = getConfigByNameId(ConfigName.XiantaFuben, type);
            return ViewMgr.getIns().checkViewOpen(cfg.copy_open, showTips);
        }

        public get selXiantaType(): number {
            return this._model.selXiantaType;
        }

        public set selXiantaType(type: number) {
            this._model.selXiantaType = type;
        }

        /**仙塔只显示退出按钮，满级或者小于推荐战力*/
        public isXiantaShowExit(): boolean {
            let type = this._model.selXiantaType;
            return !this.checkXiantaChallengeHint(type);
        }

        /**红点*/
        public getXiantaHint(type: number): boolean {
            if (!this.isXiantaOpen(type)) {
                return false;
            }
            let hintType1 = this.getXiantaChallengeHintType(type);
            let hintType2 = this.getXiantaSweepHintType(type);
            let hintType3 = this.getXiantaRewardHintType(type);
            let hintType4 = this.getXiantaRankHintType(type);
            return HintMgr.getHint(hintType1) || HintMgr.getHint(hintType2) || HintMgr.getHint(hintType3) || HintMgr.getHint(hintType4);
        }

        /**挑战红点类型*/
        private getXiantaChallengeHintType(type: number): string[] {
            return this._model.xiantaChallengeHints[type - 1];
        }

        /**扫荡红点类型*/
        private getXiantaSweepHintType(type: number): string[] {
            return this._model.xiantaSweepHints[type - 1];
        }

        /**奖励红点类型*/
        private getXiantaRewardHintType(type: number): string[] {
            return this._model.xiantaRewardHints[type - 1];
        }

        /**奖励红点类型*/
        private getXiantaRankHintType(type: number): string[] {
            return this._model.xiantaRankHints[type - 1];
        }

        /**更新红点*/
        private updateXiantaHint(): void {
            this.updateAllXiantaChallengeHint();
            this.updateAllXiantaSweepHint();
            this.updateAllXiantaRewardHint();
            this.checkAutoChallengeXianta();
        }

        /**更新挑战红点*/
        private updateAllXiantaChallengeHint(): void {
            let typeList = this._model.xiantaTypeList;
            for (let i = 0; i < typeList.length; ++i) {
                let type = typeList[i];
                this.updateXiantaChallengeHint(type);
            }
        }

        private updateXiantaChallengeHint(type: number): void {
            if (!this.isXiantaOpen(type)) {
                return;
            }
            let hint = this.checkXiantaChallengeHint(type);
            let hintType = this.getXiantaChallengeHintType(type);
            //let cfg: XiantaFubenConfig = getConfigByNameId(ConfigName.XiantaFuben, type);
            //HintMgr.setHint(hint, hintType, cfg.copy_open);
            HintMgr.setHint(hint, hintType);//先不设置功能id，根据需求来处理
        }

        private checkXiantaChallengeHint(type: number): boolean {
            let cfgList: XiantaSceneConfig[] = getConfigByNameId(ConfigName.XiantaScene, type);
            let selInfo = this.getXiantaInfo(type);
            let passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
            let curLv = passLv + 1;
            if (!cfgList[curLv]) {
                return false;
            }
            let cfg = cfgList[curLv];
            let power = cfg.show_power;
            return RoleVo.ins.showpower.toNumber() >= power;
        }

        /**更新扫荡红点*/
        private updateAllXiantaSweepHint(): void {
            let typeList = this._model.xiantaTypeList;
            for (let i = 0; i < typeList.length; ++i) {
                let type = typeList[i];
                this.updateXiantaSweepHint(type);
            }
        }

        private updateXiantaSweepHint(type: number): void {
            if (!this.isXiantaOpen(type)) {
                return;
            }
            let hint = this.checkXiantaSweepHint(type);
            let hintType = this.getXiantaSweepHintType(type);
            HintMgr.setHint(hint, hintType);
        }

        private checkXiantaSweepHint(type: number): boolean {
            let selInfo = this.getXiantaInfo(type);
            let passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
            if (!passLv) {
                return false;//未通关不能扫荡
            }
            let cnt = selInfo && selInfo.count ? selInfo.count : 0;
            return cnt > 0;//可扫荡
        }

        /**更新奖励红点*/
        private updateAllXiantaRewardHint(): void {
            let typeList = this._model.xiantaTypeList;
            for (let i = 0; i < typeList.length; ++i) {
                let type = typeList[i];
                this.updateXiantaRewardHint(type);
            }
        }

        private updateXiantaRewardHint(type: number): void {
            if (!this.isXiantaOpen(type)) {
                return;
            }
            let hint = this.checkXiantaRewardHint(type);
            let hintType = this.getXiantaRewardHintType(type);
            HintMgr.setHint(hint, hintType);
        }

        private checkXiantaRewardHint(type: number): boolean {
            let selInfo = this.getXiantaInfo(type);
            let passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
            if (!passLv) {
                return false;
            }
            let bigCfg = this.getXiantaBigRewardCfg(type);
            if (bigCfg) {
                let needLv = bigCfg.lvl;
                return passLv >= needLv;
            }
            return false;
        }

        /**需要监听的，子类重写下*/
        protected onMainPassGuanqiaUpdate(n: GameNT): void {
            this.updateFbdHint();
        }

        /**============== 修仙女仆自动挂机 ==============*/

        private canAutoSweepFuben(type: FubenType): boolean {
            let selInfo = this.getFubenInfo(type);
            let maxLv = selInfo && selInfo.history_lv ? selInfo.history_lv : 0;
            let curLv = selInfo && selInfo.lvl ? selInfo.lvl : 1;
            let cfgList: MaterialSceneConfig[] = getConfigByNameId(ConfigName.MaterialScene, type);
            let isMax = maxLv == curLv && !cfgList[maxLv + 1];

            let selCfg = getConfigByNameId(ConfigName.MaterialFuben, type);
            let openLimit = selCfg.mopup_open;
            let canSweep = maxLv >= openLimit && maxLv > curLv - 1 && !isMax;//可扫荡
            if (canSweep) {
                return true;
            }
            return false;
        }

        private canAutoChallengeFuben(type: FubenType): boolean {
            return this.checkChallengeHint(type) || this.checkResetHint(type);
        }

        //发送副本重置协议
        private _sendFubenReset = false;

        private sendAutoChallengeFuben(fubenType: FubenType): void {
            this.selType = fubenType;//副本结算界面用到
            if (this.canAutoSweepFuben(fubenType)) {
                this.c2s_material_sweep(fubenType);
            } else if (this.checkChallengeHint(fubenType)) {
                this.c2s_material_enter(fubenType);
            } else {
                let info = this.getFubenInfo(fubenType);
                let curLv = info && info.lvl ? info.lvl : 1;
                if (curLv > 1) {
                    this.c2s_material_reset(fubenType);
                    this._sendFubenReset = true;//发送重置协议
                }
            }
        }

        //11.封魔圣殿 12.金龟宝穴 13.蓬莱仙境
        private checkAutoChallengeFuben(): void {
            let list = this._model.typeList;
            for (let type of list) {
                let eventType = FubenToNvpuEventType[type];
                let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, eventType);
                if (!cfg || !cfg.open_func || !ViewMgr.getIns().checkViewOpen(cfg.open_func)) {
                    continue;
                }
                if (this.canAutoChallengeFuben(type)) {
                    RoleUtil.addAutoChallengeEvent(eventType, Handler.alloc(this, this.sendAutoChallengeFuben, [type]));
                } else {
                    RoleUtil.removeAutoChallengeEvent(eventType);
                }
            }
        }

        private canAutoSweepXianta(type: FubenType): boolean {
            if (!this.isXiantaOpen(type)) {
                return false;
            }
            return this.checkXiantaSweepHint(type);
        }

        private sendAutoSweepXianta(type: FubenType): void {
            let can = this.canAutoSweepXianta(type);
            if (can) {
                this.c2s_xiantower_sweep(type);
            }
        }

        //15.万剑仙塔  16.灵兽仙塔
        private checkAutoChallengeXianta(): void {
            let list = this._model.typeList;
            for (let type of list) {
                let eventType = XiantaTypeToNvpuEventType[type];
                if (!this.isXiantaOpen(type) || !eventType) {
                    continue;
                }
                if (this.canAutoSweepXianta(type)) {
                    RoleUtil.addAutoChallengeEvent(eventType, Handler.alloc(this, this.sendAutoSweepXianta, [type]));
                } else {
                    RoleUtil.removeAutoChallengeEvent(eventType);
                }
            }
        }

        private canSweepJindi(type: ForbiddenType): boolean {
            if (!this.isFbdTypeOpen(type)) {
                return false;
            }
            return this.getSaodangHint(type);
        }

        private sendAutoSweepJindi(type: ForbiddenType): void {
            if (this.canSweepJindi(type)) {
                this.c2s_forbidden_sweep(type);
            }
        }

        //17-20
        private checkAutoSweepJindi(): void {
            for (let type = ForbiddenType.Type2; type <= ForbiddenType.Type5; type++) {
                let eventType = JindiToNvpuEventType[type];
                let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, eventType);
                if (!cfg || !cfg.open_func || !ViewMgr.getIns().checkViewOpen(cfg.open_func)) {
                    continue;
                }
                if (this.canSweepJindi(type)) {
                    RoleUtil.addAutoChallengeEvent(eventType, Handler.alloc(this, this.sendAutoSweepJindi, [type]));
                } else {
                    RoleUtil.removeAutoChallengeEvent(eventType);
                }
            }
        }

        /**============== 修仙女仆自动挂机 ==============*/

    }
}