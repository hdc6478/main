namespace game {

    export const enum RoleEvent {
        ON_ROLE_UPDATE = "on_role_update", /**角色属性更新，会携带属性字段数组*/
        ON_SERVER_DAY_UPDATE = "on_server_day_update", /**更新天数*/
        ON_ROLE_PRIVILEGE_UPDATE = "on_role_privilege_update", /**角色特权更新，会携带特权字段数组*/

        ON_XIUXIANNVPU_INFO_UPDATE = "on_xiuxiannvpu_info_update",
        ON_XIUXIANNVPU_OFFLINE_REWARD_UPDATE = "on_xiuxiannvpu_offline_reward_update",
        ON_XIUXIANNVPU_OFFLINESETTING_SELECT = "on_xiuxiannvpu_offlineSetting_select",
        ON_XIUXIANNVPU_OFFLINESETTING_SELECT_DEL = "on_xiuxiannvpu_offlineSetting_select_del",
        /**修仙女仆特殊处理，可携带参数boolean，重置30秒cd
         * （扫荡结算界面关闭，扫荡协议处理，挑战结算界面关闭，手动退出boss挑战等等抛出）*/
        ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT = "on_xiuxiannvpu_special_challenge_next",
    }

    //////////////////////////////////////称号//////////////////////////////////////
    /** 称号事件*/
    export const enum TitleEvent {
        TITLE_INFO_UPDATE = "title_info_update",
    }

    //-----------------------------------装扮------------------------------------------
    export const enum DressUpEvent {
        DRESS_UP_ITEM_CLICK_BACK = "dress_up_item_click_back",//装扮item点击
        DRESS_UP_INFO_UPDATE = "DRESS_UP_INFO_UPDATE",//装扮信息更新
    }

    /**装扮类型 1:头像 2:相框 3:气泡*/
    export const enum DressUpType {
        Head = 1,
        Frame = 2,
        Bubble = 3,
    }

    export const enum SuitEvent {
        ON_SUIT_EQUIP_INFO_UPDATE = "ON_SUIT_EQUIP_INFO_UPDATE",//套装类型1,2数据更新
        ON_SUIT_COMPOSE_SELECT_UPDATE = "ON_SUIT_COMPOSE_SELECT_UPDATE",//套装类型1,2的合成界面刷新
        ON_SUIT_EQUIP_INFO_UPDATE_TWO = "ON_SUIT_EQUIP_INFO_UPDATE_TWO",//套装类型3,4,5数据更新
        ON_SUIT_DUANZAO_SWITCH_ICON_INFO = "ON_SUIT_DUANZAO_SWITCH_ICON_INFO",//锻造点击icon，抛出数据以刷新界面
        ON_SUIT_EQUIP_SYNTHESIS_UPDATE = "on_suit_equip_synthesis_update",//套装装备合成
    }

    /**套装类型*/
    export const enum SuitType {
        CangTian = 1,//苍天
        YanTian = 2,//炎天
        HaoTian = 3,//颢天
        XuanTian = 4,//玄天
        JunTian = 5//钧天
    }

    /**套装类型名*/
    export const SuitTypeName = {
        [SuitType.CangTian]: '苍天',
        [SuitType.YanTian]: '炎天',
        [SuitType.HaoTian]: '颢天',
        [SuitType.XuanTian]: '玄天',
        [SuitType.JunTian]: '钧天'
    };

    /**套装操作类型*/
    export const enum SuitOperType {
        JinJie = 1,//进阶
        DuanZao = 2,//锻造(3,4,5类型)、强化(1,2类型)
        JingZhu = 3//精铸
    }

    /**套装类型对应的功能开启id*/
    export const SuitTypeOpenIdx = {
        [SuitType.CangTian]: OpenIdx.SuitType1,
        [SuitType.YanTian]: OpenIdx.SuitType2,
        [SuitType.HaoTian]: OpenIdx.SuitType3,
        [SuitType.XuanTian]: OpenIdx.SuitType4,
        [SuitType.JunTian]: OpenIdx.SuitType5
    };

    /**不同套装不同部位展示的属性*/
    export const SuitTypePosAttr = {
        [EquipPos.SWORD]: {
            [SuitType.HaoTian]: ['atk', 'crit'],
            [SuitType.XuanTian]: ['atk', 'crit'],
            [SuitType.JunTian]: ['atk', 'hit']
        },
        [EquipPos.CLOTHES]: {
            [SuitType.HaoTian]: ['max_hp', 'armor'],
            [SuitType.XuanTian]: ['max_hp', 'armor'],
            [SuitType.JunTian]: ['max_hp', 'armor']
        },
        [EquipPos.BELT]: {
            [SuitType.HaoTian]: ['atk', 'armor_break'],
            [SuitType.XuanTian]: ['atk', 'armor_break'],
            [SuitType.JunTian]: ['atk', 'armor_break']
        },
        [EquipPos.PANTS]: {
            [SuitType.HaoTian]: ['max_hp', 'armor'],
            [SuitType.XuanTian]: ['max_hp', 'armor'],
            [SuitType.JunTian]: ['max_hp', 'armor']
        },
        [EquipPos.NECKLACE]: {
            [SuitType.HaoTian]: ['atk', 'crit'],
            [SuitType.XuanTian]: ['atk', 'crit'],
            [SuitType.JunTian]: ['atk', 'hit']
        },
        [EquipPos.JADE]: {
            [SuitType.HaoTian]: ['atk', 'armor_break'],
            [SuitType.XuanTian]: ['atk', 'armor_break'],
            [SuitType.JunTian]: ['atk', 'armor_break']
        },
        [EquipPos.SHOULDER]: {
            [SuitType.HaoTian]: ['max_hp', 'recrit'],
            [SuitType.XuanTian]: ['max_hp', 'recrit'],
            [SuitType.JunTian]: ['max_hp', 'dodge']
        },
        [EquipPos.HELMET]: {
            [SuitType.HaoTian]: ['max_hp', 'recrit'],
            [SuitType.XuanTian]: ['max_hp', 'recrit'],
            [SuitType.JunTian]: ['max_hp', 'dodge']
        },
        [EquipPos.BOOT]: {
            [SuitType.HaoTian]: ['max_hp', 'armor'],
            [SuitType.XuanTian]: ['max_hp', 'armor'],
            [SuitType.JunTian]: ['max_hp', 'armor']
        },
        [EquipPos.RING]: {
            [SuitType.HaoTian]: ['atk', 'crit'],
            [SuitType.XuanTian]: ['atk', 'crit'],
            [SuitType.JunTian]: ['atk', 'hit']
        }
    };

    /**套装类型1,2的装备部位 从左到右从上到下 0 5 1 6 2 7 3 4*/
    export const SuitEquipPosAry: EquipPos[] = [
        EquipPos.SWORD, EquipPos.JADE, EquipPos.CLOTHES, EquipPos.SHOULDER,
        EquipPos.BELT, EquipPos.HELMET, EquipPos.PANTS, EquipPos.NECKLACE
    ];

    /**套装类型3,4,5的装备部位 todo 跟EquipPosAry一样*/
    export const SuitEquipPosAry1: EquipPos[] = [
        EquipPos.SWORD, EquipPos.JADE, EquipPos.CLOTHES, EquipPos.SHOULDER, EquipPos.BELT,
        EquipPos.HELMET, EquipPos.PANTS, EquipPos.BOOT, EquipPos.NECKLACE, EquipPos.RING
    ];

    /**通用激活条件类型，类型在RoleUtil映射*/
    export const enum CommonLimitType {
        Rebirth = 1,// 1=转生等级，RoleEvent.ON_ROLE_UPDATE，let keys: string[] = n.body，key：reincarnate;
        Pass,// 2=通关数量，PassEvent.MAIN_PASS_GUANQIA_UPDATE
        God,// 3=仙力
        Power// 4=战力
    }

    /**属性定义字段，目前只有特殊的属性才需要定义*/
    export const enum AttrKey {
        max_hp = "max_hp",	            //最大生命，服务端需要支持减去仙力生命
        god = "god",                    //仙力
        god_rate = "god_rate",         //仙力效果
        god_atk = "god_atk",            //仙力攻击
        god_def = "god_def",            //仙力防御
        god_hp = "god_hp",              //仙力生命
        wind_val = "wind_val",          //风系等级 1
        mine_val = "mine_val",          //雷系等级 2
        water_val = "water_val",        //水系等级 3
        fire_val = "fire_val",          //火系等级 4
        wind_atk = "wind_atk",          //风系攻击
        mine_atk = "mine_atk",          //雷系攻击
        water_atk = "water_atk",        //水系攻击
        fire_atk = "fire_atk",          //火系攻击
        skill_add_damage = "skill_add_damage",    //伤害加成
        crit = "crit",                  //暴击
        critval = "critval",            //暴伤加成
        cd = "cd",                      //冷却时间，万分比（属性表不定义，客户端用）
        theGod_addtime = "theGod_addtime",//变身时间,实际上是化神持续时间增加
        legion_god = "legion_god",      //军团神力
        child_crit = "child_crit",      //子女暴击率
    }

    /**角色属性定义字段*/
    export const enum RolePropertyKey {
        role_id = "role_id",            //角色uuid
        exp = "exp",                    //经验
        levelup_exp = "levelup_exp",    //升级所需经验
        name = "name",                  //名字
        level = "level",	            //等级
        sex = "sex",                    //性别
        reincarnate = "reincarnate",    //转生index
        vip_lv = "vip_lv",              // VIP index
        head = "head",                  //头像
        head_frame = "head_frame",      //头像框
        showpower = "showpower",        //战斗力
        title_index = "title_index",    //称号
        charge_rmb = "charge_rmb",      //累计充值
        day_charge_rmb = "day_charge_rmb",//每日充值

        gold = "gold",                  //元宝		货币
        diamond = "diamond",            //仙玉		货币
        lingqi = "lingqi",              //灵气		货币
        godess = "godess",              //神灵精华	货币
        wood = "wood",                  //木材		货币
        maiqi = "maiqi",                //脉气		货币
        xianqi = "xianqi",              //仙气		货币
        jingjibi = "jjb",               //竞技币	货币
        Fscoin = "fscoin",              //封神古币  货币
        Ylcoin = "ylcoin",             //游历古币，实际上就是游历积分  货币
        Dlcoin = "dlcoin",             //道侣仙石  货币
        Lmcoin = "lmcoin",             //灵脉灵石  货币
        Xzcoin = "xzcoin",             //星之魂石  货币
        Pretige = "pretige",            //声望      货币
        Sgcoin = "sgcoin",              //时光币    货币
        Gfjs = "gfjs",                  //供奉积分  货币
        GuildTiantan = "guild_tiantan",  //天坛积分
        GuildShengtan = "guild_shengtan",  //圣坛积分
        LingliPoint1 = "feng_linglipoint",  //风系灵力点（对应ShenLingType）  货币
        LingliPoint2 = "lei_linglipoint",   //雷系灵力点  货币
        LingliPoint3 = "shui_linglipoint",  //水系灵力点  货币
        LingliPoint4 = "huo_linglipoint",   //火系灵力点  货币
        LingliPoint5 = "guang_linglipoint", //光系灵力点  货币
        LingliPoint6 = "an_linglipoint",    //暗系灵力点  货币
        Xtlqcoin = "xtlqcoin",               //仙胎灵气  货币
        Ssscoin = "ssscoin",               //三生石  货币
        chengjiu_jifen = "chengjiu_jifen",      //成就积分，虚拟道具
        Tianxingzhu = "attic_point",       //天星珠 货币
        storage_time = "storage_time",     //供奉封印存储时间 单位秒，客户端用
        feisheng_exp = "feisheng_exp",      //飞升经验	货币
        huashen_exp = "huashen_exp",        //化神之路积分	货币
        caiyun_yinji = "caiyun_yinji",        //财运印记 货币
        GuildScore = "guild_score",        //宗门个人积分 货币
        GuildXianshouExp = "guild_xianshou_exp",        //宗门仙兽经验 货币
        xingshi = "xingshi",        //星石 货币
        zhandui_jitan_value = "zhandui_jitan_value",//战队祭坛能量石  货币
        zhandui_jitan_shuijin = "zhandui_jitan_shuijin",///战队祭坛水晶 货币
        zhandui_jitan_total_speed_time = "zhandui_jitan_total_speed_time",/// 墟界祭坛累计加速时间，客户端用
        cs_nvshen_qinmi = "cs_nvshen_qinmi",///创世女神亲密度
        // cs_nvshen_nengliang = "cs_nvshen_nengliang",///创世女神创世能量
        cs_nvshen_total_speed_time = "cs_nvshen_total_speed_time",/// 创世女神累计加速时间，客户端用
        fengmo_score = "fengmo_score",//仙宗封魔积分
        xianmai_score = "xianmai_score",//仙脉争夺积分
        xjzh_nl = "xjzh_nl",///仙界之海能量
        sjzh_nl = "sjzh_nl",///神界之海能量
        sgjzh_nl = "sgjzh_nl",///圣界之海能量
        huanggu_shuijing = "huanggu_shuijing",///荒古水晶
        xianqi_value = "xianqi_value",///仙帝宝阁货币
    }

    /**Vo属性Long需要转化成number的字段*/
    export const RoleLongKeys: string[] = [RolePropertyKey.title_index, RolePropertyKey.head, RolePropertyKey.head_frame];

    /**道具index转化成角色属性key，只有货币类型才需要定义*/
    export const PropIndexToKey: { [index: number]: string } = {
        [PropIndex.Yuanbao]: RolePropertyKey.gold,            //元宝		货币
        [PropIndex.Xianyu]: RolePropertyKey.diamond,          //仙玉		货币
        [PropIndex.Lingqi]: RolePropertyKey.lingqi,           //灵气		货币
        [PropIndex.Shenlingjinghua]: RolePropertyKey.godess,  //神灵精华	货币
        [PropIndex.Mucai]: RolePropertyKey.wood,              //木材		货币
        [PropIndex.Maiqi]: RolePropertyKey.maiqi,             //脉气		货币
        [PropIndex.Xianqi]: RolePropertyKey.xianqi,           //仙气		货币
        [PropIndex.Jingjibi]: RolePropertyKey.jingjibi,       //竞技币	    货币
        [PropIndex.Fscoin]: RolePropertyKey.Fscoin,          //封神古币  货币
        [PropIndex.Ylcoin]: RolePropertyKey.Ylcoin,          //游历古币，实际上就是游历积分  货币
        [PropIndex.Dlcoin]: RolePropertyKey.Dlcoin,          //道侣仙石  货币
        [PropIndex.Lmcoin]: RolePropertyKey.Lmcoin,            //灵脉灵石  货币
        [PropIndex.Xzcoin]: RolePropertyKey.Xzcoin,          //星之魂石  货币
        [PropIndex.Pretige]: RolePropertyKey.Pretige,           //声望      货币
        [PropIndex.Sgcoin]: RolePropertyKey.Sgcoin,           //声望      货币
        [PropIndex.Gfjs]: RolePropertyKey.Gfjs,                  //供奉积分  货币
        [PropIndex.GuildTiantan]: RolePropertyKey.GuildTiantan,         //天坛积分  货币
        [PropIndex.GuildShengtan]: RolePropertyKey.GuildShengtan,       //圣坛积分  货币
        [PropIndex.Linglipoint1]: RolePropertyKey.LingliPoint1, //风系灵力点 货币
        [PropIndex.Linglipoint2]: RolePropertyKey.LingliPoint2, //雷系灵力点 货币
        [PropIndex.Linglipoint3]: RolePropertyKey.LingliPoint3, //水系灵力点 货币
        [PropIndex.Linglipoint4]: RolePropertyKey.LingliPoint4, //火系灵力点 货币
        [PropIndex.Linglipoint5]: RolePropertyKey.LingliPoint5, //光系灵力点 货币
        [PropIndex.Linglipoint6]: RolePropertyKey.LingliPoint6, //暗系灵力点 货币
        [PropIndex.Xtlqcoin]: RolePropertyKey.Xtlqcoin, //仙胎灵气 货币
        [PropIndex.Ssscoin]: RolePropertyKey.Ssscoin, //三生石 货币
        [PropIndex.Chengjiujifen]: RolePropertyKey.chengjiu_jifen, //成就积分 虚拟道具
        [PropIndex.Tianxingzhu]: RolePropertyKey.Tianxingzhu, //天星珠 货币
        [PropIndex.Gongfeng]: RolePropertyKey.storage_time, //供奉封印存储时间 单位秒
        [PropIndex.Feishengjingyanzhi]: RolePropertyKey.feisheng_exp,       //飞升经验	货币
        [PropIndex.Huashenzhilujifen]: RolePropertyKey.huashen_exp,       //化神之路积分	货币
        [PropIndex.Caiyunyinji]: RolePropertyKey.caiyun_yinji,       //财运印记 货币
        [PropIndex.Xingshi]: RolePropertyKey.xingshi,       //星石 货币
        [PropIndex.GuildScore]: RolePropertyKey.GuildScore,       //宗门个人积分	货币
        [PropIndex.GuildXianshouExp]: RolePropertyKey.GuildXianshouExp,       //宗门个人积分	货币
        [PropIndex.XujieNengliangshi]: RolePropertyKey.zhandui_jitan_value,       //战队祭坛能量石	货币
        [PropIndex.XujieShuijing]: RolePropertyKey.zhandui_jitan_shuijin,       //战队祭坛水晶	货币
        [PropIndex.XujieJitanJiasu]: RolePropertyKey.zhandui_jitan_total_speed_time,//战队祭坛加速时间道具
        // [PropIndex.Chuangshinengliang]: RolePropertyKey.cs_nvshen_nengliang,//创世能量
        [PropIndex.NvshenJiasu]: RolePropertyKey.cs_nvshen_total_speed_time,// 创世女神累计加速时间，客户端用
        [PropIndex.FengmoScore]: RolePropertyKey.fengmo_score,// 创世女神累计加速时间，客户端用
        [PropIndex.XianmaiScore]: RolePropertyKey.xianmai_score,//仙脉争夺积分
        [PropIndex.Sea1]: RolePropertyKey.xjzh_nl,//仙界之海能量
        [PropIndex.Sea2]: RolePropertyKey.sjzh_nl,//神界之海能量
        [PropIndex.Sea3]: RolePropertyKey.sgjzh_nl,//圣界之海能量
        [PropIndex.Huanggushuijing]: RolePropertyKey.huanggu_shuijing,//圣界之海能量
        [PropIndex.Xianqivalue]: RolePropertyKey.xianqi_value,//仙帝宝库兑换币
    };

    /**角色特权定义字段*/
    export const enum RolePrivilegeKey {
        item_auto = "item_auto",            //挂机自动熔炼多余装备
        bag_box = "bag_box",                //快速开启背包宝箱（除自选宝箱外的所有宝箱）
        lingchi_income = "lingchi_income",  //灵池修炼神灵精华+x%
        wander_answer = "wander_answer",    //开启云游答题特权
        main_add_maxexp = "main_add_maxexp", //主角光环存储经验上限增加
        multiple_boss_count = "multiple_boss_count",//每天赠送多人BOSS幸运掉落次数+x
        huanggu_shuijing = "huanggu_shuijing",//是否开启荒古水晶召唤
        cs_nvshen_open = "cs_nvshen_open",//开启创世女神许愿
        zong_sweep = "zong_sweep",//宗门夺宝开启一键扫荡
    }

    /**仙力详情字段*/
    export const enum RoleGodKey {
        Body = "时装",
        Wing = "羽翼",
        Weapon = "神兵",
        Horse = "坐骑",
        Tianshen = "元灵",
        Shenling = "神灵",
        Xiuxian = "修仙",
        XianlvChild = "子女",
        Huashen = "化神",
        Xianjian = "仙剑",
    }

    export const RoleGodKeyToConfigHead: { [key: string]: number } = {
        [RoleGodKey.Body]: ConfigHead.Body,
        [RoleGodKey.Wing]: ConfigHead.Wing,
        [RoleGodKey.Weapon]: ConfigHead.Weapon,
        [RoleGodKey.Horse]: ConfigHead.Horse,
        [RoleGodKey.Tianshen]: ConfigHead.Tianshen,
        [RoleGodKey.Huashen]: ConfigHead.Huashen
    };

    /**修仙女仆在线挂机类型*/
    export const enum XiuxianNvpuEventType {
        ManyBoss = 1,           //1.多人boss
        Zhuimoshenyuan = 2,     //2.坠魔深渊
        Yijie = 3,              //3.异界boss
        Youli = 4,              //4.游历
        Doufa = 5,              //5.斗法
        Xianlvshilian = 6,      //6.仙侣试炼
        Xianlvdoufa = 7,        //7.仙侣斗法
        Xianzongfengmo = 8,     //8.仙宗封魔
        PersonalBoss = 9,       //9.个人boss
        VipBoss = 10,           //10.vipboss
        Fengmoshengdian = 11,   //11.封魔圣殿
        Jinguibaoxue = 12,      //12.金龟宝穴
        Penglaixianjing = 13,   //13.蓬莱仙境
        KuafuBoss = 14,         //14.跨服boss
        Wanjianxianta = 15,     //15.万剑仙塔
        Lingshouxianta = 16,    //16.灵兽仙塔
        Huanggujindi = 17,      //17.荒古禁地
        Xianlingjindi = 18,     //18.仙陵禁地
        Tianzhijindi = 19,      //19.天之禁地
        Shenzhijindi = 20,      //20.神之禁地
        Xianmai = 21,           //21.仙脉争夺
    }

    //映射个人副本类型
    export const FubenToNvpuEventType = {
        [FubenType.Type1]: XiuxianNvpuEventType.Fengmoshengdian,
        [FubenType.Type2]: XiuxianNvpuEventType.Jinguibaoxue,
        [FubenType.Type3]: XiuxianNvpuEventType.Penglaixianjing
    };

    //映射仙塔类型
    export const XiantaTypeToNvpuEventType = {
        [FubenType.Type1]: XiuxianNvpuEventType.Lingshouxianta,
        [FubenType.Type2]: XiuxianNvpuEventType.Wanjianxianta
    };

    //映射禁地类型
    export const JindiToNvpuEventType = {
        [ForbiddenType.Type2]: XiuxianNvpuEventType.Huanggujindi,
        [ForbiddenType.Type3]: XiuxianNvpuEventType.Xianlingjindi,
        [ForbiddenType.Type4]: XiuxianNvpuEventType.Tianzhijindi,
        [ForbiddenType.Type5]: XiuxianNvpuEventType.Shenzhijindi
    };
}