namespace game {


    export const enum ActivityEvent {
        ON_ACTIVITY_INIT = "on_activity_init",//中控活动初始化
        ON_ACTIVITY_UPDATE = "on_activity_update",//更新，会携带活动ID数组
        ON_ACTIVITY_CLOSE = "on_activity_close",//删除，会携带活动ID
        ON_ACTIVITY_UPDATE_BY_TYPE = "on_activity_update_by_type",//变更发送，更新和删除都会触发，会携带活动类型数组
        ON_ACTIVITY_ENTRANCE_UPDATE = "on_activity_entrance_update",//会携带ActivityPosType列表
        ON_ACTIVITY_SEL_TAB = "on_activity_sel_tab", /**更新ActMainMdr分页选中，传进来的参数是活动类型ActivityType*/
        ON_GET_OPER_ACT_LIST = "on_get_oper_act_list",

        ON_ACTIVITY_ICON_ADD = "on_activity_icon_add",//图标追加
        ON_ACTIVITY_ICON_DEL = "on_activity_icon_del",//图标删除
        ON_ACTIVITY_ICON_UPDATE = "on_activity_icon_update",//图标刷新
        ON_ACTIVITY_ICON_DELETE = "ON_ACTIVITY_ICON_DELETE",//图标删除
        ON_ACTIVITY_ICON_HINT = "on_activity_icon_hint",//图标红点
        ON_ACTIVITY_ICON_SHOW = "on_activity_icon_show",//图标显示
        ON_ACTIVITY_ICON_HIDE = "on_activity_icon_hide",//图标隐藏，会携带活动ID
        ON_ACTIVITY_ICON_TIPS_HIDE = "on_activity_icon_tips_hide",//图标提示弹窗隐藏

        /**战力转盘 */
        ON_OPEN_LOTTERY_TWEEN = "on_open_lottery_tween",//开启抽奖动画
        ON_UPDATE_LOTTERY_INFO = "on_update_lottery_info",
        /**战力转盘 */

        /**召唤系统 */
        ON_UPDATE_RANK = "on_update_rank",//更新排行榜数据
        ON_UPDATE_FENGYUN_LIST = "on_update_fengyun_list",//更新风云录数据
        ON_UPDATE_EXCHANGE = "on_update_exchange",//更新礼券兑换数据
        ON_UPDATE_SUMMON = "on_update_summon",//更新召唤界面
        ON_UPDATE_SUMMON_TWEEN = "on_update_summon_tween",//更新召唤界面用于再次抽奖
        ON_UPDATE_SUMMON_TWEEN_OVER = "on_update_summon_tween_over",//召唤翻牌结束
        ON_UPDATE_SUMMON_OVER = "on_update_summon_over",//召唤结束
        ON_UPDATE_SUMMON_SHAKE = "on_update_summon_shake",//召唤抖动
        ON_UPDATE_SUMMON_GIFT = "on_update_summon_gift",//更新命运豪礼
        /**召唤系统 */

        /**赠送100召唤卷 */
        ON_UPDATE_GIVING_MAIN_TAB = "on_update_giving_main_tab",//更新活动首页页签（切换/关闭）
        ON_UPDATE_GIVING_LIST = "on_update_giving_list",//更新列表
        /**赠送100召唤卷 */

        /**签到有礼*/
        ON_UPDATE_SIGN_GIFT_INFO = "on_update_sign_gift_info",

        /**招财仙系统*/
        ON_ZCX_LUCK_NUM_UPDATE = "on_zcx_luck_num_update",
        ON_ZCX_COINS_BANK_UPDATE = "on_zcx_coins_bank_update",
        ON_ZCX_EXCHANGE_UPDATE = "on_zcx_exchange_update",
        ON_ZCX_RAID_INFO_UPDATE = "on_zcx_raid_info_update",
        ON_ZCX_FUND_UPDATE = "on_zcx_fund_update",
        ON_ZCX_FUND_BOX_SHOW = "on_zcx_fund_box_show",
        ON_ZCX_FUND_REWARD_SHOW = "on_zcx_fund_reward_show",

        /**购买按钮组件抛出购买次数*/
        ON_BTN_BUY_CNT_POST = "on_btn_buy_cnt_post",

        /**主角光环*/
        ON_ROLE_RING_UPDATE = "on_role_ring_update",

        /**0元购 */
        ON_UPDATE_ZERO_BUY_INFO = "on_update_zero_buy_info",

        /**首充豪礼 */
        ON_UPDATE_FIRST_RECHARGE_INFO = "on_update_first_recharge_info",

        /**斩妖福利 */
        ON_UPDATE_KILLBOSS_INFO = "on_update_killboss_info",
        ON_UPDATE_KILLBOSS_SELECT_INDEX = "on_update_killboss_select_index",

        /**瑶姬降世*/
        ON_YJJS_SANSHENG_INFO_UPDATE = "on_yjjs_sansheng_info_update",
        ON_YJJS_SANSHI_INFO_UPDATE = "on_yjjs_sanshi_info_update",
        ON_YJJS_SHENQI_INFO_UPDATE = "on_yjjs_shenqi_info_update",
        ON_YJJS_BAOKU_INFO_UPDATE = "on_yjjs_baoku_info_update",
        ON_YJJS_CHARGE_INFO_UPDATE = "on_yjjs_charge_info_update",
        ON_YJJS_HAOLI_INFO_UPDATE = "on_yjjs_haoli_info_update",
        ON_YJJS_LING_INFO_UPDATE = "on_yjjs_ling_info_update",

        /**兑换商场 */
        ON_UPDATE_EXCHANGE_SHOP_INFO = "on_update_exchange_shop_info",

        /**赠送瑶姬 */
        ON_UPDATE_GIVING_SHENLING_INFO = "on_update_givingshenling_info",
        /**特权令*/
        ON_UPDATE_PREROGATIVE_WRIT_INFO = "on_update_prerogative_writ_info",
        /**精彩活动*/
        ON_UPDATE_WONDERFUL_ACT_XIANNV_GIFT = "on_update_wonderful_act_xiannv_gift",
        ON_UPDATE_WONDERFUL_ACT_CANGZHENGE = "on_update_wonderful_act_cangzhenge",
        ON_UPDATE_WONDERFUL_ACT_KEEPCHARGE = "on_update_wonderful_act_keepcharge",
        ON_UPDATE_WONDERFUL_ACT_ADDCHARGE = "on_update_wonderful_act_addcharge",
        ON_UPDATE_WONDERFUL_ACT_LOGIN = "on_update_wonderful_act_login",
        ON_UPDATE_WONDERFUL_ACT_6 = "on_update_wonderful_act_6",

        /**浴火重生 */
        ON_UPDATE_YHCS_INFO = "on_update_yhcs_info",
        /**仙侣礼包*/
        ON_UPDATE_XIANLV_GIFT = "on_update_xianlv_gift",

        /**成神在即*/
        ON_UPDATE_CHENGSHEN_REWARD = "on_update_chengshen_reward",
        ON_CLOSE_CHENGSHEN = "on_close_chengshen",//活动结束后关闭界面

        /**每日特惠*/
        ON_UDPATE_MEIRI_TEHUI_INFO = "on_update_meiri_tehui_info",

        /**至尊礼包*/
        ON_UDPATE_ZHIZUN_GIFT_INFO = "on_update_zhizun_gift_info",

        /**通天阁*/
        ON_UPDATE_TONGTIANGE_INFO = "on_update_tongtiange_info",
        ON_UPDATE_TONGTIANGE_GIFT_INFO = "on_update_tongtiange_gift_info",
        ON_UPDATE_TONGTIANGE_LOGIN_INFO = "on_update_tongtiange_login_info",
        ON_UPDATE_TONGTIANGE_EXCHANGE_INFO = "on_update_tongtiange_exchange_info",
        ON_UPDATE_TONGTIANGE_GUILD_CHALLENGE_INFO = "on_update_tongtiange_guild_challenge_info",
        ON_UPDATE_TONGTIANGE_CHALLENGE_INFO = "on_update_tongtiange_challenge_info",
        ON_UPDATE_TONGTIANGE_BUILD_SUCCESS = "on_update_tongtiange_build_success",
        ON_UPDATE_TONGTIANGE_RANK_INFO = "on_update_tongtiange_rank_info",
        ON_UPDATE_TONGTIANGE_STOREY_INFO = "on_update_tongtiange_storey_info",
        ON_UPDATE_TONGTIANGE_LAST_RANK_INFO = "on_update_tongtiange_last_rank_info",

        /**新服冲榜 */
        ON_UPDATE_PUNSHLIST_INFO = "on_update_punshlist_info",
        ON_UPDATE_PUNSHLIST_TYPE = "on_update_punshlist_type",

        ON_FLY_RANK_UPDATE = "on_fly_rank_update",//飞升榜刷新
        ON_FLY_RANK_UPDATE_LAST_RANK = "on_fly_rank_update_last_rank",//飞升榜上期排名
        ON_FLY_RANK_UPDATE_GIFT = "on_fly_rank_update_gift",//飞升礼包刷新
        ON_FLY_RANK_UPDATE_REBATE = "on_fly_rank_update_rebate",//飞升返利刷新
        ON_FLY_RANK_UPDATE_WAR = "on_fly_rank_update_war",//飞升令刷新

        ON_SHENLING_GIFT_INFO_UPDATE = "on_shenling_gift_info_update",

        /**仙池祈愿*/
        ON_UPDATE_XIANCHI_INFO = "on_update_xianchi_info",

        /**特惠礼包 */
        ON_UPDATE_TEHUI_LIBAO_INFO = "on_update_tehui_libao_info",
        /**飞升礼包*/
        ON_UPDATE_FEISHENGLIBAO_INFO = "on_update_feishenglibao_info",

        /**天女赐福*/
        ON_UPDATE_TIANNV_WELFARE_INFO = "on_update_tiannv_welfare_info",
        /**VIP5福利*/
        ON_UPDATE_VIP_WELFARE_INFO = "on_update_vip_welfare_info",
        ON_WONDERFUL_ACT_CLOSE = "on_wonderful_act_close",//精彩活动关闭，会携带BtnType
        /**财运榜*/
        ON_CAIYUNBANG_QIFU_INFO_UPDATE = "on_caiyunbang_qifu_info_update",
        ON_CAIYUNBANG_LEICHONG_INFO_UPDATE = "on_caiyunbang_leichong_info_update",
        ON_CAIYUNBANG_DUIHUAN_INFO_UPDATE = "on_caiyunbang_duihuan_info_update",
        ON_CAIYUNBANG_LOGIN_INFO_UPDATE = "on_caiyunbang_login_info_update",
        ON_CAIYUNBANG_RANK_INFO_UPDATE = "on_caiyunbang_rank_info_update",

        ON_CARNIVAL_MIBAO_UPDATE = "on_carnival_mibao_update",////狂欢庆典，紫薇秘宝
        ON_CARNIVAL_GIFT_UPDATE = "on_carnival_gift_update",////狂欢庆典，召唤礼包
        ON_CARNIVAL_UPDATE = "on_carnival_update",////狂欢庆典，狂欢节
        ON_CARNIVAL_ZHAOHUAN_UPDATE = "on_carnival_zhaohuan_update",////狂欢庆典，仙宗召唤
        ON_CARNIVAL_RANK_UPDATE = "on_carnival_rank_update",//狂欢庆典，宗门排行榜刷新
        ON_CARNIVAL_RANK_UPDATE_LAST_RANK = "on_carnival_rank_update_last_rank",//狂欢庆典，宗门排行榜上期排名
        //浮尘灵壶
        ON_UPDATE_FUCHENLINGHU_INFO = "on_update_fuchenlinghu_info",
        ON_CHANGE_FUCHENLINGHU_SEATYPE = "on_change_fuchenlinghu_seatype",
    }

