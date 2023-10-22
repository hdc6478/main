namespace game.mod.enhance {
    import GameNT = base.GameNT;
    import facade = base.facade;
    import c2s_equip_operate_gem = msg.c2s_equip_operate_gem;
    import s2c_equip_update_gem = msg.s2c_equip_update_gem;
    import s2c_equip_online_gem_request = msg.s2c_equip_online_gem_request;
    import c2s_equip_gem_takeon = msg.c2s_equip_gem_takeon;
    import c2s_equip_gem_takeoff = msg.c2s_equip_gem_takeoff;
    import c2s_equip_gem_combine = msg.c2s_equip_gem_combine;
    import c2s_equip_gem_attrs = msg.c2s_equip_gem_attrs;
    import s2c_equip_gem_attrs = msg.s2c_equip_gem_attrs;
    import attributes = msg.attributes;
    import c2s_equip_gem_master = msg.c2s_equip_gem_master;
    import s2c_equip_gem_master = msg.s2c_equip_gem_master;
    import equip_gem_data = msg.equip_gem_data;
    import gem_data = msg.gem_data;
    import PropConfig = game.config.PropConfig;
    import s2c_equip_strength_master = msg.s2c_equip_strength_master;
    import s2c_equip_update_strength = msg.s2c_equip_update_strength;
    import c2s_equip_strength = msg.c2s_equip_strength;
    import c2s_equip_strength_master = msg.c2s_equip_strength_master;
    import s2c_equip_online_strength_request = msg.s2c_equip_online_strength_request;
    import s2c_equip_online_advanced_request = msg.s2c_equip_online_advanced_request;
    import equip_strength_data = msg.equip_strength_data;
    import c2s_equip_advanced = msg.c2s_equip_advanced;
    import s2c_equip_update_advanced = msg.s2c_equip_update_advanced;
    import c2s_equip_advanced_master = msg.c2s_equip_advanced_master;
    import s2c_equip_advanced_master = msg.s2c_equip_advanced_master;
    import equip_advanced_data = msg.equip_advanced_data;
    import LevelConfig = game.config.LevelConfig;
    import advanced_master_data = msg.advanced_master_data;

    export class EnhanceProxy extends ProxyBase implements IEnhanceProxy {
        private _model: EnhanceModel;

        /** 宝石属性*/
        private _gemAttrIdx: number;
        private _isInset: boolean = false;//是否点了一键镶嵌


        getModel(): EnhanceModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new EnhanceModel();

            this.onProto(s2c_equip_online_strength_request, this.s2c_equip_online_strength_request, this);
            this.onProto(s2c_equip_update_strength, this.s2c_equip_update_strength, this);
            this.onProto(s2c_equip_strength_master, this.s2c_equip_strength_master, this);

            this.onProto(s2c_equip_gem_attrs, this.s2c_equip_gem_attrs, this);
            this.onProto(s2c_equip_gem_master, this.s2c_equip_gem_master, this);
            this.onProto(s2c_equip_update_gem, this.s2c_equip_update_gem, this);
            this.onProto(s2c_equip_online_gem_request, this.s2c_equip_online_gem_request, this);

            this.onProto(s2c_equip_online_advanced_request, this.s2c_equip_online_advanced_request, this);
            this.onProto(s2c_equip_update_advanced, this.s2c_equip_update_advanced, this);
            this.onProto(s2c_equip_advanced_master, this.s2c_equip_advanced_master, this);
        }

        protected onBagUpdateByBagType(n: base.GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(BagType.Material) < 0) {
                return;
            }
            this.updateHint();
        }

        /**更新强化和大师*/
        s2c_equip_online_strength_request(n: GameNT) {
            let msg: s2c_equip_online_strength_request = n.body;
            if (!msg) {
                return;
            }
            this._model.strengthInfos = msg.strengths || [];
            this._model.strengthMaster = msg.strength_master;
            this._model.curStrengthPos = msg.cur_pos;
            this.setStrengthOther();
            this.sendNt(EnhanceEvent.UPDATE_STRENGTH_INFO);
            this.sendNt(EnhanceEvent.UPDATE_STRENGTH_MASTER_INFO);
        }

        /** 计算强化总等级、强化战力、大师战力*/
        private setStrengthOther() {
            this._model.strengthPower.low = 0;
            this._model.strengthPower.high = 0;
            this._model.strengthMasterPower.low = 0;
            this._model.strengthMasterPower.high = 0;
            if (this._model.strengthInfos) {
                this._model.strengthMinLv = 10000;
                this._model.strengthMasterReachCnt = 0;
                for (let sInfo of this._model.strengthInfos) {
                    if (sInfo.attrs.showpower) {
                        this._model.strengthPower = this._model.strengthPower.add(sInfo.attrs.showpower);
                    }
                    this._model.strengthMinLv = Math.min(this._model.strengthMinLv, sInfo.strength_lv);

                    if (this._model.strengthMaster && sInfo.strength_lv >= this._model.strengthMaster.reach_level) {
                        this._model.strengthMasterReachCnt++;
                    }
                }
            }
            if (this._model.strengthMaster) {
                if (this._model.strengthMaster.attrs && this._model.strengthMaster.attrs.showpower) {
                    this._model.strengthMasterPower = this._model.strengthMasterPower.add(this._model.strengthMaster.attrs.showpower);
                }
            }
            this.updateHint();
        }

        /** 强化更新*/
        private s2c_equip_update_strength(n: GameNT) {
            let msg: s2c_equip_update_strength = n.body;
            if (msg.strengths) {
                if (!this._model.strengthInfos) {
                    this._model.strengthInfos = msg.strengths;
                } else {
                    for (let temp of msg.strengths) {
                        let idx = this._model.getStrengthInfoIdx(temp.equip_type);
                        if (idx != -1) {
                            this._model.strengthInfos[idx] = temp;
                        }
                    }
                }
            }
            /**成功提示*/
            ViewMgr.getIns().showSuccessTips(SuccessTipsType.Strength);
            this._model.curStrengthPos = msg.cur_pos;
            this.setStrengthOther();
            this.sendNt(EnhanceEvent.UPDATE_STRENGTH_INFO);
        }

        /**
         * 装备强化
         * @param type 1-强化，2-一键强化
         */
        public c2s_equip_strength(type: 1 | 2, pos?: number): void {
            let msg: c2s_equip_strength = new c2s_equip_strength();
            msg.buttontype = type;
            msg.pos = pos;
            this.sendProto(msg);
        }

        /** 大师升阶*/
        public c2s_equip_strength_master(): void {
            this.sendProto(new c2s_equip_strength_master());
        }

        /** 强化大师*/
        private s2c_equip_strength_master(n: GameNT) {
            let msg: s2c_equip_strength_master = n.body;
            this._model.strengthMaster = msg.info;
            this.setStrengthOther();
            this.sendNt(EnhanceEvent.UPDATE_STRENGTH_MASTER_INFO);
        }


        //--------------------------宝石-----------------------------------

        private s2c_equip_online_gem_request(n: GameNT) {
            let msg: s2c_equip_online_gem_request = n.body;
            if (msg.gems) {
                if (!this._model.gemInfos) {
                    this._model.gemInfos = {};
                }
                for (let gem of msg.gems) {
                    this._model.gemInfos[gem.equip_type] = gem.gems;
                }
            }
            this._model.gemMaster = msg.gem_master;
            this.updateGemPowerAndLv();
            this.updateHint();
            this.sendNt(EnhanceEvent.UPDATE_GEM_INFO);
        }

        /**
         * 宝石升级、镶嵌
         * @param {number} type 1一键升级，2一键镶嵌
         * @param {number} _equip 装备部位
         */
        public c2s_equip_operate_gem(type: number, eqType: number): void {
            let msg: c2s_equip_operate_gem = new c2s_equip_operate_gem();
            this._isInset = (type == 2);
            msg.op_type = type;
            msg.equip_type = eqType;
            this.sendProto(msg);
        }

        private s2c_equip_update_gem(n: GameNT) {
            let isInset = false;//镶嵌成功
            let msg: s2c_equip_update_gem = n.body;
            if (msg.gem) {
                if (!this._model.gemInfos) {
                    this._model.gemInfos = {};
                }
                for (let gem of msg.gem) {
                    isInset = this.isInset1(gem);
                    this._model.gemInfos[gem.equip_type] = gem.gems;
                }
            }
            this.updateGemPowerAndLv();
            this.updateHint();
            this.sendNt(EnhanceEvent.UPDATE_GEM_INFO);
            if (isInset) {
                this.sendNt(EnhanceEvent.UPDATE_GEM_ONE_KEY_INSET);
                // PromptBox.getIns().show("镶嵌成功");
            }
        }

        /** 是否为镶嵌操作 */
        private isInset1(gem: equip_gem_data): boolean {
            let b = false;
            let oldGems = this._model.gemInfos[gem.equip_type];
            for (let j = 0, len = oldGems.length; j < len; j++) {
                let oldGem = oldGems[j];
                let newGem = gem.gems[j];
                if (!b && newGem.index > 0 && newGem.index != oldGem.index && this._isInset) {
                    b = true;
                    break;
                }
            }
            return b;
        }

        /** 宝石镶嵌*/
        public c2s_equip_gem_takeon(eqType: number, gemType: number, gemId: Long): void {
            let msg: c2s_equip_gem_takeon = new c2s_equip_gem_takeon();
            msg.equip_type = eqType;
            msg.gem_type = gemType;
            msg.gem_id = gemId;
            this.sendProto(msg);
            this._isInset = true;
        }

        /** 宝石拆除*/
        public c2s_equip_gem_takeoff(eqPos: number, gemType: number): void {
            let msg: c2s_equip_gem_takeoff = new c2s_equip_gem_takeoff();
            msg.gem_type = gemType;
            msg.equip_type = eqPos;
            this.sendProto(msg);
        }

        /**
         *  宝石合成
         * @param {number} 1:合成 2:单类型一键合成 3:所有一键合成
         */
        public c2s_equip_gem_combine(eqPos: number, gemType: number, idx: number, type: number): void {
            let msg: c2s_equip_gem_combine = new c2s_equip_gem_combine();
            msg.equip_type = eqPos;
            msg.gem_index = idx;
            msg.gem_type = gemType;
            msg.flag = type;
            this.sendProto(msg);
        }

        private c2s_equip_gem_attrs(idx: number): void {
            let msg: c2s_equip_gem_attrs = new c2s_equip_gem_attrs();
            msg.index = idx;
            this._gemAttrIdx = idx;
            this.sendProto(msg);
        }

        private s2c_equip_gem_attrs(n: GameNT) {
            let msg: s2c_equip_gem_attrs = n.body;
            if (!this._model.gemAttrs) {
                this._model.gemAttrs = {};
            }
            if (this._gemAttrIdx) {
                this._model.gemAttrs[this._gemAttrIdx] = msg.attrs;
                this._gemAttrIdx = null;
                this.sendNt(EnhanceEvent.ON_GEM_ATTR_BACK, msg.attrs);
            }
        }

        public getGemAttr(idx: number): attributes {
            let info: { [id: number]: attributes } = this._model.gemAttrs;
            if (info && info[idx]) {
                return info[idx];
            } else {
                this.c2s_equip_gem_attrs(idx);
            }
            return null;
        }

        /**宝石大师升阶*/
        public c2s_equip_gem_master(): void {
            this.sendProto(new c2s_equip_gem_master());
        }

        private s2c_equip_gem_master(n: GameNT) {
            let msg: s2c_equip_gem_master = n.body;
            if (msg.info) {
                this._model.gemMaster = msg.info;
                this._model.gemMasterPower = msg.info.attrs.showpower;
            }
            this.updateHint();
            this.sendNt(EnhanceEvent.UPDATE_GEM_MASTER_INFO);
        }

        /**宝石总战力和等级*/
        private updateGemPowerAndLv(): void {
            let lv: number = 0;
            let power: Long = Long.fromValue(0);
            let infos = this._model.gemInfos;
            if (infos) {
                for (let pos in infos) {
                    let gems: gem_data[] = infos[pos];
                    if (!gems) {
                        continue;
                    }
                    for (let item of gems) {
                        if (item && item.attrs && item.attrs.showpower) {
                            power = power.add(item.attrs.showpower);
                        }
                        if (item && item.index) {
                            lv += item.index % 100;
                        }
                    }
                }
            }
            //宝石大师
            let master = this._model.gemMaster;
            if (master && master.attrs) {
                power = power.add(master.attrs.showpower);
                this._model.gemMasterPower = master.attrs.showpower;
            }

            this._model.gemPower = power;
            this._model.gemTotalLv = lv;
        }

        /**判断是否满级宝石 */
        public checkGemMax(index: number): boolean {
            let cfg: PropConfig = getConfigByNameId(ConfigName.Prop, index + 1);
            return !!cfg;
        }

        //--------------------------进阶-----------------------------------

        /**更新进阶和大师*/
        s2c_equip_online_advanced_request(n: GameNT) {
            let msg: s2c_equip_online_advanced_request = n.body;
            if (!msg) {
                return;
            }
            this._model.advancedInfos = msg.advanceds || [];
            this._model.advancedMaster = msg.advanced_master;
            this._model.curAdvancedPos = msg.cur_pos;
            this.setAdvancedOther();
            this.updateHint();
            this.sendNt(EnhanceEvent.UPDATE_ADVANCED_INFO);
        }

        /** 计算进阶总等级、进阶战力、大师战力*/
        private setAdvancedOther() {
            this._model.advancedPower.low = 0;
            this._model.advancedPower.high = 0;
            this._model.advancedMasterPower.low = 0;
            this._model.advancedMasterPower.high = 0;
            if (this._model.advancedInfos) {
                this._model.advancedMinLv = 10000;
                for (let sInfo of this._model.advancedInfos) {
                    if (sInfo.attrs.showpower) {
                        this._model.advancedPower = this._model.advancedPower.add(sInfo.attrs.showpower);
                    }
                    this._model.advancedMinLv = Math.min(this._model.advancedMinLv, sInfo.advanced_lv);

                    if (this._model.advancedMaster && sInfo.advanced_lv >= this._model.advancedMaster.rench_level) {
                        this._model.advancedMasterReachCnt++;
                    }
                }
            }
            if (this._model.advancedMaster && this._model.advancedMaster.attrs && this._model.advancedMaster.attrs.showpower) {
                this._model.advancedMasterPower = this._model.advancedMasterPower.add(this._model.advancedMaster.attrs.showpower);
            }
        }

        /**
         * 装备进阶
         */
        public c2s_equip_advanced(pos: number): void {
            let msg: c2s_equip_advanced = new c2s_equip_advanced();
            msg.equiptype = pos;
            this.sendProto(msg);
        }

        /** 进阶更新*/
        private s2c_equip_update_advanced(n: GameNT) {
            let msg: s2c_equip_update_advanced = n.body;
            if (!msg.advanceds) {
                return;
            }
            if (!this._model.advancedInfos) {
                this._model.advancedInfos = msg.advanceds;
            } else {
                for (let temp of msg.advanceds) {
                    let idx = this._model.getAdvancedInfoIdx(temp.equip_type);
                    (idx != -1) && (this._model.advancedInfos[idx] = temp);
                }
            }
            // this._model.curAdvancedPos = msg.cur_pos;
            this.setAdvancedOther();
            this.updateHint();
            this.sendNt(EnhanceEvent.UPDATE_ADVANCED_INFO);
            PromptBox.getIns().show("进阶成功");
        }

        /** 大师进阶*/
        public c2s_equip_advanced_master(): void {
            this.sendProto(new c2s_equip_advanced_master());
        }

        /** 进阶大师*/
        private s2c_equip_advanced_master(n: GameNT) {
            let msg: s2c_equip_advanced_master = n.body;
            this._model.advancedMaster = msg.info;
            this.setAdvancedOther();
            this.updateHint();
            this.sendNt(EnhanceEvent.UPDATE_ADVANCED_MASTER_INFO);
        }

        ////////////////////////////////////////红点///////////////////////////////////////
        /**
         * 强化入口、标签页红点
         * @returns
         */
        public updateHint(): void {
            let strengthHint = this.updateStrengthOneKeyBtnHint() || this.updateStrengthMasterBtnHint();
            let gemHint = this.gemOneKeyInlayHint() || this.checkGemMasterHint();
            let advanceHint = this.updateAdvanceBtnHint() || this.updateAdvanceMasterBtnHint();
            HintMgr.setHint(strengthHint, this._model.StrengthHint);
            HintMgr.setHint(gemHint, this._model.GemHint);
            HintMgr.setHint(advanceHint, this._model.AdvancedHint);
        }

        /**
         * 一键强化红点
         * @returns
         */
        public updateStrengthOneKeyBtnHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Strength)) {
                return false;
            }
            let hint = false;
            let equipProxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            for (let pos1 of EquipPosAry) {
                let propData = equipProxy.getEquipByPos(pos1);          // 有无穿戴装备
                if (!propData) {
                    continue;
                }
                let equip: equip_strength_data = this._model.getStrengthInfo(pos1);
                if (!equip) {
                    continue;
                }
                let lvId: number = this.getStrengthLvId(equip.strength_lv + 1);
                let cfg: LevelConfig = getConfigByNameId(ConfigName.Level, lvId);
                if (cfg && cfg.goods_id && cfg.goods_id.length) {
                    let isEnough: boolean = BagUtil.checkPropCnt(cfg.goods_id[0][0], cfg.goods_id[0][1]);
                    hint = isEnough && !!equip.next_attrs;          // 消耗足够，且未满级
                    if (hint) {
                        break;
                    }
                }
            }
            return hint;
        }

        /**
         * 强化大师红点
         * @returns
         */
        public updateStrengthMasterBtnHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Strength) || !this._model.strengthMaster) {
                return false;
            }
            let hint = false;
            let nextLvCfg = this._model.getLvCfg(this.getStrengthMasterLvId(this._model.strengthMaster.level + 1));
            let isMax = this._model.isStrengthMasterMaxLv();
            let needLv = (nextLvCfg ? nextLvCfg.levelup_exp : 0);
            hint = (this._model.strengthMinLv >= needLv) && !isMax;
            return hint;
        }

        //装备部位
        public checkEquipGemHint(pos: number): boolean {
            // let eq: PropData = RoleUtil.getRoleEuqipData(pos);
            // if (!eq) {
            //     return false;
            // }
            //
            // let info: equip_gem_data = this._model.getGemInfo(pos);
            // if (!info || !info.gems) {
            //     return false;
            // }
            // for (let item of info.gems) {
            //     if (this.checkGemPosHint(eq, item)) {
            //         return true;
            //     }
            // }
            return false;
        }

        //宝石孔位红点
        public checkGemPosHint(equipData: PropData, gem: gem_data, eqPos: number, gemPos: number): boolean {
            if (!equipData || equipData.index == 0 || !gem) {
                return false;
            }
            let bagGems: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            if (!bagGems || bagGems.length < 1) {
                return false;
            }
            let gemType = this.getGemType(gem.index) || gemPos + 1;
            let hint = false;
            for (let bagG of bagGems) {
                let cfg: PropConfig = getConfigById(bagG.index);
                if (!cfg || this.getGemType(bagG.index) != gemType) {
                    continue;
                }
                if (!gem.index || bagG.index > gem.index) {     // 镶嵌
                    hint = true;
                    break;
                }
            }
            let synHint = this.checkGemAKeySynHint(bagGems, gemType);
            return hint || synHint;
        }

        //单个宝石镶嵌红点
        public gemSettledHint(holeGem: gem_data, bagGem: PropData): boolean {
            if (bagGem && !holeGem.index) {
                return true;
            }
            let bagGems: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            if (!bagGems || bagGems.length < 1) {
                return false;
            }
            let hint = false;
            if (bagGem.index > holeGem.index) {
                hint = true;
            }
            return hint;
        }

        //一键合成
        public checkGemAKeySynHint(props: PropData[], type?: number): boolean {
            if (!props) {
                props = BagUtil.getBagsByType(BagType.Gem);
            }
            if (!props || props.length <= 0) {
                return false;
            }
            for (let temp of props) {
                if (type && this.getGemType(temp.index) != type) {
                    continue;
                }
                if (this.checkGemSynHint(temp)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 一键镶嵌宝石红点
         */
        public gemOneKeyInlayHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Gem)) {
                return false;
            }
            let hint = false;
            let bagDatas: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            let equipProxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            for (let pos of EquipPosAry) {
                let propData = equipProxy.getEquipByPos(pos);
                if (!propData) {
                    continue;
                }
                for (let i: number = 0; i < 4; i++) {
                    let setted: gem_data = this._model.getGemHoleInfo(pos, i);
                    for (let bagD of bagDatas) {
                        let bagGemType = this.getGemType(bagD.index);
                        if (!setted && bagGemType == i + 1) {
                            hint = true;
                            return hint;
                        } else if (setted && bagGemType == setted.gem_type && bagD.index > setted.index) {
                            hint = true;
                            return hint;
                        }
                    }
                }
            }

            return hint;
        }

        /**
         * 单个宝石合成红点
         * @param gem
         * @returns
         */
        public checkGemSynHint(gem: PropData): boolean {
            if (!gem) {
                return false;
            }
            if (gem.count < 2) {
                return false;
            }

            let hint = false;
            let bagDatas: PropData[] = BagUtil.getBagsByType(BagType.Gem);

            let gemType = this.getGemType(gem.index);
            for (let bagD of bagDatas) {
                if (this.getGemType(bagD.index) == gemType && bagD.count >= 2 && this.checkGemMax(bagD.index)) {
                    hint = true;
                    return hint;
                }
            }

            return hint;
        }

        //宝石大师红点
        public checkGemMasterHint() {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Gem)) {
                return false;
            }
            let master = this._model.gemMaster;
            if (!master) {
                return false;
            }
            let nextNeedLv: number = master.next_gem_lv ? master.next_gem_lv : 0;
            return nextNeedLv > 0 && this._model.gemTotalLv >= nextNeedLv;
        }

        /**
         * 进阶按钮红点（判断全部格子）
         * @returns
         */
        public updateAdvanceBtnHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Advanced)) {
                return false;
            }
            let hint = false;
            let equipProxy: IEquipProxy = getProxy(ModName.Equip, ProxyType.Equip);
            for (let pos1 of EquipPosAry) {
                let propData = equipProxy.getEquipByPos(pos1);          // 有无穿戴装备
                if (!propData) {
                    continue;
                }
                hint = this.updateAdvanceHintByPos(pos1);
                if (hint) {
                    break;
                }
            }
            return hint;
        }

        /**
         * 指定格子的进阶按钮红点
         * @param pos 装备位置
         * @returns
         */
        public updateAdvanceHintByPos(pos: number): boolean {
            let hint = false;
            let equip: equip_advanced_data = this._model.getAdvancedInfo(pos);
            if (!equip) {
                return hint;
            }
            let lvId: number = this.getAdvancedLvId(equip.advanced_lv + 1);
            let cfg: LevelConfig = getConfigByNameId(ConfigName.Level, lvId);
            if (cfg && cfg.goods_id && cfg.goods_id.length) {
                let isEnough: boolean = BagUtil.checkPropCnt(cfg.goods_id[0][0], cfg.goods_id[0][1]);
                hint = isEnough && !!equip.next_attrs;          // 消耗足够，且未满级
            }
            return hint;
        }

        /**
         * 进阶大师红点
         * @returns
         */
        public updateAdvanceMasterBtnHint(): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Advanced)) {
                return false;
            }
            let hint = false;
            let master = this._model.advancedMaster;
            if (!master) {
                return hint;
            }
            let reachCnt = master.rench_level;
            hint = (master && master.next_attrs && this._model.advancedMinLv >= reachCnt && reachCnt != 0);
            HintMgr.setHint(hint, this._model.AdvancedMasterBtnHint);
            return hint;
        }

        /**
         * 取强化的等级表id
         * @param strengthLv
         * @returns
         */
        public getStrengthLvId(strengthLv: number): number {
            return EnhanceCfgBaseId.STRENGTH_BASE + strengthLv;
        }

        /**
         * 取进阶的等级表id
         * @param advancedLv
         * @returns
         */
        public getAdvancedLvId(advancedLv: number): number {
            return EnhanceCfgBaseId.ADVANDE_BASE + advancedLv;
        }

        /**
         * 取强化大师的等级表id
         * @param strengthMasterLv
         * @returns
         */
        public getStrengthMasterLvId(strengthMasterLv: number): number {
            return EnhanceCfgBaseId.STRENGTH_MASTER_BASE + strengthMasterLv;
        }

        /**
         * 取宝石大师的等级表id
         * @param gemMasterLv
         * @returns
         */
        public getGemMasterLvId(gemMasterLv: number): number {
            return EnhanceCfgBaseId.GEM_BASE + gemMasterLv;
        }

        /**
         * 取进阶大师的等级表id
         * @param advancedMasterLv
         * @returns
         */
        public getAdvancedMasterLvId(advancedMasterLv: number): number {
            return EnhanceCfgBaseId.ADVANCE_MASTER_BASE + advancedMasterLv;
        }

        /**
         * 取宝石类型
         * @param id 宝石id
         * @returns
         */
        public getGemType(id: number): number {
            return Math.floor((id % 145040) / 1000);
        }

        /**
         * 取某类型的宝石
         * @param type
         * @returns
         */
        public getGemsByType(type: PropSubType4): PropData[] {
            let tmpBags: PropData[] = [];
            let bags: PropData[] = BagUtil.getBagsByType(BagType.Gem);
            for (let prop of bags) {
                if (type != prop.propSubType) {
                    continue;
                }
                tmpBags.push(prop);
            }
            return tmpBags;
        }

        /**
         * 装备位置转 list 索引
         * @param pos
         * @returns
         */
        public getListIdxByPos(pos: number): number {
            let idxArr: number[] = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
            return pos < idxArr.length ? idxArr[pos] : 0;
        }

        /**
         * 装备 list 索引转位置
         * @param idx
         * @returns
         */
        public getPosByListIdx(idx: number): number {
            return EquipPosAry[idx];
        }

        /**
         * 根据部位获取强化信息
         * @param pos
         */
        public getStrengthInfo(pos: number): equip_strength_data {
            return this._model.getStrengthInfo(pos);
        }

        /**
         * 宝石数据
         * @param pos 部位，0~9
         * @returns
         */
        public getGemInfo(pos: number): gem_data[] {
            return this._model.getGemInfo(pos);
        }

        /**
         * 进阶大师属性（套装属性）
         */
        public getAdvancedMaster(): advanced_master_data {
            return this._model.advancedMaster;
        }

    }

    export interface IStrengthGridData {
        pos: number;
        equip: PropData;
        info: equip_strength_data;
    }

    export interface IGemGridData {
        pos: number;
        equip: PropData;
        info: gem_data[];
    }

    export interface IAdvancedGridData {
        pos: number;
        equip: PropData;
        info: equip_advanced_data;
        hint: boolean;
    }

    export interface IMasterData {
        isCur: boolean;
        masterLv: number;
        attr: attributes;
        reachTitle: string;
        curReachCnt: number;
        needReachCnt: number;
    }

}