namespace game.mod.more {

    import c2s_huanjin_oper = msg.c2s_huanjin_oper;
    import GameNT = base.GameNT;
    import s2c_update_huanjin_info = msg.s2c_update_huanjin_info;
    import HuanjinParamConfig = config.HuanjinParamConfig;
    import HuanjinStageConfig = game.config.HuanjinStageConfig;
    import HuanjinStarConfig = game.config.HuanjinStarConfig;
    import huanjin_star_data = msg.huanjin_star_data;
    import HuanjinHuanlingConfig = game.config.HuanjinHuanlingConfig;
    import HuanjinZushenConfig = game.config.HuanjinZushenConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import s2c_huanjin_attr_update = msg.s2c_huanjin_attr_update;

    /**
     * @description 幻境系统
     */
    export class HuanjingProxy extends ProxyBase implements IHuanjingProxy {
        private _model: HuanjingModel;

        initialize(): void {
            super.initialize();
            this._model = new HuanjingModel();
            this.onProto(s2c_update_huanjin_info, this.s2c_update_huanjin_info, this);
            this.onProto(s2c_huanjin_attr_update, this.s2c_huanjin_attr_update, this);

            facade.onNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO, this.onUpdateFuchenlinghuInfo, this);
            facade.onNt(ShenLingEvent.ON_SHEN_LING_REWARD_UPDATE, this.onUpdateShenlingShenjiInfo, this);
        }

        /**
         * 激活升阶升星等操作
         * @param systemId
         * @param oper 1.祭炼2.天星槽位升星3.天星激活4.幻灵升阶5.幻灵技能激活6.驻神进阶
         * @param pos 槽位(2,4,5,6)
         * @param place 技能槽位(5)
         */
        public c2s_huanjin_oper(systemId: number, oper: number, pos?: number, place?: number): void {
            let msg = new c2s_huanjin_oper();
            msg.system_id = systemId;
            msg.oper = oper;
            if (pos) {
                msg.pos = pos;
            }
            if (place) {
                msg.place = place;
            }
            this.sendProto(msg);
        }

        private s2c_update_huanjin_info(n: GameNT): void {
            let msg = n.body as s2c_update_huanjin_info;
            if (msg != null) {
                let lastInfo = this.getSystemInfo(msg.system_id);//上次数据缓存
                let lastStageLv = lastInfo && lastInfo.jilian_level || 0;//上次进阶等级

                this._model.infoMap[msg.system_id] = msg;

                let curStageLv = this.getStageLv(msg.system_id);//当前进阶等级
                this.checkBreakthrough(msg.system_id, lastInfo != null, lastStageLv, curStageLv);
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_HUANJING_INFO);
        }

        private s2c_huanjin_attr_update(n: GameNT): void {
            let msg = n.body as s2c_huanjin_attr_update;
            if (msg != null) {
                this._model.attrMap[msg.system_id] = msg;
            }
            this.updateHint();
            this.sendNt(MoreEvent.ON_UPDATE_HUANJING_ATTR);
        }

        //检查突破弹窗
        private checkBreakthrough(systemId: number, isCheck: boolean, lastStageLv: number, curStageLv: number): void {
            if (!isCheck || lastStageLv == curStageLv) {
                return;
            }
            let skillId = this.getStageSkill(systemId);
            let lastStage = Math.floor(Math.max(lastStageLv - 1, 0) / 10) % 10;//上一阶
            let curStage = Math.floor(Math.max(curStageLv - 1, 0) / 10) % 10;//当前阶
            let lastStageCfg = this.getStageCfg(systemId, (lastStage - 1) * 10 + 1);
            let curStageCfg = this.getStageCfg(systemId, curStage * 10 + 1);
            let lastDesc = '';
            if (lastStageCfg && lastStageCfg.attr_id) {
                let attr = RoleUtil.getAttr(lastStageCfg.attr_id);//界面上会显示下阶属性，所以已经请求过了
                lastDesc = TextUtil.getAttrTextInfos(attr, 0x55ff63, '\n', ' +', 0xfcf6d1).join('\n');
            }
            let curDesc = '';
            if (curStageCfg && curStageCfg.attr_id) {
                let attr = RoleUtil.getAttr(curStageCfg.attr_id);//界面上会显示下阶属性，所以已经请求过了
                curDesc = TextUtil.getAttrTextInfos(attr, 0x55ff63, '\n', ' +', 0xfcf6d1).join('\n');
            }
            if (lastStage != curStage) {
                ViewMgr.getIns().showBreakthroughTips(skillId, curStage, lastDesc, curDesc);
            }
        }