    /////////////////////////////////////////中控活动/////////////////////////////////////////

    //活动入口类型
    export const enum ActivityPosType {
        Top = 1,//默认顶部
        Left,//左侧入口，entrance命名规则：l_，开头
        Big,//大按钮，entrance命名规则：b_，开头
    }

    //中控活动类型枚举
    export const enum ActivityType {
        Cangzhenge = 1,//精彩活动-藏珍阁
        Lianxucharge = 2,//精彩活动-连续充值
        Leijicharge = 3,//精彩活动-累计充值
        Loginrewards = 4,//精彩活动-登陆奖励
        TongtiangeReward = 6,//通天阁奖励池
        TongtiangeRankReward = 7,//通天阁排行榜奖励
        /**以下活动可复用，支持策划配置分页*/
        FlyRank = 8,//飞升榜
        FlyGift = 9,//飞升礼包
        FlyRebate = 10,//飞升返利
        FlyWar = 11,//飞升特惠，飞升令和任务
        CaiyunbangTurntable = 12,//财运榜转盘
        CaiyunbangRank = 13,//财运榜排名
        CaiyunbangCharge = 14,//财运榜累充
        CaiyunbangExchange = 15,//财运榜兑换
        CaiyunbangLogin = 16,//财运榜登录奖励
        CarnivalGift = 17,//狂欢庆典，召唤礼包
        CarnivalMibao = 18,//狂欢庆典，紫薇秘宝
        Carnival = 19,//狂欢庆典，狂欢节
        CarnivalZhaohuan = 20,//狂欢庆典，仙宗召唤
        CarnivalCrossRank = 21,//狂欢庆典，跨服排行
        CarnivalRank = 22,//狂欢庆典，宗门排行
        CarnivalNotice = 23,//狂欢庆典预告
        //todo：需要注意的
    }

