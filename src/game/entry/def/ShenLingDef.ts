namespace game {
    import LanDef = game.localization.LanDef;

    export const enum ShenLingEvent {
        ON_SHEN_LING_UPDATE_INFO = "on_shen_ling_update_info",
        ON_SHEN_LING_UP_STAR_INFO = "on_shen_ling_up_star_info",
        ON_SHEN_LING_JI_BAN_UPDATE = "on_shen_ling_ji_ban_update",
        ON_SHEN_LING_REWARD_UPDATE = "on_shen_ling_reward_update",
        ON_SHEN_LING_UPDATE_CNT = "on_shen_ling_update_cnt",//已激活神灵数量变更，灵池会用到
        ON_SHEN_LING_LING_QI_UPDATE = "on_shen_ling_ling_qi_update",
        ON_SHEN_LING_LING_PO_UPDATE = "on_shen_ling_ling_po_update",
        ON_SHEN_LING_LING_LI_UPDATE = "on_shen_ling_ling_li_update",
        ON_SHEN_LING_UPDATE_TYPE = "on_shen_ling_update_type",//检测神灵类型变化，用于灵魄页签展示
        ON_LING_LI_ICON_SELECT = "on_ling_li_icon_select",
        ON_LING_LI_MAIN_ICON_SELECT = "on_ling_li_main_icon_select",
        ON_SHEN_LING_EVOLVE_INFO_UPDATE = "on_shen_ling_evolve_info_update",
    }

    /**神灵类型，风雷水火光暗*/
    export const enum ShenLingType {
        Default = 0,//所有类型
        Wind = 1, //风
        Mine = 2, //雷
        Water = 3,//水
        Fire = 4, //火
        Light = 5,//光
        Dark = 6  //暗
    }

    /**神灵类型数组，火水风雷*/
    export const ShenLingTypeAry: ShenLingType[] = [ShenLingType.Fire, ShenLingType.Water, ShenLingType.Wind, ShenLingType.Mine];
    /**神灵类型按钮，所有类型0+火水风雷*/
    export const ShenLingTypeBtnAry: ShenLingType[] = [ShenLingType.Default, ShenLingType.Fire, ShenLingType.Water, ShenLingType.Wind, ShenLingType.Mine];

    /**神灵类型名称，风雷水火光暗*/
    export const ShenlingTypeName = {
        [ShenLingType.Wind]: LanDef.shenling_name1,
        [ShenLingType.Mine]: LanDef.shenling_name2,
        [ShenLingType.Water]: LanDef.shenling_name3,
        [ShenLingType.Fire]: LanDef.shenling_name4,
        [ShenLingType.Light]: LanDef.shenling_name5,
        [ShenLingType.Dark]: LanDef.shenling_name6
    };

    /**
     * 神灵 等级|攻击 属性
     */
    export const ShenLingTypeAttrKey: { [type: number]: string[] } = {
        [ShenLingType.Wind]: [AttrKey.wind_val, AttrKey.wind_atk],
        [ShenLingType.Mine]: [AttrKey.mine_val, AttrKey.mine_atk],
        [ShenLingType.Water]: [AttrKey.water_val, AttrKey.water_atk],
        [ShenLingType.Fire]: [AttrKey.fire_val, AttrKey.fire_atk]
    };

    /**
     * 神灵合击tips展示内容
     * [读取人物属性，技能表cd字段，buff表probability字段]
     */
    export const ShenLingHeJiAttrType: { [type: number]: string[] } = {
        [ShenLingType.Wind]: [AttrKey.wind_val, 'cd', 'probability'],
        [ShenLingType.Mine]: [AttrKey.mine_val, 'cd', 'probability'],
        [ShenLingType.Water]: [AttrKey.water_val, 'cd', 'probability'],
        [ShenLingType.Fire]: [AttrKey.fire_val, 'cd', 'probability']
    };

    /**
     * ShenLingHeJiAttrType 对应的 中文名
     */
    export const ShenLingHeJiAttrTypeName: { [type: number]: string[] } = {
        [ShenLingType.Wind]: ['', '冷却时间', '风蚀概率'],
        [ShenLingType.Mine]: ['', '冷却时间', '雷驰概率'],
        [ShenLingType.Water]: ['', '冷却时间', '水浸概率'],
        [ShenLingType.Fire]: ['', '冷却时间', '火灼概率']
    };

    /**神灵普攻技能展示内容*/
    export const ShenLingPuGongAttr: string[] = ['skill_coefs', 'fixdma', 'next_cd'];
    export const ShenLingPuGongAttrName: string[] = ['普攻倍率', '固定伤害', '攻击频率'];

    /**神灵技能类型*/
    export const enum SLSkillType {
        HeJi = 1,   //合击
        LingBao = 2,//灵宝
        PuGong = 3, //普攻
        Talent = 4, //天赋
    }

    export const enum ShenLingMdrType {
        Main = 1,
        UpStar = 2,
        Lingqi = 3,
        Lingpo = 4,
        Lingli = 5
    }

    /**灵魄套装icon数量*/
    export const LingPoMaxCnt = 8;

    /**灵力主动技能idx*/
    export const LingliMainSkillIdx = 999;

    /**灵力货币index*/
    export const LingliPointAry: number[] = [PropIndex.Linglipoint1, PropIndex.Linglipoint2, PropIndex.Linglipoint3,
        PropIndex.Linglipoint4, PropIndex.Linglipoint5, PropIndex.Linglipoint6];
}