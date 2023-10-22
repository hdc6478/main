namespace game.mod.role {

    import GameNT = base.GameNT;
    import s2c_suit_equip_info = msg.s2c_suit_equip_info;
    import c2s_suit_equip_takeon = msg.c2s_suit_equip_takeon;
    import c2s_suit_equip_lvup = msg.c2s_suit_equip_lvup;
    import suit_item = msg.suit_item;
    import suit_equip = msg.suit_equip;
    import EquipmentConfig = game.config.EquipmentConfig;
    import attributes = msg.attributes;
    import SuitStageConfig = game.config.SuitStageConfig;
    import SuitStrengthConfig = game.config.SuitStrengthConfig;
    import LanDef = game.localization.LanDef;
    import c2s_suit_equip_synthesis = msg.c2s_suit_equip_synthesis;
    import c2s_suit_equip_master_lvup = msg.c2s_suit_equip_master_lvup;
    import s2c_suit_two_equip_info = msg.s2c_suit_two_equip_info;
    import c2s_suit_two_equip_takeon = msg.c2s_suit_two_equip_takeon;
    import c2s_suit_two_equip_lvup = msg.c2s_suit_two_equip_lvup;
    import suit_two_item = msg.suit_two_item;
    import suit_two_equip = msg.suit_two_equip;
    import LevelConfig = game.config.LevelConfig;
    import attr_and_next = msg.attr_and_next;
    import SuitTypeConfig = game.config.SuitTypeConfig;
    import SuitPartConfig = game.config.SuitPartConfig;
    import s2c_suit_equip_synthesis = msg.s2c_suit_equip_synthesis;
    import BuffConfig = game.config.BuffConfig;
    import facade = base.facade;
    import c2s_suit_equip_onekey = msg.c2s_suit_equip_onekey;

    /**
     * @description 套装系统
     */
    export class SuitProxy extends ProxyBase {
        private _model: SuitModel;
        /**合成界面，点击选择list下的list*/
        public composeSelSub = false;
        public composeSelPos = false;
        public composeSelPos2 = false;
        /**当前选择合成的数据【套装类型，阶数，部位】*/
        public _composeSelAry: number[];

        public set composeSelAry(ary: number[]) {
            DEBUG && console.log(`set compose ary: `, ...ary);
            this._composeSelAry = ary;
        }

        public get composeSelAry(): number[] {
            return this._composeSelAry;
        }

        public get model(): SuitModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new SuitModel();
            this.onProto(s2c_suit_equip_info, this.s2c_suit_equip_info, this);
            this.onProto(s2c_suit_two_equip_info, this.s2c_suit_two_equip_info, this);
            this.onProto(s2c_suit_equip_synthesis, this.s2c_suit_equip_synthesis, this);

            facade.onNt(ShilianEvent.ON_FORBIDDEN_INFO_UPDATE, this.onForbiddenInfoUpdate, this);
        }

        //苍天 炎天信息
        private s2c_suit_equip_info(n: GameNT): void {
            let msg: s2c_suit_equip_info = n.body;
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    this._model.infos[info.type] = info;
                }
            }
            this.updateHint1();
            this.sendNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE);
        }

        //一键穿戴
        public c2s_suit_equip_onekey(type: SuitType, list: number[]): void {
            let msg = new c2s_suit_equip_onekey();
            msg.type = type;
            let idList: Long[] = [];
            for (let id of list) {
                idList.push(Long.fromNumber(id));
            }
            msg.equipment_id = idList;
            this.sendProto(msg);
        }

        //穿戴苍天 炎天装备
        public c2s_suit_equip_takeon(id: number, type: SuitType, pos: EquipPos): void {
            let msg = new c2s_suit_equip_takeon();
            msg.equipment_id = Long.fromNumber(id);
            msg.type = type;
            msg.pos = pos;
            this.sendProto(msg);
        }

        // 装备强化 ope 0单件强化 1:一键强化
        public c2s_suit_equip_lvup(ope: number, type: SuitType, pos: EquipPos): void {
            let msg = new c2s_suit_equip_lvup();
            msg.opear = ope;
            msg.type = type;
            if (pos != null) {
                msg.pos = pos;
            }
            this.sendProto(msg);
        }

        /** 套装装备合成 */
        public c2s_suit_equip_synthesis(id: number, type: number, pos: number, cnt: number = 1): void {
            let msg = new c2s_suit_equip_synthesis();
            msg.equipment_id = Long.fromNumber(id);
            msg.type = type;
            msg.pos = pos;
            msg.cnt = cnt;
            this.sendProto(msg);
        }

        public s2c_suit_equip_synthesis(): void {
            this.sendNt(SuitEvent.ON_SUIT_EQUIP_SYNTHESIS_UPDATE);
        }

        // 装备强化大师升级
        public c2s_suit_equip_master_lvup(type: SuitType): void {
            let msg = new c2s_suit_equip_master_lvup();
            msg.type = type;
            this.sendProto(msg);
        }

        /** 颢天、玄天、钧天信息 */
        private s2c_suit_two_equip_info(n: GameNT): void {
            let msg = n.body as s2c_suit_two_equip_info;
            if (msg.infos != null) {
                for (let info of msg.infos) {
                    this._model.infos2[info.type] = info;
                }
            }
            this.updateHint2();
            this.sendNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE_TWO);
        }

        /** 穿戴颢天、玄天、钧天装备 */
        public c2s_suit_two_equip_takeon(type: SuitType, pos: EquipPos, equipment_id: number): void {
            let msg = new c2s_suit_two_equip_takeon();
            msg.type = type;
            msg.pos = pos;
            msg.equipment_id = Long.fromNumber(equipment_id);
            this.sendProto(msg);
        }

        /**
         * 颢天、玄天、钧天装备强化
         * @param ope 0单件 1:一键
         * @param ope_type 1 进阶 2 锻造 3 精铸
         * @param type 3颢天 4玄天 5钧天
         * @param pos 0-9部位
         */
        public c2s_suit_two_equip_lvup(ope: number, ope_type: number, type: SuitType, pos: EquipPos): void {
            let msg = new c2s_suit_two_equip_lvup();
            msg.opear = ope;
            msg.opear_type = ope_type;
            msg.type = type;
            if (pos != null) {
                msg.pos = pos;
            }
            this.sendProto(msg);
        }

        /**================================= 配置 =================================*/

        /**进阶配置*/
        public getSuitStageCfg(type: SuitType, lv: number): SuitStageConfig {
            let obj = getConfigByNameId(ConfigName.SuitStage, type);
            if (!obj || !obj[lv]) {
                DEBUG && console.log(`没有套装进阶配置 suit_type:${type} lv:${lv}`);
                return null;
            }
            return obj[lv];
        }

        /**强化配置*/
        public getSuitStrengthenCfg(type: SuitType, lv: number): SuitStrengthConfig {
            let obj = getConfigByNameId(ConfigName.SuitStrengthen, type);
            if (!obj || !obj[lv]) {
                DEBUG && console.log(`没有套装强化配置 suit_type:${type} lv:${lv}`);
                return null;
            }
            return obj[lv];
        }

        /**套装类型配置*/
        public getSuitTypeCfg(type: SuitType): SuitTypeConfig {
            return getConfigByNameId(ConfigName.SuitType, type);
        }

        /**套装类型组成配置*/
        public getSuitPartCfg(index: number): SuitPartConfig {
            return getConfigByNameId(ConfigName.SuitPart, index);
        }

        /**
         * 158000000 + (套装类型 + 操作类型 ) * 100000 + 部位 * 1000 + 等级
         * 套装类型（3颢天 4玄天 5钧天） 操作类型（1 进阶 2 锻造 3 精铸）
         * @param type 3颢天 4玄天 5钧天
         * @param operType 1 进阶 2 锻造 3 精铸
         * @param lv
         */
        public getLevelCfg(type: SuitType, operType: number, lv: number): LevelConfig {
            let index = 150000000 + (type - 1 + 80) * 100000 + operType * 10000 + lv;
            return getConfigByNameId(ConfigName.Level, index);
        }

        /**获取消耗*/
        public getCost(type: SuitType, operType: number, lv: number = 0): number[] {
            if (type < SuitType.HaoTian) {
                let index = 158 * 1000000 + (type + 4) * 100000 + lv;
                let lvCfg: LevelConfig = getConfigByNameId(ConfigName.Level, index);
                if (lvCfg && lvCfg.goods_id) {
                    return lvCfg.goods_id[0];
                }
                return null;
            }
            //进阶，精铸穿戴不需要消耗，只消耗本身 2023.1.4
            if ((operType == SuitOperType.JinJie || operType == SuitOperType.JingZhu) && lv == 0) {
                return null;
            }
            let lvCfg = this.getLevelCfg(type, operType, lv);
            if (lvCfg && lvCfg.goods_id) {
                return lvCfg.goods_id[0];
            }
            return null;
        }

        public getEquipCfg(type: SuitType, stage = 1, pos = EquipPos.SWORD): EquipmentConfig {
            let idx = this.getIndex(type, stage, pos);
            return getConfigByNameId(ConfigName.Equip, idx);
        }

        /**==================================================================*/

        /**套装类型1，2数据*/
        public getSuitTypeInfo(type: SuitType): suit_item {
            let typeInfo = this._model.infos[type];
            if (!typeInfo) {
                return null;
            }
            return typeInfo;
        }

        /**套装类型3，4，5数据*/
        public getSuitTypeInfo2(type: SuitType): suit_two_item {
            let typeInfo = this._model.infos2[type];
            return typeInfo || null;
        }

        /**套装类型1，2部位数据*/
        public getPosEquipInfo(type: SuitType, pos: EquipPos): suit_equip {
            let info = this.getSuitTypeInfo(type);
            if (!info || !info.equips) {
                return null;
            }
            for (let item of info.equips) {
                if (item && item.pos == pos) {
                    return item;
                }
            }
            return null;
        }

        /**套装类型3，4，5操作数据*/
        public getSuitOperInfo(type: SuitType, operType: SuitOperType): suit_two_equip {
            let info = this.getSuitTypeInfo2(type);
            if (!info || !info.equips || !info.equips.length) {
                return null;
            }
            for (let item of info.equips) {
                if (item && item.oper_type == operType) {
                    return item;
                }
            }
            return null;
        }

        /**套装类型3,4,5部位数据*/
        public getPosEquipInfo2(type: SuitType, pos: number, operType: SuitOperType): attr_and_next {
            let info = this.getSuitOperInfo(type, operType);
            if (!info || !info.attr_list || !info.attr_list.length) {
                return null;
            }
            for (let item of info.attr_list) {
                if (item && item.pos == pos) {
                    return item;
                }
            }
            return null;
        }

        /**
         * 获取套装类型1,2的装备index
         * @param type 套装类型 SuitType
         * @param stage 阶数
         * @param pos 部位 EquipPos
         */
        public getIndex(type: SuitType, stage: number = 1, pos: EquipPos = EquipPos.SWORD): number {
            return ConfigHead.Equip * 10000000 + EquipPropType.Suit * 100000 + type * 10000 + stage * 100 + pos;
        }

        /**背包中可穿戴的*/
        public getIndexForBag(type: SuitType, pos: EquipPos = EquipPos.SWORD): number {
            let bagList = BagUtil.getBagsByType(BagType.Suit);
            if (bagList && bagList.length) {
                for (let prop of bagList) {
                    if (prop && prop.equipPos == pos && prop.propType == EquipPropType.Suit
                        && this.getIndexType(prop.index) == type) {
                        return prop.index;
                    }
                }
            }
            return 0;
        }

        /**获取套装类型1,2的可穿戴index*/
        public getIndexForDress(type: SuitType, pos: EquipPos = EquipPos.SWORD): number {
            let bagIndex = this.getIndexForBag(type, pos);
            if (bagIndex) {
                return bagIndex;
            }
            return this.getIndex(type, 1, pos);//获取一阶
        }

        /**
         * 获取套装类型3,4,5的装备index
         * @param type 套装类型
         * @param pos 部位
         * @param operType 只有 1进阶，3精铸
         * @param stage 阶数 默认都是1阶
         */
        public getIndex2(type: SuitType, pos: EquipPos, operType: SuitOperType, stage = 1): number {
            return ConfigHead.Equip * 10000000 + EquipPropType.Suit * 100000 + type * 10000 + stage * 100 + operType * 10 + pos;
        }

        /**获取套装类型*/
        public getIndexType(index: number): number {
            return Number((index + '').slice(5, 6));
        }

        /**获取套装阶数*/
        public getIndexLv(index: number): number {
            return Number((index + '').slice(6, 8));
        }

        /**SuitType对应的最大进阶数*/
        public typeStage: { [type: number]: number } = {};

        // 获取最大进阶数
        public getMaxStageByType(type: SuitType): number {
            if (this.typeStage[type]) {
                return this.typeStage[type];
            }
            let cfgObj = getConfigByNameId(ConfigName.SuitStage, type);
            let max = Object.keys(cfgObj).length;
            this.typeStage[type] = max;
            return max;
        }

        /**套装属性*/
        public getSuitAttr(type: SuitType): attributes {
            let info = this.getSuitTypeInfo(type);
            if (info && info.suit_attr) {
                return info.suit_attr;
            }
            let attr = new attributes();
            let cfg = this.getSuitStageCfg(type, 1);
            if (cfg && cfg.attr_id) {
                attr = RoleUtil.getAttr(cfg.attr_id);
            }
            return attr;
        }

        /**强化属性*/
        public getStrengthenAttr(type: SuitType): attributes {
            let info = this.getSuitTypeInfo(type);
            if (info && info.master_attr) {
                return info.master_attr;
            }
            let attr = new attributes();
            let cfg = this.getSuitStrengthenCfg(type, 1);
            if (cfg && cfg.attr_id) {
                attr = RoleUtil.getAttr(cfg.attr_id);
            }
            return attr;
        }

        /**套装类型3,4,5的操作类型属性总和*/
        public getAttrByTypeAndOperType(type: SuitType, operType: SuitOperType): attributes {
            let typeInfo = this.getSuitOperInfo(type, operType);
            if (!typeInfo || !typeInfo.attr_list) {
                return null;
            }
            let attrList: attributes[] = [];
            for (let equip of typeInfo.attr_list) {
                if (equip && equip.attr) {
                    attrList.push(equip.attr);
                }
            }
            return TextUtil.calcAttrList(attrList);
        }

        /**套装阶数*/
        public getSuitLv(type: SuitType): number {
            let info = this.getSuitTypeInfo(type);
            return info && info.suit_lv || 0;
        }

        /**套装达到最大阶数，类型1,2*/
        public isMaxSuitLv(type: SuitType): boolean {
            let maxLv = this.getMaxStageByType(type);
            let info = this.getSuitTypeInfo(type);
            return info && info.suit_lv && info.suit_lv >= maxLv;
        }

        //全身进阶等级大于等于curLv的装备数量
        public getSuitLvNotLess(type: SuitType, curLv: number): number {
            let info = this.getSuitTypeInfo(type);
            if (!info || !info.equips) {
                return 0;
            }
            let cfg = this.getSuitStageCfg(type, curLv);
            if (!cfg) {
                return 0;
            }
            let needLv = cfg.stage;
            let cnt = 0;
            for (let item of info.equips) {
                if (item && item.stage >= needLv) {
                    cnt++;
                }
            }
            return cnt;
        }

        //全身强化等级大于等于curLv的装备数量
        public getMasterLvNotLess(type: SuitType, curLv: number) {
            let info = this.getSuitTypeInfo(type);
            if (!info || !info.equips) {
                return 0;
            }
            let cfg = this.getSuitStrengthenCfg(type, curLv);
            if (!cfg) {
                return 0;
            }
            let needLv = cfg.strength;
            let cnt = 0;
            for (let item of info.equips) {
                if (item && item.level >= needLv) {
                    cnt++;
                }
            }
            return cnt;
        }

        public getChineseNum(num: number): string {
            if (num <= 10) {
                return getLanById('shuzi_' + num);
            }
            let str: string;
            let ten = Math.floor(num / 10);
            let bit = num % 10;
            if (ten == 1) {
                str = getLanById(LanDef.shuzi_10);//十
            } else {
                str = getLanById(`shuzi_${ten}`) + getLanById(LanDef.shuzi_10);//x十
            }
            if (bit != 0) {
                str += getLanById(`shuzi_${bit}`);
            }
            return str;
        }

        /**强化大师能否强化，类型1,2才有*/
        public canMasterUp(type: SuitType, isTips = false): boolean {
            let info = this.getSuitTypeInfo(type);
            let size = SuitEquipPosAry.length;
            if (!info || !info.equips || info.equips.length < size) {
                if (isTips) {
                    PromptBox.getIns().show(`条件不足`);
                }
                return false;
            }
            let next_lv = (info.master_lv || 0) + 1;//下一个等级
            if (!this.getSuitStrengthenCfg(type, next_lv)) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大阶`);
                }
                return false;
            }
            let satisfyCnt = this.getMasterLvNotLess(type, next_lv);
            if (satisfyCnt < size) {
                if (isTips) {
                    PromptBox.getIns().show(`条件不足`);
                }
                return false;
            }
            return true;
        }

        /**======================================合成======================================*/

        //套装背包
        public getSuitEquipListByBagType() {
            return BagUtil.getBagsByType(BagType.Suit);
        }

        //套装背包-指定套装类型
        public getSuitEquipListByType(type: SuitType): PropData[] {
            let list = this.getSuitEquipListByBagType();
            let rst: PropData[] = [];
            for (let item of list) {
                if (item && this.getIndexType(item.index) == type) {
                    rst.push(item);
                }
            }
            return rst;
        }

        //套装类型-指定套装类型和装备部位
        public getSuitEquipListByTypeAndPos(type: SuitType, pos: EquipPos): PropData[] {
            let list = this.getSuitEquipListByType(type);
            let rst: PropData[] = [];
            for (let item of list) {
                if (item && item.equipPos == pos) {
                    rst.push(item);
                }
            }
            return rst;
        }

        //获取当前穿戴的
        public getCurDress(type: SuitType, pos: EquipPos): suit_equip {
            let info = this.getSuitTypeInfo(type);
            if (!info || !info.equips || !info.equips.length) {
                return null;
            }
            for (let eq of info.equips) {
                if (eq.pos == pos) {
                    return eq;
                }
            }
            return null;
        }

        //当前穿戴的是否可以用于合成
        public checkCurDressForCompose(type: SuitType, lv: number, pos: EquipPos): boolean {
            let eq = this.getCurDress(type, pos);
            if (!eq) {
                return false;
            }
            //低一阶的用于合成
            let equipLv = this.getIndexLv(eq.equipment_id.toNumber());
            return equipLv == lv - 1;
            // return Number(eq.equipment_id.toString().slice(6, 8)) == lv - 1;
        }

        // //获取装备阶数
        // public getLv(index: number): number {
        //     let lv = (index + '').slice(6, 8);
        //     return +lv;
        // }

        //获取可以合成的数据列表，底一阶的用于合成
        public getCanComposeList(type: SuitType, lv: number, pos: EquipPos): PropData[] {
            let list: PropData[] = [];
            if (this.checkCurDressForCompose(type, lv, pos)) {
                let eq = this.getCurDress(type, pos);
                list.push(PropData.create(eq.equipment_id));
            }
            let datas = this.getSuitEquipListByTypeAndPos(type, pos);
            for (let d of datas) {
                if (d && this.getIndexLv(d.index) == lv - 1) {
                    list.push(d);
                }
            }
            return list;
        }

        /**
         * 合成红点
         * @param type
         * @param stageLv
         * @param pos
         */
        public getComposeHint(type: SuitType, stageLv: number, pos: EquipPos): boolean {
            let list = this.getCanComposeList(type, stageLv, pos);
            return list && list.length >= 3;
        }

        public getTotalComposeHint(): boolean {
            return this.updateComposeHintByType(SuitType.CangTian) || this.updateComposeHintByType(SuitType.YanTian);
        }

        /**合成红点*/
        public updateComposeHintByType(type: SuitType): boolean {
            let hintPath = this._model.composeHintPath[type];
            let min = 2;
            let max = this.getMaxStageByType(type);
            let typeHint = false;
            for (let i = min; i <= max; i++) {
                for (let pos of SuitEquipPosAry) {
                    let hint = this.getComposeHint(type, i, pos);
                    // hintPath, 阶数, 部位
                    HintMgr.setHint(hint, [...hintPath, i + '', pos + '']);
                    if (hint) {
                        typeHint = hint;
                    }
                }
            }
            return typeHint;
        }

        /**
         * 获取可以合成的数据【套装,阶数,部位】
         * 如果没有可以合成的，就选择当前选中的
         * 如果都没有当前选中的，那就默认 [1, 2, 0]
         */
        public getCanComposeData(): number[] {
            let suitTypeAry = [SuitType.CangTian, SuitType.YanTian];
            let minLv = 2;
            for (let type of suitTypeAry) {
                let maxLv = this.getMaxStageByType(type);
                for (let lv = minLv; lv <= maxLv; lv++) {
                    for (let pos of SuitEquipPosAry) {
                        if (this.getComposeHint(type, lv, pos)) {
                            return [type, lv, pos];
                        }
                    }
                }
            }
            let ary = this.composeSelAry;
            if (ary && ary.length) {
                return ary;
            }
            return [suitTypeAry[0], minLv, SuitEquipPosAry[0]];
        }

        public getCanComposeDataByType(type: SuitType): number[] {
            let minLv = 2;
            let maxLv = this.getMaxStageByType(type);
            for (let lv = minLv; lv <= maxLv; lv++) {
                for (let pos of SuitEquipPosAry) {
                    if (this.getComposeHint(type, lv, pos)) {
                        return [type, lv, pos];
                    }
                }
            }
            let ary = this.composeSelAry;
            if (ary && ary.length && ary[0] == type) {
                return ary;
            }
            return [type, minLv, SuitEquipPosAry[0]];
        }

        /**======================================合成 end======================================*/

        /**已达强化最大等级*/
        public isStrengthenMax(type: SuitType, pos: number): boolean {
            let info = this.getPosEquipInfo(type, pos);
            if (!info) {
                return false;
            }
            let maxLv = GameConfig.getParamConfigById('taozhuang_maxlv').value;
            return info.level >= maxLv;
        }

        /**能否一键强化，套装类型1,2*/
        public canStrengthenOneKey(type: SuitType, isTips = false): boolean {
            let info = this.getSuitTypeInfo(type);
            if (!info || !info.equips || !info.equips.length) {
                if (isTips) {
                    PromptBox.getIns().show(`暂无可强化装备`);
                }
                return false;
            }
            let isAllMax = true;
            for (let pos of SuitEquipPosAry) {
                if (!this.isStrengthenMax(type, pos)) {
                    isAllMax = false;
                    break;
                }
            }
            if (isAllMax) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大强化等级`);
                }
                return false;
            }
            let cost: number[];
            for (let eq of info.equips) {
                if (eq && this.canStrengthen(type, eq.pos, false)) {
                    return true;
                }
                if (!this.isStrengthenMax(type, eq.pos) && !cost) {
                    cost = this.getCost(type, null, eq.level);
                }
            }
            if (isTips && cost) {
                return BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Dialog);
            }
            return false;
        }

        /**能否强化，类型1,2*/
        public canStrengthen(type: SuitType, pos: number, isTips = false): boolean {
            let info = this.getPosEquipInfo(type, pos);
            if (!info) {
                return false;
            }
            if (this.isStrengthenMax(type, pos)) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大强化等级`);
                }
                return false;
            }
            let cost = this.getCost(type, null, info.level);
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        /**能否进阶，类型3,4,5*/
        public canAdvance(type: SuitType, pos: number, isTips = false): boolean {
            if (this.isMaxOperLv(type, SuitOperType.JinJie, pos)) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大进阶等级`);
                }
                return false;
            }
            let operInfo = this.getPosEquipInfo2(type, pos, SuitOperType.JinJie);
            if (!operInfo) {
                return false;
            }
            let cost = this.getCost(type, SuitOperType.JinJie, operInfo.lv);
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        /**能否一键进阶，类型3,4,5*/
        public canAdvanceOneKey(type: SuitType, isTips = false): boolean {
            if (type < SuitType.HaoTian) {
                return false;
            }
            let info = this.getSuitOperInfo(type, SuitOperType.JinJie);
            //未有穿戴情况
            if (!info || !info.attr_list) {
                if (isTips) {
                    PromptBox.getIns().show(`条件不足`);
                }
                return false;
            }
            //全部已满级
            let isAllMax = true;
            for (let pos of SuitEquipPosAry1) {
                if (!this.isMaxOperLv(type, SuitOperType.JinJie, pos)) {
                    isAllMax = false;
                    break;
                }
            }
            if (isAllMax) {
                if (isTips) {
                    PromptBox.getIns().show(`已满级`);
                }
                return false;
            }
            //进阶判断，只要存在一个可以进阶
            // let cost: number[];
            for (let equip of info.attr_list) {
                if (this.canAdvance(type, equip.pos, false)) {
                    return true;
                }
                // if (!this.isMaxOperLv(type, SuitOperType.JinJie, equip.pos)) {
                //     if (!cost) {
                //         cost = this.getCost(type, SuitOperType.JinJie, equip.lv);
                //     }
                // }
            }
            // if (cost && isTips) {
            //     return BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Dialog);
            // }
            if (isTips) {
                PromptBox.getIns().show(`条件不足`);
            }
            return false;
        }

        /**进阶，锻造，精铸最大等级*/
        public isMaxOperLv(type: SuitType, operType: SuitOperType, pos: EquipPos): boolean {
            let maxLv = this.getSuitTypeCfg(type).maxLv;
            let operInfo = this.getPosEquipInfo2(type, pos, operType);
            if (!operInfo) {
                return false;
            }
            return operInfo.lv >= maxLv;
        }

        /**能否精铸，类型3,4,5*/
        public canCast(type: SuitType, pos: number, isTips = false): boolean {
            if (this.isMaxOperLv(type, SuitOperType.JingZhu, pos)) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大精铸等级`);
                }
                return false;
            }
            let operInfo = this.getPosEquipInfo2(type, pos, SuitOperType.JingZhu);
            if (!operInfo) {
                return false;
            }
            let cost = this.getCost(type, SuitOperType.JingZhu, operInfo.lv);
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        /**能否一键精铸，类型3,4,5*/
        public canCastOneKey(type: SuitType, isTips = false): boolean {
            if (type < SuitType.HaoTian) {
                return false;
            }
            let info = this.getSuitOperInfo(type, SuitOperType.JingZhu);
            if (!info || !info.attr_list) {
                if (isTips) {
                    PromptBox.getIns().show(`条件不足`);
                }
                return false;
            }
            //全部已满级
            let isAllMax = true;
            for (let pos of SuitEquipPosAry1) {
                if (!this.isMaxOperLv(type, SuitOperType.JingZhu, pos)) {
                    isAllMax = false;
                    break;
                }
            }
            if (isAllMax) {
                if (isTips) {
                    PromptBox.getIns().show(`已满级`);
                }
                return false;
            }
            //精铸判断，只要存在一个可以精铸
            for (let equip of info.attr_list) {
                if (this.canCast(type, equip.pos, false)) {
                    return true;
                }
            }
            if (isTips) {
                PromptBox.getIns().show(`条件不足`);
            }
            return false;
        }

        /**能否锻造，类型3,4,5*/
        public canForge(type: SuitType, pos: EquipPos, isTips = false): boolean {
            if (!this.checkOpenForge(type)) {
                return false;
            }
            if (this.isMaxOperLv(type, SuitOperType.DuanZao, pos)) {
                if (isTips) {
                    PromptBox.getIns().show(`已达最大锻造等级`);
                }
                return false;
            }
            let operInfo = this.getPosEquipInfo2(type, pos, SuitOperType.JinJie);//进阶的穿戴，没有穿戴不可锻造
            if (!operInfo) {
                return false;
            }
            let info = this.getPosEquipInfo2(type, pos, SuitOperType.DuanZao);
            let cost = this.getCost(type, SuitOperType.DuanZao, info && info.lv || 0);
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        /**判断能否打开锻造界面，只有进阶界面穿戴上了才可以*/
        public checkOpenForge(type: SuitType): boolean {
            let info: suit_two_equip = this.getSuitOperInfo(type, SuitOperType.JinJie);
            return info && info.attr_list && info.attr_list.length > 0;
        }

        /**
         * 装备表的穿戴条件。类型1,2消耗是自身，其他是等级表消耗
         * @param index 装备index
         * @param isTips
         * @param operType 默认SuitOperType.JinJie。只有3,4,5类型才需要传参，而且只可为1,3
         */
        public canDress(index: number, isTips = false, operType: SuitOperType = SuitOperType.JinJie): boolean {
            let cfg: EquipmentConfig = getConfigByNameId(ConfigName.Equip, index);
            if (!cfg) {
                DEBUG && console.error(`装备表没有: ${index}`);
                return false;
            }
            let suitType = this.getIndexType(index);
            if (suitType < SuitType.HaoTian) {
                if (this.getPosEquipInfo(suitType, index % 10)) {
                    return false;
                }
            } else {
                let info = this.getPosEquipInfo2(suitType, index % 10, operType);
                if (info) {
                    return false;
                }
            }

            //通过条件
            if (cfg.wear_condition) {
                let shilianProxy: IShilianProxy = getProxy(ModName.Shilian, ProxyType.Shilian);
                let chapter = cfg.wear_condition[0];//章
                let gateId = cfg.wear_condition[1];//关
                let fbdCfgs = getConfigByNameId(ConfigName.ForbiddenGate, chapter);
                if (!fbdCfgs || !fbdCfgs[gateId]) {
                    return false;
                }
                let type = Math.floor(chapter / 100);
                let info: msg.forbidden_item = shilianProxy.getFbdInfo(type);
                if (!info || info.index < chapter || (chapter == info.index && gateId > info.id)) {
                    if (isTips) {
                        let fbdCfg = fbdCfgs[gateId];
                        PromptBox.getIns().show(ForbiddenTypeName[type] + chapter % 100 + '章' + fbdCfg.gate_id + '关开启');
                    }
                    return false;
                }
            }

            // 道具条件
            if (suitType < SuitType.HaoTian) {
                if (!BagUtil.checkPropCnt(index, 1, isTips ? PropLackType.Dialog : PropLackType.None)) {
                    return false;
                }
            } else {
                if (!BagUtil.checkPropCnt(index, 1)) {
                    return false;
                }
                // if (operType == SuitOperType.DuanZao) {
                //     operType = SuitOperType.JinJie;
                // }
                // let cost = this.getCost(suitType, operType, 0);//0级消耗
                // if (!cost || !BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog :
                // PropLackType.None)) { return false; }
            }
            return true;
        }

        //检查穿戴条件
        private checkWearCondition(cfg: EquipmentConfig): boolean {
            if (!cfg) {
                return false;
            }
            if (!cfg.wear_condition) {
                return true; //没有穿戴条件返回 true
            }
            let shilianProxy: IShilianProxy = getProxy(ModName.Shilian, ProxyType.Shilian);
            let chapter = cfg.wear_condition[0];//章
            let gateId = cfg.wear_condition[1];//关
            let fbdCfgs = getConfigByNameId(ConfigName.ForbiddenGate, chapter);
            if (!fbdCfgs || !fbdCfgs[gateId]) {
                return false;
            }
            let type = Math.floor(chapter / 100);
            let info: msg.forbidden_item = shilianProxy.getFbdInfo(type);
            return !(!info || info.index < chapter || (chapter == info.index && gateId > info.id));
        }

        //高阶装备的id（套装1，2）
        public getDressAdvancedEquipId(type: SuitType, pos: EquipPos): number {
            if (type > SuitType.YanTian) {
                return null;
            }
            let info = this.getPosEquipInfo(type, pos);
            if (!info) {
                return null;//【未激活对应部位情况下，不可一键穿戴】
            }
            let props = this.getSuitEquipListByTypeAndPos(type, pos);
            let maxStage = info ? this.getIndexLv(info.equipment_id.toNumber()) : 0; //最高阶
            let maxStageIdx: number;
            for (let prop of props) {
                let propStage = this.getIndexLv(prop.index);
                let equipCfg: EquipmentConfig = prop.cfg;
                let rebirthLv = RoleUtil.getRebirthLv();
                let levelDemand = equipCfg.level_demand ? equipCfg.level_demand <= RoleVo.ins.level : true;
                let rebirthLimit = equipCfg.rebirth_limit ? equipCfg.rebirth_limit <= rebirthLv : true;
                let wearCondition = this.checkWearCondition(equipCfg);
                if (propStage > maxStage && wearCondition && levelDemand && rebirthLimit) {
                    maxStage = propStage;
                    maxStageIdx = prop.index;
                }
            }
            return maxStageIdx;
        }

        //所有部位的高阶装备的id（套装1，2）
        public getDressAdvancedEquipIdList(type: SuitType): number[] {
            let list: number[] = [];
            for (let pos of SuitEquipPosAry) {
                let id = this.getDressAdvancedEquipId(type, pos);
                if (id) {
                    list.push(id);
                }
            }
            return list;
        }

        //有更高阶装备（套装1，2）【未激活对应部位情况下，不可一键穿戴】
        public canDressAdvanced(type: SuitType, pos: EquipPos): boolean {
            if (type > SuitType.YanTian) {
                return false;
            }
            let info = this.getPosEquipInfo(type, pos);
            if (!info) {
                return false; //未激活，不可操作
            }
            let highId = this.getDressAdvancedEquipId(type, pos);
            return !!highId;
        }

        //有更高阶装备，一键穿戴（套装1，2）
        public canDressOneKey(type: SuitType): boolean {
            if (type > SuitType.YanTian) {
                return false;
            }
            for (let pos of SuitEquipPosAry) {
                if (this.canDressAdvanced(type, pos)) {
                    return true;
                }
            }
            return false;
        }

        /**================================= power =================================*/

        /**
         * 套装1，2的进阶展示战力
         * @param type
         */
        public getPowerForAdvance(type: SuitType): number {
            let info = this.getSuitTypeInfo(type);
            if (!info) {
                return 0;
            }
            let power = 0;
            if (info.suit_attr && info.suit_attr.showpower) {
                power += info.suit_attr.showpower.toNumber();
            }
            if (info.equips) {
                for (let equip of info.equips) {
                    let attr = equip.attr;
                    if (attr && attr.showpower) {
                        power += attr.showpower.toNumber();
                    }
                }
            }
            return power;
        }

        /**
         * 套装1，2的强化展示战力
         * @param type
         */
        public getPowerForStrengthen(type: SuitType): number {
            let info = this.getSuitTypeInfo(type);
            if (!info) {
                return 0;
            }
            let power = 0;
            if (info.master_attr && info.master_attr.showpower) {
                power += info.master_attr.showpower.toNumber();
            }
            if (info.equips) {
                for (let equip of info.equips) {
                    let attr = equip.lv_attr;
                    if (attr && attr.showpower) {
                        power += attr.showpower.toNumber();
                    }
                }
            }
            return power;
        }

        /**套装类型3,4,5的各种操作战力*/
        public getPower2(type: SuitType, operType: SuitOperType): number {
            let typeInfo = this.getSuitOperInfo(type, operType);
            if (!typeInfo || !typeInfo.attr_list) {
                return 0;
            }
            let power = 0;
            for (let equip of typeInfo.attr_list) {
                if (equip && equip.attr && equip.attr.showpower) {
                    power += equip.attr.showpower.toNumber();
                }
            }
            //颢天的锻造需处理神装属性加成
            if (type == SuitType.HaoTian && operType == SuitOperType.DuanZao) {
                let val = this.getShenZhuangVal();
                power = power * (1 + val / 10000);
            }
            return Math.floor(power);
        }

        /**类型3的锻造大师等级*/
        public getMasterLv(): number {
            let infos = this.getSuitOperInfo(SuitType.HaoTian, SuitOperType.DuanZao);
            if (!infos || !infos.attr_list || infos.attr_list.length < SuitEquipPosAry1.length) {
                return 0;
            }
            let minLv: number;
            for (let item of infos.attr_list) {
                if (minLv == undefined) {
                    minLv = item.lv;
                }
                minLv = Math.min(item.lv, minLv);
            }
            return minLv;
        }

        //神装属性
        public getShenZhuangVal(): number {
            let lv = this.getMasterLv();
            let paramCfg = GameConfig.getParamConfigById('suit_forge_master');
            //神装属性万分比
            return lv > 0 ? paramCfg.value[lv - 1] : 0;
        }

        //buff描述
        public getBuffDesc(buff_id: number): string {
            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buff_id);
            return cfg ? cfg.des : '';
        }

        private getFilterAttrKey(type: SuitType, pos: EquipPos): string [] {
            if (!SuitTypePosAttr[pos]) {
                return [];
            }
            return SuitTypePosAttr[pos][type] || [];
        }

        //获取不同套装不同部位展示的属性
        public getFilterAttr(type: SuitType, pos: EquipPos, attr: attributes): attributes {
            let newAttr = new attributes();
            if (!attr) {
                return newAttr;
            }
            let attrKeys = this.getFilterAttrKey(type, pos);
            let keys = Object.keys(attr);
            for (let i = 0; i < keys.length; i++) {
                if (attrKeys.indexOf(keys[i]) > -1) {
                    newAttr[keys[i]] = attr[keys[i]];
                }
            }
            return newAttr;
        }

        /**================================= hint =================================*/

        //部位红点
        public getSuitIconHint(type: SuitType, operType: SuitOperType, pos: EquipPos): boolean {
            if (type >= SuitType.HaoTian) {
                //套装3，4，5
                let index = this.getIndex2(type, pos, operType);
                if (operType == SuitOperType.JinJie) {
                    return this.canDress(index, false, SuitOperType.JinJie) || this.canAdvance(type, pos);
                } else if (operType == SuitOperType.DuanZao) {
                    return this.canForge(type, pos);
                } else {
                    return this.canDress(index, false, SuitOperType.JingZhu) || this.canCast(type, pos);
                }
            }
            //套装1，2
            if (operType == SuitOperType.JinJie) {
                let index = this.getIndexForDress(type, pos);
                return this.canDress(index, false, operType) || this.canDressAdvanced(type, pos);
            } else {
                return this.canStrengthen(type, pos);
            }
        }

        /**二级页签红点*/
        public getSuitHint(type: SuitType, operType: SuitOperType): boolean {
            let posAry = type < SuitType.HaoTian ? SuitEquipPosAry : SuitEquipPosAry1;
            for (let pos of posAry) {
                if (this.getSuitIconHint(type, operType, pos)) {
                    return true;
                }
            }
            return false;
        }

        /**类型1,2的红点*/
        public updateHint1(): void {
            let ary = [SuitType.CangTian, SuitType.YanTian];
            let operAry = [SuitOperType.JinJie, SuitOperType.DuanZao];
            for (let type of ary) {
                if (!ViewMgr.getIns().checkViewOpen(SuitTypeOpenIdx[type], false)) {
                    continue;
                }
                for (let operType of operAry) {
                    let isHint = this.getSuitHint(type, operType);
                    if (operType == SuitOperType.JinJie && !isHint) {
                        isHint = isHint || this.getTotalComposeHint();//合成红点
                    }
                    HintMgr.setHint(isHint, this._model.hintPath[type][operType]);
                }
            }
        }

        /**类型3,4,5的红点*/
        public updateHint2(): void {
            let ary = [SuitType.HaoTian, SuitType.XuanTian, SuitType.JunTian];
            let operAry = [SuitOperType.JinJie, SuitOperType.DuanZao, SuitOperType.JingZhu];
            for (let type of ary) {
                if (!ViewMgr.getIns().checkViewOpen(SuitTypeOpenIdx[type], false)) {
                    continue;
                }
                for (let operType of operAry) {
                    let isHint = this.getSuitHint(type, operType);
                    HintMgr.setHint(isHint, this._model.hintPath[type][operType]);
                }
            }
        }

        /**背包类型更新*/
        protected onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.Suit) > -1) {
                this.updateHint1();
                this.updateHint2();
            }
        }

        /**等级表消耗数组*/
        private _costIndexAry: number[] = [];

        public getCostIndexAry(): number[] {
            if (this._costIndexAry && this._costIndexAry.length) {
                return this._costIndexAry;
            }
            let cost = this.getCost(SuitType.CangTian, null, 0);
            if (cost) {
                this._costIndexAry.push(cost[0]);
            }
            cost = this.getCost(SuitType.YanTian, null, 0);
            if (cost && this._costIndexAry.indexOf(cost[0]) < 0) {
                this._costIndexAry.push(cost[0]);
            }
            let typeAry = [SuitType.HaoTian, SuitType.XuanTian, SuitType.JunTian];
            let operAry = [SuitOperType.JinJie, SuitOperType.DuanZao, SuitOperType.JingZhu];
            for (let type of typeAry) {
                for (let operType of operAry) {
                    cost = this.getCost(type, operType, 0);
                    if (cost && this._costIndexAry.indexOf(cost[0]) < 0) {
                        this._costIndexAry.push(cost[0]);
                    }
                    //有部分穿戴不需要额外消耗
                    cost = this.getCost(type, operType, 1);
                    if (cost && this._costIndexAry.indexOf(cost[0]) < 0) {
                        this._costIndexAry.push(cost[0]);
                    }
                }
            }
            return this._costIndexAry;
        }

        /**道具indexs更新*/
        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let costAry = this.getCostIndexAry();
            for (let idx of costAry) {
                if (indexs.indexOf(idx) > -1) {
                    this.updateHint1();
                    this.updateHint2();
                    break;
                }
            }
        }

        protected onOpenFuncInit(n: GameNT) {
            this.onOpenFuncUpdate(n);
        }

        protected onOpenFuncUpdate(n: GameNT) {
            let addIdxs = n.body as number[];
            let ary = [OpenIdx.SuitType1, OpenIdx.SuitType2, OpenIdx.SuitType3, OpenIdx.SuitType4, OpenIdx.SuitType5,
                OpenIdx.SuitForge3, OpenIdx.SuitForge4, OpenIdx.SuitForge5, OpenIdx.SuitCast3, OpenIdx.SuitCast4, OpenIdx.SuitCast5];
            for (let idx of addIdxs) {
                if (ary.indexOf(idx) > -1) {
                    this.updateHint1();
                    this.updateHint2();
                    break;
                }
            }
        }

        protected onForbiddenInfoUpdate(): void {
            this.updateHint2();
        }

    }
}