namespace game.mod.xianlu {
    import GameNT = base.GameNT;
    import s2c_xianlu_reinc_info = msg.s2c_xianlu_reinc_info;
    import c2s_xianlu_reinc_levelup = msg.c2s_xianlu_reinc_levelup;
    import RebirthConfig = game.config.RebirthConfig;
    import c2s_xianlu_reinc_getreward = msg.c2s_xianlu_reinc_getreward;
    import c2s_xian_dan_use_pill = msg.c2s_xian_dan_use_pill;
    import s2c_xian_dan_all_info = msg.s2c_xian_dan_all_info;
    import ElixirInitConfig = game.config.ElixirInitConfig;
    import ElixirLimitConfig = game.config.ElixirLimitConfig;
    import attributes = msg.attributes;
    import ElixirBuffConfig = game.config.ElixirBuffConfig;
    import c2s_lingpool_time_reward = msg.c2s_lingpool_time_reward;
    import c2s_lingpool_levelup = msg.c2s_lingpool_levelup;
    import c2s_lingpool_add_unit = msg.c2s_lingpool_add_unit;
    import s2c_lingpool_data_info = msg.s2c_lingpool_data_info;
    import GridConfig = game.config.GridConfig;
    import lingpool_type_data = msg.lingpool_type_data;
    import ParamConfig = game.config.ParamConfig;
    import PoolConfig = game.config.PoolConfig;
    import TimeMgr = base.TimeMgr;
    import c2s_lingpool_onekey_unit = msg.c2s_lingpool_onekey_unit;
    import lingpool_unit_data = msg.lingpool_unit_data;
    import s2c_lingmai_data_info = msg.s2c_lingmai_data_info;
    import s2c_linggen_data_info = msg.s2c_linggen_data_info;
    import c2s_lingmai_levelup = msg.c2s_lingmai_levelup;
    import c2s_linggen_levelup = msg.c2s_linggen_levelup;
    import lingmai_data = msg.lingmai_data;
    import LingmaiConfig = game.config.LingmaiConfig;
    import LingmaiLevelConfig = game.config.LingmaiLevelConfig;
    import facade = base.facade;
    import LinggenLeixingConfig = game.config.LinggenLeixingConfig;
    import LanDef = game.localization.LanDef;
    import LinggenConfig = game.config.LinggenConfig;
    import linggen_data = msg.linggen_data;
    import ShenlingConfig = game.config.ShenlingConfig;
    import GodpowerConfig = game.config.GodpowerConfig;

    export class XianluProxy extends ProxyBase implements IXianluProxy{
        private _model: XianluModel;
        /**获取模块数据，对模块内开放*/
        public get model(): XianluModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new XianluModel();

            this.onProto(s2c_xianlu_reinc_info, this.s2c_xianlu_reinc_info, this);
            this.onProto(s2c_xian_dan_all_info, this.s2c_xian_dan_all_info, this);
            this.onProto(s2c_lingpool_data_info, this.s2c_lingpool_data_info, this);
            this.onProto(s2c_lingmai_data_info, this.s2c_lingmai_data_info, this);
            this.onProto(s2c_linggen_data_info, this.s2c_linggen_data_info, this);

