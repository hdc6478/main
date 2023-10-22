namespace game.mod.enhance {

    import gem_master_data = msg.gem_master_data;
    import attributes = msg.attributes;
    import gem_data = msg.gem_data;
    import equip_strength_data = msg.equip_strength_data;
    import equip_advanced_data = msg.equip_advanced_data;
    import strength_master_data = msg.strength_master_data;
    import advanced_master_data = msg.advanced_master_data;
    import LevelConfig = game.config.LevelConfig;

    export class EnhanceModel {

        public curEqpItem: StrengthEquipIcon;
        public lastPos: number;

        private _curStrengthPos: number;         // 当前强化位置，0~9
        public strengthInfos: equip_strength_data[];
        public strengthMaster: strength_master_data;
        public strengthMinLv: number = 0;                 // 已装备的最低强化等级
        public strengthMasterReachCnt: number = 0;        // 达标数量
        public strengthPower: Long = Long.fromValue(0);
        public strengthMasterPower: Long = Long.fromValue(0);
        
        public curGemPos: number = -1;
        public gemInfos: {[pos: string]: gem_data[]} = {};      // 已装备的宝石数据，pos：0~9
        public gemMaster: gem_master_data;
        public gemAttrs: { [_idx: number]: attributes };
        public gemMasterPower: Long = Long.fromValue(0);
        public gemPower: Long = Long.fromValue(0);
        public gemTotalLv: number = 0;
        // public gemMinLv: number = 0;                 // 已装备的最低等级
        // public gemMasterReachCnt: number = 0;        // 达标数量
        
        private _curAdvancedPos: number;         // 当前进阶位置，0~9
        public advancedInfos: equip_advanced_data[];
        public advancedMaster: advanced_master_data;
        public advancedMinLv: number = 0;                 // 已装备的最低进阶等级
        public advancedMasterReachCnt: number = 0;
        public advancedPower: Long = Long.fromValue(0);
        public advancedMasterPower: Long = Long.fromValue(0);

        public StrengthHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength];   //主界面入口、强化标签页红点
        public GemHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnGem];             //宝石标签页红点
        public AdvancedHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnAdvanced];   //进阶标签页红点
        // public StrengthBtnHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength, HintType.StrengthBtn];  //强化按钮红点
        // public StrengthOneKeyBtnHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength, HintType.StrengthOneKeyBtn];  //一键强化按钮红点
        // public StrengthMasterBtnHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength, HintType.StrengthMasterBtn];  //强化大师按钮红点
        public AdvancedMasterBtnHint: string[] = [ModName.Enhance, EnhanceViewType.Advanced + EnhanceMainBtnType.BtnAdvanced, HintType.AdvancedMasterBtn];  //进阶大师按钮红点

        public get curStrengthPos(): number {
            if(this.lastPos >= 0) {
                return this.lastPos;
            } else {
                return this._curStrengthPos;
            }
        }
        
        public set curStrengthPos(value: number) {
            this._curStrengthPos = value;
        }

        /**
         * 当前点击的宝石槽位的镶嵌的宝石id
         * @param eqpPos 
         * @param gemPos 
         * @returns 
         */
        public getCurGemId(eqpPos: number, gemPos: number): number {
            let holeInfo = this.getGemHoleInfo(eqpPos, gemPos);
            return holeInfo ? holeInfo.index : 0;
        }

        public get curAdvancedPos(): number {
            if(this.curEqpItem) {
                return this.curEqpItem.pos;
            } else {
                return this._curAdvancedPos;
            }
        }
        
        public set curAdvancedPos(value: number) {
            this._curAdvancedPos = value;
        }

        /**
         * 宝石数据
         * @param pos 部位，0~9
         * @returns 
         */
        public getGemInfo(pos: number): gem_data[] {
            return this.gemInfos ? this.gemInfos[pos] : [];
        }

        /**
         * 宝石孔位已镶嵌的宝石数据
         * @param pos 装备部位，0~9
         * @param gemPos 宝石孔位，0~3
         * @return 没有穿戴时为null
         */
        public getGemHoleInfo(pos: number, gemPos: number): gem_data {
            let gems = this.getGemInfo(pos);
            if (!gems) {
                return null;
            }
            for (let gem of gems) {
                if (gem && gem.gem_type - 1 == gemPos) {
                    return gem;
                }
            }
            return null;
        }

        /**
         * 取强化信息
         * @param pos 部位
         * @returns 
         */
        public getStrengthInfo(pos: number): equip_strength_data {
            let infos: equip_strength_data[] = this.strengthInfos;
            let len: number = infos && infos.length ? infos.length : 0;
            for (let i: number = 0; i < len; i++) {
                if (infos[i] && infos[i].equip_type == pos) {
                    return infos[i];
                }
            }
            return null;
        }

        /**
         * 取强化数据索引
         * @param equipType
         * @returns 
         */
        public getStrengthInfoIdx(equipType: number): number {
            let infos: equip_strength_data[] = this.strengthInfos;
            let len: number = infos && infos.length ? infos.length : 0;
            for (let i: number = 0; i < len; i++) {
                if (infos[i] && infos[i].equip_type == equipType) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * 取进阶信息
         * @param pos 部位
         * @returns 
         */
        public getAdvancedInfo(pos: number): equip_advanced_data {
            let infos: equip_advanced_data[] = this.advancedInfos;
            let len: number = infos && infos.length ? infos.length : 0;
            for (let i: number = 0; i < len; i++) {
                if (infos[i] && infos[i].equip_type == pos) {
                    return infos[i];
                }
            }
            return null;
        }

        /**
         * 取进阶数据索引
         * @param equipType
         * @returns 
         */
        public getAdvancedInfoIdx(equipType: number): number {
            let infos: equip_advanced_data[] = this.advancedInfos;
            let len: number = infos && infos.length ? infos.length : 0;
            for (let i: number = 0; i < len; i++) {
                if (infos[i] && infos[i].equip_type == equipType) {
                    return i;
                }
            }
            return -1;
        }

        public isStrengthMasterMaxLv(): boolean {
            let isMax = !this.strengthMaster.next_attrs || !this.strengthMaster.next_attrs.showpower;
            return isMax;
        }

        public isGemMasterMaxLv(): boolean {
            let isMax = !this.gemMaster.next_attrs || !this.gemMaster.next_attrs.showpower;
            return isMax;
        }

        public isAdvancedMasterMaxLv(): boolean {
            let isMax = !this.advancedMaster.next_attrs || !this.advancedMaster.next_attrs.showpower;
            return isMax;
        }


        // ----------------------- 配置数据 -----------------------

        /**
         * 取等级表配置
         * @param lvId 等级表id
         * @returns 
         */
        public getLvCfg(lvId: number): LevelConfig {
            let cfg: LevelConfig = getConfigByNameId(ConfigName.Level, lvId);
            return cfg;
        }

    }
}