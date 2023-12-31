declare namespace game {
    const enum ProxyType {
        Login = 1,
        Scene,
        Main,
        Misc,
        Role,
        Mail,
        Hint,
        Alert,
        Pass,
        Task,
        Skill,
        Bag,
        Weapon,
        Equip,
        QiLing,
        Material,
        Result,
        TongTianTa,
        Exp,
        Clothes,
        Sprite,
        Awake,
        Wing,
        Soul,
        WorldBoss,
        VipBoss,
        Make,
        FuMo,
        Title,
        Maid,
        AttrDan,
        DnfBoss,
        Guild,
        Relic,
        Chat,
        Preview,
        King,
        Immortal,
        Hollything,
        Mounts,
        DemonInvade,
        MagicRuins,
        General,
        DressUp,
        DragonCrest,
        BodyArt,
        Battle,
        XianMeng,
        RewardBoss,
        Activity,
        Vip,
        GuildIdol,
        GodCast,
        SBG,
        EquipResolve,
        Store,
        LimitActivity,
        Hunt,
        YiWenLu,
        MoKu,
        GuildTrial,
        XunBao,
        Encounter,
        BaHuang,
        Secret,
        XMFight,
        FairyMagic,
        FairyLand,
        AllMap,
        GodWeapon,
        JianPu,
        Rank,
        Purgatory,
        BossHome,
        YYBoss,
        Suit,
        SkyBook,
        SwordSeal,
        Privilege,
        HonorVip,
        ShenYuBoss,
        SwordMean,
        CycleTower,
        GodSeat,
        RoleBlood,
        SoulWare,
        ZongMen,
        Melee,
        BaGua,
        PlayerInfo,
        WarToken,
        Glove,
        Gory,
        TopDuel,
        GodRelic,
        VipSecKill,
        ShenJieJinYu,
        ///////////////////活动//////////////////
        DailyRecharge,
        XinFuCB,
        DreamlandFight,
        TeamBuy,
        Seckill,
        Investment,
        AccumRecharge,
        ThemeXB,
        OnlineRewards,
        DoubleWeekCeremony,
        EveryDaySign,
        UpgradeAward,
        EquipTreasure,
        EnjoyNineDoor,
        DiscountShop,
        OnePiece,
        Welfare,
        QKTreasure,
        CollectGodEquip,
        CDKey,
        ActivityCalendar,
        FirstCharge,
        SmackerSecKill,
        LimitBuy,
        SpriteTree,
        WanYaoJinDi,
        LianShenDan,
        ExpPool,
        AdventGod,
        SuperRecharge,
        IntegralRank,
        MarryWedding,
        MarryDevelop,
        MarryFuben,
        MarryActivity,
        MarryFuBen,
        MarryToken,
        Baptize,
        LimitEmigrated,
        SevenToken,
        ContinueCharge,
        DailyTrain,
        XmCompeteProxy,
        ExchangeProxy,
        SuperTotalRecharge,
        LookAdvGift,
        Follow,
        FuWen,
        Supreme,
        SevenLogin,
        ConsumeTotal,
        TimeLimitGift,
        WarMakes,
        SevenDayTarget,
        ZeroGift,
        Peak,
        ChanelAwy,
        TaskActivity,
        WantBeStronger,
        Experience,
        VipGift,
        YiFire,
        TeamTried,
        Grade,
        Rebate,
        xianyuTurntable,
        jieliGift,
        PettyCard,
        everyDayCharge,
        QingDianXunbao,
        TuanGou,
        QingDianDuihuan,
        PychicPet,
        qdlc,
        QuanminBoss,
        timeSale,
        QuanMingHaiDian,
        NianBeast,
        TongLing,
        TonglingTower,
        RoleTreasure,
        TonglingJitan,
        NewDressSuit,
        TonglingJitan,
        YuWaiMoGong,
        Egg,
        BlindBox,
        QQShareGift,

        /*********************新加的****************************/
        Xianlu,
        Enhance,
        Xianfa,
        Shenling,//神灵
        Surface,///**外显，御灵模块*/
        Jiban,//羁绊
        Lingchong,//灵宠
        Daily,//日常
        Shilian,//试炼
        DailyLimitTime,//日常限时
        Pay,//支付模块
        YuanlingFuben,//元灵试炼
        Rank,//排行榜
        Boss,
        Compete,//竞技
        Gift,//进阶礼包
        Debug,//GM命令
        Lottery,//活动战力轮盘
        Setting,
        ShoujiHuanhua,//收集和幻化
        Summon,//活动召唤系统
        GameOrder,//战令，召唤卷100抽
        SignGift,//签到有礼
        First,//首充
        ZeroBuy,//0元购
        Zhaocaixian, //招财仙系统
        RoleRing,//主角光环
        KillBoss,//斩妖福利
        Yjjs,//瑶姬降世
        ExchangeShop,//兑换商城
        GivingShenLing,//赠送瑶姬
        Union,//仙宗
        PrerogativeWrit,//特权令
        WonderfulAct,//精彩活动
        Yijie,//异界
        ShenlingLingqi,//神灵灵器
        ShenlingLingpo,//神灵灵魄
        ShenlingLingli,//神灵灵力
        Yhcs,//浴火重生
        Consecrate,//供奉
        Xianlv,//仙侣
        Child,//仙侣-子女
        Ring,//仙侣-仙戒
        XianlvGift,//仙侣礼包
        XianlvShilian,//仙侣试炼
        Friend,//仙友
        God,//仙帝录
        NewRank,//排行榜，主界面上方排行榜按钮
        SummonTreasure,//召唤宝藏
        Chengshen,//成神在即
        MeiriTehui,//每日特惠
        SupremeGit,//至尊礼包
        Tongtiange,//通天阁
        Xianjian,//仙剑
        Achieve,//成就
        Huashen,//化神
        PunshList,//新服冲榜
        Yishou,//异兽
        SkyPalace,//天宫-荒古神器
        FlyRank,//飞升榜
        ShenlingGift,//神灵天赋礼包
        Xianchi,//仙池祈愿
        TehuiLibao,//特惠礼包&进阶特惠
        FeishengLibao,//飞升礼包
        Caiyunbang,//财运榜
        Zhandui,//战队系统
        Carnival,//狂欢庆典
        XujieJitan,//墟界祭坛
        Mining,//虚界矿脉
        Huanggu,//荒古
        XujieTansuo,//墟界探索
        Fengmo,//仙宗封魔
        XiuxianNvpu,//修仙女仆
        GoddessRecord,//女神录
        Xiandi,//仙帝争霸
        Xianmai,//仙脉争夺
        Sea,//幻境之海
        XianlvDoufa,//仙侣斗法
        Huanjing,//幻境
        CrossUnion,//跨服仙宗战
        Fuchenlinghu,//浮尘灵壶
        CrossUnionFight,//跨服仙宗战斗逻辑
        XianjieLuandou,//仙界乱斗
        Xianwei,//仙位争霸
        Honour,//荣耀
        Jiuyou,//九幽
    }
}
