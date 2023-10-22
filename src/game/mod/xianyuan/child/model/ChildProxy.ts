namespace game.mod.xianyuan {

    import c2s_xianlv_child_starup = msg.c2s_xianlv_child_starup;
    import GameNT = base.GameNT;
    import s2c_xianlv_child_info = msg.s2c_xianlv_child_info;
    import c2s_child_oper_jiban = msg.c2s_child_oper_jiban;
    import s2c_child_oper_jiban = msg.s2c_child_oper_jiban;
    import xianlv_child_infos = msg.xianlv_child_infos;
    import child_jiban_infos = msg.child_jiban_infos;
    import ChildConfig = game.config.ChildConfig;
    import ChildJibanConfig = game.config.ChildJibanConfig;
    import ChildShengxingConfig = game.config.ChildShengxingConfig;
    import LanDef = game.localization.LanDef;
    import c2s_child_oper_shenbin = msg.c2s_child_oper_shenbin;
    import s2c_child_shenbin_info = msg.s2c_child_shenbin_info;
    import ChildShenbingConfig = game.config.ChildShenbingConfig;
    import ChildLingyiConfig = game.config.ChildLingyiConfig;
    import child_shenbin_info = msg.child_shenbin_info;
    import c2s_child_share_skill_act = msg.c2s_child_share_skill_act;
    import c2s_child_equip = msg.c2s_child_equip;
    import c2s_child_into_battle = msg.c2s_child_into_battle;
    import s2c_child_share_info = msg.s2c_child_share_info;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import attributes = msg.attributes;

    /**
     * @description 仙侣-子女系统
     */
    export class ChildProxy extends ProxyBase implements IChildProxy {
        private _model: ChildModel;
        private _actJibanMap: { [index: number]: boolean } = {};

        onStartReconnect() {
            super.onStartReconnect();
            this._actJibanMap = {};
        }

        initialize(): void {
            super.initialize();
            this._model = new ChildModel();
            this.onProto(s2c_xianlv_child_info, this.s2c_xianlv_child_info, this);
            this.onProto(s2c_child_oper_jiban, this.s2c_child_oper_jiban, this);
            this.onProto(s2c_child_shenbin_info, this.s2c_child_shenbin_info, this);
            this.onProto(s2c_child_share_info, this.s2c_child_share_info, this);
        }

        // 子女升星
        public c2s_xianlv_child_starup(index: number): void {
            let msg = new c2s_xianlv_child_starup();
            msg.child_index = index;
            this.sendProto(msg);
        }

        // 子女信息返回
        private s2c_xianlv_child_info(n: GameNT): void {
            let msg = n.body as s2c_xianlv_child_info;
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    this._model.child_infos[info.child_index] = info;
                }
            }
            this.updateUpstarHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_CHILD_INFO);
        }

        // 子女羁绊
        public c2s_child_oper_jiban(jiban_index: number, child_index: number): void {
            let msg = new c2s_child_oper_jiban();
            msg.jiban_index = jiban_index;
            if (child_index) {
                msg.child_index = child_index;
                this._actJibanMap[child_index] = true;
            }
            this.sendProto(msg);
        }

        // 子女羁绊返回
        private s2c_child_oper_jiban(n: GameNT): void {
            let msg = n.body as s2c_child_oper_jiban;
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    this._model.jiban_infos[info.jiban_index] = info;

                    if (info.child_index && info.child_index.length) {
                        for (let id of info.child_index) {
                            if (this._actJibanMap[id]) {
                                ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                                this._actJibanMap[id] = null;
                                delete this._actJibanMap[id];
                            }
                        }
                    }
                }
            }
            this.updateJibanHint();
            this.updateUpstarHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_CHILD_JIBAN_INFO);
        }

        // 激活/升星 神兵
        public c2s_child_oper_shenbin(type: XianlvSurfaceType, index: number): void {
            let msg = new c2s_child_oper_shenbin();
            msg.shenbin_type = type;
            msg.shenbin_index = index;
            this.sendProto(msg);
        }

        // 子女神兵返回
        private s2c_child_shenbin_info(n: GameNT): void {
            let msg = n.body as s2c_child_shenbin_info;
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    if (!this._model.infos[info.shenbin_type]) {
                        this._model.infos[info.shenbin_type] = {};
                    }
                    this._model.infos[info.shenbin_type][info.shenbin_index] = info;
                }
            }
            this.updateSurfaceHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_CHILD_SHENBING_INFO);
        }

        //子女共享技能激活
        public c2s_child_share_skill_act(skill_index: number): void {
            let msg = new c2s_child_share_skill_act();
            msg.skill_index = skill_index;
            this.sendProto(msg);
        }

        /**
         * 子女装备神兵灵翼
         * 一键装备，1就是一键，null就传下面两个数据
         */
        public c2s_child_equip(child_index: number, is_onekey: number, type?: XianlvSurfaceType, index?: number): void {
            let msg = new c2s_child_equip();
            msg.child_index = child_index;
            msg.is_onekey = is_onekey || 0;
            if (type) {
                msg.shenbin_type = type;
            }
            if (index) {
                msg.shenbin_index = index;
            }
            this.sendProto(msg);
        }

        // 子女上阵
        public c2s_child_into_battle(child_index: number, pos: number): void {
            let msg = new c2s_child_into_battle();
            msg.child_index = child_index;
            msg.pos = pos;
            this.sendProto(msg);
        }

        // 子女共享返回
        private s2c_child_share_info(n: GameNT): void {
            let msg = n.body as s2c_child_share_info;
            this._model.child_list = msg.child_list != null ? msg.child_list : [];
            this._model.skill_list = msg.skill_list != null ? msg.skill_list : [];
            this.updateShareSkillHint();
            this.sendNt(XianyuanEvent.ON_UPDATE_CHILD_SHARE_INFO);
        }

        /**=============================== 协议 end ===============================*/

        public getChildInfos(): { [index: number]: xianlv_child_infos } {
            return this._model.child_infos;
        }

        public getChildInfo(index: number): xianlv_child_infos {
            return this._model.child_infos[index];
        }

        public getJibanInfo(jiban_index: number): child_jiban_infos {
            return this._model.jiban_infos[jiban_index];
        }

        public getChildCfg(index: number): ChildConfig {
            let cfg = getConfigByNameId(ConfigName.Child, index);
            if (!cfg) {
                DEBUG && console.error(`仙侣-子女没有配置：${index}`);
                return null;
            }
            return cfg;
        }

        private _childCfgsMap: { [type: number]: ChildConfig[] };

        public getChildCfgsByType(type: XianlvSecondTabType): ChildConfig[] {
            if (this._childCfgsMap && this._childCfgsMap[type]) {
                return this._childCfgsMap[type];
            }
            this._childCfgsMap = {};
            let cfgList: ChildConfig[] = getConfigListByName(ConfigName.Child);
            for (let cfg of cfgList) {
                if (!this._childCfgsMap[cfg.type]) {
                    this._childCfgsMap[cfg.type] = [];
                }
                this._childCfgsMap[cfg.type].push(cfg);
            }
            return this._childCfgsMap[type];
        }

        public getJibanCfg(jiban_index: number): ChildJibanConfig {
            let cfg = getConfigByNameId(ConfigName.ChildJiban, jiban_index);
            if (!cfg) {
                DEBUG && console.error(`仙侣-子女羁绊没有配置: ${jiban_index}`);
                return null;
            }
            return cfg;
        }

        private _errorMap: { [index: number]: boolean } = {};

        public getChildStarCfgObj(index: number): { [star: number]: ChildShengxingConfig } {
            let cfgObj = getConfigByNameId(ConfigName.ChildStar, index);
            if (!cfgObj) {
                if (!this._errorMap[index]) {
                    DEBUG && console.error(`仙侣-子女升星没有配置: ${index}`);
                    this._errorMap[index] = true;
                }
                return null;
            }
            return cfgObj;
        }

        public getChildStarCfg(index: number, star: number): ChildShengxingConfig {
            let cfgObj = this.getChildStarCfgObj(index);
            if (!cfgObj || !cfgObj[star]) {
                return null;
            }
            return cfgObj[star];
        }

        private _maxStarMap: { [index: number]: number } = {};

        private getMaxStar(index: number): number {
            if (this._maxStarMap[index] != null) {
                return this._maxStarMap[index];
            }
            let cfgObj = this.getChildStarCfgObj(index);
            this._maxStarMap[index] = Object.keys(cfgObj).length;
            return this._maxStarMap[index];
        }

        public isMaxStar(index: number): boolean {
            let info = this.getChildInfo(index);
            if (!info) {
                return false;
            }
            let maxStar = this.getMaxStar(index);
            return info.star_lv >= maxStar;
        }

        public getStar(index: number): number {
            let info = this.getChildInfo(index);
            return info ? info.star_lv : 0;
        }

        /**
         * @param index
         * @param star 可不传，则获取下一星级
         */
        public getCost(index: number, star?: number): number[] {
            if (star == null) {
                if (this.isMaxStar(index)) {
                    star = this.getMaxStar(index);
                } else {
                    star = this.getStar(index) || 0;
                    star += 1;
                }
            }
            let cfg = this.getChildStarCfg(index, star);
            return cfg ? cfg.star_consume : null;
        }

        public canActOrUp(index: number, isTips = false): boolean {
            if (this.isMaxStar(index)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.maxstar));
                }
                return false;
            }
            let cost = this.getCost(index);
            if (!cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        public isActed(index: number): boolean {
            let info = this.getChildInfo(index);
            return info && info.star_lv > 0;
        }

        public isActedJiban(jiban_index: number): boolean {
            let info = this.getJibanInfo(jiban_index);
            return info && info.is_acted;
        }

        public isJibanChildActed(jiban_index: number, child_index: number): boolean {
            let info = this.getJibanInfo(jiban_index);
            return info && info.child_index && info.child_index.indexOf(child_index) > -1;
        }

        public canActJiban(jiban_index: number, isTips = false): boolean {
            if (this.isActedJiban(jiban_index)) {
                return false;
            }
            let info = this.getJibanInfo(jiban_index);
            let actedLen = info && info.child_index ? info.child_index.length : 0;
            let jibanCfg = this.getJibanCfg(jiban_index);
            let len = jibanCfg && jibanCfg.partners ? jibanCfg.partners.length : 0;
            if (actedLen < len) {
                if (isTips) {
                    // PromptBox.getIns().show(`条件不足`);
                    PromptBox.getIns().show(getLanById(LanDef.jiban_tips1));
                }
                return false;
            }
            return true;
        }

        public canActJibanChild(jiban_index: number, child_index: number): boolean {
            if (this.isJibanChildActed(jiban_index, child_index)) {
                return false;
            }
            return this.isActed(child_index);
        }

        public isSkillActed(index: number, idx: number): boolean {
            let star = this.getStar(index);
            let cfg = this.getChildCfg(index);
            let skillItem: number[] = cfg && cfg.passive_skill_idc ? cfg.passive_skill_idc[idx] : [];
            let needStar = skillItem[1] || 0;
            return star >= needStar;
        }

        //todo
        public getVipList(): number[] {
            let paramCfg = GameConfig.getParamConfigById('child_pos_vip');
            if (!paramCfg) {
                return [2, 4, 6, 8];
            }
            return paramCfg.value;
        }

        public getActedSkillList(): number[] {
            return this._model.skill_list || [];
        }

        public getBattleChildList(): number[] {
            return this._model.child_list || [];
        }

        public getChildList(): xianlv_child_infos[] {
            let infos = this._model.child_infos;
            let list: xianlv_child_infos[] = [];
            for (let key in infos) {
                list.push(infos[key]);
            }
            return list;
        }

        public haveChildForShangzhen(): boolean {
            return this.getChildList().length > 0;
        }

        public getChildPower(): number {
            let infos = this._model.child_infos;
            let power = 0;
            for (let key in infos) {
                let info = infos[key];
                if (info && info.star_attr && info.star_attr.showpower) {
                    power += info.star_attr.showpower.toNumber();
                }
            }
            return power;
        }

        public isBattle(child_index: number): boolean {
            let battleList = this.getBattleChildList();
            return battleList.indexOf(child_index) > -1;
        }

        //子女的装备index，[神兵, 灵翼]
        public getEquipList(child_index: number): number[] {
            let info = this.getChildInfo(child_index);
            if (!info || !info.equip_list) {
                return [];
            }
            if (info.equip_list.length == 2) {
                return info.equip_list.sort((a, b) => a - b);
            }
            let index = info.equip_list[0];
            let propType = PropData.getPropParse(index);
            let isShenbing = propType == ConfigHead.ChildShenbing;
            return isShenbing ? [index, null] : [null, index];
        }

        public getShareSkillList(): number[] {
            let paramCfg = GameConfig.getParamConfigById('child_skill');
            return paramCfg ? paramCfg.value : [];
        }

        /**=============================== 神兵，灵翼 ===============================*/

        private _surfaceMap: { [type: number]: { [tabType: number]: ChildShenbingConfig[] | ChildLingyiConfig[] } } = {};

        public getSurfaceCfgList(type: XianlvSurfaceType, tabType: XianlvSecondTabType): ChildShenbingConfig[] | ChildLingyiConfig[] {
            if (this._surfaceMap[type] && this._surfaceMap[type][tabType]) {
                return this._surfaceMap[type][tabType];
            }
            let map = this._surfaceMap[type];
            if (!map) {
                this._surfaceMap[type] = map = {};
            }
            let configName = type == XianlvSurfaceType.Shenbing ? ConfigName.ChildShenbing : ConfigName.ChildLingyi;
            let cfgList = getConfigListByName(configName);
            for (let cfg of cfgList) {
                if (!map[cfg.type]) {
                    map[cfg.type] = [];
                }
                map[cfg.type].push(cfg);
            }
            return map[tabType];
        }

        public getSurfaceCfg(type: XianlvSurfaceType, index: number): ChildShenbingConfig | ChildLingyiConfig {
            let configName = type == XianlvSurfaceType.Shenbing ? ConfigName.ChildShenbing : ConfigName.ChildLingyi;
            let cfg = getConfigByNameId(configName, index);
            if (!cfg) {
                DEBUG && console.error(`${configName} 没有配置：${index}`);
                return null;
            }
            return cfg;
        }

        public getSurfaceTypeInfo(type: XianlvSurfaceType): { [index: number]: child_shenbin_info } {
            return this._model.infos[type];
        }

        public getSurfaceInfo(type: XianlvSurfaceType, index: number): child_shenbin_info {
            let info = this.getSurfaceTypeInfo(type);
            return info && info[index];
        }

        public isActedSurface(type: XianlvSurfaceType, index: number): boolean {
            let info = this.getSurfaceInfo(type, index);
            return info && info.shenbin_lv > 0;
        }

        public getBattleSurfaceList(): number[] {
            let infos = this._model.child_infos;
            let list: number[] = [];
            for (let key in infos) {
                let info = infos[key];
                if (!info || !info.equip_list) {
                    continue;
                }
                list.push(...info.equip_list);
            }
            return list;
        }

        private _surfaceStarMap: { [type: number]: { [index: number]: number } } = {};

        public getMaxStarSurface(type: XianlvSurfaceType, index: number): number {
            if (this._surfaceStarMap[type] && this._surfaceStarMap[type][index]) {
                return this._surfaceStarMap[type][index];
            }
            let map = this._surfaceStarMap[type];
            if (!map) {
                this._surfaceStarMap[type] = map = {};
            }
            let cfg = this.getSurfaceCfg(type, index);
            let len = cfg && cfg.material ? cfg.material.length : 0;
            map[index] = len;
            return len;
        }

        public getStarSurface(type: XianlvSurfaceType, index: number): number {
            let info = this.getSurfaceInfo(type, index);
            return info && info.shenbin_lv || 0;
        }

        public isMaxStarSurface(type: XianlvSurfaceType, index: number): boolean {
            let curStar = this.getStarSurface(type, index);
            let maxStar = this.getMaxStarSurface(type, index);
            return curStar >= maxStar;
        }

        public getCostSurface(type: XianlvSurfaceType, index: number): number[] {
            let curStar = this.getStarSurface(type, index);
            if (!this.isMaxStarSurface(type, index)) {
                curStar += 1;
            }
            let cfg = this.getSurfaceCfg(type, index);
            if (!cfg || !cfg.material[curStar - 1]) {
                return null;
            }
            return cfg.material[curStar - 1];
        }

        public canActOrUpSurface(type: XianlvSurfaceType, index: number, isTips = false): boolean {
            if (this.isMaxStarSurface(type, index)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.maxstar));
                }
                return false;
            }
            let cost = this.getCostSurface(type, index);
            if (!cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        // type: 1主动技能，2被动技能
        public getChildSkill(type: number): number[] {
            let cfg = GameConfig.getParamConfigById('child_skill');
            if (!cfg) {
                return null;
            }
            return type == 1 ? [cfg.value[0]] : [...cfg.value.slice(1)];
        }

        public checkOneKeyPower(equipId: number): boolean {
            let type = PropData.getPropParse(equipId) == ConfigHead.ChildShenbing ? XianlvSurfaceType.Shenbing : XianlvSurfaceType.Lingyi;
            let typeInfo = this.getSurfaceTypeInfo(type);
            if (!typeInfo) {
                return false;
            }
            let info = this.getSurfaceInfo(type, equipId);
            let power = info && info.shenbin_attr && info.shenbin_attr.showpower ? info.shenbin_attr.showpower.toNumber() : 0;
            for (let key in typeInfo) {
                let item = typeInfo[key];
                let itemPower = item && item.shenbin_attr && item.shenbin_attr.showpower ? item.shenbin_attr.showpower.toNumber() : 0;
                if (itemPower > power) {
                    return true;
                }
            }
            return false;
        }

        public canOneKey(child_index: number, isTips = false): boolean {
            let infos = this._model.infos;
            let can = infos && Object.keys(infos).length > 0;
            if (!can) {
                if (isTips) {
                    PromptBox.getIns().show(`无装备可穿戴`);
                }
                return false;
            }
            let equipList = this.getEquipList(child_index);
            if (equipList && equipList.length) {
                //已穿戴的，检查战力高
                for (let i = 0; i < equipList.length; i++) {
                    let equipId = equipList[i];
                    if (!equipId) {
                        equipId = i == 0 ? ConfigHead.ChildShenbing : ConfigHead.ChildLingyi;
                    }
                    if (equipId && this.checkOneKeyPower(equipId)) {
                        return true;
                    }
                }
            } else {
                //未穿戴的，有相应装备即可
                let ary = [XianlvSurfaceType.Shenbing, XianlvSurfaceType.Lingyi];
                for (let type of ary) {
                    if (infos[type]) {
                        return true;
                    }
                }
            }
            if (isTips) {
                PromptBox.getIns().show(`无装备可穿戴`);
            }
            return false;
        }

        // todo 子女战力+子女翅膀+子女神兵
        public getPower(): number {
            let attr = this.getAttr();
            return attr && attr.showpower ? attr.showpower.toNumber() : 0;
        }

        //总属性
        public getAttr(): attributes {
            let attrList: attributes[] = [];
            let childMap = this._model.child_infos;
            for (let key in childMap) {
                let item = childMap[key];
                if (item && item.star_attr && item.star_attr.showpower) {
                    attrList.push(item.star_attr);
                }
            }
            let map = this._model.infos;
            for (let key in map) {
                let map1 = map[key];
                if (!map1) {
                    continue;
                }
                for (let index in map1) {
                    let item = map1[index];
                    if (item && item.shenbin_attr && item.shenbin_attr.showpower) {
                        attrList.push(item.shenbin_attr);
                    }
                }

            }
            return TextUtil.calcAttrList(attrList);
        }

        //上阵子女战力
        public getSharePower(): number {
            let childList = this._model.child_list || [];
            let power = 0;
            for (let id of childList) {
                let info = this.getChildInfo(id);
                if (info && info.star_attr && info.star_attr.showpower) {
                    power += info.star_attr.showpower.toNumber();
                }
            }
            return power;
        }

        /**=============================== hint ===============================*/

        public getSkillHint(skillId: number): boolean {
            let actedList = this.getActedSkillList();
            if (actedList && actedList.indexOf(skillId) > -1) {
                return false;
            }
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            if (!skillCfg || !skillCfg.act_material) {
                return false;
            }
            let cost = skillCfg.act_material[0];
            return BagUtil.checkPropCnt(cost[0], cost[1]);
        }

        //被动技能红点
        private updateShareSkillHint(): void {
            let skillList = this.getShareSkillList();
            let hint = false;
            for (let i = 1; i < skillList.length; i++) {
                let skillId = skillList[i];
                if (this.getSkillHint(skillId)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[1]);
        }

        private _skillCost: number[] = [];

        public getSkillActCost(): number[] {
            if (this._skillCost && this._skillCost.length) {
                return this._skillCost;
            }
            let skillList = this.getShareSkillList();
            for (let skill of skillList) {
                let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skill);
                if (skillCfg && skillCfg.act_material) {
                    let cost = skillCfg.act_material[0];
                    if (cost && this._skillCost.indexOf(cost[0]) < 0) {
                        this._skillCost.push(cost[0]);
                    }
                }
            }
            return this._skillCost;
        }

        public getHintByChildIndex(index: number): boolean {
            return this.canActOrUp(index);
        }

        public getHintByJibanIndex(jiban_index: number): boolean {
            let jibanCfg = this.getJibanCfg(jiban_index);
            if (!jibanCfg || !jibanCfg.partners) {
                return false;
            }
            for (let idx of jibanCfg.partners) {
                if (this.canActJibanChild(jiban_index, idx)) {
                    return true;
                }
            }
            return this.canActJiban(jiban_index);
        }

        public getJibanHint(): boolean {
            let cfgList: ChildJibanConfig[] = getConfigListByName(ConfigName.ChildJiban);
            let hint = false;
            for (let cfg of cfgList) {
                if (this.getHintByJibanIndex(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        private updateJibanHint(): void {
            let hint = this.getJibanHint();
            HintMgr.setHint(hint, this._model.jibanHintPath);
        }

        private getUpstarHintBytype(type: XianlvSecondTabType): boolean {
            let cfgList = this.getChildCfgsByType(type);
            let hint = false;
            for (let cfg of cfgList) {
                if (this.getHintByChildIndex(cfg.index) || this.getJibanHint()) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        //升星红点
        private updateUpstarHint(): void {
            for (let i = 1; i <= 4; i++) {
                let hint = this.getUpstarHintBytype(i);
                HintMgr.setHint(hint, this._model.hintPath[2][i]);
            }
        }

        private getSurfaceHint(type: XianlvSurfaceType, tabType: XianlvSecondTabType): boolean {
            let cfgList = this.getSurfaceCfgList(type, tabType);
            for (let cfg of cfgList) {
                if (this.canActOrUpSurface(type, cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        //神兵，灵翼红点
        private updateSurfaceHint(): void {
            let surfaceType = [XianlvSurfaceType.Shenbing, XianlvSurfaceType.Lingyi];
            let tabType = [XianlvSecondTabType.Type1, XianlvSecondTabType.Type2];
            for (let type of surfaceType) {
                for (let tab of tabType) {
                    let hint = this.getSurfaceHint(type, tab);
                    HintMgr.setHint(hint, this._model.hintPath[type + 2][tab]);//需加2，对应一级页签
                }
            }
        }

        protected onBagUpdateByBagType(n: GameNT) {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.Material) > -1) {
                this.updateUpstarHint();
                this.updateSurfaceHint();
            }
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];
            let skillCost = this.getSkillActCost();
            for (let id of skillCost) {
                if (indexs.indexOf(id) > -1) {
                    this.updateShareSkillHint();
                    break;
                }
            }
        }

    }
}