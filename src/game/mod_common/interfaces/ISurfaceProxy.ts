namespace game.mod {

    import IProxy = base.IProxy;
    import HorseJibanConfig = game.config.HorseJibanConfig;
    import module_event_add_attr_data = msg.module_event_add_attr_data;
    import HorseConfig = game.config.HorseConfig;
    import attributes = msg.attributes;
    import ride_item = msg.ride_item;
    import huashen_unit_data = msg.huashen_unit_data;

    export interface ISurfaceProxy extends IProxy {
        c2s_ride_oper_jiban(headType: number, index: number, rideIndex?: number): void;//请求激活羁绊
        /**羁绊是否激活*/
        isJibanAct(headType: number, index: number): boolean;

        /**羁绊单个外显是否已激活*/
        isJibanItemAct(headType: number, index: number, rideIndex: number): boolean;

        /**羁绊配置列表*/
        getJibanCfgList(headType: number): HorseJibanConfig[];

        /**羁绊系统是否可以激活*/
        canJibanSysAct(headType: number, cfg: HorseJibanConfig): boolean;

        /**羁绊是否可以激活*/
        canJibanAct(headType: number, cfg: HorseJibanConfig): boolean;

        canJibanItemAct(headType: number, cfg: HorseJibanConfig, index: number): boolean;

        /**单个外显星级*/
        getSurfacePerStar(index: number): number;

        /**通用的属性描述*/
        getSpecialAttrDesc(index: number, specialindex: number): string;

        selJibanCfg: HorseJibanConfig;

        /**小等级*/
        getSurfaceSmallLv(headType: number): number;

        headType: number;//当前选中的表头
        selData: AvatarItemData;//选中的外显数据
        /**炼神丹使用数量*/
        getPillUseCnt(surfaceId: number, index: number): number;

        /**使用炼神丹*/
        c2s_lianshendan_swal(surfaceId: number, index: number): void;

        /**幻化激活/升星*/
        c2s_ride_oper_up_star(oper: number, surfaceId: number, headType: number, pos?: number): void;

        canUpStar(index: number): boolean;//是否可激活，升星
        getSurfaceTypes(headType: number): number[];

        getSurfaceTypeHint(headType: number, type: number): boolean;

        getSurfaceId(headType: number): number;

        getSurfaceCfgList(headType: number, type: number): HorseConfig[];

        getSurfacePerHint(cfg: HorseConfig): boolean;

        getSurfacePerAttr(index: number): attributes;

        getSurfaceMaxStar(headType: number): number;

        getStarPropCnt(headType: number, quality: number, propIndex: number, star: number): number;

        getSurfacePillCost(quality: number, star: number, headType: number): number[][];

        getBtnType(headType: number): string;

        c2s_ride_oper_skill_active(skillId: number, headType: number): void;

        c2s_ride_oper_up(oper: number, headType: number): void;

        getJibanHint(headType: number): string[];

        getGiftHint(headType: number): string[];

        getDefaultId(headType: number): number;

        getSurfaceAllAttr(headType: number): attributes;

        getSurfaceSkillId(headType: number): number;

        getSurfaceStage(headType: number): number;

        getSurfaceSkillList(headType: number): number[];

        isSurfaceSkillAct(headType: number, skillId: number): boolean;

        getSurfacePerLv(headType: number): number;

        getSurfaceLv(headType: number): number;

        getSurfaceExp(headType: number): number;

        getSurfaceUpExp(headType: number, index: number): number;

        getSurfaceUpCost(headType: number, index: number): number[][];

        /**进阶奖励是否购买*/
        hasGiftBuy(headType: number, index: number): boolean;

        /**购买礼包*/
        c2s_buy_reward(headType: number, index: number): void;

        isJiban(headType?: number): boolean;

        isStar(headType?: number): boolean;

        getStarRoadByHeadType(headType?: number): string;

        getHeadTypeToStarHint(headType?: number): string[];

        isDefaultAct(headType: number): boolean;//默认外显是否激活

        isBattle(headType: number, index: number): boolean;//是否出战

        getPosIndex(headType: number, pos: number): number;//获取上阵的外显

        canPosBattle(headType: number): boolean;//部位是否可上阵

        getCanBattleInfos(headType: number): ride_item[];//获取可上阵的外显，不包含当前已上阵的外显

        getSurfacePerInfo(index: number): ride_item;//单个外显信息

        getBattleHint(headType: number): string[];

        getOpenIdx(headType:number):number;

        getActHint(headType: number): boolean;

        getSurfaceActCnt(headType: number): number;

        resetHuashenIds(): void;
        setHuashenIds(curId: number): void;
        readonly huashenIds: number[];//上阵的化神
        huashenTime: number;//化神变身持续时间
    }
}