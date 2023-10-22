namespace game.mod.yishou {

    import attributes = msg.attributes;
    import GameNT = base.GameNT;
    import s2c_yishou_base_info = msg.s2c_yishou_base_info;
    import c2s_yishou_equip_operate = msg.c2s_yishou_equip_operate;
    import s2c_yishou_equip_update = msg.s2c_yishou_equip_update;
    import c2s_yishou_equip_up_level = msg.c2s_yishou_equip_up_level;
    import c2s_yishou_equip_synthese = msg.c2s_yishou_equip_synthese;
    import c2s_yishou_equip_resolve = msg.c2s_yishou_equip_resolve;
    import c2s_yishou_shouhun_operate = msg.c2s_yishou_shouhun_operate;
    import c2s_yishou_skill_active = msg.c2s_yishou_skill_active;
    import c2s_yishou_shouling_up_level = msg.c2s_yishou_shouling_up_level;
    import s2c_yishou_shouling_up_level = msg.s2c_yishou_shouling_up_level;
    import YishouConfig = game.config.YishouConfig;
    import yishou_equip_data = msg.yishou_equip_data;
    import prop_attributes = msg.prop_attributes;
    import yishou_base_data = msg.yishou_base_data;
    import YishouShouhunConfig = game.config.YishouShouhunConfig;
    import s2c_yishou_base_update = msg.s2c_yishou_base_update;
    import YishouSynthesisTypeConfig = game.config.YishouSynthesisTypeConfig;
    import c2s_yishou_shouling_active = msg.c2s_yishou_shouling_active;
    import s2c_yishou_shouling_active = msg.s2c_yishou_shouling_active;
    import YishouShoulingConfig = game.config.YishouShoulingConfig;
    import YishouShoulingEquipConfig = game.config.YishouShoulingEquipConfig;
    import yishou_shouling_group_data = msg.yishou_shouling_group_data;
    import yishou_shouling_data = msg.yishou_shouling_data;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import s2c_yishou_equip_synthese = msg.s2c_yishou_equip_synthese;
    import c2s_yishou_shouying_up_star = msg.c2s_yishou_shouying_up_star;
    import s2c_yishou_shouying_up_star = msg.s2c_yishou_shouying_up_star;
    import c2s_yishou_shouying_jiban = msg.c2s_yishou_shouying_jiban;
    import s2c_yishou_shouying_jiban = msg.s2c_yishou_shouying_jiban;
    import YishouShouyingConfig = game.config.YishouShouyingConfig;
    import yishou_shouying_data = msg.yishou_shouying_data;
    import LanDef = game.localization.LanDef;
    import yishou_jiban_data = msg.yishou_jiban_data;
    import YishouShouyingSuitConfig = game.config.YishouShouyingSuitConfig;
    import EquipmentConfig = game.config.EquipmentConfig;
    import SpecialAttrConfig = game.config.SpecialAttrConfig;

    /**
     * @description 异兽系统（兽骨，兽魂，兽灵）
     */
    export class YishouProxy extends ProxyBase implements IYishouProxy {
        private _model: YishouModel;
        /**选择星级*/
        public selStar = false;
        /** [品质,星级,部位] */
        public selComposeAry: number[] = [];
        private _actJibanMap: { [index: number]: boolean } = {};

        onStartReconnect() {
            super.onStartReconnect();
            this._actJibanMap = {};
        }

        initialize(): void {
            super.initialize();
            this._model = new YishouModel();
            this.onProto(s2c_yishou_base_info, this.s2c_yishou_base_info, this);
            this.onProto(s2c_yishou_base_update, this.s2c_yishou_base_update, this);
            this.onProto(s2c_yishou_equip_update, this.s2c_yishou_equip_update, this);
            this.onProto(s2c_yishou_shouling_up_level, this.s2c_yishou_shouling_up_level, this);
            this.onProto(s2c_yishou_shouling_active, this.s2c_yishou_shouling_active, this);
            this.onProto(s2c_yishou_equip_synthese, this.s2c_yishou_equip_synthese, this);
            this.onProto(s2c_yishou_shouying_up_star, this.s2c_yishou_shouying_up_star, this);
            this.onProto(s2c_yishou_shouying_jiban, this.s2c_yishou_shouying_jiban, this);
        }

        ///登录下发
        private s2c_yishou_base_info(n: GameNT): void {
            let msg = n.body as s2c_yishou_base_info;
            this._model.info_list = {};
            if (msg.info_list != null) {
                for (let item of msg.info_list) {
                    this._model.info_list[item.type] = item;
                }
            }
            this._model.shouling_list = {};
            if (msg.shouling_list != null) {
                for (let item of msg.shouling_list) {
                    //group_id 兽灵id
                    this._model.shouling_list[item.group_id] = item;
                }
            }
            this._model.equip_list = {};
            if (msg.equip_list != null) {
                for (let item of msg.equip_list) {
                    this.updateEquipData(item);
                }
            }
            if (msg.shouying_list != null) {
                for (let item of msg.shouying_list) {
                    this._model.shouying_list[item.index] = item;
                }
            }
            if (msg.jiban_list != null) {
                for (let item of msg.jiban_list) {
                    this._model.jiban_list[item.index] = item;
                }
            }
            this.updateHint();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_BASE_INFO);
        }

        ///单项更新（装备进阶，兽魂升阶，技能激活）
        private s2c_yishou_base_update(n: GameNT): void {
            let msg = n.body as s2c_yishou_base_update;
            if (msg.data != null) {
                this._model.info_list[msg.data.type] = msg.data;
            }
            this.updateHint1();
            this.updateHint2();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_BASE_INFO);
        }

        /**
         * 装备操作
         * @param type
         * @param oper 1：穿  2：一键穿戴
         * @param propId 装备的唯一id（一键穿戴可缺省）
         */
        public c2s_yishou_equip_operate(type: YishouType, oper: number, propId: Long): void {
            let msg = new c2s_yishou_equip_operate();
            msg.type = type;
            msg.oper = oper;
            if (propId) {
                msg.prop_id = propId;
            }
            this.sendProto(msg);
        }

        ///装备更新
        private s2c_yishou_equip_update(n: GameNT): void {
            let msg = n.body as s2c_yishou_equip_update;
            if (msg.equip_data != null) {
                this.updateEquipData(msg.equip_data);
            }
            this.updateHint1();
            this.updateHint2();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_EQUIP_INFO);
        }

        private updateEquipData(data: yishou_equip_data): void {
            if (!data) {
                return;
            }
            let equipData = this._model.equip_list[data.type];
            if (!equipData) {
                equipData = new YishouEquipData();
                equipData.equips = {};
                this._model.equip_list[data.type] = equipData;
            }
            if (data.equips) {
                for (let equip of data.equips) {
                    let pos = equip.index.toNumber() % 10;
                    equipData.equips[pos] = equip;
                }
            }
        }

        ///装备进阶
        public c2s_yishou_equip_up_level(type: YishouType): void {
            let msg = new c2s_yishou_equip_up_level();
            msg.type = type;
            this.sendProto(msg);
        }

        /**
         * 合成
         * @param type
         * @param index 合成后的道具索引
         * @param count 合成数量
         */
        public c2s_yishou_equip_synthese(type: number, index: number, count: number): void {
            let msg = new c2s_yishou_equip_synthese();
            msg.type = type;
            msg.index = Long.fromNumber(index);
            msg.count = count;
            this.sendProto(msg);
        }

        //合成返回
        private s2c_yishou_equip_synthese(n: GameNT): void {
            let msg = n.body as s2c_yishou_equip_synthese;
            let type = msg.type;
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_SYNTHESE_SUCCESS, type);
        }

        //分解
        public c2s_yishou_equip_resolve(type: YishouType, list: Long[]): void {
            let msg = new c2s_yishou_equip_resolve();
            msg.type = type;
            msg.list = list;
            this.sendProto(msg);
        }

        /// 兽魂升阶操作，oper 1：进阶  2：一键进阶
        public c2s_yishou_shouhun_operate(type: YishouType, oper: number): void {
            let msg = new c2s_yishou_shouhun_operate();
            msg.type = type;
            msg.oper = oper;
            this.sendProto(msg);
        }

        /// 技能激活
        public c2s_yishou_skill_active(type: YishouType, skill_id: number): void {
            let msg = new c2s_yishou_skill_active();
            msg.type = type;
            msg.skill_id = skill_id;
            this.sendProto(msg);
        }

        /// 兽灵：激活或者升级
        public c2s_yishou_shouling_up_level(index: number, idx: number): void {
            let msg = new c2s_yishou_shouling_up_level();
            msg.group_id = index;
            msg.index = Long.fromNumber(idx);
            this.sendProto(msg);
        }

        /// 兽灵：激活或者升级返回
        private s2c_yishou_shouling_up_level(n: GameNT): void {
            let msg = n.body as s2c_yishou_shouling_up_level;
            if (msg.data != null) {
                this._model.shouling_list[msg.data.group_id] = msg.data;
            }
            this.updateHint3();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_SHOULING_INFO);
        }

        /// 兽灵: 激活兽灵组
        public c2s_yishou_shouling_active(index: number): void {
            let msg = new c2s_yishou_shouling_active();
            msg.group_id = index;
            this.sendProto(msg);
        }

        /// 兽灵: 激活兽灵组返回
        private s2c_yishou_shouling_active(n: GameNT): void {
            let msg = n.body as s2c_yishou_shouling_active;
            if (msg.data != null) {
                this._model.shouling_list[msg.data.group_id] = msg.data;
            }
            this.updateHint3();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_SHOULING_INFO);
        }

        /// 兽印: 激活或者升星
        public c2s_yishou_shouying_up_star(index: number): void {
            let msg = new c2s_yishou_shouying_up_star();
            msg.index = index;
            this.sendProto(msg);
        }

        /// 兽印: 激活或者升星返回
        private s2c_yishou_shouying_up_star(n: GameNT): void {
            let msg = n.body as s2c_yishou_shouying_up_star;
            if (msg.data != null) {
                this._model.shouying_list[msg.data.index] = msg.data;
            }
            this.updateHint4();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_SHOUYIN_INFO);
        }

        //激活兽印套装或激活兽印单位, 外显id(激活组不要传数值)
        public c2s_yishou_shouying_jiban(index: number, id?: number): void {
            let msg = new c2s_yishou_shouying_jiban();
            msg.index = index;
            if (id) {
                msg.id = id;
                this._actJibanMap[id] = true;
            }
            this.sendProto(msg);
        }

        //激活兽印套装或激活兽印单位返回
        private s2c_yishou_shouying_jiban(n: GameNT): void {
            let msg = n.body as s2c_yishou_shouying_jiban;
            if (msg.data != null) {
                this._model.jiban_list[msg.data.index] = msg.data;

                if (msg.data.list && msg.data.list.length) {
                    for (let id of msg.data.list) {
                        if (this._actJibanMap[id]) {
                            ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                            this._actJibanMap[id] = null;
                            delete this._actJibanMap[id];
                        }
                    }
                }
            }
            this.updateHint4();
            this.sendNt(YishouEvent.ON_UPDATE_YISHOU_SHOUYIN_JIBAN_INFO);
        }

        /**================================= 协议end =================================*/

        //返回合成装备id 29002+1位品质+2位类型+1位星级+1位部位
        public getEquipIndex(type: YishouType, quality: number, star: number, pos: YishouShouguPos): number {
            return ConfigHead.Equip * 10000000 + EquipPropType.Yishou * 100000 + quality * 10000 + type * 100 + star * 10 + pos;
        }

        /**
         * 从装备id获取 [品质,星级,部位,类型]
         */
        public getAryByParserIndex(index: number): number[] {
            let quality = Math.floor(index / 10000) % 10;
            let star = Math.floor(index / 10) % 10;
            let pos = index % 10;
            let type = Math.floor(index / 100) % 10;
            return [quality, star, pos, type];
        }

        //获取背包数据
        public getBagDatas(type: YishouType): PropData[] {
            let propList = BagUtil.getBagsByType(BagType.Yishou) || [];
            let list: PropData[] = [];
            for (let prop of propList) {
                let subType = Math.floor(prop.index / 100) % 10;
                if (subType == type) {
                    list.push(prop);
                }
            }
            return list;
        }

        //获取背包数据
        public getBagDatasByIndex(index: number, isCompose = true): PropData[] {
            let ary = this.getAryByParserIndex(index);
            let type = ary[3];
            let pos = ary[2];
            let datas = this.getBagDatasByCond(type, ary[0], ary[1], pos);
            //判断对应类型对应部位，是否穿戴，穿戴的话，其可以作为材料合成
            if (isCompose) {
                let info = this.getEquipInfo(type, pos);
                if (info && info.index.toNumber() == index) {
                    let propData = PropData.create(index);
                    datas.unshift(propData);
                }
            }
            return datas;
        }

        //获取背包数据
        public getBagDatasByCond(type: YishouType, quality: number, star: number, pos: YishouShouguPos): PropData[] {
            let propList = this.getBagDatas(type);
            let list: PropData[] = [];
            for (let prop of propList) {
                let ary = this.getAryByParserIndex(prop.index);
                if (quality == ary[0] && star == ary[1] && pos == ary[2]) {
                    list.push(prop);
                }
            }
            return list;
        }

        //获取背包数据
        public getBagDatasByTypeAndPos(type: YishouType, pos: YishouShouguPos): PropData[] {
            let propList = this.getBagDatas(type);
            let list: PropData[] = [];
            for (let prop of propList) {
                let propPos = prop.index % 10;
                if (pos == propPos) {
                    list.push(prop);
                }
            }
            return list;
        }

        public getYishoucfg(type: YishouType): YishouConfig {
            return getConfigByNameId(ConfigName.Yishou, type);
        }

        //激活
        public checkTypeActed(type: YishouType, isTips = false): boolean {
            let cfg = this.getYishoucfg(type);
            let idx = cfg.open;
            let roleIdx = RoleVo.ins.reincarnate;
            if (roleIdx >= idx) {
                return true;
            }
            if (isTips) {
                let openDesc = RoleUtil.getRebirthStr(idx);
                PromptBox.getIns().show(openDesc + getLanById(LanDef.boss_cue5));
            }
            return false;
        }

        //可进阶
        public canJinjie(type: YishouType): boolean {
            if (this.isMaxStage(type)) {
                return false;
            }
            let curStage = this.getCurStage(type);//当前阶数
            let nextStage = curStage + 1;
            let condAry = this.getStageCondition(type, nextStage);
            let satisfyCnt = this.getStageSatisfyCnt(type);
            return satisfyCnt >= condAry[3];
        }

        //可一键替换
        public canOnekey(type: YishouType): boolean {
            for (let pos of YishouShouguPosAry) {
                if (this.canDressByTypeAndPos(type, pos)) {
                    return true;
                }
            }
            return false;
        }

        //高战力可穿戴
        public canDressByTypeAndPos(type: YishouType, pos: YishouShouguPos, isReplace = false): boolean {
            if (!this.checkTypeActed(type)) {
                return false;
            }
            let bagDatas = this.getBagDatasByTypeAndPos(type, pos);
            let posEquip = this.getEquipInfo(type, pos);
            let reincarnate = RoleVo.ins.reincarnate;
            if (!posEquip) {
                if (!bagDatas || !bagDatas.length) {
                    return false;
                }
                for (let prop of bagDatas) {
                    let rein = (prop.cfg as EquipmentConfig).rebirth_limit;
                    if (reincarnate >= rein) {
                        return true;
                    }
                }
                return false;
            }
            let curAttr = posEquip && posEquip.regular_attrs ? posEquip.regular_attrs : null;
            let curPower = curAttr && curAttr.showpower ? curAttr.showpower.toNumber() : 0;
            for (let prop of bagDatas) {
                let propAttr = prop.regular_attrs;
                let propPower = propAttr && propAttr.showpower ? propAttr.showpower.toNumber() : 0;
                let rein = (prop.cfg as EquipmentConfig).rebirth_limit;
                if (isReplace) {
                    //单件穿戴替换不需要加战力限制
                    if (reincarnate >= rein) {
                        return true;
                    }
                } else {
                    if (propPower > curPower && reincarnate >= rein) {
                        return true;
                    }
                }
            }
            return false;
        }

        //战力
        public getPower(type: YishouType, mdrType = YishouMdrType.Shougu): number {
            if (mdrType == YishouMdrType.Shougu) {
                let attr = this.getAttr(type, mdrType);
                return attr && attr.showpower ? attr.showpower.toNumber() : 0;
            }
            let power = 0;
            let attr = this.getAttr(type, mdrType);
            if (attr && attr.showpower) {
                power += attr.showpower.toNumber();
            }
            let cfg = this.getYishoucfg(type);
            if (cfg && cfg.skill_list) {
                for (let item of cfg.skill_list) {
                    let skillId = item[1];
                    if (this.checkSkillActed(type, skillId)) {
                        let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                        if (skillCfg && skillCfg.powershow) {
                            power += skillCfg.powershow;
                        }
                    }
                }
            }
            return power;
        }

        //属性
        public getAttr(type: YishouType, mdrType = YishouMdrType.Shougu): attributes {
            let attr = new attributes();
            // 兽骨
            if (mdrType == YishouMdrType.Shougu) {
                let info = this.getEquipInfos(type);
                if (!info || !info.equips) {
                    return attr;
                }
                let attrs: attributes[] = [];
                for (let pos in info.equips) {
                    let equip = info.equips[pos];
                    if (!equip || !equip.regular_attrs) {
                        continue;
                    }
                    attrs.push(equip.regular_attrs);
                }
                return TextUtil.calcAttrList(attrs);
            }
            // 兽魂
            let shouhunInfo = this.getInfo(type);
            if (shouhunInfo && shouhunInfo.attrs) {
                return shouhunInfo.attrs;
            }
            return attr;
        }

        //装备信息
        public getEquipInfos(type: YishouType): YishouEquipData {
            return this._model.equip_list[type];
        }

        //装备部位信息
        public getEquipInfo(type: YishouType, pos: YishouShouguPos): prop_attributes {
            let infos = this.getEquipInfos(type);
            if (!infos || !infos.equips) {
                return null;
            }
            return infos.equips[pos];
        }

        private _maxStageMap: { [type: number]: number } = {};

        //最大阶数
        public getMaxStage(type: number): number {
            if (this._maxStageMap[type]) {
                return this._maxStageMap[type];
            }
            let cfgList: YishouConfig[] = getConfigListByName(ConfigName.Yishou);
            for (let cfg of cfgList) {
                let skillStage = cfg.skill_stage || [];
                let lastStage = skillStage[skillStage.length - 1];
                this._maxStageMap[cfg.type] = lastStage[0] || 0;
            }
            return this._maxStageMap[type] || 0;
        }

        //兽骨技能升阶满足条件的装备个数
        public getStageSatisfyCnt(type: YishouType): number {
            let equipList = this.getEquipInfos(type);
            if (!equipList) {
                return 0;
            }
            let curStage = this.getCurStage(type);
            let nextStage = curStage + 1;
            let cond = this.getStageCondition(type, nextStage);
            let quality = cond[1];
            let star = cond[2];
            let cnt = 0;
            for (let pos in equipList.equips) {
                let item = equipList.equips[pos];
                if (!item) {
                    continue;
                }
                let itemAry = this.getAryByParserIndex(item.index.toNumber());
                if (itemAry[0] >= quality && itemAry[1] >= star) {
                    cnt++;
                }
            }
            return cnt;
        }

        //阶数的条件 [阶，品质，星级，数量]
        public getStageCondition(type: number, stage: number): number[] {
            let cfg = this.getYishoucfg(type);
            let stages = cfg.skill_stage;
            for (let item of stages) {
                if (item && item[0] == stage) {
                    return item;
                }
            }
            DEBUG && console.error(`yishou getStageCondition error type:${type}, stage:${stage}`);
            return null;
        }

        //兽骨技能当前阶数
        public getCurStage(type: YishouType): number {
            let info = this._model.info_list[type];
            return info && info.stage || 0;
        }

        //兽骨技能满阶
        public isMaxStage(type: YishouType): boolean {
            let maxStage = this.getMaxStage(type);
            let curStage = this.getCurStage(type);
            return curStage >= maxStage;
        }

        //获取部位名称，如圣龙之牙
        public getPosName(type: YishouType, pos: YishouShouguPos): string {
            let typeCfg = this.getYishoucfg(type);
            let posName = `yishou_name${pos}`; //LanDef.yishou_name0;
            return typeCfg.type_name + '之' + getLanById(posName);
        }

        //获取阶数条件名
        public getStagePosNameList(type: YishouType): string[] {
            let curStage = this.getCurStage(type);
            let nextStage = curStage + 1;
            if (this.isMaxStage(type)) {
                nextStage = curStage;
            }
            let cond = this.getStageCondition(type, nextStage);
            let list: string[] = [];
            for (let pos of YishouShouguPosAry) {
                let equipInfo = this.getEquipInfo(type, pos);
                let str = this.getPosName(type, pos) + ': ';
                if (!equipInfo) {
                    str += this.getCondStr(cond);
                    str = TextUtil.addColor(str, BlackColor.GRAY);
                } else {
                    let index = equipInfo.index.toNumber();
                    let quality = Math.floor(index / 10000) % 10;//当前品质
                    let star = Math.floor(index / 10) % 10;//当前星级
                    str += ColorUtil.getColorChineseStrByQua2(quality) + getLanById(LanDef.se) + star + getLanById(LanDef.soul2);
                    let color = BlackColor.GRAY;
                    if (quality >= cond[1] && star >= cond[2]) {
                        color = BlackColor.GREEN;
                    }
                    str = TextUtil.addColor(str, color);
                }
                list.push(str);
            }
            return list;
        }

        //品质星级文本
        public getCondStr(cond: number[]): string {
            if (!cond || !cond.length) {
                return '';
            }
            let qualityName = ColorUtil.getColorChineseStrByQua2(cond[1]);
            return qualityName + getLanById(LanDef.se) + cond[2] + getLanById(LanDef.soul2);
        }

        //兽魂被动技能是否激活
        public checkSkillActed(type: YishouType, skillId: number): boolean {
            let info = this.getInfo(type);
            let actedList = info && info.skill_list ? info.skill_list : [];
            return actedList.indexOf(skillId) > -1;
        }

        private _skillLevelMap: { [type: number]: { [skillId: number]: number } } = {};

        //兽魂技能能否激活
        public canActSkill(type: YishouType, skillId: number, isTips = false): boolean {
            //已激活
            if (this.checkSkillActed(type, skillId)) {
                return false;
            }
            let cfg = this.getYishoucfg(type);
            if (!cfg || !cfg.skill_list) {
                return false;
            }
            let level = this.getLevel(type);
            let skillMap = this._skillLevelMap[type];
            if (!skillMap) {
                this._skillLevelMap[type] = skillMap = {};
            }
            let actLevel = skillMap[skillId];
            if (actLevel == null) {
                for (let item of cfg.skill_list) {
                    skillMap[item[1]] = item[0];
                }
            }
            actLevel = skillMap[skillId] || 0;
            if (level >= actLevel) {
                return true;
            }
            if (isTips) {
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.lingqi_tips10), ['']));
            }
            return false;
        }

        //兽魂进阶
        public canShouHunUpLv(type: YishouType, isTips = false): boolean {
            if (this.isLevelMax(type)) {
                return false;
            }
            let cfg = this.getShouhunCfg(type);
            if (!cfg || !cfg.star_consume) {
                return false;
            }
            let cost = cfg.star_consume[0];
            return BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //兽魂一键进阶
        public canShowhunOnekey(type: YishouType, isTips = false): boolean {
            return this.canShouHunUpLv(type, isTips);
        }

        public getInfo(type: YishouType): yishou_base_data {
            return this._model.info_list[type];
        }

        //兽魂等级
        public getLevel(type: YishouType): number {
            let info = this.getInfo(type);
            return info && info.level || 0;
        }

        private _maxLevelMap: { [type: number]: number } = {};

        //兽魂最大等级
        public getMaxLevel(type: YishouType): number {
            if (this._maxLevelMap[type]) {
                return this._maxLevelMap[type];
            }
            let cfgObj = getConfigByNameId(ConfigName.YishouShouhun, type);
            if (!cfgObj) {
                return 0;
            }
            this._maxLevelMap[type] = Object.keys(cfgObj).length - 1;//配表id从0开始
            return this._maxLevelMap[type];
        }

        //兽魂满级
        public isLevelMax(type: YishouType): boolean {
            let curLv = this.getLevel(type);
            let maxLv = this.getMaxLevel(type);
            return curLv >= maxLv;
        }

        //兽魂等级配置
        public getShouhunCfg(type: YishouType, level?: number): YishouShouhunConfig {
            if (!level) {
                level = this.getLevel(type);
            }
            let cfgObj = getConfigByNameId(ConfigName.YishouShouhun, type);
            if (!cfgObj || !cfgObj[level]) {
                return null;
            }
            return cfgObj[level];
        }

        //获取类型名称
        public getTypeName(type: YishouType): string {
            let cfg = this.getYishoucfg(type);
            return cfg.type_name;
        }

        private _composeCfgMap: { [type: number]: YishouSynthesisTypeConfig[] } = {};

        public getComposeCfgs(type: YishouType): YishouSynthesisTypeConfig[] {
            if (this._composeCfgMap[type]) {
                return this._composeCfgMap[type];
            }
            this._composeCfgMap[type] = [];
            let cfgObj = getConfigByNameId(ConfigName.YishouSynthesisType, type);
            for (let key in cfgObj) {
                let cfg: YishouSynthesisTypeConfig = cfgObj[key];
                this._composeCfgMap[type].push(cfg);
            }
            return this._composeCfgMap[type];
        }

        private _shoulingCfgMap: { [type: number]: YishouShoulingConfig[] } = {};

        //兽灵配置
        public getShoulingCfgs(type: number): YishouShoulingConfig[] {
            if (this._shoulingCfgMap[type]) {
                return this._shoulingCfgMap[type];
            }
            let cfgList: YishouShoulingConfig[] = getConfigListByName(ConfigName.YishouShouling);
            for (let cfg of cfgList) {
                if (!this._shoulingCfgMap[cfg.type]) {
                    this._shoulingCfgMap[cfg.type] = [];
                }
                this._shoulingCfgMap[cfg.type].push(cfg);
            }
            return this._shoulingCfgMap[type];
        }

        public getShoulingCfg(index: number): YishouShoulingConfig {
            return getConfigByNameId(ConfigName.YishouShouling, index);
        }

        public getShoulingEquipCfg(index: number, star: number): YishouShoulingEquipConfig {
            let cfgObj = getConfigByNameId(ConfigName.YishouShoulingEquip, index);
            if (cfgObj && cfgObj[star]) {
                return cfgObj[star];
            }
            return null;
        }

        //兽灵信息
        public getShoulingInfo(index: number): yishou_shouling_group_data {
            return this._model.shouling_list[index];
        }

        //兽灵激活否
        public isShoulingActed(index: number): boolean {
            let info = this._model.shouling_list[index];
            return info && info.is_active;
        }

        //能否激活兽灵
        public canShoulingAct(index: number, isTips = false): boolean {
            if (this.isShoulingActed(index)) {
                return false;
            }
            let info = this.getShoulingInfo(index);
            let len = info && info.list ? info.list.length : 0;
            let cfg = this.getShoulingEquipCfg(index, 1);
            let size = cfg && cfg.cost ? cfg.cost.length : 0;
            if (len >= size) {
                return true;
            }
            if (isTips) {
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.lingqi_tips10), ['']));
            }
            return false;
        }

        private _shoulingEquipIdxMap: { [index: number]: { [skillId: number]: number } } = {};

        //兽灵装备索引
        public getShoulingEquipIdx(index: number, equipId: number): number {
            let map = this._shoulingEquipIdxMap[index];
            if (map && map[equipId]) {
                return map[equipId];
            }
            this._shoulingEquipIdxMap[index] = map = {};
            let cfg = this.getShoulingEquipCfg(index, 1);
            for (let i = 0; i < cfg.cost.length; i++) {
                let item = cfg.cost[i];
                map[item[0]] = i;
            }
            return map[equipId];
        }

        //兽灵装备红点
        public getShoulingEquipHint(index: number, equipId: number): boolean {
            return this.canShoulingEquipActOrUp(index, equipId);
        }

        //兽灵红点
        public getShoulingHint(index: number): boolean {
            if (this.canShoulingAct(index)) {
                return true;
            }
            let cfg = this.getShoulingEquipCfg(index, 1);
            if (!cfg || !cfg.cost) {
                return false;
            }
            for (let item of cfg.cost) {
                if (this.getShoulingEquipHint(index, item[0])) {
                    return true;
                }
            }
            return false;
        }

        //兽灵装备信息
        public getShoulingEquipInfo(index: number, equipId: number): yishou_shouling_data {
            let info = this.getShoulingInfo(index);
            if (!info || !info.list) {
                return null;
            }
            for (let item of info.list) {
                if (item && item.index.toNumber() == equipId) {
                    return item;
                }
            }
            return null;
        }

        //兽灵装备激活升级
        public canShoulingEquipActOrUp(index: number, equipId: number, isTips = false): boolean {
            let equipInfo = this.getShoulingEquipInfo(index, equipId);
            let star = equipInfo ? equipInfo.star : 0;
            let cfg = this.getShoulingEquipCfg(index, star + 1);
            if (!cfg) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.maxlv));
                }
                return false;
            }
            let idx = this.getShoulingEquipIdx(index, equipId);
            let cost: number[] = cfg.cost[idx];
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //兽灵属性
        public getShoulingAttr(index: number): attributes {
            let info = this.getShoulingInfo(index);
            if (info && info.list) {
                let attrList: attributes[] = [];
                for (let item of info.list) {
                    let star = item.star;
                    let cfg = this.getShoulingEquipCfg(index, star);
                    let attr = RoleUtil.getAttr(cfg.attr);
                    if (attr) {
                        attrList.push(attr);
                    }
                }
                return TextUtil.calcAttrList(attrList);
            } else {
                let cfg = this.getShoulingEquipCfg(index, 1);
                let attr = RoleUtil.getAttr(cfg.attr);
                if (attr) {
                    return TextUtil.calcAttr(attr, cfg.cost.length);
                }
            }
            return new attributes();
        }

        //兽灵战力
        public getShoulingPower(index: number): number {
            let power = 0;
            let attr = this.getShoulingAttr(index);
            if (attr && attr.showpower) {
                power += attr.showpower.toNumber();
            }
            let isActed = this.isShoulingActed(index);
            if (isActed) {
                let cfg = this.getShoulingCfg(index);
                if (cfg && cfg.special_attr_id) {
                    let speCfg: SpecialAttrConfig = getConfigByNameId(ConfigName.SpecialAttr, cfg.special_attr_id);
                    if (speCfg && speCfg.showpower) {
                        power += speCfg.showpower;
                    }
                }
            }
            return power;
        }


        /**============================ hint ============================*/

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yishou)) {
                return;
            }
            this.updateHint1();
            this.updateHint2();
            this.updateHint3();
            this.updateHint4();
        }

        public getHintByType(type: YishouType, mdrType: YishouMdrType): boolean {
            if (!this.checkTypeActed(type)) {
                return false;
            }
            //兽魂
            if (mdrType == YishouMdrType.Shouhun) {
                if (this.canShouHunUpLv(type)) {
                    return true;
                }
                let typeCfg = this.getYishoucfg(type);
                let skillList = typeCfg.skill_list || [];
                for (let i = 0; i < skillList.length; i++) {
                    let skillId = skillList[i][1];
                    if (this.canActSkill(type, skillId)) {
                        return true;
                    }
                }
                return false;
            }
            //兽骨（穿戴，进阶，合成）
            return this.canOnekey(type) || this.canJinjie(type) || this.getComposeTypeHint(type);
        }

        //兽骨红点
        private updateHint1(): void {
            this.updateTypeHint(YishouMdrType.Shougu);
        }

        //兽魂红点
        private updateHint2(): void {
            this.updateTypeHint(YishouMdrType.Shouhun);
        }

        private updateTypeHint(mdrType: YishouMdrType): void {
            let hint = false;
            for (let type of YishouTypeAry) {
                if (this.getHintByType(type, mdrType)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath[mdrType]);
        }

        //合成消耗材料
        public getComposeCost(equipId: number): number[] {
            let equipCfg = GameConfig.getEquipmentCfg(equipId);
            if (!equipCfg || !equipCfg.compose) {
                return null;
            }
            return equipCfg.compose[0];
        }

        //部位红点
        public getComposePosHint(type: YishouType, quality: number, star: number, pos: YishouShouguPos): boolean {
            let equipId = this.getEquipIndex(type, quality, star, pos);//合成的装备id
            let cost = this.getComposeCost(equipId);
            if (!cost) {
                return false;
            }
            let bagDatas = this.getBagDatasByIndex(cost[0]);
            return bagDatas && bagDatas.length >= 3;
        }

        //星级红点
        public getComposeStarHint(type: YishouType, quality: number, star: number): boolean {
            let cfgObj = getConfigByNameId(ConfigName.YishouSynthesisType, type);
            if (!cfgObj || !cfgObj[quality]) {
                return false;
            }
            let cfg: YishouSynthesisTypeConfig = cfgObj[quality];
            if (!cfg || !cfg.star || cfg.star.indexOf(star) < 0) {
                return false;
            }
            for (let pos of YishouShouguPosAry) {
                if (this.getComposePosHint(type, quality, star, pos)) {
                    return true;
                }
            }
            return false;
        }

        //返回红点星级
        public getComposeQualityStar(type: YishouType, quality: number): number {
            let cfgObj = getConfigByNameId(ConfigName.YishouSynthesisType, type);
            if (!cfgObj || !cfgObj[quality]) {
                return 0;
            }
            let cfg: YishouSynthesisTypeConfig = cfgObj[quality];
            for (let star of cfg.star) {
                if (this.getComposeStarHint(type, quality, star)) {
                    return star;
                }
            }
            return cfg.star[0];
        }

        //品质红点
        public getComposeQualityHint(type: YishouType, quality: number): boolean {
            let cfgObj = getConfigByNameId(ConfigName.YishouSynthesisType, type);
            if (!cfgObj || !cfgObj[quality]) {
                return false;
            }
            let cfg: YishouSynthesisTypeConfig = cfgObj[quality];
            for (let star of cfg.star) {
                if (this.getComposeStarHint(type, quality, star)) {
                    return true;
                }
            }
            return false;
        }

        //底部类型红点
        public getComposeTypeHint(type: YishouType): boolean {
            let cfgs = this.getComposeCfgs(type);
            if (!cfgs || !cfgs.length) {
                return false;
            }
            for (let cfg of cfgs) {
                if (this.getComposeQualityHint(type, cfg.quality)) {
                    return true;
                }
            }
            return false;
        }

        //兽灵红点
        private updateHint3(): void {
            let cfgs = this.getShoulingCfgs(1);
            let hint = false;
            for (let cfg of cfgs) {
                if (this.getShoulingHint(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath2[1]);
        }

        private _shouhunCostAry: number[];

        //兽魂消耗
        public getShouhunCost(): number[] {
            if (this._shouhunCostAry) {
                return this._shouhunCostAry;
            }
            this._shouhunCostAry = [];
            for (let type of YishouTypeAry) {
                let cfg = this.getShouhunCfg(type, 0);
                if (!cfg || !cfg.star_consume) {
                    continue;
                }
                let cost = cfg.star_consume[0];
                if (cost && this._shouhunCostAry.indexOf(cost[0]) < 0) {
                    this._shouhunCostAry.push(cost[0]);
                }
            }
            return this._shouhunCostAry;
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yishou)) {
                return;
            }
            let indexs = n.body as number[];
            let costAry = this.getShouhunCost();
            for (let index of indexs) {
                if (costAry.indexOf(index) > -1) {
                    this.updateHint2();
                    break;
                }
            }
        }

        protected onBagUpdateByBagType(n: GameNT) {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Yishou)) {
                return;
            }
            let bagTypes = n.body as number[];
            if (bagTypes.indexOf(BagType.Material) > -1) {
                this.updateHint3();
                this.updateHint4();
            }
            if (bagTypes.indexOf(BagType.Yishou) > -1) {
                this.updateHint1();
            }
        }

        /**================================ 兽印 ================================*/

        private _shouyinCfgMap: { [type: number]: YishouShouyingConfig[] } = {};

        //兽印配置
        public getShouyinCfgList(type: YishouShouyinType): YishouShouyingConfig[] {
            if (this._shouyinCfgMap[type]) {
                return this._shouyinCfgMap[type];
            }
            this._shouyinCfgMap = {};
            let cfgList: YishouShouyingConfig[] = getConfigListByName(ConfigName.YishouShouyin);
            for (let cfg of cfgList) {
                let type = cfg.type;
                if (!this._shouyinCfgMap[type]) {
                    this._shouyinCfgMap[type] = [];
                }
                if (!cfg.show) {
                    continue;
                }
                this._shouyinCfgMap[type].push(cfg);
            }
            return this._shouyinCfgMap[type] || [];
        }

        public getShouyinCfg(index: number): YishouShouyingConfig {
            return getConfigByNameId(ConfigName.YishouShouyin, index);
        }

        //兽印数据
        public getShouyinInfo(index: number): yishou_shouying_data {
            return this._model.shouying_list[index];
        }

        private _shouyinMaxStarMap: { [index: number]: number } = {};

        public getShouyinMaxStar(index: number): number {
            if (this._shouyinMaxStarMap[index]) {
                return this._shouyinMaxStarMap[index];
            }
            let cfg = this.getShouyinCfg(index);
            if (!cfg || !cfg.material) {
                return 0;
            }
            return this._shouyinMaxStarMap[index] = cfg.material.length;
        }

        //兽印星级
        public getShouyinStar(index: number): number {
            let info = this.getShouyinInfo(index);
            return info && info.star || 0;
        }

        //兽印满星
        public isShouyinMaxStar(index: number): boolean {
            let curStar = this.getShouyinStar(index);
            let maxStar = this.getShouyinMaxStar(index);
            return curStar >= maxStar;
        }

        //兽印能否激活或升星
        public canShouyinActOrUp(index: number, isTips = false): boolean {
            if (this.isShouyinMaxStar(index)) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.maxstar));
                }
                return false;
            }
            let cfg = this.getShouyinCfg(index);
            let curStar = this.getShouyinStar(index);
            let cost = cfg.material[curStar];
            return cost && BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //兽印类型红点（激活升星红点）
        public getShouyinHintByType(type: YishouShouyinType): boolean {
            let cfgList = this.getShouyinCfgList(type);
            for (let cfg of cfgList) {
                if (this.canShouyinActOrUp(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        public updateHint4(): void {
            let ary = [YishouShouyinType.Type1, YishouShouyinType.Type2, YishouShouyinType.Type3];
            let jibanHint = this.getJibanBtnHint();//羁绊红点
            for (let type of ary) {
                let hint = this.getShouyinHintByType(type) || jibanHint;
                HintMgr.setHint(hint, this._model.hintPath3[type]);
            }
            HintMgr.setHint(jibanHint, this._model.jibanHint);
        }

        //羁绊数据
        public getJibanInfo(jibanIndex: number): yishou_jiban_data {
            return this._model.jiban_list[jibanIndex];
        }

        //羁绊组成是否激活
        public isJibanIconActed(jibanIndex: number, partnerIndex: number): boolean {
            let info = this.getJibanInfo(jibanIndex);
            if (!info || !info.list) {
                return false;
            }
            return info.list.indexOf(partnerIndex) > -1;
        }

        //羁绊是否激活
        public isJibanActed(jibanIndex: number): boolean {
            let info = this.getJibanInfo(jibanIndex);
            return info && info.is_active;
        }

        //羁绊组成能否激活
        public canJibanIconAct(jibanIndex: number, partnerIndex: number): boolean {
            if (this.isJibanIconActed(jibanIndex, partnerIndex)) {
                return false;
            }
            let shouyinInfo = this.getShouyinInfo(partnerIndex);
            return !!(shouyinInfo && shouyinInfo.star);
        }

        //羁绊能否激活
        public canJibanAct(jibanIndex: number): boolean {
            if (this.isJibanActed(jibanIndex)) {
                return false;
            }
            let jibanCfg: YishouShouyingSuitConfig = getConfigByNameId(ConfigName.YishouShouyinSuit, jibanIndex);
            if (!jibanCfg || !jibanCfg.partners) {
                return false;
            }
            let partnersLen = jibanCfg.partners.length;
            let info = this.getJibanInfo(jibanIndex);
            let actedLen = info && info.list ? info.list.length : 0;
            return actedLen >= partnersLen;
        }

        //获取羁绊激活的外显id列表
        public getJibanIconActedList(jibanIndex: number): number[] {
            let info = this.getJibanInfo(jibanIndex);
            return info && info.list ? info.list : [];
        }

        //羁绊红点
        public getJibanHint(jibanIndex: number): boolean {
            if (this.isJibanActed(jibanIndex)) {
                return false;
            }
            if (this.canJibanAct(jibanIndex)) {
                return true;
            }
            let jibanCfg: YishouShouyingSuitConfig = getConfigByNameId(ConfigName.YishouShouyinSuit, jibanIndex);
            if (!jibanCfg || !jibanCfg.partners) {
                return false;
            }
            for (let item of jibanCfg.partners) {
                if (this.canJibanIconAct(jibanIndex, item)) {
                    return true;
                }
            }
            return false;
        }

        //羁绊按钮红点
        public getJibanBtnHint(): boolean {
            let jibanCfgList: YishouShouyingSuitConfig[] = getConfigListByName(ConfigName.YishouShouyinSuit);
            for (let cfg of jibanCfgList) {
                let hint = this.getJibanHint(cfg.index);
                if (hint) {
                    return true;
                }
            }
            return false;
        }

        //特殊属性文本
        public getSpecialAttrDesc(shoulingIndex: number): string {
            let proxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
            let shoulingCfg: YishouShoulingConfig = this.getShoulingCfg(shoulingIndex);
            return proxy.getSpecialAttrDesc(shoulingIndex, shoulingCfg.special_attr_id);
        }
    }
}