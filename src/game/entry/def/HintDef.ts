namespace game {
    /**红点事件*/
    export const enum HintEvent {
        ON_COMMON_HINT_UPDATE = "on_common_hint_update",/**公共红点刷新事件，发送事件时，会携带红点key,如ModName*/
    }

    /**定时器类型*/
    export const enum TimeEventType {
        ManyBoss = 1,//多人boss
        PersonalBoss,//单人boss
        Lingchi,//灵池奖励
        Offline,//挂机
        GivingShenLing,//送瑶姬
        ManyBossRevive,//多人boss复活
        VipBossRevive,//vip boss复活
        TiannvWelfare,//天女赐福
        VipWelfare,//VIP5福利
        AbyssBoss,//坠魔深渊
        CrossBoss,//跨服boss开启
        AbyssBossClose,//坠魔深渊关闭
        Sea1,//幻境之海，仙界之海
        Sea2,//幻境之海，神界之海
        Sea3,//幻境之海，圣界之海
        XiandiOpen,//仙帝争霸
        XianmaiStart,//仙脉争夺开始
        XianmaiEnd,//仙脉争夺结束
    }

    /**红点类型*/
    export const enum HintType {
        XiuxianReward = "00",//修仙进阶奖励红点
        XiuxianTask = "01",//修仙任务红点
        XiuxianBreak = "02",//修仙飞升红点
        XiandanType1 = "03",//仙丹使用红点
        XiandanType2 = "04",//仙丹使用红点
        XiandanType3 = "05",//仙丹使用红点
        LingchiReward = "06",//灵池奖励红点
        LingchiUp = "07",//灵池升级红点
        LingchiBattle = "08",//灵池派遣红点
        LingmaiUp = "09",//灵脉升级红点
        LinggenUp = "10",//灵根升级红点
        PassWorldMapBox = "11",//闯关世界地图宝箱奖励红点
        StrengthBtn = "12",//强化按钮红点
        StrengthOneKeyBtn = "13",//一键强化按钮红点
        StrengthMasterBtn = "14",//强化大师红点
        GemOneKeyMergeBtn = "15",//宝石一键合成按钮红点
        GemOneKeyInlayBtn = "16",//宝石一键镶嵌按钮红点
        GemAttrBtn = "17",//宝石属性红点
        GemMasterBtn = "18",//宝石大师红点
        AdvancedBtn = "19",//进阶按钮红点
        AdvancedMasterBtn = "20",//进阶大师红点
        BagCompose = "21",//背包合成红点
        XianfaOneKeyUpgrade = "22",//仙法一键升级红点
        XianfaOneKeyWear = "23",//仙法一键穿戴红点
        XianfaItem = "24",//仙法列表项红点
        XianfaUpgrade = "25",//单个仙法升级红点
        XianfaUpStar = "26",//单个仙法升星红点
        XianfaStudy = "27",//单个仙法精研红点
        HorseUp = "30",//坐骑一键升级红点
        HorseSkill = "31",//坐骑技能激活红点
        HorseJiban = "32",//坐骑羁绊红点
        HorseGift = "33",//坐骑进阶礼包红点
        HorseAct = "34",//坐骑升星激活红点
        HorsePill = "35",//坐骑炼神丹红点
        TianshenUp = "40",//元灵一键升级红点
        TianshenSkill = "41",//元灵技能激活红点
        TianshenJiban = "42",//元灵羁绊红点
        TianshenGift = "43",//元灵进阶礼包红点
        TianshenAct = "44",//元灵升星激活红点
        TianshenPill = "45",//元灵炼神丹红点
        TianshenEqpOpe = "46",//元灵装备激活、升阶红点
        TianshenSuitOpe = "47",//元灵套装激活、升阶红点
        FubenChallenge1 = "50",//个人副本挑战红点
        FubenChallenge2 = "51",//个人副本挑战红点
        FubenChallenge3 = "52",//个人副本挑战红点
        FubenReset1 = "53",//个人副本重置红点
        FubenReset2 = "54",//个人副本重置红点
        FubenReset3 = "55",//个人副本重置红点
        XiantaChallenge1 = "60",//仙塔副本挑战红点
        XiantaChallenge2 = "61",//仙塔副本挑战红点
        XiantaChallenge3 = "62",//仙塔副本挑战红点
        XiantaSweep1 = "63",//仙塔副本扫荡红点
        XiantaSweep2 = "64",//仙塔副本扫荡红点
        XiantaSweep3 = "65",//仙塔副本扫荡红点
        XiantaReward1 = "66",//仙塔副本奖励红点
        XiantaReward2 = "67",//仙塔副本奖励红点
        XiantaReward3 = "68",//仙塔副本奖励红点
        XiantaRank1 = "69",//仙塔副本大神榜奖励红点
        XiantaRank2 = "70",//仙塔副本大神榜奖励红点
        XiantaRank3 = "71",//仙塔副本大神榜奖励红点
        BossChallenge = "80",//多人boss挑战红点
        PersonalBossChallenge = "81",//个人boss挑战红点
        CrossBossChallenge = "82",//跨服boss挑战红点
        DoufaChallenge = "83",//斗法匹配红点
        DoufaReward = "84",//斗法阶段奖励红点
        DoufaWinReward = "85",//斗法连胜奖励红点
        WingGift = "86",//羽翼豪礼红点
        WingUp = "87",//羽翼升级红点
        WingSkill = "88",//羽翼技能红点
        WingAct = "89",//羽翼激活红点
        WingPill = "90",//羽翼炼神单红点
        WeaponGift = "92",//神兵豪礼红点
        WeaponUp = "93",//神兵升级红点
        WeaponSkill = "91",//神兵技能红点
        WeaponAct = "94",//神兵激活红点
        WeaponPill = "95",//神兵炼神单红点
        BodyGift = "96",//时装豪礼红点
        BodyUp = "97",//时装升级红点
        BodySkill = "98",//时装技能红点
        BodyAct = "99",//时装激活红点
        BodyPill = "100",//时装炼神单红点
        RoleRingType1 = "105",//主角光环红点
        RoleRingType2 = "106",//主角光环妖帝红点
        RoleRingType3 = "107",//主角光环妖神红点
        BagProp = "110",//背包道具红点
        YouliChallenge = "111",//游历挑战红点
        HuashenUp = "120",//化神一键升级红点
        HuashenSkill = "121",//化神技能激活红点
        HuashenAct = "122",//化神升星激活红点
        HuashenPill = "123",//化神炼神丹红点
        PunshList = "124",//新服冲榜活动
        HuashenZhilu = "125",//化神之路红点
        HuashenZhanshendian = "126",//化神战神殿红点
        UnionBeastReward = "127",//仙宗仙兽奖励
        UnionBeastTask = "128",//仙宗仙兽任务
        UnionWage = "129",//仙宗工资
        UnionBeastUp = "130",//仙宗仙兽升级
        UnionDonate = "139",//仙宗捐赠
        UnionRank = "140",//仙宗排行榜
    }

}

