namespace game {

    export const enum ViewEvent {
        ON_COMMON_BACK = "on_common_back", /**通用返回界面事件*/
        ON_VIEW_HIDE = "on_view_hide",/**通用界面关闭事件*/
    }

    /**SkillItemRender结构接口*/
    export interface IJumpData {
        viewDatas: string[],//跳转路径
        openIdx?: number,//功能开启ID
        layer?: number,//界面层级
        icon?: string,//图标，一般一级界面分页下标
        //param?: any,//额外参数，特殊系统用
    }

    //UI跳转表界面类型定义
    export const enum JumpViewType {
        Main = 1,//主界面，一级界面：showView
        SecondPop = 2,//二级界面：SecondPop
        Third = 3,//三级界面：facade.showView
    }

    /** 跳转id*/
    export const enum JumpIdx {
        Xianlu = 1,// 仙路·转生
        Shilian,// 封魔圣殿
        Fuben2,// 金龟宝穴
        Fuben3,// 逢莱仙境
        OfflineGain,// 挂机界面，界面层级：2
        Boss,// 多人BOSS
        Shenling,// 神灵界面
        Pass,// 闯关界面
        Role,// 角色界面
        RoleCollect,// 装备收集界面
        Xianfa,// 仙术界面
        Body,// 时装界面
        Youli,// 游历界面
        Xianlu2,// 修仙界面，策划重复加的，跟仙路·转生一样的
        Lingchong,// 灵宠界面
        Horse,// 坐骑界面
        Xianta,// 灵兽仙塔
        Wing,// 背饰界面，羽翼
        Forbidden,// 禁地副本界面
        Xiandan,// 丹药界面
        Strength,// 装备强化界面
        Advanced,// 装备进阶界面
        Gem,// 宝石界面
        SuitType1,// 装备套装界面
        BagMelt,// 熔炼界面
        Yuanling,// 元灵副本
        Store,// 商城（宝藏阁）
        WonderfulAct1,// 精彩活动-藏珍阁
        Summon,// 召唤界面
        Daily,//日常活跃
        Amass,//异兽奇记
        Amass2,//洪荒妖录
        Consecrate,//供奉系统封魔
        Chat,//聊天，跨服频道
        SignGift,//签到有礼
        Union,//仙宗
        Tianshen,//元灵界面
        RoleRing,//主角光环
        Friend,//仙友
        FirstCharge,//首充豪礼
        Lingchi,//灵池
        Yaojijiangshi,//瑶姬降世
        VIP,//VIP
        PrerogativeWrit,//特权令
        WorldMap,//上古地图
        StoreXianyu,//仙玉商城
        KillBoss,//斩妖福利
        PersonalBoss,// 个人BOSS
        Yijie,//异界
        YonghengYijie,//永恒异界
        VipBoos,//VipBoss
        StoreDaily, //每日商城
        StoreWeek, //每周商城
        ExchangeType1,//熔炼兑换
        ExchangeType2,//奖券兑换
        ExchangeType3,//游历兑换
        ExchangeType4,//封神兑换
        ExchangeType5,//仙侣兑换
        ExchangeType6,//灵脉兑换
        ExchangeType7,//魂石兑换
        ExchangeType8,//声望兑换
        ExchangeType9,//时光商城
        Zhaocaixian,//招财仙
        Chuangguanling,//闯关令
        Huoyueling,//活跃令
        ZeroBuy,//0元购
        Doufa,//斗法
        Weapon,//神兵界面
        PunshList,//开服冲榜-特惠礼包
        PrerogativeWrit2,//特权令，上清令
        PrerogativeWrit3,//特权令，太清令
        Xiuxianling,//修仙令
        BagDel,//背包分解
        Xianlv,//仙侣系统
        XianlvRenwu,//仙侣任务
        XianlvShilian,//仙侣试炼
        XianlvChild,//仙侣子女
        CrossBoss,//跨服boss
        HorseGitf,//坐骑进阶礼包  (重复的跳转)
        TianshenGift,//元灵进阶礼包
        WingGift,//羽翼进阶礼包
        WeaponGift,//神兵进阶礼包
        XianlvRing,//戒指进阶礼包
        HuangGuForbidden,//荒古禁地
        XianLingForbidden,//仙陵禁地
        TianZhiForbidden,//天之禁地
        Xianta2,//万剑仙塔
        UnionJuanXian,//仙宗捐献
        XianMengTianTan,//仙门天坛
        XianMengShengTan,//仙门圣坛
        RoleRing2,//主角光环-妖帝血脉
        RoleRing3,//主角光环-妖神重生
        Bossgift,// 多人BOSS直购礼包
        Yijiegift,//异界直购礼包
        Shiliangift,//封魔圣殿直购礼包
        Fuben2gift,//金龟宝穴直购礼包
        Fuben3gift,//逢莱仙境直购礼包
        Fuben4gift,//元灵副本达标奖励
        Youligift,//游历-达标购买
        XianYuanGift,//仙缘礼包
        Tiandilu,//天帝录
        Tiandiluxuanyuan,//天帝录-轩辕宝库
        SupremeGit,//至尊礼包
        Shenlingjiban,//神灵羁绊激活
        Huashen,//化神
        Huashenzhilu,//化神之路
        Achieve,//成就
        Lottery,//战力转盘
        Xianjian,//仙剑
        UnionKill,//宗门斩妖台
        Zhandui,//战队系统
        Zhandui1,//战队加入
        HorseStar,// 坐骑幻化
        TianshenStar,// 元灵幻化
        WingStar,// 羽翼幻化
        WeaponStar,// 神兵幻化
        HuashenStar,// 化神幻化
        Yaojijiangshi3,//神器修行
        Yaojijiangshi2,//三世危机
        XujieJitan,//墟界祭坛
        UnionTreasure,//仙宗遗宝
        VipPrivilege,//VIP特权
        UnionStorage,//仙宗仓库
        UnionHeroShop,//仙宗秘宝
        UnionBeast,//仙宗仙兽
        UnionBook,//仙宗书斋
        UnionWage,//每天俸禄
        KuafuDoufa,//跨服斗法
        Shenling3,//神灵灵器
        Shenling4,//神灵灵魄
        Shenling5,//神灵灵力
        XujieTansuo,//虚界探索
        XujieKuangmai,//虚界矿脉
        Xiandi,//仙帝争霸
        XianmaiZhengduo,//仙脉争夺
        ZuoqiGift,//坐骑礼包
        Qiyuan,//奇缘
        XianLvJinJie,//修仙礼包
        Abyss,//坠魔深渊
        Sea1,//仙海boss
        Sea2,//神海boss
        Sea3,//圣海boss
        Fuchenlinghu,//浮尘灵壶
        Linghujingling,//灵壶精灵
        Huanjing,//幻境
        Huanggu,//荒古仙帝展示
        Title,//称号界面
        Goddess,//荒古女神
        GoddessRecord,//创世女神

        //todo，新增跳转ID时候，需要注意下 ViewMgr 里面的 checkJumpOpen

        Activity = 1000,//活动，不做跳转
        HangUp2 = 1002,//挂机界面
        Pass2 = 1003,//直接进入闯关关卡
        ShowName = 100001,//往后都是只显示名字，不做跳转
    }//108_U_UI跳转表

