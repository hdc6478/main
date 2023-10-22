namespace game.mod.god {


    import tiandi_level_data = msg.tiandi_level_data;
    import c2s_tiandi_gongfeng = msg.c2s_tiandi_gongfeng;
    import GameNT = base.GameNT;
    import s2c_tiandi_list = msg.s2c_tiandi_list;
    import TiandiTypeConfig = game.config.TiandiTypeConfig;
    import c2s_tiandi_level_up = msg.c2s_tiandi_level_up;
    import TiandiLevelConfig = game.config.TiandiLevelConfig;
    import c2s_tiandi_yuhuang_qiandao = msg.c2s_tiandi_yuhuang_qiandao;
    import s2c_tiandi_yuhuang_qiandao = msg.s2c_tiandi_yuhuang_qiandao;
    import c2s_tiandi_get_level_rewards = msg.c2s_tiandi_get_level_rewards;
    import ParamConfig = game.config.ParamConfig;
    import TiandiYuhuangQiandaoConfig = game.config.TiandiYuhuangQiandaoConfig;
    import common_reward_status = msg.common_reward_status;
    import c2s_tiandi_fengdu_baiguilu = msg.c2s_tiandi_fengdu_baiguilu;
    import s2c_tiandi_fengdu_baiguilu = msg.s2c_tiandi_fengdu_baiguilu;
    import c2s_tiandi_tianlong_level_up = msg.c2s_tiandi_tianlong_level_up;
    import s2c_tiandi_tianlong_list = msg.s2c_tiandi_tianlong_list;
    import c2s_tiandi_shifang_level_up = msg.c2s_tiandi_shifang_level_up;
    import c2s_tiandi_shifang_skill_active = msg.c2s_tiandi_shifang_skill_active;
    import s2c_tiandi_shifang_list = msg.s2c_tiandi_shifang_list;
    import c2s_tiandi_youli_paiqian = msg.c2s_tiandi_youli_paiqian;
    import s2c_tiandi_youli_paiqian_list = msg.s2c_tiandi_youli_paiqian_list;
    import c2s_tiandi_youli_get_rewards = msg.c2s_tiandi_youli_get_rewards;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TiandiShifangYouliConfig = game.config.TiandiShifangYouliConfig;
    import tiandi_youli_paiqian_struct = msg.tiandi_youli_paiqian_struct;
    import tiandi_youli_data = msg.tiandi_youli_data;
    import TiandiShifangConfig = game.config.TiandiShifangConfig;
    import TiandiTianlongJihuoConfig = game.config.TiandiTianlongJihuoConfig;
    import TiandiShifnagLevelConfig = game.config.TiandiShifnagLevelConfig;
    import TiandiTianlongConfig = game.config.TiandiTianlongConfig;
    import TiandiRandomConfig = game.config.TiandiRandomConfig;

    export class GodProxy extends ProxyBase implements UpdateItem, IGodProxy {
        private _model: GodModel;

        public get model(): GodModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new GodModel();

            this.onProto(s2c_tiandi_list, this.s2c_tiandi_list, this);
            this.onProto(s2c_tiandi_yuhuang_qiandao, this.s2c_tiandi_yuhuang_qiandao, this);
            this.onProto(s2c_tiandi_fengdu_baiguilu, this.s2c_tiandi_fengdu_baiguilu, this);
            this.onProto(s2c_tiandi_tianlong_list, this.s2c_tiandi_tianlong_list, this);
            this.onProto(s2c_tiandi_shifang_list, this.s2c_tiandi_shifang_list, this);
            this.onProto(s2c_tiandi_youli_paiqian_list, this.s2c_tiandi_youli_paiqian_list, this);
        }

        update(time: base.Time): void {
            let root: string[] = [...this.common, GodHintType.Type4, GodHintType.Act, MdrTabBtnType.TabBtnType02];
            let bool: boolean = false;
            for (let info of this._model.travel_list) {
                if (info.endtime - TimeMgr.time.serverTimeSecond > 0) {
                    bool = true;
                } else {
                    HintMgr.setHint(true, root)
                }
            }
            if (!bool) {
                HintMgr.setHint(false, root);
                TimeMgr.removeUpdateItem(this);
            }
        }

        //------------------协议---------------------
        public c2s_tiandi_gongfeng(type: number): void {
            let msg: c2s_tiandi_gongfeng = new c2s_tiandi_gongfeng();
            msg.button_type = type;
            this.sendProto(msg);
        }

        public c2s_tiandi_get_level_rewards(itype: number, index: number): void {
            let msg: c2s_tiandi_get_level_rewards = new c2s_tiandi_get_level_rewards();
            msg.index = index;
            msg.itype = itype;
            this.sendProto(msg);
        }

        public c2s_tiandi_level_up(button_type: number, itype: number): void {
            let msg: c2s_tiandi_level_up = new c2s_tiandi_level_up();
            msg.button_type = button_type;
            msg.itype = itype;
            this.sendProto(msg);
        }

        public c2s_tiandi_yuhuang_qiandao(index?: number): void {
            let msg: c2s_tiandi_yuhuang_qiandao = new c2s_tiandi_yuhuang_qiandao();
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_tiandi_fengdu_baiguilu(index: number): void {
            let msg: c2s_tiandi_fengdu_baiguilu = new c2s_tiandi_fengdu_baiguilu();
            msg.index = index;
            this.sendProto(msg);
        }

        public s2c_tiandi_yuhuang_qiandao(n: GameNT): void {
            let msg: s2c_tiandi_yuhuang_qiandao = n.body;
            this._model.is_sign = msg.is_sign || 0;
            this._model.num = msg.num || 0;
            this._model.rewards = msg.rewards || [];
            this.onUpdateHintOfType1Act();
            this.sendNt(GodEvent.ON_UPDATE_TREASURE_INFO);
        }

        private s2c_tiandi_list(n: GameNT): void {
            let msg: s2c_tiandi_list = n.body;
            if (msg.now_itype) {
                this._model.now_itype = msg.now_itype;
                this.onUpdateHintOfMain();
            }
            if (msg.value) {
                this._model.value = msg.value;
            }
            if (msg.tian_di_list) {
                for (let info of msg.tian_di_list) {
                    this._model.infos[info.itype] = info;
                    this.onUpdateHintOfGift(info.itype);
                    this.onUpdateHintOfUp(info.itype);
                    if (info.itype == 1) {
                        this.onUpdateHintOfType1Act();
                    } else if (info.itype == 3) {
                        this.onUpdateHintOfType3Act();
                    } else if (info.itype == 4) {
                        this.onUpdateHintOfType4Act();
                    }
                }
            }
            this.sendNt(GodEvent.ON_UPDATE_ROAD_INFO);
        }

        private s2c_tiandi_fengdu_baiguilu(n: GameNT): void {
            let msg: s2c_tiandi_fengdu_baiguilu = n.body;
            if (msg.ids) {
                this._model.ids = msg.ids;
            }
            this.sendNt(GodEvent.ON_UPDATE_HAUNTED_INFO);
        }

        public c2s_tiandi_tianlong_level_up(button_type: number, itype: number): void {
            let msg: c2s_tiandi_tianlong_level_up = new c2s_tiandi_tianlong_level_up();
            msg.button_type = button_type;
            msg.itype = itype;
            this.sendProto(msg);
        }

        public c2s_tiandi_shifang_level_up(button_type: number, itype: number): void {
            let msg: c2s_tiandi_shifang_level_up = new c2s_tiandi_shifang_level_up();
            msg.button_type = button_type;
            msg.itype = itype;
            this.sendProto(msg);
        }

        public c2s_tiandi_shifang_skill_active(itype: number, index: number): void {
            let msg: c2s_tiandi_shifang_skill_active = new c2s_tiandi_shifang_skill_active();
            msg.itype = itype;
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_tiandi_youli_paiqian(request_list: tiandi_youli_data[]): void {
            let msg: c2s_tiandi_youli_paiqian = new c2s_tiandi_youli_paiqian();
            msg.request_list = request_list;
            this.sendProto(msg);
        }

        public c2s_tiandi_youli_get_rewards(map_type?: number): void {
            let msg: c2s_tiandi_youli_get_rewards = new c2s_tiandi_youli_get_rewards();
            msg.map_type = map_type;
            this.sendProto(msg);
        }

        private s2c_tiandi_tianlong_list(n: GameNT): void {
            let msg: s2c_tiandi_tianlong_list = n.body;
            if (msg.tianlong_list) {
                for (let info of msg.tianlong_list) {
                    this._model.tianlong_list[info.itype] = info;
                }
            }
            this.onUpdateHintOfType3Act();
            this.sendNt(GodEvent.ON_UPDATE_TIANLONG_INFO);
        }

        private s2c_tiandi_shifang_list(n: GameNT): void {
            let msg: s2c_tiandi_shifang_list = n.body;
            if (msg.shifang_list) {
                for (let info of msg.shifang_list) {
                    this._model.shifang_list[info.itype] = info;
                }
            }
            this.onUpdateHintOfType4Act();
            this.sendNt(GodEvent.ON_UPDATE_AVATAR_INFO);
        }

        private s2c_tiandi_youli_paiqian_list(n: GameNT): void {
            let msg: s2c_tiandi_youli_paiqian_list = n.body;
            if (msg.list) {
                this._model.travel_list = msg.list;
                TimeMgr.addUpdateItem(this, 1000);
            }
            this.sendNt(GodEvent.ON_UPDATE_TRAVEL_INFO);
        }

        //------------------协议---------------------

        public get common(): string[] {
            return this._model.common;
        }

        public get iType(): number {
            return this._model.iType;
        }

        public set iType(v: number) {
            this._model.iType = v;
        }

        public get nowType(): number {
            return this._model.now_itype;
        }

        public getActivate(type: number): boolean {
            // return type < this.nowType;
            return this.getInfo(type) != null;
        }

        public get activateCount(): number {
            let count: number = 0;
            for (let k in this._model.infos) {
                count++;
            }
            return count;
        }

        /**活动2激活卡片 */
        public getActivateCount(): number {
            return this._model.ids && this._model.ids.length || 0;
        }

        public getActivateCard(index: number): boolean {
            return this._model.ids && this._model.ids.indexOf(index) > -1;
        }

        public getHint(type: number = this.iType): string[] {
            return this._model.hintNodes[type];
        }

        public getStage(type: number): number {
            let info = this.getInfo(type);
            return info && info.level || 0;
        }

        public getInfo(type: number): tiandi_level_data {
            return this._model.infos[type] || null;
        }

        public getCost(type: number, level: number): TiandiLevelConfig {
            let cfgs = getConfigByNameId(ConfigName.TiandiLevel, type);
            for (let k in cfgs) {
                if (+k == level) {
                    return cfgs[k];
                }
            }
            return null;
        }

        public getPin(type: number = this.iType): number {
            let info = this.getInfo(type);
            let level: number = info && info.level || 0;
            return Math.ceil(level / 10);
        }

        public getActname(type: number): string {
            return this._model.actname[type];
        }

        /**已购买 */
        public getBool(type: number, index: number): boolean {
            let info = this.getInfo(type);
            if (!info || !info.rewards) {
                return false;
            }
            for (let reward of info.rewards) {
                if (+reward.index == index) {
                    return reward.status == 2;
                }
            }
            return false;
        }

        public get value(): number {
            return this._model.value || 0;
        }

        public get maxValue(): number {
            let num: number = 0;
            let cfgArr: TiandiTypeConfig[] = getConfigListByName(ConfigName.TiandiType);
            for (let cfg of cfgArr) {
                // num += cfg.value;
                num = cfg.value;
                if (cfg.itype == this._model.now_itype) {
                    return num;
                }
            }
            return num;
        }

        public get list(): GodListData[] {
            let list: GodListData[] = [];
            for (let type = 1; type <= 4; type++) {
                let info = this._model.infos[`${type}`];
                list.push({type, info})
            }
            return list;
        }

        public getMaxLevel(itype: number = this.iType): number {
            let cfgArr: TiandiLevelConfig[] = getConfigByNameId(ConfigName.TiandiLevel, itype);
            let level: number = 0;
            for (let key in cfgArr) {
                level = cfgArr[key].sp_level;
            }
            return level;
        }

        public getMaxExp(itype: number = this.iType): number {
            let count: number = 0;
            let info = this.getInfo(itype);
            let level: number = info && info.level || 0;
            let cfgArr: TiandiLevelConfig[] = getConfigByNameId(ConfigName.TiandiLevel, itype);
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                if (cfg.sp_level == level) {
                    return cfg.exp;
                }
            }
            return count;
        }

        public getMaxLevelType4(itype: number): number {
            let cfgArr: TiandiShifnagLevelConfig[] = getConfigByNameId(ConfigName.TiandiShifnagLevel, itype);
            let level: number = 0;
            for (let key in cfgArr) {
                level = cfgArr[key].sp_level;
            }
            return level;
        }

        public getMaxLevelType3(itype: number): number {
            let cfgArr: TiandiTianlongConfig[] = getConfigByNameId(ConfigName.TiandiTianlong, itype);
            let level: number = 0;
            for (let key in cfgArr) {
                level = cfgArr[key].sp_level;
            }
            return level;
        }

        public getMaxExpType4(itype: number): number {
            let count: number = 0;
            let info = this.getInfo(itype);
            let level: number = info && info.level || 0;
            let cfgArr: TiandiShifnagLevelConfig[] = getConfigByNameId(ConfigName.TiandiShifnagLevel, itype);
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                if (+key == 1) {
                    count = cfg.exp;
                }
                if (cfg.sp_level == level) {
                    return cfg.exp;
                }
            }
            return count;
        }

        public getMaxExpType3(itype: number): number {
            let count: number = 0;
            let info = this.getInfo(itype);
            let level: number = info && info.level || 0;
            let cfgArr: TiandiTianlongConfig[] = getConfigByNameId(ConfigName.TiandiTianlong, itype);
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                if (cfg.sp_level == level) {
                    return cfg.exp;
                }
            }
            return count;
        }

        public getCostType4(type: number, level: number): TiandiShifnagLevelConfig {
            let cfgs = getConfigByNameId(ConfigName.TiandiShifnagLevel, type);
            for (let k in cfgs) {
                if (+k == level) {
                    return cfgs[k];
                }
            }
            return null;
        }

        public getCostType3(type: number, level: number): TiandiTianlongConfig {
            let cfgs = getConfigByNameId(ConfigName.TiandiTianlong, type);
            for (let k in cfgs) {
                if (+k == level) {
                    return cfgs[k];
                }
            }
            return null;
        }

        public getVipSignCfgArr(): TiandiYuhuangQiandaoConfig[] {
            let cfgArr: TiandiYuhuangQiandaoConfig[] = getConfigListByName(ConfigName.TiandiYuhuangQiandao);
            let list: TiandiYuhuangQiandaoConfig[] = [];
            for (let cfg of cfgArr) {
                if (cfg.other_rewards) {
                    list.push(cfg);
                }
            }
            return list;
        }

        public get isSign(): boolean {
            return this._model.is_sign == 1;
        }

        public get signDay(): number {
            return this._model.num || 0;
        }

        public getAct(type: number): string {
            return this._model.actOfType[type];
        }

        public getVipSignStatus(index: number): common_reward_status {
            for (let reward of this._model.rewards) {
                if (+reward.index == index) {
                    return reward;
                }
            }
            return null;
        }

        public getInitType3Index(): number {
            return 0;
        }

        public getType3Info(index: number): tiandi_level_data {
            return this._model.tianlong_list && this._model.tianlong_list[index] || null;
        }

        public getBuff(index: number): number[] {
            let cfg: TiandiTianlongJihuoConfig = getConfigByNameId(ConfigName.TiandiTianlongJihuo, index);
            let info = this.getType3Info(index);
            if (!info) {
                return cfg.buffs[0];
            }
            let buff: number[] = [];
            for (let nums of cfg.buffs) {
                if (nums[2] <= info.level) {
                    buff = nums;
                }
            }
            return buff;
        }

        public getInitType4Index(): number {
            return 0;
        }

        public getType4Info(index: number): tiandi_level_data {
            return this._model.shifang_list && this._model.shifang_list[index] || null;
        }

        public getYouliArr(): TiandiShifangYouliConfig[] {
            let cfgArr: TiandiShifangYouliConfig[] = getConfigListByName(ConfigName.TiandiShifangYouli);
            let list: TiandiShifangYouliConfig[] = [];
            for (let cfg of cfgArr) {
                if (!cfg.condtions || ViewMgr.getIns().checkViewOpen(cfg.condtions)) {
                    list.push(cfg);
                }
            }
            return list;
        }

        public getYouli(map_type: number): tiandi_youli_paiqian_struct {
            for (let info of this._model.travel_list) {
                if (info.map_type == map_type) {
                    return info
                }
            }
            return null;
        }

        public getYouliChoose(): TiandiShifangConfig[] {
            let list: TiandiShifangConfig[] = [];
            for (let k in this._model.shifang_list) {
                let bool: boolean = false;
                for (let info of this._model.travel_list) {
                    if (+k == info.index) {
                        bool = true;
                        break;
                    }
                }
                if (!bool) {
                    for (let info of this._model.saveChoose) {
                        if (info.index == +k) {
                            bool = true;
                            break;
                        }
                    }
                }
                if (!bool) {
                    let cfg: TiandiShifangConfig = getConfigByNameId(ConfigName.TiandiShifang, +k);
                    list.push(cfg);
                }
            }
            return list;
        }

        public saveChoose(data: tiandi_youli_data): void {
            for (let i = 0; i < this._model.saveChoose.length; i++) {
                let info = this._model.saveChoose[i];
                if (info.map_type == data.map_type) {
                    this._model.saveChoose[i].index == data.index;
                    ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodTravelTip);
                    return;
                }
            }
            this._model.saveChoose.push(data);
            ViewMgr.getIns().showSecondPop(ModName.God, GodViewType.GodTravelTip);
        }

        public getSaveChoose(map_type: number): tiandi_youli_data {
            for (let info of this._model.saveChoose) {
                if (info.map_type == map_type) {
                    return info;
                }
            }
            return null;
        }

        public getPreviewReward(type: number): TiandiRandomConfig[] {
            let cfgs = getConfigByNameId(ConfigName.TiandiRandom, type);
            let list: TiandiRandomConfig[] = [];
            for (let key in cfgs) {
                let cfg = cfgs[key];
                list.push(cfg);
            }
            return list;
        }

        private onUpdateHintOfGift(type: number): void {
            let root: string[] = [...this.common, `0${type}`, GodViewType.GodGiftMain];
            let info = this.getInfo(type);
            if (info && info.rewards) {
                for (let reward of info.rewards) {
                    if (reward.status == 1) {
                        HintMgr.setHint(true, root);
                        return;
                    }
                }
            }
            HintMgr.setHint(false, root);
        }

        private onUpdateHintOfUp(type: number): void {
            let root: string[] = [...this.common, `0${type}`, GodHintType.Up];
            let info = this.getInfo(type);
            if (!info) {
                HintMgr.setHint(false, root);
                return;
            }
            let cfg = this.getCost(type, info.level + 1);
            if (!cfg) {
                HintMgr.setHint(false, root);
                return;
            }
            if (BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1])) {
                HintMgr.setHint(true, root);
                return;
            }
            HintMgr.setHint(false, root);
        }

        private onUpdateHintOfType1Act(): void {
            let root: string[] = [...this.common, GodHintType.Type1, GodHintType.Act];
            if (!this.getActivate(GodType.Type1)) {
                HintMgr.setHint(false, root);
                return;
            }
            if (!this.isSign) {
                HintMgr.setHint(true, root);
                return;
            }
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "tiandilu_condtion");
            if (VipUtil.getShowVipLv() < VipUtil.getShowVipLv(cfg.value)) {
                HintMgr.setHint(false, root);
                return;
            }
            if (this._model.rewards) {
                for (let reward of this._model.rewards) {
                    if (reward.status == 1) {
                        HintMgr.setHint(true, root);
                        return;
                    }
                }
            }
            HintMgr.setHint(false, root);
        }

        private onUpdateHintOfType3Act(): void {
            let root: string[] = [...this.common, GodHintType.Type3, GodHintType.Act];
            if (!this.getActivate(GodType.Type3)) {
                HintMgr.setHint(false, root);
                return;
            }
            let cfgArr: TiandiTianlongJihuoConfig[] = getConfigListByName(ConfigName.TiandiTianlongJihuo);
            for (let cfg of cfgArr) {
                let info = this.getType3Info(cfg.itype);
                if (info) {
                    let cost = this.getCostType3(info.itype, info.level);
                    if (cost && BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1])) {
                        HintMgr.setHint(true, root);
                        return;
                    }
                } else {
                    if (RoleVo.ins.god >= cfg.condtion) {
                        HintMgr.setHint(true, root);
                        return;
                    }
                }
            }
            HintMgr.setHint(false, root);
        }

        private onUpdateHintOfType4Act(): void {
            let root: string[] = [...this.common, GodHintType.Type4, GodHintType.Act];
            if (!this.getActivate(GodType.Type4)) {
                HintMgr.setHint(false, root);
                return;
            }
            let cfgArr: TiandiShifangConfig[] = getConfigListByName(ConfigName.TiandiShifang);
            let bool: boolean = false;
            for (let cfg of cfgArr) {
                let info = this.getType4Info(cfg.itype);
                if (info) {
                    let cost = this.getCostType3(info.itype, info.level);
                    if (cost && BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1])) {
                        bool = true;
                        break;
                    }
                } else {
                    if (ViewMgr.getIns().checkRebirth(cfg.condtion)) {
                        bool = true;
                        return;
                    }
                }
            }
            HintMgr.setHint(bool, [...root, MdrTabBtnType.TabBtnType01]);
        }

        private onUpdateHintOfMain(): void {
            let roots: string[] = [ModName.God, GodViewType.GodMain, MdrTabBtnType.TabBtnType01];
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this.nowType);
            let index: number = cfg.costs[0];
            let count: number = cfg.costs[1];
            let bool: boolean = BagUtil.checkPropCnt(index, count);
            HintMgr.setHint(bool, roots);
        }

        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            if (!indexs) {
                return;
            }
            for (let key in this._model.infos) {
                let info = this._model.infos[key];
                let cfg = this.getCost(info.itype, info.level);
                if (indexs.indexOf(cfg.cost[0][0]) > -1) {
                    this.onUpdateHintOfUp(info.itype);
                }
            }

            if (!this.nowType) {
                return;
            }
            let cfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this.nowType);
            if (indexs.indexOf(cfg.costs[0]) > -1) {
                this.onUpdateHintOfMain();
            }
        }

    }
}