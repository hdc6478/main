namespace game.mod.more {
    import c2s_huanggu_shenqi_oper = msg.c2s_huanggu_shenqi_oper;
    import GameNT = base.GameNT;
    import s2c_huanggu_shenqi_info = msg.s2c_huanggu_shenqi_info;
    import huanggu_shenqi_info = msg.huanggu_shenqi_info;
    import HuangguShenqiBuweiConfig = game.config.HuangguShenqiBuweiConfig;
    import huanggu_shenqi_pos_info = msg.huanggu_shenqi_pos_info;
    import attributes = msg.attributes;
    import huanggu_shenqi_skill_info = msg.huanggu_shenqi_skill_info;
    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;
    import HuangguShenqiSkillConfig = game.config.HuangguShenqiSkillConfig;

    export class SkyPalaceProxy extends ProxyBase {
        private _model: SkyPalaceModel;

        initialize(): void {
            super.initialize();
            this._model = new SkyPalaceModel();

            this.onProto(s2c_huanggu_shenqi_info, this.s2c_huanggu_shenqi_info, this);
        }

        public get model(): SkyPalaceModel {
            return this._model;
        }

        public c2s_huanggu_shenqi_oper(oper_type: number, index: number, pos?: number): void {
            let msg: c2s_huanggu_shenqi_oper = new c2s_huanggu_shenqi_oper();
            msg.oper_type = oper_type;
            msg.index = index;
            if (pos) {
                msg.pos = pos;
            }
            this.sendProto(msg);
        }

        private s2c_huanggu_shenqi_info(n: GameNT): void {
            let msg: s2c_huanggu_shenqi_info = n.body;
            if (msg.info) {
                for (let info of msg.info) {
                    this._model.infos[info.index] = info;
                }
            }
            this.onUpdateHint();
            if (this._model.cfg_index) {
                this.sendNt(MoreEvent.ON_UPDATE_ARTIFACT_AUTO_INFO, this._model.cfg_index);
            } else {
                this.sendNt(MoreEvent.ON_UPDATE_ARTIFACT_INFO);
            }
            this.sendNt(MoreEvent.ON_UPDATE_ARTIFACT_ATTR_INFO);
        }

        public getInfo(index: number): huanggu_shenqi_info {
            return this._model.infos[index] || null;
        }

        public getSkillLevel(index: number, skill_id: number): number {
            let skill = this.getSkill(index, skill_id);
            return skill && skill.level || 0;
        }

        /**skill_id技能初始id */
        public getSkill(index: number, skill_id: number): huanggu_shenqi_skill_info {
            let info = this.getInfo(index);
            if (info && info.skill_info) {
                for (let skill of info.skill_info) {
                    if (skill.index == skill_id) {
                        return skill;
                    }
                }
            }
            return null
        }

        /**获取传入等级的技能解锁条件 */
        public getSkillAct(index: number, skill_id: number, level: number = 1): number {
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, index);
            for (let i in cfg.skill_id) {
                if (skill_id == cfg.skill_id[i]) {
                    let cfg_limit: HuangguShenqiSkillConfig = getConfigByNameId(ConfigName.HuangguShenqiSkill, level);
                    return cfg_limit.condition[i];
                }
            }
            return 0;
        }

        public getBuwei(index: number, pos: number): huanggu_shenqi_pos_info {
            let info = this.getInfo(index);
            if (info) {
                for (let pos_info of info.pos_info) {
                    if (pos == pos_info.pos) {
                        return pos_info;
                    }
                }
            }
            return null;
        }

        public getBuweiCfg(index: number, level: number = 1): HuangguShenqiBuweiConfig {
            let cfgs = getConfigByNameId(ConfigName.HuangguShenqiBuwei, index);
            for (let k in cfgs) {
                let cfg: HuangguShenqiBuweiConfig = cfgs[k];
                if (cfg.level == level) {
                    return cfg;
                }
            }
            return null;
        }

        public getBuweiNextCost(index: number, pos: number): number[] {
            let lv: number = this.getBuweiLevel(index, pos) + 1;
            let cfg: HuangguShenqiBuweiConfig = this.getBuweiCfg(index, lv);
            return cfg && cfg.material[pos - 1] || [];
        }

        public getBuweiCost(index: number, pos: number): number[] {
            let lv: number = this.getBuweiLevel(index, pos) || 1;
            let cfg: HuangguShenqiBuweiConfig = this.getBuweiCfg(index, lv);
            return cfg && cfg.material[pos - 1] || [];
        }

        public getBuweiLevel(index: number, pos: number): number {
            let buwei = this.getBuwei(index, pos);
            return buwei && buwei.level || 0;
        }

        public getBuweiAttr(index: number, pos: number): attributes {
            let buwei = this.getBuwei(index, pos);
            if (buwei) {
                return buwei.attr;
            }
            let cfg: HuangguShenqiBuweiConfig = this.getBuweiCfg(index);
            return RoleUtil.getAttr(cfg.attr_id[pos - 1]);
        }

        public getActStatus(index: number): boolean {
            let info = this.getInfo(index);
            if (!info) {
                return false;
            }
            let level: number = info.level;
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, index);
            let limit_level: number = cfg.level_condition[level];
            if (info.pos_info && info.pos_info.length == 4) {
                for (let buwei of info.pos_info) {
                    if (buwei.level < limit_level) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        private onUpdateHint(): void {
            let root: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.SkyPalace];
            let cfgArr: HuangguShenqiConfig[] = getConfigListByName(ConfigName.HuangguShenqi);
            this._model.cfg_index = 0;
            for (let cfg of cfgArr) {
                let bool: boolean = false;
                if (!bool) {
                    bool = this.checkBuweiHint(cfg.index);
                }
                if (!bool) {
                    bool = this.checkSkillHint(cfg.index);
                }
                if (!bool) {
                    bool = this.getActStatus(cfg.index);
                }
                if (bool && !this._model.cfg_index) {
                    this._model.cfg_index = cfg.index;
                }
                HintMgr.setHint(bool, [...root, `${cfg.index}`]);
            }
        }

        public checkBuweiHint(index: number): boolean {
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, index);
            for (let i = 0; i < 4; i++) {
                let pos: number = i + 1;
                let cost: number[] = this.getBuweiNextCost(cfg.index, pos);
                if (!cost || !cost.length) {
                    continue;
                }
                if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                    return true
                }
            }
            return false;
        }

        public checkSkillHint(index: number): boolean {
            let cfg: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, index);
            let info = this.getInfo(cfg.index);
            let info_level: number = info && info.level || 0;
            for (let id of cfg.skill_id) {
                let level: number = this.getSkillLevel(cfg.index, id);
                let level_up: number = this.getSkillAct(cfg.index, id, level + 1);
                if (level_up && info_level >= level_up) {
                    return true
                }
            }
            return false;
        }

        public getListSelect(index: number = this._model.cfg_index): number {
            let cfgArr: HuangguShenqiConfig[] = getConfigListByName(ConfigName.HuangguShenqi);
            for (let i = 0; i < cfgArr.length; i++) {
                let cfg: HuangguShenqiConfig = cfgArr[i];
                if (cfg.index == index) {
                    return i;
                }
            }
            return 0;
        }
    }
}