            facade.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_CNT, this.updatePoolBattleHint, this);
        }

        onStartReconnect(): void {
            super.onStartReconnect();
            this._model.index = null;
        }

        private s2c_xianlu_reinc_info(n: GameNT) {
            let msg: s2c_xianlu_reinc_info = n.body;

            //飞升成功提示
            let info: {lastIndex: number, lastLv: number, lastXianpoAttr: attributes};
            if(this._model.index && msg.index && msg.index > this._model.index){
                //转生index变化时，判断当前下发的转生index重数是否为1
                let lv = RoleUtil.getRebirthSubLv(msg.index);
                if(lv == 1){
                    ////上一转生index，上一仙魄等级，上一级仙魄属性
                    info = {lastIndex: this._model.index, lastLv: this._model.xianpolevel, lastXianpoAttr: RoleUtil.clone(this._model.xianpo_attr)};
                }
            }

            //设置仙力效果进玩家 RoleVo，这样原来的代码就不用改多少了。
            //仙魄等级
            let xianpolevel = msg.xianpolevel;
            let cfg:GodpowerConfig = getConfigByNameId(ConfigName.Godpower,xianpolevel);
            if(cfg){
                RoleVo.ins.setValueByKey(AttrKey.god_rate,cfg.god_rate);
            }else{
                RoleVo.ins.setValueByKey(AttrKey.god_rate,0);
            }


            for(let k in msg){
                this._model[k] = msg[k];
            }
            if(info){
                this.sendNt(XianluEvent.REINCARNATE_INFO_UPDATE);//转数发送变化才发送
                facade.showView(ModName.Xianlu, XianluViewType.XiuxianBreakTips, info);
            }
            if(msg.rewardstatus != undefined){
                let hint = msg.rewardstatus == TaskStatus.Finish;
                HintMgr.setHint(hint, this._model.rewardHint);
            }
            if(msg.index != undefined){
                //转生等级变化
                this.updatePillHint();
                this.updatePoolUpHint();
                this.updatePoolBattleHint();
                this.updateLingmaiHint();
                this.updateLinggenHint();
            }
            this.sendNt(XianluEvent.XIUXIAN_INFO_UPDATE);
        }

        public c2s_xianlu_reinc_levelup() {
            let msg = new c2s_xianlu_reinc_levelup();
            this.sendProto(msg);
        }

        public c2s_xianlu_reinc_getreward() {
            let msg = new c2s_xianlu_reinc_getreward();
            this.sendProto(msg);
        }

        public getEndTime(): number {
            return TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
        }

        /**修仙是否可以飞升*/
        public canBreak(): boolean {
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, this._model.index);
            if(!cfg){
                return false;
            }
            let nextIndex = cfg.next_index;
            if(!nextIndex){
                /**满级*/
                return false;
            }
            // let nextCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, nextIndex);
            // if(cfg.relv == nextCfg.relv){
            //     /**下一级不是突破*/
            //     return false;
            // }
            return TaskUtil.hasRewardAllDraw(TaskType.Xiuxian);
        }

        /**修仙是否还有下一转*/
        public getNextCfg(): RebirthConfig {
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, this._model.index);
            if(!cfg){
                return null;
            }
            let nextIndex = cfg.next_index;
            if(!nextIndex){
                /**满级*/
                return null;
            }
            let nextCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, nextIndex);
            while(nextCfg && cfg.relv == nextCfg.relv){
                /**下一级不是突破*/
                nextIndex = nextCfg.next_index;
                nextCfg = getConfigByNameId(ConfigName.Rebirth, nextIndex);
            }
            if(nextCfg && cfg.relv < nextCfg.relv){
                return nextCfg;//下一转的index
            }
            return null;
        }

        /**修仙当前最大重数*/
        public getMaxChongLv(): number {
            let maxLv = 3;
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, this._model.index);
            if(!cfg){
                return maxLv;
            }
            let nextIndex = cfg.next_index;
            if(!nextIndex){
                /**满级*/
                return cfg.relv2;
            }
            let nextCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, nextIndex);
            while(nextCfg && cfg.relv == nextCfg.relv){
                /**下一级不是突破*/
                nextIndex = nextCfg.next_index;
                nextCfg = getConfigByNameId(ConfigName.Rebirth, nextIndex);
                if(nextCfg.relv2 > maxLv){
                    maxLv = nextCfg.relv2;
                }
            }
            return maxLv;
        }

        public c2s_xian_dan_use_pill(index: number) {
            let msg = new c2s_xian_dan_use_pill();
            msg.pillindex = index;
            this.sendProto(msg);
        }

        private s2c_xian_dan_all_info(n: GameNT) {
            let msg: s2c_xian_dan_all_info = n.body;
            if(!this._model.pill_list){
                this._model.pill_list = msg.pill_list;
            }
            else {
                for(let info of msg.pill_list){
                    let pos = this.getPillPos(info.pillindex);
                    if(pos >= 0){
                        this._model.pill_list[pos] = info;
                    }
                    else {
                        this._model.pill_list.push(info);
                    }
                }
            }
            this.updatePillHint();
            this.sendNt(XianluEvent.XIANDAN_INFO_UPDATE);
        }

        private getPillPos(index: number): number {
            if(!this._model.pill_list || !this._model.pill_list.length){
                return -1;
            }
            let len = this._model.pill_list.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.pill_list[i];
                if(info.pillindex == index){
                    return i;
                }
            }
            return -1;
        }
        /**仙丹使用数量*/
        public getPillUseCnt(index: number): number {
            let pos = this.getPillPos(index);
            if(pos >= 0){
                return this._model.pill_list[pos].usecount;
            }
            return 0;
        }

        /**仙丹最大使用数量*/
        public getPillMaxUseCnt(cfg: ElixirInitConfig, nextIndex?: number): number {
            let limitLv = this.getLimitLv(cfg);//吞噬限制转生等级
            let index = nextIndex ? nextIndex : this._model.index;
            return this.calcMaxCnt(cfg.type, limitLv, index);
        }

        //吞噬限制转生等级
        private getLimitLv(cfg: ElixirInitConfig): number {
            let limitIndex = cfg.eat_limit;
            let rebirthCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, limitIndex);
            return rebirthCfg.relv;
        }

        //限制吞噬数量 * (转生等级 + 1 - 吞噬限制转生等级)
        private calcMaxCnt(type: number, limitLv: number, index: number): number {
            let limitNum = this.getLimitNum(type, limitLv);//限制吞噬数量
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            let curLv = cfg.relv;//转生等级
            return limitNum * (curLv + 1 - limitLv);
        }

        //限制吞噬数量
        private getLimitNum(type: number, limitLv: number): number {
            let limitNum = 0;//限制吞噬数量
            let limitCfg: ElixirLimitConfig = getConfigByNameId(ConfigName.Elixir_limit, limitLv);
            switch (type) {
                case PropSubType9.Danyao :
                    limitNum = limitCfg.limit_num;
                    break;
                case PropSubType9.Lingdan :
                    limitNum = limitCfg.limit_num2;
                    break;
                case PropSubType9.Xiandan :
                    limitNum = limitCfg.limit_num3;
                    break;
            }
            return limitNum;
        }

        public getPillCfgList(type: number): ElixirInitConfig[] {
            if(!this._model.pillCfgList[type]){
                let cfgList: ElixirInitConfig[] = getConfigListByName(ConfigName.Elixir_init);
                for(let cfg of cfgList){
                    if(!this._model.pillCfgList[cfg.type]){
                        this._model.pillCfgList[cfg.type] = [];
                    }
                    this._model.pillCfgList[cfg.type].push(cfg);
                }
            }
            return this._model.pillCfgList[type];
        }

        public isPillOpen(cfg: ElixirInitConfig): boolean {
            let limitIndex = cfg.eat_limit;
            return this._model.index >= limitIndex;
        }

        public canPillUse(cfg: ElixirInitConfig): boolean {
            if(!this.isPillOpen(cfg)){
                return false;
            }
            let useCnt = this.getPillUseCnt(cfg.index);
            let maxCnt = this.getPillMaxUseCnt(cfg);
            if(useCnt >= maxCnt){
                return false;
            }
            return BagUtil.checkPropCnt(cfg.itemid);
        }

        public getPillAttrByType(type: number): attributes {
            if(!this._model.pill_list || !this._model.pill_list.length){
                return null;
            }
            let totalAttr: attributes = new attributes();
            let len = this._model.pill_list.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.pill_list[i];
                let index = info.pillindex;
                let cfg: ElixirInitConfig = getConfigByNameId(ConfigName.Elixir_init, index);
                if(cfg.type != type){
                    continue;
                }
                let useCnt = info.usecount;
                let attr = RoleUtil.getAttr(cfg.ability_index);
                attr = TextUtil.calcAttr(attr, useCnt);
                totalAttr = TextUtil.calcAttrList([attr, totalAttr]);
            }
            return totalAttr;
        }

        public getPillAgeByType(type: number): number {
            if(!this._model.pill_list || !this._model.pill_list.length){
                return 0;
            }
            let totalAge = 0;
            let len = this._model.pill_list.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.pill_list[i];
                let index = info.pillindex;
                let cfg: ElixirInitConfig = getConfigByNameId(ConfigName.Elixir_init, index);
                if(cfg.type != type){
                    continue;
                }
                let useCnt = info.usecount;
                let age = useCnt * cfg.age;
                totalAge += age;
            }
            return totalAge;
        }
        /**isMin：取不到buff时是否显示最小buff*/
        public getBuffIndex(type: number, age: number): number {
            let cfg: ElixirBuffConfig = getConfigByNameId(ConfigName.Elixir_buff, type);
            let index = 0;
            for(let i = 0; i < cfg.age.length; ++i){
                let limitAge = cfg.age[i];
                if(age < limitAge){
                    break;
                }
                index = cfg.buff_index[i];
            }
            return index;
        }
        /**取下一阶修为和buff的index*/
        public getNextAgeIndex(type: number): number {
            let age = this.getPillAgeByType(type);
            let cfg: ElixirBuffConfig = getConfigByNameId(ConfigName.Elixir_buff, type);
            for(let i = 0; i < cfg.age.length; ++i){
                let limitAge = cfg.age[i];
                if(age < limitAge){
                    return i;
                }
            }
            return -1;
        }
        /**更新红点*/
        public updatePillHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Xiandan)){
                return;
            }
            for(let i = 1; i <= PropSubType9.Xiandan; ++i){
                let hint = false;
                let hintType = this._model.pillHints[i - 1];
                let cfgList = this.getPillCfgList(i);
                for(let cfg of cfgList){
                    if(this.canPillUse(cfg)){
                        hint = true;
                        break;
                    }
                }
                HintMgr.setHint(hint, hintType);
            }
        }

        public c2s_lingpool_time_reward() {
            let msg = new c2s_lingpool_time_reward();
            this.sendProto(msg);
        }

        public c2s_lingpool_levelup(type: number) {
            let msg = new c2s_lingpool_levelup();
            msg.pooltype = type;
            this.sendProto(msg);
        }

        public c2s_lingpool_add_unit(type: number, index: number) {
            let msg = new c2s_lingpool_add_unit();
            msg.pooltype = type;
            msg.unitid = Long.fromValue(index);
            this.sendProto(msg);
        }

        public c2s_lingpool_onekey_unit(type: number) {
            let msg = new c2s_lingpool_onekey_unit();
            msg.pooltype = type;
            this.sendProto(msg);
        }

        private s2c_lingpool_data_info(n: GameNT) {
            let msg: s2c_lingpool_data_info = n.body;
            if(!this._model.pool_list){
                this._model.pool_list = msg.poollist;
            }
            else {
                for(let info of msg.poollist){
                    let pos = this.getPoolPos(info.pooltype);
                    if(pos >= 0){
                        this._model.pool_list[pos] = info;
                    }
                    else {
                        this._model.pool_list.push(info);
                    }
                }
            }
            this.updatePoolHint();
            this.sendNt(XianluEvent.LINGCHI_INFO_UPDATE);
        }

        private getPoolPos(type: number): number {
            if(!this._model.pool_list || !this._model.pool_list.length){
                return -1;
            }
            let len = this._model.pool_list.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.pool_list[i];
                if(info.pooltype == type){
                    return i;
                }
            }
            return -1;
        }

        public isPoolOpen(cfg: GridConfig): boolean {
            return this._model.index >= cfg.pool_condition;
        }
        /**灵池格子是否开启*/
        public isPoolGridOpen(index: number): boolean {
            return this._model.index >= index;
        }

        public getPoolInfo(type: number): lingpool_type_data {
            let pos = this.getPoolPos(type);
            if(pos >= 0){
                return this._model.pool_list[pos];
            }
            return null;
        }

        public getPoolGridInfos(type: number): lingpool_unit_data[] {
            let info = this.getPoolInfo(type);
            let list: lingpool_unit_data[] = [];
            if(!info.unitlist){
                return list;
            }
            for(let i of info.unitlist){
                if(!i.unitid){
                    //服务端会存0
                    continue;
                }
                list.push(i);
            }
            return list;
        }

        public getPoolGridIndex(type: number, pos: number): number {
            let infos = this.getPoolGridInfos(type);
            for(let i of infos){
                if(i.pos == pos){
                    return i.unitid.toNumber();
                }
            }
            return 0;
        }

        /**收益加成，出战神灵品质计算）,万分比，index神灵index*/
        public getShenlingAdd(index: number): number {
            let pCfg: ParamConfig = GameConfig.getParamConfigById("lingchi_dispatch");
            let datas: number[][] = pCfg.value;
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            if(!cfg){
                return 0;
            }
            let quality = cfg.quality;
            for(let i of datas){
                if(i[0] == quality){
                    return i[1];
                }
            }
            return datas[0][1];//取不到返回第一个
        }

        /**单个灵池总的收益加成，根据出战神灵品质计算）,万分比*/
        //实际神灵精华获取数量 = 产出材料基础数据output * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch + 特权）
        public calcPoolAdd(info: lingpool_type_data): number {
            let shenlingAdd = this.calcShenlingAdd(info);
            let privilegeValue = RoleUtil.getPrivilegeValue(RolePrivilegeKey.lingchi_income);//万分比
            return shenlingAdd + privilegeValue;//特权加成
        }
        /**计算神灵加成*/
        public calcShenlingAdd(info: lingpool_type_data): number {
            let totalAdd = 0;
            if(!info.unitlist || !info.unitlist.length){
                return totalAdd;
            }
            for(let i of info.unitlist){
                if(!i.unitid){
                    continue;
                }
                totalAdd += this.getShenlingAdd(i.unitid.toNumber());
            }
            return totalAdd;
        }

        /**单次收获*/
        /**实际神灵精华获取数量 = 产出材料基础数据_output * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch + buff提升）*/
        public calcPoolPerGain(info: lingpool_type_data): number {
            let cfg = this.getPoolCfg(info.pooltype, info.level);
            if(!cfg){
                return 0;
            }
            let output = cfg.output[0][1];
            return Math.floor(output * (1 + this.calcPoolAdd(info) / 10000));
        }
        /**计算单个灵池总收获*/
        public calcPoolAllGain(info: lingpool_type_data): number {
            let perGain = this.calcPoolPerGain(info);
            let startTime = info.opentime;
            let pCfg1: ParamConfig = GameConfig.getParamConfigById("lingchi_limit");
            let maxTime = pCfg1.value;
            let allTime = Math.min(maxTime, TimeMgr.time.serverTimeSecond - startTime);
            let pCfg2: ParamConfig = GameConfig.getParamConfigById("lingchi_once");
            let perTime = pCfg2.value;
            let cnt = Math.floor(allTime / perTime);
            return perGain * cnt;
        }

        public getPoolCfg(type: number, lv: number): PoolConfig {
            //147001001
            let index = 147000000 + type * 1000 + lv;
            return getConfigByNameId(ConfigName.Pool, index);
        }

        public set poolType(type: number) {
            this._model.poolType = type;
        }
        public get poolType(): number {
            return this._model.poolType;
        }
        public set battleView(val: boolean) {
            this._model.battleView = val;
        }
        public get battleView(): boolean {
            return this._model.battleView;
        }

        /**获取当前可以出战的神灵列表，withoutType：去掉当前已经派遣的神灵*/
        public getShenlingList(type: number, withoutType?: boolean): number[] {
            let proxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let list = proxy.getActedList();
            let battleList: number[] = [];
            let tmpList: number[] = [];
            for(let info of this._model.pool_list){
                if(info.pooltype == type && !withoutType){
                    continue;
                }
                if(!info.unitlist){
                    continue;
                }
                for(let i of info.unitlist){
                    if(!i.unitid){
                        continue;
                    }
                    battleList.push(i.unitid.toNumber());
                }
            }
            for(let index of list){
                if(battleList.indexOf(index) > -1){
                    continue;
                }
                tmpList.push(index);
            }
            let allList: {index: number, order: number}[] = [];
            for(let i of tmpList){
                let order = this.getShenlingAdd(i) + i;
                if(this.isBattle(type, i)){
                    order += 1000;
                }
                allList.push({index: i, order: order});
            }
            allList.sort((v1, v2) => {
                return v2.order - v1.order;
            });
            tmpList = [];
            for(let item of allList){
                tmpList.push(item.index);
            }
            return tmpList;
        }

        public isBattle(type: number, index: number): boolean {
            let infos = this.getPoolGridInfos(type);
            for(let i of infos){
                if(i.unitid.toNumber() == index){
                    return true;
                }
            }
            return false;
        }

        private updatePoolHint(): void {
            this.updatePoolRewardHint();
            this.updatePoolUpHint();
            this.updatePoolBattleHint();
        }

        private updatePoolRewardHint(): void {
            let hint = false;
            for(let info of this._model.pool_list){
                let allGain = this.calcPoolAllGain(info);
                if(allGain > 0){
                    hint = true;
                    break;
                }
            }
            if(!hint){
                let minNextTime = this.getPoolMinNextTime();
                if(minNextTime > 0){
                    HintMgr.addTimeEvent(TimeEventType.Lingchi, minNextTime + TimeMgr.time.serverTimeSecond, this, this.updatePoolRewardHint);
                }
            }
            HintMgr.setHint(hint, this._model.poolRewardHint);
        }
        /**获取灵池下次最小收益时间*/
        private getPoolMinNextTime(): number {
            let minNextTime = 0;
            let pCfg1: ParamConfig = GameConfig.getParamConfigById("lingchi_limit");
            let maxTime = pCfg1.value;
            let pCfg2: ParamConfig = GameConfig.getParamConfigById("lingchi_once");
            let perTime = pCfg2.value;
            for(let info of this._model.pool_list){
                let startTime = info.opentime;
                let leftTime = startTime + maxTime - TimeMgr.time.serverTimeSecond;
                if(leftTime <= 0){
                    continue;
                }
                let nextTime = leftTime % perTime;
                if(!minNextTime || minNextTime < nextTime){
                    minNextTime = nextTime;
                }
            }
            return minNextTime;
        }

        /**道具变更时需要刷新*/
        public updatePoolUpHint(): void {
            if(!this._model.pool_list || !this._model.pool_list.length){
                return;
            }
            let hint = false;
            for(let info of this._model.pool_list){
                if(this.canPoolUp(info)){
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.poolUpHint);
        }

        public canPoolUp(info: lingpool_type_data): boolean {
            let type = info.pooltype;
            let lv = info.level;
            let cfg: PoolConfig = this.getPoolCfg(type, lv);
            let cost = cfg.upgrade;
            let isMax = !cost || !cost.length;
            if(isMax){
                return false;
            }
            for(let i of cost){
                if(!BagUtil.checkPropCnt(i[0], i[1])){
                    return false;
                }
            }
            return true;
        }

        /**神灵变更时需要刷新*/
        public updatePoolBattleHint(): void {
            if(!this._model.pool_list || !this._model.pool_list.length){
                return;
            }
            let hint = false;
            for(let info of this._model.pool_list){
                if(this.canPoolBattle(info)){
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.poolBattleHint);
        }

        public canPoolBattle(info: lingpool_type_data): boolean {
            let cfg: GridConfig = getConfigByNameId(ConfigName.Grid, info.pooltype);
            for(let i = 0; i < cfg.grid_condition.length; ++i){
                let index = cfg.grid_condition[i];//index：开启条件，转生index
                let isOpen = this.isPoolGridOpen(index);
                if(!isOpen){
                    continue;
                }
                let pos = i + 1;
                if(this.canPoolGridBattle(info.pooltype, pos)){
                    return true;
                }
            }
            return false;
        }

        public canPoolGridBattle(type: number, pos: number): boolean {
            let curIndex = this.getPoolGridIndex(type, pos);
            let datas: number[] = this.getShenlingList(type, true);
            if(!curIndex){
                return !!datas.length;
            }
            //更好的神灵可以派遣
            for(let i of datas){
                if(this.checkBestShenling(i, curIndex)){
                    return true;
                }
            }
            return false;
        }

        private checkBestShenling(index: number, curIndex: number): boolean {
            let addNum = this.getShenlingAdd(index);
            let curAddNum = this.getShenlingAdd(curIndex);
            return addNum > curAddNum;
        }

        public checkBestShenlingByIndex(type: number, gridIndex: number): boolean {
            let cfg: GridConfig = getConfigByNameId(ConfigName.Grid, type);
            for(let i = 0; i < cfg.grid_condition.length; ++i){
                let index = cfg.grid_condition[i];//index：开启条件，转生index
                let isOpen = this.isPoolGridOpen(index);
                if(!isOpen){
                    continue;
                }
                let pos = i + 1;
                let curIndex = this.getPoolGridIndex(type, pos);
                if(!curIndex){
                    return true;
                }
                if(this.checkBestShenling(gridIndex, curIndex)){
                    return true;
                }
            }
            return false;
        }

        public getPoolHint(info: lingpool_type_data): boolean {
            if(this.canPoolUp(info)){
                return true;
            }
            if(this.canPoolBattle(info)){
                return true;
            }
            return false;
        }

        ////////////////////仙路-灵脉///////////////
        public c2s_lingmai_levelup(type: number) {
            let msg = new c2s_lingmai_levelup();
            msg.type = type;
            this.sendProto(msg);
        }

        private s2c_lingmai_data_info(n: GameNT) {
            let msg: s2c_lingmai_data_info = n.body;
            if(!this._model.lingmai_list){
                this._model.lingmai_list = msg.list;
            }
            else {
                for(let info of msg.list){
                    let pos = this.getLingmaiPos(info.type);
                    if(pos >= 0){
                        this._model.lingmai_list[pos] = info;
                    }
                    else {
                        this._model.lingmai_list.push(info);
                    }
                }
            }
            this.updateLingmaiHint();
            this.sendNt(XianluEvent.LINGMAI_INFO_UPDATE);
        }

        private getLingmaiPos(type: number): number {
            if(!this._model.lingmai_list || !this._model.lingmai_list.length){
                return -1;
            }
            let len = this._model.lingmai_list.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.lingmai_list[i];
                if(info.type == type){
                    return i;
                }
            }
            return -1;
        }

        public getLingmaiInfo(type: number): lingmai_data {
            let pos = this.getLingmaiPos(type);
            if(pos >= 0){
                return this._model.lingmai_list[pos]
            }
            return null;
        }
        /**总战力*/
        public getLingmaiPower(): Long {
            let power: Long = Long.fromValue(0);
            if(!this._model.lingmai_list || !this._model.lingmai_list.length){
                return power;
            }
            for(let info of this._model.lingmai_list){
                power = power.add(this.getLingmaiPerPower(info));
            }
            return power;
        }
        /**单个灵脉战力，需要计算突破属性*/
        public getLingmaiPerPower(info: lingmai_data): Long {
            let power: Long = Long.fromValue(0);
            if(!info){
                return power;
            }
            if(info.attr && info.attr.showpower){
                power = power.add(info.attr.showpower);
            }
            let cfg: LingmaiConfig = getConfigByNameId(ConfigName.Lingmai, info.type);
            let infos = cfg.break_property;
            let indexList: number[] = [];
            for(let i of infos){
                let lv = i[0];//重数_属性ID_BUFFID
                let attrIndex = i[1];//重数_属性ID_BUFFID
                if(attrIndex && info.splv >= lv){
                    indexList.push(attrIndex);
                }
            }
            let attrList = RoleUtil.getAttrList(indexList);//返回所有属性
            for(let attr of attrList){
                power = power.add(attr.showpower);
            }
            return power;
        }

        /**灵脉达到最大重数*/
        public isLingmaiMax(info: lingmai_data): boolean {
            if(!info){
                return false;
            }
            if(!this._model.lingmaiMaxLv){
                this._model.lingmaiMaxLv = 0;
                let cfgList: object = getConfigByNameId(ConfigName.LingmaiLevel, info.type);
                for(let k in cfgList){
                    let lv = parseInt(k);
                    if(this._model.lingmaiMaxLv < lv){
                        this._model.lingmaiMaxLv = lv;
                    }
                }
            }
            return info.splv >= this._model.lingmaiMaxLv && info.lv >= LingmaiMaxLv;
        }

        public updateLingmaiHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Lingmai)){
                return;
            }
            let cfgList: LingmaiConfig[] = getConfigListByName(ConfigName.Lingmai);
            let hint = false;
            for(let cfg of cfgList){
                if(this.canLingmaiUp(cfg)){
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.lingmaiUpHint);
        }

        public canLingmaiUp(cfg: LingmaiConfig): boolean {
            let _info = this.getLingmaiInfo(cfg.index);
            //let _isAct = _info && _info.splv > 0;//已激活
            let _isAct = !!_info;//取得到信息表示已激活
            let cost: number[];
            if(_isAct){
                //已激活
                let isMax = this.isLingmaiMax(_info);
                if(isMax){
                    //已满级
                    return false;
                }
                let _isBreak = _info.lv >= LingmaiMaxLv;
                if(_isBreak){
                    cost = cfg.break_item[_info.splv];
                }
                else {
                    let cfgList: object = getConfigByNameId(ConfigName.LingmaiLevel, _info.type);
                    let cfg: LingmaiLevelConfig = cfgList[_info.splv];
                    cost = cfg.grade_item[_info.lv];
                }
            }
            else {
                //未激活
                let infos = cfg.activate_condition;
                for(let info of infos){
                    if(!RoleUtil.isLimitOpen(info)){
                        return false;
                    }
                }
                //满足激活条件
                cost = cfg.break_item[0];
            }
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        ////////////////////仙路-灵根///////////////
        public c2s_linggen_levelup(index: number) {
            let msg = new c2s_linggen_levelup();
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_linggen_data_info(n: GameNT) {
            let msg: s2c_linggen_data_info = n.body;
            if(!this._model.linggen_list){
                this._model.linggen_list = msg.list;
            }
            else {
                for(let info of msg.list){
                    let pos = this.getLinggenPos(info.index);
                    if(pos >= 0){
                        this._model.linggen_list[pos] = info;
                    }
                    else {
                        this._model.linggen_list.push(info);
                    }
                }
            }
            this.updateLinggenHint();
            this.sendNt(XianluEvent.LINGGEN_INFO_UPDATE);
        }

        private getLinggenPos(index: number): number {
            if(!this._model.linggen_list || !this._model.linggen_list.length){
                return -1;
            }
            let len = this._model.linggen_list.length;
            for(let i = 0; i < len; ++i){
                let info = this._model.linggen_list[i];
                if(info.index == index){
                    return i;
                }
            }
            return -1;
        }

        public getLinggenInfo(index: number): linggen_data {
            let pos = this.getLinggenPos(index);
            if(pos >= 0){
                return this._model.linggen_list[pos]
            }
            return null;
        }

        public isLinggenTypeOpen(cfg: LinggenLeixingConfig, showTips?: boolean): boolean {
            if(this._model.index < cfg.activate_condition){
                if(showTips){
                    let lv = RoleUtil.getRebirthLv(cfg.activate_condition);
                    let str = lv > 9?LanDef.common_act_tips5:LanDef.common_act_tips1;
                    lv = lv > 9?(lv-9):lv;
                    let tipsStr = StringUtil.substitute(getLanById(str), [lv]);
                    PromptBox.getIns().show(tipsStr);
                }
                return false;
            }
            return true;
        }

        public isLinggenOpen(cfg: LinggenConfig): boolean {
            let infos = cfg.premise;
            if(!infos){
                return true;
            }
            for(let info of infos){
                let index = info[0];
                let lv = info[1];
                let curInfo = this.getLinggenInfo(index);
                if(!curInfo || curInfo.lv < lv){
                    return false;
                }
            }
            return true;
        }

        public getLinggenCfgList(type: number): LinggenConfig[] {
            if(!this._model.linggenCfgList[type]){
                let typeCfg: LinggenLeixingConfig = getConfigByNameId(ConfigName.LinggenLeixing, type);
                let indexList: number[] = typeCfg.linggen_index;
                for(let i of indexList){
                    let cfg: LinggenConfig = getConfigByNameId(ConfigName.Linggen, i);
                    if(!this._model.linggenCfgList[type]){
                        this._model.linggenCfgList[type] = [];
                    }
                    this._model.linggenCfgList[type].push(cfg);
                }
            }
            return this._model.linggenCfgList[type];
        }

        public getLinggenHint(cfg: LinggenConfig): boolean {
            let isOpen = this.isLinggenOpen(cfg);
            if(!isOpen){
                return false;
            }
            let info = this.getLinggenInfo(cfg.index);
            let lv = info ? info.lv : 0;
            let maxLv = cfg.upgrade_item.length;
            let isMax = lv >= maxLv;
            if(isMax){
                return false;
            }
            let cost = cfg.upgrade_item[lv];
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        public getLinggenTypeHint(cfg: LinggenLeixingConfig): boolean {
            if(!this.isLinggenTypeOpen(cfg)){
                return false;
            }
            let cfgList = this.getLinggenCfgList(cfg.type);
            for(let cfg of cfgList){
                if(this.getLinggenHint(cfg)){
                    return true;
                }
            }
            return false;
        }

        private updateLinggenHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Linggen)){
                return;
            }
            let cfgList: LinggenLeixingConfig[] = getConfigListByName(ConfigName.LinggenLeixing);
            let hint = false;
            for(let cfg of cfgList){
                if(this.getLinggenTypeHint(cfg)){
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.linggenUpHint);
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(PropIndex.Lingmaishengdan) >= 0){
                this.updateLingmaiHint();
            }
            if(indexs.indexOf(PropIndex.Genjishengguo) >= 0){
                this.updateLinggenHint();
            }
        }
        protected onBagUpdateByPropType(n: base.GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(PropType.XianDan) < 0){
                return;
            }
            this.updatePillHint();
        }
        protected onTaskHint(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Xiuxian;
            if(types.indexOf(type) < 0){
                return;
            }
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Xiuxian)){
                return;
            }

            let taskHint = TaskUtil.getTaskHint(type);
            HintMgr.setHint(taskHint, [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiuxian, HintType.XiuxianTask]);//任务红点
        }
        protected onTaskUpdate(n: base.GameNT): void {
            let types: number[] = n.body;
            let type = TaskType.Xiuxian;
            if(types.indexOf(type) < 0){
                return;
            }
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Xiuxian)){
                return;
            }

            let breakHint = this.canBreak();
            HintMgr.setHint(breakHint, [ModName.Xianlu, XianluViewType.XianluMain + XianluMainBtnType.Xiuxian, HintType.XiuxianBreak]);//飞升红点
        }
        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.diamond) >= 0 || keys.indexOf(RolePropertyKey.wood) >= 0){
                this.updatePoolUpHint();
            }
            if(keys.indexOf(RolePropertyKey.maiqi) >= 0){
                this.updateLingmaiHint();
            }
        }

        public get xianpolevel(): number {
            return this._model.xianpolevel;
        }
        public get xianpoattr(): attributes {
            return this._model.xianpo_attr;
        }
    }


}