    /**需要显示时间的中控活动类型，todo：需要注意的*/
    export const NeedShowTimeAct: { [type: number]: boolean } = {
        [ActivityType.FlyRank]: true,
        [ActivityType.FlyGift]: true,
        [ActivityType.FlyRebate]: true
    };

    /**中控活动标签命名规则，todo：需要注意的*/
    export const ActivityTabName: string = "activity_tab_";//ActivityTabName + ActivityType + _，如：activity_tab_8_1

    /**------------------新增-------------------*/

    /**用于单抽和十连、百抽 */
    export const enum CommonCountType {
        /**单抽 */
        Once = 1,
        /**十连 */
        Ten = 2,
        /**百抽 */
        Hund = 3,
    }

    /**
     * 中控活动：后台中控用活动ID做标识
     * 非中控：对应功能开启表id
     */
    export const enum BtnIconId {
        PowerTurntable = OpenIdx.Lottery,//战力转盘
        Store = OpenIdx.StoreXianyu,
        Summon = OpenIdx.Summon,
        SignGift = OpenIdx.SignGift,
        Giving = OpenIdx.Giving,
        RoleRing = OpenIdx.RoleRing,
        ZeroBuy = OpenIdx.ZeroBuy,
        FirstCharge = OpenIdx.FirstCharge,
        Zcx = OpenIdx.Zhaocaixian,
        KillBoss = OpenIdx.KillBoss,
        Yjjs = OpenIdx.Yaojijiangshi, //瑶姬降世
        GivingShenLing = OpenIdx.GivingShenLing,//赠送瑶姬
        ExchangeShop = OpenIdx.ExchangeShop,//兑换商城
        Union = OpenIdx.Union,//仙宗
        PrerogativeWrit = OpenIdx.PrerogativeWrit,//特权令
        WonderfulAct = OpenIdx.Wonderful,//精彩活动总入口
        Yhcs = OpenIdx.Yhcs,//浴火重生
        Consecrate = OpenIdx.Consecrate,//
        Xianyuan = OpenIdx.Xianlv,//仙缘系统
        XianlvGift = OpenIdx.XianlvGift,//仙缘礼包
        Friend = OpenIdx.Friend,//仙友
        Chengshen = OpenIdx.Chengshen,//成神在即
        ChaozhiLibao = OpenIdx.ChaozhiLibao,//超值礼包
        MeiriTehui = OpenIdx.MeiriTehui,//每日特惠
        SupremeGit = OpenIdx.SupremeGit,//至尊礼包
        Tongtiange = OpenIdx.Tongtiange,//通天阁
        Tiandilu = OpenIdx.Tiandilu, //天帝录
        Achieve = OpenIdx.Achieve,//成就系统
        Huashen = OpenIdx.Huashen,//化神系统
        Yishou = OpenIdx.Yishou,//异兽系统
        SkyPalace = OpenIdx.SkyPalace,//天宫荒古神器
        TehuiLibao = OpenIdx.TehuiLibao,//特惠礼包
        JinjieTehui = OpenIdx.JinjieTehui,//进阶特惠
        ShenlingGift = OpenIdx.ShenlingGift,//神灵天赋礼包
        FeishengWukong = OpenIdx.FeishengWukong,//飞升悟空
        JuebanXianjian = OpenIdx.JuebanXianjian,//绝版仙剑
        ZhizunShouyin = OpenIdx.ZhizunShouyin,//至尊兽印
        Zhandui = OpenIdx.Zhandui,//战队
        Huanggu = OpenIdx.Huanggu,//荒古
        Offline = OpenIdx.Offline,//挂机收益
        GoddessRecord = OpenIdx.GoddessRecord,//女神录
        XiuxianNvpu = OpenIdx.XiuxianNvpu,//修仙女仆
        Huanjing = OpenIdx.Huanjing,//幻境系统
        Xiandi = OpenIdx.Xiandi,//仙帝争霸
    }

