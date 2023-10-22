namespace game.mod.surface {

    import c2s_lianshendan_swal = msg.c2s_lianshendan_swal;
    import s2c_lianshendan_surface_info = msg.s2c_lianshendan_surface_info;
    import GameNT = base.GameNT;
    import lianshendan_swal_data = msg.lianshendan_swal_data;
    import c2s_ride_oper_up = msg.c2s_ride_oper_up;
    import c2s_ride_oper_skill_active = msg.c2s_ride_oper_skill_active;
    import c2s_ride_oper_up_star = msg.c2s_ride_oper_up_star;
    import s2c_ride_info = msg.s2c_ride_info;
    import ride_info = msg.ride_info;
    import ParamConfig = game.config.ParamConfig;
    import attributes = msg.attributes;
    import HorseConfig = game.config.HorseConfig;
    import HorseDengjiConfig = game.config.HorseDengjiConfig;
    import ride_item = msg.ride_item;
    import TunshiConfig = game.config.TunshiConfig;
    import LanDef = game.localization.LanDef;
    import c2s_buy_reward = msg.c2s_buy_reward;
    import s2c_buy_reward_lisrt = msg.s2c_buy_reward_lisrt;
    import c2s_ride_oper_jiban = msg.c2s_ride_oper_jiban;
    import c2s_yuanling_equip_levelup = msg.c2s_yuanling_equip_levelup;
    import s2c_yuanling_equip_info = msg.s2c_yuanling_equip_info;
    import c2s_yuanling_equip_suit_levelup = msg.c2s_yuanling_equip_suit_levelup;
    import s2c_yuanling_equip_suit_info = msg.s2c_yuanling_equip_suit_info;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import facade = base.facade;
    import JinjiejiangliConfig = game.config.JinjiejiangliConfig;
    import s2c_module_event_add_attr_info = msg.s2c_module_event_add_attr_info;
    import module_event_add_attr_data = msg.module_event_add_attr_data;
    import jiban_item = msg.jiban_item;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import YuanlingZhuangbeiConfig = game.config.YuanlingZhuangbeiConfig;
    import YuanlingTaozhuangConfig = game.config.YuanlingTaozhuangConfig;
    import yuanling_equip_data = msg.yuanling_equip_data;
    import yuanling_equip_suit = msg.yuanling_equip_suit;
    import SpecialAttrConfig = game.config.SpecialAttrConfig;
    import huashen_unit_data = msg.huashen_unit_data;
    import s2c_bethegod_time = msg.s2c_bethegod_time;
    import YuanlingJibanConfig = game.config.YuanlingJibanConfig;

    export class SurfaceProxy extends ProxyBase implements ISurfaceProxy {
        private _model: SurfaceModel;

        public get model(): SurfaceModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new SurfaceModel();

            this.onProto(s2c_lianshendan_surface_info, this.s2c_lianshendan_surface_info, this);
            this.onProto(s2c_ride_info, this.s2c_ride_info, this);
            this.onProto(s2c_buy_reward_lisrt, this.s2c_buy_reward_lisrt, this);
            this.onProto(s2c_module_event_add_attr_info, this.s2c_module_event_add_attr_info, this);
            this.onProto(s2c_yuanling_equip_info, this.s2c_yuanling_equip_info, this);
            this.onProto(s2c_yuanling_equip_suit_info, this.s2c_yuanling_equip_suit_info, this);
            this.onProto(s2c_bethegod_time, this.s2c_bethegod_time, this);
        }

        /******************************炼神丹*********************************/
        private s2c_lianshendan_surface_info(n: GameNT) {
            let msg: s2c_lianshendan_surface_info = n.body;
            if (!msg.datas) {
                return;
            }
            let headTypes: number[] = [];//抛出表头
            for (let info of msg.datas) {
                let index = info.surface_index;
                let headType = PropData.getPropParse(index, PropParseType.Type);
                if (headTypes.indexOf(headType) < 0) {
                    headTypes.push(headType);
                }
                let oldInfo = this._model.pillInfos[index];
                if (!oldInfo) {
                    //不存在
                    this._model.pillInfos[index] = info.datas;
                    continue;
                }
                for (let k in info.datas) {
                    this._model.pillInfos[index][k] = info.datas[k];
                }
            }
            for (let type of headTypes) {
                this.updatePillHint(type);
            }
            this.sendNt(SurfaceEvent.LIANSHENDAN_INFO_UPDATE, headTypes);
        }

        /**使用炼神丹*/
        public c2s_lianshendan_swal(surfaceId: number, index: number) {
            let msg = new c2s_lianshendan_swal();
            msg.surface_index = surfaceId;
            msg.index = index;
            msg.oper_type = 2;//暂时用不到单次的
            this.sendProto(msg);
        }

        /**外显炼神丹信息*/
        private getPillInfo(surfaceId: number): lianshendan_swal_data[] {
            return this._model.pillInfos[surfaceId] || [];
        }

        /**炼神丹信息*/
        private getPillInfoByIndex(surfaceId: number, index: number): lianshendan_swal_data {
            let infos = this.getPillInfo(surfaceId);
            for (let i of infos) {
                if (i.index == index) {
                    return i;
                }
            }
            return null;
        }

        /**炼神丹使用数量*/
        public getPillUseCnt(surfaceId: number, index: number): number {
            let info = this.getPillInfoByIndex(surfaceId, index);
            return info && info.swal_cnt ? info.swal_cnt : 0;
        }

        /**炼神丹使用属性*/
        public getPillAttr(surfaceId: number, index: number): attributes {
            let info = this.getPillInfoByIndex(surfaceId, index);
            return info && info.attrs ? info.attrs : null;
        }

        /**外显是否可以使用炼神丹*/
        public canPillUse(surfaceId: number): boolean {
            let star = this.getSurfacePerStar(surfaceId);
            if (!star) {
                return false;
            }
            let cfg = getConfigById(surfaceId) as HorseConfig;
            let headType = PropData.getPropParse(surfaceId, PropParseType.Type);
            let infos = this.getSurfacePillCost(cfg.quality, star, headType);
            for (let i = 0; i < infos.length; ++i) {
                let info = infos[i];
                let index = info[0];
                let maxCnt = info[1];
                let useCnt = this.getPillUseCnt(surfaceId, index);
                let curCnt = BagUtil.getPropCntByIdx(index);
                let canUseCnt = Math.min(curCnt, maxCnt - useCnt);
                if (canUseCnt > 0) {
                    return true;
                }
            }
            return false;
        }

        /******************************外显系统*********************************/
        /**升级突破*/
        public c2s_ride_oper_up(oper: number, headType: number) {
            let msg = new c2s_ride_oper_up();
            msg.oper = oper;// 1:单次升级，2:一键升级
            msg.head_type = headType;
            this.sendProto(msg);
        }

        /**激活被动技能*/
        public c2s_ride_oper_skill_active(skillId: number, headType: number) {
            let msg = new c2s_ride_oper_skill_active();
            msg.skill_index = skillId;
            msg.head_type = headType;
            this.sendProto(msg);
        }

        /**幻化激活/升星*/
        public c2s_ride_oper_up_star(oper: number, surfaceId: number, headType: number, pos?: number) {
            let msg = new c2s_ride_oper_up_star();
            msg.oper = oper;
            msg.index = surfaceId;
            msg.head_type = headType;
            msg.pos = pos;
            if (oper == SurfaceStarOpType.Battle) {
                this._model.battleFlag = true;
            }
            this.sendProto(msg);
        }

        private s2c_ride_info(n: GameNT) {
            let msg: s2c_ride_info = n.body;
            if (!msg.info) {
                return;
            }
            let info = msg.info;
            if (info.cur_ride && this._model.battleFlag) {
                this._model.battleFlag = false;
                PromptBox.getIns().show(getLanById(LanDef.huanhua_chenggong));//幻化成功
            }
            let headType = info.head_type;
            let oldInfo = this._model.surfaceInfos[headType];
            if (!oldInfo) {
                //不存在
                this._model.surfaceInfos[headType] = info;
            } else {
                let actIndex: number;//激活的外显index
                let upStarIndex: number;//升星的外显index
                let curStage = SurfaceUtil.calcSurfaceStage(info.level, headType);
                let oldStage = SurfaceUtil.calcSurfaceStage(oldInfo.level, headType);
                if (curStage > oldStage) {
                    let skillId = this.getSurfaceSkillId(headType);
                    ViewMgr.getIns().showSurfaceUpTips(skillId, curStage);//进阶成功
                }
                if (info.ride_list) {
                    //激活外显弹窗
                    for (let rideInfo of info.ride_list) {
                        let oldRideInfo = this.getSurfacePerInfo(rideInfo.index);
                        if ((!oldRideInfo || !oldRideInfo.star) && rideInfo.star) {
                            /**激活成功弹窗*/
                            ViewMgr.getIns().showSurfaceTips(rideInfo.index);
                            actIndex = rideInfo.index;
                            break;
                        }
                        //升星成功弹窗
                        let oldRideStar = oldRideInfo && oldRideInfo.star || 0;
                        let curRideStar = rideInfo && rideInfo.star || 0;
                        if (curRideStar != oldRideStar) {
                            upStarIndex = rideInfo.index;
                            break;
                        }
                    }
                }
                if (info.jiban_list) {
                    //激活羁绊提示
                    for (let jibanInfo of info.jiban_list) {
                        let oldJibanInfo = this.getJibanInfo(headType, jibanInfo.index);
                        if ((!oldJibanInfo || !oldJibanInfo.is_active_jiban) && jibanInfo.is_active_jiban) {
                            /**激活成功提示*/
                            ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                            break;
                        }
                    }
                }

                for (let k in info) {
                    this._model.surfaceInfos[headType][k] = info[k];
                }

                if (info.pos_list && headType == ConfigHead.Huashen) {
                    this.updateHuashenIds(info.pos_list);//更新化神出战
                }
                //升星成功弹窗
                if (actIndex || upStarIndex) {
                    let rideInfo = this.getSurfacePerInfo(actIndex || upStarIndex)
                    let curRideStar = rideInfo && rideInfo.star;
                    let god = rideInfo.attr && rideInfo.attr[AttrKey.god] || 0;
                    let lastGod = 0;
                    let cfg = getConfigById(rideInfo.index) as HorseConfig;
                    if (cfg && cfg.attr_id && cfg.attr_id[curRideStar - 2]) {
                        let lastAttr = RoleUtil.getAttr(cfg.attr_id[curRideStar - 2]);
                        lastGod = lastAttr && lastAttr[AttrKey.god] || 0;
                    }
                    let upStarData: UpStarData = {
                        star: curRideStar,
                        attrFont1: god > 0 ? `+${god}` : '',
                        attrFont0: god > 0 ? `仙力+${lastGod}` : ''
                    }
                    if (actIndex) {
                        this._upStarData = upStarData;
                    } else {
                        this._upStarData = null;
                        ViewMgr.getIns().showUpStarTips(upStarData);
                    }
                }

                this.sendNt(SurfaceEvent.SURFACE_ACT_UPDATE, actIndex);//激活的外显index
            }
            this.updateHint(headType);
            this.sendNt(SurfaceEvent.SURFACE_INFO_UPDATE, headType);
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


        /**外显信息*/
        private getSurfaceInfo(headType: number): ride_info {
            return this._model.surfaceInfos[headType] || null;
        }

        /**幻化的外显index*/
        public getSurfaceId(headType: number): number {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.cur_ride) {
                return 0;
            }
            return info.cur_ride;
        }

        /**默认显示的外显index*/
        public getDefaultId(headType: number): number {
            let indexStr = SurfaceConfigList[headType] + "_default";
            let cfg: ParamConfig = GameConfig.getParamConfigById(indexStr);
            if (cfg && cfg.value) {
                return cfg.value;//默认读配置
            }
            return this._model.headTypeToDefaultId[headType];
        }

        /**默认显示的外显是否激活*/
        public isDefaultAct(headType: number): boolean {
            let index = this.getDefaultId(headType);
            let star = this.getSurfacePerStar(index);
            return !!star;
        }

        /**等级*/
        public getSurfaceLv(headType: number): number {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.level) {
                return 0;
            }
            return info.level;
        }

        /**阶级*/
        public getSurfaceStage(headType: number): number {
            let lv = this.getSurfaceLv(headType);
            if (!lv) {
                return 0;
            }
            return SurfaceUtil.calcSurfaceStage(lv, headType);
        }

        /**小等级*/
        public getSurfaceSmallLv(headType: number): number {
            let lv = this.getSurfaceLv(headType);
            if (!lv) {
                return 0;
            }
            let perLv = this.getSurfacePerLv(headType);
            let smallLv = lv % perLv;
            return smallLv ? smallLv : perLv;
        }

        /**突破一次所需等级*/
        public getSurfacePerLv(headType: number): number {
            let indexStr = SurfaceConfigList[headType] + "_lv";
            let cfg: ParamConfig = GameConfig.getParamConfigById(indexStr);
            return cfg ? cfg.value : SurfacePerLv;
        }

        /**升级经验*/
        public getSurfaceExp(headType: number): number {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.exp) {
                return 0;
            }
            return info.exp * SurfacePerExp;
        }

        /**升级所需经验*/
        public getSurfaceUpExp(headType: number, index: number): number {
            let cfg = this.getSurfaceLvCfg(headType, index);
            if (!cfg) {
                return 0;
            }
            return cfg.exp * SurfacePerExp;
        }

        /**总属性*/
        public getSurfaceAllAttr(headType: number): attributes {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.all_attr) {
                return null;
            }
            return info.all_attr;
        }

        /**主动技能*/
        public getSurfaceSkillId(headType: number): number {
            let indexStr = SurfaceConfigList[headType] + "_skill";
            let cfg: ParamConfig = GameConfig.getParamConfigById(indexStr);
            return cfg ? cfg.value[0] : 0;
        }

        /**被动技能列表*/
        public getSurfaceSkillList(headType: number): number[] {
            let indexStr = SurfaceConfigList[headType] + "_skill";
            let cfg: ParamConfig = GameConfig.getParamConfigById(indexStr);
            let skills: number[] = cfg ? cfg.value : [];
            return skills.slice(1, skills.length);
        }

        /**被动技能是否激活*/
        public isSurfaceSkillAct(headType: number, skillId: number): boolean {
            let info = this.getSurfaceInfo(headType);
            let skills = info && info.skill_index ? info.skill_index : [];
            return skills.indexOf(skillId) > -1;
        }

        /**升级消耗*/
        public getSurfaceUpCost(headType: number, index: number): number[][] {
            let cfg = this.getSurfaceLvCfg(headType, index);
            return cfg ? cfg.star_consume : null;
        }

        public get headType(): number {
            return this._model.headType;
        }

        public set headType(index: number) {
            this._model.headType = index;
        }

        public get selData(): AvatarItemData {
            return this._model.selData;
        }

        public set selData(cfg: AvatarItemData) {
            this._model.selData = cfg;
        }

        public getSurfaceTypes(headType: number): number[] {
            if (!this._model.surfaceTypes[headType]) {
                this._model.surfaceTypes[headType] = [];
                let cfgList: HorseConfig[] = getConfigListByName(SurfaceConfigList[headType] + ".json");
                for (let cfg of cfgList) {
                    let type = cfg.type;
                    if (this._model.surfaceTypes[headType].indexOf(type) < 0) {
                        this._model.surfaceTypes[headType].push(type);
                    }
                    let comType = `${headType}${type}`;
                    if (!this._model.surfaceCfgs[comType]) {
                        this._model.surfaceCfgs[comType] = [];
                    }
                    if (cfg.attr_id) {
                        this._model.surfaceCfgs[comType].push(cfg);
                    }
                }
                this._model.surfaceTypes[headType].sort(SortTools.sortNum);
            }
            //化神特殊处理，四魔神未激活时候不显示
            if (headType == ConfigHead.Huashen) {
                let tmpsTypes: number[] = [];
                for (let type of this._model.surfaceTypes[headType]) {
                    if (type == SurfaceCfgType.Type2) {
                        //四魔神
                        let cfgList = this.getSurfaceCfgList(headType, type);
                        if (!cfgList.length) {
                            continue;
                        }
                    }
                    tmpsTypes.push(type);
                }
                return tmpsTypes;
            }
            return this._model.surfaceTypes[headType];
        }

        public getSurfaceCfgList(headType: number, type: number): HorseConfig[] {
            let comType = headType + "" + type;
            let cfgList = this._model.surfaceCfgs[comType] || [];
            let tmpList: HorseConfig[] = [];
            for (let cfg of cfgList) {
                if (!cfg.show) {
                    //默认不显示
                    let star = this.getSurfacePerStar(cfg.index);
                    if (!star && !this.canUpStar(cfg.index)) {
                        //未激活且不满足激活
                        continue;
                    }
                }
                tmpList.push(cfg);
            }
            return tmpList;
        }

        /**外显列表*/
        private getSurfaceListInfo(headType: number): ride_item[] {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.ride_list) {
                return [];
            }
            return info.ride_list;
        }

        private getSurfacePerInfoPos(index: number): number {
            let headType = PropData.getPropParse(index, PropParseType.Type);
            let infos = this.getSurfaceListInfo(headType);
            for (let i = 0; i < infos.length; ++i) {
                let info = infos[i];
                if (info.index == index) {
                    return i;
                }
            }
            return -1;
        }

        /**单个外显信息*/
        public getSurfacePerInfo(index: number): ride_item {
            let headType = PropData.getPropParse(index, PropParseType.Type);
            let pos = this.getSurfacePerInfoPos(index);
            if (pos > -1) {
                return this._model.surfaceInfos[headType].ride_list[pos];
            }
            return null;
        }

        /**单个外显属性*/
        public getSurfacePerAttr(index: number): attributes {
            let info = this.getSurfacePerInfo(index);
            return info ? info.attr : null;
        }

        /**单个外显星级*/
        public getSurfacePerStar(index: number): number {
            let info = this.getSurfacePerInfo(index);
            return info ? info.star : 0;
        }

        /**外显属性丹信息*/
        public getSurfacePillCost(quality: number, star: number, headType: number): number[][] {
            let cfgList: TunshiConfig[] = getConfigByNameId(ConfigName.Tunshi, quality);
            let configStr = SurfaceConfigList[headType] + "_cost";
            star = star == 0 ? 1 : star;
            return cfgList[star][configStr];
        }

        /**属性丹各个星级消耗信息*/
        public getSurfacePillCostList(quality: number, headType: number, index: number): number[][] {
            let infos: number[][] = [];
            let cfgList: TunshiConfig[] = getConfigByNameId(ConfigName.Tunshi, quality);
            let configStr = SurfaceConfigList[headType] + "_cost";
            for (let k in cfgList) {
                let cfg = cfgList[k];
                let cost: number[][] = cfg[configStr];
                for (let i of cost) {
                    if (i[0] == index) {
                        infos.push(i);
                        break;
                    }
                }
            }
            return infos;
        }

        /**外显最大星级*/
        public getSurfaceMaxStar(headType: number): number {
            let configStr = SurfaceConfigList[headType] + "_max_star";
            let cfg: ParamConfig = GameConfig.getParamConfigById(configStr);
            return cfg ? cfg.value : 5;
        }

        //是否可激活，升星
        public canUpStar(index: number): boolean {
            let headType = PropData.getPropParse(index, PropParseType.Type);
            let maxStar = this.getSurfaceMaxStar(headType);
            let star = this.getSurfacePerStar(index);
            if (star >= maxStar) {
                return false;
            }
            let cfg = getConfigById(index);
            if (!cfg) {
                console.error(index + "无配置");
                return false;
            }
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

        public getSurfacePerHint(cfg: HorseConfig): boolean {
            if (this.canUpStar(cfg.index)) {
                return true;
            }
            if (this.canPillUse(cfg.index)) {
                return true;
            }
            return false;
        }

        public getSurfaceTypeHint(headType: number, type: number): boolean {
            let items = this.getSurfaceCfgList(headType, type);
            for (let i of items) {
                if (this.getSurfacePerHint(i)) {
                    return true;
                }
            }
            return false;
        }

        /**升级配置*/
        private getSurfaceLvCfg(headType: number, index: number): HorseDengjiConfig {
            let configStr = SurfaceConfigList[headType] + "_dengji.json";
            let cfg = getConfigByNameId(configStr, index) as HorseDengjiConfig;
            return cfg;
        }

        /**************************进阶礼包*************************/
        /**购买礼包*/
        public c2s_buy_reward(headType: number, index: number) {
            let msg = new c2s_buy_reward();
            msg.head_type = headType;
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_buy_reward_lisrt(n: GameNT) {
            let msg: s2c_buy_reward_lisrt = n.body;
            if (!msg.buy_reward_lisrt) {
                return;
            }
            this._model.rewardList = this._model.rewardList.concat(msg.buy_reward_lisrt);
            let headType = msg.buy_reward_lisrt[0].head_type;
            this.updateGiftHint(headType);
            this.sendNt(SurfaceEvent.SURFACE_GIFT_INFO_UPDATE, headType);
        }

        public hasGiftBuy(headType: number, index: number): boolean {
            for (let info of this._model.rewardList) {
                if (info.head_type == headType && info.index == index) {
                    return true;
                }
            }
            return false;
        }

        /**************************羁绊*************************/
        public c2s_ride_oper_jiban(headType: number, index: number, rideIndex?: number) {
            let msg = new c2s_ride_oper_jiban();
            msg.head_type = headType;
            msg.index = index;
            msg.ride_index = rideIndex;
            this.sendProto(msg);
        }

        /**已激活羁绊列表*/
        private getJibanList(headType: number): jiban_item[] {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.jiban_list) {
                return [];
            }
            return info.jiban_list;
        }

        /**单个羁绊信息*/
        private getJibanInfo(headType: number, index: number): jiban_item {
            let pos = this.getJibanInfoPos(headType, index);
            if (pos > -1) {
                return this._model.surfaceInfos[headType].jiban_list[pos];
            }
            return null;
        }

        private getJibanInfoPos(headType: number, index: number): number {
            let infos = this.getJibanList(headType);
            for (let i = 0; i < infos.length; ++i) {
                let info = infos[i];
                if (info.index == index) {
                    return i;
                }
            }
            return -1;
        }

        /**羁绊是否已激活*/
        public isJibanAct(headType: number, index: number): boolean {
            let info = this.getJibanInfo(headType, index);
            return info && info.is_active_jiban;
        }

        /**羁绊单个外显是否已激活*/
        public isJibanItemAct(headType: number, index: number, rideIndex: number): boolean {
            if (this.isJibanAct(headType, index)) {
                return true;
            }
            let info = this.getJibanInfo(headType, index);
            return info && info.ride_index && info.ride_index.indexOf(rideIndex) > -1;
        }

        /**羁绊配置列表*/
        public getJibanCfgList(headType: number): HorseJibanConfig[] | YuanlingJibanConfig[] {
            let configStr = SurfaceConfigList[headType] + "_jiban.json";
            return getConfigListByName(configStr) || [];
        }

        /**羁绊系统是否可以激活*/
        public canJibanSysAct(headType: number, cfg: HorseJibanConfig): boolean {
            if (this.canJibanAct(headType, cfg)) {
                return true;
            }
            let infos = cfg.partners;
            for (let i = 0; i < infos.length; ++i) {
                let index = infos[i];
                if (this.canJibanItemAct(headType, cfg, index)) {
                    return true;
                }
            }
            return false;
        }

        /**羁绊是否可以激活*/
        public canJibanAct(headType: number, cfg: HorseJibanConfig): boolean {
            if (this.isJibanAct(headType, cfg.index)) {
                return false;
            }
            let infos = cfg.partners;
            for (let i = 0; i < infos.length; ++i) {
                let index = infos[i];
                if (!this.isJibanItemAct(headType, cfg.index, index)) {
                    return false;
                }
            }
            return true;
        }

        /**羁绊外显是否可以激活*/
        public canJibanItemAct(headType: number, cfg: HorseJibanConfig, index: number): boolean {
            if (this.isJibanItemAct(headType, cfg.index, index)) {
                return false;
            }
            let star = this.getSurfacePerStar(index);
            return !!star;
        }

        public get selJibanCfg(): HorseJibanConfig {
            return this._model.selJibanCfg;
        }

        public set selJibanCfg(cfg: HorseJibanConfig) {
            this._model.selJibanCfg = cfg;
        }

        public getBtnType(headType: number): string {
            return this._model.headTypeToBtnType[headType];
        }

        /**************************红点*************************/
        private checkOpen(headType: number): boolean {
            let openIdx = this._model.headTypeToOpenIdx[headType];
            if (openIdx && !ViewMgr.getIns().checkViewOpen(openIdx)) {
                return false;
            }
            if (headType == ConfigHead.Huashen) {
                //化神系统红点需要额外判断是否完成任务激活系统
                let isAct = this.isDefaultAct(headType);
                if (!isAct) {
                    return false;
                }
            }
            return true;
        }

        public getOpenIdx(headType: number): number {
            return this._model.headTypeToOpenIdx[headType];
        }

        private updateHint(headType: number): void {
            this.updateUpHint(headType);
            this.updateSkillHint(headType);
            this.updateGiftHint(headType);
            this.updateActHint(headType);
            this.updatePillHint(headType);
            this.updateJibanHint(headType);
            this.updateBattleHint(headType);
        }

        private updateUpHint(headType: number): void {
            if (!this.checkOpen(headType) || !this._model.upHints[headType]) {
                return;
            }
            let hint = false;
            let lv = this.getSurfaceLv(headType);
            let exp = this.getSurfaceExp(headType);
            let upExp = this.getSurfaceUpExp(headType, lv);
            let cost = this.getSurfaceUpCost(headType, lv);
            let nextCost = this.getSurfaceUpCost(headType, lv + 1);
            let isMax = !nextCost && exp >= upExp;
            if (!isMax) {
                hint = BagUtil.checkPropCnt(cost[0][0], cost[0][1])
            }
            HintMgr.setHint(hint, this._model.upHints[headType]);
        }

        private updateSkillHint(headType: number): void {
            if (!this.checkOpen(headType) || !this._model.skillHints[headType]) {
                return;
            }
            let hint = false;
            let skillList = this.getSurfaceSkillList(headType);
            for (let i = 0; i < skillList.length; ++i) {
                let skillId = skillList[i];
                let isAct = this.isSurfaceSkillAct(headType, skillId);
                if (isAct) {
                    continue;
                }
                let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
                let cost: number[] = cfg.act_material[0];
                this.initSkillProps(headType, cost[0]);
                if (BagUtil.checkPropCnt(cost[0], cost[1])) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.skillHints[headType]);
        }

        /**被动技能激活消耗道具*/
        private initSkillProps(headType: number, index: number): void {
            if (!this._model.skillProps[headType]) {
                this._model.skillProps[headType] = [];
            }
            if (this._model.skillProps[headType].indexOf(index) < 0) {
                this._model.skillProps[headType].push(index);
            }
        }

        private updateJibanHint(headType: number): void {
            if (!this.checkOpen(headType) || !this._model.jibanHints[headType]) {
                return;
            }
            let hint = false;
            let items = this.getJibanCfgList(headType);
            for (let cfg of items) {
                if (this.canJibanSysAct(headType, cfg)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.jibanHints[headType]);
        }

        public getJibanHint(headType: number): string[] {
            return this._model.jibanHints[headType];
        }

        private updateGiftHint(headType: number): void {
            if (!this.checkOpen(headType) || !this._model.giftHints[headType]) {
                return;
            }
            let hint = false;
            let items: JinjiejiangliConfig[] = getConfigListByName(ConfigName.Jinjiejiangli);
            for (let cfg of items) {
                let index = cfg.index;
                if (this.hasGiftBuy(headType, index)) {
                    continue;
                }
                let curStage = this.getSurfaceStage(headType);
                if (curStage < index) {
                    continue;
                }
                if (BagUtil.checkPropCnt(cfg.award_buy[0][0], cfg.award_buy[0][1])) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.giftHints[headType]);
        }

        public getGiftHint(headType: number): string[] {
            return this._model.giftHints[headType];
        }

        private updateActHint(headType: number): void {
            if (!this.checkOpen(headType)) {
                return;
            }
            let hint = false;
            let datas = this.getSurfaceTypes(headType);
            for (let type of datas) {
                let items = this.getSurfaceCfgList(headType, type);
                for (let i of items) {
                    if (this.canUpStar(i.index)) {
                        hint = true;
                        break;
                    }
                }
                if (hint) {
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.actHints[headType]);
        }

        //可激活红点
        public getActHint(headType: number): boolean {
            let hintType = this._model.actHints[headType];
            if (!hintType) {
                return false;
            }
            return HintMgr.getHint(hintType);
        }

        private updatePillHint(headType: number): void {
            if (!this.checkOpen(headType) || !this._model.pillHints[headType]) {
                return;
            }
            let hint = false;
            let datas = this.getSurfaceTypes(headType);
            for (let type of datas) {
                let items = this.getSurfaceCfgList(headType, type);
                for (let i of items) {
                    if (this.canPillUse(i.index)) {
                        hint = true;
                        break;
                    }
                }
                if (hint) {
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.pillHints[headType]);
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            for (let i of indexs) {
                for (let k in this._model.skillProps) {
                    let props = this._model.skillProps[k];
                    if (props.indexOf(i) < 0) {
                        continue;
                    }
                    this.updateSkillHint(parseInt(k));
                }
                let type = this._model.upPropToHeadType[i];
                if (!type) {
                    continue;
                }
                this.updateUpHint(type);
            }
        }

        protected onBagUpdateByBagType(n: base.GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(BagType.YuanlinEquip) < 0) {
                return;
            }
            this.updateYuanlinHint();
        }

        protected onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.diamond) >= 0) {
                /**写死仙玉变更时候刷新，需要其他道具时再做支持*/
                for (let type of this._model.headTypes) {
                    this.updateGiftHint(type);
                }
            }
            if (keys.indexOf(AttrKey.god) >= 0) {
                /**仙力变更后刷新出战红点*/
                for (let k in this._model.battleHints) {
                    let type = parseInt(k);
                    this.updateBattleHint(type);
                }
            }
        }

        protected onBagUpdateByPropTypeAndSubType(n: base.GameNT): void {
            let propTypeAndSubTypes: { [propType: number]: number[] } = n.body;
            for (let k in propTypeAndSubTypes) {
                let propType = parseInt(k);
                let types = propTypeAndSubTypes[k];
                if (propType == PropType.Surface) {
                    for (let t of types) {
                        let headType = this._model.subTypeToHeadType11[t];
                        if (!headType) {
                            continue;
                        }
                        this.updateActHint(headType);
                    }
                } else if (propType == PropType.Lianshendan) {
                    for (let t of types) {
                        let headType = this._model.subTypeToHeadType17[t];
                        if (!headType) {
                            continue;
                        }
                        this.updatePillHint(headType);
                    }
                } else if (propType == PropType.UpStar) {
                    for (let t of types) {
                        let headType = this._model.subTypeToHeadType32[t];
                        if (!headType) {
                            continue;
                        }
                        this.updateActHint(headType);
                    }
                }
            }
        }

        /************************** 元灵.装备 *************************/
        /**
         * 元灵装备信息
         */
        private s2c_yuanling_equip_info(n: GameNT) {
            let msg: s2c_yuanling_equip_info = n.body;
            if (!msg.equiplist) {
                return;
            }

            for (let i = 1; i <= 4; i++) {
                if (!this._model.yuanlinEquipPower[i]) {
                    this._model.yuanlinEquipPower[i] = Long.fromValue(0);
                }
                this._model.yuanlinEquipPower[i].low = 0;
                this._model.yuanlinEquipPower[i].high = 0;
            }
            for (let eqp of msg.equiplist) {
                if (!this._model.yuanlinEqpInfo[eqp.quality]) {
                    this._model.yuanlinEqpInfo[eqp.quality] = {};
                }
                this._model.yuanlinEqpInfo[eqp.quality][eqp.pos] = eqp;
                if (eqp.attrs.showpower) {
                    let oldPower = this._model.yuanlinEquipPower[eqp.quality];
                    this._model.yuanlinEquipPower[eqp.quality] = oldPower.add(eqp.attrs.showpower);
                }
            }

            this.updateYuanlinHint();
            this.sendNt(SurfaceEvent.YUANLIN_EQUIP_INFO_UPDATE);
        }

        /**
         * 元灵装备激活、进阶信息
         * @param {number} type 元灵类型
         * @param {number} pos 位置
         */
        public c2s_yuanling_equip_levelup(type: number, pos: number): void {
            let msg: c2s_yuanling_equip_levelup = new c2s_yuanling_equip_levelup();
            msg.quality = type;
            msg.pos = pos;
            this.sendProto(msg);
        }

        /**
         * 元灵套装信息
         */
        private s2c_yuanling_equip_suit_info(n: GameNT) {
            let msg: s2c_yuanling_equip_suit_info = n.body;
            if (!msg.suitlist) {
                return;
            }

            for (let i = 1; i <= 4; i++) {
                if (!this._model.yuanlinSuitPower[i]) {
                    this._model.yuanlinSuitPower[i] = Long.fromValue(0);
                }
                this._model.yuanlinSuitPower[i].low = 0;
                this._model.yuanlinSuitPower[i].high = 0;
            }
            for (let suit of msg.suitlist) {
                this._model.yuanlinSuitInfo[suit.quality] = suit;
                if (suit.attrs.showpower) {
                    let oldPower = this._model.yuanlinSuitPower[suit.quality];
                    this._model.yuanlinSuitPower[suit.quality] = oldPower.add(suit.attrs.showpower);
                }
            }

            this.updateYuanlinHint();
            this.sendNt(SurfaceEvent.YUANLIN_SUIT_INFO_UPDATE);
        }

        /**
         * 元灵套装激活、进阶信息
         * @param {number} type 元灵类型
         */
        public c2s_yuanling_equip_suit_levelup(type: number): void {
            let msg: c2s_yuanling_equip_suit_levelup = new c2s_yuanling_equip_suit_levelup();
            msg.quality = type;
            this.sendProto(msg);
        }

        public getYuanlinEqpInfo(type: number, pos: number): yuanling_equip_data {
            return this._model.yuanlinEqpInfo && this._model.yuanlinEqpInfo[type] && this._model.yuanlinEqpInfo[type][pos];
        }

        public getYuanlinEqpInfo2(type: number): { [pos: number]: yuanling_equip_data } {
            return this._model.yuanlinEqpInfo && this._model.yuanlinEqpInfo[type];
        }

        public getYuanlinSuitInfo(type: number): yuanling_equip_suit {
            return this._model.yuanlinSuitInfo && this._model.yuanlinSuitInfo[type];
        }

        public getYuanlinPower(type: number): Long {
            let eqpPower = this._model.yuanlinEquipPower[type];
            let suitPower = this._model.yuanlinSuitPower[type];
            if (eqpPower && suitPower) {
                return eqpPower.add(suitPower);
            } else {
                return eqpPower || suitPower || Long.ZERO;
            }
        }

        public getYuanlinEqpCfg(id: number): YuanlingZhuangbeiConfig {
            let cfg: YuanlingZhuangbeiConfig = getConfigByNameId(ConfigName.TianshenZhuangBei, id);
            return cfg;
        }

        public getYuanlinSuitCfg(type: number, lv: number): YuanlingTaozhuangConfig {
            let cfg = getConfigByNameId(ConfigName.TianshenTaoZhuang, type);
            return cfg && cfg[lv];
        }

        /**
         * 取未激活时的默认装备
         * @param type
         * @returns
         */
        public getDefaultEqpCfg(type: number, pos: number): YuanlingZhuangbeiConfig {
            let id = this.getYuanlinEqpId(type, pos, 1);
            let cfgs: YuanlingZhuangbeiConfig = this.getYuanlinEqpCfg(id);
            return cfgs;
        }

        /**
         * 取未激活时的默认套装
         * @param type
         * @returns
         */
        public getDefaultSuitCfg(type: number): YuanlingTaozhuangConfig {
            let cfg = getConfigByNameId(ConfigName.TianshenTaoZhuang, type);
            return cfg && cfg[1];
        }

        /**
         * 装备阶级达标数量
         * @param type
         * @returns
         */
        public getEqpReachCnt(type: number): number {
            let cnt: number = 0;
            let eqpInfos = this.getYuanlinEqpInfo2(type);
            if (!eqpInfos) {
                return cnt;
            }
            let suitInfo = this.getYuanlinSuitInfo(type);
            let isSuitActive: boolean = suitInfo && !!suitInfo.level;
            let suitCfg: YuanlingTaozhuangConfig;
            if (isSuitActive) {              // 已激活
                suitCfg = this.getYuanlinSuitCfg(type, suitInfo.nextlevel);
            } else {
                suitCfg = this.getDefaultSuitCfg(type);
            }
            if (!suitCfg) {
                return cnt;
            }
            let needReach = suitCfg.reach_class;
            for (let pos in eqpInfos) {
                let eqp = eqpInfos[pos];
                if (eqp.index.isZero()) {
                    continue;
                }
                if (this.getYuanlinEqpStep(eqp.index.toNumber()) >= needReach) {
                    cnt++;
                }
            }

            return cnt;
        }

        /**
         * 取元灵装备类型（1~4）
         */
        public getYuanlinEqpType(id: number): number {
            return Math.floor(id % 10000000 / 1000000);
        }

        /**
         * 取元灵装备部位（1~8）
         */
        public getYuanlinEqpPos(id: number): number {
            return Math.floor(id % 10000 / 1000);
        }

        /**
         * 取元灵装备阶级
         */
        public getYuanlinEqpStep(id: number): number {
            return id && id % 100;
        }

        /**
         * 取元灵套装阶级
         */
        public getYuanlinSuitStep(cfg: YuanlingTaozhuangConfig): number {
            return cfg ? cfg.lv : 0;
        }

        //元灵装备套装属性描述转换
        public changeInfos(desc: string, nameColor: number, valColor: number): string[] {
            let infos: string[] = [];
            let attrList: string[] = desc.split(",");
            for (let i of attrList) {
                let attr = i.split("+");
                let info = TextUtil.addColor(attr[0], nameColor) + TextUtil.addColor(" +" + attr[1], valColor);
                infos.push(info);
            }
            return infos;
        }

        /**
         * 取元灵装备id
         * @param type 1~4
         * @param pos 1~8
         * @param step 阶级 1~
         * @returns
         */
        public getYuanlinEqpId(type: number, pos: number, step: number): number {
            return 64000000000 + type * 1000000 + pos * 1000 + step;
        }

        private _yuanlingSuitTypeAry: number[];

        /**元灵套装id数组*/
        public getYuanlingSuitTypeAry(): number[] {
            if (this._yuanlingSuitTypeAry) {
                return this._yuanlingSuitTypeAry;
            }
            this._yuanlingSuitTypeAry = [];
            let cfgObj = getConfigByName(ConfigName.TianshenTaoZhuang);
            let keys = Object.keys(cfgObj);
            keys.forEach(key => {
                this._yuanlingSuitTypeAry.push(+key);
            })
            return this._yuanlingSuitTypeAry;
        }

        private updateYuanlinHint(): void {
            let eqpHint: boolean = false;
            let typeAry = this.getYuanlingSuitTypeAry();
            for (let type of typeAry) {
                eqpHint = this.getYuanlinEqpTypeHint(type);
                if (eqpHint) {
                    break;
                }
            }
            HintMgr.setHint(eqpHint, this._model.yuanlinEqpOpeHint);
        }

        // private updateYuanlinTypeHint(type: number): boolean {
        //     return false;
        // }

        // private updateYuanlinEqpHint(type: number, pos: number): void {
        //     if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Tianshen)){
        //         return;
        //     }
        //     let hint = this.getYuanlinEqpHint(type, pos);
        //     HintMgr.setHint(hint, this._model.yuanlinEqpOpeHint);
        // }

        // private updateYuanlinSuitHint(type: number): boolean {
        //     return false;
        // }

        public getYuanlinEqpTypeHint(type: number): boolean {
            let hint: boolean = false;
            let hint2: boolean = false;
            for (let pos = 1; pos <= 8; pos++) {
                hint = this.getYuanlinEqpHint(type, pos);
                if (hint) {
                    break;
                }
            }
            hint2 = this.getYuanlinSuitHint(type);
            return hint || hint2;
        }

        public getYuanlinEqpHint(type: number, pos: number): boolean {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Tianshen)) {
                return false;
            }
            let hint = false;
            let eqpInfo = this.getYuanlinEqpInfo(type, pos);
            let eqpCfg: YuanlingZhuangbeiConfig;
            let isEqpActive: boolean = eqpInfo && !eqpInfo.index.isZero();
            if (isEqpActive) {              // 已激活
                eqpCfg = this.getYuanlinEqpCfg(eqpInfo.index.toNumber());
            } else {
                eqpCfg = this.getDefaultEqpCfg(type, pos);
            }

            let cost = eqpCfg.consume[0];
            if (!cost.length) {
                hint = false;
            } else {
                let isEnough: boolean = BagUtil.checkPropCnt(cost[0], cost[1]);
                hint = isEnough && !!eqpCfg.next_id;          // 消耗足够，且未满级
            }
            return hint;
        }

        public getYuanlinSuitHint(type: number): boolean {
            let suitInfo = this.getYuanlinSuitInfo(type);
            let isMax: boolean = suitInfo && (!suitInfo.nextattrs || !suitInfo.nextattrs.showpower);

            let nextSuitCfg: YuanlingTaozhuangConfig;
            let isSuitActive: boolean = suitInfo && !!suitInfo.level;
            if (isSuitActive) {              // 已激活
                nextSuitCfg = this.getYuanlinSuitCfg(type, suitInfo.nextlevel);
            } else {
                nextSuitCfg = this.getDefaultSuitCfg(type);
            }
            let reachCnt = this.getEqpReachCnt(type);
            let canOpe: boolean = nextSuitCfg && reachCnt >= nextSuitCfg.wear_quantity && !isMax;
            HintMgr.setHint(canOpe, this._model.yuanlinSuitOpeHint);
            return canOpe;
        }

        /**获取功能主界面幻化按钮红点路径 */
        public getHeadTypeToStarHint(headType: number): string[] {
            return this._model.starHint[headType];
        }

        /**是否显示主界面幻化按钮 */
        public isStar(headType: number = this._model.headType): boolean {
            return !!this._model.starHint[headType];
        }

        /**根据headType获取幻化跳转路径 */
        public getStarRoadByHeadType(headType: number = this._model.headType): string {
            return this._model.starJumpData[headType];
        }

        /**是否有羁绊功能 */
        public isJiban(headType: number = this._model.headType): boolean {
            return !!this._model.headTypeToBtnType[headType];
        }

        /**************************通用的事件完成协议*************************/
        private s2c_module_event_add_attr_info(n: GameNT) {
            let msg: s2c_module_event_add_attr_info = n.body;
            if (!msg.list) {
                return;
            }
            for (let info of msg.list) {
                let composeIndex = this.getSpecialComposeIndex(info.index.toNumber(), info.specialindex);
                this._model.specialAttrInfos[composeIndex] = info;
            }
            this.sendNt(SurfaceEvent.SURFACE_SPECIAL_ATTR_UPDATE);
        }

        private getSpecialComposeIndex(index: number, specialindex: number): number {
            return parseInt(index + "" + specialindex);
        }

        /**通用的属性信息*/
        private getSpecialAttrInfo(index: number, specialindex: number): module_event_add_attr_data {
            let composeIndex = this.getSpecialComposeIndex(index, specialindex);
            return this._model.specialAttrInfos[composeIndex] || null;
        }

        /**通用的属性信息描述*/
        public getSpecialAttrDesc(index: number, specialindex: number): string {
            let cfg: SpecialAttrConfig = getConfigByNameId(ConfigName.SpecialAttr, specialindex);
            if (!cfg) {
                return "";
            }
            let descStr = cfg.desc;
            if (descStr.indexOf("%s") > -1) {
                let info = this.getSpecialAttrInfo(index, specialindex);
                let curVal = info && info.step ? info.step : 0;
                descStr = StringUtil.substitute(descStr, [curVal]);
            }
            return descStr;
        }

        /**是否出战*/
        public isBattle(headType: number, index: number): boolean {
            let curIndex = this.getSurfaceId(headType);
            if (curIndex == index) {
                return true;
            }
            if (headType == ConfigHead.Huashen) {
                //化神特殊处理
                let posList = this.getPosList(headType);
                for (let info of posList) {
                    if (info.unitid == index) {
                        return true;
                    }
                }
            }
            return false;
        }
        /************************化神相关******************************/
        //化神变身结束时间戳
        private s2c_bethegod_time(n: GameNT) {
            let msg: s2c_bethegod_time = n.body;
            if (!msg) {
                return;
            }
            this.huashenTime = msg.time;
        }
        //化神变身持续时间
        public get huashenTime(): number {
            return this._model.huashenTime;
        }
        //支持外部调用，方便测试
        public set huashenTime(time: number) {
            this._model.huashenTime = time;
            this.sendNt(HuashenEvent.ON_SCENE_HUASHEN_TIME);
        }

        /**外显上阵相关，化神有用到*/
        private getPosList(headType: number): huashen_unit_data[] {
            let info = this.getSurfaceInfo(headType);
            if (!info || !info.pos_list) {
                return [];
            }
            return info.pos_list;
        }

        /**已上阵的化神列表*/
        public get huashenIds(): number[] {
            if (!this._model.huashenIds || !this._model.huashenIds.length) {
                //不存在化神信息时
                this.resetHuashenIds();
            }
            return this._model.huashenIds || [];
        }

        //更新化神信息，中途变更化神才重置
        public updateHuashenIds(posList: huashen_unit_data[]): void {
            for (let i of posList) {
                //let index = this.getPosIndex(ConfigHead.Huashen, i.pos);
                let index = this.huashenIds[i.pos - 1] || 0;
                if (index != i.unitid) {
                    this.resetHuashenIds();
                    break;
                }
            }
        }

        //初始化重置化神信息，化神变身时间结束的时候也会重置，中途变更化神也会重置
        public resetHuashenIds(): void {
            let posList = this.getPosList(ConfigHead.Huashen);
            SortTools.sortMap(posList, "pos");

            this._model.huashenIds = [];
            for (let i of posList) {
                if (i.unitid) {
                    this._model.huashenIds.push(i.unitid);
                }
            }
            this._model.lastHuashenId = 0;
        }

        //场景化神ID变化时设置化神数据
        public setHuashenIds(curId: number): void {
            // let proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            // let vo = proxy.mainPlayerVo;
            // let curId = vo && vo.the_god;//当前变身的化神
            if (!curId) {
                this.resetHuashenIds();//场景不存在化神ID时，则重置数据
                return;
            }
            if (!this._model.lastHuashenId) {
                //上一次不存在化神ID时，则不需要交换化神位置
                this._model.lastHuashenId = curId;
                return;
            }
            //找到当前化神ID上一次的位置，将主战位的化神切换到对应位置
            for (let i = 0; i < this._model.huashenIds.length; ++i) {
                let id = this._model.huashenIds[i];
                if (id == curId) {
                    this._model.huashenIds[i] = this._model.huashenIds[0];
                    break;
                }
            }
            this._model.huashenIds[0] = curId;
            this._model.lastHuashenId = curId;
        }

        /**获取上阵的外显*/
        public getPosIndex(headType: number, pos: number): number {
            let posList = this.getPosList(headType);
            for (let info of posList) {
                if (info.pos == pos) {
                    return info.unitid;
                }
            }
            return 0;
        }

        /**获取可上阵的外显，不包含当前已上阵的外显*/
        public getCanBattleInfos(headType: number): ride_item[] {
            let infos = this.getSurfaceListInfo(headType);
            let tmpInfos: ride_item[] = [];
            for (let info of infos) {
                if (this.isBattle(headType, info.index)) {
                    continue;
                }
                tmpInfos.push(info);
            }
            return tmpInfos;
        }

        /**部位是否可上阵*/
        public canPosBattle(headType: number): boolean {
            let infos = this.getCanBattleInfos(headType);
            return infos && infos.length > 0;
        }

        /**部位可上阵红点*/
        private getPosBattleHint(headType: number, pos: number, limit: number): boolean {
            let isOpen = RoleUtil.isLimitOpen([CommonLimitType.God, limit]);
            if (!isOpen) {
                return false;//未开启
            }
            let index = this.getPosIndex(headType, pos);
            if (index) {
                return false;//已上阵
            }
            return this.canPosBattle(headType);
        }

        private updateBattleHint(headType: number): void {
            if (!this.checkOpen(headType)) {
                return;
            }
            let hintType = this._model.battleHints[headType];
            if (!hintType) {
                return;
            }
            let hint = false;
            let indexStr = SurfaceConfigList[headType] + "_battle_open";
            let cfg: ParamConfig = GameConfig.getParamConfigById(indexStr);
            let datas: number[] = cfg.value;//仙力开启条件
            for (let i = 0; i < datas.length; ++i) {
                let limit = datas[i];//仙力
                let pos = i + 1;
                if (this.getPosBattleHint(headType, pos, limit)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, hintType);
        }

        public getBattleHint(headType: number): string[] {
            return this._model.battleHints[headType];
        }

        /**外显激活数量*/
        public getSurfaceActCnt(headType: number): number {
            let cnt = 0;
            let infos = this.getSurfaceListInfo(headType);
            for (let i = 0; i < infos.length; ++i) {
                let info = infos[i];
                if (info.star > 0) {
                    cnt++;
                }
            }
            return cnt;
        }

    }

    export interface ITianshenEquip {
        type: number;       // 类型，1~4
        pos: number;        // 部位，1~8
        step: number;       // 阶级， 1~
        cfg: YuanlingZhuangbeiConfig;
        eqp: yuanling_equip_data;
        hint?: boolean
    }

    export interface ITianshenSuit {
        type: number;       // 类型，1~4
        step: number;       // 阶级， 1~
        cfg: YuanlingTaozhuangConfig;
        suit: yuanling_equip_suit;
        hint?: boolean
    }

}