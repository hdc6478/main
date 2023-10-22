declare namespace game.mod.shenling {
    import attributes = msg.attributes;
    class ShenLingLingQiTipsMdr extends EffectMdrBase {
        protected _view: ShenLingLingQiTipsView;
        protected _proxy: ShenLingLingQiProxy;
        _showArgs: IShenLingLingQiIconData;
        protected _baseAttrIds: number[];
        protected _fengyinAttrIds: number[];
        protected _suitAttrIds: number[];
        protected _suitBuffIds: number[];
        protected _costCnt: number;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected onClickBtn(): void;
        protected onceCallBack(): void;
        protected updateView(): void;
        protected updateTopView(): void;
        protected updateMiddleView(): void;
        protected updateBottomView(): void;
        protected onUpdateAttr(): void;
        protected updateSuitView(): void;
        protected updatePower(power: number): void;
        protected updateFengyinPower(power: number): void;
        protected updateBaseAttr(attr: attributes): void;
        protected updateFengyinAttr(attr: attributes): void;
        protected updateSuitAttrBuff(): void;
    }
}
declare namespace game.mod.shenling {
    class ShenLingLingQiIcon extends BaseListenerRenderer {
        icon: game.mod.Icon;
        redPoint: eui.Image;
        gr_star: eui.Group;
        lb_starcnt: eui.Label;
        starView: game.mod.StarListView;
        data: IShenLingLingQiIconData;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private updateStarView;
        private onClick;
    }
    interface IShenLingLingQiIconData {
        slIndex: number;
        index: number;
        idx: number;
        hint: boolean;
        isAct: boolean;
        star: number;
    }
}
declare namespace game.mod.shenling {
    import GameNT = base.GameNT;
    import ShenlingLingqiConfig = game.config.ShenlingLingqiConfig;
    import god_brother_lingqi_sturct = msg.god_brother_lingqi_sturct;
    /**
     * @description 神灵灵器系统
     */
    class ShenLingLingQiProxy extends ProxyBase {
        private _model;
        readonly model: ShenLingLingQiModel;
        initialize(): void;
        /**
         * @param button_type 1为指定激活/升星   2为一键激活/升星
         * @param bro_index 神灵index
         * @param index 灵器索引 1,2,3
         */
        c2s_god_brother_lingqi_click(button_type: number, bro_index: number, index?: number): void;
        private s2c_god_brother_lingqi_info;
        private _maxUpStarMap;
        getMaxUpStar(slIndex: number): number;
        private _buffIdMap;
        getBuffId(slIndex: number): number;
        private _lingqiMap;
        getLingQiIdList(slIndex: number): number[];
        getLingqiIdx(index: number): number;
        private _showErrorMap;
        getLingQiCfgObj(slIndex: number): {
            [star: number]: ShenlingLingqiConfig;
        };
        getLingQiCfg(slIndex: number, star: number): ShenlingLingqiConfig;
        getLingQiInfos(slIndex: number): god_brother_lingqi_sturct[];
        /**
         * @param slIndex 神灵index
         * @param idx 灵器索引(1,2,3)
         */
        getLingQiInfo(slIndex: number, idx: number): god_brother_lingqi_sturct;
        getPowerByType(type: ShenLingType): number;
        getPower(slIndex: number): number;
        /**
         * @param slIndex 神灵index
         * @param idx 灵器索引 (1,2,3)
         */
        isMaxUpStar(slIndex: number, idx: number): boolean;
        canOneKey(slIndex: number): boolean;
        getShenlingStar(slIndex: number): number;
        isShenlingActed(slIndex: number): boolean;
        canActOrUp(slIndex: number, idx: number, isTips?: boolean): boolean;
        haveOneLqActed(slIndex: number): boolean;
        isActedSuit(slIndex: number): boolean;
        getLingQiActedCnt(slIndex: number, star: number): number;
        isStarAllActed(slIndex: number, star: number): boolean;
        getHintByIndex(slIndex: number): boolean;
        getHintByType(type: ShenLingType): boolean;
        protected onBagUpdateByBagType(n: GameNT): void;
        updateHint(): void;
    }
}
declare namespace game.mod.shenling {
    import god_brother_group_data = msg.god_brother_group_data;
    class ShenLingModel {
        /**神灵类型信息*/
        list: {
            [type: number]: GodBrotherTypeData;
        };
        /**羁绊列表*/
        jiBanList: {
            [index: number]: god_brother_group_data;
        };
        /**单个神灵奖励状态*/
        rewardList: {
            [index: number]: number[];
        };
        /**神灵主界面红点路径*/
        mainHintPath: string[];
        /**神灵升星红点路径*/
        upStarHintPath: string[];
        /**羁绊红点路径*/
        jibanHintPath: string[];
    }
    /**
     *  对应 god_brother_type_data 进行结构调整，将 list 改成 k-v 模式
     */
    class GodBrotherTypeData {
        postype: number;
        level: number;
        exp: number;
        upindex: number;
        skilllevel: number;
        skill_list: number[];
        splevel_list: number[];
        list: {
            [index: number]: msg.god_brother_data;
        };
        now_attrs: msg.attributes;
    }
}
declare namespace game.mod.shenling {
    import GameNT = base.GameNT;
    import god_brother_data = msg.god_brother_data;
    import god_brother_type_data = msg.god_brother_type_data;
    import ShenlingXingjiConfig = game.config.ShenlingXingjiConfig;
    import ShenlingDengjiConfig = game.config.ShenlingDengjiConfig;
    import ShenlingConfig = game.config.ShenlingConfig;
    import ShenlingJibanConfig = game.config.ShenlingJibanConfig;
    import god_brother_group_data = msg.god_brother_group_data;
    import ShenlingLeixingConfig = game.config.ShenlingLeixingConfig;
    import attributes = msg.attributes;
    /**
     * @description 神灵系统
     */
    class ShenLingProxy extends ProxyBase implements IShenLingProxy {
        private _model;
        private _actList;
        private _actJibanMap;
        readonly model: ShenLingModel;
        onStartReconnect(): void;
        initialize(): void;
        /**
         * 升级
         * @param posType
         * @param btnType 1为升级 2为一键升级 3为突破
         */
        c2s_god_brother_levelup(posType: number, btnType: number): void;
        c2s_god_brother_starup(index: number): void;
        /**
         *  羁绊激活
         *  [index + shenlingIndex] => 激活对应的羁绊神灵index
         *  [index + rewardList] => 激活对应的羁绊奖励
         * @param index 羁绊ID
         * @param rewardList 带rewardindex字段时表示领取羁绊组合达标奖励,不带则表示激活
         * @param shenlingIndex
         */
        c2s_god_brother_groupup(index: number, rewardList: number[], shenlingIndex: number): void;
        c2s_god_brother_levelrewards(index: number, rewardIdx: number): void;
        c2s_god_brother_s_skill(posType: number, slot: number): void;
        c2s_god_brother_uporchange(posType: number, index: number): void;
        s2c_god_brother_info(n: GameNT): void;
        isBreakThroughLv(data: GodBrotherTypeData): boolean;
        /** 根据 postype 更新对应系列神灵信息 */
        updateInfo(msg: god_brother_type_data): void;
        private _upStarData;
        protected onSurfaceTipsHide(): void;
        private getSkillIdByIndex;
        private s2c_god_brother_group_list;
        private s2c_god_brother_unit_reward_list;
        c2s_god_brother_evolve(index: number): void;
        /**====================================== 协议 end ===================================*/
        /**系列神灵信息*/
        getTypeInfo(type: number): GodBrotherTypeData;
        getInfoByIndex(index: number): god_brother_data;
        isActed(index: number): boolean;
        /**获取羁绊信息*/
        getJiBanInfo(index: number): god_brother_group_data;
        /**根据类型获取已激活的神灵列表，按战力高低排序*/
        getActedListByType(type: number, sort?: boolean): god_brother_data[];
        /**获取已激活的神灵index列表*/
        getActedList(): number[];
        getSinglePower(info: god_brother_data): number;
        getSinglePowerByIndex(index: number): number;
        getPowerByType(type: number): number;
        /**系列神灵属性总和 + 当前阵位的升级属性*/
        getAttrByType(type: number): msg.attributes;
        /**神灵总属性*/
        getAttr(): attributes;
        /**单个神灵属性*/
        getAttrByIndex(index: number): msg.attributes;
        /**升级是否满级了*/
        isMaxLv(type: number): boolean;
        canUpLv(type: number, isTips?: boolean): boolean;
        /**
         * 是否到突破阶段了。
         * @param type
         */
        isBreakThrough(type: number): boolean;
        canBreakThrough(type: number, isTips?: boolean): boolean;
        /**是否有觉醒阶段*/
        haveAwakenStatue(index: number): boolean;
        /**是否觉醒阶段了*/
        isAwaken(index: number): boolean;
        canUpStar(index: number, isTips?: boolean): boolean;
        canAwaken(index: number, isTips?: boolean): boolean;
        /**获取某个系列第一个可以激活的神灵配置*/
        getFirstActByType(type: number): ShenlingConfig;
        /**================================= config =================================*/
        /**神灵类型配置*/
        getTypeCfg(type: number): ShenlingLeixingConfig;
        /**神灵羁绊配置*/
        getJiBanCfg(index: number): ShenlingJibanConfig[];
        /**神灵配置*/
        getShenLingCfg(index: number): ShenlingConfig;
        /**神灵等级配置*/
        getLevelCfg(lv: number): ShenlingDengjiConfig;
        private _errorStarCfg;
        /**神灵星级配置*/
        getStarCfg(index: number, star: number): ShenlingXingjiConfig;
        /**获取具体神灵所有星级配置信息*/
        getStarCfgList(index: number): {
            [star: number]: ShenlingXingjiConfig;
        };
        /**星级配置表映射map*/
        private _starCfgMap;
        /**神灵对应的 [最大星级, 最大觉醒星级]*/
        private _maxStarMap;
        buildStarCfgMap(): void;
        /**升星的最大星级*/
        getMaxStar(index: number): number;
        /**觉醒的最大星级*/
        getMaxAwakenStar(index: number): number;
        /**根据类型分类神灵配置*/
        private _typeCfgMap;
        private buildShenLingCfgMap;
        private haveStarCost;
        private canShowShenling;
        /**获取类型神灵列表*/
        getShenLingCfgListByType(type: number): ShenlingConfig[];
        /**获取神灵类型*/
        getShenLingType(index: number): number;
        /**羁绊配置*/
        private _jiBanCfgMap;
        private _jiBanIdxList;
        buildJiBanCfgMap(): void;
        /**羁绊配置的羁绊id列表*/
        getJiBanIdxList(): number[];
        /**================================= hint =================================*/
        /**羁绊红点*/
        getJiBanHint(): boolean;
        /**
         * 羁绊神灵激活红点
         * @param jbIndex 羁绊ID
         * @param index 神灵index
         */
        getJiBanShenLingActHint(jbIndex: number, index: number): boolean;
        /**羁绊神灵激活红点*/
        getJibanShenlingHint(jbIndex: number): boolean;
        /**羁绊激活和升级红点*/
        getJiBanActHint(index: number, isTips?: boolean): boolean;
        /**羁绊奖励红点*/
        getJiBanRewardHint(index: number): boolean;
        /**羁绊item的红点：神灵激活红点，羁绊激活升级红点，羁绊奖励红点*/
        getJibanHint(jbIndex: number): boolean;
        /**判断灵宝技能是否可激活*/
        checkLingBaoSkillAct(type: number, skillIdx: number): boolean;
        /**主界面的灵宝技能激活红点*/
        getLingBaoSkillHint(type: number): boolean;
        /**上阵红点*/
        getShangZhenHint(): boolean;
        /**判断未激活阵位的是否有可以激活的神灵*/
        checkActByNotUpType(type: number): boolean;
        /**神灵主界面的类型红点*/
        getMainHintByType(type: number): boolean;
        /**神迹奖励长度*/
        private _shenjiMap;
        private getShenJiRewardLen;
        /**神迹奖励红点*/
        getShenJiRewardHint(index: number): boolean;
        /**升星界面的单个神灵*/
        getStarHintByIndex(index: number): boolean;
        /**升星界面的类型红点*/
        getStarHintByType(type: number): boolean;
        updateHint(): void;
        private _consumeList;
        /**等级升级和突破消耗，星级消耗，灵宝技能消耗*/
        getConsumeList(): number[];
        /**星级消耗*/
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void;
        /**升级，突破，星级觉醒消耗*/
        protected onBagUpdateByPropIndex(n: GameNT): void;
        private checkOpenIdx;
        /**================================= 属性 =================================*/
        /**
         * 获取阵位神灵的特殊属性信息 例如：风蚀等级: 100, 风蚀攻击: 100
         * @param type 阵位类型
         */
        getSpecialAttrsByType(type: number): string[];
        /**
         * 单个神灵的特殊属性信息 例如：风蚀等级: 100, 风蚀攻击: 100
         * @param index
         */
        getSpecialAttrsByIdx(index: number): string[];
        /**检测神灵数量是否变更*/
        private checkCnt;
        isTypeActed(type: ShenLingType): boolean;
        getActedTypeList(): ShenLingType[];
        checkType(oldTypes: ShenLingType[], newTypes: ShenLingType[]): void;
        haveUpLvType(): boolean;
        /**某阵位可激活，isFirst判断阵位*/
        haveActType(isFirst?: boolean): boolean;
        canActByType(type: ShenLingType): boolean;
        canUpStarByType(type: ShenLingType): boolean;
        /**某阵位可升星*/
        haveUpStarType(): boolean;
        haveShangzhen(): boolean;
        /**
         * 点击主界面神灵按钮，进入界面优先选中的一级页签
         * 可激活阵位，可升星，可升级或突破，有上阵的是0，否则是1
         */
        getSelTab(): number;
        getUpStarSelType(getNext?: boolean): ShenLingType;
        /**================================神灵进化================================*/
        haveEvolve(index: number): boolean;
        getEvolvedCnt(index: number): number;
        getCurQuality(index: number): number;
        getCurEvolvedQuality(index: number): number;
        getNextEvolvedQuality(index: number): number;
        getEvolveTaskIds(index: number): number[];
        isEvolveTaskAllDone(index: number): boolean;
        canEvolve(index: number): boolean;
        private _evolveMaxQuality;
        getEvolveQualityRange(index: number): number[];
        isMaxEvolve(index: number): boolean;
        getEvolveHint(index: number): boolean;
        protected onTaskUpdate(n: GameNT): void;
        /**神灵模型名称*/
        getShenlingModelName(index: number): string;
        /**================================神灵进化end================================*/
        /**
         * 通用升星碎片id，只用于非进化神灵的升星。
         * （激活不可使用，进化神灵不可使用）
         * @param index
         */
        getCommonCost(index: number): number;
        getAllPowerByType(type: ShenLingType): number;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliModel {
        all_datas: {
            [type: number]: GodBrotherLingliDatas;
        };
        hintPath: string[];
    }
    class GodBrotherLingliDatas {
        itype: ShenLingType;
        skill_data: {
            [index: number]: msg.god_brother_lingli_struct;
        };
    }
}
declare namespace game.mod.shenling {
    import GameNT = base.GameNT;
    import god_brother_lingli_struct = msg.god_brother_lingli_struct;
    import ShenlingLingliConfig = game.config.ShenlingLingliConfig;
    /**
     * @description 神灵灵力系统
     */
    class ShenlingLingliProxy extends ProxyBase {
        private _model;
        initialize(): void;
        /**
         * @param type 类型
         * @param index 灵力索引  999为主动技能的索引
         */
        c2s_god_brother_lingli_click(type: number, index: number): void;
        c2s_god_brother_lingli_reset_point(type: number): void;
        s2c_god_brother_lingli_info(n: GameNT): void;
        private dealTypeData;
        getTypeData(type: ShenLingType): GodBrotherLingliDatas;
        /**
         * @param type
         * @param idx 索引
         */
        getSkillData(type: ShenLingType, idx: number): god_brother_lingli_struct;
        getMainSkillData(type: ShenLingType): god_brother_lingli_struct;
        isActed(type: ShenLingType): boolean;
        isSkillActed(type: ShenLingType, idx: number): boolean;
        private _maxLvMap;
        getMaxLevel(type: ShenLingType): number;
        isMaxLevel(type: ShenLingType, idx: number): boolean;
        getConfig(type: ShenLingType, lv: number): ShenlingLingliConfig;
        canActOrUp(type: ShenLingType, idx: number, isTips?: boolean): boolean;
        protected onRoleUpdate(n: GameNT): void;
        getHintByType(type: ShenLingType): boolean;
        private updateHint;
        getPowerByType(type: ShenLingType): number;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoModel {
        /** 各灵魄数据 */
        all_datas: {
            [id: number]: msg.god_brother_lingpo_datas;
        };
        hintPath: string[];
    }
}
declare namespace game.mod.shenling {
    import GameNT = base.GameNT;
    import ShenlingLingpoConfig = game.config.ShenlingLingpoConfig;
    import ShenlingLingpoTypeConfig = game.config.ShenlingLingpoTypeConfig;
    import god_brother_lingpo_datas = msg.god_brother_lingpo_datas;
    import god_brother_lingpo_sturct = msg.god_brother_lingpo_sturct;
    /**
     * @description 神灵灵魄系统
     */
    class ShenlingLingpoProxy extends ProxyBase {
        private _model;
        readonly model: ShenlingLingpoModel;
        initialize(): void;
        /**
         * @param button_type 1为指定激活/升星   2为一键激活/升星  3套装升级
         * @param id 灵魄id（配置表索引）
         * @param index 灵魄子索引（8个位置索引）
         */
        c2s_god_brother_lingpo_click(button_type: number, id: number, index?: number): void;
        private s2c_god_brother_lingpo_info;
        private checkShow;
        private canShowTypeCfg;
        getShowTypeCfgList(type: ShenLingType): ShenlingLingpoTypeConfig[];
        private _typeCfgMap;
        getTypeCfgList(type: ShenLingType): ShenlingLingpoTypeConfig[];
        getCfgObj(id: number): {
            [index: number]: ShenlingLingpoConfig;
        };
        getConfig(id: number, lv: number): ShenlingLingpoConfig;
        getTypeCfg(id: number): ShenlingLingpoTypeConfig;
        getInfo(id: number): god_brother_lingpo_datas;
        getIconInfo(id: number, idx: number): god_brother_lingpo_sturct;
        getPowerByType(type: ShenLingType): number;
        getPower(id: number): number;
        private _maxSuitLvMap;
        getMaxLevel(id: number): number;
        getCurLevel(id: number, idx: number): number;
        isMaxLevel(id: number, idx: number): boolean;
        getMaxSuitLevel(id: number): number;
        isSuitActed(id: number): boolean;
        isSuitLevelMax(id: number): boolean;
        getSuitLevel(id: number): number;
        getSuitLevelProgressCnt(id: number, lv?: number): number;
        /**
         * @param id 灵魄id
         * @param idx 第几个灵魄icon，从1开始
         * @param isTips
         */
        canActOrUp(id: number, idx: number, isTips?: boolean): boolean;
        canOneKey(id: number): boolean;
        canActOrUpSuit(id: number, isTips?: boolean): boolean;
        canOneKeySuit(id: number): boolean;
        isActed(id: number): boolean;
        isActedAllIcon(id: number): boolean;
        protected onBagUpdateByBagType(n: GameNT): void;
        getIconHint(id: number, idx: number): boolean;
        getHintById(id: number): boolean;
        getHintByType(type: ShenLingType): boolean;
        canShowMdr(): boolean;
        getShowShenlingTypes(): ShenLingType[];
        updateHint(): void;
    }
}
declare namespace game.mod.shenling {
    import ShenlingConfig = game.config.ShenlingConfig;
    class ShenlingEvolveItem extends eui.Component {
        avatarBaseItem: game.mod.AvatarBaseItem;
        img_type: eui.Image;
        redPoint: eui.Image;
        gr_eft: eui.Group;
        data: any;
        private _proxy;
        private _hub;
        private _eftId;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        updateView(cfg: ShenlingConfig, type?: number, specialQua?: SpecialQualityType): void;
    }
}
declare namespace game.mod.shenling {
    class ShenlingEvolvePreviewView extends eui.Component {
        secondPop: game.mod.SecondPop;
        modelItem: game.mod.shenling.ShenLingModelItem;
        btn_god: game.mod.AttrGodItem;
        lb_desc: eui.Label;
        list_arrow: eui.List;
        list_type: eui.List;
        skillItem: game.mod.shenling.ShenlingEvolveSkillItem;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenlingEvolveSkillItem extends eui.Component {
        lb_name: eui.Label;
        lb_desc: eui.Label;
        img_icon: eui.Image;
        img_quality: eui.Image;
        constructor();
        updateView(skillId: number, quality: SpecialQualityType, isInit?: boolean): void;
    }
}
declare namespace game.mod.shenling {
    import task_data = msg.task_data;
    class ShenlingEvolveTaskItem extends BaseListenerRenderer {
        lab_desc: eui.Label;
        lab_schedule: eui.Label;
        icon: game.mod.Icon;
        img_done: eui.Image;
        btn_do: game.mod.Btn;
        data: task_data;
        private _jump;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
}
declare namespace game.mod.shenling {
    class ShenlingEvolveTypeIcon extends BaseListenerRenderer {
        img_di: eui.Image;
        img_sel: eui.Image;
        img_icon: eui.Image;
        img_shuxing: eui.Image;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        redPoint: eui.Image;
        lb_act: eui.Label;
        img_lock: eui.Image;
        data: IShenlingEvolveTypeIconData;
        protected onAddToStage(): void;
        protected dataChanged(): void;
    }
    interface IShenlingEvolveTypeIconData {
        index: number;
        quality: SpecialQualityType;
    }
}
declare namespace game.mod.shenling {
    class ShenlingEvolveView extends eui.Component {
        secondPop: game.mod.SecondPop;
        modelItem: game.mod.shenling.ShenLingModelItem;
        power: game.mod.Power;
        list: eui.List;
        btn_god: game.mod.AttrGodItem;
        skillItem: game.mod.shenling.ShenlingEvolveSkillItem;
        evolveItem: game.mod.shenling.ShenlingEvolveItem;
        btn_jinjie: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingModelItem extends eui.Component {
        gr_eft: eui.Group;
        nameItem: game.mod.AvatarNameSrItem;
        private _effId;
        private _hub;
        private _proxy;
        private _defaultIdx;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**神灵index*/
        updateModel(index: number): void;
        /**默认模型，没有进化功能*/
        private updateDefaultModel;
        /**
         * 神灵进化
         * @param index 神灵id
         * @param quality 要展示的品质
         */
        updateEvolveModel(index: number, quality: SpecialQualityType): void;
        private getSurfaceData;
        private getIdx;
        removeModel(): void;
        private removeEft;
    }
}
declare namespace game.mod.shenling {
    class ShenLingTypeIcon extends BaseListenerRenderer {
        img_di: eui.Image;
        img_sel: eui.Image;
        img_icon: eui.Image;
        img_shuxing: eui.Image;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        redPoint: eui.Image;
        lb_act: eui.Label;
        img_lock: eui.Image;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        protected dataChanged(): void;
        private switchVisible;
        /**有第一个神灵可激活的情况*/
        private canActView;
        /**已激活的情况*/
        private actView;
        /**未激活情况*/
        private notActView;
    }
    interface ISLTypeIconData {
        type: ShenLingType;
        mdrType: ShenLingMdrType;
        hint: boolean;
    }
}
declare namespace game.mod.shenling {
    class ShenLingTypeListView extends eui.Component {
        list_menu: eui.List;
        private _listData;
        private _proxy;
        private _lqProxy;
        private _lpProxy;
        private _llProxy;
        /**展示的类型*/
        private _typeAry;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        /**更新类型按钮，灵魄灵力只展示激活的类型*/
        updateListView(mdrType: ShenLingMdrType): void;
        /**更新选中类型*/
        updateSelType(type: ShenLingType): void;
        updateListHint(mdrType: ShenLingMdrType): void;
        private getHint;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliLine extends eui.Component {
        img_light: eui.Image;
        private _maxVal;
        constructor();
        private onAddToStage;
        setMax(max?: number): void;
        updateLine(val: number): void;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliSkillDescComp extends eui.Component {
        img_icon: eui.Image;
        img_icongray: eui.Image;
        gr_lv: eui.Group;
        lb_lv: eui.Label;
        lb_name: eui.Label;
        lb_desc: eui.Label;
        img_tag: eui.Image;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        /**
         * @param type
         * @param idx 序号
         */
        updateView(type: ShenLingType, idx: number): void;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliSkillIcon extends BaseListenerRenderer {
        img_main: eui.Image;
        img_icon: eui.Image;
        lb_lv: eui.Label;
        img_tag: eui.Image;
        img_gray: eui.Image;
        img_sel: eui.Image;
        redPoint: eui.Image;
        img_gray1: eui.Image;
        data: ILingliSkillIconData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        setSel(isSel?: boolean): void;
        isSeled(): boolean;
    }
    interface ILingliSkillIconData {
        type: ShenLingType;
        index: number;
        idx: number;
        lv: number;
        isMaxLv: boolean;
        hint: boolean;
        isMain?: boolean;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliSkillListComp extends eui.Component {
        line_left: game.mod.shenling.ShenlingLingliLine;
        line_right: game.mod.shenling.ShenlingLingliLine;
        line_middle0: game.mod.shenling.ShenlingLingliLine;
        line_middle1: game.mod.shenling.ShenlingLingliLine;
        private _proxy;
        private _selIcon;
        private _leftAry;
        private _middleAry;
        private _rightAry;
        constructor();
        private onAddToStage;
        private onRemoveFromStage;
        private resetLineView;
        updateView(type: ShenLingType): void;
        private setIconData;
        private updateLineView;
        private onClickIcon;
        private onUpdateSel;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliView extends eui.Component {
        scroller: eui.Scroller;
        skillListComp: game.mod.shenling.ShenlingLingliSkillListComp;
        typeListComp: game.mod.shenling.ShenLingTypeListView;
        btn_rule: game.mod.Btn;
        lb_resetcost: eui.Label;
        btn_reset: game.mod.Btn;
        skillDescComp: game.mod.shenling.ShenlingLingliSkillDescComp;
        line0_0: game.mod.shenling.ShenlingLingliLine;
        line0_1: game.mod.shenling.ShenlingLingliLine;
        line1_0: game.mod.shenling.ShenlingLingliLine;
        line1_1: game.mod.shenling.ShenlingLingliLine;
        icon_main: game.mod.shenling.ShenlingLingliSkillIcon;
        img_max: eui.Image;
        gr_cost: eui.Group;
        lb_precondition: eui.Label;
        lb_cost: eui.Label;
        btn_do: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.shenling {
    import attributes = msg.attributes;
    class ShenlingLingpoAttrItem extends BaseRenderer {
        baseNameItem: game.mod.BaseNameItem;
        lb_desc: eui.Label;
        attrList: game.mod.AttrListImgView;
        private _proxy;
        constructor();
        protected onAddToStage(): void;
        updateInfo(id: number, attr: attributes): void;
        updateNextInfo(id: number, attr: attributes): void;
        private updateView;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoIcon extends BaseListenerRenderer {
        redPoint: eui.Image;
        img_icon: eui.Image;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        img_gray: eui.Image;
        data: IShenlingLingpoIconData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
    }
    interface IShenlingLingpoIconData {
        id: number;
        level: number;
        hint: boolean;
        index: number;
        idx: number;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoIconListComp extends eui.Component {
        icon0: game.mod.shenling.ShenlingLingpoIcon;
        icon1: game.mod.shenling.ShenlingLingpoIcon;
        icon2: game.mod.shenling.ShenlingLingpoIcon;
        icon3: game.mod.shenling.ShenlingLingpoIcon;
        icon4: game.mod.shenling.ShenlingLingpoIcon;
        icon5: game.mod.shenling.ShenlingLingpoIcon;
        icon6: game.mod.shenling.ShenlingLingpoIcon;
        icon7: game.mod.shenling.ShenlingLingpoIcon;
        private _proxy;
        constructor();
        private onAddToStage;
        /**
         * @param type 神灵类型
         * @param id 灵魄id
         */
        updateView(type: ShenLingType, id: number): void;
        private updateIcon;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoIconTipsBagView extends eui.Component {
        propTips: game.mod.BasePropTips;
        power: game.mod.Power;
        scroller: eui.Scroller;
        descItem0: game.mod.BaseDescItem;
        lingpoAttrItem0: game.mod.shenling.ShenlingLingpoAttrItem;
        lingpoAttrItem1: game.mod.shenling.ShenlingLingpoAttrItem;
        descItem1: game.mod.BaseDescItem;
        propGainList: game.mod.BasePropGainList;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoIconTipsView extends eui.Component {
        propTips: game.mod.BasePropTips;
        descItem: game.mod.BaseDescItem;
        lingpoAttrItem0: game.mod.shenling.ShenlingLingpoAttrItem;
        btn_do: game.mod.Btn;
        gr_cost: eui.Group;
        icon_cost: game.mod.Icon;
        img_max: eui.Image;
        bar: game.mod.ProgressBarComp;
        scroller: eui.Scroller;
        lingpoAttrItem1: game.mod.shenling.ShenlingLingpoAttrItem;
        constructor();
    }
}
declare namespace game.mod.shenling {
    import ShenlingLingpoTypeConfig = game.config.ShenlingLingpoTypeConfig;
    class ShenlingLingpoItem extends BaseRenderer {
        avatarBaseItem: game.mod.AvatarBaseItem;
        redPoint: eui.Image;
        lb_progress: eui.Label;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        img_gray: eui.Image;
        gr_eft: eui.Group;
        data: IShenlingLingpoItemData;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
    }
    interface IShenlingLingpoItemData {
        isActed: boolean;
        cfg: ShenlingLingpoTypeConfig;
        hint: boolean;
        lv: number;
        progress: number;
        isSel: boolean;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoSuitBtn extends eui.Component {
        img_icon: eui.Image;
        gr_lv: eui.Group;
        lb_num: eui.Label;
        img_mask: eui.Image;
        private _proxy;
        private _shape;
        constructor();
        private onAddToStage;
        /**
         * @param type 神灵类型
         * @param id 灵魄id
         */
        updateView(type: ShenLingType, id: number): void;
        private changeGraphics;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoView extends eui.Component {
        listComp: game.mod.shenling.ShenlingLingpoIconListComp;
        power: game.mod.Power;
        scroller: eui.Scroller;
        list: eui.List;
        typeListComp: game.mod.shenling.ShenLingTypeListView;
        btn_onekey: game.mod.Btn;
        suitBtn: game.mod.shenling.ShenlingLingpoSuitBtn;
        gr_gain: eui.Group;
        lb_gain: eui.Label;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingLingQiModel {
        /** 各神灵灵器数据 */
        all_datas: {
            [index: number]: msg.god_brother_lingqi_datas;
        };
        hintPath: string[];
    }
}
declare namespace game.mod.shenling {
    class ShenLingLingQiSuitComp extends eui.Component {
        lb_name: eui.Label;
        lb_desc: eui.Label;
        img_icon: eui.Image;
        img_icongray: eui.Image;
        private _proxy;
        private _index;
        constructor();
        protected onAddToStage(): void;
        /**神灵index*/
        updateView(index: number): void;
    }
}
declare namespace game.mod.shenling {
    class ShenLingLingQiTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        lb_name: eui.Label;
        power: game.mod.Power;
        gr_jiefengzhanli: eui.Group;
        gr_power: eui.Group;
        lingqiIcon: game.mod.shenling.ShenLingLingQiIcon;
        scroller: eui.Scroller;
        gr_middle: eui.Group;
        baseAttrItem: game.mod.BaseDescItem;
        fengyinAttrItem: game.mod.BaseDescItem;
        suitDescItem1: game.mod.BaseDescList2;
        suitDescItem2: game.mod.BaseDescList2;
        img_max: eui.Image;
        gr_cost: eui.Group;
        bar: game.mod.ProgressBarComp;
        icon_cost: game.mod.Icon;
        btn_do: game.mod.Btn;
        descItem: game.mod.BaseDescItem;
        basePropGainList: game.mod.BasePropGainList;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingLingQiView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        gr_eff: eui.Group;
        power: game.mod.Power;
        suitComp: game.mod.shenling.ShenLingLingQiSuitComp;
        icon0: game.mod.shenling.ShenLingLingQiIcon;
        icon1: game.mod.shenling.ShenLingLingQiIcon;
        icon2: game.mod.shenling.ShenLingLingQiIcon;
        btn_onekey: game.mod.Btn;
        typeListComp: game.mod.shenling.ShenLingTypeListView;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingqiBagTipsView extends eui.Component {
        qualityTips: game.mod.BaseQualityTips;
        lb_name: eui.Label;
        power: game.mod.Power;
        gr_jiefengzhanli: eui.Group;
        gr_power: eui.Group;
        lingqiIcon: game.mod.shenling.ShenLingLingQiIcon;
        scroller: eui.Scroller;
        baseAttrItem: game.mod.BaseDescItem;
        fengyinAttrItem: game.mod.BaseDescItem;
        suitDescItem1: game.mod.BaseDescList2;
        suitDescItem2: game.mod.BaseDescList2;
        descItem: game.mod.BaseDescItem;
        gainList: game.mod.BasePropGainList;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingShangZhenView extends eui.Component {
        item0: game.mod.AvatarIconLongPress;
        item1: game.mod.AvatarIconLongPress;
        item2: game.mod.AvatarIconLongPress;
        item3: game.mod.AvatarIconLongPress;
        item4: game.mod.AvatarIconLongPress;
        item5: game.mod.AvatarIconLongPress;
        btn_oneKey: game.mod.Btn;
        scroller: eui.Scroller;
        list: eui.List;
        list_menu: eui.List;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingSkillTipsView extends eui.Component {
        tips: game.mod.BaseQualityTips;
        icon: game.mod.ShenLingSkillIcon;
        lb_name: eui.Label;
        img_showType: eui.Image;
        scroller: eui.Scroller;
        gr_attr: eui.Group;
        lb_actDesc: eui.Label;
        img_acted: eui.Image;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingView extends eui.Component {
        power: game.mod.Power2;
        btn_jiban: game.mod.Btn;
        btn_shangzhen: game.mod.Btn;
        icon_heji: ShenLingSkillIcon;
        list_lingbao: eui.List;
        bar: game.mod.ProgressBarComp;
        btn_lv: game.mod.Btn;
        btn_first: GiftBtn;
        btn_oneKey: game.mod.Btn;
        list_cost: eui.List;
        moItem: game.mod.shenling.ShenLingModelItem;
        gr_lv: eui.Group;
        lb_level: eui.Label;
        btn_act: game.mod.Btn;
        gr_uplv: eui.Group;
        img_max: eui.Image;
        typeListComp: game.mod.shenling.ShenLingTypeListView;
        btn_activity: Btn;
        lab_time: eui.Label;
        grp_act: eui.Group;
        btn_gift: game.mod.Btn;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingAwakenView extends eui.Component {
        secondPop: game.mod.SecondPop;
        item0: game.mod.AvatarItem;
        item1: game.mod.AvatarItem;
        power: game.mod.Power;
        list_reward: eui.List;
        btn_awaken: game.mod.Btn;
        list_cost: eui.List;
        img_max: eui.Image;
        constructor();
    }
}
declare namespace game.mod.shenling {
    import ShenlingXingjiConfig = game.config.ShenlingXingjiConfig;
    class ShenLingShenJiItem extends BaseListenerRenderer {
        lb_desc: eui.Label;
        list_reward: eui.List;
        btn_get: game.mod.Btn;
        img_statue: eui.Image;
        skillIcon: game.mod.ShenLingSkillIcon;
        data: ISLShenJiItemData;
        private _listData;
        private _proxy;
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        protected dataChanged(): void;
        private onClick;
        private onClickSkill;
    }
    interface ISLShenJiItemData {
        index: number;
        cfg: ShenlingXingjiConfig;
        status: number;
        talent_index: number;
        curStar: number;
    }
}
declare namespace game.mod.shenling {
    class ShenLingShenJiView extends eui.Component {
        scroller: eui.Scroller;
        list: eui.List;
        list_awaken: eui.List;
        avatarItem: game.mod.AvatarItem;
        lb_name: eui.Label;
        lb_skillName: eui.Label;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingUpStarView extends eui.Component {
        power: game.mod.Power2;
        btn_shenji: game.mod.Btn;
        skill_normal: game.mod.ShenLingSkillIcon;
        list_talent: eui.List;
        scroller: eui.Scroller;
        list: eui.List;
        moItem: game.mod.shenling.ShenLingModelItem;
        btn_up: game.mod.UpStarBtn;
        starCom: game.mod.StarListView;
        btn_god: game.mod.AttrGodItem;
        typeListComp: game.mod.shenling.ShenLingTypeListView;
        evolveItem: game.mod.shenling.ShenlingEvolveItem;
        constructor();
    }
}
declare namespace game.mod.shenling {
    class ShenLingMainMdr extends WndBaseMdr {
        protected _initBtnData: WndBaseViewData[];
        private _proxy;
        private _selIdx;
        private _isShowSpecialMdr;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateBtnData;
        protected updateBtnList(): void;
        protected updateViewShow(): void;
        protected onTabCheck(index: number): boolean;
        private canClickFirstPage;
        protected onTabChanged(): void;
        private onUpdateMdr;
    }
}
declare namespace game.mod.shenling {
    import ShenlingConfig = game.config.ShenlingConfig;
    class ShenlingEvolveMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        _showArgs: ShenlingConfig;
        private _evolvedIdx;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private onClickEvolveItem;
        private onUpdateTask;
        private updateTaskData;
        private updateSkillItem;
        private updatePower;
        private onClickJinjie;
    }
}
declare namespace game.mod.shenling {
    import ShenlingConfig = game.config.ShenlingConfig;
    class ShenlingEvolvePreviewMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: ShenlingConfig;
        private _selIdx;
        private _listData;
        private _listArrow;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateListData;
        private getSpeQuality;
        private updateView;
        private onClickList;
        private updateGod;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingliMdr extends MdrBase {
        private _view;
        private _proxy;
        private _scrollerH;
        private _skillListCompH;
        private _selType;
        private _selIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private resetScroller;
        private onSwitchType;
        private onUpdateView;
        private updateView;
        private updateLine;
        private updateSkillDesc;
        private updateResetCost;
        private updateCost;
        private onClickType;
        private onClickRule;
        private onClickReset;
        private reset;
        private onClickBtnDo;
        private onClickIconMain;
        private onUpdateIconMainSel;
        private onRoleUpdate;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoIconTipsBagMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: PropData;
        private _baseAttrIds;
        private _suitAttrIds;
        private _nextSuitAttrIds;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private getLingpoAry;
        private updateView;
        private onUpdateAttr;
        private updateBaseAttr;
        private updateSuitAttr;
        private updateNextSuitAttr;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoIconTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: IShenlingLingpoIconData;
        private _baseAttrIds;
        private _suitAttrIds;
        private _costCnt;
        private _nextSuitAttrIds;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onUpdateView;
        private updateView;
        private onUpdateAttr;
        private updateBaseAttr;
        private updateSuitAttr;
        private updateNextSuitAttr;
        private onClickBtn;
        private onceCallBack;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoMdr extends MdrBase {
        private _view;
        private _proxy;
        private _slProxy;
        private _listData;
        private _selType;
        private _selIdx;
        private _cfgId;
        private _preId;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onSwitchType;
        private getNextOneKeyType;
        private onUpdateView;
        private updateView;
        private updateListView;
        private updateTopView;
        private onClickType;
        private onClickList;
        private onClickOneKey;
        private onClickSuitBtn;
        private onClickGain;
        private onUpdateByBagType;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingpoSuitTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: number;
        private _cfg;
        private _suitAttrIds;
        private _nextSuitAttrIds;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private updateView;
        private onUpdateAttr;
        private updateSuitAttr;
        private updateNextSuitAttr;
        private onClickBtn;
    }
}
declare namespace game.mod.shenling {
    class ShenLingLingQiMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _slProxy;
        private _selType;
        private _selIdx;
        private _curIndex;
        private _preIndex;
        private _listData;
        private _effIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private removeModelEft;
        private onSwitchType;
        private getNextOneKetType;
        private onUpdateView;
        private updateView;
        private updateListView;
        private updateTopView;
        private onClickType;
        private onClickList;
        private onClickOneKey;
        private onUpdateByBagType;
    }
}
declare namespace game.mod.shenling {
    class ShenLingMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.shenling {
    class ShenlingLingqiBagTipsMdr extends ShenLingLingQiTipsMdr {
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        protected updateView(): void;
    }
}
declare namespace game.mod.shenling {
    class ShenLingAttrMdr extends BaseAttrMdr {
        protected _listAttr1: eui.ArrayCollection;
        private _proxy;
        private _type;
        private _index;
        protected onInit(): void;
        protected onShow(): void;
        protected updateView(): void;
        protected updateBaseAttr(): void;
        protected onHide(): void;
    }
}
declare namespace game.mod.shenling {
    import UpdateItem = base.UpdateItem;
    class ShenLingMdr extends EffectMdrBase implements UpdateItem {
        private _view;
        private _proxy;
        private _giftProxy;
        private _listSkill;
        private _listCost;
        private _type;
        private _typeCfg;
        private _changeExp;
        private _skillIdx;
        private _curIndex;
        private _actTime;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateTalentGift;
        private updateGift;
        private getDefaultType;
        private onSwitchType;
        protected onHide(): void;
        private onUpdateInfo;
        private updateTopInfo;
        private updateHeJiSkillInfo;
        private updateLingBaoSkillInfo;
        private updateLvInfo;
        private updateCost;
        private onClickList;
        private onClickAttr;
        private onClickJiBan;
        private onClickShangZhen;
        private onClickUpLv;
        private onClickOneKey;
        private onClickHeJi;
        private onClickLingBao;
        private getSkillStatue;
        private onClickAct;
        private onClickActivity;
        private onClickFirst;
        /**点击灵宝技能激活按钮回调*/
        private clickLingBaoSkillHandler;
        /**灵宝技能激活条件*/
        private lingBaoCondHandler;
        private onUpdateByPropIndex;
        private onUpdateJiBanHint;
        private onUpdateAct;
        private updateHint;
        private onUpdateActHint;
        update(time: base.Time): void;
        private onClickGift;
        private updateShenlingGiftHint;
    }
}
declare namespace game.mod.shenling {
    /**
     * 上阵逻辑处理：
     * 只有关闭界面或者点击一键上阵按钮，才是最终的上阵 （功能会议时候提出假上阵展示）
     */
    class ShenLingShangZhenMdr extends MdrBase {
        private _view;
        private _proxy;
        private _selectedType;
        private _selectedList;
        private _listData;
        private _listMenu;
        private _maxType;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onSwitchType;
        private updateList;
        private getList;
        private getListData;
        private isBattle;
        private updateTopInfo;
        private onClickListMenu;
        private onClickList;
        private onClickOneKey;
        private finallySelected;
        /**替换神灵后，若有高战力的需要出现红点*/
        private updateBtnHint;
        private haveShangzhenHint;
    }
}
declare namespace game.mod.shenling {
    /**神灵技能tips*/
    class ShenLingSkillTipsMdr extends MdrBase {
        private _view;
        private _proxy;
        _showArgs: ISLSkillTipsData;
        private _cfg;
        private _type;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        /**顶部基础信息*/
        private updateTopInfo;
        /**通用的【技能效果】*/
        private addBaseInfo;
        /**普攻技能*/
        private updatePuGong;
        /**ShenLingPuGongAttr 前两项来源 ConfigName.SkillLv，后一项来源 ConfigName.Skill*/
        private getVal;
        /**天赋技能*/
        private updateTalent;
        /**合击技能*/
        private updateHeJi;
        private getHeJiVal;
        private getSkillProbability;
        /**添加到scroller的滚动区域内*/
        private addToScroller;
        protected onHide(): void;
    }
}
declare namespace game.mod.shenling {
    class ShenlingShanzhenSecondMainMdr extends WndSecondMainMdr {
        protected _height: number;
        protected _btnData: WndBaseViewData[];
        protected onTabCheck(index: number): boolean;
    }
}
declare namespace game.mod.shenling {
    class ShenLingAwakenMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listCost;
        private _listReward;
        _showArgs: {
            type: number;
            index: number;
        };
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateView;
        protected onHide(): void;
        private onClick;
    }
}
declare namespace game.mod.shenling {
    /**神迹*/
    class ShenLingShenJiMdr extends MdrBase {
        private _view;
        private _proxy;
        private _listData;
        private _listAwaken;
        private _type;
        private _index;
        private _starMap;
        private _delayId;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private updateInfo;
        private updateAwakenReward;
        private updateList;
        private getTalentIndex;
        protected onHide(): void;
        private updateScrollerView;
        private clearDelayId;
    }
}
declare namespace game.mod.shenling {
    class ShenLingUpStarMdr extends EffectMdrBase {
        private _view;
        private _proxy;
        private _listSkill;
        private _listShenLing;
        private _type;
        private _typeCfg;
        private _cfg;
        private _curIndex;
        private _selIdx;
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        private onSwitchType;
        protected onHide(): void;
        private updateView;
        private onUpdateInfo;
        private moveScroller;
        private updateInfo;
        private getListData;
        private sortFunc;
        private updatePowerView;
        private updateTopInfo;
        private updateSkillInfo;
        private updateCostInfo;
        private onClickListMenu;
        private onClickList;
        private onClickUp;
        private onClickAttr;
        private onClickShenJi;
        private onClickTalent;
        private onClickSkill;
        private updateHint;
        private updateEvolveHint;
        private updateShenLingList;
        private onUpdateByPropTypeAndSubType;
        private onUpdateByPropIndex;
        private onUpdateHintByShenjiReward;
        private onClickEvolveItem;
        private onTaskHint;
    }
}