    //todo，中控活动不用定义ID，定义活动类型

    /**主角光环类型*/
    export const enum RoleRingType {
        Type1 = 1,//1.主角光环
        Type2 = 2,//2.妖帝
        Type3 = 3,//3.妖神
    }

    /**主角光环操作类型*/
    export const enum RoleRingOpType {
        Type1 = 1,//1.圆圈领取,一键培育
        Type2 = 2,//2.界面领取,领取奖励
    }

    /**首充豪礼类型枚举(价格档位) */
    export const enum FirstRechargeType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
    }

    /**兑换商城 shop表类型2开始 */
    export const enum ExchangeShopType {
        /**熔炼 */
        Type1 = 2,
        /**奖卷 */
        Type2 = 3,
        /**游历 */
        Type3 = 4,
        /**封神 */
        Type4 = 5,
        /**道侣商店 商品表占位没使用 需要读道侣表配置 */
        Type5 = 10,
        /**灵脉 */
        Type6 = 6,
        /**魂石 */
        Type7 = 7,
        /**声望 */
        Type8 = 8,
        /**时光 */
        Type9 = 9,
    }

    /**统一功能配置唯一id，对应【T-统一功能配置】表*/
    export const enum TotalMainIdx {
        Yjjs = 1001, //瑶姬降世
    }

    /**战令类型，关联game_order_type.json*/
    export const enum GameOrderType {
        Chuangguanling = 1, //闯关令
        Huoyueling,//活跃令
        Yaojiling,//瑶姬令
        XiuXian,//修仙令
        Tansuo,//探索令
        Huanjing,//幻境令
        Chaojilicai,//超级理财
        Zhizunlicai,//至尊理财
    }

    /**战令类型前往按钮文本*/
    export const GameOrderTypeBtnStr = {
        [GameOrderType.Chuangguanling]: '前往挑战',
        [GameOrderType.Chaojilicai]: '前往日常',
        [GameOrderType.Zhizunlicai]: '前往供奉',
    }

    /**战令类型数值文本*/
    export const GameOrderTypeStr = {
        [GameOrderType.Chuangguanling]: "当前闯关值：",
        [GameOrderType.Huoyueling]: "当前活跃值：",
        [GameOrderType.Yaojiling]: "当前瑶姬值：",
        [GameOrderType.XiuXian]: "当前修仙等级：",
        [GameOrderType.Tansuo]: "当前探索值：",
        [GameOrderType.Huanjing]: "当前击败幻境BOSS数量：",
        [GameOrderType.Chaojilicai]: "当前活跃值：",
        [GameOrderType.Zhizunlicai]: "当前供奉时间：",
    };

    /**战令类型解锁弹窗标题*/
    export const GameOrderUnlockTitle = {
        [GameOrderType.Chuangguanling]: "闯关战令",
        [GameOrderType.Huoyueling]: "活跃战令",
        [GameOrderType.Yaojiling]: "瑶姬令",
        [GameOrderType.XiuXian]: "修仙战令",
        [GameOrderType.Tansuo]: "探索战令",
        [GameOrderType.Huanjing]: "幻境战令",
        [GameOrderType.Chaojilicai]: "超级理财",
        [GameOrderType.Zhizunlicai]: "至尊理财",
    }

    /**特权令类型*/
    export const enum PrerogativeWritType {
        /**玉清*/
        Yuqing = 1,
        /**上清*/
        Shangqing = 2,
        /**太清*/
        Taiqing = 3,
    }

    /**成神在即类型*/
    export const enum ChengshenType {
        Summon = 1,//召唤福利
        Pass = 2,//闯关试炼
    }

    /**成神在即奖励状态*/
    export const enum ChengshenRewardState {
        CanDraw = 1,//可领取
        HasDraw = 2,//已领取
    }

    /**通天阁排行榜类型*/
    export const enum TongtiangeRankType {
        Personal = 1,//个人
        Guild = 2,  //宗门
    }

    /**通用榜请求数据类型*/
    export const enum RankOpType {
        Rank = 1,//1为当前排行  2为上期排行   3为领取每日奖励
        LastRank = 2,
        Reward = 3,
    }

    export const enum FlyRankRewardType {
        Rank = 1,//1排名奖励
        Top = 2,//巅峰奖励
    }
    //通用礼包购买类型
    export const enum GiftBuyType {
        Xianyu = 1,//仙玉购买
        Rmb = 2,//人民币
    }

    export const enum FlyWarRewardType {
        Normal = 1,//1普通奖励
        War = 2,//进阶奖励
    }

    export const enum XianchiOpType {
        Draw = 1,//1为抽奖
        Big = 2,//2为领取大奖
    }

    export const enum TehuiType {
        /**特惠礼包 */
        TehuiLibao = 1,
        /**进阶特惠 */
        JinjieTehui = 2,
        /**修仙阶级 */
        XiuXianJieji = 3,
    }

    export const enum TiannvWelfareOpType {
        Tiannv = 1,//天女赐福
        Vip = 2,//VIP5福利
    }

    /**登录奖励类型*/
    export const enum LoginRewardType {
        Login = 1,//登录
        Vip = 2,//vip等级
    }

    /**招财仙基金类型*/
    export const enum ZcxFundType {
        Fuli = 1,//福利基金
        Chaoji = 2,//超级基金
    }

    /**浮尘灵壶操作类型 1召唤（次数） 2切换卡池（类型） 3许愿（索引） 4特殊卡池召唤 5赠礼奖励 6宝藏奖励 7累充奖励 8礼包*/
    export const enum FuchenlinghuOperType {
        Oper1 = 1,
        Oper2 = 2,
        Oper3 = 3,
        Oper4 = 4,
        Oper5 = 5,
        Oper6 = 6,
        Oper7 = 7,
        Oper8 = 8,
    }

    /**召唤特效界面类型*/
    export const enum SummonEffectType {
        Summon = 1,//召唤
        Fuchenlinghu = 2,//浮尘灵壶
        Linghuxianling = 3//灵壶仙灵
    }
}