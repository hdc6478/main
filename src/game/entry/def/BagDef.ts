namespace game {
    export const EquipMeltQuality: number = 3;//装备熔炼品质限制*/
    export const BagEquipTipsCnt: number = 20;//装备背包剩余数量小于20时提示熔炼，检测背包也用到*/

    export const enum BagEvent {
        ON_PROP_COMPOSE_SEL_UPDATE = "on_prop_compose_sel_update",//道具合成选中刷新
        ON_PROP_COMPOSE_SUCCESS = "on_prop_compose_success",//道具合成成功
        ON_BAG_MELT_TIP = "on_bag_melt_tip",//熔炼提示
        ON_BAG_MELT_VALUE_UPDATE = "on_bag_melt_value_update",//熔炼数值更新
        ON_BAG_REWARD_SELECT_SHOW = "on_bag_reward_select_show",//自选宝箱奖励长按提示

        /**以下为公共事件*/
        ON_BAG_MAX_CNT_UPDATE = "on_bag_max_cnt_update",//背包最大格子数更新，会携带背包类型数组*/
        ON_BAG_UPDATE_BY_PROP_TYPE = "on_bag_update_by_prop_type",//通过道具类型监听背包数据变更，会携带道具类型数组，仅道具表使用*/
        ON_BAG_UPDATE_BY_BAG_TYPE = "on_bag_update_by_bag_type",//通过背包类型监听背包数据变更，会携带背包类型数组*/
        ON_BAG_UPDATE_BY_PROP_INDEX = "on_bag_update_by_prop_index",//通过道具index监听背包数据变更，会携带道具index数组，仅道具类型为1和7使用*/
        ON_BAG_UPDATE_BY_HEAD_TYPE = "on_bag_update_by_head_type",//通过表头 ConfigHead 监听背包数据变更，会携带表头信息数组，提供给非道具表道具使用*/
        ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE = "on_bag_update_by_prop_type_and_subtype",//通过道具类型、子类型监听，仅PropListenerSubType使用*/
    }

    /**道具不足弹窗类型*/
    export const enum PropLackType {
        None = 0,//不提示
        Dialog = 1,//弹窗提示，由道具表gain_id字段控制
        Text = 2,//文本提示，例如：元宝不足，由道具表gain_id字段控制
    }

    /**
     * Icon显示类型
     */
    export const enum IconShowType {
        Reward = 1,//正常奖励，默认*/
        Bag,//背包*/
        NotTips,//不弹道具提示，例如身上穿戴的装备*/
        NotCnt,//不显示数量文本*/
        Name,//显示名字
        UnionExchange,//仙宗兑换
    }

    /**
     * Icon角标类型
     */
    export const enum IconTagType {
        Guishu = 1,//归属*/
    }

    export const enum PropEasyUseType {
        /**不推荐不自动使用 */
        None = 0,
        /**快捷使用主界面弹窗 */
        Easy = 1,
        /**自动使用 获得即请求协议使用 */
        Auto = 2,
    }

    /**背包类型*/
    export const enum BagType {
        Goods = 1,              //道具*/
        Material = 2,           //材料*/
        RoleEquip = 3,          // 角色装备*/
        ShenlingEquip = 4,      // 神灵装备*/
        Gem = 5,                // 宝石*/
        YuanlinEquip = 6,       // 元灵装备*/
        BaozangSuipian = 7,     //宝藏碎片
        Yishou = 8,             //异兽
        XujieJitan = 9,         //墟界祭坛
        TimeGoddess = 10,       //创世女神供奉
        Hunka = 11,       //创世女神魂卡
        Suit = 12,              //套装装备
    }

    /**背包名字*/
    export const BagTypeToName: { [type: number]: string } = {
        [BagType.Goods]: "道具背包",
        [BagType.Material]: "材料背包",
        [BagType.Gem]: "宝石背包",
        [BagType.RoleEquip]: "装备背包",
        [BagType.ShenlingEquip]: "神灵装备背包",
        [BagType.YuanlinEquip]: "元灵装备背包",
    };

    /**index规则*/
    export const enum PropParseType {
        BigType,     // 大类 ABCDE，用于bag_type配置取排序*/
        Type,       // 表头 ABC，ConfigHead*/
        PropType,   // 类型 DE，PropType，EquipPropType*/
        PropSubType,// 子类型 F，PropSubType*/
    }

    /**index规则取字段*/
    export const PropParseTypeList: { [type: number]: number[] } = {
        [PropParseType.BigType]: [0, 5],// 大类 ABCDE，用于bag_type配置取排序*/
        [PropParseType.Type]: [0, 3],// 表头 ABC，ConfigHead*/
        [PropParseType.PropType]: [3, 2],// 类型 DE，PropType，EquipPropType*/
        [PropParseType.PropSubType]: [5, 2],// 子类型 FG，PropSubType*/
    };

    /**道具表物品类型，DE*/
    export const enum PropType {
        Coin = 0,//货币*/
        Good = 1,//物品*/
        Compose = 2,//可合成道具*/
        Box = 3,//宝箱
        Gem = 4,//宝石*/
        Xianfa = 5,//仙法材料*/
        ChallengeProp = 7,//增加挑战次数的道具
        VipExp = 8,//VIP经验券
        XianDan = 9,//仙丹*/
        //10，展示用道具
        Surface = 11,//外显碎片*/
        Consecrate = 12,//供奉系统材料
        Amass = 13,//图鉴妖录
        XianjianBuwei = 15,//仙剑部位材料
        Lianshendan = 17,//炼神丹*/
        YuanlinZhuangbei = 29,//元灵装备*/
        UpStar = 32,//外显升星石
        Lingpo = 33,//灵魄
        BaozangSuipian = 34,//宝藏碎片
        ZhanduiLingbao = 36,//战队灵宝
        TimeGoddess = 37,//创世女神供奉
        Hunka = 38,//创世女神魂卡
    }

    /**道具需要监听子类型的类型集合，比如外显系统需要子类型来区分*/
    export const PropListenerSubType = [
        PropType.Surface,
        PropType.Lianshendan,
        PropType.UpStar
    ]

    /**装备表装备类型，DE*/
    export const enum EquipPropType {
        RoleEquip = 1,// 01=主角装备
        Yishou = 2,   //02=异兽兽骨
        Shouling = 3, //03=异兽兽灵
        // 02=精灵装备
        // 03=羽翼装备
        // 04=坐骑装备
        // 05=圣女装备
        // 06=降神装备
        Suit = 8,//套装装备
        Lingqi = 9,//神灵灵器
    }

    /**宝箱子类型，F*/
    export const enum PropSubType3 {
        Type1 = 1,//1.普通
        Type2,//2.自选
        Type3,//3.随机
        Type4,//4.掉落
        Type5//5.固定+随机
    }

    /**宝石子类型，F*/
    export const enum PropSubType4 {
        Type1 = 1,
        Type2,
        Type3,
        Type4,
        Type5
    }

    /**技能书子类型 */
    export const enum PropSubType5 {
        Type1 = 1,
        Type2,
        Type3,
        Type4,
    }

    /**增加挑战次数的道具子类型，这种类型是一对一的关系，客户端不需要定义，F*/
    export const enum PropSubType7 {
        // 1	多人boss挑战
        // 2	封魔圣殿
        // 3	金龟宝穴
        // 4	蓬莱仙境
        // 5	云游
        // 6	斗法
        // 7	归墟挑战令
        // 8	妖界挑战令
        // 9	众神挑战令
        // 10	修罗地宫挑战令
        // 11	跨服boss挑战令
        // 12	姻缘-修罗场挑战令
        // 13	道侣试炼符
        // 14	赛季远征挑战令
        // 15	赛季竞速挑战令
        // 16	圣域探索符
    }

    /**丹药子类型，F*/
    export const enum PropSubType9 {
        Danyao = 1,//丹药*/
        Lingdan,//灵丹*/
        Xiandan//仙丹*/
    }

    /**外显碎片子类型，F*/
    export const enum PropSubType11 {
        Horse = 1,//坐骑*/
        Tianshen,//元灵*/
        Shenling,//神灵
        Weapon = 6,//神兵
        Wing = 7,//羽翼
        Body = 8,//时装
        Huashen = 9,//化神
    }

    /**炼神丹子类型，F*/
    export const enum PropSubType17 {
        Horse = 1,//坐骑*/
        Tianshen,//元灵*/
        Wing = 3,//羽翼
        Weapon = 4,//神兵
        Body = 5,//时装
        Huashen = 6,//化神
    }

    /**外显升星石子类型，F*/
    export const enum PropSubType32 {
        Horse = 1,//坐骑升星石
        Shenling,// 神灵升星石
        Tianshen,// 元灵升星石
        Xianfa,// 仙法升星石
        Wing,// 羽翼升星石
        Body,// 时装升星石
        Weapon,// 神兵升星石
        Xianjian,// 仙剑升星石
        Huashen,//化神升星石
    }

    /**创世女神供奉类型，F*/
    export const enum PropSubType37 {
        Speedup = 1,//加速道具
        Jipin,//女神祭品
    }

    /**创世女神魂卡子类型，F*/
    export const enum PropSubType38 {
        Yaohun1 = 1,// 妖魂
        Xianhun2,// 仙魂
        Shenhun3// 神魂
    }

    /**道具使用限制类型，服务端定*/
    export const enum PropUseLimitType {
        VIP_INDEX = 1,//  -- vip
        LOGINDAY = 2,//   -- 登录天数
        /**新加限制类型时，BagProxy红点也要刷新*/
        // OPENDAY = 3,//    -- 开服天数
        // ROLELEVEL = 4,//  -- 角色等级
        // ZSLEVEL = 5,//    -- 转生等级
        OwnLoginDay = 7,//    -- 根据得到时候开始算的登录x天数可使用
    }

    /**道具index*/
    export const enum PropIndex {
        Yuanbao = 1450000001,            //元宝		货币
        Xianyu = 1450000002,             //仙玉		货币
        Zhujuejingyan = 1450000003,      //主角经验	货币
        Lingqi = 1450000004,             //灵气		货币
        Shenlingjinghua = 1450000005,    //神灵精华	货币
        Mucai = 1450000006,              //木材		货币
        Maiqi = 1450000007,              //脉气		货币
        Xianqi = 1450000008,             //仙气	    货币
        Huoyuedu = 1450000009,           //活跃度	虚拟道具，角色那边不用做映射数值
        Jingjibi = 1450000011,           //竞技币	货币,
        Fscoin = 1450000012,             //封神古币  货币
        Ylcoin = 1450000013,             //游历古币，实际上就是游历积分  货币
        Dlcoin = 1450000014,             //道侣仙石  货币
        Lmcoin = 1450000015,             //灵脉灵石  货币
        Xzcoin = 1450000016,             //星之魂石  货币
        Pretige = 1450000017,            //声望      货币
        Sgcoin = 1450000018,             //时光币    货币
        Gfjs = 1450000025,             //供奉积分    货币
        GuildTiantan = 1450000026,       //天坛
        GuildShengtan = 1450000027,       //圣坛
        Linglipoint1 = 1450000021,       //风系灵力点（对应ShenLingType）货币
        Linglipoint2 = 1450000022,       //雷系灵力点
        Linglipoint3 = 1450000020,       //水系灵力点
        Linglipoint4 = 1450000019,       //火系灵力点
        Linglipoint5 = 1450000024,       //光系灵力点
        Linglipoint6 = 1450000023,       //暗系灵力点
        Xtlqcoin = 1450000028,           //仙胎灵气
        Ssscoin = 1450000029,        //三生石
        Chengjiujifen = 1450000030,	 //成就积分
        Tianxingzhu = 1450000031,//天星珠
        Gongfeng = 1451201005,//供奉1小时加速
        Feishengjingyanzhi = 1450000032,//飞升经验值
        Huashenzhilujifen = 1450000033,//化神之路积分
        Caiyunyinji = 1450000035,//财运印记
        Xingshi = 1450000036,//星石
        GuildScore = 1450000037,//个人宗门积分
        GuildXianshouExp = 1450000038,//宗门仙兽经验
        XujieNengliangshi = 1450000039,//墟界能量石
        XujieShuijing = 1450000040,//墟界水晶
        //1450000041	创世女神亲密度
        Chuangshinengliang = 1450100174,//创世能量
        FengmoScore = 1450000043,//封魔积分
        XianmaiScore = 1450000044,//仙脉争夺积分
        Sea1 = 1450000045,//仙界之海能量
        Sea2 = 1450000046,//神界之海能量
        Sea3 = 1450000047,//圣界之海能量
        Huanggushuijing = 1450000050,//荒古水晶
        Xianqivalue = 1450000051,//仙帝宝库兑换币
        NvshenJiasu = 1453701001,//48小时加速,献祭加速

        /**新加货币的话，RoleDef里面的PropIndexToKey也要处理下*/

        Lingmaishengdan = 1450100001,	//灵脉圣丹	 材料
        Genjishengguo = 1450100002,	    //根基圣果	 材料
        Ronglianjingshi = 1450100005,	//熔炼晶石	 材料
        Zuoqijinjiedan = 1450100042,	//坐骑进阶丹  材料
        Yuanlingjinjiedan = 1450100064,	//元灵进阶丹  材料
        Shenbinjiedan = 1450100105,	//神兵进阶丹  材料
        Yuyijinjiedan = 1450100106,	//羽翼进阶丹  材料
        ChangeNameCard = 1450100029, //改名卡
        SummonLiQuan = 1450100114,//召唤系统礼券
        Yaoshoulingsui = 1450100117,//妖兽灵髓
        Moshoulingsui = 1450100118,//魔兽灵髓
        Xianshenyu = 1450100119, //仙神玉
        Baoshi = 1451000003,//展示用宝石，用于宝石来源提示，特殊道具
        Rlcoin = 1450100005,//熔炼晶石
        Ticket = 1450100007,//奖券
        Kunxiansheng = 1450100133,//捆仙绳
        Huashenjinjiedan = 1450100046,//化神进阶丹
        Xianjianjinjiedan = 1450100140,//仙剑初级锻炼石
        Caiyunjinding = 1450100149,//财运金锭
        MoHun = 1451202023,//魔魂
        XujieJitanJiasu = 1453501001,//墟界祭坛加速道具
        XujieTansuoling = 1450100154,//墟界探索令
        HuanjingBossTiaozhanling = 1450100158,	//幻境boss挑战令

        //------------------------增加挑战次数的道具，道具类型07----------------------------
        DuorenBoss = 1450701001,//多人BOSS挑战劵
        Fengmoling = 1450702001,//封魔令
        Jinguiling = 1450703001,//金龟令
        Penglailing = 1450704001,//蓬莱令
        XianlvShilian = 1450712001,//仙侣试炼
        XianlvZhanchang = 1450713001,//仙侣战场
        YouliJuanzhou = 1450705001,//云游，游历卷轴
        DoufaJuanzhou = 1450706001,//斗法卷轴
        //------------------------增加挑战次数的道具----------------------------
        //------------------------展示道具，道具类型10----------------------------
        Jingjichangjifen = 1451000001,//	竞技场积分

        CommonEquip = 1451000002,//通用装备显示index 不做实际获得
        ShenlingSuipian = 1451000004,//神灵碎片
        Jipin = 1453702001,//祭品道具1
    }

    /**道具数量显示成时间文本，统一秒*/
    export const PropCntShowTimeStr = [
        PropIndex.Gongfeng,
        PropIndex.XujieJitanJiasu,
        PropIndex.NvshenJiasu
    ];
}