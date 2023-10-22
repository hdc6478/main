namespace game.mod.xianfa {

    import skill_item = msg.skill_item;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import XianfaSkillLevelConfig = game.config.XianfaSkillLevelConfig;
    import XianfaSkillCultivateConfig = game.config.XianfaSkillCultivateConfig;
    import SkillShowConfig = game.config.SkillShowConfig;

    export class XianfaModel {

        /**
         * 所有已激活的仙法信息
         */
        private _infos: { [id: string]: skill_item } = {};

        private _posSkills: number[] = [];                // 各槽位已穿戴的技能id，0-没有穿戴

        private _allXianfaCfg: { [id: string]: XianfaSkillInitConfig };           // 仙法表的所有配置数据（含需隐藏的）
        private _showXianfaIds: { [type: string]: number };                       // 需显示的仙法id，type 对应配置表 type，每个 type 只存其中一个技能
        private _showXianfaIdArrs: number[] = [];                               // 需显示的仙法，每个 type 只存其中一个技能

        public xianfaHint: string[] = [ModName.Xianfa, XianfaViewType.XianfaMain + XianfaMainBtnType.BtnXianfa];  //仙法入口、标签页红点
        public oneKeyUpgradeHint: string[] = [ModName.Xianfa, XianfaViewType.XianfaMain + XianfaMainBtnType.BtnXianfa, HintType.XianfaOneKeyUpgrade];  //仙法一键升级红点
        public oneKeyWearHint: string[] = [ModName.Xianfa, XianfaViewType.XianfaMain + XianfaMainBtnType.BtnXianfa, HintType.XianfaOneKeyWear];  //仙法一键穿戴红点

        public isInUpStar: boolean;                       // 升星操作中

        public oper: number;

        public updateInfos(value: skill_item[], flag?: boolean) {
            if (!value || value.length == 0) {
                return;
            }
            if (!this._infos) {
                this._infos = {};
            }
            if (!this._showXianfaIds) {
                this.setCfgs();
            }

            this._showXianfaIdArrs = [];
            if (this.isInUpStar && value.length > 0) {
                let skill = value[0];
                if (!skill || !skill.index) {
                    return;
                }
                for (let id in this._infos) {
                    let skill1 = this._infos[id];
                    if (skill1.index_type == skill.index_type) {
                        delete this._infos[id];
                        break;
                    }
                }
                this._infos[skill.index] = skill;
                this._showXianfaIds[skill.index_type] = skill.index;
                // this.isInUpStar = false;
            } else {
                for (let skill of value) {
                    if (!skill || !skill.index) {
                        break;
                    }
                    this._infos[skill.index] = skill;
                    this._showXianfaIds[skill.index_type] = skill.index;
                }
            }
        }

        public set posSkills(value: number[]) {
            if (!value) {
                return;
            }
            this._posSkills = value;
        }

        /**
         * 所有已激活的仙法
         * @returns
         */
        public getAllInfos(): { [id: string]: skill_item } {
            return this._infos;
        }

        /**
         * 所有已穿戴的仙法
         * @returns
         */
        public getAllWearInfos(): skill_item[] {
            if (!this._posSkills || !this._posSkills.length) {
                return [];
            }

            let infos: skill_item[] = [];
            for (let id of this._posSkills) {
                if (!id) {
                    continue;
                }
                let info = this.getInfo(id);
                infos.push(info);
            }

            return infos;
        }

        /**
         * 取指定仙法信息（只含已激活的）
         * @param id
         * @returns null-未激活
         */
        public getInfo(id: number): skill_item {
            return this._infos && this._infos[id] || null;
        }

        /**
         * 取指定仙法信息
         * @param type
         * @returns null-未激活
         */
        public getInfoByType(type: number): skill_item {
            if (!this._showXianfaIds) {
                this.setCfgs();
            }
            let id = this._showXianfaIds[type];
            return this.getInfo(id);
        }

        /**
         * 取槽位的仙法信息
         * @param pos 槽位，1~6
         * @returns
         */
        public getPosInfo(pos: number): skill_item {
            if (!this._infos) {
                return null;
            }

            let id = this._posSkills[pos - 1];
            if (id == 0) {
                return null;
            }
            return this._infos[id] || null;
        }

        public isWear(id: number): boolean {
            return this._posSkills.indexOf(id) != -1;
        }

        public getWearPos(id: number): number {
            return this._posSkills.indexOf(id) + 1;
        }

        public get totalPower(): number {
            if (!this._infos) {
                return 0;
            }

            let power: number = 0;
            for (let id in this._infos) {
                let info: skill_item = this._infos[id];
                power += info.power;
            }
            return power;
        }

        /**
         * 取仙法的星级
         * @param id
         * @returns
         */
        public getStarCnt(id: number): number {
            let info = this.getInfo(id);
            return info ? id % 10 : 0;              // 未激活时为0
        }


        // ----------------------- 配置数据 -----------------------

        private setCfgs(): void {
            this._allXianfaCfg = {};
            this._showXianfaIds = {};
            let cfgs = getConfigListByName(ConfigName.XianfaSkillInit) as XianfaSkillInitConfig[];
            for (let cfg of cfgs) {
                if (cfg.skill_type != XianfaType.Type1) {           // 非仙法技能
                    continue;
                }

                this._allXianfaCfg[cfg.index] = cfg;
                if (cfg.activate_material) {
                    this._showXianfaIds[cfg.type] = cfg.index;
                }
            }
        }

        public get showXianfaIds(): number[] {
            if (!this._showXianfaIds) {
                this.setCfgs();
            }
            if (!this._showXianfaIdArrs || this._showXianfaIdArrs.length == 0) {
                this._showXianfaIdArrs = [];
                for (let type in this._showXianfaIds) {
                    this._showXianfaIdArrs.push(this._showXianfaIds[type]);
                }
            }
            return this._showXianfaIdArrs;
        }

        public getXianfaCfg(id: number): XianfaSkillInitConfig {
            if (!this._allXianfaCfg) {
                this.setCfgs();
            }
            return this._allXianfaCfg[id] || null;
        }

        public getXianfaLevelCfg(xianfaLv: number): XianfaSkillLevelConfig {
            let cfg: XianfaSkillLevelConfig = getConfigByNameId(ConfigName.XianfaSkillLevel, xianfaLv);
            return cfg;
        }

        public getXianfaCultivateCfg(studyLv: number): XianfaSkillCultivateConfig {
            let cfg: XianfaSkillCultivateConfig = getConfigByNameId(ConfigName.XianfaSkillCultivate, studyLv);
            return cfg;
        }

        public getSkillShowCfg(id: number): SkillShowConfig {
            let cfg: XianfaSkillInitConfig = this.getXianfaCfg(id);
            if (!cfg) {
                return null;
            }
            let skillShowCfg: SkillShowConfig = getConfigByNameId(ConfigName.SkillShow, cfg.effects);
            return skillShowCfg;
        }

        public getXianfaShortName(cfg: XianfaSkillInitConfig): string {
            if (!cfg) {
                return "";
            }
            let name = cfg.name.split("·");
            return name && name.length ? name[name.length - 1].trim() : cfg.name;
        }

        /**
         * 升级消耗
         * @param xianfaLv 待升级到的等级
         * @param quality 品质，1-4
         * @returns
         */
        public getUpgradeCost(xianfaLv: number, quality: number): number[] {
            let cfg: XianfaSkillLevelConfig = this.getXianfaLevelCfg(xianfaLv);
            if (!cfg) {
                return [];
            }
            return (quality >= 1 && quality <= cfg.level_cost.length) ? cfg.level_cost[quality - 1] : cfg.level_cost[0];
        }

        /**
         * 升星消耗
         * @param id
         * @returns
         */
        public getUpStarCost(id: number): number[] {
            let cfg: XianfaSkillInitConfig = this.getXianfaCfg(id);
            if (!cfg) {
                return [];
            }
            return cfg.upgrade_material && cfg.upgrade_material.length >= 1 ? cfg.upgrade_material[0] : [];
        }

        /**
         * 精研消耗
         * @param studyLv
         * @returns
         */
        public getStudyCost(studyLv: number): number[] {
            let cfg: XianfaSkillCultivateConfig = this.getXianfaCultivateCfg(studyLv);
            if (!cfg) {
                return [];
            }
            return cfg.yanxi_cost && cfg.yanxi_cost.length >= 1 ? cfg.yanxi_cost[0] : [];
        }

        /**
         * 等级属性
         * @param xianfaLv
         * @param quality 品质，1-4
         * @returns
         */
        public getLevelAttr(xianfaLv: number, quality: number): number {
            let cfg: XianfaSkillLevelConfig = this.getXianfaLevelCfg(xianfaLv);
            return (quality >= 1 && quality <= cfg.level_value.length) ? cfg.level_value[quality - 1] : cfg.level_value[0];
        }

        /**
         * 取最近的经验效果对应的精研配置
         * @param studyLv
         * @returns
         */
        public getStudyEffCfg(studyLv: number): XianfaSkillCultivateConfig {
            let cfgRtn: XianfaSkillCultivateConfig;
            let cfgs: XianfaSkillCultivateConfig[] = getConfigListByName(ConfigName.XianfaSkillCultivate);
            for (let cfg of cfgs) {
                if (cfg.cultivate_level < studyLv) {
                    continue;
                }
                if (cfg.xianfa_jingyan > 0) {
                    cfgRtn = cfg;
                    break;
                }
            }
            return cfgRtn;
        }


        // ----------------------- 其他 -----------------------

        public isMaxLv(id: number, lv: number): boolean {
            let b = false;
            let cfg = this.getXianfaCfg(id);
            b = cfg && lv >= cfg.max_level;
            return b;
        }

        public isMaxStar(id: number): boolean {
            let star = this.getStarCnt(id);
            return star >= 5;
        }

        public isMaxStudy(id: number): boolean {
            let info = this.getInfo(id);
            return info && info.cultivate_level >= 5;
        }

        public get posSkills(): number[] {
            return this._posSkills;
        }
    }
}