    /**跳转数据*/
    export const JumpDataList: { [jumpIdx: number]: IJumpData } = {
        [JumpIdx.Xianlu]: {
            openIdx: OpenIdx.Xiuxian,
            viewDatas: [ModName.Xianlu, XianluViewType.XianluMain],
            icon: "xiuxian_tab1"
        },
        [JumpIdx.Shilian]: {
            openIdx: OpenIdx.Shilian,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Fuben, MdrTabBtnType.TabBtnType01],
            icon: "fuben_tab1"
        },
        [JumpIdx.Fuben2]: {
            openIdx: OpenIdx.Fuben2,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Fuben, MdrTabBtnType.TabBtnType02],
            icon: "fuben_tab1"
        },
        [JumpIdx.Fuben3]: {
            openIdx: OpenIdx.Fuben3,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Fuben, MdrTabBtnType.TabBtnType03],
            icon: "fuben_tab1"
        },
        [JumpIdx.OfflineGain]: {
            viewDatas: [ModName.Main, MainViewType.OffLineGain],
            layer: JumpViewType.Third
        },
        [JumpIdx.Boss]: {
            openIdx: OpenIdx.Boss,
            viewDatas: [ModName.Boss, BossViewType.BossMain, BossMainBtnType.Many],
            icon: "many_tab1"
        },
        [JumpIdx.CrossBoss]: {
            openIdx: OpenIdx.CrossBoss,
            viewDatas: [ModName.Boss, BossViewType.BossMain, BossMainBtnType.Cross],
            icon: "cross_tab1"
        },
        [JumpIdx.Shenling]: {
            openIdx: OpenIdx.Shenling,
            viewDatas: [ModName.Shenling, ShenLingViewType.ShenLingMain, ShenLingBtnType.Main],
            icon: "shenlingbiaoqiantubiao1"
        },
        [JumpIdx.Shenling3]: {
            openIdx: OpenIdx.Shenling,
            viewDatas: [ModName.Shenling, ShenLingViewType.ShenLingMain, ShenLingBtnType.Lingqi],
            icon: "shenqibiaoqiantubiao1"
        },
        [JumpIdx.Shenling4]: {
            openIdx: OpenIdx.Shenling,
            viewDatas: [ModName.Shenling, ShenLingViewType.ShenLingMain, ShenLingBtnType.Lingpo],
            icon: "lingpobiaoqiantubiao1"
        },
        [JumpIdx.Shenling5]: {
            openIdx: OpenIdx.Shenling,
            viewDatas: [ModName.Shenling, ShenLingViewType.ShenLingMain, ShenLingBtnType.Lingli],
            icon: "linglibiaoqiantubiao1"
        },
        [JumpIdx.Pass]: {
            openIdx: OpenIdx.Pass,
            viewDatas: [ModName.Pass, PassViewType.PassMain, PassMainBtnType.Main],
            icon: "ui_tab_pass_1"
        },
        [JumpIdx.Role]: {
            openIdx: OpenIdx.Role,
            viewDatas: [ModName.Role, NewRoleViewType.RoleMain],
            icon: "role_tab1"
        },
        [JumpIdx.Title]: {
            openIdx: OpenIdx.Title,
            viewDatas: [ModName.Role, NewRoleViewType.RoleMain, MdrTabBtnType.TabBtnType02],
            icon: "title_tab1"
        },
        [JumpIdx.RoleCollect]: {
            openIdx: OpenIdx.RoleCollect,
            viewDatas: [ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.Collect],
            icon: "zhuangbeibiaoqiantubiao1"
        },
        [JumpIdx.Xianfa]: {
            openIdx: OpenIdx.Xianfa,
            viewDatas: [ModName.Xianfa, XianfaViewType.XianfaMain],
            icon: "ui_tab_xianfa_1"
        },
        [JumpIdx.Body]: {
            openIdx: OpenIdx.Body,
            viewDatas: [ModName.Role, NewRoleViewType.Body],
            icon: "huanhua_tab1"
        },
        [JumpIdx.Youli]: {
            openIdx: OpenIdx.Youli,
            viewDatas: [ModName.Compete, CompeteViewType.YouliMain],
            icon: "youli_tab1"
        },
        [JumpIdx.Xianlu2]: {
            openIdx: OpenIdx.Xiuxian,
            viewDatas: [ModName.Xianlu, XianluViewType.XianluMain],
            icon: "xiuxian_tab1"
        },//重复
        [JumpIdx.Lingchong]: {
            openIdx: OpenIdx.Lingchong,
            viewDatas: [ModName.Surface, SurfaceViewType.LingChongMain],
            icon: "lingchongtubiao1"
        },
        [JumpIdx.Horse]: {
            openIdx: OpenIdx.Horse,
            viewDatas: [ModName.Surface, SurfaceViewType.HorseMain],
            icon: "horse_tab1"
        },
        [JumpIdx.Xianta]: {
            openIdx: OpenIdx.Xianta,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Xianta],
            icon: "xianta_tab1"
        },
        [JumpIdx.Wing]: {
            openIdx: OpenIdx.Wing,
            viewDatas: [ModName.Role, NewRoleViewType.Wing],
            icon: "wing_tab1"
        },
        [JumpIdx.Forbidden]: {
            openIdx: OpenIdx.Forbidden,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Forbidden],
            icon: "forbidden_tab1"
        },
        [JumpIdx.Xiandan]: {
            openIdx: OpenIdx.Xiandan,
            viewDatas: [ModName.Xianlu, XianluViewType.XianluMain, XianluMainBtnType.Xiandan],
            icon: "xiandan_tab1"
        },
        [JumpIdx.Strength]: {
            openIdx: OpenIdx.Strength,
            viewDatas: [ModName.Enhance, EnhanceViewType.StrengthMain, EnhanceMainBtnType.BtnStrength],
            icon: "ui_tab_strength_1"
        },
        [JumpIdx.Advanced]: {
            openIdx: OpenIdx.Advanced,
            viewDatas: [ModName.Enhance, EnhanceViewType.StrengthMain, EnhanceMainBtnType.BtnAdvanced],
            icon: "ui_tab_advanced_1"
        },
        [JumpIdx.Gem]: {
            openIdx: OpenIdx.Gem,
            viewDatas: [ModName.Enhance, EnhanceViewType.StrengthMain, EnhanceMainBtnType.BtnGem],
            icon: "ui_tab_gem_1"
        },
        [JumpIdx.SuitType1]: {
            openIdx: OpenIdx.SuitType1,
            viewDatas: [ModName.Role, NewRoleViewType.SuitMain],
            icon: "cangtianbiaoqiantubiao1"
        },
        [JumpIdx.BagMelt]: {
            openIdx: OpenIdx.BagMelt,
            viewDatas: [ModName.Bag, BagViewType.BagMain, BagMainBtnType.Melt], icon: "melt_tab1"
        },
        [JumpIdx.Yuanling]: {
            openIdx: OpenIdx.Yuanling,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.YuanLing],
            icon: "yuanlingshilian_tab1"
        },
        [JumpIdx.Store]: {
            openIdx: OpenIdx.Store,
            viewDatas: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn1],
            icon: "cangbaogetubiao1"
        },
        [JumpIdx.WonderfulAct1]: {
            openIdx: OpenIdx.WonderfulAct1,
            viewDatas: [ModName.Activity, MainActivityViewType.WonderfulAct, WonderfulActMainBtnType.Btn2],
            icon: "xiannvsonglibiaoqiantubiao1"
        },
        [JumpIdx.Summon]: {
            openIdx: OpenIdx.Summon,
            viewDatas: [ModName.Activity, MainActivityViewType.SummonMain],
            icon: "zhaohuanbiaoqiantubiao1"
        },
        [JumpIdx.Fuchenlinghu]: {
            openIdx: OpenIdx.Fuchenlinghu,
            viewDatas: [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu],
            icon: "fuchenlinghubiaoqiantubiao1"
        },
        [JumpIdx.Linghujingling]: {
            openIdx: OpenIdx.Fuchenlinghu,
            viewDatas: [ModName.Activity, MainActivityViewType.FuchenlinghuXianling],
            layer: JumpViewType.Third
        },
        [JumpIdx.Daily]: {
            openIdx: OpenIdx.Daily,
            viewDatas: [ModName.Daily, DailyViewType.DailyMain, DailyMainBtnType.BtnLiveness],
            icon: "ui_tab_liveness_1"
        },
        [JumpIdx.Amass]: {
            openIdx: OpenIdx.Amass,
            viewDatas: [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType02],
            icon: "amass_tab1"
        },
        [JumpIdx.Amass2]: {
            openIdx: OpenIdx.Amass2,
            viewDatas: [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType03],
            icon: "amass_tab21"
        },
        [JumpIdx.Consecrate]: {
            openIdx: OpenIdx.Consecrate,
            viewDatas: [ModName.Consecrate, ConsecrateViewType.Consecrate, MdrTabBtnType.TabBtnType01],
            icon: "gongfengbiaoqiandubiao1"
        },
        [JumpIdx.Chat]: {
            openIdx: OpenIdx.Chat,
            viewDatas: [ModName.Chat, ChatViewType.ChatMain, ChatMainBtnType.Cross],
            icon: "chat_tab1_1"
        },
        [JumpIdx.SignGift]: {
            openIdx: OpenIdx.SignGift,
            viewDatas: [ModName.Activity, MainActivityViewType.SignGift]
        },
        [JumpIdx.Union]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionIn],
            icon: "xianzongliebiaobiaoqiantubiao1"
        },
        [JumpIdx.Tianshen]: {
            openIdx: OpenIdx.Tianshen,
            viewDatas: [ModName.Surface, SurfaceViewType.TianshenMain],
            icon: "yuanling_tab1"
        },
        [JumpIdx.Xianjian]: {
            openIdx: OpenIdx.Xianjian,
            viewDatas: [ModName.Surface, SurfaceViewType.Xianjian],
            icon: "xianjiantubiao1"
        },
        [JumpIdx.RoleRing]: {
            openIdx: OpenIdx.RoleRing,
            viewDatas: [ModName.Activity, MainActivityViewType.RoleRingMain], icon: "rolering_tab1"
        },
        [JumpIdx.Friend]: {
            openIdx: OpenIdx.Friend,
            viewDatas: [ModName.Friend, FriendViewType.FriendMain],
            icon: "friend_tab1"
        },
        [JumpIdx.FirstCharge]: {
            openIdx: OpenIdx.FirstCharge,
            viewDatas: [ModName.Activity, MainActivityViewType.FirstCharge],
            icon: "shouchong",
            layer: JumpViewType.Third
        },
        [JumpIdx.Lingchi]: {
            openIdx: OpenIdx.Lingchi,
            viewDatas: [ModName.Xianlu, XianluViewType.XianluMain, XianluMainBtnType.Lingchi],
            icon: "lingchi_tab1"
        },
        [JumpIdx.Yaojijiangshi]: {
            openIdx: OpenIdx.Yaojijiangshi,
            viewDatas: [ModName.Activity, MainActivityViewType.YjjsFirstMain],
            icon: "yaojijiangshibiaoqiantubiao1"
        },
        [JumpIdx.Yaojijiangshi2]: {
            openIdx: OpenIdx.Yaojijiangshi,
            viewDatas: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn2],
            icon: "sanshiweijibiaoqiantubiao1"
        },
        [JumpIdx.Yaojijiangshi3]: {
            openIdx: OpenIdx.Yaojijiangshi,
            viewDatas: [ModName.Activity, MainActivityViewType.YjjsMain, YjjsMainBtnType.Btn3],
            icon: "shenqixiuxingbiaoqiantubiao1"
        },
        [JumpIdx.VIP]: {viewDatas: [ModName.Vip, VipViewType.VipMain], icon: "VIPbiaoqiantubiao1"},
        [JumpIdx.VipPrivilege]: {viewDatas: [ModName.Vip, VipViewType.VipMain, VipMainBtnType.VipPrivilege]},
        [JumpIdx.PrerogativeWrit]: {
            openIdx: OpenIdx.PrerogativeWrit,
            viewDatas: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02],
            icon: "tequanlingtubiao1"
        },
        [JumpIdx.WorldMap]: {
            openIdx: OpenIdx.WorldMap,
            viewDatas: [ModName.Pass, PassViewType.PassMain, PassMainBtnType.WorldMap],
            icon: "ui_tab_worldmap_1"
        },
        [JumpIdx.StoreXianyu]: {
            openIdx: OpenIdx.StoreXianyu,
            viewDatas: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn2],
            icon: "xianyushangchengtubiao1"
        },
        [JumpIdx.KillBoss]: {
            openIdx: OpenIdx.KillBoss,
            viewDatas: [ModName.Activity, MainActivityViewType.KillBoss],
            icon: "1zhuan1"
        },
        [JumpIdx.PersonalBoss]: {
            openIdx: OpenIdx.PersonalBoss,
            viewDatas: [ModName.Boss, BossViewType.BossMain, BossMainBtnType.Personal],
            icon: "personal_tab1"
        },
        [JumpIdx.Abyss]: {
            openIdx: OpenIdx.Abyss,
            viewDatas: [ModName.Boss, BossViewType.BossMain, BossMainBtnType.Abyss],
            icon: "zhuimoshenyuanbiaoqiantubiao1"
        },
        [JumpIdx.Yijie]: {
            openIdx: OpenIdx.Yijie,
            viewDatas: [ModName.Yijie, YijieViewType.YijieMain, YijieMainBtnType.Yijie],
            icon: "yijie_tab1"
        },
        [JumpIdx.YonghengYijie]: {
            openIdx: OpenIdx.YonghengYijie,
            viewDatas: [ModName.Yijie, YijieViewType.YijieMain, YijieMainBtnType.YonghengYijie],
            icon: "yonghengyijie_tab1"
        },
        [JumpIdx.VipBoos]: {
            openIdx: OpenIdx.VipBoss,
            viewDatas: [ModName.Boss, BossViewType.BossMain, BossMainBtnType.Vip], icon: "vip_tab1"
        },
        [JumpIdx.StoreDaily]: {
            openIdx: OpenIdx.StoreDaily,
            viewDatas: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn3],
            icon: "meirishangchengtubiao1"
        },
        [JumpIdx.StoreWeek]: {
            openIdx: OpenIdx.StoreDaily,
            viewDatas: [ModName.Store, StoreViewType.StoreMain, StoreMainBtnType.Btn4],
            icon: "meizhoushangchengtubiao1"
        },
        [JumpIdx.ExchangeType1]: {
            openIdx: OpenIdx.ExchangeType1,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type1}`],
            icon: "shop_type21"
        },
        [JumpIdx.ExchangeType2]: {
            openIdx: OpenIdx.ExchangeType2,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type2}`],
            icon: "shop_type31"
        },
        [JumpIdx.ExchangeType3]: {
            openIdx: OpenIdx.ExchangeType3,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type3}`],
            icon: "shop_type41"
        },
        [JumpIdx.ExchangeType4]: {
            openIdx: OpenIdx.ExchangeType4,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type4}`],
            icon: "shop_type51"
        },
        [JumpIdx.ExchangeType5]: {
            openIdx: OpenIdx.ExchangeType5,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type5}`],
            icon: "shop_type101"
        },
        [JumpIdx.ExchangeType6]: {
            openIdx: OpenIdx.ExchangeType6,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type6}`],
            icon: "shop_type61"
        },
        [JumpIdx.ExchangeType7]: {
            openIdx: OpenIdx.ExchangeType7,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type7}`],
            icon: "shop_type71"
        },
        [JumpIdx.ExchangeType8]: {
            openIdx: OpenIdx.ExchangeType8,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type8}`],
            icon: "shop_type81"
        },
        [JumpIdx.ExchangeType9]: {
            openIdx: OpenIdx.ExchangeType9,
            viewDatas: [ModName.Activity, MainActivityViewType.ExchangeShop, `0${ExchangeShopType.Type9}`],
            icon: "shop_type91"
        },
        [JumpIdx.Zhaocaixian]: {
            openIdx: OpenIdx.Zhaocaixian,
            viewDatas: [ModName.Activity, MainActivityViewType.ZcxMain],
            icon: "xingyunshuzibiaoqiantubiao1"
        },
        [JumpIdx.Chuangguanling]: {
            openIdx: OpenIdx.Giving,
            viewDatas: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType01],
            icon: "tab_1_giving1"
        },
        [JumpIdx.Huoyueling]: {
            openIdx: OpenIdx.Giving,
            viewDatas: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType02],
            icon: "tab_2_giving1"
        },
        [JumpIdx.Xiuxianling]: {
            openIdx: OpenIdx.Giving,
            viewDatas: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType04],
            icon: "tab_4_giving1"
        },
        [JumpIdx.ZeroBuy]: {
            openIdx: OpenIdx.ZeroBuy,
            viewDatas: [ModName.Activity, MainActivityViewType.ZeroBuy],
            layer: JumpViewType.Third
        },
        [JumpIdx.Doufa]: {
            openIdx: OpenIdx.Doufa,
            viewDatas: [ModName.Compete, CompeteViewType.DoufaMain], icon: "doufa_tab1"
        },
        [JumpIdx.Weapon]: {
            openIdx: OpenIdx.Weapon,
            viewDatas: [ModName.Role, NewRoleViewType.Weapon],
            icon: "weapon_tab1"
        },
        [JumpIdx.PunshList]: {
            openIdx: OpenIdx.PunshList,
            viewDatas: [ModName.Activity, MainActivityViewType.PunshList, MdrTabBtnType.TabBtnType02],
            icon: "chongbangtehui1"
        },
        [JumpIdx.PrerogativeWrit2]: {
            openIdx: OpenIdx.PrerogativeWrit,
            viewDatas: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02, MdrTabBtnType.TabBtnType01],
            icon: "tequanlingtubiao1"
        },
        [JumpIdx.PrerogativeWrit3]: {
            openIdx: OpenIdx.PrerogativeWrit,
            viewDatas: [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02, MdrTabBtnType.TabBtnType02],
            icon: "tequanlingtubiao1"
        },
        [JumpIdx.BagDel]: {
            openIdx: OpenIdx.BagDel,
            viewDatas: [ModName.Bag, BagViewType.BagMain, BagMainBtnType.Del], icon: "del_tab1"
        },
        [JumpIdx.Xianlv]: {
            openIdx: OpenIdx.Xianlv,
            viewDatas: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv],
            icon: "xianlvbiaoqiantubiao1"
        },
        [JumpIdx.XianlvRenwu]: {
            openIdx: OpenIdx.XianlvRenwu,
            viewDatas: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Renwu],
            icon: "renwubiaoqiantubiao1"
        }, [JumpIdx.XianlvShilian]: {
            openIdx: OpenIdx.XianlvShilian,
            viewDatas: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Shilian],
            icon: "shilianbiaoqiantubiao1"
        }, [JumpIdx.XianlvChild]: {
            openIdx: OpenIdx.XianlvChild,
            viewDatas: [ModName.Xianyuan, XianyuanViewType.ChildMain],
            icon: "gongxiangbiaoqiantubiao1"
        },
        [JumpIdx.HorseGitf]: {
            openIdx: OpenIdx.Horse,
            viewDatas: [ModName.Surface, SurfaceViewType.SurfaceGiftMain, ConfigHead.Horse + ''],
            icon: "horse_tab1"
        },
        [JumpIdx.TianshenGift]: {
            openIdx: OpenIdx.Tianshen,
            viewDatas: [ModName.Surface, SurfaceViewType.SurfaceGiftMain, ConfigHead.Tianshen + ''],
            icon: "yuanling_tab1"
        },
        [JumpIdx.WingGift]: {
            openIdx: OpenIdx.Wing,
            viewDatas: [ModName.Surface, SurfaceViewType.SurfaceGiftMain, ConfigHead.Wing + ''],
            icon: "wing_tab1"
        },
        [JumpIdx.WeaponGift]: {
            openIdx: OpenIdx.Weapon,
            viewDatas: [ModName.Surface, SurfaceViewType.SurfaceGiftMain, ConfigHead.Weapon + ''],
            icon: "weapon_tab1"
        },
        [JumpIdx.XianlvRing]: {
            openIdx: OpenIdx.XianlvRing,
            viewDatas: [ModName.Gift, GiftViewType.Main, GiftType.Ring + ""]
        },
        [JumpIdx.HuangGuForbidden]: {
            openIdx: OpenIdx.Forbidden,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Forbidden, ForbiddenType.Type2 + ""],
            icon: "forbidden_tab1"
        },
        [JumpIdx.XianLingForbidden]: {
            openIdx: OpenIdx.Forbidden,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Forbidden, ForbiddenType.Type3 + ""],
            icon: "forbidden_tab1"
        },
        [JumpIdx.TianZhiForbidden]: {
            openIdx: OpenIdx.Forbidden,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Forbidden, ForbiddenType.Type4 + ""],
            icon: "forbidden_tab1"
        },
        [JumpIdx.Xianta2]: {
            openIdx: OpenIdx.Xianta2,
            viewDatas: [ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.Xianta, MdrTabBtnType.TabBtnType02],
            icon: "xianta_tab1"
        },
        [JumpIdx.UnionJuanXian]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionDonate],
            layer: JumpViewType.SecondPop
        },
        [JumpIdx.UnionWage]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionWage],
            layer: JumpViewType.SecondPop
        },
        [JumpIdx.XianMengTianTan]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionLottery, MdrTabBtnType.TabBtnType01],
            icon: "xianmentiantanbiaoqiantubiao1"
        },
        [JumpIdx.UnionTreasure]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionTreasure],
            icon: "xianzongyibao1"
        },
        [JumpIdx.UnionStorage]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionStorage],
            icon: "xianzongcangkubiaoqiantubiao1"
        },
        [JumpIdx.UnionHeroShop]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionHeroShop],
            icon: "xianzinmibaobiaoqiantubiao1"
        },
        [JumpIdx.UnionBeast]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionBeast],
            icon: "xianshouzhufubiaoqiantubiao1"
        },
        [JumpIdx.UnionBook]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionBook],
            icon: "diyicengbiaoqiantubiao1"
        },
        [JumpIdx.XianMengShengTan]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionLottery, MdrTabBtnType.TabBtnType02],
            icon: "xianmenshengtanbiaoqiantubiao1"
        },
        [JumpIdx.RoleRing2]: {
            openIdx: OpenIdx.RoleRing,
            viewDatas: [ModName.Activity, MainActivityViewType.RoleRingMain, PrivilegeMainBtnType.BtnMonth, MdrTabBtnType.TabBtnType02],
            icon: "rolering_tab1"
        },
        [JumpIdx.RoleRing3]: {
            openIdx: OpenIdx.RoleRing,
            viewDatas: [ModName.Activity, MainActivityViewType.RoleRingMain, PrivilegeMainBtnType.BtnMonth, MdrTabBtnType.TabBtnType03],
            icon: "rolering_tab1"
        },
        [JumpIdx.Bossgift]: {
            openIdx: OpenIdx.Boss,
            viewDatas: [ModName.Pay, PayViewType.Gift, ProductId.Id100013 + ""],
            layer: JumpViewType.Third
        },
        [JumpIdx.Yijiegift]: {
            openIdx: OpenIdx.Yijie,
            viewDatas: [ModName.Pay, PayViewType.Gift, ProductId.Id100014 + ""],
            layer: JumpViewType.Third
        },
        [JumpIdx.Shiliangift]: {
            openIdx: OpenIdx.Shilian,
            viewDatas: [ModName.Pay, PayViewType.Gift, ProductId.Id100010 + ""],
            layer: JumpViewType.Third
        },
        [JumpIdx.Fuben2gift]: {
            openIdx: OpenIdx.Fuben2,
            viewDatas: [ModName.Pay, PayViewType.Gift, ProductId.Id100011 + ""],
            layer: JumpViewType.Third
        },
        [JumpIdx.Fuben3gift]: {
            openIdx: OpenIdx.Fuben3,
            viewDatas: [ModName.Pay, PayViewType.Gift, ProductId.Id100012 + ""],
            layer: JumpViewType.Third
        },
        [JumpIdx.Fuben4gift]: {
            openIdx: OpenIdx.Yuanling,
            viewDatas: [ModName.Gift, GiftViewType.Main, GiftType.Yuanling + ''],
            icon: "mubiaofanlibiaoqiantubiao1"
        },
        [JumpIdx.Youligift]: {
            openIdx: OpenIdx.Youli,
            viewDatas: [ModName.Compete, CompeteViewType.YouliAwardMain],
            icon: "youli_award_tab1"
        },
        [JumpIdx.XianYuanGift]: {
            openIdx: OpenIdx.XianlvGift,
            viewDatas: [ModName.Activity, MainActivityViewType.XianlvGift],
            layer: JumpViewType.Third
        },
        [JumpIdx.Tiandilu]: {
            openIdx: OpenIdx.Tiandilu,
            viewDatas: [ModName.God, GodViewType.GodMain, MdrTabBtnType.TabBtnType02],
            icon: "tiandilubiaoqiantubiao1"
        },
        [JumpIdx.Tiandiluxuanyuan]: {
            openIdx: OpenIdx.Tiandilu,
            viewDatas: [ModName.God, GodViewType.GodTreasure],
            icon: "xuanyuandikubiaoqiantubiao1"
        },
        [JumpIdx.SupremeGit]: {
            openIdx: OpenIdx.SupremeGit,
            viewDatas: [ModName.Activity, MainActivityViewType.SupremeGitMain],
            icon: "zhizun_tab1"
        },
        [JumpIdx.Shenlingjiban]: {
            openIdx: OpenIdx.Shenling,
            viewDatas: [ModName.Jiban, JibanViewType.JibanMain, JibanMainBtnType.ShenLing],
            icon: "shenlingbiaoqiantubiao1"
        },
        [JumpIdx.Huashen]: {
            openIdx: OpenIdx.Huashen,
            viewDatas: [ModName.More, MoreViewType.HuashenMain],
            icon: "huashen_tab1"
        },
        [JumpIdx.Huashenzhilu]: {
            openIdx: OpenIdx.Huashen,
            viewDatas: [ModName.More, MoreViewType.HuashenZhilu], layer: JumpViewType.SecondPop
        },
        [JumpIdx.Achieve]: {
            openIdx: OpenIdx.Achieve,
            viewDatas: [ModName.More, MoreViewType.AchieveMain, AchieveMainBtnType.Achieve],
            icon: "achieve_tab1"
        },
        [JumpIdx.Lottery]: {
            openIdx: OpenIdx.Lottery,
            viewDatas: [ModName.Activity, MainActivityViewType.Lottery],
            icon: "icon_lottery1"
        },
        [JumpIdx.UnionKill]: {
            openIdx: OpenIdx.Union,
            viewDatas: [ModName.Union, UnionMainType.UnionKill],
            icon: "zhanyaotai1"
        },
        [JumpIdx.Zhandui]: {
            openIdx: OpenIdx.Zhandui,
            viewDatas: [ModName.More, MoreViewType.ZhanduiBuildMain],
            icon: "xiuxian_tab1"
        },
        [JumpIdx.Zhandui1]: {
            openIdx: OpenIdx.Zhandui,
            viewDatas: [ModName.More, MoreViewType.ZhanduiJoin],
            layer: JumpViewType.SecondPop
        },
        [JumpIdx.HorseStar]: {
            openIdx: OpenIdx.Horse,
            viewDatas: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.HorseStar],
            icon: "huanhua_tab1"
        },
        [JumpIdx.TianshenStar]: {
            openIdx: OpenIdx.Tianshen,
            viewDatas: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.TianshenStar],
            icon: "huanhua_tab1"
        },
        [JumpIdx.WingStar]: {
            openIdx: OpenIdx.Wing,
            viewDatas: [ModName.Role, NewRoleViewType.Wing, WingMainBtnType.WingStar],
            icon: "huanhua_tab1"
        },
        [JumpIdx.WeaponStar]: {
            openIdx: OpenIdx.Weapon,
            viewDatas: [ModName.Role, NewRoleViewType.Weapon, WeaponMainBtnType.WeaponStar],
            icon: "huanhua_tab1"
        },
        [JumpIdx.HuashenStar]: {
            openIdx: OpenIdx.Huashen,
            viewDatas: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenStar],
            icon: "huashen_task_tab1"
        },
        [JumpIdx.Sea1]: {
            openIdx: OpenIdx.Sea1,
            viewDatas: [ModName.Yijie, YijieViewType.SeaBossMain, SeaMainBtnType.Sea1],
            layer: JumpViewType.Main,
            icon: "sea_boss_tab3_1"
        },
        [JumpIdx.Sea2]: {
            openIdx: OpenIdx.Sea2,
            viewDatas: [ModName.Yijie, YijieViewType.SeaBossMain, SeaMainBtnType.Sea2],
            layer: JumpViewType.Main,
            icon: "sea_boss_tab3_1"
        },
        [JumpIdx.Sea3]: {
            openIdx: OpenIdx.Sea3,
            viewDatas: [ModName.Yijie, YijieViewType.SeaBossMain, SeaMainBtnType.Sea3],
            layer: JumpViewType.Main,
            icon: "sea_boss_tab3_1"
        },
        [JumpIdx.XujieJitan]: {
            openIdx: OpenIdx.XujieJitan,
            viewDatas: [ModName.More, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn1],
            icon: "xujiejitanbiaoqiantubiao1"
        },
        [JumpIdx.XujieTansuo]: {
            openIdx: OpenIdx.XujieTansuo,
            viewDatas: [ModName.More, MoreViewType.XujieTansuoMain, XujieTansuoMainBtnType.Btn1],
            icon: "xujietansuo_tab1"
        },
        [JumpIdx.XujieKuangmai]: {
            openIdx: OpenIdx.XujieKuangmai,
            viewDatas: [ModName.More, MoreViewType.MiningMain, MdrTabBtnType.TabBtnType02],
            icon: "shengxubiaoqiantubiao1"
        },
        [JumpIdx.KuafuDoufa]: {
            openIdx: OpenIdx.KuafuDoufa,
            viewDatas: [ModName.Compete, CompeteViewType.DoufaMain, CompeteMainBtnType.KuafuDoufa],
            icon: "kuafu_doufa_tab1"
        },
        [JumpIdx.Xiandi]: {
            openIdx: OpenIdx.Xiandi,
            viewDatas: [ModName.More, MoreViewType.Xiandi],
            icon: "xiandi_huanggutiangong1"
        },
        [JumpIdx.XianmaiZhengduo]: {
            openIdx: OpenIdx.XianmaiZhengduo,
            viewDatas: [ModName.More, MoreViewType.XianmaiMain],
            icon: "XianmaiMain"
        },
        [JumpIdx.ZuoqiGift]: {
            openIdx: OpenIdx.Horse,
            viewDatas: [ModName.Surface, SurfaceViewType.SurfaceGiftMain, ConfigHead.Horse + ''],
            icon: 'horse_tab1'
        },
        [JumpIdx.Qiyuan]: {
            openIdx: OpenIdx.Qiyuan,
            viewDatas: [ModName.Pass, PassViewType.PassMain, PassMainBtnType.Qiyuan],
            icon: 'ui_tab_qiyuan_1'
        },
        [JumpIdx.XianLvJinJie]: {
            openIdx: OpenIdx.XianLvJinJie,
            viewDatas: [ModName.Gift, GiftViewType.Main, GiftType.XianLvJinJie + ""]
        },
        [JumpIdx.Huanjing]: {
            openIdx: OpenIdx.Huanjing,
            viewDatas: [ModName.More, MoreViewType.HuanjingMain],
            icon: 'huanjingbiaoqiantubiao1'
        },
        [JumpIdx.Huanggu]: {
            openIdx: OpenIdx.Huanggu,
            viewDatas: [ModName.More, MoreViewType.XiandiShow],
            icon: 'xiandi_huanggutiangong1'
        },
        [JumpIdx.Goddess]: {
            openIdx: OpenIdx.Goddess,
            viewDatas: [ModName.More, MoreViewType.GoddessMain],
            icon: 'goddess_tab1'
        },
        [JumpIdx.GoddessRecord]: {
            openIdx: OpenIdx.GoddessRecord,
            viewDatas: [ModName.More, MoreViewType.TimeGoddessMain],
            icon: 'timeGoddess_tab1'
        }
    };

    /**飞升榜进阶丹映射跳转ID,todo*/
    export const FlyPropToJumpIdx = {
        [PropIndex.Zuoqijinjiedan]: JumpIdx.Horse,//坐骑进阶丹
        [PropIndex.Yuyijinjiedan]: JumpIdx.Wing,//羽翼进阶丹
        [PropIndex.Shenbinjiedan]: JumpIdx.Weapon,//神兵进阶丹
        [PropIndex.Yuanlingjinjiedan]: JumpIdx.Tianshen,//元灵进阶丹
        [PropIndex.Xianjianjinjiedan]: JumpIdx.Xianjian//仙剑初级锻炼石
    };
    /**外显炼神丹映射跳转ID,todo*/
    export const LianshendanToJumpIdx = {
        [PropSubType17.Horse]: JumpIdx.HorseStar,
        [PropSubType17.Tianshen]: JumpIdx.TianshenStar,
        [PropSubType17.Wing]: JumpIdx.WingStar,
        [PropSubType17.Weapon]: JumpIdx.WeaponStar,
        [PropSubType17.Body]: JumpIdx.Body,
        [PropSubType17.Huashen]: JumpIdx.HuashenStar,
    };
}