        /**====================协议end====================*/

        //功能是否开启
        public checkSystemOpen(systemId: number, isTips = false): boolean {
            let cfg = this.getHuanjingParamCfg(systemId);
            return cfg && ViewMgr.getIns().checkViewOpen(cfg.open_id, isTips);
        }

        //全部功能配置
        public getHuanjingParamCfgs(): HuanjinParamConfig[] {
            return getConfigListByName(ConfigName.HuanJingParam);
        }

        //某功能配置
        public getHuanjingParamCfg(systemId: number): HuanjinParamConfig {
            return getConfigByNameId(ConfigName.HuanJingParam, systemId);
        }

        //进阶配置
        public getStageCfg(systemId: number, stageLv?: number): HuanjinStageConfig {
            if (stageLv == undefined) {
                stageLv = this.getStageLv(systemId);//不传则用当前等级
            }
            let cfgObj = getConfigByNameId(ConfigName.HuanJingStage, systemId);
            return cfgObj ? cfgObj[stageLv] : null;
        }

        //升星配置
        public getStarCfg(systemId: number, pos: number, star: number): HuanjinStarConfig {
            let cfgObj = getConfigByNameId(ConfigName.HuanJingStar, systemId);
            if (!cfgObj) {
                return null;
            }
            let buildId = pos * 10000 + star;
            return cfgObj[buildId];
        }

        //幻灵配置
        public getHuanlingCfg(systemId: number, type: number, lv: number): HuanjinHuanlingConfig {
            let cfgObj = getConfigByNameId(ConfigName.HuanJingHuanLing, systemId);
            if (!cfgObj) {
                return null;
            }
            let buildId = type * 10000 + lv;
            return cfgObj[buildId];
        }

        //驻神配置
        public getZhushenCfg(systemId: number, pos: number, lv: number): HuanjinZushenConfig {
            let cfgObj = getConfigByNameId(ConfigName.HuanJingZuShen, systemId);
            if (!cfgObj) {
                return null;
            }
            let buildId = pos * 10000 + lv;
            return cfgObj[buildId];
        }

        //功能数据
        public getSystemInfo(systemId: number): s2c_update_huanjin_info {
            return this._model.infoMap[systemId];
        }

        //属性汇总数值
        public getSystemAttr(systemId: number): s2c_huanjin_attr_update {
            return this._model.attrMap[systemId];
        }

        //获取属性汇总的数值
        public getAttr(systemId: number): number {
            let attr = this.getSystemAttr(systemId);
            return attr && attr.value || 0;
        }

        //进阶祭炼等级
        public getStageLv(systemId: number): number {
            let info = this.getSystemInfo(systemId);
            return info && info.jilian_level || 0;
        }

        //进阶祭炼等级转换成阶数
        public getStageNum(systemId: number): number {
            let lv = this.getStageLv(systemId);
            return Math.floor(Math.max(lv - 1, 0) / 10) % 10;
        }

        //进阶技能
        public getStageSkill(systemId: number): number {
            let cfg = this.getHuanjingParamCfg(systemId);
            return cfg && cfg.stage_skill || 0;
        }

        //最大进阶等级
        public getMaxStageLv(systemId: number): number {
            if (this._model.stageLvMap[systemId]) {
                return this._model.stageLvMap[systemId];
            }
            let cfgObj: { [level: number]: HuanjinStageConfig } = getConfigByNameId(ConfigName.HuanJingStage, systemId);
            if (!cfgObj) {
                return 0;
            }
            return this._model.stageLvMap[systemId] = Object.keys(cfgObj).length;
        }

        //是否已达最大进阶等级
        public isMaxStageLv(systemId: number): boolean {
            let curStageLv = this.getStageLv(systemId);
            let maxStageLv = this.getMaxStageLv(systemId);
            return curStageLv >= maxStageLv;
        }

