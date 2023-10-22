namespace game {
    export const enum MainEvent {
        UPDATE_OFFLINE = "update_offline", /**挂机收益信息返回*/
        UPDATE_WND_BASE_MDR_BG = "update_wnd_base_mdr_bg", /**更新WndBaseMdr背景*/
        UPDATE_WND_BASE_MDR_TITLE = "update_wnd_base_mdr_title", /**更新WndBaseMdr标题，传LanDef文本*/
        UPDATE_COMMON_ATTR = "update_common_attr", /**服务端返回请求的属性，会携带index数组，一般不做index监听*/
        UPDATE_COMMON_SURFACE_ATTR = "update_common_surface_attr", /**服务端返回请求的外显属性，会携带属性数组*/
        //UPDATE_WND_BASE_MDR_TOP = "update_wnd_base_mdr_top", /**WndBaseMdr关闭按钮层级移到最高*/
        UPDATE_WND_SECOND_MDR_TOP = "update_wnd_second_mdr_top", /**WndSecondMdr二级页签移到最高*/
        UPDATE_WND_BASE_MDR_SEL_TAB = "update_wnd_base_mdr_sel_tab", /**更新WndBaseMdr分页选中，传进来的参数是各自定义的BtnType*/
        ON_OPEN_FUNC_INIT = "on_open_func_init", /**功能开启初始化，携带openIdx数组*/
        ON_OPEN_FUNC_UPDATE = "on_open_func_update", /**功能开启更新，携带openIdx数组*/
        ON_OPEN_FUNC_DELETE = "on_open_func_delete", /**功能id关闭的，携带openIdx数组*/
        UPDATE_BASE_REWARD_MDR_STATE = "update_base_reward_mdr_state", /**更新通用的奖励领取界面 BaseRewardMdr 的奖励领取状态*/
        ON_UPDATE_EASY_USE_PROP = "on_update_easy_use_prop",//更新快捷道具
        ON_UPDATE_EASY_USE_PROP_COUNT = "on_update_easy_use_prop_count",//更新快捷道具
        ON_CLOSE_EASY_UES_PROP = "on_close_easy_use_prop",//关闭快捷道具弹窗
        ON_ICON_IMAGE_FLY = "on_icon_image_fly",//图标飞动效果,携带IconImageFlyData
        COMMON_ADD_EFT = "common_add_eft",//领取奖励等特效飞升
        GET_MAIN_BTN_TARGET = "get_main_btn_target",//获取主界面按钮
        ON_REWARD_FIND_UPDATE = "on_reward_find_update", //资源找回

        /**通用关闭弹窗 */
        ON_CLOSE_COMMON_POPUP = "on_close_common_popup",
    }

    /** 特权id，部分系统定死*/
    export const enum PrivilegeIdx {
        RoleRing = 1006,//主角光环
    }

    /** 功能开启id*/
    export const enum OpenIdx {
        Xiuxian = 1041670084, /**转生，修仙*/
        Xiandan = 1041670085, /**转生，仙丹*/
        Lingchi = 1041670086, /**转生，灵池*/
        Pass = 1040190001, /**闯关 */
        PassAuto = 1041670093, /**自动闯关*/
        WorldMap = 1040660001, /**闯关，上古地图 */
        Qiyuan = 1041670087, /**闯关，奇缘 */
        Lingmai = 1041670088, /**转生，灵脉*/
        Role = 1041670089, /**角色*/
        Title = 1041670090, /**称号*/
        DressUp = 1041670091, /**装扮*/
        Linggen = 1041670092, /**转生，灵根*/
        Strength = 1041670094, /**强化 */
        Gem = 1041670095, /**强化，宝石 */
        Advanced = 1041670096, /**强化，进阶 */
        Bag = 1041670097, /**背包，背包 */
        BagEquip = 1041670098, /**背包，装备 */
        BagMelt = 1041670099, /**背包，熔炼 */
        BagCompose = 1041670100, /**背包，合成 */
        BagDel = 1041670101, /**背包，分解 */
        Shenling = 1041670102, /**神灵 */
        Xianfa = 1041670103, /**仙法 */
        Horse = 1041670104, /**坐骑 */
        Lingchong = 1041670105, /**灵宠 */
        Tianshen = 1041670106, /**元灵 */
        Daily = 1040180001, /**日常 */
        Shilian = 1041670107, /**封魔圣殿，试炼模块功能id*/
        Fuben2 = 1041670108, /**金龟暴穴 */
        Fuben3 = 1041670109, /**逢莱仙境 */
        DailyLimitTime = 1041670112, /**日常限时活动*/
        Forbidden = 1041670113, /**禁地副本*/
        Xianta = 1041670114, /**仙塔副本*/
        Xianta2 = 1041670207,//仙塔副本,万剑仙塔
        Yuanling = 1041670115, /**元灵副本*/
        PersonalBoss = 1041670116, /**个人Boss*/
        VipBoss = 1041670117, /**VIPBoss*/
        Boss = 1041670118, /**多人Boss，Boss模块功能id*/
        CrossBoss = 1041670119, /**跨服Boss*/
        Compete = 1041670120, /**竞技*/
        Youli = 1041670121, /**游历*/
        Doufa = 1041670122,/**斗法*/
        /**神兵 */
        Weapon = 1041670123,
        /**羽翼 */
        Wing = 1041670124,
        /**时装 */
        Body = 1041670125,
        SuitType1 = 1041670126,//苍天套装
        SuitType2 = 1041670127,//炎天套装
        SuitType3 = 1041670128,//颢天套装
        SuitType4 = 1041670129,//玄天套装
        SuitType5 = 1041670130,//钧天套装
        SuitCast3 = 1041670131,//颢天精铸
        SuitCast4 = 1041670132,//玄天精铸
        SuitCast5 = 1041670133,//钧天精铸
        SuitForge3 = 1041670252,//颢天锻造
        SuitForge4 = 1041670253,//玄天锻造
        SuitForge5 = 1041670254,//钧天锻造
        RoleCollect = 1041670134,//角色面板的收集
        RoleHuanhua = 1041670135,//角色面板的幻化
        /**战力转盘 */
        Lottery = 1041670136,
        /**召唤系统 */
        Summon = 1041670137,
        /**商城*/
        Store = 1041670138,
        /**签到有礼*/
        SignGift = 1041670141,
        /**送召唤卷 */
        Giving = 1041670142,
        /**首充豪礼 */
        FirstCharge = 1041670143,
        /**招财仙*/
        Zhaocaixian = 1041670144,
        /**0元购*/
        ZeroBuy = 1041670145,
        /**主角光环*/
        RoleRing = 1041670146,
        /**斩妖福利 */
        KillBoss = 1041670147,
        /**仙玉商城*/
        StoreXianyu = 1041670148,
        /**每日每周商城*/
        StoreDaily = 1041670149,
        /**聊天，本服频道*/
        Chat = 1041670150,
        /**赠送瑶姬 */
        GivingShenLing = 1041670151,
        /**兑换商城 */
        ExchangeShop = 1041670152,
        /**瑶姬降世*/
        Yaojijiangshi = 1041670153,
        /**仙宗 */
        Union = 1041670154,
        /**特权令*/
        PrerogativeWrit = 1041670155,
        Yijie = 1041670156,//异界
        YonghengYijie = 1041670157,//永恒异界
        /**精彩活动-仙女送礼*/
        WonderfulAct = 1041670158,
        /**精彩活动-藏珍阁等*/
        WonderfulAct1 = 1041670159,
        /**浴火重生 */
        Yhcs = 1041670160,
        /**供奉系统 封魔 */
        Consecrate = 1041670161,
        Amass = 1041670162,//异兽奇记
        Amass2 = 1041670163,//洪荒妖录
        //兑换商店页签
        ExchangeType1 = 1041670164,//熔炼
        ExchangeType2 = 1041670165,//奖券
        ExchangeType3 = 1041670166,//历练
        ExchangeType4 = 1041670167,//封神
        ExchangeType5 = 1041670168,//道侣
        ExchangeType6 = 1041670169,//灵脉
        ExchangeType7 = 1041670170,//魂石
        ExchangeType8 = 1041670171,//声望
        ExchangeType9 = 1041670172,//时光
        /**仙侣*/
        Xianlv = 1041670173,
        /**仙侣子女*/
        XianlvChild = 1041670174,
        /**仙侣仙戒*/
        XianlvRing = 1041670175,
        /**仙侣任务*/
        XianlvRenwu = 1041670176,
        /**仙侣试炼*/
        XianlvShilian = 1041670177,
        /**仙侣战场*/
        XianlvZhanchang = 1041670178,
        /**仙缘礼包*/
        XianlvGift = 1041670179,
        /**仙友*/
        Friend = 1041670180,
        /**排行榜*/
        Rank = 1041670189,
        /**我要变强*/
        Stronger = 1041670190,
        /**召唤宝藏*/
        SummonTreasure = 1041670191,
        /**成神在即*/
        Chengshen = 1041670192,
        //至尊礼包
        SupremeGit = 1041670194,
        /**鸿运赐福 */
        WonderfulAct6 = 1041670195,
        /**超值礼包*/
        ChaozhiLibao = 1041670196,
        /**每日特惠*/
        MeiriTehui = 1041670197,
        Achieve = 1041670198,//成就系统
        /**通天阁*/
        Tongtiange = 1041670199,
        /**天帝录*/
        Tiandilu = 1041670200,
        /**仙剑 */
        Xianjian = 1041670201,
        /**化神 */
        Huashen = 1041670202,
        /**新服冲榜 */
        PunshList = 1041670203,
        /**异兽*/
        Yishou = 1041670204,
        /**飞升榜*/
        FlyRank = 1041670205,//中控活动
        /**天宫 */
        SkyPalace = 1041670206,
        /**特惠礼包 */
        TehuiLibao = 1041670208,
        /**进阶特惠 */
        JinjieTehui = 1041670209,
        /**仙池祈愿*/
        Xianchi = 1041670210,
        /**神灵天赋礼包*/
        ShenlingGift = 1041670211,
        /**飞升悟空*/
        FeishengWukong = 1041670212,
        /**绝版仙剑*/
        JuebanXianjian = 1041670213,
        /**至尊兽印*/
        ZhizunShouyin = 1041670214,
        /**VIP5福利*/
        VipWelfare = 1041670215,
        /**天女赐福*/
        TiannvWelfare = 1041670216,
        /**精彩活动-累计充值*/
        Leijicharge = 1041670217,
        /**精彩活动总入口*/
        Wonderful = 1041670218,
        /**战队系统*/
        Zhandui = 1041670222,
        /**墟界探索*/
        XujieTansuo = 1041670223,
        /**墟界矿脉*/
        XujieKuangmai,
        /**狂欢庆典*/
        Carnival = 1041670225,
        /**墟界祭坛*/
        XujieJitan = 1041670226,
        ChatSystem = 1041670227,//系统频道，系统公告用这个判断
        // 1041670228	跨服频道
        // 1041670229	仙宗频道
        // 1041670230	战队频道
        ChatPrivate = 1041670231,//私聊频道
        Huanggu = 1041670232,//荒古
        Goddess = 1041670233,//荒古女神
        UnionTreasure = 1041670234,//仙宗遗宝
        UnionKill = 1041670235,//仙宗斩妖台
        Offline = 1041670236, //挂机收益
        Abyss = 1041670237,//坠魔深渊
        Yuling = 1041670238, /**御灵 */
        GoddessRecord = 1041670239,//女神录
        XiuxianNvpu = 1041670240,//修仙女仆
        Fengmo = 1041670241,//封魔
        Xiandi = 1041670242,//仙帝争霸
        XianmaiZhengduo = 1041670243,//仙脉争夺
        Sea = 1041670244,//幻境之海
        Sea1 = 1041670245,//幻境之海，仙界之海
        Sea2 = 1041670246,//幻境之海，神界之海
        Sea3 = 1041670247,//幻境之海，圣界之海
        Huanjing = 1041670248,//幻境系统
        KuafuDoufa = 1041670251,//跨服斗法
        UnionAuction = 1041670255,//仙宗拍卖
        UnionStore = 1041670256,//仙宗宝库
        Chaojilicai = 1041670257,//超级理财
        Zhizunlicai = 1041670258,//至尊理财
        Fulijijin = 1041670259,//福利基金
        Chaojijijin = 1041670260,//超级基金
        XianLvJinJie = 1041670261, // 修仙礼包
        CrossUnion = 1041670262,//跨服仙宗战
        Fuchenlinghu = 1041670263,//浮尘灵壶
        Huanjingzengli = 1041670264,//幻境赠礼
        Huanjingbaozang = 1041670265,//幻境宝藏
        Huanjingleichong = 1041670266,//幻境累充
        Huanjinglibao = 1041670267,//幻境礼包
        XianjieLuandou = 1041670268,//仙界乱斗
        Honour = 1041670269,//荣誉
    }

    //主界面更多状态
    export const enum MainMoreStatus {
        More = 0, //更多
        Fuction,//功能
        Skill,//技能
    }

    //主界面按钮类型，用于按钮飞动定位
    export const enum MainBtnType {
        Xianfa = 1, //仙法
        //Giving,//送100召唤券
    }

    //提示界面，不再提示类型
    export const enum NotTipsType {
        Carnival = 1, //狂欢庆典最后一天提示
        XujieTansuo = 2,//墟界探索
        FlyRank,//飞升榜
        Tongtiange,//通天阁
        PunshList,//新服冲榜
        CaiyunbangRank,//财运榜排名
        CaiyunbangTurntable, // 财运转盘
    }

    //功能预告气泡显示类型
    // export const enum FunctionNoticePosType {
    //     Left = 0, //左侧
    //     Right,//右侧
    // }

    export interface BoxRewardData {
        reward: number[][],
        tips?: string,
        tips1?: string,
        okFunc?: base.Handler,
        time?: number,
        /**时间文本后缀 */
        timeTips?: string,
        /**按钮文本 */
        btnStr?: string,
        /**隐藏按钮显示提示 用lab_time组件 不和时间共存 */
        btnTips?: string,
        /**标题 */
        title?: string,
    }
}

