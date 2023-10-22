namespace game.mod.shenling {

    import c2s_god_brother_lingli_click = msg.c2s_god_brother_lingli_click;
    import c2s_god_brother_lingli_reset_point = msg.c2s_god_brother_lingli_reset_point;
    import GameNT = base.GameNT;
    import s2c_god_brother_lingli_info = msg.s2c_god_brother_lingli_info;
    import god_brother_lingli_datas = msg.god_brother_lingli_datas;
    import god_brother_lingli_struct = msg.god_brother_lingli_struct;
    import ShenlingLingliConfig = game.config.ShenlingLingliConfig;
    import LanDef = game.localization.LanDef;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import BuffConfig = game.config.BuffConfig;
    import facade = base.facade;

    /**
     * @description 神灵灵力系统
     */
    export class ShenlingLingliProxy extends ProxyBase {
        private _model: ShenlingLingliModel;

        initialize(): void {
            super.initialize();
            this._model = new ShenlingLingliModel();
            this.onProto(s2c_god_brother_lingli_info, this.s2c_god_brother_lingli_info, this);
            facade.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_TYPE, this.updateHint, this);
        }

        /**
         * @param type 类型
         * @param index 灵力索引  999为主动技能的索引
         */
        public c2s_god_brother_lingli_click(type: number, index: number): void {
            let msg = new c2s_god_brother_lingli_click();
            msg.itype = type;
            msg.index = index;
            this.sendProto(msg);
        }

        public c2s_god_brother_lingli_reset_point(type: number): void {
            let msg = new c2s_god_brother_lingli_reset_point();
            msg.itype = type;
            this.sendProto(msg);
        }

        public s2c_god_brother_lingli_info(n: GameNT): void {
            let msg = n.body as s2c_god_brother_lingli_info;
            if (msg.all_datas != null) {
                for (let data of msg.all_datas) {
                    this.dealTypeData(data);
                }
            }
            this.updateHint();
            this.sendNt(ShenLingEvent.ON_SHEN_LING_LING_LI_UPDATE);
        }

        private dealTypeData(typeData: god_brother_lingli_datas): void {
            if (!typeData) {
                return;
            }
            let struct = this._model.all_datas[typeData.itype];
            if (!struct) {
                this._model.all_datas[typeData.itype] = struct = new GodBrotherLingliDatas();
            }
            if (typeData.list != null) {
                for (let item of typeData.list) {
                    struct.skill_data[item.index] = item;
                }
            } else {
                struct.skill_data = {};
            }
        }

        public getTypeData(type: ShenLingType): GodBrotherLingliDatas {
            return this._model.all_datas[type];
        }

        /**
         * @param type
         * @param idx 索引
         */
        public getSkillData(type: ShenLingType, idx: number): god_brother_lingli_struct {
            let data = this.getTypeData(type);
            if (data && data.skill_data) {
                return data.skill_data[idx];
            }
            return null;
        }

        public getMainSkillData(type: ShenLingType): god_brother_lingli_struct {
            return this.getSkillData(type, LingliMainSkillIdx);
        }

        public isActed(type: ShenLingType): boolean {
            let data = this.getMainSkillData(type);
            return data && data.level > 0;
        }

        public isSkillActed(type: ShenLingType, idx: number): boolean {
            let data = this.getSkillData(type, idx);
            return data && data.level > 0;
        }

        private _maxLvMap: { [type: number]: number } = {};

        public getMaxLevel(type: ShenLingType): number {
            if (this._maxLvMap[type]) {
                return this._maxLvMap[type];
            }
            let cfgObj = getConfigByNameId(ConfigName.ShenlingLingli, type);
            if (!cfgObj) {
                return 0;
            }
            let keys = Object.keys(cfgObj) || [];
            this._maxLvMap[type] = keys.length;
            return keys.length;
        }

        public isMaxLevel(type: ShenLingType, idx: number): boolean {
            let data = this.getSkillData(type, idx);
            if (!data || !data.level) {
                return false;
            }
            let maxLv = this.getMaxLevel(type);
            return data.level >= maxLv;
        }

        public getConfig(type: ShenLingType, lv: number): ShenlingLingliConfig {
            let cfgObj = getConfigByNameId(ConfigName.ShenlingLingli, type);
            if (cfgObj) {
                return cfgObj[lv];
            }
            DEBUG && console.error(`shenling_lingli 不存在id:${type}, level:${lv}`);
            return null;
        }

        public canActOrUp(type: ShenLingType, idx: number, isTips = false): boolean {
            if (this.isMaxLevel(type, idx)) {
                return false;
            }
            let data = this.getSkillData(type, idx);
            let lv = data && data.level || 0;
            let nextCfg = this.getConfig(type, lv + 1);
            if (!nextCfg) {
                return false;
            }
            let isMain = idx == LingliMainSkillIdx;
            let cost = isMain ? nextCfg.main_cost : nextCfg.buff_costs[idx - 1];
            if (!cost || !cost.length) {
                return false;
            }
            if (!isMain) {
                let preCondAry = nextCfg.condition[idx - 1];
                let preData = this.getSkillData(type, preCondAry[0]);
                if (!preData || preData.level < preCondAry[1]) {
                    if (isTips) {
                        PromptBox.getIns().show(getLanById(LanDef.lingqi_tips10).replace('%s', ''));
                    }
                    return false;
                }
            }
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Text : PropLackType.None);
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            for (let key of LingliPointAry) {
                if (keys.indexOf(PropIndexToKey[key]) > -1) {
                    this.updateHint();
                }
            }
        }

        public getHintByType(type: ShenLingType): boolean {
            let cfg = this.getConfig(type, 1);
            if (!cfg) {
                return false;
            }
            if (this.canActOrUp(type, LingliMainSkillIdx)) {
                return true;
            }
            let buff_skills = cfg.buff_skills || [];
            for (let i = 0; i < buff_skills.length; i++) {
                if (this.canActOrUp(type, i + 1)) {
                    return true;
                }
            }
            return false;
        }

        private updateHint(): void {
            let proxy: ShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            let types = proxy.getActedTypeList();
            let hint = false;
            for (let type of types) {
                if (this.getHintByType(type)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }

        //系列战力
        public getPowerByType(type: ShenLingType): number {
            let info = this.getTypeData(type);
            if (!info || !info.skill_data) {
                return 0;
            }
            let power = 0;
            let skillData = info.skill_data;
            for (let idx in skillData) {
                let info = skillData[idx];
                let cfg = this.getConfig(type, info.level);
                if (!cfg) {
                    continue;
                }
                if (+idx == LingliMainSkillIdx) {
                    let skillId = cfg.main_skill;
                    let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                    if (skillCfg && skillCfg.powershow) {
                        power += skillCfg.powershow;
                    }
                } else {
                    let buffId = cfg.buff_skills[+idx - 1];
                    let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
                    if (buffCfg && buffCfg.powershow) {
                        power += buffCfg.powershow;
                    }
                }
            }
            return power;
        }

    }
}