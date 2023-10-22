namespace game.mod {
    import IProxy = base.IProxy;
    import ShenlingJibanConfig = game.config.ShenlingJibanConfig;
    import god_brother_group_data = msg.god_brother_group_data;
    import ShenlingConfig = game.config.ShenlingConfig;
    import god_brother_data = msg.god_brother_data;
    import ShenlingXingjiConfig = game.config.ShenlingXingjiConfig;
    import attributes = msg.attributes;

    export interface IShenLingProxy extends IProxy {

        /**羁绊配置的羁绊id列表*/
        getJiBanIdxList(): number[];

        /**羁绊配置*/
        getJiBanCfg(index: number): ShenlingJibanConfig[];

        /**获取羁绊信息*/
        getJiBanInfo(index: number): god_brother_group_data;

        /**神灵配置*/
        getShenLingCfg(index: number): ShenlingConfig;

        /**
         * 单个神灵服务端下发的信息
         * @param index 神灵index
         */
        getInfoByIndex(index: number): god_brother_data;

        /**羁绊激活和升级红点*/
        getJiBanActHint(index: number, isTips?: boolean): boolean;

        /**羁绊奖励红点*/
        getJiBanRewardHint(index: number): boolean;

        /**
         *  羁绊激活
         * @param index 羁绊ID
         * @param rewardList 带rewardindex字段时表示领取羁绊组合达标奖励,不带则表示激活
         * @param shenlingIndex
         */
        c2s_god_brother_groupup(index: number, rewardList: number[], shenlingIndex: number): void;

        /**升星的最大星级*/
        getMaxStar(index: number): number;

        /**
         * 羁绊神灵激活红点
         * @param jbIndex 羁绊ID
         * @param index 神灵index
         */
        getJiBanShenLingActHint(jbIndex: number, index: number): boolean;

        /**神灵星级配置*/
        getStarCfg(index: number, star: number): ShenlingXingjiConfig;

        /**获取已激活的神灵index列表*/
        getActedList(): number[];

        /**系列神灵信息，类型用any接收*/
        getTypeInfo(type: number): any;

        /**羁绊item的红点：神灵激活红点，羁绊激活升级红点，羁绊奖励红点*/
        getJibanHint(jbIndex: number): boolean;

        /**神灵总属性*/
        getAttr(): attributes;

        /**神灵模型名称*/
        getShenlingModelName(index: number): string;

        /**神灵品质*/
        getCurQuality(index: number): number;

        /**某阵位可激活，isFirst判断阵位*/
        haveActType(isFirst?: boolean): boolean;

        /**某阵位可升星*/
        haveUpStarType(): boolean;

        /**根据类型获取已激活的神灵列表，按战力高低排序*/
        getActedListByType(type: number, sort?: boolean): god_brother_data[];

        canAwaken(index: number, isTips?: boolean): boolean;

        /**是否觉醒阶段了*/
        isAwaken(index: number): boolean;

        /**
         * 通用升星碎片id，只用于非进化神灵的升星。
         * （激活不可使用，进化神灵不可使用）
         * @param index
         */
        getCommonCost(index: number): number;

        canUpStar(index: number, isTips?: boolean): boolean;

        // 激活 升星
        c2s_god_brother_starup(index: number): void;

        /**获取具体神灵所有星级配置信息*/
        getStarCfgList(index: number): { [star: number]: ShenlingXingjiConfig };

        /**神迹奖励红点*/
        getShenJiRewardHint(index: number): boolean;
    }
}