        //能否进阶
        public canUpStage(systemId: number, isTips = false): boolean {
            if (this.isMaxStageLv(systemId)) {
                return false;
            }
            let cfg = this.getStageCfg(systemId, this.getStageLv(systemId) + 1);
            if (!cfg || !cfg.cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //外显激活数量
        public getSurfaceActedNum(systemId: number): number {
            let cfg = this.getHuanjingParamCfg(systemId);
            if (!cfg || !cfg.outlook) {
                return 0;
            }
            let cnt = 0;
            for (let id of cfg.outlook) {
                if (SurfaceUtil.isAct(id)) {
                    cnt++;
                }
            }
            return cnt;
        }

        //打开养成界面
        public canOpenGrow(systemId: number, isTips = false): boolean {
            if (!this.checkSystemOpen(systemId, isTips)) {
                return false;
            }
            let cfg = this.getHuanjingParamCfg(systemId);
            let num = this.getSurfaceActedNum(systemId);
            if (num < 1) {
                if (isTips) {
                    let str = StringUtil.substitute(getLanById(LanDef.huanjing_tips13), [cfg.name]);
                    PromptBox.getIns().show(str);
                }
                return false;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.HuanjingGrowMain, [HuanjingGrowMainBtnType.Btn1, systemId]);
            return true;
        }

        //天星等级
        public getStarLv(systemId: number): number {
            let info = this.getSystemInfo(systemId);
            return info && info.tianxing_level || 0;
        }

        //星数据
        public getStarList(systemId: number): huanjin_star_data[] {
            let info = this.getSystemInfo(systemId);
            return info && info.star_list || [];
        }

        //升星槽位数据
        public getStarPosData(systemId: number, pos: number): huanjin_star_data {
            let list = this.getStarList(systemId);
            for (let item of list) {
                if (item && item.pos == pos) {
                    return item;
                }
            }
            return null;
        }

        //槽位配置最大星级
        public getStarPosMax(systemId: number, pos: number): number {
            let posMap = this._model.starPosMap;
            if (posMap && posMap[systemId] && posMap[systemId][pos]) {
                return posMap[systemId][pos];
            }
            let map = this._model.starPosMap[systemId] = {};
            let cfgObj = getConfigByNameId(ConfigName.HuanJingStar, systemId);
            for (let key in cfgObj) {
                let cfg = cfgObj[+key] as HuanjinStarConfig;
                let curPos = Math.floor(cfg.index / 10000) % 10;
                if (!map[curPos]) {
                    map[curPos] = 0;
                }
                map[curPos]++;
            }
            return map[pos];
        }

        //升星槽位是否达到最大星级
        public isStarPosMax(systemId: number, pos: number): boolean {
            let info = this.getStarPosData(systemId, pos);
            let star = info && info.star || 0;
            let maxStar = this.getStarPosMax(systemId, pos);
            return star >= maxStar;
        }

        //槽位可激活或升星
        public canActOrUpStarPos(systemId: number, pos: number, isTips = false): boolean {
            if (this.isStarPosMax(systemId, pos)) {
                return false;
            }
            let info = this.getStarPosData(systemId, pos);
            let star = info && info.star || 0;
            let cfg = this.getStarCfg(systemId, pos, star + 1);
            if (!cfg || !cfg.cost) {
                return false;
            }
            for (let item of cfg.cost) {
                if (!BagUtil.checkPropCnt(item[0], item[1], isTips ? PropLackType.Dialog : PropLackType.None)) {
                    return false;
                }
            }
            return true;
        }

        //天星阶数可激活或升星
        public canActOrUpStar(systemId: number, isTips = false): boolean {
            if (this.isMaxStarLv(systemId)) {
                return false;
            }
            let starLv = this.getStarLv(systemId);
            let actNum = this.getStarActNum(systemId, starLv + 1);
            let totalNum = this.getHuanjingParamCfg(systemId).star_max_pos;
            if (actNum < totalNum) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.tiaojianbuzu));
                }
                return false;
            }
            return true;
        }

        //天星配置最大等级
        public getMaxStarLv(systemId: number): number {
            let cfg = this.getHuanjingParamCfg(systemId);
            return cfg && cfg.star_buff ? cfg.star_buff.length : 0;
        }

        //天星等级已达最高
        public isMaxStarLv(systemId: number): boolean {
            return this.getStarLv(systemId) >= this.getMaxStarLv(systemId);
        }

        //满足星级的数量
        public getStarActNum(systemId: number, starLv: number): number {
            let info = this.getSystemInfo(systemId);
            if (!info || !info.star_list) {
                return 0;
            }
            let cnt = 0;
            for (let item of info.star_list) {
                if (item && item.star >= starLv) {
                    cnt++;
                }
            }
            return cnt;
        }

        //幻灵配置的最大阶数
        public getHuanlingMaxStage(systemId: number, type: number): number {
            let stageMap = this._model.huanlingMaxStageMap;
            if (stageMap && stageMap[systemId] && stageMap[systemId][type]) {
                return stageMap[systemId][type];
            }
            let map = this._model.huanlingMaxStageMap[systemId] = {};
            let cfgObj = getConfigByNameId(ConfigName.HuanJingHuanLing, systemId);
            for (let key in cfgObj) {
                let cfg = cfgObj[+key] as HuanjinHuanlingConfig;
                let curType = Math.floor(cfg.index / 10000) % 10;
                if (!map[curType]) {
                    map[curType] = 0;
                }
                map[curType]++;
            }
            return map[type];
        }

        //幻灵已达最大阶数
        public isHuanlingMaxStage(systemId: number, type: number): boolean {
            let info = this.getHuanlingInfo(systemId, type);
            let stage = info && info.stage || 0;
            let maxStage = this.getHuanlingMaxStage(systemId, type);
            return stage >= maxStage;
        }

        //幻灵数据
        public getHuanlingList(systemId: number): msg.huanjin_huanling_data[] {
            let info = this.getSystemInfo(systemId);
            return info && info.huanling_list || [];
        }

        //某类型的幻灵数据
        public getHuanlingInfo(systemId: number, type: number): msg.huanjin_huanling_data {
            let list = this.getHuanlingList(systemId);
            for (let item of list) {
                if (item && item.type == type) {
                    return item;
                }
            }
            return null;
        }

        //某类型的幻灵技能
        public getHuanlingSkillInfo(systemId: number, type: number, pos: number): msg.huanjin_skill_data {
            let list = this.getHuanlingInfo(systemId, type);
            if (!list || !list.skill_list) {
                return null;
            }
            for (let item of list.skill_list) {
                if (item && item.pos == pos) {
                    return item;
                }
            }
            return null;
        }

        //幻灵被动技能条件
        public getHuanlingSkillData(systemId: number, type: number, pos: number): number[] {
            let skillMap = this._model.huanlingSkillMap;
            if (skillMap && skillMap[systemId] && skillMap[systemId][type] && skillMap[systemId][type][pos]) {
                return skillMap[systemId][type][pos];
            }
            let cfg = this.getHuanjingParamCfg(systemId);
            if (!cfg || !cfg.huanling_skill) {
                return [];
            }
            let map = this._model.huanlingSkillMap[systemId] = {};
            for (let item of cfg.huanling_skill) {
                let curType = item[0];
                if (!map[curType]) {
                    map[curType] = {};
                }
                map[curType][item[1]] = item;
            }
            if (map && map[type] && map[type][pos]) {
                return map[type][pos];
            }
            return [];
        }

        //幻灵特殊属性id
        public getHuanlingSpecialId(systemId: number, type: number, pos: number): number {
            let cfg = this.getHuanjingParamCfg(systemId);
            for (let item of cfg.huanling_spe_id) {
                let curType = item[0];
                if (curType != type) {
                    continue;
                }
                if (item[1] == pos) {
                    return item[2];
                }
            }
            return 0;
        }

        //幻灵激活或升星
        public canHuanling(systemId: number, type: number, isTips = false): boolean {
            let isMax = this.isHuanlingMaxStage(systemId, type);
            if (isMax) {
                if (isTips) {
                    PromptBox.getIns().show(getLanById(LanDef.huanjing_tips11));
                }
                return false;
            }
            let info = this.getHuanlingInfo(systemId, type);
            let stage = info && info.stage || 0;
            let cfg = this.getHuanlingCfg(systemId, type, stage + 1);
            if (!cfg || !cfg.cost) {
                return false;
            }
            return BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //幻灵技能能否激活
        public canHuanlingSkillAct(systemId: number, type: number, pos: number): boolean {
            let posInfo = this.getHuanlingSkillInfo(systemId, type, pos);
            if (posInfo) {
                return false;
            }
            let info = this.getHuanlingInfo(systemId, type);
            let stage = info && info.stage || 0;
            let skillAry = this.getHuanlingSkillData(systemId, type, pos);
            return stage >= skillAry[2];
        }

        //幻灵红点
        public getHuanlingHintByType(systemId: number, type: number): boolean {
            if (this.canHuanling(systemId, type)) {
                return true;
            }
            for (let i = 1; i <= 4; i++) {
                if (this.canHuanlingSkillAct(systemId, type, i)) {
                    return true;
                }
            }
            return false;
        }

        //幻灵最高阶
        public getHuanlingStageMax(systemId: number): number {
            let list = this.getHuanlingList(systemId);
            let max = 0;
            for (let item of list) {
                max = Math.max(max, item.stage);
            }
            return max;
        }

        //驻神技能数据
        public getZhushenList(systemId: number): msg.huanjin_star_data[] {
            let info = this.getSystemInfo(systemId);
            return info && info.zushen_list || [];
        }

        //某驻神技能数据
        public getZhushenInfo(systemId: number, pos: number): msg.huanjin_star_data {
            let list = this.getZhushenList(systemId);
            for (let item of list) {
                if (item && item.pos == pos) {
                    return item;
                }
            }
            return null;
        }

        //驻神阶数
        public getZhushenStageLv(systemId: number): number {
            let list = this.getZhushenList(systemId);
            if (!list || list.length < 4) {
                return 0;
            }
            let stage = Number.MAX_SAFE_INTEGER;
            for (let item of list) {
                stage = Math.min(item.star, stage);
            }
            return stage;
        }

        //驻神技能配置的最大等级
        public getZhushenSkillMaxLv(systemId: number, pos: number): number {
            let lvMap = this._model.zhushenSkillLvMap;
            if (lvMap && lvMap[systemId] && lvMap[systemId][pos]) {
                return lvMap[systemId][pos];
            }
            let cfgObj = getConfigByNameId(ConfigName.HuanJingZuShen, systemId);
            let map = this._model.zhushenSkillLvMap[systemId] = {};
            for (let key in cfgObj) {
                let cfg = cfgObj[+key] as HuanjinZushenConfig;
                let curPos = Math.floor(cfg.index / 10000) % 10;
                if (!map[curPos]) {
                    map[curPos] = 0;
                }
                map[curPos]++;
            }
            return map[pos] || 0;
        }

        //驻神技能是否达到最大等级
        public isZhushenSkillMax(systemId: number, pos: number): boolean {
            let info = this.getZhushenInfo(systemId, pos);
            let lv = info && info.star || 0;
            let maxLv = this.getZhushenSkillMaxLv(systemId, pos);
            return lv >= maxLv;
        }

        //驻神技能激活或升级
        public canActOrUpZhushen(systemId: number, pos: number, isTips = false): boolean {
            if (this.isZhushenSkillMax(systemId, pos)) {
                return false;
            }
            let info = this.getZhushenInfo(systemId, pos);
            let lv = info && info.star || 0;
            let cfg = this.getZhushenCfg(systemId, pos, lv + 1);
            return cfg && cfg.cost && BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1], isTips ? PropLackType.Dialog : PropLackType.None);
        }

        //驻神最大星级
        public getZhushenStarMax(systemId: number): number {
            let list = this.getZhushenList(systemId);
            let max = 0;
            for (let item of list) {
                max = Math.max(max, item.star);
            }
            return max;
        }

        //养成界面战力
        public getGrowAttr(systemId: number): msg.attributes {
            let info = this.getSystemInfo(systemId);
            let attr = new msg.attributes();
            if (!info) {
                return attr;
            }
            let attrIdList: number[] = [];
            //进阶
            let stageLv = this.getStageLv(systemId);
            let stageCfg = this.getStageCfg(systemId, stageLv);
            if (stageCfg && stageCfg.attr_id) {
                attrIdList.push(stageCfg.attr_id);
            }
            //升星
            let starList = this.getStarList(systemId);
            for (let item of starList) {
                if (item && item.star) {
                    let starCfg = this.getStarCfg(systemId, item.pos, item.star);
                    if (starCfg && starCfg.attr_id) {
                        attrIdList.push(starCfg.attr_id);
                    }
                }
            }
            //幻灵
            let huanlingList = this.getHuanlingList(systemId);
            for (let item of huanlingList) {
                if (item && item.stage) {
                    let huanlingCfg = this.getHuanlingCfg(systemId, item.type, item.stage);
                    if (huanlingCfg && huanlingCfg.attr_id) {
                        attrIdList.push(huanlingCfg.attr_id);
                    }
                }
            }
            //驻神
            let zhushenList = this.getZhushenList(systemId);
            for (let item of zhushenList) {
                if (item && item.star) {
                    let zhushenCfg = this.getZhushenCfg(systemId, item.pos, item.star);
                    if (zhushenCfg && zhushenCfg.attr_id) {
                        attrIdList.push(zhushenCfg.attr_id);
                    }
                }
            }
            let attrList = RoleUtil.getAttrList(attrIdList);
            return TextUtil.calcAttrList(attrList);
        }

        /**======================== hint start ========================*/

        public get mainHintPath(): string[] {
            return this._model.mainHintPath;
        }

        //此路径不可直接使用，需要拼接不同的systemId
        public get growHintPath(): string[] {
            return this._model.growHintPath;
        }

        //此路径不可直接使用，需要拼接不同的systemId
        public get collectHintPath(): string[] {
            return this._model.collectHintPath;
        }

        //进阶红点
        public getStageHint(systemId: number): boolean {
            return this.canUpStage(systemId);
        }

        //升星红点
        public getStarHint(systemId: number): boolean {
            if (this.canActOrUpStar(systemId)) {
                return true;
            }
            let cfg = this.getHuanjingParamCfg(systemId);
            for (let i = 1; i <= cfg.star_max_pos; i++) {
                if (this.canActOrUpStarPos(systemId, i)) {
                    return true;
                }
            }
            return false;
        }

        //幻灵红点
        public getHuanlingHint(systemId: number): boolean {
            for (let i = 0; i < ShenLingTypeAry.length; i++) {
                if (this.getHuanlingHintByType(systemId, i + 1)) {
                    return true;
                }
            }
            return false;
        }

        //驻神红点
        public getZhushenHint(systemId: number): boolean {
            let cfg = this.getHuanjingParamCfg(systemId);
            if (!cfg || !cfg.zushen_skill) {
                return false;
            }
            for (let i = 0; i < cfg.zushen_skill.length; i++) {
                if (this.canActOrUpZhushen(systemId, i + 1)) {
                    return true;
                }
            }
            return false;
        }

        //养成界面红点路径
        public getGrowHintPath(systemId: number): string[] {
            return [...this._model.growHintPath, systemId + ''];
        }

        //养成界面红点
        public getGrowHint(systemId: number): boolean {
            if (!this.checkSystemOpen(systemId)) {
                return false;
            }
            //至少有一个外显激活才可以
            if (this.getSurfaceActedNum(systemId) < 1) {
                return false;
            }
            return this.getStageHint(systemId)
                || this.getStarHint(systemId)
                || this.getHuanlingHint(systemId)
                || this.getZhushenHint(systemId);
        }

        //收集界面红点路径
        public getCollectHintPath(systemId: number): string[] {
            return [...this._model.collectHintPath, systemId + ''];
        }

        //收集界面的外显激活或升星
        public getSurfaceHint(systemId: number): boolean {
            let cfg = this.getHuanjingParamCfg(systemId);
            if (!cfg || !cfg.outlook) {
                return false;
            }
            for (let id of cfg.outlook) {
                if (this.getSurfaceSingleHint(id)) {
                    return true;
                }
            }
            return false;
        }

        //单个外显红点
        public getSurfaceSingleHint(id: number): boolean {
            let hint = SurfaceUtil.canUpStar(id, true);
            if (hint) {
                return hint;
            }
            let headType = PropData.getPropParse(id);
            if (headType == ConfigHead.Shenling) {
                return this.getShenlingShenjiHint(id);
            }
            let surfaceProxy: ISurfaceProxy = getProxy(ModName.Surface, ProxyType.Surface);
            return surfaceProxy.getSurfacePerHint(getConfigById(id));
        }

        //神灵神迹红点
        public getShenlingShenjiHint(id: number): boolean {
            let headType = PropData.getPropParse(id);
            if (headType == ConfigHead.Shenling) {
                let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let rewardHint = shenlingProxy ? shenlingProxy.getShenJiRewardHint(id) : false;
                if (rewardHint) {
                    return true;
                }
            }
            return false;
        }

        //获取红点（不包含浮尘灵壶、幻境榜、幻境之海，可供外部使用）todo
        public getHintBySystemId(systemId: number): boolean {
            if (!this.checkSystemOpen(systemId)) {
                return false;
            }
            return this.getGrowHint(systemId) || this.getSurfaceHint(systemId);
        }

        //收集界面红点（包含养成界面红点、浮尘灵壶等）
        public getCollectHint(systemId: number): boolean {
            if (!this.checkSystemOpen(systemId)) {
                return false;
            }
            return this.getGrowHint(systemId) || this.getSurfaceHint(systemId)
                || this.getFuchenlinghuHint() || this.getSeaRankHint() || this.getSeaMainHint();
        }

        //养成红点
        private updateGrowHint(): void {
            let cfgs = this.getHuanjingParamCfgs();
            for (let cfg of cfgs) {
                if (!this.checkSystemOpen(cfg.system_id)) {
                    continue;
                }

                let growHintPath = this.getGrowHintPath(cfg.system_id);
                let growHint = this.getGrowHint(cfg.system_id);
                HintMgr.setHint(growHint, growHintPath);
            }
        }

        //收集红点
        private updateCollectHint(): void {
            let cfgs = this.getHuanjingParamCfgs();
            for (let cfg of cfgs) {
                if (!this.checkSystemOpen(cfg.system_id)) {
                    continue;
                }

                let collectHintPath = this.getCollectHintPath(cfg.system_id);
                let collectHint = this.getCollectHint(cfg.system_id);
                HintMgr.setHint(collectHint, collectHintPath);
            }
        }

        private updateHint(): void {
            this.updateGrowHint();
            this.updateCollectHint();
        }

        //外显表头
        private getOutlookHeadType(): number[] {
            if (this._model.headTypes && this._model.headTypes.length) {
                return this._model.headTypes;
            }
            let cfgs = this.getHuanjingParamCfgs();
            let headTypes: number[] = [];
            for (let cfg of cfgs) {
                if (cfg.outlook) {
                    for (let item of cfg.outlook) {
                        let type = PropData.getPropParse(item);
                        if (headTypes.indexOf(type) < 0) {
                            headTypes.push(type);
                        }
                    }
                }
            }
            return this._model.headTypes = headTypes;
        }

        //神灵id
        private getShenlingIds(): number[] {
            if (this._model.shenlingIds && this._model.shenlingIds.length) {
                return this._model.shenlingIds;
            }
            let ids: number[] = [];
            let cfgs = this.getHuanjingParamCfgs();
            for (let cfg of cfgs) {
                if (!cfg || !cfg.outlook) {
                    continue;
                }
                for (let id of cfg.outlook) {
                    let head = PropData.getPropParse(id);
                    if (head == ConfigHead.Shenling && ids.indexOf(id) < 0) {
                        ids.push(id);
                    }
                }
            }
            return this._model.shenlingIds = ids;
        }

        //神灵激活、升星、觉醒升星，刷新
        protected onShenlingInfoUpdate(): void {
            let headTypes = this.getOutlookHeadType();
            if (headTypes.indexOf(ConfigHead.Shenling) > -1) {
                let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
                let actedList = shenlingProxy.getActedList();
                let shenlingIds = this.getShenlingIds();
                for (let id of shenlingIds) {
                    if (actedList.indexOf(id) > -1) {
                        this.updateHint();
                    }
                }
            }
        }

        //外显激活，刷新
        protected onSurfaceInfoUpdate(n: GameNT): void {
            let type: number = n.body;
            let headTypes = this.getOutlookHeadType();
            if (headTypes.indexOf(type) > -1) {
                this.updateHint();
            }
        }

        //消耗道具id
        public getCostIndexs(): number[] {
            if (this._model.costIndexs && this._model.costIndexs.length) {
                return this._model.costIndexs;
            }
            let costIndexs: number[] = [];
            let cfgs = this.getHuanjingParamCfgs();
            for (let cfg of cfgs) {
                let systemId = cfg.system_id;
                //进阶
                let stageCfg = this.getStageCfg(systemId, 1);
                if (stageCfg && stageCfg.cost && costIndexs.indexOf(stageCfg.cost[0]) < 0) {
                    costIndexs.push(stageCfg.cost[0]);
                }
                //升星
                for (let i = 1; i <= cfg.star_max_pos; i++) {
                    let starCfg = this.getStarCfg(systemId, i, 1);
                    if (starCfg && starCfg.cost) {
                        for (let costItem of starCfg.cost) {
                            if (costIndexs.indexOf(costItem[0]) < 0) {
                                costIndexs.push(costItem[0]);
                            }
                        }
                    }
                }
                //幻灵
                for (let i = 1; i <= ShenLingTypeAry.length; i++) {
                    let huanlingCfg = this.getHuanlingCfg(systemId, i, 1);
                    if (huanlingCfg && huanlingCfg.cost && costIndexs.indexOf(huanlingCfg.cost[0]) < 0) {
                        costIndexs.push(huanlingCfg.cost[0]);
                    }
                }
                //驻神
                for (let i = 1; i <= cfg.zushen_skill.length; i++) {
                    let zhushenCfg = this.getZhushenCfg(systemId, i, 1);
                    if (zhushenCfg && zhushenCfg.cost && costIndexs.indexOf(zhushenCfg.cost[0]) < 0) {
                        costIndexs.push(zhushenCfg.cost[0]);
                    }
                }
            }
            this._model.costIndexs = costIndexs;
            return costIndexs;
        }

        protected onBagUpdateByPropIndex(n: GameNT) {
            let indexs = n.body as number[];
            let costIndexs = this.getCostIndexs();
            let shenlingCost = this.getShenlingStarCost();
            for (let idx of indexs) {
                if ((costIndexs && costIndexs.indexOf(idx) > -1)
                    || (shenlingCost && shenlingCost.indexOf(idx) > -1)) {
                    this.updateHint();
                    break;
                }
            }

            //浮尘灵壶红点
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Fuchenlinghu)) {
                let fuchenlinghuProxy: IFuchenlinghuProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Fuchenlinghu);
                let costIds = fuchenlinghuProxy ? fuchenlinghuProxy.getCostIds() : [];
                for (let idx of indexs) {
                    if (costIds && costIds.indexOf(idx) > -1) {
                        this.updateCollectHint();
                    }
                }
            }
        }

        protected onRoleUpdate(n: GameNT) {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.gold) > -1) {
                this.updateHint();
            }
        }

        protected onBagUpdateByPropTypeAndSubType(n: GameNT) {
            let list: { [type: number]: number[] } = n.body;
            //5种，神灵，坐骑，羽翼，神兵，时装（策划确定的5种类型）
            for (let key in list) {
                let propType = +key;
                let types = list[propType];
                if (propType == PropType.Surface) {
                    let subTypes11 = [PropSubType11.Horse, PropSubType11.Shenling, PropSubType11.Weapon, PropSubType11.Wing, PropSubType11.Body];
                    for (let subType of types) {
                        if (subTypes11.indexOf(subType) > -1) {
                            this.updateCollectHint();
                            break;
                        }
                    }
                } else if (propType == PropType.Lianshendan) {
                    let subType17 = [PropSubType17.Horse, PropSubType17.Wing, PropSubType17.Weapon, PropSubType17.Body];
                    for (let subType of types) {
                        if (subType17[subType]) {
                            this.updateCollectHint();
                            break;
                        }
                    }
                }
            }
        }

        //神灵升星和觉醒消耗
        private getShenlingStarCost(): number[] {
            if (this._model.shenlingStarCost && this._model.shenlingStarCost.length) {
                return this._model.shenlingStarCost;
            }
            let starCost: number[] = [];
            let shenlingIds = this.getShenlingIds();
            let shenlingProxy: IShenLingProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            for (let id of shenlingIds) {
                let cfgObj = shenlingProxy.getStarCfgList(id);
                if (cfgObj[1]) {
                    let cost = cfgObj[1].star_consume[0];
                    if (cost && starCost.indexOf(cost[0]) < 0) {
                        starCost.push(cost[0]);
                    }
                }
                if (cfgObj[6] && cfgObj[6].star_consume) {
                    for (let cost of cfgObj[6].star_consume) {
                        if (starCost.indexOf(cost[0]) < 0) {
                            starCost.push(cost[0]);
                        }
                    }
                }
            }
            this._model.shenlingStarCost = starCost;
            return starCost;
        }

        protected onSeaInfoUpdate(n: GameNT) {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea)) {
                return;//功能未开启
            }
            this.updateHint();
        }

        //浮尘灵壶红点
        public getFuchenlinghuHint(): boolean {
            return HintMgr.getHint([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu]);
        }

        //幻境之海排行榜红点
        public getSeaRankHint(type?: SeaType): boolean {
            let seaProxy: ISeaProxy = facade.retMod(ModName.Yijie).retProxy(ProxyType.Sea);
            if (type != undefined) {
                let hintPath = seaProxy.getRankHintType(type);
                return HintMgr.getHint(hintPath);
            }
            let hint = false;
            for (let type of SeaTypeAry) {
                if (HintMgr.getHint(seaProxy.getRankHintType(type))) {
                    hint = true;
                    break;
                }
            }
            return hint;
        }

        //幻境之海红点 todo 幻境之海也耦合了幻境系统的红点，不能使用红点路径获取
        public getSeaMainHint(): boolean {
            return HintMgr.getHint([ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea]);
        }

        //浮尘灵壶红点
        private onUpdateFuchenlinghuInfo(): void {
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Fuchenlinghu)) {
                this.updateCollectHint();
            }
        }

        //神灵神迹红点
        private onUpdateShenlingShenjiInfo(): void {
            if (ViewMgr.getIns().checkViewOpen(OpenIdx.Shenling)) {
                this.updateCollectHint();
            }
        }

        /**======================== hint end ========================*/
    }
}