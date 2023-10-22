declare namespace game {


    const enum ModName {
        /**调试模块*/
        Debug = "01",
        /**登录模块*/
        Login = "02",
        /**场景模块*/
        Scene = "03",
        /**杂项模块*/
        Misc = "04",
        /**主界面模块*/
        Main = "05",
        /**角色模块*/
        Role = "06",
        /**邮件模块*/
        Mail = "07",
        /**红点模块*/
        Hint = "08",
        /**提示弹窗*/
        Alert = "10",
        /**装备*/
        Equip = "11",
        /**任务*/
        Task = "13",
        /**技能*/
        Skill = "14",
        /**副本*/
        Fuben = "16",
        /**结算弹窗模块*/
        Result = "17",
        /**仙灵*/
        XianLing = "19",
        /**转生*/
        Rein = "20",
        /**跨服*/
        // Cross = "23",
        /**仙踪*/
        XianZong = "24",
        /**聊天*/
        Chat = "25",
        /**功能开启*/
        Preview = "26",
        /**活动*/
        Activity = "27",
        /**VIP*/
        Vip = "28",
        /**商店*/
        Store = "29",
        /**限时活动*/
        LimitActivity = "30",
        /**排行榜*/
        Rank = "31",
        /** 引导 */
        Guide = "32",
        /** 寻宝 */
        // Treasure = "33",
        /** 战令*/
        WarMakes = "37",
        /**我要变强*/
        WantBeStronger = "38",
        /**灵宠*/
        PychicPet = "40",

        /*********************新加的模块****************************/
        /**背包*/
        Bag = "12",
        /**boss*/
        Boss = "22",
        /**仙路*/
        Xianlu = "41",
        /**闯关*/
        Pass = "42",
        /**强化*/
        Enhance = "43",
        /**仙法*/
        Xianfa = "44",
        /**神灵*/
        Shenling = "45",
        /**外显，御灵模块*/
        Surface = "46",
        /**羁绊模块*/
        Jiban = "47",
        /**日常*/
        Daily = "48",
        /**试炼*/
        Shilian = "49",
        /**支付模块*/
        Pay = "50",
        /**排行榜*/
        Rank = "51",
        /**竞技*/
        Compete = "52",
        /**进阶礼包*/
        Gift = "53",
        /**游戏设置模块*/
        Setting = "54",
        /** 宗门*/
        Union = "55",
        /**异界模块*/
        Yijie = "56",
        /**供奉 */
        Consecrate = "57",
        /**仙缘*/
        Xianyuan = "58",
        /**仙友*/
        Friend = "59",
        /**仙帝录 */
        God = "60",
        /**更多模块*/
        More = "61",
        /**异兽*/
        Yishou = "62",
    }

    const enum NewYearSysViewType {
        NewYearMainView = "01",
    }

    /**
     * 新春活动 - 一级界面标签
     */
    const enum NewYearSysBtnType {
        BtnNewYearPreview = "00",//预告
        BtnNewYearJiZi = "01",//集字
        BtnNewYearJiZiExchange = "02",//集字兑换
    }

    /**
     * 新春活动 - 预告 - 二级界面标签
     */
    const enum NewYearPreviewSubBtnType {
        preview = "01",//预告界面
        actList = "02",//活动列表界面
    }

    const enum ZhiBaoSysBtnType {
        BtnZhiBao = "00",//至宝
    }

    const enum PychicPetSysViewType {
        PychicPetMainView = "01",
        PychicPetUpStar = "02",
        PychicPetResonance = "03",
    }

    const enum PychicPetSysBtnType {
        BtnPychicPet = "00",//灵宠
    }

    const enum PychicPetBtnType {
        PychicPetUpLvBtn = "01",//升级界面
        PychicPetAdvancedBtn = "02",//进阶界面
        PychicPetGodBtn = "03",//神龛
    }

    const enum LoginViewType {
        /**开始*/
        Start = "01",
        /**选服*/
        SelectServer = "02",
        /**创角*/
        CreateRole = "03",
        /**公告*/
        NoticePanel = "04",
        Loading = "05",
        Alert = "06",
        Login = "07",
        AdultAlert = "08",
        AdultId = "09",
        /**隐私协议*/
        Privacy = "10",
        PrivacyAlert = "11",
    }

    const enum SceneViewType {
        BigBossHp = "01", /**大Boss血条*/
        Belong = "02", /**归属玩家*/
        ChallengeTips = "03", /**挑战提示*/
        Enemy = "04", /**敌人列表*/

        RoleRevive = "05", /**角色死亡弹框*/
        PvpFight = "06", /**对战双方*/
        PvpFightEnter = "07",/**对战双方进场*/
    }

    const enum MainViewType {
        /**主界面上部角色信息*/
        MainTop = "01",
        /**主界面底部按钮*/
        MainBottom = "02",
        /**主界面左边按钮*/
        MainLeft = "03",
        /**主界面右边按钮*/
        MainRight = "04",
        /**主界面底下菜单*/
        MainMenu = "05",
        /**奖励获取*/
        RewardView = "06",
        /**主界面技能*/
        MainSkill = "07",
        /** 战力变化飘字*/
        PowerChange = "09",
        /**离线挂机界面*/
        OffLineGain = "10",
        /**解锁tips*/
        DebLockingTips = "12",
        /**设置界面*/
        SettingInfo = "13",
        /**改名界面*/
        ChangeName = "14",
        /**通用特效提示*/
        SuccessTips = "16",
        /** 神兵管卡奖励*/
        MainSwordReward = "17",
        /** 复选提示窗*/
        AlertCheckBox = "18",
        /** 首充*/
        FirstCharge = "20",
        /** 装备快捷穿戴 */
        MainEquipEft = "21",
        /** 炼神丹*/
        LianShenDan = "22",
        /** 自动购买*/
        AutoBuy = "23",
        /**跑马灯公告*/
        SystemNotice1 = "24",
        SystemNotice2 = "25",
        gmWin = "26",
        SelectNum = "28",
        /**主界面顶部聊天框*/
        MainTopChat = "29",
        /**通用属性弹窗*/
        BaseAttrTips = "30",
        /**通用奖励领取弹窗*/
        BaseRewardTips = "31",
        /**通用规则说明弹窗*/
        BaseRuleDesc = "32",
        Alert = "33", // 弹框
        BoxReward = "34",//奖励预览
        BuyTimes = "35",//购买挑战次数
        Stronger = "40",//我要变强
        RewardFindMain = "41",//资源找回
        Preview = "42",//功能预览
        BreakthroughTips = "43",//突破成功tips
        BreakthroughTips2 = "44",//突破成功tips
        UpStarTips = "45",//升星成功tips
        UpStarTips2 = "46",//升星成功tips
    }

    const enum BodyArtMainViewType {
        BtnBodyArt = "01"
    }

    const enum DragonMainViewType {
        BtnDragonMain = "01",
        BtnCompound = "02",
    }


    /**todo 不要再用这个，统一使用新的 NewRoleViewType*/
    const enum RoleViewType {
        /**角色主界面*/
        RoleMain = "01",
        /**武器技能刻印*/
        WeaponSkillMint = "02",
        /**武器技能洗炼*/
        WeaponSkillBaptize = "03",
        /**时装界面*/
        ClothesMain = "04",
        /**羽翼技能tips*/
        WingSkillTips = "05",
        /**羽翼装备面板*/
        WingEquip = "06",
        /**羽翼仙晶tips*/
        WingXianJing = "07",
        /**羽翼装备合成*/
        WingEquipComp = "08",
        /**羽翼升星*/
        WingUpStar = "09",
        /**羽翼tips*/
        WingDetailTips = "10",
        /**魂印技能tips*/
        SoulSkillTip = "11",
        /**魂印装备tips*/
        SoulEquipTip = "12",
        /**称号主界面*/
        TitleMain = "13",
        /**属性丹主界面*/
        AttrDanMain = "14",
        /**特殊称号升星界面*/
        SpTitleUpStar = "15",
        /**装扮tips*/
        DressUpDetail = "16",
        /**神兵升星*/
        GodWeaponUpStar = "17",
        /**神兵淬炼*/
        GWRefinement = "18",
        /**神兵认主*/
        GWRenZhuUp = "19",
        GWRename = "20",
        GWSteleTips = "21",
        GodWeaponDetail = "22",
        /**套装界面*/
        SuitMain = "23",
        /**套装装备升级tips*/
        SuitEquipPop = "24",
        /** 剑印升级界面*/
        SwordSealLvUp = "25",
        /**剑意页面*/
        SwordMean = "26",
        /**血脉*/
        BloodVein = "27",//血脉主界面
        BloodTalent = "28",//血脉天赋弹窗
        BloodEvolve = "29",//血脉进化弹窗
        /**降神激活路径弹窗*/
        AGActivatePath = "30",
        /**降神升星弹窗*/
        AdventGodUpStar = "31",
        /**角色外显整合*/
        RoleSurfaceMain = "32",
        /** 玩家信息弹窗*/
        PlayerInfoTips = "33",
        /** 角色属性弹窗*/
        RoleAttrTips = "34",
        /** 无限手套界面 */
        GlovePop = "35",
        /** 无限手套详情界面 */
        GloveEquipTips = "36",
        /** 招财猫 */
        MoneyCat = "37",
        /** 百宝袋 */
        BaiBaoDai = "38",
        /**套装属性领取tips*/
        SuitActAttr = "39",
        /**御灵*/
        Gory = "40",
        /**御灵背包*/
        GoryBag = "41",
        /**御灵技能*/
        GorySkill = "42",
        /**御灵升星*/
        GoryUpStar = "43",
        /**降神升阶属性tips*/
        AGStageAttrTips = "44",
        /** 灵器*/
        SoulWare = "45",
        /** 幻化*/
        SoulWareIllusion = "46",
        /** 技能弹窗*/
        SoulWareSkillTips = "47",
        /**神界遗物*/
        RelicAttrTips = "48",
        RelicPoolAttrTips = "49",
        RelicPoolTask = "50",
        RelicFragTips = "51",
        RelicMain = "52",
        RelicYoke = "53",
        RelicAttr = "54",
        RelicUp = "55",
        BodyArtMain = "56",
        DragonMain = "57",

        /**龙鸣弹窗*/
        DragonResonTips = "58",
        /**龙珀极品预览弹窗*/
        DragonPreTips = "59",
        /**龙珀背包弹窗*/
        DragonBagTips = "60",
        /**龙珀镶嵌选择弹窗*/
        DragonInlayTips = "61",
        /**龙珀觉醒弹窗*/
        DragonAwakeTips = "62",
        /** 龙珀分解界面*/
        DragonDecompose = "63",

        /** 异度神剑*/
        JianPuIllusion = "64",
        /** 异度神剑升星*/
        JianPuUpStar = "65",

        //=================================仙缘===========================
        MarryMain = "66",//
        MarryWedding = "67",//主界面
        MarryWall = "68",//月老墙
        MarrySeeking = "69",//征婚
        MarryProposal = "70",//求婚
        MarryDivorce = "71",//离婚
        MarryProposalSucc = "72",//求婚成功返利
        MarryBridePrice = "73",//彩金，征婚成功
        MarryFavorabilityBox = "74",//好感度礼盒
        MarrySearchPost = "75",//月老墙搜索
        MarryBattleScene = "76",
        MarryBattleInvite = "77",
        MarryAwardTips = "78",
        MarryActivity = "79",//求婚大作战
        RingResonance = "80",//婚戒共鸣
        MarryRingSkill = "81",//婚戒技能
        MarryRingUp = "82",//戒指进化
        MarryRedPacket = "83",//结婚红包
        MarryToken = "84",//信物
        MarryTokenUpStar = "85",//信物升星
        MarryTokenSkillTips = "86",//信物技能
        MarryTokenDonate = "87",//信物捐献

        DragonPreview = "88",//仙符预览

        ClothesUpStar = "89",//时装升星

        MarryTokenMateInfo = "90",//伴侣信物
        /**灵饰tips*/
        OrnamentEquipTips = "91",
        /**幻形tips*/
        MountDetail = "92",
        /** 坐骑-灵饰-背包*/
        MountsBag = "93",
        MarryRingPreview = "94",//婚介预览界面
        /** 仙缘礼盒*/
        MarryXylhWin = "95",
        TongLingSkillTips = "96",//通灵技能
        TongLingResonance = "97",//通灵共鸣
        TongLingUpStar = "98",//通灵升星
        TongLingScene = "99",//通灵场景
        TongLingEquipComp = "100",//通灵装备合成
        TongLingEquipStrong = "101",//通灵装备强化
        TongLingBond = "102",//通灵羁绊
        /**锦衣套装*/
        DressSuit = "103",//锦衣分页
        NewDressSuitDel = "104",//分解界面
        NewDressSuitCom = "105",//合成界面
    }

    const enum DressSuitBtnType {
        Btn1 = "00",
        Btn2 = "01",
        Btn3 = "02",
        Btn4 = "03",
    }

    const enum GodRelicBtnType {
        Btn1 = "00",
        Btn2 = "01",
    }

    const enum WantBeStrongerViewType {
        Main = "01",
    }

    const enum AlertViewType {
        /**默认弹窗*/
        Alert = "01",
        /**服务端触发的弹窗*/
        AlertServer = "02",
        /**通用奖励弹窗*/
        Award = "03",
        /**通用道具获取方式弹窗*/
        GetWay = "04",
        /**通用购买次数弹窗*/
        AlertBuyCount = "05",
        /**道具使用*/
        AlertUse = "06",
        /**规则说明*/
        AlertExplain = "07",
        /**宝箱展示*/
        AlertTreasureBox = "08",
        /**鼓舞*/
        AlertInspire = "09",
        /**使用符咒*/
        UseFuzhou = "10",
        /**通用分享 /组队邀请*/
        ShareCommon = "11",
    }

    const enum RoleMainBtnType {
        /**角色*/
        BtnRole = "00",
        /**武器*/
        BtnWeapon = "01",
        /**羽翼*/
        BtnWing = "02",
        /**魂印*/
        BtnSoul = "03",
        /**神兵*/
        GoldWeapon = "04",
        /**血脉*/
        BloodVein = "05",
        /** 降神*/
        AdventGod = "06",
        /** 御灵 */
        Gory = "07",
        /**八卦牌*/
        BtnBaGuaCard = "08",
        /** 神界遗物*/
        BtnRelic = "09",
        /**御灵*/
        BtnGory = "10",
        /**仙缘*/
        BtnMarry = "11",
        /**坐骑*/
        BtnMounts = "12",
        /**通灵*/
        BtnTongLing = "13",
    }

    const enum RoleSurfaceBtnType {
        /**神兵*/
        GoldWeapon = "01",
        /**时装*/
        BtnClothes = "02",
        /**羽翼*/
        BtnWing = "03",
        /**御灵*/
        BtnGory = "04",
        /** 灵器*/
        BtnSoulWare = "05",
        /**坐骑*/
        BtnMounts = "06",
        // /** 剑谱*/
        // BtnJianPu = "06",
        // /**仙缘 临时界面*/
        // Marry = "999",
    }

    const enum WeaponBtnType {
        BtnWeaponInfo = "00",
        BtnFencingArt = "01",
    }

    const enum topdelBtnType {
        topduel1 = "00",
        immortal = "01",
        battleBet = "02",
    }

    const enum WingBtnType {
        /**翼灵*/
        BtnWingSprite = "01",
        /**羽翼*/
        BtnWingInfo = "00",
    }

    const enum GoryBtnType {
        /**御灵*/
        BtnYuling = "00",
        /**升灵*/
        BtnShengling = "01",
        /**灵佑*/
        BtnLingyou = "02",
    }

    const enum SoulBtnType {
        BtnSoulStamp = "00",
        BtnSoulRing = "01",
    }

    const enum SuitBtnType {
        BtnBornSuit = "00",//转生套装
        BtnPressSuit = "01",//锦衣套装
        BtnWaiXianSuit = "02",//外显套装
    }

    const enum RoleBloodBtnType {
        BtnBlood = "00",//血脉按钮
    }

    const enum BaGuaCarBtnType {
        BtnBaGuaIntensify = "01",//八卦强化
        BtnBaGuaStarUp = "02",//八卦升星
        BtnBaGuaWear = "03",//八卦穿戴
    }

    const enum MailViewType {
        MailMain = "01",//主界面*
        MailDesc = "02",//邮件详情
    }

    const enum MailMainBtnType {
        /**系统邮件*/
        BtnMail = "01",
        /** GM邮件*/
        BtnGMMail = "02",
    }

    const enum TaskViewType {
        /**任务主界面*/
        TaskMain = "04",
        TaskNpc = "08",
    }

    const enum PassViewType {
        /**闯关主界面*/
        PassMain = "01",
        /**排行榜*/
        PassRank = "02",
        /**关卡信息*/
        PassPreview = "03",
        ResultWin = "06",
        ResultLose = "07",
        WorldMapDetail = "10",
        PassGodRank = "11",
        QiyuanDetail1 = "12",
        QiyuanDetail2 = "13",
        PassBossTip = "14",
        WorldMapBox = "15",
        QiyuanFigth = "16",
        Preview = "17",
    }

    const enum TaskMainBtnType {
        /**主线*/
        Main = "00",
    }

    const enum PassMainBtnType {
        /**主线*/
        Main = "00",
        /**世界地图*/
        WorldMap = "01",
        /**奇遇*/
        Qiyuan = "02",
    }

    const enum PassRankMainBtnType {
        /**排行榜*/
        Rank = "00",
    }

    const enum AllMapBtnType {
        /**BOSS图鉴*/
        BtnBossMap = "01",
        /**大陆图鉴*/
        BtnLandMap = "02",
        /**神龙图鉴*/
        BtnDragonMap = "03",
    }

    const enum SkillViewType {
        /**角色技能主界面*/
        SkillMain = "01",
        /**角色技能升级弹窗*/
        SkillUpTips = "02",
        /**通用技能弹窗*/
        SkillDetail = "03",
        /**异闻录详情*/
        YWLDetail = "04",
        /**异闻录激活弹窗*/
        YWLActTips = "05",
        /**技能替换界面*/
        SkillReplace = "06",
        /**技能升级弹窗*/
        SkillUpLvTips = "07",
        /**技能解锁弹窗*/
        SkillUnLockTips = "08",
        /**天书升星*/
        SkyBookUpStar = "09",
        /**天书Tip*/
        SkyBookDetail = "10",
        /**异闻录道具tips*/
        YWLTips = "11",
        /** 技能预览*/
        SkillBigMdr = "20",

        /**八卦牌*/
        BaGuaMain = "21",
        /**八卦牌激活*/
        BaGuaAct = "22",
        /**八卦牌升级*/
        BaGuaUp = "23",
        /**八卦牌属性详情*/
        BaGuaDetail = "24",
        /**八卦牌极限预览*/
        ExtremePreview = "25",
    }

    const enum SkillMainBtnType {
        /**角色技能分页*/
        BtnSkill = "00",
        /**体术*/
        BtnBodyArt = "01",
        /**异闻录*/
        BtnYWLMain = "02",
        /** 天书 */
        BtnSkyBook = "03",
        /** 八卦牌 */
        BtnBaGuaCard = "04",
        /** 仙符*/
        BtnDragon = "05",
    }

    const enum SwordSkillBtnType {
        BtnPrimary = "00",//初阶剑技
        BtnHigh = "01",//高阶剑技
    }

    const enum YWLBtnType {
        BtnYWL1 = "01",
        BtnYWL2 = "02",
        BtnYWL3 = "03",
        BtnYWL4 = "04",
    }

    const enum SkyBookBtnType {
        BtnSkyBook = "01",
    }

    const enum EnhanceViewType {
        /**强化主界面*/
        StrengthMain = "01",
        /**强化大师*/
        StrengthMaster = "02",
        /**宝石背包*/
        GemSyn = "03",
        /**宝石大师*/
        GemMaster = "04",
        /**宝石属性*/
        GemAttr = "05",
        /**进阶*/
        Advanced = "06",
        /**进阶大师*/
        AdvancedMaster = "07",
    }

    const enum EnhanceMainBtnType {
        /**强化界面*/
        BtnStrength = "01",
        /**宝石界面*/
        BtnGem = "02",
        /**进阶界面*/
        BtnAdvanced = "03",
    }

    const enum XianfaViewType {
        /**仙法主界面*/
        XianfaMain = "01",
        /**技能提示*/
        XianfaSkillTip = "02",
        /**研习提示*/
        XianfaStudyTip = "03",
        /**仙法自动激活提示*/
        XianfaActiveTip = "04",
    }

    const enum XianfaMainBtnType {
        /**仙法界面*/
        BtnXianfa = "01",
    }

    const enum FubenViewType {
        /**副本主页面*/
        FubenMain = "01",
        /**妖魔入侵奖励*/
        DemonInvadeReward = "07",
        /**妖魔入侵邀请*/
        DemonInvadeInvite = "08",
        /**妖魔入侵场景*/
        DemonInvadeScene = "09",
        /**妖魔入侵队伍列表*/
        DemonInvadeTeam = "10",
        /**灵界寻宝场景*/
        XunBaoScene = "11",
        /**灵界寻宝奖励*/
        XunBaoReward = "12",
        /**八荒tips*/
        BaHuangTip = "13",
        /**八荒场景*/
        BaHuangScene = "14",
        /**八阵图*/
        BaHuangFind = "15",
        /**灵界寻宝奖励预览*/
        XunBaoTreasure = "16",
        /**通天塔抽奖*/
        TongTianDraw = "17",
        /**通天塔排行榜*/
        TongTianRank = "18",
        /**通天塔特权卡*/
        TongTianCard = "19",
        /**通天塔场景*/
        TongTianScene = "20",
        /**通天塔收益记录*/
        TongTianNote = "21",
        /**魔门遗址排行榜*/
        RuinsRank = "22",
        /**魔门遗址场景*/
        RuinsScene = "23",
        /** 炼狱塔层数排行榜弹窗*/
        PurgatoryRankTips = "24",
        /** 炼狱塔守将排行榜弹窗*/
        PurgatoryGuardTips = "25",
        /**挑战日志*/
        ChallengeLogTips = "26",
        /** 炼狱塔背包*/
        PurgatoryBag = "27",
        /** 奖励预览弹窗*/
        RewardPreTips = "28",
        /** 轮回塔排行榜*/
        CycleTowerRank = "29",
        /** 轮回塔奖励*/
        CycleTowerReward = "30",
        /** 轮回塔特效*/
        CycleTowerEft = "31",
        /** 奇兵乱斗匹配弹窗*/
        MeleeMatchTips = "32",
        /** 奇兵乱斗场景*/
        MeleeScene = "33",
        /** 奇兵乱斗排行奖励弹窗*/
        MeleeRankTips = "34",
        /** 奇兵乱斗每周结算*/
        MeleeWeekLog = "35",
        /**太虚秘境*/
        Secret = "36",
        /**太虚秘境弹窗*/
        SecretTip = "37",
        /**太虚秘境购买次数*/
        SecretBuyCount = "38",
        /**查看难度*/
        MaterialDegree = "39",
        /**扫荡提示*/
        SweepTip = "40",
        /**材料副本场景*/
        MaterialScene = "41",
        /**经验副本效率*/
        ExpBuffList = "42",
        /**经验副本场景*/
        ExpScene = "43",
        /**首领遗迹巅峰大奖*/
        RelicPeakReward = "44",
        /**首领遗迹小队信息*/
        RelicTeamInfo = "45",
        /**首领遗迹战力标准*/
        RelicPowerNorm = "46",
        /**首领遗迹收益记录*/
        RelicRewardNote = "47",
        /**首领遗迹队伍创建*/
        RelicTeamCreate = "48",
        /**首领遗迹场景*/
        RelicScene = "49",
        /**首领遗迹符咒商店*/
        RelicShop = "50",
        /**经验副本扫荡提示*/
        expSweepTips = "51",
        /**八荒剑阵*/
        BaHuangReward = "52",
        /** 通灵塔排行榜*/
        TonglingTowerRank = "53",
        /** 通灵祭坛排行榜*/
        TonglingJitanRank = "54",
        TonglingJitanSweep = "55",
        TonglingJitanScene = "56",
    }

    const enum FubenMainBtnType {
        /**组队副本*/
        BtnTeamFuBen = "01",
        // /**妖魔入侵*/
        // BtnDemonInvade = "02",
        /** 奇兵乱斗*/
        BtnMelee = "09",
        /** 蛮荒试炼 (个人副本)*/
        BtnTower = "10",
        /** 探秘寻宝 */
        BtnTreasure = "11",
        /** 通灵祭坛 */
        BtnTonglingJitan = "05",
    }

    const enum FubenTowerBtnType {
        /**通天塔*/
        BtnTongTianTa = "05",
        /** 炼狱塔*/
        BtnPurgatory = "07",
        /** 轮回塔*/
        BtnCycleTower = "08",
        /**材料副本*/
        BtnMaterial = "01",
        /**经验副本*/
        BtnExp = "02",
        /** 通灵塔*/
        BtnTonglingTower = "06",
    }

    const enum FubenTeamBtnType {
        /**魔门遗址*/
        BtnRuins = "01",
        /**妖魔入侵*/
        BtnDemonInvade = "02",
        /**奇兵乱斗*/
        BtnMelee = "03",
        /**首领遗迹*/
        BtnRelic = "04",
    }

    const enum FubenTreasureBtnType {
        // /**魔门遗址*/
        // BtnRuins = "06",
        /**灵界寻宝*/
        BtnXunBao = "03",
        /**八荒剑阵*/
        BtnBaHuang = "04",
        /**太虚秘境*/
        Secret = "01",
    }

    const enum ResolveBtnType {
        /**装备分解界面*/
        BtnEquip = "00",
        /**道具分解界面*/
        BtnProp = "01",
        /**辅战装备*/
        BtnFuZhanEquip = "02",
    }

    const enum CompoundBtnType {
        /**道具合成*/
        BtnProp = "00",
    }

    const enum ResultViewType {
        ResultWin = "01", /**胜利结算界面*/
        ResultFail = "02", /**失败结算界面*/
        ResultPass = "03", /**闯关通关结算界面*/
        ResultWinContinue = "04", /**胜利结算界面（含继续按钮）*/
        ResultBelong = "05", /**胜利结算界面（显示归属）*/
    }

    const enum ClothesMainBtnType {
        /**邮件主界面*/
        Clothes = "00",
        /**邮件页面*/
        Suit = "01",
    }

    const enum XianLingViewType {
        /**仙灵主界面*/
        XianLingMain = "01",
        /**精灵志主界面*/
        SpriteBookMain = "03",
        /**精灵进化*/
        SpriteEvolve = "04",
        /**精灵图鉴升级*/
        SpriteHBUp = "05",
        /**精灵升星*/
        SpriteUpStar = "06",
        /**精灵信息弹窗*/
        SpriteInfo = "07",
        /**精灵技能信息弹窗*/
        SpriteSkillInfo = "08",
        /**灵装信息弹窗*/
        SpriteEquipInfo = "09",
        /**灵装信息弹窗*/
        SpriteAttrTips = "10",
        /**侍女主界面*/
        MaidMain = "11",
        /**侍女技能界面*/
        MaidSkillTips = "12",
        /**侍女共鸣界面*/
        MaidResonance = "13",
        /**侍女升星界面*/
        MaidUpStar = "14",
        /**侍女/法宝 tips界面*/
        MaidDetail = "15",
        /**灵饰tips*/
        OrnamentEquipTips = "17",
        /**幻形tips*/
        MountDetail = "18",
        /**战灵-圣女装备背包*/
        GeneralBag = "19",
        /**战灵羁绊*/
        GeneralBond = "20",
        /**战灵升星*/
        GeneralEvolve = "21",
        /**战灵-英豪技能激活*/
        GeneralSkillAct = "22",
        /**战灵噬魂丹*/
        GeneralElixirTip = "23",
        /**战灵详情弹窗*/
        GeneralDetail = "27",
        /**灵晶背包*/
        SpCrystalBag = "30",
        /**灵晶分解*/
        SpCrystalDecompose = "31",
        /** 精灵灵阵技能弹窗*/
        SpriteMatrixSkillTips = "32",
        /**灵晶极品预览*/
        SpCrystalPreview = "33",
        /** 精灵灵阵参战弹窗*/
        SpriteMatrixJoinTips = "34",
        /** 灵阵升级成功弹窗*/
        SpriteMatrixLvUpTips = "35",
        /** 灵器幻化*/
        SoulWareIllusion = "36",
        /** 灵器技能tips*/
        SoulWareSkillTips = "37",
        /** 战灵-圣女合成*/
        GeneralComp = "38",
        /** 坐骑-灵饰-背包*/
        MountsBag = "39",
    }

    const enum XianLingBtnType {
        /**精灵*/
        BtnSprite = "00",
        /**精灵放生*/
        BtnSpriteRelease = "02",
        /**侍女*/
        BtnMaid = "03",
        /**侍女法宝*/
        BtnMaidFaBao = "04",
        /**坐骑*/
        BtnMounts = "05",
        /**战灵*/
        BtnGeneral = "06",
    }

    const enum SoulWareBtnType {
        BtnSoulWare0 = "01",
        BtnSoulWare1 = "00",
        BtnSoulWare2 = "02",
    }

    const enum SpriteBtnType {
        BtnSpriteInfo = "00",
        /**灵晶*/
        BtnSpriteCrystal = "01",
        /**灵阵*/
        BtnSpriteMatrix = "02",
        /**精灵图鉴*/
        BtnSpriteHandBook = "03",
    }

    const enum MaidBtnType {
        BtnMaidInfo = "00",
        BtnMaidFaBao = "01",
        BtnMaidAdvance = "02",
    }

    const enum TongLingBtnType {
        BtnTongLingInfo = "00",
        BtnTongLingCombat = "01",
        BtnTongLingEquip = "02",
        BtnTongLingFaBao = "03",
    }

    const enum MountsBtnType {
        BtnMountsInfo = "00",
        BtnMountsPhantom = "01",
        BtnMountsOrnament = "02",
    }

    const enum GeneralBtnType {
        BtnGeneralMale = "00",
        BtnGeneralFemale = "01",
    }

    const enum DragonCrestBtnType {
        BtnDragon0 = "00",
        BtnDragon1 = "01",
        BtnDragon2 = "02",
    }

    const enum DailyViewType {
        /**日常主页面*/
        DailyMain = "01",
    }

    const enum DailyMainBtnType {
        BtnLiveness = "01",//活跃度
        BtnWanfa = "02",//日常玩法
        BtnLimitTimeAct = "03",//日常限时活动
    }

    const enum DailyBtnType {
        /**冒险声望*/
        BtnMedal = "01",
        /**仙门狩猎*/
        BtnHunt = "04",
        /**仙界奇遇*/
        BtnEncounter = "05",
        // /**材料副本*/
        // BtnMaterial = "06",
        // /**经验副本*/
        // BtnExp = "07",
    }

    const enum ReinViewType {
        /**转生主页面*/
        ReinMain = "00",
        /**觉醒总属性预览*/
        AwakeAttr = "01",
        /**觉醒排行榜*/
        AwakeRank = "02",
        /**觉醒一键完成弹窗*/
        AwakeFinishTips = "03",
        /**觉醒提升弹窗*/
        AwakeLvUpTips = "04",
        /** 仙位奖励弹窗*/
        GodSeatAwardTips = "05",
        /** 仙位积分弹窗*/
        GodSeatPointTips = "06",

        ExpPoolSkill = "09",
        ExpPoolTip = "10",
    }

    const enum ReinMainBtnType {
        /**转生*/
        BtnAwake = "00",
        BtnJianPu = "01",         //神剑谱
        /** 仙位*/
        BtnGodSeat = "02",
        BtnExpPool = "03",
    }

    const enum ChaseCompeteBtnType {
        /**仙盟争霸*/
        BtnXMFight = "04",
        /**仙魔战场*/
        FairyMagic = "03",
        /**盟主争夺*/
        BtnXmCompete = "05",
    }

    const enum PersonalBossBtnType {
        /**个人boss*/
        Personal = "00",
        /**悬赏boss*/
        RewardBoss = "03",
        // /**太虚秘境*/
        // Secret = "04",
        /**神域BOSS*/
        ShenYuBoss = "05",
    }

    const enum ManyBossBtnType {
        /**至尊boss*/
        VipBoss = "01",
        /**地下城boss*/
        DnfBoss = "02",
        /**世界boss*/
        WorldBoss = "03",
        /**魔窟历练*/
        MoKu = "05",
        HuanshouBoss = "06",
        // /**神域BOSS*/
        // ShenYuBoss = "08",
        /**万妖禁地*/
        WanYaoJinDi = "09",
        /**神界禁域*/
        ShenJieJinYu = "10",
    }

    const enum CrossViewType {
        /**跨服主界面*/
        CrossMain = "00",
        /**世界Boss场景*/
        // WorldBossScene = "01",
        // /**世界Boss排名奖励*/
        // WorldBossRank = "02",
        // /**世界Boss掉落记录*/
        // WorldBossReward = "03",
        // /**首领遗迹巅峰大奖*/
        // RelicPeakReward = "04",
        // /**首领遗迹小队信息*/
        // RelicTeamInfo = "05",
        // /**首领遗迹战力标准*/
        // RelicPowerNorm = "06",
        // /**首领遗迹收益记录*/
        // RelicRewardNote = "07",
        // /**首领遗迹队伍创建*/
        // RelicTeamCreate = "08",
        // /**首领遗迹场景*/
        // RelicScene = "09",
        // /**首领遗迹符咒商店*/
        // RelicShop = "10",
        // /**仙界战场排行榜*/
        // ImmortalRank = "11",
        // /**仙界战场奖励预览*/
        // ImmortalReward = "12",
        // /**仙界战场场景*/
        // ImmortalScene = "13",
        // /**摘星大会比赛详情界面*/
        // BattleDesc = "14",
        // /**摘星大会名人堂界面*/
        // BattleStar = "15",
        // /**投注奖励界面*/
        // BattleBuyReward = "16",
        // /**摘星大会排名奖励界面*/
        // BattleReward = "17",
        // /**摘星大会BUFF商店界面*/
        // BattleStore = "18",
        // /**摘星大会竞猜界面*/
        // BattleBet = "19",
        // /**摘星大会预选赛场景界面*/
        // BattleSceneOne = "20",
        // /**摘星大会结算界面*/
        // BattleEnd = "21",
        // /**摘星大会进入场景提示*/
        // BattleTip = "22",
        // /**摘星大会赛况推送界面*/
        // BattleResult = "23",
        // /**摘星大会16强提示界面*/
        // BattleFinalTip = "24",
        // /**摘星大会淘汰赛场景*/
        // BattleSceneTwo = "25",
    }

    const enum CrossMainBtnType {
        /**世界boss*/
        WorldBoss = "00",
        /**首领遗迹*/
        Relic = "01",
        /**仙界战场*/
        Immortal = "02",
        /**摘星大会*/
        BattleKing = "03",
    }

    const enum TitleViewType {
        TitleWnd = "00",
        DressUp = "01",
    }

    const enum TitleBtnType {
        AchievementBtn = "00",
        RankBtn = "01",
        Special = "02",
    }

    const enum AttrDanBtnType {
        /**属性仙丹*/
        BtnXianDan = "00",
        /**血脉*/
        BtnBlood = "01",
    }

    const enum XianDanBtnType {
        /**下品*/
        BtnXiaPin = "00",
        /**中品*/
        BtnZhongPin = "01",
        /**上品*/
        BtnShangPin = "02",
        /**仙品*/
        BtnXianPin = "03",
    }

    const enum XianZongViewType {
        /**宗门入口*/
        XianMengEnter = "00",
        /**战盟主界面*/
        GuildMain = "01",
        /**战盟内部功能主界面*/
        GuildFuncMain = "02",
        /**创建战盟*/
        GuildCreate = "03",
        /**战盟申请设置*/
        GuildApplySetting = "04",
        /**查看战盟申请列表*/
        GuildCheckApply = "05",
        /**战盟成员操作菜单*/
        GuildOperMenu = "06",
        /**仙盟主界面*/
        XianMengMain = "07",
        /**龙脉气运*/
        DragonVein = "08",
        /**仙盟等级奖励*/
        XMLvReward = "09",
        /**修改仙盟名称*/
        EditorName = "12",
        /**修改仙盟公告*/
        EditorNotice = "13",
        /**仙盟神像*/
        GuildIdolTips = "14",
        /**仙盟神像膜拜弹窗*/
        GuildIdolWorship = "15",
        /**试炼排行奖励*/
        TrialRankRew = "16",
        /**试炼伤害奖励*/
        TrialKillRew = "17",
        /**试炼排行榜*/
        TrialRank = "18",
        /**试炼场景*/
        TrialScene = "19",
        /**战队试炼-混元丹界面*/
        TeamTriedHyd = "20",
        /**战队试炼-奖励预览界面*/
        TeamTriedRewardShow = "21",
        /**战队试炼-战斗场景界面*/
        TeamTriedScene = "22",
        /**战队试炼-排行榜界面*/
        TeamTriedRank = "23",
    }

    const enum TuanGouMainBtnType {
        /**团购*/
        TuanGou = "00",
        /**团购排行榜*/
        TuanGouRank = "01",
        /**团购-全服返利*/
        TuanGouRebateAll = "02",
        /**团购-个人返利*/
        TuanGouRebatePerson = "03",
    }

    const enum XianMenBtnType {
        /**战盟信息界面*/
        BtnGuild = "00",
        /**仙盟试炼*/
        BtnTrial = "01",
        /**
         * 战队试炼
         */
        BtnTeamTried = "02",
    }

    const enum GuildMainBtnType {
        /**战盟主界面*/
        BtnGuildInfo = "00",
        /**战盟列表界面*/
        BtnGuildList = "01",
    }

    const enum GuildBtnType {
        /**战盟成员界面*/
        BtnGuildMem = "01",
        /**战盟建设*/
        BtnGuildBuild = "02",
        /**战盟庇护（技能）*/
        BtnGuildSkill = "03",
        /**战盟仓库*/
        BtnGuildWarehouse = "04",
        /**其他战盟*/
        BtnGuildOther = "05",
    }

    const enum GuildSkillBtnType {
        /**被动技能*/
        BtnPassiveSkill = "00",
        /**主动技能*/
        BtnActiveSkill = "01",
    }

    const enum XianMengBtnType {
        /**仙盟大厅*/
        BtnZMHall = "00",
        /**宗主争夺*/
        BtnCompete = "03",
        /**仙盟任务*/
        DragonVein = "01",
        /**仙盟神像*/
        GuildIdolTips = "02",

    }

    const enum PreviewViewType {
        /** 特殊功能开启按钮*/
        PreviewIcon = "01",
        /** 特殊功能领奖界面*/
        SpecialPreview = "02",
        /**新功能招式界面*/
        OpenFunc = "03",
    }

    const enum PreviewMainBtnType {
        /** 开局赠礼 */
        BtnOpenSend = "00",
        /** 功能开启 */
        BtnFuncOpen = "01",
    }

    const enum RechargeMainBtnType {
        /** 充值页面*/
        BtnRecharge = "00",
        /** 充值（仙玉）页面*/
        BtnRechargeXianyu = "01",
        /** 仙玉兑换元宝页面*/
        BtnExchange = "02",
    }

    const enum TonglingWarMakesMainBtnType {
        /** "冰", "火", "雷", "毒", "光", "暗"*/
        Type1 = "00",
        Type2 = "01",
        Type3 = "02",
        Type4 = "03",
        Type5 = "04",
        Type6 = "05",
    }

    const enum WarMakesArenaMainBtnType {
        WarMakesArena = "00",//战令-竞技场
        WarMakesArenaTask = "01",//战令-竞技场任务
    }

    const enum PrivilegeMainBtnType {
        /** 周卡*/
        BtnWeek = "00",
        /** 月卡*/
        BtnMonth = "01",
        /** 主角光环*/
        BtnHeroHalo = "02",
        /** 荣耀会员*/
        BtnHonorVip = "03",
        /** 我全都要*/
        INeedAll = "04",
    }

    const enum StoreViewType {
        StoreMain = "01",//商店主页面
        StoreBuyTips = "02",//通用的批量购买tips
    }

    const enum StoreMainBtnType {
        Btn1 = "01",//藏宝阁
        Btn2 = "02",//仙玉商城
        Btn3 = "03",//每日商城
        Btn4 = "04",//每周商城
    }

    const enum StoreAllType {
        StoreLimit = "00",
        StoreGold = "01",
        StoreDiamond = "02",
        StoreMars = "03",
        StoreGuild = "04",
        StoreEncounter = "05",
        StoreOnePiece = "06",
        StoreTopDuel = "07",
    }

    const enum LimitActivityViewType {
        /** 限时活动主界面*/
        LimitActivityMain = "01",
        /** 智慧达人*/
        Wisdom = "02",
        /** 智慧达人排行榜*/
        WisdomRank = "03",
        /** 智慧达人开启tips*/
        WisdomTips = "04",
        /** 通用战斗界面*/
        CommonSceneBattle = "05",
        /**通用提示界面2*/
        CommonTip = "06",
        /**每天活动开启提示界面*/
        LimitActivityTips = "07",
    }

    const enum GoldWeaponViewType {
        /** 淬炼界面*/
        Refinement = "01",
        /** 认主界面*/
        RenZhu = "02",
        /** 剑印界面*/
        SwordSeal = "03",
        /** 剑谱*/
        BtnJianPu = "04",
    }

    const enum NewAcivityHallBtnType {
        BtnSuperTotalRecharge = "01",
    }

    const enum LookAdvGiftMainBtnType {
        LookAdvGift = "01",
    }

    const enum MainActivityViewType {
        /**主界面活动列表*/
        MainActivityList = "01",
        /** 左边活动  */
        MainLeftAct = "02",
        /**限时直购*/
        LimitBuyPop = "13",

        /*********************新加的****************************/

        /**战力转盘 */
        Lottery = "30",

        /**召唤系统主界面 */
        SummonMain = "31",
        /**召唤命运豪礼界面 */
        SummonGift = "32",
        /**召唤排行榜 */
        SummonRank = "33",
        /**召唤排行榜查看排名 */
        SummonRankTips = "34",
        /**召唤系统风云录界面*/
        SummonRankGods = "35",
        /**召唤系统礼券兑换 */
        SummonExchange = "36",
        /**召唤系统召唤界面 */
        SummonEffect = "37",
        /**送100召唤卷 */
        Giving = "38",
        /**签到有礼*/
        SignGift = "39",
        /**战令解锁界面 */
        GameOrderUnlock = "40",

        /**招财仙未激活界面*/
        ZcxFirstMain = "41",
        /**招财仙主界面*/
        ZcxMain = "42",
        /**招财仙获奖名单*/
        ZcxWinnerList = "43",
        /**招财仙购买tips*/
        ZcxBuyTips = "44",
        /**主角光环主界面*/
        RoleRingMain = "45",
        RoleRingUp = "46",
        RoleRingReward = "47",

        /**0元购 */
        ZeroBuy = "48",

        /**首充豪礼 */
        FirstCharge = "49",

        /**斩妖福利 */
        KillBoss = "50",
        /**瑶姬降世*/
        YjjsFirstMain = "51",
        YjjsMain = "52",
        YjjsUnlock = "53",

        /**兑换商城 */
        ExchangeShop = "54",
        ExchangeShopTips = "55",

        /**送瑶姬 */
        GivingShenLing = "56",
        /**精彩活动*/
        WonderfulAct = "57",
        WonderfulActReward = "58",

        /**浴火重生 */
        Yhcs = "59",
        /**仙侣礼包*/
        XianlvGift = "60",
        /**召唤宝藏*/
        SummonTreasureBox = "61",
        SummonTreasureTips = "62",

        /**成神在即主界面*/
        ChengshenMain = "65",
        ChengshenJiban = "66",
        ChengshenTask = "67",

        WonderfulPreview = "68",

        /**每日特惠*/
        MeiriTehui = "69",
        ChaozhiLibao = "70",

        //至尊礼包
        SupremeGitMain = "71",

        /**召唤奖励预览 */
        SummonPreview = "72",

        /**通天阁*/
        TongtiangeMain = "73",
        TongtiangeRank = "74",
        TongtiangeRankSection = "75",
        TongtiangeLastRank = "76",

        /**奖励预览，带有权重*/
        BasePreviewReward = "77",

        /**新服冲榜 */
        PunshList = "78",
        PunshListRankSection = "79",

        /**通用中控活动主页面*/
        ActMain = "80",

        /**飞升榜*/
        FlyRankSection = "90",
        FlyWarUnlock = "91",

        /**神灵天赋礼包*/
        ShenlingGift = "92",

        /**特惠礼包&进阶特惠 */
        TehuiLibao = "93",

        /**仙池大奖 */
        XianchiReward = "98",

        // /**超值礼包*/
        // ChaozhiLibao = "99",
        /**飞升礼包*/
        FeishengLibao = "100",
        /**天女赐福奖励*/
        TiannvWelfareReward = "101",
        /**财运榜*/
        CaiyunbangRankSection = "102",

        /**狂欢庆典*/
        CarnivalMibaoReward = "106",
        CarnivalRankSection = "107",

        /**招财仙二期*/
        ZcxFuli = "108",
        ZcxUnlock = "109",
        /**浮尘灵壶*/
        FuchenlinghuRefresh = "110",
        FuchenlinghuWish = "111",
        FuchenlinghuXianling = "112",
    }

    const enum CGEMainBtnType {
        BtnCGE = "00",
    }

    const enum GuideViewType {
        /** 新手引导 */
        LoginGuide = "01",
        GuideWeapon = "02",
    }

    const enum EquipTreasureMainBtnType {
        /** 装备夺宝 */
        Equip = "00",
    }

    const enum QKTreasureMainBtnType {
        /** 乾坤宝库 */
        QKTreasure = "00",
    }

    const enum ActivityCalendarBtnType {
        /** 活动日历*/
        Play = "01",
        /** 活动周历*/
        Week = "02",
    }

    const enum AdventGodBtnType {
        /** 灵身*/
        AdventGodInfo = "01",
        /** 灵装*/
        AdventGodEquip = "02",
        /** 聚灵*/
        AdventGodJL = "03",
    }

    const enum SpriteTreeBtnSubType {
        /** 积分商店*/
        ScoreStore = "01",
        /** 上线红点*/
        OnLine = "02",
        /**幻灵1次红点*/
        cost1Red = "03",
        /**幻灵10次红点*/
        cost10Red = "04",
        /**幻灵50次红点*/
        cost50Red = "05",
    }

    const enum ReligionViewType {
        /** 宗门主界面*/
        ReligionMain = "00",
        /** 仙童招募弹窗*/
        ImmortalChildRecruit = "01",
        /**派遣*/
        Dispatch = "02",
        /**风水详情*/
        FengShuiDetail = "03",
        /** 灵脉弹窗*/
        NimbusInfoTips = "04",
        /**游历信息界面*/
        NimbusYouLi = "05",
    }

    const enum LookAdvGiftSubBtnType {
        BtnDailyGift = "01",
        BtnWeekGift = "02",
    }

    const enum ReligionMainBtnType {
        /** 宝地*/
        BtnTreasure = "00",
    }

    const enum ZongMenBtnType {
        /** 升级*/
        BtnLvUp = "00",
        /** 灵脉*/
        BtnLode = "01",
        /** 仙童*/
        BtnImmortalChild = "02",
        /**任务*/
        BtnTask = "03",
        /**藏品*/
        BtnCollect = "04",
    }

    // export const enum MarryViewType {
    //     MarryMain = "01",//
    //     MarryWedding = "02",//主界面
    //     MarryWall = "03",//月老墙
    //     MarrySeeking = "04",//征婚
    //     MarryProposal = "05",//求婚
    //     MarryDivorce = "06",//离婚
    //     MarryProposalSucc = "07",//求婚成功返利
    //     MarryBridePrice = "08",//彩金，征婚成功
    //     MarryFavorabilityBox = "09",//好感度礼盒
    //     MarrySearchPost = "10",//月老墙搜索
    //     MarryBattleScene = "11",
    //     MarryBattleInvite = "12",
    //     MarryAwardTips = "13",
    //     MarryActivity = "14",//求婚大作战
    //     RingResonance = "15",//婚戒共鸣
    //     MarryRingSkill = "16",//婚戒技能
    //     MarryRingUp = "17",//戒指进化
    //     MarryRedPacket = "18",//结婚红包
    //     MarryToken = "19",//信物
    //     MarryTokenUpStar = "20",//信物升星
    //     MarryTokenSkillTips = "21",//信物技能
    //     MarryTokenDonate = "22",//信物捐献
    // }

    export const enum MarryMainBtnType {
        BtnMain = "01",
    }

    export const enum MarryMainSubBtnType {
        BtnMarry = "01",
        BtnRing = "02",
        BtnTask = "03",
        BtnFuben = "04",
        BtnToken = "05",
    }

    /*********************新加的****************************/

    /**通用的 MainMdr 或 SecondMainMdr 按钮序号*/
    const enum MdrTabBtnType {
        TabBtnType01 = "01",
        TabBtnType02 = "02",
        TabBtnType03 = "03",
        TabBtnType04 = "04",
        TabBtnType05 = "05",
        TabBtnType06 = "06",
    }

    const enum XianluViewType {
        XianluMain = "01", /**仙路主界面*/
        XiuxianPreview = "02", /**修仙转生预览*/
        XiuxianTips = "03", /**修仙仙魄提示*/
        XiandanTips = "04", /**修仙仙丹提示*/
        LingchiDetail = "05", /**灵池界面*/
        LingchiBattle = "06", /**灵池出战界面*/
        LingmaiDetail = "07", /**灵脉详情界面*/
        LingmaiUp = "08", /**灵脉升级界面*/
        XiuxianBreakTips = "09",//破镜成功提示
    }

    const enum XianluMainBtnType {
        Xiuxian = "01", /**修仙*/
        Xiandan = "02", /**仙丹*/
        Lingchi = "03", /**灵池*/
        Lingmai = "04", /**灵脉*/
        Linggen = "05",/**灵根*/
    }

    const enum NewRoleViewType {
        RoleMain = "01",//角色主界面
        TitleMain = "02",//称号主界面
        DressUpMain = "03",//装扮主界面
        RoleAttrTips = "04",//角色界面属性tips
        RoleEquipTips = "05",//角色界面装备tips
        SuitMain = "06",//套装
        SuitEquipTips = "07",//套装装备激活tips
        SuitStageTips = "08",//套装tips
        SuitCompose = "09",//套装合成
        SuitStageStrengthenTips = "10",//套装阶数强化tips
        SuitEquipStrengthenTips = "11",//套装装备强化tips
        SuitEquipTips2 = "12",//套装类型3,4,5的tips
        SuitForgeMaster = "13",//套装锻造界面的锻造大师
        SuitAttrTips = "14",//套装属性弹窗
        SuitGiftMain = "15",//套装进阶礼包
        /**羽翼 */
        Wing = "16",
        /**神兵 */
        Weapon = "17",
        /**时装 */
        Body = "18",

        /**仙力属性*/
        RoleGod = "20",
        /**仙力属性详情*/
        RoleGodDesc = "21",
        SuitEquipBagTips = "22",//套装装备tips

        XiuxianNvpuBuy = "23",//修仙女仆购买
        XiuxianNvpuGrowMain = "24",//修仙女仆培养
        XiuxianNvpuGiftMain = "25",//修仙女仆礼包
        XiuxianNvpuLike = "26",//修仙女仆好感度
        XiuxianNvpuOfflineSetting = "27",//修仙女仆离线设置
        XiuxianNvpuOnlineSetting = "28",//修仙女仆在线设置
        XiuxianNvpuResult = "29",//修仙女仆结算
    }

    const enum BagViewType {
        BagMain = "01", /**背包主界面*/
        PropGain = "03", /**恭喜获得，居中，基本不用*/
        BestPropTips = "04", /**恭喜获得，底部*/
        GainWaysTips = "07", /**道具来源*/
        PropSurfaceTips = "08", /**外显道具提示*/
        PropEquipTips = "09", /**装备道具提示*/
        MeltTips = "10", /**熔炼提示*/
        PropPillTips = "11", /**属性丹提示*/
        PropTips1 = "101", /**道具提示，道具提示需要支持同时存在多个界面*/
        PropTips2 = "102", /**道具提示*/
        PropTips3 = "103", /**道具提示*/
        PropTips4 = "104", /**道具提示*/
        PropTips5 = "105", /**道具提示*/
    }

    const enum BagMainBtnType {
        Bag = "01", /**背包*/
        Equip = "02", /**装备*/
        Melt = "03", /**熔炼*/
        Compose = "04", /**合成*/
        Del = "05", /**分解*/
    }

    /**神灵*/
    const enum ShenLingViewType {
        ShenLingMain = "01", //主界面
        ShenLingShangZhen = "02", //上阵
        ShenLingAttr = "03", //属性界面
        ShenLingAwaken = "04",//觉醒
        ShenLingSkill = "05",//技能tips
        ShenLingShenJi = "06",//神迹
        ShenlingLingqiTips = "07",//灵器tips
        ShenlingLingpoTips = "08",//灵魄tips
        ShenlingLingpoSuitTips = "09",//灵魄套装tips
        ShenlingLingqiBagTips = "10",//灵器背包tips
        ShenlingEvolve = "11",//神灵进化
        ShenlingEvolvePreview = "12",//神灵进化预览
        ShenlingLingpoIconTipsBag = "13",//灵魄背包tips
    }

    const enum ShenLingBtnType {
        Main = "01",
        UpStar = "02",
        Lingqi = "03",
        Lingpo = "04",
        Lingli = "05",
    }

    const enum SurfaceViewType {
        SurfaceMain = "01", /**主界面*/
        HorseMain = "02", /**坐骑界面*/
        SurfaceSkillTips = "03", /**主动技能提示*/
        SurfaceGiftMain = "05", /**进阶礼包主界面*/
        SurfacePillTips = "06", /**炼神丹提示*/
        SkillTips = "07", /**通用被动技能提示*/
        TianshenMain = "08", /**元灵界面*/
        TianshenEquip = "09", /**元灵装备界面*/
        TianshenEquipTips = "10", /**元灵装备提示界面*/
        TianshenSuitTips = "11", /**元灵套装提示界面*/
        LingChongMain = "12", /**灵宠*/
        LingChongTreasure = "13", /**灵宠远古神兽奖励*/
        LingChongTask = "14", /**灵宠任务*/
        SurfaceTips = "15", /**外显提示*/
        SurfaceUpTips = "16", /**外显进阶提示*/
        SkillNormalTips = "17", /**一般技能提示*/
        Xianjian = "18", /**仙剑界面*/
        SurfaceUpTips2 = "19", /**外显进阶提示*/
        XianjianChoose = "20", /**仙剑上阵界面*/
        XianjianUp = "21", /**仙剑界面*/
        XianjianBuwei = "22", /**仙剑界面*/
        XianjianSkillTips = "23", /**仙剑界面*/
        XianjianBattleSkillTips = "24", /**仙剑界面*/
    }

    const enum SurfaceMainBtnType {
        Main = "01", /**御灵主界面*/
    }

    const enum HorseMainBtnType {
        Horse = "01", /**坐骑*/
        HorseStar = "02", /**幻化*/
        Tianshen = "03", /**元灵*/
        TianshenStar = "04", /**元灵幻化*/
        TianshenEquip = "05", /**元灵装备*/
    }

    const enum TianshenMainBtnType {
        Tianshen = "01", /**元灵*/
        TianshenStar = "02", /**元灵幻化*/
        TianshenEquip = "03", /**元灵装备*/
    }

    const enum WingMainBtnType {
        /**羽翼 */
        Wing = "01",
        /**羽翼幻化 */
        WingStar = "02",
    }

    const enum WeaponMainBtnType {
        /**神兵 */
        Weapon = "01",
        /**神兵幻化 */
        WeaponStar = "02",
    }

    const enum BodyMainBtnType {
        /**时装 */
        Body = "01",
        /**时装幻化 */
        BodyStar = "02",
    }

    const enum SurfaceGiftMainBtnType {
        Gift = "01", /**坐骑XXXX礼包*/
    }

    const enum JibanViewType {
        JibanMain = "01", /**主界面*/
        ShenLingJiBanAward = "02", /**神灵羁绊奖励面板*/
    }

    const enum JibanMainBtnType {
        Huanhua = "01",//幻化
        ShenLing = "02", /**神灵*/
        Collect = "03",//装备收集
        Horse = "04", /**坐骑*/
        Child = "05",//子女
        Tianshen = "06", /**元灵*/
        Xianjian = "07", /**元灵*/
        YishouShouyin = "08", /**异兽兽印*/
    }

    const enum LingChongBtnType {
        Lingchong = "01",//主界面
        Yuangushenshou = "02",//远古神兽
    }

    const enum LingChongSecondBtnType {
        Lingchong = "01",//灵宠
        Sishenshou = "02",//四神兽
        Yuangushenshou = "03"//远古神兽
    }

    const enum ShilianViewType {
        ShilianMain = "01", /**主界面*/
        FubenScene = "02", /**副本场景*/
        ResultFuben = "03", /**个人副本结算界面*/
        ForbiddenSaodang = "05", /**禁地副本扫荡*/
        XiantaScene = "06", /**仙塔场景*/
        ForbiddenScene = "07", /**禁地副本场景*/
        YuanlingScene = "08", /**元灵副本*/
        YuanLingTeam = "09", /**元灵队伍列表界面*/
        YuanLingInvite = "10", /**元灵组队邀请界面*/
        YuanLingAchieve = "11", /**元灵成就界面*/
        YuanLingBeInvited = "12", /**元灵被邀请组队界面*/
        YuanLingResult = "13", /**元灵副本结算界面*/
        YuanLingReward = "14", /**元灵副本结算奖励界面*/
        YuanLingDied = "15", /**元灵副本阵亡界面*/
    }

    const enum ShilianMainBtnType {
        Fuben = "01", /**个人副本*/
        Forbidden = "02", /**禁地副本*/
        Xianta = "03", /**仙塔副本*/
        YuanLing = "04", /**元灵副本*/
    }

    const enum RankViewType {
        RankMain = "01", /**排行榜界面*/
        RankGod = "02", /**排行榜界面*/
        NewRankMain = "03", /**主界面上方排行榜按钮打开的界面*/
        NewRankGod = "04", /**主界面上方排行榜按钮打开的界面*/
    }

    const enum RankMainBtnType {
        Rank = "01", /**排行榜界面*/
    }

    const enum BossViewType {
        BossMain = "01", /**Boss主界面*/
        BossReward = "02", /**Boss奖励预览*/
        CrossBossHurtReward = "03", /**跨服Boss伤害奖励*/
        CrossBossLuckyReward = "04", /**跨服Boss幸运奖励*/
        CrossBossRankMain = "05", /**跨服Boss排行榜*/
        CrossBossScene = "06", /**跨服Boss场景*/
        BossRewardShow = "07", /**奖励获取*/
        AbyssScene = "08",//坠魔深渊场景
        AbyssList = "09",//坠魔深渊boss列表
        AbyssLucky = "10",//坠魔深渊骰子
        AbyssTeam = "11",//坠魔深渊组队
        AbyssInvite = "12",//坠魔深渊组队邀请
        AbyssMyTeam = "13",//坠魔深渊队伍
        AbyssNoTeam = "14",//坠魔深渊没有队伍
        AbyssTips = "15",//坠魔深渊提示弹窗
        CrossBossTips = "16",//跨服boss提示弹窗
    }

    const enum BossMainBtnType {
        Many = "01", /**多人boss*/
        Personal = "02", /**个人boss*/
        Vip = "03", /**vip boss*/
        Cross = "04", /**跨服boss*/
        Abyss = "05",//坠魔深渊
    }

    const enum CompeteViewType {
        CompeteMain = "01", /**竞技主界面*/
        YouliMain = "02", /**游历主界面*/
        YouliAwardMain = "03", /**游历阶段奖励主界面*/
        YouliScoreMain = "04", /**游历积分福利界面*/
        YouliRankMain = "05", /**游历排行榜*/
        YouliWishBox = "06", /**许愿宝箱*/
        YouliTreasure = "07", /**奖励宝藏*/
        YouliSpecialKiller = "08", /**异形杀手*/
        YouliScoreKiller = "09", /**积分杀手*/
        YouliKillerFight = "10", /**异形、积分杀手战斗*/
        YouliDati = "11", /**游历答题*/
        YouliDatiResult = "12", /**游历答题结果*/

        DoufaMain = "19", /**斗法主界面*/
        DoufaRewardMain = "20", /**斗法阶段奖励*/
        DoufaVs = "21", /**斗法匹配*/
        DoufaQuickWin = "22", /**斗法碾压*/
        DoufaRankMain = "23", /**斗法排行榜*/
        DoufaRecord = "24", /**斗法战报*/
        DoufaWin = "25", /**斗法胜利*/
        DoufaFail = "26", /**斗法失败*/
        DoufaFinals = "27", /**斗法决赛分组*/
        DoufaGuess = "28",/**斗法竞猜*/

        KuafuDoufaRankMain = "40",/**跨服斗法*/
        KuafuDoufaAchieve = "41",/**跨服斗法*/
        KuafuDoufaRank = "42",/**跨服斗法*/
        KuafuDoufaScore = "43",/**跨服斗法*/
        KuafuDoufaSkill = "44",/**跨服斗法*/
        KuafuDoufaScene = "45",/**跨服斗法*/
        KuafuDoufaTips = "46",/**跨服斗法*/
    }

    const enum CompeteMainBtnType {
        Youli = "01", /**游历*/
        Doufa = "02",/**斗法*/
        KuafuDoufa = "03",/**跨服斗法*/
    }

    const enum YouliAwardMainBtnType {
        Step = "01",/**阶段奖励*/
    }

    const enum YouliScoreMainBtnType {
        Score = "01",/**积分福利*/
    }

    const enum PayViewType {
        Gift = "01", /**礼包*/
    }

    const enum CrossBossRankMainBtnType {
        Zongmen = "01", /**宗门排名*/
        Personal = "02", /**个人排名*/
    }

    const enum SuitMainBtnType {
        SuitType1 = "01",
        SuitType2 = "02",
        SuitType3 = "03",
        SuitType4 = "04",
        SuitType5 = "05",
    }

    const enum SuitSecondBtnType {
        Btn1 = "01",//进阶
        Btn2 = "02",//锻造，强化
        Btn3 = "03",//精铸
    }

    const enum SuitGiftViewType {
        Gift = "01"
    }

    const enum SettingViewType {
        SettingMain = "01", // 游戏设置主界面
    }

    /**战力转盘 */
    const enum LotteryViewType {
        Main = "01",
    }

    const enum VipViewType {
        VipMain = "01",// VIP主界面
        VipUp = "02",// vip升级弹窗
        RechargeMain = "022",// 充值主页面 todo 待处理
    }

    const enum VipMainBtnType {
        Vip = "01",//vip
        VipPrivilege = "02",//特权卡
    }

    /**招财仙*/
    const enum ZcxMainBtnType {
        NoPay = "00",//未充值前
        LuckNum = "01",//幸运数字
        Bank = "02",//进宝钱庄
        Fuben = "03",//财神副本
        Exchange = "04",//财神兑换
        Chaojilicai = "05",//超级理财
        Zhizunlicai = "06",//至尊理财
        Fulijijin = "07",//福利基金
        Chaojijijin = "08",//超级基金
    }

    const enum ChatViewType {
        ChatMain = "01",//聊天主界面
        Emoticon = "02",//聊天表情
        ChatSetting = "03",//聊天设置
        ChatCheck = "04",//聊天角色点击按钮
        ChatCompete = "05",//战力比拼
        RoleTipsMain = "06",//查看玩家
        RoleSurfaceTips = "07",//玩家外显显示
    }

    const enum ChatMainBtnType {
        Cross = "01",//跨服
        Local = "02", //本服
        Private = "03", //私聊
        Union = "04",//宗门
        Zhandui = "05",//战队
        System = "06",//系统公告
    }

    const enum YjjsMainBtnType {
        Btn1 = "01",//三生修炼
        Btn2 = "02",//三世危机
        Btn3 = "03",//神器修行
        Btn4 = "04",//瑶姬宝库
        Btn5 = "05",//累充礼包
        Btn6 = "06",//目标豪礼
        Btn7 = "07",//瑶姬令
    }

    /**仙宗 */
    const enum UnionMainType {
        /**已加入宗门 */
        UnionIn = "01",
        /**首次加入欢迎界面 */
        UnionWelcome = "02",
        /**申请列表界面 */
        UnionApply = "03",
        /**成员信息操作界面 */
        UnionMember = "04",
        /**宗门捐献 */
        UnionDonate = "05",
        /**每日俸禄 */
        UnionWage = "06",
        /**福利大厅 */
        UnionWelfare = "07",
        /**改名弹窗 */
        UnionRename = "08",
        /**天坛/圣坛 */
        UnionLottery = "09",
        /**仙尊秘宝 */
        UnionHeroShop = "10",
        /**仙尊设置 */
        UnionHero = "11",
        /**圣坛更多大奖 */
        UnionLotteryReward = "12",
        /**圣坛奖励预览 */
        UnionPreview = "13",
        /**遗宝 */
        UnionTreasure = "14",
        /**遗宝排行榜 */
        UnionTreasureRank = "15",
        /**协助 */
        UnionTreasureHelp = "16",
        /**全民奖励 */
        UnionTreasureReward = "17",
        /**斩妖台 */
        UnionKill = "18",
        /**斩妖台排行 */
        UnionKillRank = "19",
        /**斩妖召唤 */
        UnionKillTips = "20",
        /**区间排行 */
        UnionRankTips = "21",
        /**宗门仓库 */
        UnionStorage = "22",
        /**仓库捐献 */
        UnionDonateEquip = "23",
        /**宗门宝库仙玉兑换 */
        UnionStoreTips = "24",
        /**书斋 */
        UnionBook = "25",
        /**仙兽 */
        UnionBeast = "26",
        /**仙兽每周奖励 */
        UnionBeastReward = "27",
        /**仙兽排行 */
        UnionBeastRank = "28",
        /**仙兽光环效果 */
        UnionBeastRing = "29",
        /**仓库回收 */
        UnionRecycle = "30",
        /**仓库兑换 */
        UnionExchange = "31",
        /**前端假战斗 */
        UnionFight = "32",
        /**书斋升阶提示 */
        UnionBookUpTips = "33",
        /**书斋升阶提示 */
        UnionBookUpTips2 = "34",
        /**排行榜结算界面 */
        UnionRankReward = "35",
    }

    const enum YijieViewType {
        YijieMain = "01", //主界面*/
        YijieScene = "02", //场景*/
        YijieBoss = "03", //BOSS刷新*/
        YijieLucky = "04", //击杀大奖*/
        YijieResult = "05", //获得奖励*/
        YijieBossList = "06", //boss列表*/
        YijieResult2 = "07", //获得奖励2*/
        YonghengYijieScene = "10", //永恒异界场景*/
        YonghengYijieOpen = "11", //永恒异界妖魔入侵界面*/
        SeaMain = "20",//幻境之海
        SeaTask = "21",//幻境之海
        SeaReward = "22",//幻境之海
        SeaFubenMain = "23",//幻境之海
        SeaScene = "24",//幻境之海
        SeaBossMain = "25",//幻境之海
        SeaRankMain = "26",//幻境之海
        SeaRankSection = "27",//幻境之海
    }

    const enum YijieMainBtnType {
        Yijie = "01",//异界
        YonghengYijie = "02", //永恒异界
        Sea = "03", //幻境之海
    }

    const enum SeaMainBtnType {
        Sea1 = "01",//仙界之海
        Sea2 = "02", //神界之海
        Sea3 = "03", //圣界之海
    }

    const enum WonderfulActMainBtnType {
        Btn1 = "01",//仙女送礼
        Btn2 = "02",//藏珍阁
        Btn3 = "03",//连续充值
        Btn4 = "04",//累计充值
        Btn5 = "05",//登录奖励
        Btn6 = "06",//鸿运赐福
        Btn7 = "07",//天女赐福
        Btn8 = "08",//VIP5福利
        Btn9 = "09",//幻境累充
        Btn10 = "10",//幻境礼包
    }

    const enum ConsecrateViewType {
        Consecrate = "01",
        /**上架弹窗 */
        ConsecrateShelf = "02",
        /**加速弹窗 */
        ConsecrateSpeedUp = "03",
        /**抽奖弹窗 */
        ConsecrateLottery = "04",
        /**奖励预览 */
        ConsecratePreview = "05",

        AmassUp = "21",//异兽奇记升阶界面
        AmassTips = "22",//图鉴tips

    }

    const enum XianyuanViewType {
        Xianlv = "01",//仙侣
        Xianyou = "02",//仙友
        Xiandui = "03",//仙队
        AttrView = "04",//仙侣属性
        InviteRecord = "05",//仙侣邀请记录
        InviteAdd = "06",//仙友列表
        Zhaohuan = "07",//召唤
        Breakup = "08",//离婚
        ChildMain = "09",//子女
        ChildJiban = "10",//子女羁绊
        ChildHuanzhuang = "11",//子女换装
        SkillConditionTips = "12",//技能激活条件展示
        ChildShangzhen = "13",//子女上阵
        ChildSkillTips = "14",//主动技能弹窗
        RingMain = "15",//仙戒
        ShilianSaodang = "16",//试炼扫荡
        ShilianScene = "17",//试炼场景
        ShilianResult = "18",//试炼结算
        ShilianRank = "19",//试炼排行榜
        ShilianRankReward = "20",//试炼排行榜奖励

        XianlvDoufaTips = "21",//仙侣斗法本轮结束弹窗
        XianlvDoufaScene = "22",//仙侣斗法战斗
        XianlvDoufaWin = "23",//战斗胜利
        XianlvDoufaFail = "24",//战斗失败
        XianlvDoufaRank = "25",//仙侣斗法排行榜
        XianlvDoufaSection = "26",//仙侣斗法排行榜

        RingGiftTips = "27",//仙戒礼包tips
    }

    const enum XianlvMainBtnType {
        Xianlv = "01",//仙侣
        Renwu = "02",//任务
        Shilian = "03",//试炼
        Zhanchang = "04",//斗法
    }

    const enum XianlvChildMainBtnType {
        Gongxiang = "01",
        Shengxing = "02",
        Shenbing = "03",
        Lingyi = "04"
    }

    const enum XianlvRingMainBtnType {
        Yuanjie = "01",
        Huanhua = "02"
    }

    const enum GiftViewType {
        Main = "01"
    }

    const enum FriendViewType {
        FriendMain = "01", /**主界面*/
        FriendGift = "02", /**赠送礼物*/
        FriendCheck = "03", /**好友查看*/
        FriendResult = "04", /**好友切磋结算界面*/
    }

    const enum FriendMainBtnType {
        Friend = "01",//仙友
        Recommend = "02", //推荐仙友
        Follow = "03",//关注我的
        Black = "04", //黑名单
    }

    const enum GodViewType {
        GodMain = "01",
        GodCommonMain = "02",
        GodGiftMain = "03",
        GodTreasure = "04",
        GodHauntedFight = "05",
        GodHauntedDetail = "06",
        GodHaunted = "08",
        GodRandom = "09",
        GodHauntedActivate = "10",
        GodAvatar = "11",
        GodDragonoath = "12",
        GodTravelTip = "13",
        GodTravelChoose = "14",
        GodBuffTips = "15",
        GodDragonoathBuffTips = "16",
    }

    const enum TongtiangeMainBtnType {
        TtgBtn1 = "01",//通天阁
        TtgBtn2 = "02",//挑战
        TtgBtn3 = "03",//仙宗挑战
        TtgBtn4 = "04",//礼包
        TtgBtn5 = "05",//兑换
        TtgBtn6 = "06",//登陆奖励
    }

    const enum TongtiangeRankMainBtnType {
        Btn1 = "01",
        Btn2 = "02"
    }

    const enum MoreViewType {
        AchieveMain = "01", //成就主界面
        HuashenMain = "02",//化神主界面
        HuashenOpenMain = "03",//化神预告开启主界面
        HuashenBattleMain = "04",//化神出战
        SkyPalace = "05",//天宫入口
        ArtifactBuwei = "06",//荒古神器部位弹窗
        ArtifactBuff = "07",//荒古神器技能弹窗
        ArtifactTips = "08",//荒古神器弹窗
        HuashenZhilu = "09",//化神之路
        ZhanshendianMain = "10",//战神殿主界面
        ZhanduiBuildMain = "11",//战队建立主界面
        ZhanduiCreate = "12",//战队创建
        ZhanduiJoin = "13",//战队加入
        ZhanduiMain = "14",//战队主界面
        ZhanduiRename = "15",//战队修改战队名
        ZhanduiInviteList = "16",//战队申请列表
        ZhanduiLevelSecondMainMdr = "17",//战队等级弹窗
        ZhanduiTeammateCheck = "18",//战队队友操作界面
        ZhanduiXianjiMain = "19",//战队仙纪主界面
        XujieJitanMain = "20",//墟界祭坛主界面
        XujieJitanGiftMain = "21",//墟界祭坛礼包主界面
        XujieJitanHuanhua = "22",//墟界祭坛幻化
        XujieJitanSpeedUp = "23",//墟界祭坛加速
        XujieJitanShelf = "24",//墟界祭坛背包

        EventChat = "29", //荒古女神事件对话，公共
        HuangguMain = "30", //荒古主界面
        GoddessMain = "31", //荒古女神
        GoddessAttr = "32", //荒古女神属性
        GoddessGod = "33", //荒古女神仙力
        GoddessSummon = "34", //荒古女神召唤
        RewardShow = "35", //奖励预览
        GoddessChat = "36", //荒古女神交谈
        GoddessTargetMain = "37", //荒古女神目标返利
        GoddessEvent = "38", //荒古女神事件
        GoddessEventChallenge = "39", //荒古女神事件挑战

        MiningMain = "40",//虚界矿脉
        MiningTips = "41",//虚界矿脉战报
        MiningFight = "42",//虚界矿脉征服
        MiningSave = "43",//虚界矿脉解救
        MiningLingbao = "44",//虚界矿脉灵宝
        MiningGift = "45",//虚界矿脉达标礼包
        MiningBuy = "46",//虚界矿脉购买次数
        MiningResultWin = "47",//虚界矿脉战斗胜利
        MiningResultFail = "48",//虚界矿脉战斗失败

        XujieTansuoMain = "51",//墟界探索
        XujieTansuoRankMain = "52",//墟界探索排行榜
        XujieTansuoLayerMain = "53",//墟界探索区域层级
        XujieTansuoZhanlipin = "54",//墟界探索战利品
        XujieTansuoRankSection = "55",//墟界探索范围排行榜
        XujieTansuoBusinessGrid = "56",//墟界探索商人
        XujieTansuoRewardGrid = "57",//墟界探索奖励
        XujieTansuoExpeditionGrid = "58",//墟界探索远征
        XujieTansuoExpeditionShenLing = "59",//墟界探索远征神灵
        XujieTansuoBossGrid = "60",//墟界探索boss格
        XujieTansuoZhanbao = "61",//墟界探索战报
        XujieTansuoSaodang = "62",//墟界探索扫荡
        XujieTansuoSceneResult = "63",//墟界探索结算
        XujieTansuoSceneResultKill = "64",//墟界探索结算击杀
        TBSFight = "65",//回合制
        Zhenrong = "66",//阵容界面
        ZhenrongShangzhen = "67",//阵容上阵界面
        XujieTansuoSceneResultFail = "68",//墟界探索结算失败
        ZhenrongAttr = "69",//阵容属性

        GoddessRecordMain = "70", //女神录主界面
        TimeGoddessMain = "71", //女神录-创世女神礼包
        TimeGoddessEvent = "72", //女神录-创世女神事件
        TimeGoddessEventChallenge = "73", //女神录-创世女神事件挑战
        TimeGoddessChat = "74", //女神录-创世女神交谈
        TimeGoddessSpeedUp = "75", //女神录-创世女神供奉加速
        TimeGoddessShelf = "76", //女神录-创世女神供奉选择
        TimeGoddessSummon = "77", //女神录-创世女神抽奖

        FengmoHurtReward = "80",//封魔伤害奖励
        FengmoRank = "81",//封魔排行榜
        Fengmo = "82",//封魔
        FengmoRankTips = "83",//封魔排行榜
        FengmoFight = "84",//封魔挑战
        FengmoResult = "85",//封魔结算
        FengmoScene = "86",//封魔场景

        HunkaMain = "90", //女神录-魂卡
        HunkaTypeMain = "91", //女神录-魂卡
        HunkaGongming = "92", //女神录-魂卡共鸣
        HunkaBag = "93", //女神录-魂卡背包
        HunkaTips = "94", //女神录-魂卡提示
        HunkaOneKeyCompose = "95", //女神录-魂卡一键合成
        HunkaComposeTips = "96", //女神录-魂卡合成成功

        XianmaiMain = "100",//仙脉争夺
        XianmaiZhanbao = "101",//仙脉争夺战报
        XianmaiResult = "102",//仙脉争夺结算界面
        XianmaiList = "103",//仙脉争夺列表
        XianmaiItemTips = "104",//仙脉争夺tips
        XianmaiSelect = "105",//仙脉选择
        XianmaiItemTipsOnekey = "106",//仙脉争夺一键寻脉
        XianmaiItemTipsMine = "107",//仙脉争夺我的仙脉
        XianmaiRank = "108",//仙脉争夺排行榜
        XianmaiFight = "109",//仙脉通用战斗动画PK
        XianmaiFightSuccess = "110",//抢占成功
        XianmaiFightFail = "111",//抢占失败
        XianmaiRankSectionTips = "112",//仙脉区间排行榜

        Xiandi = "120",//仙帝争霸
        XiandiShow = "121",//展示
        XiandiHouse = "122",//仙帝宫
        XiandiRank = "123",//排行榜
        XiandiTips = "124",//登录提示
        XiandiSkill = "125",//技能弹窗
        XiandiGodress = "126",//女神
        XiandiList = "127",//天王列表
        XiandiInfo = "128",//仙帝信息
        XiandiSection = "129",//排行榜
        XiandiGift = "130",//弑神礼包

        CommonMatch = "131",//匹配

        HuanjingCollectItemTips = "137",//幻境系统外显tips
        HuanjingStarSkillTips = "138",//升星阶数tips
        HuanjingStarStageTips = "139",//升星技能tips
        HuanjingMain = "140",//幻境系统
        HuanjingGrowMain = "141",//幻境宝物养成
        HuanjingStage = "142",//幻境系统进阶
        HuanjingStageSkillTips = "143",//幻境系统进阶技能tips
        HuanjingStar = "144",//幻境系统升星
        HuanjingHuanling = "145",//幻境系统幻灵
        HuanjingZhushen = "146",//幻境系统驻神
        HuanjingCollectMain = "147",//幻境系统区域收集
        HuanjingZhushenSkillTips = "148",//驻神技能tips
        HuanjingHuanlingSkillTips = "149",//幻灵技能tips

        KuafuDoufa = "150",//跨服斗法，占位，红点用

        CrossUnion = "160",//跨服仙宗战
        CrossUnionReady = "161",//跨服仙宗战报名
        CrossUnionTeam = "162",//调整阵型
        CrossUnionFormat = "163",//阵容弹窗
        CrossUnionSkill = "164",//技能说明
        CrossUnionReward = "165",//奖励预览
        CrossUnionScene = "166",//场景
        CrossUnionInfo = "167",//对战详情
        CrossUnionWin = "168",//场景结算
        CrossUnionZhanbao = "169",//战报

        XianjieLuandouMain = "170",//仙界乱斗
        XianjieLuandouRankMain = "171",//仙界乱斗排行榜
        XianjieLuandouScene = "172",//仙界乱斗场景
        XianjieLuandouRankSection = "173",//仙界乱斗排行榜查看
        XianjieLuandouScoreReward = "174",//仙界乱斗积分奖励
        XianjieLuandouSkill = "175",//仙界乱斗技能列表
        XianjieLuandouZhanbao = "176",//仙界乱斗战报
        XianjieLuandouStatistic = "177",//仙界乱斗战场统计
        XianjieLuandouSkillTips = "178",//仙界乱斗技能
        XianjieLuandouBossTips = "179",//仙界乱斗boss

        XiandiTreasure = "180",//仙帝宝库
        XiandiWeapon = "181",//荒古仙器
        XiandiStage = "182",//荒古仙器进阶
        XiandiShilian = "183",//荒古仙器试炼

        Xianwei = "190",//仙位
        XianweiList = "191",//仙位对应称号列表
        XianweiTips = "192",//仙位战报
        XianweiRank = "193",//仙位排行
        XianweiSection = "194",//仙位排行区间
        XianweiProp = "195",//仙位占领奖励
    }

    const enum AchieveMainBtnType {
        Achieve = "01",//成就
        Honour = "02",//荣誉
    }

    const enum HuashenMainBtnType {
        HuashenTask = "00",//化神任务
        Huashen = "01",
        HuashenStar = "02",
        HuashenTianfu = "03",
    }

    const enum YiShouViewType {
        Main = "01",
        Bag = "02",//背包
        Compose = "03",//合成
        Decompose = "04",//分解
        ShouguSkillTips = "05",//兽骨技能tips
        ShouguEquipTips = "06",//兽骨部位tips
        ShouhunSkillTips = "07",//兽魂技能tips
        ShouguEquipTips2 = "08",//背包穿戴tips
        ShoulingSkillTips = "09",//兽灵技能tips
        ShoulingEquipTips = "10",//兽灵装备tips
        ShoulingEquipTipsBag = "11",//兽灵装备背包tips
    }

    const enum YishouMainBtnType {
        Shougu = "01",
        Shouhun = "02",
        Shouling = "03",
        Shouyin = "04",
    }

    const enum ZhanduiMainBtnType {
        Xujie = "01",//墟界
    }

    const enum XujieJitanMainBtnType {
        Btn1 = "01",//墟界祭坛
        Btn2 = "02",//墟界灵宝
    }

    const enum XujieTansuoMainBtnType {
        Btn1 = "01",//墟界探索
        Btn2 = "02",//探索令
    }

    const enum HuangguMainBtnType {
        Huanggu = "01",//荒古
        Hundun = "02",//混沌
        //墟界
    }

    const enum GoddessMainBtnType {
        Goddess = "01",//荒古女神
    }

    const enum GoddessTargetMainBtnType {
        Target = "01",//目标返利
    }

    const enum GoddessRecordMainBtnType {
        GoddessRecord = "01",//女神录
    }

    const enum TimeGoddessMainBtnType {
        TimeGoddess = "01",//创世女神
    }

    const enum HuanjingMainBtnType {
        Btn1 = "01"
    }

    const enum HuanjingGrowMainBtnType {
        Btn1 = "01"
    }

    const enum HuanjingCollectMainBtnType {
        Btn1 = "01"
    }

    const enum SummonMainBtnType {
        Zhaohuan = "01",//召唤
        Treasure = "02",//宝藏
        Fuchenlinghu = "03",//浮尘灵壶
        Huanjingzengli = "04",//幻境赠礼
        Huanjingbaozang = "05",//幻境宝藏
    }

    const enum XianjieLuandouMainBtnType {
        Btn1 = "01"
    }
}