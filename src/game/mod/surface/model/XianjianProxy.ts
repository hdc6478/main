namespace game.mod.surface {


    import XianjianConfig = game.config.XianjianConfig;
    import c2s_fly_sword_operation = msg.c2s_fly_sword_operation;
    import fly_sword_info = msg.fly_sword_info;
    import fly_sword_battle_pos_info = msg.fly_sword_battle_pos_info;
    import c2s_fly_sword_into_battle = msg.c2s_fly_sword_into_battle;
    import JianfaConfig = game.config.JianfaConfig;
    import fly_sword_buwei_info = msg.fly_sword_buwei_info;
    import XianjianSkillCostConfig = game.config.XianjianSkillCostConfig;
    import GameNT = base.GameNT;
    import s2c_fly_sword_info = msg.s2c_fly_sword_info;
    import s2c_fly_sword_battle_pos = msg.s2c_fly_sword_battle_pos;
    import ParamConfig = game.config.ParamConfig;
    import XianjianDengjiConfig = game.config.XianjianDengjiConfig;
    import XianjianJibanConfig = game.config.XianjianJibanConfig;
    import XianjianSkillPosConfig = game.config.XianjianSkillPosConfig;
    import attributes = msg.attributes;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import jiban_item = msg.jiban_item;

    /**
     * @description 仙剑系统
     */
    export class XianjianProxy extends ProxyBase implements IXianjianProxy {
        private _model: XianjianModel;

        //保存服务器发过来的仙法技能列表，供战斗中使用
        public skills: number[];


        public get model(): XianjianModel {
            return this._model;
        }

        onStartReconnect() {
            super.onStartReconnect();
            this._model.upStarIdx = null;
            this._model.upStarData = null;
        }

        initialize(): void {
            super.initialize();
            this._model = new XianjianModel();

            this.onProto(s2c_fly_sword_info, this.s2c_fly_sword_info, this);
            this.onProto(s2c_fly_sword_battle_pos, this.s2c_fly_sword_battle_pos, this);
        }

        c2s_fly_sword_operation(index: number, op: number, param?: number): void {
            let msg: c2s_fly_sword_operation = new c2s_fly_sword_operation();
            if (index) {
                msg.index = index;
            }
            if (param) {
                msg.param = param;
            }
            msg.op = op;
            this.sendProto(msg);

            if (op == 5) {
                this._model.isAct = true;
            } else if (op == 1) {
                this._model.upStarIdx = index;//升星的index
            }
        }

        c2s_fly_sword_into_battle(pos: number, index: number): void {
            let msg: c2s_fly_sword_into_battle = new c2s_fly_sword_into_battle();
            msg.pos = pos;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_fly_sword_battle_pos(n: GameNT): void {
            let msg: s2c_fly_sword_battle_pos = n.body;
            if (msg.info) {
                this._model.shangzhen = {};
                this.skills = [];
                for (let i = 0; i < msg.info.length; i++) {
                    let d = msg.info[i];
                    let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, d.index);
                    if (cfg.skill) {
                        this.skills.push(cfg.skill);
                    }
                    this._model.shangzhen[d.pos] = d;
                }

            }
            this.sendNt(SurfaceEvent.ON_UPDATE_SHANGZHEN_INFO)
        }

        private s2c_fly_sword_info(n: GameNT): void {
            let msg: s2c_fly_sword_info = n.body;
            if (msg.info) {
                for (let info of msg.info) {
                    this._model.infos.set(info.index, info);
                    let isShowSurfaceTips = false;
                    //外显激活弹窗
                    if (info.star == 1 && this._model.upStarIdx == info.index) {
                        isShowSurfaceTips = true;
                        ViewMgr.getIns().showSurfaceTips(info.index);
                    }
                    //升星成功弹窗
                    if (info.star != 0 && this._model.upStarIdx == info.index) {
                        let curStar = info.star;
                        let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, info.index);
                        let god = info.all_attr && info.all_attr[AttrKey.god] || 0;
                        let lastGod = 0;
                        if (cfg && cfg.attr_id && cfg.attr_id[curStar - 2]) {
                            let lastAttr = RoleUtil.getAttr(cfg.attr_id[curStar - 2]);
                            lastGod = lastAttr && lastAttr[AttrKey.god] || 0;
                        }
                        let upStarData: UpStarData = {
                            star: curStar,
                            attrFont1: god > 0 ? `+${god}` : '',
                            attrFont0: god > 0 ? `仙力+${lastGod}` : ''
                        }
                        if (isShowSurfaceTips) {
                            this._model.upStarData = upStarData;
                        } else {
                            this._model.upStarData = null;
                            ViewMgr.getIns().showUpStarTips(upStarData);
                        }
                    }
                }
                this._model.upStarIdx = null;
            }
            this.onInitData();
            if (this._model.isAct && msg.jiban_list && this._model.jiban.length != msg.jiban_list.length) {
                ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                this._model.isAct = false;
            }
            if (msg.jiban_list) {
                this._model.jiban = msg.jiban_list;
            }
            this.onUpdateHint();
            this.sendNt(SurfaceEvent.ON_UPDATE_XIANJIAN_INFO);
            this.sendNt(SurfaceEvent.SURFACE_JIBAN_INFO_UPDATE, ConfigHead.Xianjian);
        }

        //升星成功弹窗
        protected onSurfaceTipsHide(): void {
            if (this._model.upStarData) {
                let data = RoleUtil.clone(this._model.upStarData);
                ViewMgr.getIns().showUpStarTips(data);
                this._model.upStarData = null;
            }
        }

        public getInfo(index: number): fly_sword_info {
            return this._model.infos.get(index);
        }

        /**仙剑总属性*/
        public getAttr(): attributes {
            let keys: number[] = Array.from(this._model.infos.keys());
            let attrList: attributes[] = [];
            for (let k of keys) {
                let info = this.getInfo(+k);
                attrList.push(info.all_attr);
            }
            return TextUtil.calcAttrList(attrList);
        }

        public getCfgArr(): XianjianConfig[] {
            let keys: number[] = Array.from(this._model.infos.keys());
            let list: XianjianConfig[] = [];
            for (let k of keys) {
                let info = this.getInfo(+k);
                let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, info.index);
                list.push(cfg);
            }
            return list;
        }

        public get countOfActive(): number {
            let keys: number[] = Array.from(this._model.infos.keys());
            return keys.length;
        }

        public getShangzhen(pos: number): fly_sword_battle_pos_info {
            return this._model.shangzhen && this._model.shangzhen[pos] || null;
        }

        public getXianjianCfgList(type: number, buwei: boolean = false): XianjianConfig[] {
            let cfgArr: XianjianConfig[] = getConfigListByName(ConfigName.Xianjian);
            let list: XianjianConfig[] = [];
            for (let cfg of cfgArr) {
                if (cfg.type != type) {
                    continue;
                }
                // let info = this.getInfo(cfg.index);
                // if (!cfg.show && !info) {
                //     //未激活且不满足激活
                //     continue;
                // }
                if (buwei) {
                    let cfgs = getConfigByNameId(ConfigName.Jianfa, cfg.index);
                    if (!cfgs) {
                        continue;
                    }
                }
                list.push(cfg);
            }
            return list;
        }

        public getMinStage(index: number): number {
            let info: fly_sword_info = this.getInfo(index);
            if (!info || !info.buwei_info) {
                return 0;
            }
            let min: number = 0;
            for (let i = 0; i < 4; i++) {
                let buwei = info.buwei_info[i];
                let lv: number = buwei && buwei.level || 0;
                min = Math.min(min, lv);
            }
            return min;
        }

        public getNextStage(index: number): number {
            let info = this.getInfo(index);
            let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, index);
            let idx: number = info ? info.active_skill_level - 1 : 0;
            let condition: number = cfg.condition[idx];
            if (condition) {
                return condition;
            }
            return 0;
        }

        public getCountByStage(index: number, stage: number): number {
            let info: fly_sword_info = this.getInfo(index);
            if (!info || !info.buwei_info) {
                return 0;
            }
            let count: number = 0;
            for (let buwei of info.buwei_info) {
                if (buwei.level >= stage) {
                    count++;
                }
            }
            return count;
        }

        public getBuwei(data: XianJianBuweiData): fly_sword_buwei_info {
            let info = this.getInfo(data.index);
            if (!info || !info.buwei_info) {
                return null;
            }
            for (let buwei of info.buwei_info) {
                if (buwei.index == data.pos) {
                    return buwei;
                }
            }
            return null;
        }

        public getXianjianBuwei(info: XianJianBuweiData): JianfaConfig {
            let cfgs = getConfigByNameId(ConfigName.Jianfa, info.index);
            for (let k in cfgs) {
                let cfg: JianfaConfig = cfgs[k];
                if (cfg.pos == info.pos) {
                    return cfg;
                }
            }
            return null;
        }

        public getBuweiNext(info: XianJianBuweiData): number[] {
            let cfgs = getConfigByNameId(ConfigName.Jianfa, info.index);
            for (let k in cfgs) {
                let cfg: JianfaConfig = cfgs[k];
                if (cfg.pos == info.pos) {
                    let buwei = this.getBuwei(info);
                    return cfg.cost[buwei && buwei.level || 0] || null;
                }
            }
            return null;
        }

        public getCfgSkill(index: number, pos: number, level?: number): number {
            let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, index);
            let cfgs = getConfigByNameId(ConfigName.XianjianSkillPos, cfg.quality);
            let lv: number = level || this.getSkillLv(index, pos) || 1;
            for (let k in cfgs) {
                let cfg_pos: XianjianSkillPosConfig = cfgs[k];
                if (cfg_pos.level == lv) {
                    return cfg_pos.skills[pos - 1];
                }
            }
            return 0;
        }

        /**被动技能等级 */
        public getSkillLv(index: number, pos: number): number {
            let info = this.getInfo(index);
            if (info && info.skill_index) {
                for (let skill of info.skill_index) {
                    if (skill.index == pos) {
                        return skill.level;
                    }
                }
            }
            return 0;
        }

        public getSkillCost(index: number, level: number): number[] {
            let xianjian: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, index);
            let cfg: XianjianSkillCostConfig = getConfigByNameId(ConfigName.XianjianSkillCost, xianjian.quality);
            let cost: number[] = cfg.cost[level];
            if (cost && cost.length) {
                return cost;
            }
            return []
        }

        public get jibans(): jiban_item[] {
            return this._model.jiban;
        }

        private onUpdateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianjian)) {
                return;
            }
            let types: number[] = this.getTypes();
            for (let type of types) {
                this.onUpdateHintByType(type);
            }
            this.onUpdateHintByBuwei();
        }

        private onUpdateHintByBuwei(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianjian)) {
                return;
            }
            for (let type of this.buwei_types) {
                this.onUpdateHintBySkill(type);
            }
        }

        private onUpdateHintBySkill(type: number): void {
            let roots: string[] = [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType02, `0${type}`];
            HintMgr.setHint(this.getTypeHintBySkill(type), roots);
        }

        public getTypeHintBySkill(type: number): boolean {
            let cfgArr = this.getXianjianCfgList(type, true);
            for (let cfg of cfgArr) {
                if (this.getItemHintBySkill(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        public getItemHintBySkill(index: number): boolean {
            let info = this.getInfo(index);
            if (!info) {
                return false;
            }
            if (this.getSkillUp(index)) {
                return true;
            }
            let cfgs: { [key: number]: JianfaConfig } = getConfigByNameId(ConfigName.Jianfa, index);
            for (let k in cfgs) {
                let cfg: JianfaConfig = cfgs[k];
                if (this.getBuweiUp(index, cfg)) {
                    return true;
                }
            }
            return false;
        }

        public getSkillUp(index: number): boolean {
            let count: number = this.getCountByStage(index, this.getNextStage(index));
            if (count >= 4) {
                return true;
            }
            return false;
        }

        public getBuweiUp(index: number, cfg: JianfaConfig): boolean {
            let nextCost: number[] = this.getBuweiNext({ index, pos: cfg.pos });
            if (nextCost && nextCost.length) {
                return BagUtil.checkPropCnt(nextCost[0], nextCost[1]);
            }
            return false;
        }

        public onUpdateHintByType(type: number): void {
            let roots: string[] = [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType01, `0${type}`];
            let bool: boolean = this.getTypeHint(type);
            HintMgr.setHint(bool, roots);
        }

        public getTypeHint(type: number): boolean {
            let cfgArr = this.getXianjianCfgList(type);
            for (let cfg of cfgArr) {
                if (this.getItemHint(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        public getItemHint(index: number): boolean {
            if (this.canUpStar(index)) {
                return true;
            }
            if (this.canUpJiban(index)) {
                return true;
            }
            if (this.canUpLevel(index)) {
                return true;
            }
            return false;
        }

        public canUpJiban(index: number): boolean {
            let info = this.getInfo(index);
            if (!info) {
                return false;
            }
            let cfgArr: XianjianJibanConfig[] = getConfigListByName(ConfigName.XianjianJiban);
            for (let cfg of cfgArr) {
                if (cfg.partners.indexOf(index) == -1) {
                    continue;
                }
                let jiban: jiban_item = this.jibans.find(v => { return v.index == cfg.index });
                if (jiban && jiban.is_active_jiban) {
                    return false;
                }
                if (!jiban || jiban.ride_index.indexOf(index) == -1) {
                    return true;
                }
                if (jiban.ride_index.length == cfg.partners.length) {
                    return true;
                }
            }
            return false;
        }

        public canUpLevel(index: number): boolean {
            let info = this.getInfo(index);
            if (!info) {
                return false;
            }
            let xianjian: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, index);
            let level: number = info.level + 1;
            let cfgs: { [level: number]: XianjianDengjiConfig } = getConfigByNameId(ConfigName.XianjianDengji, xianjian.quality);
            let cfg: XianjianDengjiConfig = cfgs[level];
            let cost: number[][] = cfg && cfg.star_consume || null;
            if (this._model.costIndex.indexOf(cost[0][0]) == -1) {
                this._model.costIndex.push(cost[0][0]);
            }
            if (cost && BagUtil.checkPropCnt(cost[0][0], cost[0][1])) {
                return true;
            }
            for (let i = 1; i <= 4; i++) {
                if (level <= xianjian.skill_condition[i][1]) {
                    return false;
                }
                let lv: number = this.getSkillLv(index, i);
                let cost: number[] = this.getSkillCost(index, lv);
                if (this._model.costIndex.indexOf(cost[0]) == -1) {
                    this._model.costIndex.push(cost[0]);
                }
                if (cost && BagUtil.checkPropCnt(cost[0], cost[1])) {
                    return true;
                }
                // let skillLevel = this.getSkillLv(index, i);
                // let nextCfg: XianjianSkillCostConfig = getConfigByNameId(ConfigName.XianjianSkillCost, xianjian.quality);
                // let nextCost: number[] = nextCfg.cost[skillLevel - 1];
                // if (skillLevel && nextCfg && nextCost && BagUtil.checkPropCnt(nextCost[0], nextCost[1])) {
                //     return true;
                // }
            }
            return false;
        }

        public canJibanAct(cfg: HorseJibanConfig): boolean {
            let info = this.jibans.find(v => {
                return v.index == cfg.index
            });
            if (!info || info.is_active_jiban) {
                return false;
            }
            let infos = cfg.partners;
            return infos.every(v => {
                return info.ride_index.indexOf(v) > -1;
            });
        }

        public canUpStar(index: number): boolean {
            let headType = PropData.getPropParse(index, PropParseType.Type);
            let info = this.getInfo(index);
            let param: ParamConfig = GameConfig.getParamConfigById("xianjian_max_star");
            let maxStar = param && param.value || 5;
            let star = info && info.star || 0;
            if (star >= maxStar) {
                return false;
            }
            let cfg = getConfigById(index);
            let cost: number[] = cfg.material[star];
            let idx = cost[0];
            let costCnt = cost[1];
            let curCnt = this.getStarPropCnt(headType, cfg.quality, idx, star);
            if (curCnt >= costCnt) {
                return true;
            }
            return false;
        }

        //外显品质，道具propIndex
        public getStarPropCnt(headType: number, quality: number, propIndex: number, star: number): number {
            let curCnt = BagUtil.getPropCntByIdx(propIndex);
            if (!star) {
                return curCnt;
            }
            let cfg: ParamConfig = GameConfig.getParamConfigById(SurfaceConfigList[headType] + "_star_prop");
            let infos: number[] = cfg && cfg.value ? cfg.value : [];
            let idx = infos.length >= quality ? infos[quality - 1] : 0;
            if (idx) {
                curCnt += BagUtil.getPropCntByIdx(idx);
            }
            return curCnt;
        }

        public getListData(type: number, buwei: boolean = false): AvatarItemData[] {
            let cfgList: XianjianConfig[] = this.getXianjianCfgList(type, buwei);
            if (!cfgList || !cfgList.length) {
                return null;
            }
            // let typeInfo = this._proxy.getTypeInfo(this._type);
            let actOrUp: AvatarItemData[] = [];
            let actedList: AvatarItemData[] = [];
            let notAct: AvatarItemData[] = [];
            for (let cfg of cfgList) {
                // if (!cfg.show) {
                //     continue;
                // }
                let info = this.getInfo(cfg.index);
                // let isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == cfg.index;
                let itemData: AvatarItemData = {
                    cfg,
                    showHint: this.getItemHint(cfg.index),
                    star: info && info.star || 0,
                    isSel: false
                };
                // if (isBattle) {
                //     actOrUp.unshift(itemData);
                // } else
                if (this.canUpStar(cfg.index)) {
                    actOrUp.push(itemData);
                } else if (itemData.star) {
                    actedList.push(itemData);
                } else {
                    if (!cfg.show) {
                        continue;
                    }
                    notAct.push(itemData);
                }
            }
            actOrUp.sort(this.defaultSort);
            actedList.sort(this.defaultSort);
            notAct.sort(this.defaultSort);
            return actOrUp.concat(actedList, notAct);
        }

        private defaultSort(a: AvatarItemData, b: AvatarItemData): number {
            if (a.cfg.quality == b.cfg.quality) {
                return a.cfg.index - b.cfg.index;
            }
            return a.cfg.quality - b.cfg.quality;
        }

        private onInitData(): void {
            let cfgArr: XianjianConfig[] = getConfigListByName(ConfigName.Xianjian);
            for (let cfg of cfgArr) {
                // let nums: number[] = [];
                // if (this._model.starProps.has(cfg.type)) {
                //     nums = this._model.starProps.get(cfg.type);
                // }
                for (let cost of cfg.material) {
                    let prop: number = cost[0];
                    if (this._model.starProps.indexOf(prop) == -1) {
                        this._model.starProps.push(prop);

                        let indexs: number[] = [];
                        if (this._model.propToIndex.has(prop)) {
                            indexs = this._model.propToIndex.get(prop);
                        }
                        if (indexs.indexOf(cfg.index) == -1) {
                            indexs.push(cfg.index);
                        }
                        this._model.propToIndex.set(prop, indexs);
                    }
                }
                // this._model.starProps.set(cfg.type, nums);

                this.setType(cfg);
            }
        }

        private setType(cfg: XianjianConfig): void {
            let info = this.getInfo(cfg.index);
            if (!cfg.show && !info) {
                let cost: number[] = cfg.material[info && info.star || 0];
                if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
                    return;
                }
                if (this._model.types.indexOf(cfg.type) == -1) {
                    this._model.types.push(cfg.type);
                }
                return;
            }
            // if (this._model.types.indexOf(cfg.type) == -1) {
            //     this._model.types.push(cfg.type);
            // }
            this.setBuweiTypes(cfg.index, cfg.type);
            // let info = this.getInfo(cfg.index);
            // if (info) {
            //     this.setBuweiTypes(cfg.index, cfg.type);
            // }
            // let cost: number[] = cfg.material[info && info.star || 0];
            // if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
            //     return;
            // }
            if (this._model.types.indexOf(cfg.type) == -1) {
                this._model.types.push(cfg.type);
            }
        }

        /**获取材料更新仙剑类型列表 */
        // private updateType(prop: number): void {
        //     let xianjians: number[] = this._model.propToIndex.get(prop);
        //     for (let xianjian of xianjians) {
        //         let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, xianjian);
        //         let types: number[] = this.getTypes();
        //         if (types.indexOf(cfg.type) > -1) {
        //             continue;
        //         }
        //         let info = this.getInfo(cfg.index);
        //         if (info) {
        //             this.setBuweiTypes(cfg.type);
        //         }
        //         let cost: number[] = cfg.material[info && info.star || 0];
        //         if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
        //             continue;
        //         }
        //         this._model.types.push(cfg.type);
        //     }
        // }

        public getTypes(): number[] {
            return this._model.types;
        }

        public get buwei_types(): number[] {
            return this._model.buwei_types;
        }

        public setBuweiTypes(index: number, type: number): void {
            let buwei: JianfaConfig = getConfigByNameId(ConfigName.Jianfa, index);
            if (!buwei) {
                return;
            }
            if (this.buwei_types.indexOf(type) == -1) {
                this._model.buwei_types.push(type);
            }
        }

        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void {
            let list: { [type: number]: number[] } = n.body;
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    this.onInitData();
                    this.onUpdateHint();
                } else if ((+type) == PropType.XianjianBuwei) {
                    this.onUpdateHintByBuwei();
                }
            }
        }

        protected onBagUpdateByBagType(n: GameNT): void {
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.Material) > -1) {
                this.onUpdateHintByBuwei();
            }
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            for (let index of indexs) {
                if (this._model.costIndex.indexOf(index) > -1) {
                    this.onUpdateHint();
                    return;
                }
            }
        }
        //     if (!this._model.starProps.length) {
        //         this.onInitData();
        //     }
        //     let bool: boolean = indexs.some(v => { return this._model.starProps.indexOf(v) > -1 });
        //     if (!bool) {
        //         return;
        //     }
        //     for (let index of indexs) {
        //         let prop: number = this._model.starProps.find(v => { return v == index });
        //         if (!prop) {
        //             continue;
        //         }
        //         // this.updateType(prop);
        //         let xianjians: number[] = this._model.propToIndex.get(prop);
        //         for (let xianjian of xianjians) {
        //             let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, xianjian);
        //             /**更新type红点 */
        //             this.onUpdateHintByType(cfg.type);
        //             let types: number[] = this.getTypes();
        //             if (types.indexOf(cfg.type) > -1) {
        //                 continue;
        //             }
        //             let info = this.getInfo(cfg.index);
        //             if (info) {
        //                 this.setBuweiTypes(cfg.index, cfg.type);
        //             }
        //             let cost: number[] = cfg.material[info && info.star || 0];
        //             if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
        //                 continue;
        //             }
        //             this._model.types.push(cfg.type);
        //         }
        //     }
        // }
    }
}