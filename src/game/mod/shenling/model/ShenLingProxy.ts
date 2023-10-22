namespace game.mod.shenling {

    import GameNT = base.GameNT;
    import s2c_god_brother_info = msg.s2c_god_brother_info;
    import c2s_god_brother_levelup = msg.c2s_god_brother_levelup;
    import c2s_god_brother_starup = msg.c2s_god_brother_starup;
    import c2s_god_brother_groupup = msg.c2s_god_brother_groupup;
    import c2s_god_brother_levelrewards = msg.c2s_god_brother_levelrewards;
    import c2s_god_brother_s_skill = msg.c2s_god_brother_s_skill;
    import c2s_god_brother_uporchange = msg.c2s_god_brother_uporchange;
    import god_brother_data = msg.god_brother_data;
    import god_brother_type_data = msg.god_brother_type_data;
    import ShenlingXingjiConfig = game.config.ShenlingXingjiConfig;
    import ShenlingDengjiConfig = game.config.ShenlingDengjiConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import s2c_god_brother_group_list = msg.s2c_god_brother_group_list;
    import s2c_god_brother_unit_reward_list = msg.s2c_god_brother_unit_reward_list;
    import ShenlingJibanConfig = game.config.ShenlingJibanConfig;
    import god_brother_group_data = msg.god_brother_group_data;
    import ShenlingLeixingConfig = game.config.ShenlingLeixingConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;
    import attributes = msg.attributes;
    import c2s_god_brother_evolve = msg.c2s_god_brother_evolve;

    /**
     * @description 神灵系统
     */
    export class ShenLingProxy extends ProxyBase implements IShenLingProxy {
        private _model: ShenLingModel;
        private _actList: number[] = [];//请求激活的神灵index
        private _actJibanMap: { [index: number]: boolean } = {};//羁绊神灵激活

        public get model(): ShenLingModel {
            return this._model;
        }

        onStartReconnect() {
            super.onStartReconnect();
            this._actList = [];
            this._actJibanMap = {};
            this._upStarData = null;
        }

        initialize() {
            super.initialize();
            this._model = new ShenLingModel();
            this.onProto(s2c_god_brother_info, this.s2c_god_brother_info, this);
            this.onProto(s2c_god_brother_group_list, this.s2c_god_brother_group_list, this);
            this.onProto(s2c_god_brother_unit_reward_list, this.s2c_god_brother_unit_reward_list, this);
        }

        /**
         * 升级
         * @param posType
         * @param btnType 1为升级 2为一键升级 3为突破
         */
        public c2s_god_brother_levelup(posType: number, btnType: number): void {
            let msg = new c2s_god_brother_levelup();
            msg.postype = posType;
            msg.buttontype = btnType;
            this.sendProto(msg);
        }

        // 激活 升星
        public c2s_god_brother_starup(index: number): void {
            let msg = new c2s_god_brother_starup();
            msg.index = Long.fromNumber(index);
            if (this._actList && this._actList.indexOf(index) < 0 /*&& !this.getInfoByIndex(index)*/) {
                this._actList.push(index);
            }
            this.sendProto(msg);
        }

        /**
         *  羁绊激活
         *  [index + shenlingIndex] => 激活对应的羁绊神灵index
         *  [index + rewardList] => 激活对应的羁绊奖励
         * @param index 羁绊ID
         * @param rewardList 带rewardindex字段时表示领取羁绊组合达标奖励,不带则表示激活
         * @param shenlingIndex
         */
        public c2s_god_brother_groupup(index: number, rewardList: number[], shenlingIndex: number): void {
            let msg = new c2s_god_brother_groupup();
            msg.groupindex = index;
            if (rewardList && rewardList.length) {
                msg.rewardindex = rewardList;
            }
            if (shenlingIndex) {
                msg.unitindex = Long.fromNumber(shenlingIndex);
                if (this._actJibanMap[shenlingIndex] == undefined) {
                    this._actJibanMap[shenlingIndex] = true;
                }
            }
            this.sendProto(msg);
        }

        // 典籍奖励领取
        public c2s_god_brother_levelrewards(index: number, rewardIdx: number): void {
            let msg = new c2s_god_brother_levelrewards();
            msg.index = Long.fromNumber(index);
            msg.rewardindex = rewardIdx;
            this.sendProto(msg);
        }

        // 合击技能升级  激活灵宝技能
        public c2s_god_brother_s_skill(posType: number, slot: number): void {
            let msg = new c2s_god_brother_s_skill();
            msg.postype = posType;
            msg.slot = slot;
            this.sendProto(msg);
        }

        // 上阵或替换
        public c2s_god_brother_uporchange(posType: number, index: number): void {
            let msg = new c2s_god_brother_uporchange();
            msg.postype = posType;
            msg.index = Long.fromNumber(index);
            this.sendProto(msg);
        }

        // 单个类型神灵也是用该协议更新
        public s2c_god_brother_info(n: GameNT): void {
            let msg = n.body as s2c_god_brother_info;
            if (!msg || !msg.list) {
                return;
            }
            let oldList = this.getActedList();
            let oldTypeList = this.getActedTypeList();
            for (let info of msg.list) {
                this.updateInfo(info);
            }
            let newList = this.getActedList();
            let newTypeList = this.getActedTypeList();
            this.checkCnt(oldList, newList);//检测神灵数量
            this.checkType(oldTypeList, newTypeList);//检测神灵类型
            this.updateHint();
            this.sendNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO);
        }

        //是否是突破等级
        public isBreakThroughLv(data: GodBrotherTypeData): boolean {
            if (!data || !data.splevel_list) {
                return false;
            }
            let isBreak = data.splevel_list.indexOf(data.level) > -1;//已经突破
            if (isBreak) {
                return false;
            }
            let cfg = this.getLevelCfg(data.level);
            if (cfg && cfg.tupo_consume) {
                return true;
            }
            return false;
        }

        /** 根据 postype 更新对应系列神灵信息 */
        public updateInfo(msg: god_brother_type_data): void {
            if (!msg) {
                return;
            }
            let info: GodBrotherTypeData = this._model.list[msg.postype];
            let isBhLv = this.isBreakThroughLv(info);//用于神灵突破弹窗
            if (!info) {
                info = this._model.list[msg.postype] = new GodBrotherTypeData();
            }
            let keys = Object.keys(msg);
            for (let key of keys) {
                if (key == 'list') {
                    continue;
                }
                if (key == 'upindex') {
                    info.upindex = msg.upindex.toNumber();
                } else {
                    info[key] = msg[key];
                }
            }
            if (msg.list != null) {
                if (!info.list) {
                    info.list = {};
                }
                for (let item of msg.list) {
                    let index = item.index.toNumber();
                    if (this._actList && this._actList.indexOf(index) > -1) {
                        let isShowSurfaceTips = false;
                        //外显激活弹窗
                        if (item.star == 1) {
                            isShowSurfaceTips = true;
                            ViewMgr.getIns().showSurfaceTips(index);
                        }
                        //升星成功弹窗
                        if (item.star != 0) {
                            let curStar = item.star || 0;
                            let maxUpStar = this.getMaxStar(index);//升星的最大星级（非觉醒星级）
                            if (curStar <= maxUpStar) {
                                let god = item.attrs && item.attrs[AttrKey.god] || 0;
                                let lastStarCfg = this.getStarCfg(index, curStar - 1);
                                let lastGod = 0;
                                if (lastStarCfg && lastStarCfg.star_property) {
                                    let lastAttr = RoleUtil.getAttr(lastStarCfg.star_property[0]);
                                    lastGod = lastAttr && lastAttr[AttrKey.god] || 0;
                                }
                                let skillId = this.getSkillIdByIndex(index, curStar);
                                let upStarData: UpStarData = {
                                    star: curStar,
                                    skillId: skillId,
                                    attrFont1: god > 0 ? `+${god}` : '',
                                    attrFont0: god > 0 ? `仙力+${lastGod}` : '' //有仙力+0情况，用god>0判断
                                };
                                if (isShowSurfaceTips) {
                                    this._upStarData = upStarData;
                                } else {
                                    this._upStarData = null;
                                    ViewMgr.getIns().showUpStarTips(upStarData);
                                }
                            }
                        }
                        this._actList.splice(this._actList.indexOf(index), 1);
                    }
                    info.list[item.index.toNumber()] = item;
                }
            }

            //升级突破弹窗
            let isBhLv2 = this.isBreakThroughLv(info);
            if (isBhLv && !isBhLv2) {
                let typeCfg = this.getTypeCfg(msg.postype);
                ViewMgr.getIns().showSurfaceUpTips(typeCfg.heji_id, info.skilllevel, true);
            }
        }

        private _upStarData: UpStarData;

        //升星成功弹窗
        protected onSurfaceTipsHide(): void {
            if (this._upStarData) {
                let data = RoleUtil.clone(this._upStarData);
                ViewMgr.getIns().showUpStarTips(data);
                this._upStarData = null;
            }
        }

        //升星所激活的技能id
        private getSkillIdByIndex(index: number, star?: number): number {
            let cfg = this.getShenLingCfg(index);
            if (!cfg) {
                return 0;
            }
            let info = this.getInfoByIndex(index);
            if (star == undefined) {
                star = info && info.star || 0;
            }
            for (let item of cfg.talent1) {
                if (item[0] == star) {
                    return item[1];
                }
            }
            return 0;
        }

        // 羁绊列表
        private s2c_god_brother_group_list(n: GameNT): void {
            let msg = n.body as s2c_god_brother_group_list;
            if (!msg || !msg.list) {
                return;
            }
            for (let item of msg.list) {
                this._model.jiBanList[item.groupindex] = item;

                if (item.idlist) {
                    for (let longId of item.idlist) {
                        if (this._actJibanMap[longId.toNumber()]) {
                            ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                            this._actJibanMap[longId.toNumber()] = null;
                            delete this._actJibanMap[longId.toNumber()];
                        }
                    }
                }
            }

            this.updateHint();
            this.sendNt(ShenLingEvent.ON_SHEN_LING_JI_BAN_UPDATE, msg.list && msg.list[0]);
        }

        // 单个神灵奖励状态更新也走该协议
        private s2c_god_brother_unit_reward_list(n: GameNT): void {
            let msg = n.body as s2c_god_brother_unit_reward_list;
            if (!msg || !msg.list) {
                return;
            }
            for (let item of msg.list) {
                this._model.rewardList[item.index.toNumber()] = item.status;
            }
            this.updateHint();
            this.sendNt(ShenLingEvent.ON_SHEN_LING_REWARD_UPDATE);
        }

        // 神灵进化
        public c2s_god_brother_evolve(index: number): void {
            let msg = new c2s_god_brother_evolve();
            msg.index = Long.fromNumber(index);
            this.sendProto(msg);
        }

        /**====================================== 协议 end ===================================*/

        /**系列神灵信息*/
        public getTypeInfo(type: number): GodBrotherTypeData {
            return this._model.list[type];
        }

        public getInfoByIndex(index: number): god_brother_data {
            let type = this.getShenLingType(index);
            let infos = this.getTypeInfo(type);
            if (!infos || !infos.list) {
                return null;
            }
            return infos.list[index];
        }

        //神灵是否激活
        public isActed(index: number): boolean {
            let info = this.getInfoByIndex(index);
            return info && info.star > 0;
        }

        /**获取羁绊信息*/
        public getJiBanInfo(index: number): god_brother_group_data {
            return this._model.jiBanList[index];
        }

        /**根据类型获取已激活的神灵列表，按战力高低排序*/
        public getActedListByType(type: number, sort: boolean = true): god_brother_data[] {
            let infos = this.getTypeInfo(type);
            if (!infos) {
                return [];
            }
            let list: god_brother_data[] = [];
            for (let index in infos.list) {
                let info = infos.list[index];
                if (!info) {
                    continue;
                }
                list.push(info);
            }
            if (sort) {
                list.sort((a, b) => this.getSinglePower(b) - this.getSinglePower(a));
            }
            return list;
        }

        /**获取已激活的神灵index列表*/
        public getActedList(): number[] {
            let list: number[] = [];
            for (let k in this._model.list) {
                let type = parseInt(k);
                let actedList = this.getActedListByType(type);
                for (let info of actedList) {
                    list.push(info.index.toNumber());
                }
            }
            return list;
        }

        //神灵战力
        public getSinglePower(info: god_brother_data): number {
            if (!info || !info.attrs || !info.attrs.showpower) {
                return 0;
            }
            return info.attrs.showpower.toNumber();
        }

        //神灵战力
        public getSinglePowerByIndex(index: number): number {
            let info = this.getInfoByIndex(index);
            return this.getSinglePower(info);
        }

        //等级战力+系列升星战力
        public getPowerByType(type: number): number {
            let infos = this.getTypeInfo(type);
            if (!infos || !infos.list) {
                return 0;
            }
            let totalPower = 0;
            if (infos.now_attrs && infos.now_attrs.showpower) {
                totalPower = infos.now_attrs.showpower.toNumber();
            }
            for (let idx in infos.list) {
                let info = infos.list[idx];
                if (!info || !info.attrs || !info.attrs.showpower) {
                    continue;
                }
                totalPower += info.attrs.showpower.toNumber();
            }
            return totalPower;
        }

        /**系列神灵属性总和 + 当前阵位的升级属性*/
        public getAttrByType(type: number): msg.attributes {
            let infos = this.getTypeInfo(type);
            if (!infos || !infos.list) {
                return null;
            }
            let attrList: msg.attributes[] = [];
            for (let idx in infos.list) {
                let info = infos.list[idx];
                if (!info || !info.attrs) {
                    continue;
                }
                attrList.push(info.attrs);
            }
            if (infos.now_attrs) {
                attrList.push(infos.now_attrs);
            }
            return TextUtil.calcAttrList(attrList);
        }

        /**神灵总属性*/
        public getAttr(): attributes {
            let attrList: attributes[] = [];
            for (let type of ShenLingTypeAry) {
                let attr = this.getAttrByType(type);
                attrList.push(attr);
            }
            return TextUtil.calcAttrList(attrList);
        }

        /**单个神灵属性*/
        public getAttrByIndex(index: number): msg.attributes {
            let info = this.getInfoByIndex(index);
            return info ? info.attrs : null;
        }

        /**升级是否满级了*/
        public isMaxLv(type: number): boolean {
            let info = this.getTypeInfo(type);
            if (!info) {
                return false;
            }
            let cfg = this.getLevelCfg(info.level);
            let nextCfg = this.getLevelCfg(info.level + 1);
            //没有下一级配置，就是满级了
            return !!(!nextCfg && cfg);
        }

        public canUpLv(type: number, isTips = false): boolean {
            if (this.isMaxLv(type)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.maxlv));
                }
                return false;
            }
            let info = this.getTypeInfo(type);
            if (!info || this.isBreakThrough(type)) {
                return false;
            }
            let lvCfg: ShenlingDengjiConfig = this.getLevelCfg(info.level);
            if (!lvCfg || !lvCfg.star_consume) {
                return false;
            }
            for (let cost of lvCfg.star_consume) {
                if (!BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Text : PropLackType.None)) {
                    return false;
                }
            }
            return true;
        }

        /**
         * 是否到突破阶段了。
         * @param type
         */
        public isBreakThrough(type: number): boolean {
            let info = this.getTypeInfo(type);
            if (!info || this.isMaxLv(type)) {
                return false;
            }
            let cfg: ShenlingDengjiConfig = this.getLevelCfg(info.level);
            let isBh = !!(cfg && cfg.tupo_consume);//需要突破
            if (isBh && info.splevel_list.indexOf(cfg.index) > -1) {
                return false;
            }
            return isBh;
        }

        public canBreakThrough(type: number, isTips = false): boolean {
            let info = this.getTypeInfo(type);
            if (!info || !this.isBreakThrough(type)) {
                return false;
            }
            let lvCfg: ShenlingDengjiConfig = this.getLevelCfg(info.level);
            if (!lvCfg || !lvCfg.tupo_consume || info.splevel_list.indexOf(lvCfg.index) > -1) {
                return false;
            }
            for (let cost of lvCfg.tupo_consume) {
                if (!BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None)) {
                    return false;
                }
            }
            return true;
        }

        /**是否有觉醒阶段*/
        public haveAwakenStatue(index: number): boolean {
            let awakenStar = this.getMaxAwakenStar(index);
            return awakenStar != null;
        }

        /**是否觉醒阶段了*/
        public isAwaken(index: number): boolean {
            let info = this.getInfoByIndex(index);
            if (!info || !this.haveAwakenStatue(index)) {
                return false;
            }
            return info.star >= this.getMaxStar(index);
        }

        public canUpStar(index: number, isTips = false): boolean {
            let info = this.getInfoByIndex(index);
            if (info && info.star >= this.getMaxStar(index)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.lingqi_tips8));
                }
                return false;
            }
            let cfg: ShenlingXingjiConfig = this.getStarCfg(index, info ? info.star + 1 : 1);
            if (!cfg || !cfg.star_consume || cfg.awaken) {
                return false;
            }
            let cnt = 0;
            let cost = cfg.star_consume[0];
            if (cost) {
                cnt = BagUtil.getPropCntByIdx(cost[0]);
            }
            let commonId = this.getCommonCost(index);
            if (commonId) {
                cnt += BagUtil.getPropCntByIdx(commonId);
            }
            if (cnt >= cost[1]) {
                return true;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        public canAwaken(index: number, isTips = false): boolean {
            let info = this.getInfoByIndex(index);
            if (!info || info.star < this.getMaxStar(index)) {
                return false;
            }
            let maxStar = this.getMaxAwakenStar(index);
            if (info.star >= maxStar) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.shenling_tips12));
                }
                return false;
            }
            let cfg: ShenlingXingjiConfig = this.getStarCfg(index, info ? info.star + 1 : this.getMaxStar(index) + 1);
            if (!cfg || !cfg.star_consume) {
                return false;
            }
            for (let cost of cfg.star_consume) {
                if (!BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Text : PropLackType.None)) {
                    return false;
                }
            }
            return true;
        }

        /**获取某个系列第一个可以激活的神灵配置*/
        public getFirstActByType(type: number): ShenlingConfig {
            let info = this.getTypeInfo(type);
            if (info && info.upindex) {
                return null;
            }
            let cfgs = this.getShenLingCfgListByType(type);
            if (!cfgs || !cfgs.length) {
                return null;
            }
            for (let cfg of cfgs) {
                let starCfg = this.getStarCfg(cfg.index, 1);
                if (!starCfg) {
                    continue;
                }
                let cost = starCfg.star_consume[0];
                if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                    return cfg;
                }
            }
            return null;
        }

        /**================================= config =================================*/

        /**神灵类型配置*/
        public getTypeCfg(type: number): ShenlingLeixingConfig {
            return getConfigByNameId(ConfigName.ShenlingType, type);
        }

        /**神灵羁绊配置*/
        public getJiBanCfg(index: number): ShenlingJibanConfig[] {
            if (!this._jiBanCfgMap) {
                this.buildJiBanCfgMap();
            }
            return this._jiBanCfgMap[index] || [];
        }

        /**神灵配置*/
        public getShenLingCfg(index: number): ShenlingConfig {
            return getConfigByNameId(ConfigName.Shenling, index);
        }

        /**神灵等级配置*/
        public getLevelCfg(lv: number): ShenlingDengjiConfig {
            return getConfigByNameId(ConfigName.ShenlingLevel, lv);
        }

        //todo 错误提示，避免提示太多
        private _errorStarCfg: { [index: number]: boolean } = {};

        /**神灵星级配置*/
        public getStarCfg(index: number, star: number): ShenlingXingjiConfig {
            if (!this._starCfgMap) {
                this.buildStarCfgMap();
            }
            if (!this._starCfgMap[index]) {
                if (!this._errorStarCfg[index]) {
                    DEBUG && console.error(`神灵星级配置没有 ${index}`);
                    this._errorStarCfg[index] = true;
                }
                return null;
            }
            return this._starCfgMap[index][star];
        }

        /**获取具体神灵所有星级配置信息*/
        public getStarCfgList(index: number): { [star: number]: ShenlingXingjiConfig } {
            if (!this._starCfgMap) {
                this.buildStarCfgMap();
            }
            if (!this._starCfgMap[index]) {
                if (!this._errorStarCfg[index]) {
                    DEBUG && console.error(`神灵星级配置没有 ${index}`);
                    this._errorStarCfg[index] = true;
                }
                return null;
            }
            return this._starCfgMap[index];
        }

        /**星级配置表映射map*/
        private _starCfgMap: { [index: number]: { [star: number]: ShenlingXingjiConfig } };
        /**神灵对应的 [最大星级, 最大觉醒星级]*/
        private _maxStarMap: { [index: number]: number[] };

        public buildStarCfgMap(): void {
            let cfgs: ShenlingXingjiConfig[] = getConfigListByName(ConfigName.ShenlingStar);
            let cfgMap = this._starCfgMap = {};
            let starMap = this._maxStarMap = {};
            for (let cfg of cfgs) {
                if (!cfg) {
                    continue;
                }
                let index = cfg.shenling_index;
                if (!cfgMap[index]) {
                    cfgMap[index] = {};
                }
                cfgMap[index][cfg.shenling_star] = cfg;

                if (!starMap[index]) {
                    starMap[index] = [];
                }
                if (!cfg.awaken) {
                    starMap[index][0] = Math.max(starMap[index][0] || 0, cfg.shenling_star);
                } else {
                    starMap[index][1] = Math.max(starMap[index][1] || 0, cfg.shenling_star);
                }
            }
        }

        /**升星的最大星级*/
        public getMaxStar(index: number): number {
            if (!this._maxStarMap) {
                this.buildStarCfgMap();
            }
            if (!this._maxStarMap[index]) {
                return 0;
            }
            return this._maxStarMap[index][0];
        }

        /**觉醒的最大星级*/
        public getMaxAwakenStar(index: number): number {
            if (!this._maxStarMap) {
                this.buildStarCfgMap();
            }
            if (!this._maxStarMap[index]) {
                return 0;
            }
            return this._maxStarMap[index][1];
        }

        /**根据类型分类神灵配置*/
        private _typeCfgMap: { [type: number]: ShenlingConfig[] };

        private buildShenLingCfgMap(): void {
            this._typeCfgMap = {};
            let cfgs: ShenlingConfig[] = getConfigListByName(ConfigName.Shenling);
            for (let cfg of cfgs) {
                if (!cfg) {
                    continue;//过滤不展示的
                }
                if (!this._typeCfgMap[cfg.type]) {
                    this._typeCfgMap[cfg.type] = [];
                }
                this._typeCfgMap[cfg.type].push(cfg);
            }
        }

        //是否有对应碎片
        private haveStarCost(index: number): boolean {
            let starCfg = this.getStarCfg(index, 1);
            if (!starCfg || !starCfg.star_consume) {
                return false;
            }
            let cost = starCfg.star_consume[0];
            let costIdx = cost[0];
            return BagUtil.checkPropCnt(costIdx, 1);
        }

        //神灵能否展示出来
        private canShowShenling(cfg: ShenlingConfig): boolean {
            if (!cfg) {
                return false;
            }
            return cfg.show == 1 || this.haveStarCost(cfg.index) || !!this.getInfoByIndex(cfg.index);
        }

        /**获取类型神灵列表*/
        public getShenLingCfgListByType(type: number): ShenlingConfig[] {
            if (!this._typeCfgMap) {
                this.buildShenLingCfgMap();
            }
            //再过滤一波，show==0，有碎片就展示，没有不展示 2023.8.2
            let rst: ShenlingConfig[] = [];
            let cfgList: ShenlingConfig[] = this._typeCfgMap[type] || [];
            for (let cfg of cfgList) {
                if (this.canShowShenling(cfg)) {
                    rst.push(cfg);
                }
            }
            return rst;
        }

        /**获取神灵类型*/
        public getShenLingType(index: number): number {
            let cfg = this.getShenLingCfg(index);
            if (!cfg) {
                DEBUG && console.error(`不存在神灵: ${index}`);
                return 0;
            }
            return cfg.type;
        }

        /**羁绊配置*/
        private _jiBanCfgMap: { [index: number]: ShenlingJibanConfig[] };
        private _jiBanIdxList: number[];

        public buildJiBanCfgMap(): void {
            this._jiBanCfgMap = {};
            this._jiBanIdxList = [];
            let cfgs: ShenlingJibanConfig[] = getConfigListByName(ConfigName.ShenlingJiBan);
            for (let cfg of cfgs) {
                if (!cfg) {
                    continue;
                }
                let id = cfg.jibanid;
                if (!this._jiBanCfgMap[id]) {
                    this._jiBanCfgMap[id] = [];
                }
                if (this._jiBanIdxList.indexOf(id) < 0) {
                    this._jiBanIdxList.push(id);
                }
                this._jiBanCfgMap[id].push(cfg);
            }
        }

        /**羁绊配置的羁绊id列表*/
        public getJiBanIdxList(): number[] {
            if (!this._jiBanIdxList) {
                this.buildJiBanCfgMap();
            }
            return this._jiBanIdxList || [];
        }

        /**================================= hint =================================*/

        /**羁绊红点*/
        public getJiBanHint(): boolean {
            let idxList = this.getJiBanIdxList();
            let hint = false;
            for (let index of idxList) {
                if (this.getJiBanActHint(index) || this.getJiBanRewardHint(index)) {
                    hint = true;
                    break;
                }
                let cfgs = this.getJiBanCfg(index);
                if (!cfgs || !cfgs.length) {
                    continue;
                }
                let partners = cfgs[0].partners;
                for (let shenlingIdx of partners) {
                    if (this.getJiBanShenLingActHint(index, shenlingIdx)) {
                        hint = true;
                        break;
                    }
                }
                if (hint) {
                    break;
                }
            }
            // 羁绊面板的神灵羁绊红点
            HintMgr.setHint(hint, this._model.jibanHintPath);
            return hint;
        }

        /**
         * 羁绊神灵激活红点
         * @param jbIndex 羁绊ID
         * @param index 神灵index
         */
        public getJiBanShenLingActHint(jbIndex: number, index: number): boolean {
            let jiBanInfo = this.getJiBanInfo(jbIndex);
            let actedList = jiBanInfo && jiBanInfo.idlist || [];//激活的神灵index

            for (let id of actedList) {
                if (id.eq(Long.fromNumber(index))) {
                    return false;
                }
            }
            let info = this.getInfoByIndex(index);
            return !!info;
        }

        /**羁绊神灵激活红点*/
        public getJibanShenlingHint(jbIndex: number): boolean {
            let cfgs = this.getJiBanCfg(jbIndex);
            if (!cfgs || !cfgs.length) {
                return false;
            }
            let partners = cfgs[0].partners;
            for (let shenlingIdx of partners) {
                if (this.getJiBanShenLingActHint(jbIndex, shenlingIdx)) {
                    return true;
                }
            }
            return false;
        }

        /**羁绊激活和升级红点*/
        public getJiBanActHint(index: number, isTips = false): boolean {
            let mainInfo = this.getJiBanInfo(index);
            let cfgs = this.getJiBanCfg(index);
            if (mainInfo && cfgs && mainInfo.level >= cfgs.length) {
                return false;
            }
            //神灵有未激活
            if (!mainInfo || !cfgs || !cfgs.length || !mainInfo.idlist || mainInfo.idlist.length < cfgs[0].partners.length) {
                if (isTips) {
                    PromptBox.getIns().show(`未达到激活条件`);
                }
                return false;
            }
            let lv = mainInfo.level || 0;
            for (let i = lv; i < cfgs.length; i++) {
                let cfg = cfgs[i];
                if (!cfg) {
                    continue;
                }
                let actNum = 0;
                let totalNum = cfg.partners.length;
                for (let idx of cfg.partners) {
                    let info = this.getInfoByIndex(idx);
                    if (info && info.star >= cfg.star) {
                        actNum++;
                    }
                }
                if (actNum >= totalNum) {
                    return true;
                }
            }
            if (isTips) {
                PromptBox.getIns().show(`未达到进阶条件`);
            }
            return false;
        }

        /**羁绊奖励红点*/
        public getJiBanRewardHint(index: number): boolean {
            let info = this.getJiBanInfo(index);
            if (!info || !info.level) {
                return false;
            }
            let rewardList = info.reward_list || [];
            for (let item of rewardList) {
                if (item == 1) {
                    return true;
                }
            }
            return false;
        }

        /**羁绊item的红点：神灵激活红点，羁绊激活升级红点，羁绊奖励红点*/
        public getJibanHint(jbIndex: number): boolean {
            return this.getJibanShenlingHint(jbIndex)
                || this.getJiBanActHint(jbIndex)
                || this.getJiBanRewardHint(jbIndex);
        }

        /**判断灵宝技能是否可激活*/
        public checkLingBaoSkillAct(type: number, skillIdx: number): boolean {
            let info = this.getTypeInfo(type);
            if (!info || !info.upindex) {
                return false;
            }
            let actedList = info.skill_list || [];
            if (actedList.indexOf(skillIdx) > -1) {
                return false;
            }
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillIdx);
            if (!skillCfg || !skillCfg.act_material) {
                return false;
            }
            let cost = skillCfg.act_material[0];
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        /**主界面的灵宝技能激活红点*/
        public getLingBaoSkillHint(type: number): boolean {
            let cfg = this.getTypeCfg(type);
            if (!cfg) {
                return false;
            }
            let skills = cfg.skill_array || [];
            for (let idx of skills) {
                if (this.checkLingBaoSkillAct(type, idx)) {
                    return true;
                }
            }
            return false;
        }

        /**上阵红点*/
        public getShangZhenHint(): boolean {
            let isHint = false;
            for (let type of ShenLingTypeAry) {
                let typeInfo = this.getTypeInfo(type);
                if (!typeInfo || !typeInfo.upindex) {
                    continue;
                }
                let curPower = this.getSinglePower(this.getInfoByIndex(typeInfo.upindex));
                let actedList = this.getActedListByType(type);
                for (let info of actedList) {
                    if (info && info.index.toNumber() == typeInfo.upindex) {
                        continue;
                    }
                    if (this.getSinglePower(info) > curPower) {
                        isHint = true;
                        break;
                    }
                }
                if (isHint) {
                    break;
                }
            }
            return isHint;
        }

        /**判断未激活阵位的是否有可以激活的神灵*/
        public checkActByNotUpType(type: number): boolean {
            let cfg = this.getFirstActByType(type);
            return !!cfg;
        }

        /**神灵主界面的类型红点*/
        public getMainHintByType(type: number): boolean {
            let typeInfo = this.getTypeInfo(type);
            if (!typeInfo || !typeInfo.upindex) {
                return this.checkActByNotUpType(type);
            }
            return this.getJiBanHint() || this.canBreakThrough(type)
                || this.canUpLv(type) || this.getLingBaoSkillHint(type)
                || this.getShangZhenHint();
        }

        /**神迹奖励长度*/
        private _shenjiMap: { [index: number]: number } = {};

        private getShenJiRewardLen(index: number): number {
            if (this._shenjiMap[index] != null) {
                return this._shenjiMap[index];
            }
            let cfgs = this.getStarCfgList(index);
            let size = 0;
            for (let idx in cfgs) {
                let cfg = cfgs[idx];
                if (cfg && !cfg.awaken) {
                    size++;
                }
            }
            this._shenjiMap[index] = size;
            return size;
        }

        /**神迹奖励红点*/
        public getShenJiRewardHint(index: number): boolean {
            let rewardList: number[] = this._model.rewardList[index];
            if (!rewardList || !rewardList.length) {
                return false;
            }
            let size = this.getShenJiRewardLen(index);
            let list = rewardList.slice(0, size);//神迹奖励位，服务端下发包括觉醒奖励，服务端不过滤
            return list.indexOf(1) > -1;
        }

        /**升星界面的单个神灵*/
        public getStarHintByIndex(index: number): boolean {
            return this.canUpStar(index) || this.canAwaken(index) || this.getShenJiRewardHint(index) || this.getEvolveHint(index);
        }

        /**升星界面的类型红点*/
        public getStarHintByType(type: number): boolean {
            if (this.checkActByNotUpType(type)) {
                return true;
            }
            let cfgList = this.getShenLingCfgListByType(type);
            if (!cfgList || !cfgList.length) {
                return false;
            }
            for (let cfg of cfgList) {
                if (!cfg) {
                    continue;
                }
                if (this.getStarHintByIndex(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        public updateHint(): void {
            if (!this.checkOpenIdx()) {
                return;
            }
            let mainHint: boolean = false;
            let upStarHint: boolean = false;
            for (let type of ShenLingTypeAry) {
                if (!mainHint && this.getMainHintByType(type)) {
                    mainHint = true;
                }
                if (!upStarHint && this.getStarHintByType(type)) {
                    upStarHint = true;
                }
                HintMgr.setHint(mainHint, [...this._model.mainHintPath, `${type}`]);
                HintMgr.setHint(upStarHint, [...this._model.upStarHintPath, `${type}`]);
            }
        }

        private _consumeList: number[] = [];

        /**等级升级和突破消耗，星级消耗，灵宝技能消耗*/
        public getConsumeList(): number[] {
            if (this._consumeList && this._consumeList.length) {
                return this._consumeList;
            }
            let lvCfgs: ShenlingDengjiConfig[] = getConfigListByName(ConfigName.ShenlingLevel);
            for (let cfg of lvCfgs) {
                if (!cfg) {
                    continue;
                }
                if (cfg.star_consume) {
                    cfg.star_consume.forEach(item => {
                        if (this._consumeList.indexOf(item[0]) < 0) {
                            this._consumeList.push(item[0]);
                        }
                    });
                }
                if (cfg.tupo_consume) {
                    cfg.tupo_consume.forEach(item => {
                        if (this._consumeList.indexOf(item[0]) < 0) {
                            this._consumeList.push(item[0]);
                        }
                    });
                    break;//读取到有消耗的就退出循环
                }
            }
            let starCfgs: ShenlingXingjiConfig[] = getConfigListByName(ConfigName.ShenlingStar);
            for (let cfg of starCfgs) {
                if (!cfg) {
                    continue;
                }
                if (cfg.star_consume) {
                    cfg.star_consume.forEach(item => {
                        if (this._consumeList.indexOf(item[0]) < 0) {
                            this._consumeList.push(item[0]);
                        }
                    });
                }
            }
            let typeCfgs: ShenlingLeixingConfig[] = getConfigListByName(ConfigName.ShenlingType);
            for (let cfg of typeCfgs) {
                if (!cfg || !cfg.skill_array) {
                    continue;
                }
                for (let skillIdx of cfg.skill_array) {
                    let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillIdx);
                    if (!skillCfg || !skillCfg.act_material) {
                        continue;
                    }
                    let cost = skillCfg.act_material[0];
                    if (this._consumeList.indexOf(cost[0]) < 0) {
                        this._consumeList.push(cost[0]);
                    }
                }
            }
            return this._consumeList;
        }

        /**星级消耗*/
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void {
            if (!this.checkOpenIdx()) {
                return;
            }
            let list: { [type: number]: number[] } = n.body;
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    let types = list[type];
                    if (types && types.indexOf(PropSubType11.Shenling) > -1) {
                        this.updateHint();
                        break;
                    }
                }
            }
        }

        /**升级，突破，星级觉醒消耗*/
        protected onBagUpdateByPropIndex(n: GameNT): void {
            if (!this.checkOpenIdx()) {
                return;
            }
            let list = n.body as number[];
            let consumeList = this.getConsumeList();
            for (let idx of list) {
                if (consumeList.indexOf(idx) > -1) {
                    this.updateHint();
                    break;
                }
            }
        }

        private checkOpenIdx(): boolean {
            return ViewMgr.getIns().checkViewOpen(OpenIdx.Shenling);
        }

        /**================================= 属性 =================================*/

        /**
         * 获取阵位神灵的特殊属性信息 例如：风蚀等级: 100, 风蚀攻击: 100
         * @param type 阵位类型
         */
        public getSpecialAttrsByType(type: number): string[] {
            let attrs = this.getAttrByType(type);
            let attrKeys = ShenLingTypeAttrKey[type];
            let rst: string[] = [];
            //等级
            if (attrs && attrs[attrKeys[0]]) {
                let txt = TextUtil.getAttrsText(attrKeys[0]) + ': ' +
                    TextUtil.addColor((attrs[attrKeys[0]]) + '', WhiteColor.GREEN);
                rst.push(txt);
            }
            if (attrs && attrs[attrKeys[1]]) {
                let txt1 = TextUtil.getAttrsText(attrKeys[1]) + ': ' +
                    TextUtil.addColor((attrs[attrKeys[1]]) + '', WhiteColor.GREEN);
                rst.push(txt1);
            }
            return rst;
        }

        /**
         * 单个神灵的特殊属性信息 例如：风蚀等级: 100, 风蚀攻击: 100
         * @param index
         */
        public getSpecialAttrsByIdx(index: number): string[] {
            let type = this.getShenLingType(index);
            let attrKeys = ShenLingTypeAttrKey[type];
            let attrs = this.getAttrByIndex(index);
            let rst: string[] = [];
            //等级
            if (attrs && attrs[attrKeys[0]]) {
                let txt = TextUtil.getAttrsText(attrKeys[0]) + ': ' +
                    TextUtil.addColor((attrs[attrKeys[0]]) + '', WhiteColor.GREEN);
                rst.push(txt);
            }

            //攻击
            if (attrs && attrs[attrKeys[1]]) {
                let txt1 = TextUtil.getAttrsText(attrKeys[1]) + ': ' +
                    TextUtil.addColor((attrs[attrKeys[1]]) + '', WhiteColor.GREEN);
                rst.push(txt1);
            }
            return rst;
        }

        /**检测神灵数量是否变更*/
        private checkCnt(oldList: number[], newList: number[]): void {
            if (oldList.length != newList.length) {
                this.sendNt(ShenLingEvent.ON_SHEN_LING_UPDATE_CNT);
            }
        }

        public isTypeActed(type: ShenLingType): boolean {
            let info = this.getTypeInfo(type);
            return !!info;
        }

        public getActedTypeList(): ShenLingType[] {
            let ary: ShenLingType[] = [];
            for (let type of ShenLingTypeAry) {
                if (this.isTypeActed(type)) {
                    ary.push(type);
                }
            }
            return ary;
        }

        public checkType(oldTypes: ShenLingType[], newTypes: ShenLingType[]): void {
            if (oldTypes.length != newTypes.length) {
                this.sendNt(ShenLingEvent.ON_SHEN_LING_UPDATE_TYPE);
            }
        }

        //某个类型可以升级
        public haveUpLvType(): boolean {
            for (let type of ShenLingTypeAry) {
                if (this.canUpLv(type)) {
                    return true;
                }
            }
            return false;
        }

        /**某阵位可激活，isFirst判断阵位*/
        public haveActType(isFirst = true): boolean {
            for (let type of ShenLingTypeAry) {
                let cfg = isFirst ? this.getFirstActByType(type) : this.canActByType(type);
                if (cfg) {
                    return true;
                }
            }
            return false;
        }

        //某个类型有可激活的
        public canActByType(type: ShenLingType): boolean {
            let cfgList = this.getShenLingCfgListByType(type);
            for (let cfg of cfgList) {
                if (this.isActed(cfg.index)) {
                    continue;
                }
                if (this.canUpStar(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        //某个类型可以升星
        public canUpStarByType(type: ShenLingType): boolean {
            let cfgList = this.getShenLingCfgListByType(type);
            for (let cfg of cfgList) {
                if (this.canUpStar(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        /**某阵位可升星*/
        public haveUpStarType(): boolean {
            for (let type of ShenLingTypeAry) {
                if (this.canUpStarByType(type)) {
                    return true;
                }
            }
            return false;
        }

        //是否有激活的阵位
        public haveShangzhen(): boolean {
            for (let type of ShenLingTypeAry) {
                let info = this.getTypeInfo(type);
                if (info && info.upindex) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 点击主界面神灵按钮，进入界面优先选中的一级页签
         * 可激活阵位，可升星，可升级或突破，有上阵的是0，否则是1
         */
        public getSelTab(): number {
            //存在激活和升级指引时，优先指引选中
            let guideKeyList = [GuideKey.ShenlingAct, GuideKey.ShenlingOneUp, GuideKey.ShenlingOneUpAutoSel];
            if (this.haveActType() || GuideMgr.getIns().hasGuideKey(guideKeyList)) {
                return 0;
            }
            if (this.haveUpStarType()) {
                return 1;
            }
            if (this.haveUpLvType()) {
                return 0;
            }
            if (this.haveShangzhen()) {
                return 0;
            }
            return 1;
        }

        //升星界面的类型选择，优先可升星类型，默认首个
        public getUpStarSelType(getNext = false): ShenLingType {
            for (let type of ShenLingTypeAry) {
                if (this.canUpStarByType(type)) {
                    return type;
                }
            }
            return getNext ? 0 : ShenLingTypeAry[0];
        }

        /**================================神灵进化================================*/

        //是否有进化功能
        public haveEvolve(index: number): boolean {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            return cfg && cfg.subtype == 1;
        }

        //已进化次数
        public getEvolvedCnt(index: number): number {
            let info = this.getInfoByIndex(index);
            return info && info.evolutions || 0;
        }

        //神灵品质
        public getCurQuality(index: number): number {
            let cfg = this.getShenLingCfg(index);
            if (!this.haveEvolve(index)) {
                return cfg && cfg.quality || 0;
            }
            let evolvedCnt = this.getEvolvedCnt(index);
            let qualityRange = this.getEvolveQualityRange(index);
            let initQua = qualityRange[0] || 0;
            return Math.max(initQua, initQua + evolvedCnt - 1);
        }

        //已进化后当前的品质
        public getCurEvolvedQuality(index: number): number {
            if (!this.haveEvolve(index) || !this.isActed(index)) {
                return 0;
            }
            let qualityRange = this.getEvolveQualityRange(index);
            let cnt = this.getEvolvedCnt(index);
            return qualityRange[0] + cnt - 1;
        }

        //下一阶进化品质
        public getNextEvolvedQuality(index: number): number {
            if (!this.haveEvolve(index) || !this.isActed(index)) {
                return 0;
            }
            let curQuality = this.getCurEvolvedQuality(index);
            let qualityRange = this.getEvolveQualityRange(index);
            if (curQuality >= qualityRange[1]) {
                return qualityRange[1];
            }
            return curQuality + 1;
        }

        //进化的任务id列表
        public getEvolveTaskIds(index: number): number[] {
            let cfg: ShenlingConfig = this.getShenLingCfg(index);
            if (!this.isActed(index) || !cfg) {
                return [];
            }
            let evolvedCnt = this.getEvolvedCnt(index);
            let idx = Math.max(evolvedCnt - 1, 0);
            let task_id = cfg.task_id;
            return task_id && task_id[idx] ? task_id[idx] : [];
        }

        //某阶进化的任务是否全部完成
        public isEvolveTaskAllDone(index: number): boolean {
            let taskIds = this.getEvolveTaskIds(index);
            let allDone = true;
            for (let taskId of taskIds) {
                let taskData = TaskUtil.getTask(taskId);
                if (!taskData || !TaskUtil.hasRewardDraw(taskData)) {
                    allDone = false;
                    break;
                }
            }
            return allDone;
        }

        //能否进阶
        public canEvolve(index: number): boolean {
            if (!this.haveEvolve(index) || this.isMaxEvolve(index)) {
                return false;
            }
            //任务完成且未进化
            if (this.isEvolveTaskAllDone(index)) {
                return true;
            }
            return false;
        }

        private _evolveMaxQuality: { [index: number]: number[] } = {};

        //进化的阶数范围
        public getEvolveQualityRange(index: number): number[] {
            if (this._evolveMaxQuality[index]) {
                return this._evolveMaxQuality[index];
            }
            let cfg = this.getShenLingCfg(index);
            if (!cfg || !cfg.character || !this.haveEvolve(index)) {
                return [0, 0];
            }
            this._evolveMaxQuality[index] = cfg.character;
            return cfg.character;
        }

        //是否进化到最高阶了
        public isMaxEvolve(index: number): boolean {
            let qualityAry = this.getEvolveQualityRange(index);
            if (!qualityAry) {
                return false;
            }
            let cnt = this.getEvolvedCnt(index);
            let needCnt = qualityAry[1] - qualityAry[0] + 1;
            return cnt >= needCnt;
        }

        //进化红点
        public getEvolveHint(index: number): boolean {
            if (!this.haveEvolve(index) || this.isMaxEvolve(index) || !this.isActed(index)) {
                return false;
            }
            let taskIds = this.getEvolveTaskIds(index);
            for (let taskId of taskIds) {
                let taskData = TaskUtil.getTask(taskId);
                if (!taskData) {
                    continue;
                }
                if (TaskUtil.canRewardDraw(taskData)) {
                    return true;
                }
            }
            if (this.canEvolve(index)) {
                return true;
            }
            return false;
        }

        protected onTaskUpdate(n: GameNT) {
            let types = n.body as number[];
            if (types.indexOf(TaskType.ShenlingEvolve) > -1) {
                this.updateHint();
            }
        }

        /**神灵模型名称*/
        public getShenlingModelName(index: number): string {
            let cfg = this.getShenLingCfg(index);
            if (!cfg) {
                return '';
            }
            if (!this.haveEvolve(index)) {
                return cfg.icon;
            }
            let evolvedCnt = this.getEvolvedCnt(index);//已进化次数
            let idx = Math.max(0, evolvedCnt - 1);//模型名称索引
            let icons = cfg.icons.split(',');
            return icons[idx] || icons[0];
        }

        /**================================神灵进化end================================*/

        /**
         * 通用升星碎片id，只用于非进化神灵的升星。
         * （激活不可使用，进化神灵不可使用）
         * @param index
         */
        public getCommonCost(index: number): number {
            let info = this.getInfoByIndex(index);
            if (!info || !info.star) {
                return 0;
            }
            let cfg = this.getShenLingCfg(index);
            if (!cfg || cfg.subtype == 1) {
                return 0;
            }
            let paramCfg = GameConfig.getParamConfigById('shenling_star_prop');
            let value: number[] = paramCfg.value;
            return value[cfg.quality - 1];
        }

        //神灵页签的战力显示
        public getAllPowerByType(type: ShenLingType): number {
            let power = 0;
            let lingqiProxy: ShenLingLingQiProxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingqi);
            power += lingqiProxy.getPowerByType(type);
            let lingpoProxy: ShenlingLingpoProxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingpo);
            power += lingpoProxy.getPowerByType(type);
            let lingliProxy: ShenlingLingliProxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingli);
            power += lingliProxy.getPowerByType(type);
            power += this.getPowerByType(type);
            return power;
        }
    }

}