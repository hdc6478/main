declare namespace game {
    const enum MainEvent {
        UPDATE_OFFLINE = "update_offline",
        UPDATE_WND_BASE_MDR_BG = "update_wnd_base_mdr_bg",
        UPDATE_WND_BASE_MDR_TITLE = "update_wnd_base_mdr_title",
        UPDATE_COMMON_ATTR = "update_common_attr",
        UPDATE_COMMON_SURFACE_ATTR = "update_common_surface_attr",
        UPDATE_WND_SECOND_MDR_TOP = "update_wnd_second_mdr_top",
        UPDATE_WND_BASE_MDR_SEL_TAB = "update_wnd_base_mdr_sel_tab",
        ON_OPEN_FUNC_INIT = "on_open_func_init",
        ON_OPEN_FUNC_UPDATE = "on_open_func_update",
        ON_OPEN_FUNC_DELETE = "on_open_func_delete",
        UPDATE_BASE_REWARD_MDR_STATE = "update_base_reward_mdr_state",
        ON_UPDATE_EASY_USE_PROP = "on_update_easy_use_prop",
        ON_UPDATE_EASY_USE_PROP_COUNT = "on_update_easy_use_prop_count",
        ON_CLOSE_EASY_UES_PROP = "on_close_easy_use_prop",
        ON_ICON_IMAGE_FLY = "on_icon_image_fly",
        COMMON_ADD_EFT = "common_add_eft",
        GET_MAIN_BTN_TARGET = "get_main_btn_target",
        ON_REWARD_FIND_UPDATE = "on_reward_find_update",
        /**通用关闭弹窗 */
        ON_CLOSE_COMMON_POPUP = "on_close_common_popup"
    }
    /** 特权id，部分系统定死*/
    const enum PrivilegeIdx {
        RoleRing = 1006
    }
    /** 功能开启id*/
    const enum OpenIdx {
        Xiuxian = 1041670084,
        Xiandan = 1041670085,
        Lingchi = 1041670086,
        Pass = 1040190001,
        PassAuto = 1041670093,
        WorldMap = 1040660001,
        Qiyuan = 1041670087,
        Lingmai = 1041670088,
        Role = 1041670089,
        Title = 1041670090,
        DressUp = 1041670091,
        Linggen = 1041670092,
        Strength = 1041670094,
        Gem = 1041670095,
        Advanced = 1041670096,
        Bag = 1041670097,
        BagEquip = 1041670098,
        BagMelt = 1041670099,
        BagCompose = 1041670100,
        BagDel = 1041670101,
        Shenling = 1041670102,
        Xianfa = 1041670103,
        Horse = 1041670104,
        Lingchong = 1041670105,
        Tianshen = 1041670106,
        Daily = 1040180001,
        Shilian = 1041670107,
        Fuben2 = 1041670108,
        Fuben3 = 1041670109,
        DailyLimitTime = 1041670112,
        Forbidden = 1041670113,
        Xianta = 1041670114,
        Xianta2 = 1041670207,
        Yuanling = 1041670115,
        PersonalBoss = 1041670116,
        VipBoss = 1041670117,
        Boss = 1041670118,
        CrossBoss = 1041670119,
        Compete = 1041670120,
        Youli = 1041670121,
        Doufa = 1041670122,
        /**神兵 */
        Weapon = 1041670123,
        /**羽翼 */
        Wing = 1041670124,
        /**时装 */
        Body = 1041670125,
        SuitType1 = 1041670126,
        SuitType2 = 1041670127,
        SuitType3 = 1041670128,
        SuitType4 = 1041670129,
        SuitType5 = 1041670130,
        SuitCast3 = 1041670131,
        SuitCast4 = 1041670132,
        SuitCast5 = 1041670133,
        SuitForge3 = 1041670252,
        SuitForge4 = 1041670253,
        SuitForge5 = 1041670254,
        RoleCollect = 1041670134,
        RoleHuanhua = 1041670135,
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
        Yijie = 1041670156,
        YonghengYijie = 1041670157,
        /**精彩活动-仙女送礼*/
        WonderfulAct = 1041670158,
        /**精彩活动-藏珍阁等*/
        WonderfulAct1 = 1041670159,
        /**浴火重生 */
        Yhcs = 1041670160,
        /**供奉系统 封魔 */
        Consecrate = 1041670161,
        Amass = 1041670162,
        Amass2 = 1041670163,
        ExchangeType1 = 1041670164,
        ExchangeType2 = 1041670165,
        ExchangeType3 = 1041670166,
        ExchangeType4 = 1041670167,
        ExchangeType5 = 1041670168,
        ExchangeType6 = 1041670169,
        ExchangeType7 = 1041670170,
        ExchangeType8 = 1041670171,
        ExchangeType9 = 1041670172,
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
        SupremeGit = 1041670194,
        /**鸿运赐福 */
        WonderfulAct6 = 1041670195,
        /**超值礼包*/
        ChaozhiLibao = 1041670196,
        /**每日特惠*/
        MeiriTehui = 1041670197,
        Achieve = 1041670198,
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
        FlyRank = 1041670205,
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
        XujieKuangmai = 1041670224,
        /**狂欢庆典*/
        Carnival = 1041670225,
        /**墟界祭坛*/
        XujieJitan = 1041670226,
        ChatSystem = 1041670227,
        ChatPrivate = 1041670231,
        Huanggu = 1041670232,
        Goddess = 1041670233,
        UnionTreasure = 1041670234,
        UnionKill = 1041670235,
        Offline = 1041670236,
        Abyss = 1041670237,
        Yuling = 1041670238,
        GoddessRecord = 1041670239,
        XiuxianNvpu = 1041670240,
        Fengmo = 1041670241,
        Xiandi = 1041670242,
        XianmaiZhengduo = 1041670243,
        Sea = 1041670244,
        Sea1 = 1041670245,
        Sea2 = 1041670246,
        Sea3 = 1041670247,
        Huanjing = 1041670248,
        KuafuDoufa = 1041670251,
        UnionAuction = 1041670255,
        UnionStore = 1041670256,
        Chaojilicai = 1041670257,
        Zhizunlicai = 1041670258,
        Fulijijin = 1041670259,
        Chaojijijin = 1041670260,
        XianLvJinJie = 1041670261,
        CrossUnion = 1041670262,
        Fuchenlinghu = 1041670263,
        Huanjingzengli = 1041670264,
        Huanjingbaozang = 1041670265,
        Huanjingleichong = 1041670266,
        Huanjinglibao = 1041670267,
        XianjieLuandou = 1041670268,
        Honour = 1041670269
    }
    const enum MainMoreStatus {
        More = 0,
        Fuction = 1,
        Skill = 2
    }
    const enum MainBtnType {
        Xianfa = 1
    }
    const enum NotTipsType {
        Carnival = 1,
        XujieTansuo = 2,
        FlyRank = 3,
        Tongtiange = 4,
        PunshList = 5,
        CaiyunbangRank = 6,
        CaiyunbangTurntable = 7
    }
    interface BoxRewardData {
        reward: number[][];
        tips?: string;
        tips1?: string;
        okFunc?: base.Handler;
        time?: number;
        /**时间文本后缀 */
        timeTips?: string;
        /**按钮文本 */
        btnStr?: string;
        /**隐藏按钮显示提示 用lab_time组件 不和时间共存 */
        btnTips?: string;
        /**标题 */
        title?: string;
    }
}
declare namespace game {
    const enum EquipEvent {
        EQUIP_UPDATE_BACK = "equip_update_back"
    }
    /**角色界面装备位置（从左到右从上到下）[0, 5, 1, 6, 2, 7, 3, 8, 4, 9]*/
    const EquipPosAry: number[];
    /**新的装备类型*/
    const enum EquipPos {
        SWORD = 0,
        CLOTHES = 1,
        BELT = 2,
        PANTS = 3,
        NECKLACE = 4,
        JADE = 5,
        SHOULDER = 6,
        HELMET = 7,
        BOOT = 8,
        RING = 9
    }
    /**装备部位名称*/
    const EquipPosName: {
        [key: number]: string;
    };
}
declare namespace game {
    /**表名字*/
    import LanDef = game.localization.LanDef;
    const enum ConfigName {
        Chat = "chat_limit.json",
        ServerTips = "tips_client.json",
        Tips = "tips.json",
        GmDoc = "gm_doc.json",
        RoleName = "role_name.json",
        Monster = "monster1.json",
        Skill = "battle_skill.json",
        SkillShow = "skill_show.json",
        SkillLayer = "skill_layer",
        Scene = "scene.json",
        Vip = "vip.json",
        RewardPreview = "reward_preview.json",
        Buff = "buff.json",
        OpenFunction = "open_function.json",
        ProductId = "product_id.json",
        Gate = "gate1.json",
        Param = "param.json",
        SkillLv = "skill_level.json",
        Weapon = "weapon.json",
        Effect = "effect.json",
        WingSkin = "wing.json",
        /**新加的配置表*/
        Rebirth = "rebirth.json",
        Godpower = "godpower.json",
        Prop = "prop.json",
        BagType = "bag_type.json",
        Synthesis = "synthesis.json",
        SynthesisType = "synthesis_type.json",
        Qiyuan = "qiyuan.json",
        QiyuanFuben = "qiyuan_fuben.json",
        MainTask1 = "main_task1.json",
        Elixir_init = "elixir_init.json",
        Elixir_limit = "elixir_limit.json",
        Elixir_buff = "elixir_buff.json",
        Grid = "grid.json",
        Pool = "pool.json",
        Equip = "equipment.json",
        Lingmai = "lingmai.json",
        LingmaiLevel = "lingmai_level.json",
        Linggen = "linggen.json",
        LinggenLeixing = "linggen_leixing.json",
        Title = "title.json",
        DressUp = "dress.json",
        Level = "level.json",
        Fightpower = "fightpower.json",
        XianfaSkillInit = "xianfa_skill_init.json",
        XianfaSkillLevel = "xianfa_skill_level.json",
        XianfaSkillCultivate = "xianfa_skill_cultivate.json",
        Shenling = "shenling.json",
        ShenlingType = "shenling_leixing.json",
        ShenlingLevel = "shenling_dengji.json",
        ShenlingStar = "shenling_xingji.json",
        ShenlingJiBan = "shenling_jiban.json",
        ShenlingLingqi = "shenling_lingqi.json",
        ShenlingLingpoType = "shenling_lingpo_type.json",
        ShenlingLingpo = "shenling_lingpo.json",
        ShenlingLingli = "shenling_lingli.json",
        Horse = "horse.json",
        HorseLevel = "horse_dengji.json",
        HorseJiBan = "horse_jiban.json",
        Tunshi = "tunshi.json",
        Jinjiejiangli = "jinjiejiangli.json",
        SpecialAttr = "special_attr.json",
        Tianshen = "yuanling.json",
        TianshenLevel = "yuanling_dengji.json",
        TianshenJiBan = "yuanling_jiban.json",
        TianshenZhuangBei = "yuanling_zhuangbei.json",
        TianshenTaoZhuang = "yuanling_taozhuang.json",
        Lingchong = "xianchong.json",
        Jump = "jump.json",
        RepetitionTask = "repetition_task.json",
        MaterialFuben = "material_fuben.json",
        MaterialScene = "material_scene.json",
        DailyLimitTime = "daily_limit_time.json",
        DailyWanfa = "daily_wanfa.json",
        ForbiddenFuben = "forbidden_fuben.json",
        ForbiddenGate = "forbidden_gate.json",
        XiantaFuben = "xianta_fuben.json",
        XiantaScene = "xianta_scene.json",
        XiantaReward = "xianta_reward.json",
        YuanLingFuben = "yuanling_fuben.json",
        NewVipBossFuben = "new_vip_boss_fuben.json",
        NewVipBoss = "new_vip_boss.json",
        NewMultipleBoss = "new_multiple_boss.json",
        PersonalBoss = "personal_boss.json",
        CrossBoss = "cross_boss.json",
        TourpvpChallenge = "tourpvp_challenge.json",
        TourpvpTarget = "tourpvp_target.json",
        TourpvpFuli = "tourpvp_fuli.json",
        TourpvpPaiming = "tourpvp_paiming.json",
        TourpvpPrecious = "tourpvp_precious.json",
        TourpvpWin = "tourpvp_win.json",
        TourpvpBaoxiang = "tourpvp_baoxiang.json",
        TourpvpKiller = "tourpvp_killer.json",
        TourpvpDati = "tourpvp_dati.json",
        BattleFigure = "battle_figure.json",
        MagicTarget = "magic_target.json",
        MagicWin = "magic_win.json",
        MagicUp = "magic_up.json",
        MagicRank = "magic_rank.json",
        MagicTopRank = "magic_top_rank.json",
        SuitStage = "suit_stage.json",
        SuitStrengthen = "suit_strength.json",
        Body = "body.json",
        SuitType = "suit_type.json",
        SuitPart = "suit_part.json",
        Dabiaojiangli = "dabiaojiangli.json",
        PowerDiaTarget = "power_dia_target.json",
        PowerDiaReward = "power_dia_reward.json",
        BodyJiban = "body_jiban.json",
        Gather = "gather.json",
        DirectShop = "direct_shop.json",
        /**召唤系统start */
        DrawRank = "draw_rank.json",
        DrawMain = "draw_main.json",
        DrawCountRewards = "draw_count_rewards.json",
        DrawGift = "draw_gift.json",
        DrawLuckGift = "draw_luck_gift.json",
        /**送100召唤卷 */
        GameOrderType = "game_order_type.json",
        GameOrder = "game_order.json",
        SignGift = "daily_sign.json",
        EfectSub = "effect_sub.json",
        ZeroBuy = "zero_buy.json",
        ZcxLuckNumber = "zcx_luck_number.json",
        ZcxCoinsBank = "zcx_coins_bank.json",
        ZcxExchange = "zcx_exchange.json",
        ZcxFuben = "zcx_fuben.json",
        ZcxFund = "zcx_fund.json",
        Yaodi = "yaodi.json",
        YaodiRandom = "yaodi_random.json",
        Yaoshen = "yaoshen.json",
        YaoshenRandom = "yaoshen_random.json",
        Shouchong = "shouchong.json",
        AdventureMedal = "adventure_medal.json",
        ActiveAward = "active_award.json",
        GiftBag = "gift_bag.json",
        Store = "shop.json",
        WorldMap = "worldmap.json",
        Chapteraward = "chapteraward.json",
        Subsection = "subsection.json",
        DemonReward = "demon_reward.json",
        TotalMain = "total_main.json",
        TotalTask = "total_task.json",
        ToTalTask2 = "total_task2.json",
        TotalTarget = "total_target.json",
        TotalCumulative = "total_cumulative.json",
        TotalFuben = "total_fuben.json",
        DaoLvShop = "daolv_shop.json",
        GuildDonate = "guild_donate.json",
        GuildJobData = "guild_job_data.json",
        GuildCreateData = "guild_create_data.json",
        GuildCharge = "guild_charge.json",
        GuildDraw = "guild_draw.json",
        GuildYibaoBox = "guild_yibao_box.json",
        GuildYibaoRank = "guild_yibao_rank.json",
        GuildYibaoTask = "guild_yibao_task.json",
        GuildZhanyaotai = "guild_zhanyaotai.json",
        GuildZhanyaotaiRank = "guild_zhanyaotai_rank.json",
        GuildWare = "guild_ware.json",
        GuildAuction = "guild_auction.json",
        GuildBaoKu = "guild_bao_ku.json",
        GuildStudy = "guild_study.json",
        GuildStudyLevel = "guild_study_level.json",
        GuildXianshou = "guild_xianshou.json",
        GuildXianshouTask = "guild_xianshou_task.json",
        GuildXianshouRank = "guild_xianshou_rank.json",
        GuildXianshouTarget = "guild_xianshou_target.json",
        GuildPkSkill = "guild_pk_skill.json",
        Yijie = "yijie.json",
        Yongheng = "yongheng.json",
        Cangzhenge = "canzhenge.json",
        ShengtanItem = "shengtan_item.json",
        ShengtanScore = "shengtan_score.json",
        GuiidRandom = "guiid_random.json",
        GuildMiBao = "guild_mibao.json",
        YuhuoReward = "yuhuo_reward.json",
        Amass = "amass.json",
        AmassSuit = "amass_suit.json",
        SuitEffect = "suit_effect.json",
        GongfengReward = "gongfeng_reward.json",
        GongfengShow = "gongfeng_show.json",
        Child = "child.json",
        ChildStar = "child_shengxing.json",
        ChildJiban = "child_jiban.json",
        ChildShenbing = "child_shenbing.json",
        ChildLingyi = "child_lingyi.json",
        Ring = "ring.json",
        RingDengji = "ring_dengji.json",
        XianlvShilianFuben = "xianlv_shilian_fuben.json",
        XianlvShilianScene = "xianlv_shilian_scene.json",
        XianlvRank = "xianlv_rank.json",
        XianlvJifen = "xianlv_jifen.json",
        FriendGift = "friend_gift.json",
        TiandiType = "tiandi_type.json",
        TiandiLevel = "tiandi_level.json",
        TiandiLevelrewards = "tiandi_levelrewards.json",
        TiandiYuhuangQiandao = "tiandi_yuhuang_qiandao.json",
        TiandiFengduBaiguilu = "tiandi_fengdu_baiguilu.json",
        TiandiFengduTaozhuang = "tiandi_fengdu_taozhuang.json",
        TiandiRandom = "tiandi_random.json",
        TiandiTianlongJihuo = "tiandi_tianlong_jihuo.json",
        TiandiTianlong = "tiandi_tianlong.json",
        TiandiShifang = "tiandi_shifang.json",
        TiandiShifangYouli = "tiandi_shifang_youli.json",
        TiandiShifnagLevel = "tiandi_shifnag_level.json",
        RankConf = "rank_conf.json",
        RankReward = "rank_reward.json",
        Stronger = "stronger.json",
        TreasureBox = "treasurebox.json",
        Preview = "preview.json",
        BlessMain = "bless_main.json",
        TongtiangeChallenge = "attic_challenge.json",
        TongtiangeExchange = "attic_exchange.json",
        TongtiangeLogin = "attic_login.json",
        TongtiangeGift = "attic_gift.json",
        Xianjian = "xianjian.json",
        XianjianDengji = "xianjian_dengji.json",
        XianjianJiban = "xianjian_jiban.json",
        Jianfa = "jianfa.json",
        Jianzhen = "jianzhen.json",
        XianjianSkillCost = "xianjian_skill_cost.json",
        XianjianSkillPos = "xianjian_skill_pos.json",
        Achievement = "achievement.json",
        Huashen = "huashen.json",
        HuashenLevel = "huashen_dengji.json",
        ChonglistGift = "chonglist_gift.json",
        ChonglistTarget = "chonglist_target.json",
        ChonglistRank = "chonglist_rank.json",
        NewPrivilege = "new_privilege.json",
        HuangguShenqiBuwei = "huanggu_shenqi_buwei.json",
        HuangguShenqi = "huanggu_shenqi.json",
        HuangguShenqiSkill = "huanggu_shenqi_skill.json",
        Yishou = "yishou.json",
        YishouShouhun = "yishou_shouhun.json",
        YishouShouling = "yishou_shouling.json",
        YishouShoulingEquip = "yishou_shouling_equip.json",
        YishouSynthesisType = "yishou_synthesis_type.json",
        YishouShouyin = "yishou_shouying.json",
        YishouShouyinSuit = "yishou_shouying_suit.json",
        HuashenZhilu = "huashen_zhilu.json",
        HuashenTianfu = "huashen_tianfu.json",
        HuashenTianfuLeixing = "huashen_tianfu_leixing.json",
        XianchiReward = "xianchi_reward.json",
        TiannvChargeWeal = "tiannvcharge_weal.json",
        VipCharge = "vip_charge.json",
        RewardFind = "reward_find.json",
        ZhanduiQizhi = "zhandui_qizhi.json",
        ZhanduiDengji = "zhandui_dengji.json",
        ZhanduiJitanHuanhua = "zhandui_jitan_huanhua.json",
        ZhanduiJitanDengji = "zhandui_jitan_dengji.json",
        ZhanduiJitanLibao = "zhandui_jitan_libao.json",
        ZhanduiTansuoType = "zhandui_tansuo_type.json",
        ZhanduiTansuoMap = "zhandui_tansuo_map.json",
        HuangguGongfeng = "huanggu_gongfeng.json",
        HuangguReward = "huanggu_reward.json",
        HuangguHaogan = "huanggu_haogan.json",
        HuangguHaoganDuihua = "huanggu_haogan_duihua.json",
        HuangguShuijing = "huanggu_shuijing.json",
        HuangguGift = "huanggu_gift.json",
        HuangguShijian = "huanggu_shijian.json",
        HuangguShijianType = "huanggu_shijian_type.json",
        HelotCallReward = "helot_call_reward.json",
        HelotTargetReward = "helot_target_reward.json",
        HelotText = "helot_text.json",
        ZhuimoBoss = "zhuimo_boss.json",
        NvshenIndex = "nvshen_index.json",
        NvshenShijianType = "nvshen_shijian_type.json",
        NvshenShijian = "nvshen_shijian.json",
        NvshenDuihuaLevel = "nvshen_duihua_level.json",
        NvshenDuihua = "nvshen_duihua.json",
        NvshenLevel = "nvshen_level.json",
        NvshenChoujiang = "nvshen_choujiang.json",
        NvshenHunka = "nvshen_hunka.json",
        NvshenHunkaScore = "nvshen_hunka_score.json",
        NvshenAttr = "nvshen_attr.json",
        NvshenGudingAttr = "nvshen_guding_attr.json",
        FengmoRank = "fengmo_rank.json",
        FengmoDamageReward = "fengmo_damage_reward.json",
        FengmoTiaozhanReward = "fengmo_tiaozhan_reward.json",
        XiuxianNvpuTarget = "ayah_target.json",
        XiuxianNvpuLevel = "ayah_level.json",
        XiuxianNvpuOffline = "ayah_offline.json",
        XiuxianNvpuEventFunc = "ayah_event_func.json",
        XianmaiStage = "xianmai_stage.json",
        XianmaiRankReward = "xianmai_rank_reward.json",
        XiandiRank = "xiandi_rank.json",
        HuanjingzhihaiIndex = "huanjingzhihai_index.json",
        HuanjingzhihaiType = "huanjingzhihai_type.json",
        HuanjingzhihaiGate = "huanjingzhihai_gate.json",
        HuanjingzhihaiBoss = "huanjingzhihai_boss.json",
        HuanjingzhihaiBossRank = "huanjingzhihai_boss_rank.json",
        AdvanceLv = "advance_lv.json",
        XianlvDoufaRank = "xianlvdoufa_rank.json",
        XianlvDoufaReward = "xianlvdoufa_reward.json",
        HuanJingStage = "huanjin_stage.json",
        HuanJingStar = "huanjin_star.json",
        HuanJingHuanLing = "huanjin_huanling.json",
        HuanJingZuShen = "huanjin_zushen.json",
        HuanJingParam = "huanjin_param.json",
        DoufaJifen = "doufa_jifen.json",
        DoufaJineng = "doufa_jineng.json",
        DoufaXianzongPaiming = "doufa_xianzong_paiming.json",
        DoufaGerenPaiming = "doufa_geren_paiming.json",
        LegionBuff = "legion_buff.json",
        LegionAttr = "legion_attr.json",
        LinghuQuality = "linghu_quality.json",
        LinghuExtraBox = "linghu_extra_box.json",
        HuanjingBaozang = "huanjing_baozang.json",
        HuanjingGift = "huanjing_gift.json",
        HuanjingLeichong = "huanjing_leichong.json",
        HuanjingZengli = "huanjing_zengli.json",
        SpecialGuide = "special_guide.json",
        XianjieLuandouScore = "xianjiebrawl_score.json",
        XianjieLuandouRank = "xianjiebrawl_rank.json",
        XianjieLuandouOutcome = "xianjiebrawl_outcome.json",
        XianjieLuandouBase = "xianjiebrawl_base.json",
        TiandiXianqiFuben = "tiandi_xianqi_fuben.json",
        TiandiXianqi = "xiandi_xianqi.json",
        XianweiBase = "xianwei_base.json",
        XianweiRankReward = "xianwei_rank_reward.json",
        Honour = "honour.json"
    }
    /**拆表的配置，用于遍历获取配置*/
    const MonsterConfigList: string[];
    const GateConfigList: string[];
    const SplitConfigMap: {
        [key: string]: string[];
    };
    /** 表头Id*/
    const enum ConfigHead {
        /*****************************新加的**************************/
        /**只有产出的配置才定义表头*/
        Prop = 145,
        Equip = 290,
        Horse = 360,
        Lingchong = 361,
        Title = 370,
        DressUp = 390,
        Shenling = 400,
        Weapon = 403,
        Wing = 404,
        Body = 405,
        Xianjian = 408,
        Huashen = 409,
        Tianshen = 640,
        Child = 601,
        ChildShenbing = 602,
        ChildLingyi = 603,
        Ring = 604,
        Shouling = 605,
        Shouyin = 606,
        ZhanduiJitanHuanhua = 701,
        Horse2 = 9900,
        Creature = 9901,
        Huashen2 = 9902
    }
    /** 表头映射 getConfigById表头只匹配了两位数*/
    const ConfigMap: {
        [key: number]: string;
    };
    /**外显类的配置定义，映射外显资源，SurfaceUtil需要加下映射，ResUtil.getSurfaceData根据具体需求修改*/
    const SurfaceConfigList: {
        [ConfigHead.Shenling]: string;
        [ConfigHead.Horse]: string;
        [ConfigHead.Tianshen]: string;
        [ConfigHead.Lingchong]: string;
        [ConfigHead.Wing]: string;
        [ConfigHead.Body]: string;
        [ConfigHead.Weapon]: string;
        [ConfigHead.Horse2]: string;
        [ConfigHead.Creature]: string;
        [ConfigHead.Child]: string;
        [ConfigHead.ChildShenbing]: string;
        [ConfigHead.ChildLingyi]: string;
        [ConfigHead.Ring]: string;
        [ConfigHead.Xianjian]: string;
        [ConfigHead.Huashen]: string;
        [ConfigHead.Huashen2]: string;
        [ConfigHead.Shouling]: string;
        [ConfigHead.Shouyin]: string;
        [ConfigHead.ZhanduiJitanHuanhua]: string;
    };
    /**根据表头获取提示文本*/
    const ConfigHeadToName: {
        [ConfigHead.Shenling]: LanDef;
        [ConfigHead.Horse]: LanDef;
        [ConfigHead.Tianshen]: LanDef;
        [ConfigHead.Lingchong]: LanDef;
        [ConfigHead.Wing]: LanDef;
        [ConfigHead.Body]: LanDef;
        [ConfigHead.Weapon]: LanDef;
        [ConfigHead.Equip]: LanDef;
        [ConfigHead.Huashen]: LanDef;
    };
}
declare namespace game {
    const enum ActionName {
        ATTACK = "atk",
        RUN = "run",
        DIE = "die",
        JUMP = "jmp",
        STAND = "std",
        SIT = "sit",
        HIT = "hit",
        RIDE = "ride"
    }
    const enum Direction {
        NONE = 0,
        UP = 1,
        RIGHT_UP = 2,
        RIGHT = 3,
        RIGHT_DOWN = 4,
        DOWN = 5,
        LEFT_DOWN = 6,
        LEFT = 7,
        LEFT_UP = 8
    }
    const MirDir: {
        [Direction.LEFT]: Direction;
        [Direction.LEFT_UP]: Direction;
        [Direction.LEFT_DOWN]: Direction;
    };
    const ReversalDir: {
        [Direction.RIGHT]: Direction;
        [Direction.RIGHT_UP]: Direction;
        [Direction.UP]: Direction;
        [Direction.LEFT_UP]: Direction;
        [Direction.LEFT]: Direction;
        [Direction.LEFT_DOWN]: Direction;
        [Direction.DOWN]: Direction;
        [Direction.RIGHT_DOWN]: Direction;
    };
    /** 2面资源 纯向左向右时，考虑不切换方向 */
    const MirDirFor2: {
        [Direction.UP]: Direction;
        [Direction.LEFT]: Direction;
        [Direction.LEFT_UP]: Direction;
        [Direction.LEFT_DOWN]: Direction;
        [Direction.RIGHT]: Direction;
        [Direction.DOWN]: Direction;
    };
    /** 3面资源 纯向左向右时，考虑不切换方向 */
    const MirDirFor3: {
        [Direction.UP]: Direction;
        [Direction.LEFT]: Direction;
        [Direction.LEFT_UP]: Direction;
        [Direction.LEFT_DOWN]: Direction;
        [Direction.DOWN]: Direction;
    };
    const AlterXDirs2: {
        [Direction.LEFT]: number;
        [Direction.LEFT_UP]: number;
        [Direction.LEFT_DOWN]: number;
        [Direction.DOWN]: number;
    };
    const AlterXDirs3: {
        [Direction.LEFT]: number;
        [Direction.LEFT_UP]: number;
        [Direction.LEFT_DOWN]: number;
        [Direction.UP]: number;
    };
    const DefaultSortOrder: number[];
    function getSortOrder(dir: number, actionName?: string): number[];
    /** 重剑攻击不显示轻剑 */
    const AtkNoWeapon: string[];
    /**不放大模型*/
    const NoScaleSurface: number[];
}
declare namespace game {
    const EquipMeltQuality: number;
    const BagEquipTipsCnt: number;
    const enum BagEvent {
        ON_PROP_COMPOSE_SEL_UPDATE = "on_prop_compose_sel_update",
        ON_PROP_COMPOSE_SUCCESS = "on_prop_compose_success",
        ON_BAG_MELT_TIP = "on_bag_melt_tip",
        ON_BAG_MELT_VALUE_UPDATE = "on_bag_melt_value_update",
        ON_BAG_REWARD_SELECT_SHOW = "on_bag_reward_select_show",
        /**以下为公共事件*/
        ON_BAG_MAX_CNT_UPDATE = "on_bag_max_cnt_update",
        ON_BAG_UPDATE_BY_PROP_TYPE = "on_bag_update_by_prop_type",
        ON_BAG_UPDATE_BY_BAG_TYPE = "on_bag_update_by_bag_type",
        ON_BAG_UPDATE_BY_PROP_INDEX = "on_bag_update_by_prop_index",
        ON_BAG_UPDATE_BY_HEAD_TYPE = "on_bag_update_by_head_type",
        ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE = "on_bag_update_by_prop_type_and_subtype"
    }
    /**道具不足弹窗类型*/
    const enum PropLackType {
        None = 0,
        Dialog = 1,
        Text = 2
    }
    /**
     * Icon显示类型
     */
    const enum IconShowType {
        Reward = 1,
        Bag = 2,
        NotTips = 3,
        NotCnt = 4,
        Name = 5,
        UnionExchange = 6
    }
    /**
     * Icon角标类型
     */
    const enum IconTagType {
        Guishu = 1
    }
    const enum PropEasyUseType {
        /**不推荐不自动使用 */
        None = 0,
        /**快捷使用主界面弹窗 */
        Easy = 1,
        /**自动使用 获得即请求协议使用 */
        Auto = 2
    }
    /**背包类型*/
    const enum BagType {
        Goods = 1,
        Material = 2,
        RoleEquip = 3,
        ShenlingEquip = 4,
        Gem = 5,
        YuanlinEquip = 6,
        BaozangSuipian = 7,
        Yishou = 8,
        XujieJitan = 9,
        TimeGoddess = 10,
        Hunka = 11,
        Suit = 12
    }
    /**背包名字*/
    const BagTypeToName: {
        [type: number]: string;
    };
    /**index规则*/
    const enum PropParseType {
        BigType = 0,
        Type = 1,
        PropType = 2,
        PropSubType = 3
    }
    /**index规则取字段*/
    const PropParseTypeList: {
        [type: number]: number[];
    };
    /**道具表物品类型，DE*/
    const enum PropType {
        Coin = 0,
        Good = 1,
        Compose = 2,
        Box = 3,
        Gem = 4,
        Xianfa = 5,
        ChallengeProp = 7,
        VipExp = 8,
        XianDan = 9,
        Surface = 11,
        Consecrate = 12,
        Amass = 13,
        XianjianBuwei = 15,
        Lianshendan = 17,
        YuanlinZhuangbei = 29,
        UpStar = 32,
        Lingpo = 33,
        BaozangSuipian = 34,
        ZhanduiLingbao = 36,
        TimeGoddess = 37,
        Hunka = 38
    }
    /**道具需要监听子类型的类型集合，比如外显系统需要子类型来区分*/
    const PropListenerSubType: PropType[];
    /**装备表装备类型，DE*/
    const enum EquipPropType {
        RoleEquip = 1,
        Yishou = 2,
        Shouling = 3,
        Suit = 8,
        Lingqi = 9
    }
    /**宝箱子类型，F*/
    const enum PropSubType3 {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5
    }
    /**宝石子类型，F*/
    const enum PropSubType4 {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5
    }
    /**技能书子类型 */
    const enum PropSubType5 {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4
    }
    /**增加挑战次数的道具子类型，这种类型是一对一的关系，客户端不需要定义，F*/
    const enum PropSubType7 {
    }
    /**丹药子类型，F*/
    const enum PropSubType9 {
        Danyao = 1,
        Lingdan = 2,
        Xiandan = 3
    }
    /**外显碎片子类型，F*/
    const enum PropSubType11 {
        Horse = 1,
        Tianshen = 2,
        Shenling = 3,
        Weapon = 6,
        Wing = 7,
        Body = 8,
        Huashen = 9
    }
    /**炼神丹子类型，F*/
    const enum PropSubType17 {
        Horse = 1,
        Tianshen = 2,
        Wing = 3,
        Weapon = 4,
        Body = 5,
        Huashen = 6
    }
    /**外显升星石子类型，F*/
    const enum PropSubType32 {
        Horse = 1,
        Shenling = 2,
        Tianshen = 3,
        Xianfa = 4,
        Wing = 5,
        Body = 6,
        Weapon = 7,
        Xianjian = 8,
        Huashen = 9
    }
    /**创世女神供奉类型，F*/
    const enum PropSubType37 {
        Speedup = 1,
        Jipin = 2
    }
    /**创世女神魂卡子类型，F*/
    const enum PropSubType38 {
        Yaohun1 = 1,
        Xianhun2 = 2,
        Shenhun3 = 3
    }
    /**道具使用限制类型，服务端定*/
    const enum PropUseLimitType {
        VIP_INDEX = 1,
        LOGINDAY = 2,
        /**新加限制类型时，BagProxy红点也要刷新*/
        OwnLoginDay = 7
    }
    /**道具index*/
    const enum PropIndex {
        Yuanbao = 1450000001,
        Xianyu = 1450000002,
        Zhujuejingyan = 1450000003,
        Lingqi = 1450000004,
        Shenlingjinghua = 1450000005,
        Mucai = 1450000006,
        Maiqi = 1450000007,
        Xianqi = 1450000008,
        Huoyuedu = 1450000009,
        Jingjibi = 1450000011,
        Fscoin = 1450000012,
        Ylcoin = 1450000013,
        Dlcoin = 1450000014,
        Lmcoin = 1450000015,
        Xzcoin = 1450000016,
        Pretige = 1450000017,
        Sgcoin = 1450000018,
        Gfjs = 1450000025,
        GuildTiantan = 1450000026,
        GuildShengtan = 1450000027,
        Linglipoint1 = 1450000021,
        Linglipoint2 = 1450000022,
        Linglipoint3 = 1450000020,
        Linglipoint4 = 1450000019,
        Linglipoint5 = 1450000024,
        Linglipoint6 = 1450000023,
        Xtlqcoin = 1450000028,
        Ssscoin = 1450000029,
        Chengjiujifen = 1450000030,
        Tianxingzhu = 1450000031,
        Gongfeng = 1451201005,
        Feishengjingyanzhi = 1450000032,
        Huashenzhilujifen = 1450000033,
        Caiyunyinji = 1450000035,
        Xingshi = 1450000036,
        GuildScore = 1450000037,
        GuildXianshouExp = 1450000038,
        XujieNengliangshi = 1450000039,
        XujieShuijing = 1450000040,
        Chuangshinengliang = 1450100174,
        FengmoScore = 1450000043,
        XianmaiScore = 1450000044,
        Sea1 = 1450000045,
        Sea2 = 1450000046,
        Sea3 = 1450000047,
        Huanggushuijing = 1450000050,
        Xianqivalue = 1450000051,
        NvshenJiasu = 1453701001,
        /**新加货币的话，RoleDef里面的PropIndexToKey也要处理下*/
        Lingmaishengdan = 1450100001,
        Genjishengguo = 1450100002,
        Ronglianjingshi = 1450100005,
        Zuoqijinjiedan = 1450100042,
        Yuanlingjinjiedan = 1450100064,
        Shenbinjiedan = 1450100105,
        Yuyijinjiedan = 1450100106,
        ChangeNameCard = 1450100029,
        SummonLiQuan = 1450100114,
        Yaoshoulingsui = 1450100117,
        Moshoulingsui = 1450100118,
        Xianshenyu = 1450100119,
        Baoshi = 1451000003,
        Rlcoin = 1450100005,
        Ticket = 1450100007,
        Kunxiansheng = 1450100133,
        Huashenjinjiedan = 1450100046,
        Xianjianjinjiedan = 1450100140,
        Caiyunjinding = 1450100149,
        MoHun = 1451202023,
        XujieJitanJiasu = 1453501001,
        XujieTansuoling = 1450100154,
        HuanjingBossTiaozhanling = 1450100158,
        DuorenBoss = 1450701001,
        Fengmoling = 1450702001,
        Jinguiling = 1450703001,
        Penglailing = 1450704001,
        XianlvShilian = 1450712001,
        XianlvZhanchang = 1450713001,
        YouliJuanzhou = 1450705001,
        DoufaJuanzhou = 1450706001,
        Jingjichangjifen = 1451000001,
        CommonEquip = 1451000002,
        ShenlingSuipian = 1451000004,
        Jipin = 1453702001
    }
    /**道具数量显示成时间文本，统一秒*/
    const PropCntShowTimeStr: PropIndex[];
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class MdrBase extends base.Mdr {
        protected _tab: MdrTab;
        constructor(parent: DisplayObjectContainer);
        protected addListeners(): void;
        protected doHide(disposeImmediately: boolean): void;
        private $clearList;
        protected onHide(): void;
        dispose(): void;
        protected genMdrTab<T extends MdrTab>(t: new (m: ModBase, p: egret.DisplayObjectContainer, l?: MdrClsList) => T, list?: MdrClsList): T;
        protected setViewIndex(index?: number): void;
        /**解析showArgs数据，notShowArgs传true时，表示不默认返回showArgs*/
        protected decodeShowArgs(notShowArgs?: boolean): number;
    }
}
declare namespace game {
    const enum GiftEvent {
        ON_UPDATE_GIFT_INFO = "on_update_gift_info",
        ON_UPDATE_GIFT_HINT = "on_update_gift_hint"
    }
    /**对应【J-进阶奖励表】的【dabiaojiangli.json】类型*/
    const enum GiftType {
        Yuanling = 1,
        SuitType1 = 2,
        SuitType2 = 3,
        SuitType3 = 4,
        SuitType4 = 5,
        SuitType5 = 6,
        /**仙戒*/
        Ring = 7,
        /**仙侣进阶*/
        XianLvJinJie = 8
    }
}
declare namespace game {
    const enum ActivityEvent {
        ON_ACTIVITY_INIT = "on_activity_init",
        ON_ACTIVITY_UPDATE = "on_activity_update",
        ON_ACTIVITY_CLOSE = "on_activity_close",
        ON_ACTIVITY_UPDATE_BY_TYPE = "on_activity_update_by_type",
        ON_ACTIVITY_ENTRANCE_UPDATE = "on_activity_entrance_update",
        ON_ACTIVITY_SEL_TAB = "on_activity_sel_tab",
        ON_GET_OPER_ACT_LIST = "on_get_oper_act_list",
        ON_ACTIVITY_ICON_ADD = "on_activity_icon_add",
        ON_ACTIVITY_ICON_DEL = "on_activity_icon_del",
        ON_ACTIVITY_ICON_UPDATE = "on_activity_icon_update",
        ON_ACTIVITY_ICON_DELETE = "ON_ACTIVITY_ICON_DELETE",
        ON_ACTIVITY_ICON_HINT = "on_activity_icon_hint",
        ON_ACTIVITY_ICON_SHOW = "on_activity_icon_show",
        ON_ACTIVITY_ICON_HIDE = "on_activity_icon_hide",
        ON_ACTIVITY_ICON_TIPS_HIDE = "on_activity_icon_tips_hide",
        /**战力转盘 */
        ON_OPEN_LOTTERY_TWEEN = "on_open_lottery_tween",
        ON_UPDATE_LOTTERY_INFO = "on_update_lottery_info",
        /**战力转盘 */
        /**召唤系统 */
        ON_UPDATE_RANK = "on_update_rank",
        ON_UPDATE_FENGYUN_LIST = "on_update_fengyun_list",
        ON_UPDATE_EXCHANGE = "on_update_exchange",
        ON_UPDATE_SUMMON = "on_update_summon",
        ON_UPDATE_SUMMON_TWEEN = "on_update_summon_tween",
        ON_UPDATE_SUMMON_TWEEN_OVER = "on_update_summon_tween_over",
        ON_UPDATE_SUMMON_OVER = "on_update_summon_over",
        ON_UPDATE_SUMMON_SHAKE = "on_update_summon_shake",
        ON_UPDATE_SUMMON_GIFT = "on_update_summon_gift",
        /**召唤系统 */
        /**赠送100召唤卷 */
        ON_UPDATE_GIVING_MAIN_TAB = "on_update_giving_main_tab",
        ON_UPDATE_GIVING_LIST = "on_update_giving_list",
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
        ON_CLOSE_CHENGSHEN = "on_close_chengshen",
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
        ON_FLY_RANK_UPDATE = "on_fly_rank_update",
        ON_FLY_RANK_UPDATE_LAST_RANK = "on_fly_rank_update_last_rank",
        ON_FLY_RANK_UPDATE_GIFT = "on_fly_rank_update_gift",
        ON_FLY_RANK_UPDATE_REBATE = "on_fly_rank_update_rebate",
        ON_FLY_RANK_UPDATE_WAR = "on_fly_rank_update_war",
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
        ON_WONDERFUL_ACT_CLOSE = "on_wonderful_act_close",
        /**财运榜*/
        ON_CAIYUNBANG_QIFU_INFO_UPDATE = "on_caiyunbang_qifu_info_update",
        ON_CAIYUNBANG_LEICHONG_INFO_UPDATE = "on_caiyunbang_leichong_info_update",
        ON_CAIYUNBANG_DUIHUAN_INFO_UPDATE = "on_caiyunbang_duihuan_info_update",
        ON_CAIYUNBANG_LOGIN_INFO_UPDATE = "on_caiyunbang_login_info_update",
        ON_CAIYUNBANG_RANK_INFO_UPDATE = "on_caiyunbang_rank_info_update",
        ON_CARNIVAL_MIBAO_UPDATE = "on_carnival_mibao_update",
        ON_CARNIVAL_GIFT_UPDATE = "on_carnival_gift_update",
        ON_CARNIVAL_UPDATE = "on_carnival_update",
        ON_CARNIVAL_ZHAOHUAN_UPDATE = "on_carnival_zhaohuan_update",
        ON_CARNIVAL_RANK_UPDATE = "on_carnival_rank_update",
        ON_CARNIVAL_RANK_UPDATE_LAST_RANK = "on_carnival_rank_update_last_rank",
        ON_UPDATE_FUCHENLINGHU_INFO = "on_update_fuchenlinghu_info",
        ON_CHANGE_FUCHENLINGHU_SEATYPE = "on_change_fuchenlinghu_seatype"
    }
    const enum ActivityPosType {
        Top = 1,
        Left = 2,
        Big = 3
    }
    const enum ActivityType {
        Cangzhenge = 1,
        Lianxucharge = 2,
        Leijicharge = 3,
        Loginrewards = 4,
        TongtiangeReward = 6,
        TongtiangeRankReward = 7,
        /**以下活动可复用，支持策划配置分页*/
        FlyRank = 8,
        FlyGift = 9,
        FlyRebate = 10,
        FlyWar = 11,
        CaiyunbangTurntable = 12,
        CaiyunbangRank = 13,
        CaiyunbangCharge = 14,
        CaiyunbangExchange = 15,
        CaiyunbangLogin = 16,
        CarnivalGift = 17,
        CarnivalMibao = 18,
        Carnival = 19,
        CarnivalZhaohuan = 20,
        CarnivalCrossRank = 21,
        CarnivalRank = 22,
        CarnivalNotice = 23
    }
    /**需要显示时间的中控活动类型，todo：需要注意的*/
    const NeedShowTimeAct: {
        [type: number]: boolean;
    };
    /**中控活动标签命名规则，todo：需要注意的*/
    const ActivityTabName: string;
    /**------------------新增-------------------*/
    /**用于单抽和十连、百抽 */
    const enum CommonCountType {
        /**单抽 */
        Once = 1,
        /**十连 */
        Ten = 2,
        /**百抽 */
        Hund = 3
    }
    /**
     * 中控活动：后台中控用活动ID做标识
     * 非中控：对应功能开启表id
     */
    const enum BtnIconId {
        PowerTurntable = 1041670136,
        Store = 1041670148,
        Summon = 1041670137,
        SignGift = 1041670141,
        Giving = 1041670142,
        RoleRing = 1041670146,
        ZeroBuy = 1041670145,
        FirstCharge = 1041670143,
        Zcx = 1041670144,
        KillBoss = 1041670147,
        Yjjs = 1041670153,
        GivingShenLing = 1041670151,
        ExchangeShop = 1041670152,
        Union = 1041670154,
        PrerogativeWrit = 1041670155,
        WonderfulAct = 1041670218,
        Yhcs = 1041670160,
        Consecrate = 1041670161,
        Xianyuan = 1041670173,
        XianlvGift = 1041670179,
        Friend = 1041670180,
        Chengshen = 1041670192,
        ChaozhiLibao = 1041670196,
        MeiriTehui = 1041670197,
        SupremeGit = 1041670194,
        Tongtiange = 1041670199,
        Tiandilu = 1041670200,
        Achieve = 1041670198,
        Huashen = 1041670202,
        Yishou = 1041670204,
        SkyPalace = 1041670206,
        TehuiLibao = 1041670208,
        JinjieTehui = 1041670209,
        ShenlingGift = 1041670211,
        FeishengWukong = 1041670212,
        JuebanXianjian = 1041670213,
        ZhizunShouyin = 1041670214,
        Zhandui = 1041670222,
        Huanggu = 1041670232,
        Offline = 1041670236,
        GoddessRecord = 1041670239,
        XiuxianNvpu = 1041670240,
        Huanjing = 1041670248,
        Xiandi = 1041670242
    }
    /**主角光环类型*/
    const enum RoleRingType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3
    }
    /**主角光环操作类型*/
    const enum RoleRingOpType {
        Type1 = 1,
        Type2 = 2
    }
    /**首充豪礼类型枚举(价格档位) */
    const enum FirstRechargeType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4
    }
    /**兑换商城 shop表类型2开始 */
    const enum ExchangeShopType {
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
        Type9 = 9
    }
    /**统一功能配置唯一id，对应【T-统一功能配置】表*/
    const enum TotalMainIdx {
        Yjjs = 1001
    }
    /**战令类型，关联game_order_type.json*/
    const enum GameOrderType {
        Chuangguanling = 1,
        Huoyueling = 2,
        Yaojiling = 3,
        XiuXian = 4,
        Tansuo = 5,
        Huanjing = 6,
        Chaojilicai = 7,
        Zhizunlicai = 8
    }
    /**战令类型前往按钮文本*/
    const GameOrderTypeBtnStr: {
        [GameOrderType.Chuangguanling]: string;
        [GameOrderType.Chaojilicai]: string;
        [GameOrderType.Zhizunlicai]: string;
    };
    /**战令类型数值文本*/
    const GameOrderTypeStr: {
        [GameOrderType.Chuangguanling]: string;
        [GameOrderType.Huoyueling]: string;
        [GameOrderType.Yaojiling]: string;
        [GameOrderType.XiuXian]: string;
        [GameOrderType.Tansuo]: string;
        [GameOrderType.Huanjing]: string;
        [GameOrderType.Chaojilicai]: string;
        [GameOrderType.Zhizunlicai]: string;
    };
    /**战令类型解锁弹窗标题*/
    const GameOrderUnlockTitle: {
        [GameOrderType.Chuangguanling]: string;
        [GameOrderType.Huoyueling]: string;
        [GameOrderType.Yaojiling]: string;
        [GameOrderType.XiuXian]: string;
        [GameOrderType.Tansuo]: string;
        [GameOrderType.Huanjing]: string;
        [GameOrderType.Chaojilicai]: string;
        [GameOrderType.Zhizunlicai]: string;
    };
    /**特权令类型*/
    const enum PrerogativeWritType {
        /**玉清*/
        Yuqing = 1,
        /**上清*/
        Shangqing = 2,
        /**太清*/
        Taiqing = 3
    }
    /**成神在即类型*/
    const enum ChengshenType {
        Summon = 1,
        Pass = 2
    }
    /**成神在即奖励状态*/
    const enum ChengshenRewardState {
        CanDraw = 1,
        HasDraw = 2
    }
    /**通天阁排行榜类型*/
    const enum TongtiangeRankType {
        Personal = 1,
        Guild = 2
    }
    /**通用榜请求数据类型*/
    const enum RankOpType {
        Rank = 1,
        LastRank = 2,
        Reward = 3
    }
    const enum FlyRankRewardType {
        Rank = 1,
        Top = 2
    }
    const enum GiftBuyType {
        Xianyu = 1,
        Rmb = 2
    }
    const enum FlyWarRewardType {
        Normal = 1,
        War = 2
    }
    const enum XianchiOpType {
        Draw = 1,
        Big = 2
    }
    const enum TehuiType {
        /**特惠礼包 */
        TehuiLibao = 1,
        /**进阶特惠 */
        JinjieTehui = 2,
        /**修仙阶级 */
        XiuXianJieji = 3
    }
    const enum TiannvWelfareOpType {
        Tiannv = 1,
        Vip = 2
    }
    /**登录奖励类型*/
    const enum LoginRewardType {
        Login = 1,
        Vip = 2
    }
    /**招财仙基金类型*/
    const enum ZcxFundType {
        Fuli = 1,
        Chaoji = 2
    }
    /**浮尘灵壶操作类型 1召唤（次数） 2切换卡池（类型） 3许愿（索引） 4特殊卡池召唤 5赠礼奖励 6宝藏奖励 7累充奖励 8礼包*/
    const enum FuchenlinghuOperType {
        Oper1 = 1,
        Oper2 = 2,
        Oper3 = 3,
        Oper4 = 4,
        Oper5 = 5,
        Oper6 = 6,
        Oper7 = 7,
        Oper8 = 8
    }
    /**召唤特效界面类型*/
    const enum SummonEffectType {
        Summon = 1,
        Fuchenlinghu = 2,
        Linghuxianling = 3
    }
}
declare namespace game {
    /**支付事件*/
    const enum PayEvent {
        ON_DIRECT_BUY_UPDATE = "on_direct_buy_update"
    }
    /**商品id*/
    const enum ProductId {
        Id100010 = 100010,
        Id100011 = 100011,
        Id100012 = 100012,
        Id100013 = 100013,
        Id100014 = 100014,
        Id100015 = 100015,
        Id200006 = 200006,
        Id200304 = 200304,
        Id201302 = 201302,
        Id201401 = 201401,
        Id201501 = 201501,
        Id201502 = 201502,
        Id201503 = 201503,
        Id201801 = 201801,
        Id201901 = 201901,
        Id201902 = 201902,
        Id201903 = 201903
    }
}
declare namespace game {
    const enum RoleEvent {
        ON_ROLE_UPDATE = "on_role_update",
        ON_SERVER_DAY_UPDATE = "on_server_day_update",
        ON_ROLE_PRIVILEGE_UPDATE = "on_role_privilege_update",
        ON_XIUXIANNVPU_INFO_UPDATE = "on_xiuxiannvpu_info_update",
        ON_XIUXIANNVPU_OFFLINE_REWARD_UPDATE = "on_xiuxiannvpu_offline_reward_update",
        ON_XIUXIANNVPU_OFFLINESETTING_SELECT = "on_xiuxiannvpu_offlineSetting_select",
        ON_XIUXIANNVPU_OFFLINESETTING_SELECT_DEL = "on_xiuxiannvpu_offlineSetting_select_del",
        /**修仙女仆特殊处理，可携带参数boolean，重置30秒cd
         * （扫荡结算界面关闭，扫荡协议处理，挑战结算界面关闭，手动退出boss挑战等等抛出）*/
        ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT = "on_xiuxiannvpu_special_challenge_next"
    }
    /** 称号事件*/
    const enum TitleEvent {
        TITLE_INFO_UPDATE = "title_info_update"
    }
    const enum DressUpEvent {
        DRESS_UP_ITEM_CLICK_BACK = "dress_up_item_click_back",
        DRESS_UP_INFO_UPDATE = "DRESS_UP_INFO_UPDATE"
    }
    /**装扮类型 1:头像 2:相框 3:气泡*/
    const enum DressUpType {
        Head = 1,
        Frame = 2,
        Bubble = 3
    }
    const enum SuitEvent {
        ON_SUIT_EQUIP_INFO_UPDATE = "ON_SUIT_EQUIP_INFO_UPDATE",
        ON_SUIT_COMPOSE_SELECT_UPDATE = "ON_SUIT_COMPOSE_SELECT_UPDATE",
        ON_SUIT_EQUIP_INFO_UPDATE_TWO = "ON_SUIT_EQUIP_INFO_UPDATE_TWO",
        ON_SUIT_DUANZAO_SWITCH_ICON_INFO = "ON_SUIT_DUANZAO_SWITCH_ICON_INFO",
        ON_SUIT_EQUIP_SYNTHESIS_UPDATE = "on_suit_equip_synthesis_update"
    }
    /**套装类型*/
    const enum SuitType {
        CangTian = 1,
        YanTian = 2,
        HaoTian = 3,
        XuanTian = 4,
        JunTian = 5
    }
    /**套装类型名*/
    const SuitTypeName: {
        [SuitType.CangTian]: string;
        [SuitType.YanTian]: string;
        [SuitType.HaoTian]: string;
        [SuitType.XuanTian]: string;
        [SuitType.JunTian]: string;
    };
    /**套装操作类型*/
    const enum SuitOperType {
        JinJie = 1,
        DuanZao = 2,
        JingZhu = 3
    }
    /**套装类型对应的功能开启id*/
    const SuitTypeOpenIdx: {
        [SuitType.CangTian]: OpenIdx;
        [SuitType.YanTian]: OpenIdx;
        [SuitType.HaoTian]: OpenIdx;
        [SuitType.XuanTian]: OpenIdx;
        [SuitType.JunTian]: OpenIdx;
    };
    /**不同套装不同部位展示的属性*/
    const SuitTypePosAttr: {
        [EquipPos.SWORD]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.CLOTHES]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.BELT]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.PANTS]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.NECKLACE]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.JADE]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.SHOULDER]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.HELMET]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.BOOT]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
        [EquipPos.RING]: {
            [SuitType.HaoTian]: string[];
            [SuitType.XuanTian]: string[];
            [SuitType.JunTian]: string[];
        };
    };
    /**套装类型1,2的装备部位 从左到右从上到下 0 5 1 6 2 7 3 4*/
    const SuitEquipPosAry: EquipPos[];
    /**套装类型3,4,5的装备部位 todo 跟EquipPosAry一样*/
    const SuitEquipPosAry1: EquipPos[];
    /**通用激活条件类型，类型在RoleUtil映射*/
    const enum CommonLimitType {
        Rebirth = 1,
        Pass = 2,
        God = 3,
        Power = 4
    }
    /**属性定义字段，目前只有特殊的属性才需要定义*/
    const enum AttrKey {
        max_hp = "max_hp",
        god = "god",
        god_rate = "god_rate",
        god_atk = "god_atk",
        god_def = "god_def",
        god_hp = "god_hp",
        wind_val = "wind_val",
        mine_val = "mine_val",
        water_val = "water_val",
        fire_val = "fire_val",
        wind_atk = "wind_atk",
        mine_atk = "mine_atk",
        water_atk = "water_atk",
        fire_atk = "fire_atk",
        skill_add_damage = "skill_add_damage",
        crit = "crit",
        critval = "critval",
        cd = "cd",
        theGod_addtime = "theGod_addtime",
        legion_god = "legion_god",
        child_crit = "child_crit"
    }
    /**角色属性定义字段*/
    const enum RolePropertyKey {
        role_id = "role_id",
        exp = "exp",
        levelup_exp = "levelup_exp",
        name = "name",
        level = "level",
        sex = "sex",
        reincarnate = "reincarnate",
        vip_lv = "vip_lv",
        head = "head",
        head_frame = "head_frame",
        showpower = "showpower",
        title_index = "title_index",
        charge_rmb = "charge_rmb",
        day_charge_rmb = "day_charge_rmb",
        gold = "gold",
        diamond = "diamond",
        lingqi = "lingqi",
        godess = "godess",
        wood = "wood",
        maiqi = "maiqi",
        xianqi = "xianqi",
        jingjibi = "jjb",
        Fscoin = "fscoin",
        Ylcoin = "ylcoin",
        Dlcoin = "dlcoin",
        Lmcoin = "lmcoin",
        Xzcoin = "xzcoin",
        Pretige = "pretige",
        Sgcoin = "sgcoin",
        Gfjs = "gfjs",
        GuildTiantan = "guild_tiantan",
        GuildShengtan = "guild_shengtan",
        LingliPoint1 = "feng_linglipoint",
        LingliPoint2 = "lei_linglipoint",
        LingliPoint3 = "shui_linglipoint",
        LingliPoint4 = "huo_linglipoint",
        LingliPoint5 = "guang_linglipoint",
        LingliPoint6 = "an_linglipoint",
        Xtlqcoin = "xtlqcoin",
        Ssscoin = "ssscoin",
        chengjiu_jifen = "chengjiu_jifen",
        Tianxingzhu = "attic_point",
        storage_time = "storage_time",
        feisheng_exp = "feisheng_exp",
        huashen_exp = "huashen_exp",
        caiyun_yinji = "caiyun_yinji",
        GuildScore = "guild_score",
        GuildXianshouExp = "guild_xianshou_exp",
        xingshi = "xingshi",
        zhandui_jitan_value = "zhandui_jitan_value",
        zhandui_jitan_shuijin = "zhandui_jitan_shuijin",
        zhandui_jitan_total_speed_time = "zhandui_jitan_total_speed_time",
        cs_nvshen_qinmi = "cs_nvshen_qinmi",
        cs_nvshen_total_speed_time = "cs_nvshen_total_speed_time",
        fengmo_score = "fengmo_score",
        xianmai_score = "xianmai_score",
        xjzh_nl = "xjzh_nl",
        sjzh_nl = "sjzh_nl",
        sgjzh_nl = "sgjzh_nl",
        huanggu_shuijing = "huanggu_shuijing",
        xianqi_value = "xianqi_value"
    }
    /**Vo属性Long需要转化成number的字段*/
    const RoleLongKeys: string[];
    /**道具index转化成角色属性key，只有货币类型才需要定义*/
    const PropIndexToKey: {
        [index: number]: string;
    };
    /**角色特权定义字段*/
    const enum RolePrivilegeKey {
        item_auto = "item_auto",
        bag_box = "bag_box",
        lingchi_income = "lingchi_income",
        wander_answer = "wander_answer",
        main_add_maxexp = "main_add_maxexp",
        multiple_boss_count = "multiple_boss_count",
        huanggu_shuijing = "huanggu_shuijing",
        cs_nvshen_open = "cs_nvshen_open",
        zong_sweep = "zong_sweep"
    }
    /**仙力详情字段*/
    const enum RoleGodKey {
        Body = "\u65F6\u88C5",
        Wing = "\u7FBD\u7FFC",
        Weapon = "\u795E\u5175",
        Horse = "\u5750\u9A91",
        Tianshen = "\u5143\u7075",
        Shenling = "\u795E\u7075",
        Xiuxian = "\u4FEE\u4ED9",
        XianlvChild = "\u5B50\u5973",
        Huashen = "\u5316\u795E",
        Xianjian = "\u4ED9\u5251"
    }
    const RoleGodKeyToConfigHead: {
        [key: string]: number;
    };
    /**修仙女仆在线挂机类型*/
    const enum XiuxianNvpuEventType {
        ManyBoss = 1,
        Zhuimoshenyuan = 2,
        Yijie = 3,
        Youli = 4,
        Doufa = 5,
        Xianlvshilian = 6,
        Xianlvdoufa = 7,
        Xianzongfengmo = 8,
        PersonalBoss = 9,
        VipBoss = 10,
        Fengmoshengdian = 11,
        Jinguibaoxue = 12,
        Penglaixianjing = 13,
        KuafuBoss = 14,
        Wanjianxianta = 15,
        Lingshouxianta = 16,
        Huanggujindi = 17,
        Xianlingjindi = 18,
        Tianzhijindi = 19,
        Shenzhijindi = 20,
        Xianmai = 21
    }
    const FubenToNvpuEventType: {
        [FubenType.Type1]: XiuxianNvpuEventType;
        [FubenType.Type2]: XiuxianNvpuEventType;
        [FubenType.Type3]: XiuxianNvpuEventType;
    };
    const XiantaTypeToNvpuEventType: {
        [FubenType.Type1]: XiuxianNvpuEventType;
        [FubenType.Type2]: XiuxianNvpuEventType;
    };
    const JindiToNvpuEventType: {
        [ForbiddenType.Type2]: XiuxianNvpuEventType;
        [ForbiddenType.Type3]: XiuxianNvpuEventType;
        [ForbiddenType.Type4]: XiuxianNvpuEventType;
        [ForbiddenType.Type5]: XiuxianNvpuEventType;
    };
}
declare namespace game {
    const enum ShilianEvent {
        ON_FUBEN_INFO_UPDATE = "on_fuben_info_update",
        ON_FUBEN_SCENE_UPDATE = "on_fuben_scene_update",
        ON_FUBEN_SKIP_UPDATE = "on_fuben_skip_update",
        ON_FORBIDDEN_INFO_UPDATE = "on_forbidden_info_update",
        ON_FORBIDDEN_AWD_UPDATE = "on_forbidden_awd_update",
        ON_XIANTA_INFO_UPDATE = "on_xianta_info_update",
        /**元灵试炼*/
        ON_YUANLING_INFO_UPDATE = "on_yuanling_info_update",
        ON_YUANLING_TEAM_LIST_UPDATE = "on_yuanling_team_list_update",
        ON_YUANLING_TEAM_INFO_UPDATE = "on_yuanling_team_info_update",
        ON_YUANLING_BUFF_INFO_UPDATE = "on_yuanling_buff_info_update",
        ON_YUANLING_TEAM_INVITE = "on_yuanling_team_invite",
        ON_YUANLING_TEAM_INVITE_BTN = "on_yuanling_team_invite_btn",
        ON_YUANLING_ROLE_LIST_UPDATE = "on_yuanling_role_list_update",
        ON_YUANLING_JUMP_TO_VIEW = "on_yuanling_jump_to_view",
        ON_YUANLING_INVITE_LIST_ITEM_DELETE = "on_yuanling_invite_list_item_delete",
        ON_YUANLING_FUBEN_INFO_UPDATE = "on_yuanling_fuben_info_update",
        ON_YUANLING_DAMAGE_INFO_UPDATE = "on_yuanling_damage_info_update"
    }
    /**副本类型*/
    const enum FubenType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3
    }
    /**禁地副本类型*/
    const enum ForbiddenType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5
    }
    const ForbiddenTypeName: {
        [ForbiddenType.Type1]: string;
        [ForbiddenType.Type2]: string;
        [ForbiddenType.Type3]: string;
        [ForbiddenType.Type4]: string;
        [ForbiddenType.Type5]: string;
    };
    const YuanLingDiffAry: string[];
}
declare namespace game {
    const enum TaskEvent {
        ON_TASK_UPDATE = "on_task_update",
        ON_TASK_HINT = "on_task_hint"
    }
    const enum TaskOpType {
        /** 全部 */
        All = 1,
        /** 部分更新 */
        Update = 2,
        /** 删除 */
        Del = 3
    }
    const enum TaskStatus {
        NotFinish = 0,
        Finish = 1,
        Draw = 2
    }
    const enum TaskType {
        Main = 1,
        Xiuxian = 3,
        Qiyuan = 34,
        Liveness = 35,
        /**瑶姬降世*/
        Yaojijiangshi = 36,
        /**成神在即*/
        Chengshen = 37,
        /**仙侣*/
        Xianlv = 38,
        Achieve = 39,
        Huashen = 40,
        PunshList = 41,
        ShenlingEvolve = 42,
        Fly = 43,
        HuashenZhilu = 44,
        HuashenZhanshendian = 45,
        UnionBeast = 47,
        Mining = 48,
        XujieTansuo = 49,
        Sea1 = 50,
        Sea2 = 51,
        Sea3 = 52,
        KuafuDoufa = 53,
        Honour = 55
    }
}
declare namespace game {
    const enum UIEftSrc {
        Box = "box",
        Guide = "guide",
        Xianlu_1 = "xianlu_1",
        Xianlu_2 = "xianlu_2",
        Xianlu_3 = "xianlu_3",
        Xianlu_4 = "xianlu_4",
        Xianlu_5 = "xianlu_5",
        Xianlu_6 = "xianlu_6",
        Xianlu_7 = "xianlu_7",
        Xianlu_8 = "xianlu_8",
        Fuben_1 = "fuben_1",
        Fuben_5 = "fuben_5",
        CurPass = "chuangguanfight",
        Chuangguanboss = "chuangguanboss",
        Chuangguanbeijing = "chuangguanbeijing",
        Chuangguanling = "chuangguanling",
        Tiaozhan = "tiaozhan",
        Baoxiang = "baoxiang",
        Paihangbangtouming = "paihangbangtouming",
        Guajishouyi = "guajishouyi",
        Jiesuochuangguanling = "jiesuochuangguanling",
        CrossBoss1 = "kuafuboss_1",
        RoleRing1 = "zhujueguanghuan1",
        RoleRing2 = "zhujueguanghuan2",
        RoleRingBall = "zhujueguanghuan_qiu",
        RoleRingWater = "zhujueguanghuan_shui",
        YouliBg = "youlibeijing",
        Yishoujineng = "yishoujineng",
        Nvshentexiao = "nvshentexiao",
        /************************以下是公共特效*******************/
        Xianli = "xianli",
        Showpower = "showpower",
        SurfacePill = "surface_pill",
        SurfaceSel = "surface_sel",
        SurfaceTips = "jihuo",
        Success = "success",
        TipsBg = "tips_bg",
        Btn = "btn",
        Vip = "VIP",
        Richang_1 = "richang_1",
        UpEffect2 = "richang_2",
        ShouChongQianWang = "chongzhi",
        UpStar1 = "shengxing_huoyan",
        UpStar2 = "shengxing_qiu",
        UpStar3 = "shengxing_shuimian",
        PropEffect = "daojushanguang",
        Gift = "jinjielibao",
        BossComing = "boss_coming",
        CommonBox = "tongyongbaoxiang",
        DaJiangDiZuo = "dajiangdizuo",
        VS = "VS",
        StartFighting = "startfighting",
        Victory = "victory",
        Default = "default",
        Fanpai1 = "fanpai0",
        Fanpai2 = "fanpai1",
        Fanpai3 = "fanpai2",
        Fanpai = "zhaohuanguangzhu",
        Zhaohuananniu = "zhaohuananniu",
        Zhaohuanbeijing = "zhaohuanbeijing",
        Dajiangtishi = "dajiangtishi",
        Bigreward = "bigreward",
        Highquality = "highquality",
        Jinhua1 = "jinhua_1",
        Jinhua2 = "jinhua_2",
        Jinhua3 = "jinhua_3",
        Jinhua4 = "jinhua_4",
        Shenqitupo = "shenqitupo",
        Backcard1 = "backcard1",
        Backcard2 = "backcard2",
        Backcard4 = "backcard4",
        Card1 = "card1",
        Card2 = "card2",
        TurnCard1 = "turncard1",
        TurnCard2 = "turncard2",
        TurnCard4 = "turncard4",
        ActBtnEffect = "icon_rotate",
        SweepBtnEffect = "tubiaosaoguang",
        ProgressEft = "jindutiao",
        Choose = "choose",
        QiangHuaJianTou = "qianghuajiantou",
        ClickEff = "click",
        ZhanDouShengli1 = "zhandoushengli1",
        FeiShengBang = "feishengbang",
        Luolei = "luolei",
        Nvshenlu = "nvshenlu",
        HuangGuTianGong = "huanggutiangong",
        NvShenJuSuo = "nvshenjusuo",
        WanXianTai = "wanxiantai",
        BuZhouShan = "buzhoushan",
        LeiZe = "leize",
        QingQiuZhiGuo = "qingqiuzhiguo",
        PengLaiDao = "penglaidao",
        KunLunJing = "kunlunjing",
        Huanggushenqi = "huanggushenqi",
        Xianweizhengduo = "xianweizhengduo",
        XiTongJiHuo = "xitongjihuo",
        TaoZhuangJiNeng = "taozhuangjineng",
        GongFengDiZuo = "gongfengdizuo",
        WanChengGongFeng = "wanchenggongfeng",
        FangRuGongPin = "fangrugongpin",
        XuJieCloud = "xujiecloud",
        XingKongGuDing = "xingkongguding",
        HuanJingFangDian = "huanjingfangdian",
        HuaShenJiNeng = "huashenjineng",
        HuaShenNengLiangTiao = "huashennengliangtiao"
    }
    const enum SuccessTipsType {
        Act = 1,
        Up = 2,
        Xiangqian = 3,
        Compose = 4,
        Melt = 5,
        Upstage = 6,
        Strength = 7,
        Break = 8,
        Addstage = 9,
        Task = 10,
        Star = 11
    }
    /**固定帧率的特效*/
    const UIEftSrcFrame: {
        [UIEftSrc.BossComing]: number;
    };
}
declare namespace game {
    const enum ResultEvent {
        ON_RESULT_POPUP = "on_result_popup"
    }
}
declare namespace game {
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;
    import EquipmentConfig = game.config.EquipmentConfig;
    /**
     * 经常调用的配置接口，可统一写在此处
     */
    class GameConfig {
        static getParamConfigById(id: number | string): ParamConfig;
        static getPropConfigById(id: number | string): PropConfig;
        static getEquipmentCfg(id: number): EquipmentConfig;
    }
    function getConfigByName(name: string): object;
    function getConfigListByName(name: string): any[];
    function getConfigByNameId(name: string, id: string | number): any;
    function getConfigById(id: string | number): any;
    function getLanById(id: string | number): string;
    function getConfigZh(): void;
    function getProxy<T extends base.IProxy>(modName: ModName, proxyType: ProxyType): T;
}
declare namespace game {
    const enum Reason {
        ID_2 = 2,
        ID_3 = 3,
        ID_4 = 4,
        ID_5 = 5,
        ID_6 = 6,
        ID_7 = 7,
        ID_8 = 8,
        ID_9 = 9,
        ID_10 = 10,
        ID_11 = 11,
        ID_12 = 12,
        ID_13 = 13,
        ID_14 = 14,
        ID_15 = 15,
        ID_16 = 16,
        ID_17 = 17,
        ID_18 = 18,
        ID_19 = 19,
        ID_20 = 20,
        ID_21 = 21,
        ID_22 = 22,
        ID_23 = 23,
        ID_24 = 24,
        ID_25 = 25,
        ID_26 = 26,
        ID_27 = 27,
        ID_28 = 28,
        ID_29 = 29,
        ID_30 = 30,
        ID_31 = 31,
        ID_32 = 32,
        ID_33 = 33,
        ID_34 = 34,
        ID_35 = 35,
        ID_36 = 36,
        ID_37 = 37,
        ID_38 = 38,
        ID_39 = 39,
        ID_40 = 40,
        ID_41 = 41,
        ID_42 = 42,
        ID_43 = 43,
        ID_44 = 44,
        ID_45 = 45,
        ID_46 = 46,
        ID_47 = 47,
        ID_48 = 48,
        ID_49 = 49,
        ID_50 = 50,
        ID_51 = 51,
        ID_52 = 52,
        ID_53 = 53,
        ID_54 = 54,
        ID_55 = 55,
        ID_56 = 56,
        ID_57 = 57,
        ID_58 = 58,
        ID_59 = 59,
        ID_60 = 60,
        ID_61 = 61,
        ID_62 = 62,
        ID_63 = 63,
        ID_64 = 64,
        ID_65 = 65,
        ID_66 = 66,
        ID_67 = 67,
        ID_68 = 68,
        ID_69 = 69,
        ID_70 = 70,
        ID_71 = 71,
        ID_72 = 72,
        ID_73 = 73,
        ID_74 = 74,
        ID_75 = 75,
        ID_76 = 76,
        ID_77 = 77,
        ID_78 = 78,
        ID_79 = 79,
        ID_80 = 80,
        ID_81 = 81,
        ID_82 = 82,
        ID_83 = 83,
        ID_84 = 84,
        ID_85 = 85,
        ID_86 = 86,
        ID_87 = 87,
        ID_88 = 88,
        ID_89 = 89,
        ID_90 = 90,
        ID_91 = 91,
        ID_92 = 92,
        ID_93 = 93,
        ID_94 = 94,
        ID_95 = 95,
        ID_96 = 96,
        ID_97 = 97,
        ID_98 = 98,
        ID_99 = 99,
        ID_100 = 100,
        ID_101 = 101,
        ID_102 = 102,
        ID_103 = 103,
        ID_104 = 104,
        ID_105 = 105,
        ID_106 = 106,
        ID_107 = 107,
        ID_108 = 108,
        ID_109 = 109,
        ID_110 = 110,
        ID_111 = 111,
        ID_112 = 112,
        ID_113 = 113,
        ID_114 = 114,
        ID_115 = 115,
        ID_116 = 116,
        ID_117 = 117,
        ID_118 = 118,
        ID_119 = 119,
        ID_120 = 120,
        ID_121 = 121,
        ID_122 = 122,
        ID_123 = 123,
        ID_124 = 124,
        ID_125 = 125,
        ID_126 = 126,
        ID_127 = 127,
        ID_128 = 128,
        ID_129 = 129,
        ID_130 = 130,
        ID_131 = 131,
        ID_132 = 132,
        ID_133 = 133,
        ID_134 = 134,
        ID_135 = 135,
        ID_136 = 136,
        ID_137 = 137,
        ID_138 = 138,
        ID_139 = 139,
        ID_140 = 140,
        ID_141 = 141,
        ID_142 = 142,
        ID_143 = 143,
        ID_144 = 144,
        ID_145 = 145,
        ID_146 = 146,
        ID_147 = 147,
        ID_148 = 148,
        ID_149 = 149,
        ID_150 = 150,
        ID_151 = 151,
        ID_152 = 152,
        ID_153 = 153,
        ID_154 = 154,
        ID_155 = 155,
        ID_156 = 156,
        ID_157 = 157,
        ID_158 = 158,
        ID_159 = 159,
        ID_160 = 160,
        ID_161 = 161,
        ID_162 = 162,
        ID_163 = 163,
        ID_164 = 164,
        ID_165 = 165,
        ID_166 = 166,
        ID_167 = 167,
        ID_168 = 168,
        ID_169 = 169,
        ID_170 = 170,
        ID_171 = 171,
        ID_172 = 172,
        ID_173 = 173,
        ID_174 = 174,
        ID_175 = 175,
        ID_176 = 176,
        ID_177 = 177,
        ID_178 = 178,
        ID_179 = 179,
        ID_180 = 180,
        ID_181 = 181,
        ID_182 = 182,
        ID_183 = 183,
        ID_184 = 184,
        ID_185 = 185,
        ID_186 = 186,
        ID_187 = 187,
        ID_188 = 188,
        ID_189 = 189,
        ID_190 = 190,
        ID_191 = 191,
        ID_192 = 192,
        ID_193 = 193,
        ID_194 = 194,
        ID_195 = 195,
        ID_196 = 196,
        ID_197 = 197,
        ID_198 = 198,
        ID_199 = 199,
        ID_200 = 200,
        ID_201 = 201,
        ID_202 = 202,
        ID_203 = 203,
        ID_204 = 204,
        ID_205 = 205,
        ID_206 = 206,
        ID_207 = 207,
        ID_208 = 208,
        ID_209 = 209,
        ID_210 = 210,
        ID_211 = 211,
        ID_212 = 212,
        ID_213 = 213,
        ID_214 = 214,
        ID_215 = 215,
        ID_216 = 216,
        ID_217 = 217,
        ID_218 = 218,
        ID_219 = 219,
        ID_220 = 220,
        ID_221 = 221,
        ID_222 = 222,
        ID_223 = 223,
        ID_224 = 224,
        ID_225 = 225,
        ID_226 = 226,
        ID_227 = 227,
        ID_228 = 228,
        ID_229 = 229,
        ID_230 = 230,
        ID_231 = 231,
        ID_232 = 232,
        ID_233 = 233,
        ID_234 = 234,
        ID_531 = 531,
        ID_532 = 532,
        ID_533 = 533,
        ID_534 = 534,
        ID_535 = 535,
        ID_536 = 536,
        ID_537 = 537,
        ID_538 = 538,
        ID_539 = 539,
        ID_540 = 540,
        ID_541 = 541,
        ID_542 = 542,
        ID_543 = 543,
        ID_544 = 544,
        ID_545 = 545,
        ID_546 = 546,
        ID_547 = 547,
        ID_548 = 548,
        ID_549 = 549,
        ID_550 = 550,
        ID_551 = 551,
        ID_552 = 552,
        ID_553 = 553,
        ID_554 = 554,
        ID_555 = 555,
        ID_556 = 556,
        ID_557 = 557,
        ID_558 = 558,
        ID_559 = 559,
        ID_560 = 560,
        ID_561 = 561,
        ID_562 = 562,
        ID_563 = 563,
        ID_564 = 564,
        ID_565 = 565,
        ID_566 = 566,
        ID_567 = 567,
        ID_568 = 568,
        ID_569 = 569,
        ID_570 = 570,
        ID_571 = 571,
        ID_572 = 572,
        ID_573 = 573,
        ID_574 = 574,
        ID_575 = 575,
        ID_576 = 576,
        ID_577 = 577,
        ID_578 = 578,
        ID_579 = 579,
        ID_580 = 580,
        ID_581 = 581,
        ID_582 = 582,
        ID_583 = 583,
        ID_584 = 584,
        ID_585 = 585,
        ID_586 = 586,
        ID_587 = 587,
        ID_588 = 588,
        ID_589 = 589,
        ID_590 = 590,
        ID_591 = 591,
        ID_592 = 592,
        ID_593 = 593,
        ID_594 = 594,
        ID_595 = 595,
        ID_596 = 596,
        ID_597 = 597,
        ID_598 = 598,
        ID_599 = 599,
        ID_600 = 600,
        ID_601 = 601,
        ID_602 = 602,
        ID_603 = 603,
        ID_604 = 604,
        ID_605 = 605,
        ID_606 = 606,
        ID_607 = 607,
        ID_608 = 608,
        ID_609 = 609,
        ID_610 = 610,
        ID_611 = 611,
        ID_612 = 612,
        ID_613 = 613,
        ID_614 = 614,
        ID_615 = 615,
        ID_616 = 616,
        ID_617 = 617,
        ID_618 = 618,
        ID_619 = 619,
        ID_620 = 620,
        ID_621 = 621,
        ID_622 = 622,
        ID_623 = 623,
        ID_624 = 624,
        ID_625 = 625,
        ID_626 = 626,
        ID_627 = 627,
        ID_628 = 628,
        ID_629 = 629,
        ID_630 = 630,
        ID_631 = 631,
        ID_632 = 632,
        ID_633 = 633,
        ID_634 = 634,
        ID_635 = 635,
        ID_636 = 636,
        ID_637 = 637,
        ID_638 = 638,
        ID_639 = 639,
        ID_640 = 640,
        ID_641 = 641,
        ID_642 = 642,
        ID_643 = 643,
        ID_644 = 644,
        ID_645 = 645,
        ID_646 = 646,
        ID_647 = 647,
        ID_648 = 648,
        ID_649 = 649,
        ID_650 = 650,
        ID_651 = 651,
        ID_652 = 652,
        ID_653 = 653,
        ID_654 = 654,
        ID_655 = 655,
        ID_656 = 656,
        ID_657 = 657,
        ID_658 = 658,
        ID_659 = 659,
        ID_660 = 660,
        ID_661 = 661,
        ID_662 = 662,
        ID_663 = 663,
        ID_664 = 664,
        ID_665 = 665,
        ID_666 = 666,
        ID_667 = 667,
        ID_668 = 668,
        ID_669 = 669,
        ID_670 = 670,
        ID_671 = 671,
        ID_672 = 672,
        ID_673 = 673,
        ID_674 = 674,
        ID_675 = 675,
        ID_676 = 676,
        ID_677 = 677,
        ID_678 = 678,
        ID_679 = 679,
        ID_680 = 680,
        ID_681 = 681,
        ID_682 = 682,
        ID_683 = 683,
        ID_684 = 684,
        ID_685 = 685,
        ID_686 = 686,
        ID_687 = 687,
        ID_688 = 688,
        ID_689 = 689,
        ID_690 = 690,
        ID_691 = 691,
        ID_692 = 692,
        ID_693 = 693,
        ID_694 = 694,
        ID_695 = 695,
        ID_696 = 696,
        ID_697 = 697,
        ID_698 = 698,
        ID_699 = 699,
        ID_700 = 700,
        ID_701 = 701,
        ID_702 = 702,
        ID_703 = 703,
        ID_704 = 704,
        ID_705 = 705,
        ID_706 = 706,
        ID_707 = 707,
        ID_708 = 708,
        ID_709 = 709,
        ID_710 = 710,
        ID_711 = 711,
        ID_712 = 712,
        ID_713 = 713,
        ID_714 = 714,
        ID_715 = 715,
        ID_716 = 716,
        ID_717 = 717,
        ID_718 = 718,
        ID_719 = 719,
        ID_720 = 720,
        ID_721 = 721,
        ID_722 = 722,
        ID_723 = 723,
        ID_724 = 724,
        ID_725 = 725,
        ID_726 = 726,
        ID_727 = 727,
        ID_728 = 728,
        ID_729 = 729,
        ID_730 = 730,
        ID_731 = 731,
        ID_732 = 732,
        ID_733 = 733,
        ID_734 = 734,
        ID_735 = 735,
        ID_736 = 736,
        ID_737 = 737,
        ID_738 = 738,
        ID_739 = 739,
        ID_740 = 740,
        ID_741 = 741,
        ID_742 = 742,
        ID_743 = 743,
        ID_744 = 744,
        ID_745 = 745,
        ID_746 = 746,
        ID_747 = 747,
        ID_748 = 748,
        ID_749 = 749,
        ID_750 = 750,
        ID_751 = 751,
        ID_752 = 752,
        ID_753 = 753,
        ID_754 = 754,
        ID_755 = 755,
        ID_756 = 756,
        ID_757 = 757,
        ID_758 = 758,
        ID_759 = 759,
        ID_760 = 760,
        ID_761 = 761,
        ID_762 = 762,
        ID_763 = 763,
        ID_764 = 764,
        ID_765 = 765,
        ID_766 = 766,
        ID_767 = 767,
        ID_768 = 768,
        ID_769 = 769,
        ID_770 = 770,
        ID_771 = 771,
        ID_772 = 772,
        ID_773 = 773,
        ID_774 = 774,
        ID_775 = 775,
        ID_776 = 776,
        ID_777 = 777,
        ID_778 = 778,
        ID_779 = 779,
        ID_780 = 780,
        ID_781 = 781,
        ID_782 = 782,
        ID_783 = 783,
        ID_784 = 784,
        ID_785 = 785,
        ID_786 = 786,
        ID_787 = 787,
        ID_788 = 788,
        ID_789 = 789,
        ID_790 = 790,
        ID_791 = 791,
        ID_792 = 792,
        ID_793 = 793,
        ID_794 = 794,
        ID_795 = 795,
        ID_796 = 796,
        ID_797 = 797,
        ID_798 = 798,
        ID_799 = 799,
        ID_800 = 800,
        ID_801 = 801,
        ID_802 = 802,
        ID_803 = 803,
        ID_804 = 804,
        ID_805 = 805,
        ID_806 = 806,
        ID_807 = 807,
        ID_808 = 808,
        ID_809 = 809,
        ID_810 = 810,
        ID_811 = 811,
        ID_812 = 812,
        ID_813 = 813,
        ID_814 = 814,
        ID_815 = 815,
        ID_816 = 816,
        ID_817 = 817,
        ID_818 = 818,
        ID_819 = 819,
        ID_820 = 820,
        ID_821 = 821,
        ID_822 = 822,
        ID_823 = 823,
        ID_824 = 824,
        ID_825 = 825,
        ID_826 = 826,
        ID_827 = 827,
        ID_828 = 828,
        ID_829 = 829,
        ID_830 = 830,
        ID_831 = 831,
        ID_832 = 832,
        ID_833 = 833,
        ID_834 = 834,
        ID_835 = 835,
        ID_836 = 836,
        ID_837 = 837,
        ID_838 = 838,
        ID_839 = 839,
        ID_840 = 840,
        ID_841 = 841,
        ID_842 = 842,
        ID_843 = 843,
        ID_844 = 844,
        ID_845 = 845,
        ID_846 = 846,
        ID_847 = 847,
        ID_848 = 848,
        ID_849 = 849,
        ID_850 = 850,
        ID_851 = 851,
        ID_852 = 852,
        ID_853 = 853,
        ID_854 = 854,
        ID_855 = 855,
        ID_856 = 856,
        ID_857 = 857,
        ID_858 = 858,
        ID_859 = 859,
        ID_860 = 860,
        ID_861 = 861,
        ID_862 = 862,
        ID_863 = 863,
        ID_864 = 864,
        ID_865 = 865,
        ID_866 = 866,
        ID_867 = 867,
        ID_868 = 868,
        ID_869 = 869,
        ID_870 = 870,
        ID_871 = 871,
        ID_872 = 872,
        ID_873 = 873,
        ID_874 = 874,
        ID_875 = 875,
        ID_876 = 876,
        ID_877 = 877,
        ID_878 = 878,
        ID_879 = 879,
        ID_880 = 880,
        ID_881 = 881,
        ID_882 = 882,
        ID_883 = 883,
        ID_884 = 884,
        ID_885 = 885,
        ID_886 = 886,
        ID_887 = 887,
        ID_888 = 888,
        ID_889 = 889,
        ID_890 = 890,
        ID_891 = 891,
        ID_892 = 892,
        ID_893 = 893,
        ID_894 = 894,
        ID_895 = 895,
        ID_896 = 896,
        ID_897 = 897,
        ID_898 = 898,
        ID_899 = 899,
        ID_900 = 900,
        ID_901 = 901,
        ID_902 = 902,
        ID_903 = 903,
        ID_904 = 904,
        ID_905 = 905,
        ID_906 = 906,
        ID_907 = 907,
        ID_908 = 908,
        ID_909 = 909,
        ID_910 = 910,
        ID_911 = 911,
        ID_912 = 912,
        ID_913 = 913,
        ID_914 = 914,
        ID_915 = 915,
        ID_916 = 916,
        ID_917 = 917,
        ID_918 = 918,
        ID_919 = 919,
        ID_920 = 920,
        ID_921 = 921,
        ID_922 = 922,
        ID_923 = 923,
        ID_924 = 924,
        ID_925 = 925,
        ID_926 = 926,
        ID_927 = 927,
        ID_928 = 928,
        ID_929 = 929,
        ID_930 = 930,
        ID_931 = 931,
        ID_932 = 932,
        ID_933 = 933,
        ID_934 = 934,
        ID_935 = 935,
        ID_936 = 936,
        ID_937 = 937,
        ID_938 = 938,
        ID_939 = 939,
        ID_940 = 940,
        ID_941 = 941,
        ID_942 = 942,
        ID_943 = 943,
        ID_944 = 944,
        ID_945 = 945,
        ID_946 = 946,
        ID_947 = 947,
        ID_948 = 948,
        ID_949 = 949,
        ID_950 = 950,
        ID_951 = 951,
        ID_952 = 952,
        ID_953 = 953,
        ID_954 = 954,
        ID_955 = 955,
        ID_956 = 956,
        ID_957 = 957,
        ID_958 = 958,
        ID_959 = 959,
        ID_960 = 960,
        ID_961 = 961,
        ID_962 = 962,
        ID_963 = 963,
        ID_964 = 964,
        ID_965 = 965,
        ID_966 = 966,
        ID_967 = 967,
        ID_968 = 968,
        ID_969 = 969,
        ID_970 = 970,
        ID_971 = 971,
        ID_972 = 972,
        ID_973 = 973,
        ID_974 = 974,
        ID_975 = 975,
        ID_976 = 976,
        ID_977 = 977,
        ID_978 = 978,
        ID_979 = 979,
        ID_980 = 980,
        ID_981 = 981,
        ID_982 = 982,
        ID_983 = 983,
        ID_984 = 984,
        ID_985 = 985,
        ID_986 = 986,
        ID_987 = 987,
        ID_988 = 988,
        ID_989 = 989,
        ID_990 = 990,
        ID_991 = 991,
        ID_992 = 992,
        ID_993 = 993,
        ID_994 = 994,
        ID_995 = 995,
        ID_996 = 996,
        ID_997 = 997,
        ID_998 = 998,
        ID_999 = 999,
        ID_1000 = 1000,
        ID_1001 = 1001,
        ID_1002 = 1002,
        ID_1003 = 1003,
        ID_1004 = 1004,
        ID_1005 = 1005,
        ID_1006 = 1006,
        ID_1007 = 1007,
        ID_1008 = 1008,
        ID_1009 = 1009,
        ID_1010 = 1010,
        ID_1011 = 1011,
        ID_1012 = 1012,
        ID_1013 = 1013,
        ID_1014 = 1014,
        ID_1015 = 1015,
        ID_1016 = 1016,
        ID_1017 = 1017,
        ID_1018 = 1018,
        ID_1019 = 1019,
        ID_1020 = 1020,
        ID_1021 = 1021,
        ID_1022 = 1022,
        ID_1023 = 1023,
        ID_1024 = 1024,
        ID_1025 = 1025,
        ID_1026 = 1026,
        ID_1027 = 1027,
        ID_1028 = 1028,
        ID_1029 = 1029,
        ID_1030 = 1030,
        ID_1031 = 1031,
        ID_1032 = 1032,
        ID_1033 = 1033,
        ID_1034 = 1034,
        ID_1035 = 1035,
        ID_1036 = 1036,
        ID_1037 = 1037,
        ID_1038 = 1038,
        ID_1039 = 1039,
        ID_1040 = 1040,
        ID_1041 = 1041,
        ID_1042 = 1042,
        ID_1043 = 1043,
        ID_1044 = 1044,
        ID_1045 = 1045,
        ID_1046 = 1046,
        ID_1047 = 1047,
        ID_1048 = 1048,
        ID_1049 = 1049,
        ID_1050 = 1050,
        ID_1051 = 1051,
        ID_1052 = 1052,
        ID_1053 = 1053,
        ID_1054 = 1054,
        ID_1055 = 1055,
        ID_1056 = 1056,
        ID_1057 = 1057,
        ID_1058 = 1058,
        ID_1059 = 1059,
        ID_1060 = 1060,
        ID_1061 = 1061,
        ID_1062 = 1062,
        ID_1063 = 1063,
        ID_1064 = 1064,
        ID_1065 = 1065,
        ID_1066 = 1066,
        ID_1067 = 1067,
        ID_1068 = 1068,
        ID_1069 = 1069,
        ID_1070 = 1070,
        ID_1071 = 1071,
        ID_1072 = 1072,
        ID_1073 = 1073,
        ID_1074 = 1074,
        ID_1075 = 1075,
        ID_1076 = 1076,
        ID_1077 = 1077,
        ID_1078 = 1078,
        ID_1079 = 1079,
        ID_1080 = 1080,
        ID_1081 = 1081,
        ID_1082 = 1082,
        ID_1083 = 1083,
        ID_1084 = 1084,
        ID_1085 = 1085,
        ID_1086 = 1086,
        ID_1087 = 1087,
        ID_1088 = 1088,
        ID_1089 = 1089,
        ID_1090 = 1090,
        ID_1091 = 1091,
        ID_1092 = 1092,
        ID_1093 = 1093,
        ID_1094 = 1094,
        ID_1095 = 1095,
        ID_1096 = 1096,
        ID_1097 = 1097,
        ID_1098 = 1098,
        ID_1099 = 1099,
        ID_1100 = 1100,
        ID_1101 = 1101,
        ID_1102 = 1102,
        ID_1103 = 1103,
        ID_1104 = 1104,
        ID_1105 = 1105,
        ID_1106 = 1106,
        ID_1107 = 1107,
        ID_1108 = 1108,
        ID_1109 = 1109,
        ID_1110 = 1110,
        ID_1111 = 1111,
        ID_1112 = 1112,
        ID_1113 = 1113,
        ID_1114 = 1114,
        ID_1115 = 1115,
        ID_1116 = 1116,
        ID_1117 = 1117,
        ID_1118 = 1118,
        ID_1119 = 1119,
        ID_1120 = 1120,
        ID_1121 = 1121,
        ID_1122 = 1122,
        ID_1123 = 1123,
        ID_1124 = 1124,
        ID_1125 = 1125,
        ID_1126 = 1126,
        ID_1127 = 1127,
        ID_1128 = 1128,
        ID_1129 = 1129,
        ID_1130 = 1130,
        ID_1131 = 1131,
        ID_1132 = 1132,
        ID_1133 = 1133,
        ID_1134 = 1134,
        ID_1135 = 1135,
        ID_1136 = 1136,
        ID_1137 = 1137,
        ID_1138 = 1138,
        ID_1139 = 1139,
        ID_1140 = 1140,
        ID_1141 = 1141,
        ID_1142 = 1142,
        ID_1143 = 1143,
        ID_1144 = 1144,
        ID_1145 = 1145,
        ID_1146 = 1146,
        ID_1147 = 1147,
        ID_1148 = 1148,
        ID_1149 = 1149,
        ID_1150 = 1150,
        ID_1151 = 1151,
        ID_1152 = 1152,
        ID_1153 = 1153,
        ID_1154 = 1154,
        ID_1155 = 1155,
        ID_1156 = 1156,
        ID_1157 = 1157,
        ID_1158 = 1158,
        ID_1159 = 1159,
        ID_1160 = 1160,
        ID_1161 = 1161,
        ID_1162 = 1162,
        ID_1163 = 1163,
        ID_1164 = 1164,
        ID_1165 = 1165,
        ID_1166 = 1166,
        ID_1167 = 1167,
        ID_1168 = 1168,
        ID_1169 = 1169,
        ID_1170 = 1170,
        ID_1171 = 1171,
        ID_1172 = 1172,
        ID_1173 = 1173,
        ID_1174 = 1174,
        ID_1175 = 1175,
        ID_1176 = 1176,
        ID_1177 = 1177,
        ID_1178 = 1178,
        ID_1179 = 1179,
        ID_1180 = 1180,
        ID_1181 = 1181,
        ID_1182 = 1182,
        ID_1183 = 1183,
        ID_1184 = 1184,
        ID_1185 = 1185,
        ID_1186 = 1186,
        ID_1187 = 1187,
        ID_1188 = 1188,
        ID_1189 = 1189,
        ID_1190 = 1190,
        ID_1191 = 1191,
        ID_1192 = 1192,
        ID_1193 = 1193,
        ID_1194 = 1194,
        ID_1195 = 1195,
        ID_1196 = 1196,
        ID_1197 = 1197,
        ID_1198 = 1198,
        ID_1199 = 1199,
        ID_1200 = 1200,
        ID_1201 = 1201,
        ID_1202 = 1202,
        ID_1203 = 1203,
        ID_1204 = 1204,
        ID_1205 = 1205,
        ID_1206 = 1206,
        ID_1207 = 1207,
        ID_1208 = 1208,
        ID_1209 = 1209,
        ID_1210 = 1210,
        ID_1211 = 1211,
        ID_1212 = 1212,
        ID_1213 = 1213,
        ID_1214 = 1214,
        ID_1215 = 1215,
        ID_1216 = 1216,
        ID_1217 = 1217,
        ID_1218 = 1218,
        ID_1219 = 1219,
        ID_1220 = 1220,
        ID_1221 = 1221,
        ID_1222 = 1222,
        ID_1223 = 1223,
        ID_1224 = 1224,
        ID_1225 = 1225,
        ID_1226 = 1226,
        ID_1227 = 1227,
        ID_1228 = 1228,
        ID_1229 = 1229,
        ID_1230 = 1230,
        ID_1231 = 1231,
        ID_1232 = 1232,
        ID_1233 = 1233,
        ID_1234 = 1234,
        ID_1235 = 1235,
        ID_1236 = 1236,
        ID_1237 = 1237,
        ID_1238 = 1238,
        ID_1239 = 1239,
        ID_1240 = 1240,
        ID_1241 = 1241,
        ID_1242 = 1242,
        ID_1243 = 1243,
        ID_1244 = 1244,
        ID_1245 = 1245,
        ID_1246 = 1246,
        ID_1247 = 1247,
        ID_1248 = 1248,
        ID_1249 = 1249,
        ID_1250 = 1250,
        ID_1251 = 1251,
        ID_1252 = 1252,
        ID_1253 = 1253,
        ID_1254 = 1254,
        ID_1255 = 1255,
        ID_1256 = 1256,
        ID_1257 = 1257,
        ID_1258 = 1258,
        ID_1259 = 1259,
        ID_1260 = 1260,
        ID_1261 = 1261,
        ID_1262 = 1262,
        ID_1263 = 1263,
        ID_1264 = 1264,
        ID_1265 = 1265,
        ID_1266 = 1266,
        ID_1267 = 1267,
        ID_1268 = 1268,
        ID_1269 = 1269,
        ID_1270 = 1270,
        ID_1271 = 1271,
        ID_1272 = 1272,
        ID_1273 = 1273,
        ID_1274 = 1274,
        ID_1275 = 1275,
        ID_1276 = 1276,
        ID_1277 = 1277,
        ID_1278 = 1278,
        ID_1279 = 1279,
        ID_1280 = 1280,
        ID_1281 = 1281,
        ID_1282 = 1282,
        ID_1283 = 1283,
        ID_1284 = 1284,
        ID_1285 = 1285,
        ID_1286 = 1286,
        ID_1287 = 1287,
        ID_1288 = 1288,
        ID_1289 = 1289,
        ID_1290 = 1290,
        ID_1291 = 1291,
        ID_1292 = 1292,
        ID_1293 = 1293,
        ID_1294 = 1294,
        ID_1295 = 1295,
        ID_1296 = 1296,
        ID_1297 = 1297,
        ID_1298 = 1298,
        ID_1299 = 1299,
        ID_1300 = 1300,
        ID_1301 = 1301,
        ID_1302 = 1302,
        ID_1303 = 1303,
        ID_1304 = 1304,
        ID_1305 = 1305,
        ID_1306 = 1306,
        ID_1307 = 1307,
        ID_1308 = 1308,
        ID_1309 = 1309,
        ID_1310 = 1310,
        ID_1311 = 1311,
        ID_1312 = 1312,
        ID_1313 = 1313,
        ID_1314 = 1314,
        ID_1315 = 1315,
        ID_1316 = 1316,
        ID_1317 = 1317,
        ID_1318 = 1318,
        ID_1319 = 1319,
        ID_1320 = 1320,
        ID_1321 = 1321,
        ID_1322 = 1322,
        ID_1323 = 1323,
        ID_1324 = 1324,
        ID_1325 = 1325,
        ID_1326 = 1326,
        ID_1327 = 1327,
        ID_1328 = 1328,
        ID_1329 = 1329,
        ID_1330 = 1330,
        ID_1331 = 1331,
        ID_1332 = 1332,
        ID_1333 = 1333,
        ID_1334 = 1334,
        ID_1335 = 1335,
        ID_1336 = 1336,
        ID_1337 = 1337,
        ID_1338 = 1338,
        ID_1339 = 1339,
        ID_1340 = 1340,
        ID_1341 = 1341,
        ID_1342 = 1342,
        ID_1343 = 1343,
        ID_1344 = 1344,
        ID_1345 = 1345,
        ID_1346 = 1346,
        ID_1347 = 1347,
        ID_1348 = 1348,
        ID_1349 = 1349,
        ID_1350 = 1350,
        ID_1351 = 1351,
        ID_1352 = 1352,
        ID_1353 = 1353,
        ID_1354 = 1354,
        ID_1355 = 1355,
        ID_1356 = 1356,
        ID_1357 = 1357,
        ID_1358 = 1358,
        ID_1359 = 1359,
        ID_1360 = 1360,
        ID_1361 = 1361,
        ID_1362 = 1362,
        ID_1363 = 1363,
        ID_1364 = 1364,
        ID_1365 = 1365,
        ID_1366 = 1366,
        ID_1367 = 1367,
        ID_1368 = 1368,
        ID_1369 = 1369,
        ID_1370 = 1370,
        ID_1371 = 1371,
        ID_1372 = 1372,
        ID_1373 = 1373,
        ID_1374 = 1374,
        ID_1375 = 1375,
        ID_1376 = 1376,
        ID_1377 = 1377,
        ID_1378 = 1378,
        ID_1379 = 1379,
        ID_1380 = 1380,
        ID_1381 = 1381,
        ID_1382 = 1382,
        ID_1383 = 1383,
        ID_1384 = 1384,
        ID_1385 = 1385,
        ID_1386 = 1386,
        ID_1387 = 1387,
        ID_1388 = 1388,
        ID_1389 = 1389,
        ID_1390 = 1390,
        ID_1391 = 1391,
        ID_1392 = 1392,
        ID_1393 = 1393,
        ID_1394 = 1394,
        ID_1395 = 1395,
        ID_1396 = 1396,
        ID_1397 = 1397,
        ID_1398 = 1398,
        ID_1399 = 1399,
        ID_1400 = 1400,
        ID_1401 = 1401,
        ID_1402 = 1402,
        ID_1403 = 1403,
        ID_1404 = 1404,
        ID_1405 = 1405,
        ID_1406 = 1406,
        ID_1407 = 1407,
        ID_1408 = 1408,
        ID_1409 = 1409,
        ID_1410 = 1410,
        ID_1411 = 1411
    }
}
declare namespace game {
    class Black {
        private static _ins;
        static ins(): Black;
        private _sp;
        constructor();
        private initUI;
        show(): void;
        hide(): void;
    }
}
declare namespace game {
    /**
     * 字体跳动
     */
    class BmpDanceComp extends eui.Component {
        private _container;
        private _delayCall;
        private _hub;
        constructor();
        protected onAddToStage(): void;
        protected onRemoveFromStage(): void;
        private createContainer;
        /**
         * 字体跳动，从头到尾不断循环
         * @param txt
         */
        updateDance(txt: string): void;
        private clearDelayCall;
        private danceFunc;
        private childDance;
    }
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;
    class CloudEffectCtr extends DisplayObjectContainer {
        private static _ins;
        static ins(): CloudEffectCtr;
        private img_bg0;
        private img_bg1;
        private _isTween;
        private _endHandle;
        private _handle;
        constructor();
        show(src?: string, _handler?: Handler, _endHandler?: Handler): void;
        private hideCloudEftShow;
        isCloudEfting(): boolean;
    }
}
declare namespace game {
    const enum BmpTextDir {
        Left = 1,
        Right = 2
    }
    const BmpTextCfg: {
        [x: number]: string;
    };
    const FontGap: {
        [x: string]: number;
    };
    const TextDuration = 35;
    const AtkRandomX: number[];
    const AtkRandomY: number[];
    const HitRandomX: number[];
    const HitRandomY: number[];
    const CritRandomX: number[];
    const CritRandomY: number[];
    const AtkAttr: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
        t: number;
    }[];
    const CirtAttr: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
        t: number;
    }[];
    const CritAttr_1: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const CritAttr_2: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const CritAttr_3: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const LeechAttr_1: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const LeechAttr_2: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const LeechAttr_3: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const HitAttr_1: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const HitAttr_2: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const HitAttr_3: {
        x: number;
        y: number;
        a: number;
        sx: number;
        sy: number;
    }[];
    const ShakeCfg: {
        x: number;
        y: number;
        t: number;
    }[];
}
declare namespace game {
    const enum BossEvent {
        ON_MANY_BOSS_UPDATE = "on_many_boss_update",
        UPDATE_BOSS_lIST = "update_boss_list",
        ON_VIP_BOSS_INFO_UPDATE = "on_vip_boss_info_update",
        ON_PERSONAL_BOSS_UPDATE = "on_personal_boss_update",
        ON_CROSS_BOSS_UPDATE = "on_cross_boss_update",
        ON_CROSS_BOSS_RANK_UPDATE = "on_cross_boss_rank_update",
        ON_CROSS_BOSS_REWARD_UPDATE = "on_cross_boss_reward_update",
        ON_BOSS_REVIVE_UPDATE = "on_boss_revive_update",
        BOSS_LIST_INFO_UPDATE = "boss_list_info_update",
        ON_ABYSS_SCENE_UPDATE = "on_abyss_scene_update",
        ON_ABYSS_MAIN_UPDATE = "on_abyss_main_update",
        ON_ABYSS_TEAM_UPDATE = "on_abyss_team_update",
        ON_ABYSS_TEAM_ADD_UPDATE = "on_abyss_team_add_update",
        ON_ABYSS_TEAM_INVITE_UPDATE = "on_abyss_team_invite_update",
        ON_ABYSS_HURT_UPDATE = "on_abyss_hurt_update"
    }
    /**多人boss类型*/
    const enum ManyBossType {
        Lv = 1,
        Rebirth = 2
    }
    /**vip boss副本类型*/
    const enum VipBossType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5
    }
    /**vip boss 关卡状态*/
    const enum VipBossState {
        NonActivited = 1,
        CanFight = 2,
        CanSaoDan = 3,
        CD = 4
    }
    const BossShowRebirthLimit: number; /**VIP BOSS 和多人BOSS在9转之前全部都显示*/
    /**跨服boss请求类型*/
    const enum CrossBossType {
        Base = 1,
        Rank = 2
    }
    const enum BossTipsType {
        CrossBoss = 1,
        Abyss = 2,
        KuafuDoufa = 3,
        XianjieLuandou = 4
    }
}
declare namespace game {
    const enum ChatEvent {
        ON_CHAT_INIT = "on_chat_init",
        ON_CHAT_UPDATE = "on_chat_update",
        ON_CHAT_PRIVATE_UPDATE = "on_chat_private_update",
        ON_CHAT_PRIVATE_LIST_UPDATE = "on_chat_private_list_update",
        ON_CHAT_PRIVATE_LIST_HINT = "on_chat_private_list_hint",
        ON_CHAT_PRIVATE_LIST_INFO = "on_chat_private_list_info",
        ON_SEND_SUCCESS = "on_send_success",
        ON_CHAT_SETTING_UPDATE = "on_chat_setting_update",
        ON_CHAT_BLACK_UPDATE = "on_chat_black_update",
        ON_CHAT_UNION_UPDATE = "on_chat_union_update"
    }
    const enum ChatChannel {
        Cross = 1,
        Local = 2,
        Private = 3,
        Union = 4,
        Zhandui = 5,
        System = 6
    }
    /**
     * 聊天信息类型
     */
    const enum ChatType {
        Face = 1,
        Link = 2,
        Normal = 3,
        Show = 4,
        Jump = 5
    }
    const enum ChatEmoticonType {
        Normal = 1,
        Vip = 2
    }
    const enum ChatSettingType {
        Lv = 1,
        Vip = 2,
        Stranger = 3
    }
    const enum ChatSettingRebackType {
        Open = 1,
        Update = 2
    }
    const enum ChatCheckType {
        Check = 1,
        Add = 2,
        Compete = 3,
        Black = 4
    }
    const enum ChatBlackType {
        Open = 1,
        Add = 2,
        Delete = 3
    }
    const enum ChatLookType {
        Compete = 1,
        Show = 2
    }
    const enum ChatMoreBtnType {
        Setting = "shezhianniu",
        Black = "heimingdan",
        RedPacket = "hongbaotubiao"
    }
    const enum ChatPrivateDelType {
        Close = 1,
        Black = 2,
        DelFriend = 3,
        DelBanlv = 4
    }
    const FACE_NUM = 24;
    const VIP_FACE_NUM = 45;
    const CHAT_LIMIT = 30;
    const CHAT_DEFAULT_NUM = 6;
    const ChatEmoW: number[];
    const CHAT_LIMIT_LEVEL = 200;
    const CHAT_LIMIT_VIP = 110000002;
    const CHAT_PRIVATE_LIMIT = 100;
    const MAIN_CHAT_LIMIT = 5;
    const CHAT_UNION_LIMIT = 20;
}
declare namespace game {
    const enum CompeteEvent {
        UPDATE_YOULI_INFO = "update_youli_info",
        UPDATE_YOULI_AWARD = "update_youli_award",
        UPDATE_YOULI_SCORE = "update_youli_score",
        UPDATE_YOULI_WISH_BOX = "update_youli_wish_box",
        UPDATE_YOULI_KILLER_FIGHT = "update_youli_killer_fight",
        UPDATE_YOULI_DATI = "update_youli_dati",
        UPDATE_DOUFA_INFO = "update_doufa_info",
        UPDATE_DOUFA_RECORD = "update_doufa_record",
        UPDATE_DOUFA_RANK = "update_doufa_rank",
        DOUFA_RESET_CHALLENGE = "doufa_reset_challenge",
        UPDATE_DOUFA_GROUP_INFO = "update_doufa_group_info",
        UPDATE_DOUFA_GUESS_INFO = "update_doufa_guess_info",
        COMMON_CLICK_ADD = "common_click_add",
        KUAFU_DOUFA_COUNT_UPDATE = "kuafu_doufa_count_update",
        KUAFU_DOUFA_STATE_UPDATE = "kuafu_doufa_state_update",
        KUAFU_DOUFA_ENROLL_UPDATE = "kuafu_doufa_enroll_update",
        KUAFU_DOUFA_RANK_UPDATE = "kuafu_doufa_rank_update",
        KUAFU_DOUFA_SCENE_RANK_UPDATE = "kuafu_doufa_scene_rank_update",
        KUAFU_DOUFA_SCORE_UPDATE = "kuafu_doufa_score_update",
        KUAFU_DOUFA_MY_SCORE_UPDATE = "kuafu_doufa_my_score_update",
        KUAFU_DOUFA_SCORE_REWARD_UPDATE = "kuafu_doufa_score_reward_update",
        KUAFU_DOUFA_BOSS_UPDATE = "kuafu_doufa_boss_update",
        KUAFU_DOUFA_ATTACK_UPDATE = "kuafu_doufa_attack_update",
        KUAFU_DOUFA_NOTICE_UPDATE = "kuafu_doufa_notice_update",
        KUAFU_DOUFA_SKILL_CD_UPDATE = "kuafu_doufa_skill_cd_update"
    }
    /**
     * 游历玩法类型
     */
    const enum YouliType {
        Normal = 0,
        WishBox = 1,
        Treasure = 2,
        SpecialKiller = 3,
        ScoreKiller = 4,
        Dati = 5
    }
    /**
     * 许愿宝箱状态
     */
    const enum WishBoxStatus {
        NOT_OPEN = "not_open",
        OPEN = "open",
        OPEN_GOT = "open_got"
    }
    /** 斗法系统小组赛类型*/
    const enum DoufaGroupStatus {
        Score = 0,
        First = 1,
        Second = 2
    }
    /** 斗法小组类型*/
    const enum DoufaGroupType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5
    }
    /** 斗法系统各小组赛战斗场次*/
    const enum DoufaGroupMatch {
        Num1 = 1,
        Num2 = 2,
        Num3 = 3
    }
    /** 跨服斗法状态*/
    const enum KuafuDoufaState {
        Enroll = 1,
        Wait = 2,
        Open = 3,
        End = 4
    }
    const KuafuDoufaWaitTime: number;
    const enum KuafuDoufaOpType {
        Enroll = 1,
        GuildRank = 2,
        PersonalRank = 3,
        SceneRank = 4,
        ScoreReward = 5,
        Attack = 6
    }
    const enum KuafuDoufaAttackStatus {
        Attack = 1,
        Defense = 2
    }
}
declare namespace game {
    const enum ConsecrateEvent {
        /**封魔珍宝抽奖缓动开启 */
        ON_TWEEN_CONSECRATE_OPEN = "on_tween_consecrate_open",
        /**更新封魔界面 */
        ON_UPDATE_CONSECRATE_INFO = "on_update_consecrate_info",
        /**关闭放入封魂界面 */
        ON_CLOSE_CONSECRATE_SHELF = "on_close_consecrate_shelf",
        ON_UPDATE_AMASS_INFO = "on_update_amass_info"
    }
    const enum ConsecrateState {
        Null = 0,
        Fengyin = 1,
        WaitingFengyin = 2,
        Reward = 3
    }
    const enum AmassClassId {
        Amass = 1,
        Amass2 = 2,
        Amass3 = 3
    }
    const enum AmassOpType {
        OneKey = 1,
        Up = 2
    }
    const enum AmassSuitType {
        PowerAdd = 2
    }
}
declare namespace game {
    const enum LivenessEvent {
        MEDAL_INFO_UPDATE = "medal_info_update",
        MEDAL_PLAY_TWEEN = "medal_play_tween",
        MEDAL_AWARD_UPDATE = "medal_award_update"
    }
    const enum WanfaStatus {
        None = 0,
        Challenge = 1,
        Gongfeng = 2
    }
    const enum WanfaEvent {
        UPDATE_WANFAN_LIST = "update_wanfa_list"
    }
    const enum DailyLimitTimeEvent {
        UPDATE_LIMIT_ACT_INFO = "update_limit_act_info"
    }
    const enum DailyLimitTimeState {
        End = 0,
        Opening = 1,
        NotOpen = 2
    }
    const enum DailyLimitTimeType {
        YonghengYijie = 3,
        XianjieLuandou = 5
    }
}
declare namespace game {
    const enum EnhanceEvent {
        ON_GEM_ATTR_BACK = "on_gem_attr_back",
        UPDATE_STRENGTH_INFO = "update_strength_info",
        UPDATE_STRENGTH_MASTER_INFO = "update_strength_master_info",
        UPDATE_GEM_INFO = "update_gem_info",
        UPDATE_GEM_MASTER_INFO = "update_gem_master_info",
        UPDATE_GEM_ONE_KEY_INSET = "update_gem_one_key_inset",
        UPDATE_ADVANCED_INFO = "update_advanced_info",
        UPDATE_ADVANCED_MASTER_INFO = "update_advance_master_info"
    }
    const enum EnhanceCfgBaseId {
        STRENGTH_BASE = 150100000,
        ADVANDE_BASE = 158101000,
        STRENGTH_MASTER_BASE = 150200000,
        GEM_BASE = 150300000,
        ADVANCE_MASTER_BASE = 158000000
    }
}
declare namespace game {
    const enum EnterEffectStep {
        CONFIG = "config",
        ANIM = "anim"
    }
    const EnterEffectAllStep: string[];
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisplayObject = egret.DisplayObject;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    class EffectMdrBase extends MdrBase {
        protected _effHub: UIEftHub;
        private _eftId;
        protected addListeners(): void;
        protected newView(): void;
        protected clearFont(container: DisplayObjectContainer, clearRef?: boolean): void;
        /**
         * 添加字体
         * @param text 显示的文本
         * @param font 字体
         * @param container 存放字体的容器，一般为Group
         * @param horizontal 默认水平显示
         * @param scale 缩放，默认1
         * @param center 默认不居中显示
         * @param gap 字体间隔，默认0
         * @param expandParent 默认不设置container大小
         */
        protected addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal?: boolean, scale?: number, center?: boolean, gap?: number, expandParent?: boolean): void;
        protected addEft(src: string, x: number, y: number, cb?: Handler, times?: number, idx?: number, scale?: number, autoRemove?: boolean, speed?: number): number;
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent(src: string, parent: DisplayObjectContainer, x?: number, y?: number, idx?: number, cb?: Handler, times?: number, scale?: number, autoRemove?: boolean, speed?: number, isMirror?: boolean, scaleXBmpOffX?: number, rotation?: number): number;
        /**
         * 添加特效
         * @param parent 存放特效的Group
         * */
        protected addEftByParentScale(parent: DisplayObjectContainer): void;
        /**
         * 添加特效
         * @param src 特效资源，UIEftSrc
         * @param parent 存放特效的Group
         * */
        protected addEftByParent2(src: string, parent: DisplayObjectContainer, isMirror?: boolean, scaleXBmpOffX?: number): number;
        protected addEftByDsp(src: string, display: DisplayObject, idx?: number, cb?: Handler, times?: number, scale?: number): number;
        protected stopEffect(id: number): void;
        protected playEffect(id: number): void;
        protected checkEffectPlaying(id: number): boolean;
        protected removeEffect(id: number): void;
        getEffHub(): UIEftHub;
        getEffectById(id: number): UIAnimate;
        protected updateAddEft(n: GameNT): void;
        /**efftContainer：一般是View
         * group_eft1：按钮组件特效容器
         * dest：特效的终点*/
        protected setAddEft(efftContainer: eui.Component, group_eft1: eui.Group, dest: {
            x: number;
            y: number;
        }): void;
        private addRotationEfft;
        protected onHide(): void;
        removeAllEffects(): void;
        protected removeEft(): void;
        /**
         * 添加角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param fashion 时装
         * @param weapon 武器
         * @param wing 翅膀
         * @param sex 性别
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         * @param isSingle 翅膀和神兵模型区分UI显示 默认true
         */
        updateUIRole(parent: DisplayObjectContainer, fashion: number, weapon: number, wing: number, sex: number, scale?: number, dir?: number, act?: string, isUi?: boolean, otherRole?: boolean, isSingle?: boolean): void;
        /**
         * 添加外显模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isWeapon 是否是武器，默认false
         * @param isGray 是否置灰，默认false
         * @param cb 动作播放完的回调
         * @param times 动作播放次数
         */
        addAnimate(index: number, parent: DisplayObjectContainer, dir?: number, act?: string, isUi?: boolean, isWeapon?: boolean, isGray?: boolean, cb?: Handler, times?: number): number;
        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        addMonster(index: number, parent: DisplayObjectContainer): number;
        addMonsterByRes(res: string, parent: DisplayObjectContainer, dir?: number, act?: string): number;
        /**
         * 添加自己角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1.1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isSingle 翅膀和神兵模型区分UI显示 默认true
         */
        updateSelfUIRole(parent: DisplayObjectContainer, scale?: number, dir?: number, act?: string, isUi?: boolean, isSingle?: boolean): void;
        /**
         * 添加排行榜角色模型接口
         * @param parent 存放外显的容器，一般为Group
         * @param info 通用排行榜外显
         * @param scale 缩放，默认1.1
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         */
        updateRankUIRole(parent: DisplayObjectContainer, info: msg.teammate | RankUIRoleData, scale?: number, otherRole?: boolean): void;
        updateUIRoleAtr(isLoop?: boolean, handler?: Handler): void;
        updateRoleAct(parent: DisplayObjectContainer, dir?: number, act?: string, isLoop?: boolean, handler?: Handler): void;
    }
    /**角色模型显示接口*/
    interface RankUIRoleData {
        /**时装*/
        fashion?: number;
        /**神兵*/
        weapon?: number;
        /** 羽翼 */
        wing?: number;
        /**性别*/
        sex?: number;
    }
}
declare namespace game {
    const enum FriendEvent {
        ON_FRIEND_UPDATE = "on_friend_update"
    }
    const enum FriendCheckType {
        Check = 1,
        Chat = 2,
        Battle = 3,
        Compete = 4,
        Delete = 5,
        Black = 6
    }
    const enum FriendOpType {
        Friend = 1,
        Follow = 2,
        Recommend = 3
    }
    const enum FriendEventType {
        Delete = 1,
        Add = 2,
        Update = 3
    }
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    /**
     * 神技飘字
     */
    class GodSkillEftName extends DisplayObjectContainer {
        private static _ins;
        static getIns(): GodSkillEftName;
        show(idx: number): void;
    }
    class GodSkillEftNameItem extends DisplayObjectContainer {
        private img_godBg;
        private img_godName;
        constructor();
        show(idx: number): void;
        private hideGSShow;
    }
}
declare namespace game {
    import tiandi_level_data = msg.tiandi_level_data;
    import SkillItemRenderData = game.mod.SkillItemRenderData;
    const enum GodEvent {
        ON_UPDATE_ROAD_INFO = "on_update_road_info",
        ON_UPDATE_TREASURE_INFO = "on_update_treasure_info",
        ON_UPDATE_HAUNTED_INFO = "on_update_haunted_info",
        ON_UPDATE_TIANLONG_INFO = "on_update_tianlong_info",
        ON_UPDATE_AVATAR_INFO = "on_update_avatar_info",
        ON_UPDATE_TRAVEL_INFO = "on_update_travel_info",
        ON_UPDATE_TRAVEL_LIST_INFO = "on_update_travel_list_info"
    }
    interface GodListData {
        type: number;
        info?: tiandi_level_data;
    }
    const enum GodType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4
    }
    const enum GodHintType {
        Type1 = "01",
        Type2 = "02",
        Type3 = "03",
        Type4 = "04"
    }
    const enum GodHintType {
        Up = "01",
        Act = "02"
    }
    const enum GodActOper {
        Activate = 1,
        Up = 2
    }
    const DEFAULT_EXP = 10;
    interface GodBuffData extends SkillItemRenderData {
        limit?: number;
        cur?: number;
    }
}
declare namespace game {
    const enum GuideEvent {
        ON_GUIDE_UPDATE = "on_guide_update",
        ON_GUIDE_TRIGGER = "on_guide_trigger"
    }
    const enum GuideType {
        Default = 0,
        Force = 1,
        Force2 = 2
    }
    const enum ArrowType {
        None = 0,
        Auto = 1,
        Tips = 2
    }
    const GuideFingerName: string;
    const enum GuideKey {
        Task = 1,
        Shenling = 2,
        ShenlingAct = 3,
        Back = 4,
        ShenlingOneUp = 5,
        Summon = 6,
        SummonTen = 7,
        Shilian = 8,
        FubenChallege = 9,
        Role = 10,
        RoleEquip = 11,
        Boss = 12,
        RoleCollect = 13,
        RoleCollectAct = 14,
        Pass = 15,
        PassChallege = 16,
        Xianfa = 17,
        XianfaOneUp = 18,
        RoleBody = 19,
        Compete = 20,
        CompeteYouli = 21,
        Xianlu = 22,
        SecondBack = 23,
        SurfaceAct = 24,
        ShenlingUpStar = 25,
        More = 26,
        Consecrate = 27,
        ConsecrateIcon = 28,
        ConsecrateShelfItem = 29,
        TaskClick = 30,
        Union = 31,
        Yuling = 32,
        YulingHorse = 33,
        RoleCollectIcon = 34,
        ShenlingOneUpAutoSel = 35,
        BossChallenge = 36,
        YouliChallenge = 37,
        ConsecrateSpeed = 38,
        ConsecrateSpeedAll = 39,
        ConsecrateIconFinal = 40,
        HuaShengSkillIcon = 41,
        GivingShenLing = 42,
        GivingShenLingRewardBtn = 43,
        Tips = 10001,
        GongNengTips = 10002
    }
    const enum GuideKeySpecial {
        /**特殊引导*/
        Special1 = 1,
        Special2 = 2
    }
}
declare namespace game {
    /**红点事件*/
    const enum HintEvent {
        ON_COMMON_HINT_UPDATE = "on_common_hint_update"
    }
    /**定时器类型*/
    const enum TimeEventType {
        ManyBoss = 1,
        PersonalBoss = 2,
        Lingchi = 3,
        Offline = 4,
        GivingShenLing = 5,
        ManyBossRevive = 6,
        VipBossRevive = 7,
        TiannvWelfare = 8,
        VipWelfare = 9,
        AbyssBoss = 10,
        CrossBoss = 11,
        AbyssBossClose = 12,
        Sea1 = 13,
        Sea2 = 14,
        Sea3 = 15,
        XiandiOpen = 16,
        XianmaiStart = 17,
        XianmaiEnd = 18
    }
    /**红点类型*/
    const enum HintType {
        XiuxianReward = "00",
        XiuxianTask = "01",
        XiuxianBreak = "02",
        XiandanType1 = "03",
        XiandanType2 = "04",
        XiandanType3 = "05",
        LingchiReward = "06",
        LingchiUp = "07",
        LingchiBattle = "08",
        LingmaiUp = "09",
        LinggenUp = "10",
        PassWorldMapBox = "11",
        StrengthBtn = "12",
        StrengthOneKeyBtn = "13",
        StrengthMasterBtn = "14",
        GemOneKeyMergeBtn = "15",
        GemOneKeyInlayBtn = "16",
        GemAttrBtn = "17",
        GemMasterBtn = "18",
        AdvancedBtn = "19",
        AdvancedMasterBtn = "20",
        BagCompose = "21",
        XianfaOneKeyUpgrade = "22",
        XianfaOneKeyWear = "23",
        XianfaItem = "24",
        XianfaUpgrade = "25",
        XianfaUpStar = "26",
        XianfaStudy = "27",
        HorseUp = "30",
        HorseSkill = "31",
        HorseJiban = "32",
        HorseGift = "33",
        HorseAct = "34",
        HorsePill = "35",
        TianshenUp = "40",
        TianshenSkill = "41",
        TianshenJiban = "42",
        TianshenGift = "43",
        TianshenAct = "44",
        TianshenPill = "45",
        TianshenEqpOpe = "46",
        TianshenSuitOpe = "47",
        FubenChallenge1 = "50",
        FubenChallenge2 = "51",
        FubenChallenge3 = "52",
        FubenReset1 = "53",
        FubenReset2 = "54",
        FubenReset3 = "55",
        XiantaChallenge1 = "60",
        XiantaChallenge2 = "61",
        XiantaChallenge3 = "62",
        XiantaSweep1 = "63",
        XiantaSweep2 = "64",
        XiantaSweep3 = "65",
        XiantaReward1 = "66",
        XiantaReward2 = "67",
        XiantaReward3 = "68",
        XiantaRank1 = "69",
        XiantaRank2 = "70",
        XiantaRank3 = "71",
        BossChallenge = "80",
        PersonalBossChallenge = "81",
        CrossBossChallenge = "82",
        DoufaChallenge = "83",
        DoufaReward = "84",
        DoufaWinReward = "85",
        WingGift = "86",
        WingUp = "87",
        WingSkill = "88",
        WingAct = "89",
        WingPill = "90",
        WeaponGift = "92",
        WeaponUp = "93",
        WeaponSkill = "91",
        WeaponAct = "94",
        WeaponPill = "95",
        BodyGift = "96",
        BodyUp = "97",
        BodySkill = "98",
        BodyAct = "99",
        BodyPill = "100",
        RoleRingType1 = "105",
        RoleRingType2 = "106",
        RoleRingType3 = "107",
        BagProp = "110",
        YouliChallenge = "111",
        HuashenUp = "120",
        HuashenSkill = "121",
        HuashenAct = "122",
        HuashenPill = "123",
        PunshList = "124",
        HuashenZhilu = "125",
        HuashenZhanshendian = "126",
        UnionBeastReward = "127",
        UnionBeastTask = "128",
        UnionWage = "129",
        UnionBeastUp = "130",
        UnionDonate = "139",
        UnionRank = "140"
    }
}
declare namespace game {
    const enum JiBanEvent {
        ON_HUANHUA_INFO_UPDATE = "on_huanhua_info_update",
        ON_GATHER_INFO_UPDATE = "on_gather_info_update"
    }
}
declare namespace game {
    const enum MailEvent {
        ON_MAIL_UPDATE = "on_mail_update"
    }
    const MailRemindTime: number;
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    /**
     * 神技飘字(新)
     */
    class GodSkillEftNameNew extends DisplayObjectContainer {
        private static _ins;
        static getIns(): GodSkillEftNameNew;
        show(idx: number): void;
    }
    class GodSkillEftNameItemNew extends DisplayObjectContainer {
        private img_godBg;
        private img_godName;
        constructor();
        show(idx: number): void;
        private hideGSShow;
    }
}
declare namespace game {
    const enum MiscEvent {
        INIT_MISC = "init_misc",
        ON_ROLE_LOGIN = "on_role_login",
        START_GAME = "start_game",
        SERVER_ERR = "server_err",
        START_SYNC_TIME = "start_sync_time",
        STOP_SYNC_TIME = "stop_sync_time",
        ON_RECEIVE_SETTING = "on_receive_setting",
        ON_RECEIVE_NEW_HOUR = "on_receive_new_hour",
        PAY_SUCCESS = "pay_success",
        GET_ORDER_START = "get_order_start",
        GET_ORDER_END = "get_order_end",
        GET_ORDER_ERROR = "get_order_error"
    }
    /**设置本地存储ley*/
    const enum SettingKey {
        Guide = "guide",
        SoundMute = "sound_mute",
        SoundEft = "sound_eft",
        MaskOthers = "mask_others",
        MaskPet = "mask_pet",
        MaskSkillEft = "mask_skill_eft",
        LuckTips = "lucktips",
        SetInfo = "set_info",
        FPSSetLowTime = "fpssetlowtime",
        CycleTower = "cycle_tower",
        bgMusic = "bgMusic",
        autoShenjiang = "autoShenjiang",
        gameMusic = "gameMusic",
        autoHuashen = "autoHuashen",
        gameShake = "gameShake",
        performance = "performance",
        gameModel = "3",
        fubenChallenge = "fubenChallenge"
    }
}
declare namespace game {
    const enum MoreEvent {
        ON_ACHIEVE_INFO_UPDATE = "on_achieve_info_update",
        ON_UPDATE_ARTIFACT_INFO = "on_update_artifact_info",
        ON_UPDATE_ARTIFACT_ATTR_INFO = "on_update_artifact_attr_info",
        ON_UPDATE_ARTIFACT_AUTO_INFO = "on_update_artifact_auto_info",
        ON_UPDATE_ZHANDUI_BASE_INFO = "on_update_zhandui_base_info",
        ON_UPDATE_ZHANDUI_APPLY_LIST_INFO = "on_update_zhandui_apply_list_info",
        ON_UPDATE_ZHANDUI_TEAM_ROLE_APPLY_LIST_INFO = "on_update_zhandui_team_role_apply_list_info",
        ON_UPDATE_ZHANDUI_CHECK_VIEW_HIDE = "on_update_zhandui_check_view_hide",
        ON_UPDATE_ZHANDUI_RECORDS = "on_update_zhandui_records",
        ON_EXIT_ZHANDUI_TEAM = "on_exit_zhandui_team",
        ON_SEND_SUCCESS = "on_send_success",
        ON_UPDATE_ZHANDUI_JITAN_BASE_INFO = "on_update_zhandui_jitan_base_info",
        ON_UPDATE_ZHANDUI_JITAN_GONGFENG_INFO = "on_update_zhandui_jitan_gongfeng_info",
        ON_CLOSE_ZHANDUI_JITAN_SHELF = "on_close_zhandui_jitan_shelf",
        ON_UPDATE_XUJIETANSUO_BASE_INFO = "on_update_xujietansuo_base_info",
        ON_GOTO_XUJIETANSUO_NEXT_LAYER = "on_goto_xujietansuo_next_layer",
        ON_UPDATE_ZHENRONG_INFO = "on_update_zhenrong_info",
        ON_UPDATE_TBS_INFO = "on_update_tbs_info",
        ON_UPDATE_TBS_RESULT_INFO = "on_update_tbs_result_info",
        ON_TBS_FIGHT_HIDE = "on_tbs_fight_hide",
        ON_UPDATE_XUJIETANSUO_RECORDS_INFO = "on_update_xujietansuo_records_info",
        ON_UPDATE_XUJIETANSUO_RANK_INFO = "on_update_xujietansuo_rank_info",
        ON_UPDATE_XUJIETANSUO_SINGLE_GRID_INFO = "on_update_xujietansuo_single_grid_info",
        ON_UPDATE_MINING_LOGS_INFO = "on_update_mining_logs_info",
        ON_UPDATE_MINING_MASTER_INFO = "on_update_mining_master_info",
        ON_UPDATE_MINING_FIGHT_INFO = "on_update_mining_fight_info",
        ON_UPDATE_MINING_CNT_INFO = "on_update_mining_cnt_info",
        ON_UPDATE_MINING_LINGBAO_CNT_INFO = "on_update_mining_lingbao_cnt_info",
        ON_UPDATE_MINING_GIFT_INFO = "on_update_mining_gift_info",
        ON_UPDATE_XIANMAI_STAGE_SHOW = "on_update_xianmai_stage_show",
        ON_UPDATE_XIANMAI_MY_SHOW = "on_update_xianmai_my_show",
        ON_UPDATE_XIANMAI_CHECK_OTHER = "on_update_xianmai_check_other",
        ON_UPDATE_XIANMAI_SEARCH = "on_update_xianmai_search",
        ON_UPDATE_XIANMAI_REWARD_SHOW = "on_update_xianmai_reward_show",
        ON_UPDATE_XIANMAI_LIST_SHOW = "on_update_xianmai_list_show",
        ON_UPDATE_XIANMAI_ZHANBAO = "on_update_xianmai_zhaobao",
        ON_UPDATE_XIANMAI_RANK_SHOW = "on_update_xianmai_rank_show",
        ON_XIANMAI_LIST_VIEW_CLOSE = "on_xianmai_list_view_close",
        ON_XIANMAI_VIEW_CLOSE = "on_xianmai_view_close",
        ON_UPDATE_HUANJING_INFO = "on_update_huanjing_info",
        ON_UPDATE_HUANJING_ATTR = "on_update_huanjing_attr",
        ON_UPDATE_CROSS_UNION_INFO = "on_update_cross_union_info",
        ON_UPDATE_CROSS_UNION_LIST_INFO = "on_update_cross_union_list_info",
        ON_UPDATE_CROSS_UNION_LIST_RESET_INFO = "on_update_cross_union_list_reset_info",
        ON_UPDATE_CROSS_UNION_READY_INFO = "on_update_cross_union_ready_info",
        ON_UPDATE_CROSS_UNION_SELECT_INFO = "on_update_cross_union_select_info",
        ON_UPDATE_CROSS_UNION_TEAM_LIST_INFO = "on_update_cross_union_team_list_info",
        ON_UPDATE_CROSS_UNION_ZHANBAO_INFO = "on_update_cross_union_zhanbao_info",
        ON_UPDATE_CROSS_UNION_FIGHT_INFO = "on_update_cross_union_fight_info",
        ON_UPDATE_CROSS_UNION_OVER_VIEW = "on_update_cross_union_over_view",
        ON_XIANJIE_PVP_BASE_INFO_UPDATE = "on_xianjie_pvp_base_info_update",
        ON_XIANJIE_PVP_RANK_INFO_UPDATE = "on_xianjie_pvp_rank_info_update",
        ON_XIANJIE_PVP_SCENE_RANK_INFO_UPDATE = "on_xianjie_pvp_scene_rank_info_update",
        ON_XIANJIE_PVP_SCORE_REWARD_UPDATE = "on_xianjie_pvp_score_reward_update",
        ON_XIANJIE_PVP_BOSS_INFO_UPDATE = "on_xianjie_pvp_boss_info_update",
        ON_XIANJIE_PVP_BATTLE_REPORT_UPDATE = "on_xianjie_pvp_battle_report_update",
        ON_XIANJIE_PVP_KILL_BOSS_INFO_UPDATE = "on_xianjie_pvp_kill_boss_info_update",
        ON_XIANJIE_PVP_SCENE_INFO_UPDATE = "on_xianjie_pvp_scene_info_update",
        ON_XIANJIE_SCENE_SKILL_CD_UPDATE = "on_xianjie_scene_skill_cd_update",
        /**仙位争霸 */
        ON_UPDATE_XIANWEI_INFO = "on_update_xianwei_info",
        ON_UPDATE_XIANWEI_LIST_INFO = "on_update_xianwei_list_info",
        ON_UPDATE_XIANWEI_ZHANBAO_INFO = "on_update_xianwei_zhanbao_info",
        ON_UPDATE_XIANWEI_RANK_INFO = "on_update_xianwei_rank_info",
        ON_UPDATE_XIANWEI_CD_INFO = "on_update_xianwei_cd_info",
        ON_UPDATE_HONOUR_INFO = "on_update_honour_info"
    }
    const enum HuashenEvent {
        ON_UPDATE_HUASHEN_ROAD_INFO = "on_update_huashen_road_info",
        ON_UPDATE_HUASHEN_ZHANSHENDIAN_INFO = "on_update_huashen_road_info",
        ON_UPDATE_HUASHEN_TIANFU_INFO = "on_update_huashen_road_info",
        ON_UPDATE_HUASHEN_TIANFU_OPEN = "on_update_huashen_road_open",
        ON_SCENE_HUASHEN_TIME = "on_scene_huashen_time",
        ON_SCENE_HUASHEN_ID = "on_scene_huashen_id"
    }
    const HuashenZhiluCnt: number;
    /**战队操作类型*/
    const enum ZhanduiOperType {
        /**1为创建战队*/
        Oper1 = 1,
        /**2为购买战队旗帜*/
        Oper2 = 2,
        /**3请求战队列表*/
        Oper3 = 3,
        /**4申请加入*/
        Oper4 = 4,
        /**5刷新战队列表*/
        Oper5 = 5,
        /**6搜索战队*/
        Oper6 = 6,
        /**7战队改名（仅队长）*/
        Oper7 = 7,
        /**8战队使用旗帜（仅队长）*/
        Oper8 = 8,
        /**9请求申请列表（仅队长）*/
        Oper9 = 9,
        /**10操作申请人员（仅队长）*/
        Oper10 = 10,
        /**11发送招募聊天*/
        Oper11 = 11,
        /**12转移队长（仅队长）*/
        Oper12 = 12,
        /**13踢出战队（仅队长）*/
        Oper13 = 13,
        /**14玩家自己退出战队*/
        Oper14 = 14,
        /**15设置进入要求的最低战力*/
        Oper15 = 15,
        /**16设置申请审核（仅队长)*/
        Oper16 = 16,
        /**17请求仙纪功绩*/
        Oper17 = 17,
        /**18请求仙纪事件*/
        Oper18 = 18,
        /**100 请求战队数据*/
        Oper100 = 100,
        /**200 供奉道具和一键放入*/
        Oper200 = 200,
        /**201 回收道具*/
        Oper201 = 201,
        /**202 道具加速*/
        Oper202 = 202,
        /**204 领取道具供奉奖励*/
        Oper203 = 203,
        /**205 幻化激活升级*/
        Oper204 = 204,
        /**205 使用幻化*/
        Oper205 = 205,
        /**206 领取等级礼包*/
        Oper206 = 206,
        /**207 请求战队祭坛供奉信息*/
        Oper207 = 207
    }
    /**墟界祭坛献祭个数*/
    const XujieJitanSacrificeCnt = 7;
    const enum HuangguEvent {
        ON_UPDATE_GODDESS_CONSECRATE_INFO = "on_update_goddess_consecrate_info",
        ON_UPDATE_GODDESS_CHAT_INFO = "on_update_goddess_chat_info",
        ON_UPDATE_GODDESS_TARGET_INFO = "on_update_goddess_target_info",
        ON_UPDATE_GODDESS_EVENT_INFO = "on_update_goddess_event_info",
        ON_GODDESS_CHAT_SEL = "on_goddess_chat_sel",
        ON_UPDATE_FENGMO_RANK = "on_update_fengmo_rank",
        ON_UPDATE_FENGMO_INFO = "on_update_fengmo_info",
        ON_UPDATE_XIANDI_RANK = "on_update_xiandi_rank",
        ON_UPDATE_XIANDI_INFO = "on_update_xiandi_info",
        ON_UPDATE_XIANDI_TREASURE = "on_update_xiandi_treasure",
        ON_CLOSE_XIANDI_POPUP = "on_close_xiandi_popup"
    }
    /**荒古女神操作类型*/
    const enum GoddessOpType {
        Act = 1,
        Summon = 2,
        Consecrate = 3,
        Chat = 4,
        ChatReward = 5,
        Event = 6,
        Target = 7
    }
    const enum GoddessTargetType {
        Free = 1,
        Buy = 2
    }
    const enum GoddessChatType {
        Goddess = 1,
        Self = 2
    }
    const enum CommonChatType {
        Goddess = 1,
        TimeGoddess = 2
    }
    const enum GoddessRecordEvent {
        ON_UPDATE_TIME_GODDESS_CHAT_INFO = "on_update_time_goddess_chat_info",
        ON_UPDATE_TIME_GODDESS_EVENT_INFO = "on_update_time_goddess_event_info",
        ON_UPDATE_TIME_GODDESS_LV_INFO = "on_update_time_goddess_lv_info",
        ON_UPDATE_TIME_GODDESS_GONGFENG_INFO = "on_update_time_goddess_gongfeng_info",
        ON_UPDATE_HUNKA_INFO = "on_update_hunka_info",
        ON_UPDATE_HUNKA_SELECT = "on_update_hunka_select",
        ON_UPDATE_HUNKA_PREVIEW = "on_update_hunka_preview",
        ON_UPDATE_HUNKA_COMPOSE = "on_update_hunka_compose"
    }
    const enum GoddessIndex {
        TimeGoddess = 1
    }
    /**女神录创世女神，操作类型*/
    const enum TimeGoddessOpType {
        Chat = 1,
        ChatReward = 2,
        Event = 3,
        Gongfeng = 10,
        GongfengDel = 11,
        GongfengSpeedup = 12,
        GongfengSpeedupAll = 13,
        GongfengInfo = 14,
        GongfengReward = 15,
        Summon = 20
    }
    const TimeGoddessGongfengCnt = 4;
    const HunkaPosCnt = 7;
    /**女神录创世女神，魂卡操作类型*/
    const enum HunkaOpType {
        Open = 1,
        Wear = 2,
        Remove = 3,
        Act = 4,
        Preview = 5,
        Compose = 6,
        OneKeyCompose = 7
    }
    const enum HunkaBagOpenType {
        Wear = 1,
        Compose = 2
    }
    const enum HunkaScoreType {
        Score = 1,
        Total = 2
    }
    /**墟界探索格子状态*/
    const enum XujieTansuoGridStatus {
        /**0空格子*/
        Null = 0,
        /**1怪物格*/
        Monster = 1,
        /**2奖励格*/
        Reward = 2,
        /**3商人格*/
        Business = 3,
        /**4远征格*/
        Expedition = 4,
        /**5传送格*/
        Transfer = 5
    }
    /**墟界探索每层排数（行数）固定12*/
    const XujieTansuoRowCnt = 12;
    /**墟界探索操作类型*/
    const enum XujieTansuoOperType {
        /**1为领取战利品*/
        Oper1 = 1,
        /**2商店格子购买*/
        Oper2 = 2,
        /**3上阵神灵*/
        Oper3 = 3,
        /**4领取远征奖励*/
        Oper4 = 4,
        /**5挑战怪物*/
        Oper5 = 5,
        /**6扫荡怪物*/
        Oper6 = 6,
        /**7请求排行榜*/
        Oper7 = 7
    }
    /**军团阵容类型*/
    const enum LegionType {
        Shenling = 1,
        Huashen = 2,
        Nvshen = 3
    }
    /**回合制中模型类型 0玩家 1神灵 2化神 3女神 4怪物*/
    const enum LegionEntityType {
        Player = 0,
        Shenling = 1,
        Huahshen = 2,
        Nvshen = 3,
        Monster = 4
    }
    const LegionTypeAry: LegionType[];
    /**军团阵容上阵个数*/
    const LegionTypeCnt: {
        [LegionType.Shenling]: number;
        [LegionType.Huashen]: number;
        [LegionType.Nvshen]: number;
    };
    /**军团阵容类型名称*/
    const LegionTypeName: {
        [LegionType.Shenling]: string;
        [LegionType.Huashen]: string;
        [LegionType.Nvshen]: string;
    };
    /**回合制攻击类型 todo*/
    const enum TbsHintType {
        /**普通攻击*/
        Attack = 0,
        /**回血*/
        Blood = 1,
        /**反弹伤害*/
        ReboundInjury = 2,
        /**直接伤害*/
        DirectInjury = 3
    }
    /**墟界类型*/
    const enum XujieType {
        Tansuo = 1,
        Kuangmai = 2,
        Jitan = 3
    }
    const enum XiandiRankType {
        Person = 1,
        Guild = 2
    }
    const enum XiandiType {
        Xiandi = 1,
        XianHou = 2,
        Hongyan = 3
    }
    /**仙脉战斗操作：1撤离，2驱逐，3攻占，4占领*/
    const enum XianmaiOperType {
        Oper1 = 1,
        Oper2 = 2,
        Oper3 = 3,
        Oper4 = 4
    }
    /**虚空矿脉操作 1.压榨2.激励3.驱逐4.续约5.流放 */
    const enum MiningOper {
        Ot = 1,
        Check = 2,
        Out = 3,
        GoOn = 4,
        Free = 5
    }
    const enum CrossUnionOpenState {
        /**报名阶段未报名 */
        Ready = 1,
        /**匹配阶段未报名 开启前一天0点到开启前 */
        Match = 2,
        /**开启阶段 开启当天20点-24点 */
        Open = 3
    }
    const enum CrossUnionType {
        Own = 1,
        Target = 2
    }
    /**跨服仙宗战 */
    const enum CUFigthEvent {
        /**战斗进场 */
        ON_UPDATE_FIGHT_ENTER = "on_update_fight_enter",
        /**战斗对线伤害更新 */
        ON_UPDATE_FIGHT_INFO = "on_update_fight_info",
        /**战斗技能使用 */
        /**更新单个位置 */
        ON_UPDATE_FIGHT_POS_INFO = "on_update_fight_pos_info",
        /**更新仙宗仙兽数据 */
        ON_UPDATE_BEAST_INFO = "on_update_beast_info",
        /**更新观看奖励 */
        ON_UPDATE_CUF_REWARD_INFO = "on_update_cuf_reward_info",
        /**退出场景 */
        ON_UPDATE_CUF_EXIT = "on_update_cuf_exit"
    }
    /**
     * 1进入副本(s2c_xianjie_pvp_base_info)
     * 2查看活动排名(s2c_xianjie_pvp_rank_info)
     * 3获取战场积分排名(s2c_xianjie_pvp_scene_rank_info)
     * 4领取战场积分奖励(s2c_xianjie_pvp_score_reward)
     * 5发送宗门邀请
     * 6请求战报
     * */
    const enum XianjieLuandouOperType {
        Oper1 = 1,
        Oper2 = 2,
        Oper3 = 3,
        Oper4 = 4,
        Oper5 = 5,
        Oper6 = 6
    }
    /**荣耀类型，对应 honour.json 的大类*/
    const enum HonourType {
        Honour = 1
    }
}
declare namespace game {
    const enum PassEvent {
        UPDATE_PASS_RANK_INFO = "update_pass_rank_info",
        UPDATE_PASS_GOD_RANK_INFO = "update_pass_god_rank_info",
        UPDATE_PASS_GOD_RANK_AWD_GOT_INFO = "update_pass_god_rank_awd_got_info",
        UPDATE_PASS_MAP_AWD_GOT_INFO = "update_pass_map_awd_got_info",
        UPDATE_PASS_WORLD_MAP_TOP_INFO = "update_pass_world_map_top_info",
        UPDATE_PASS_FB_QI_YUAN_INFO = "update_pass_fb_qi_yuan_info",
        UPDATE_MAIN_PASS_INFO = "update_main_pass_info",
        MAIN_PASS_GUANQIA_UPDATE = "main_pass_guanqia_update",
        CHALLENGE_HANGUP_BOSS = "challenge_hangup_boss",
        ON_UPDATE_PREVIEW_INFO = "on_update_preview_info",
        ON_UPDATE_PREVIEW_SELECT = "on_update_preview_select"
    }
}
declare namespace game {
    import Image = eui.Image;
    import Label = eui.Label;
    import Handler = base.Handler;
    import Group = eui.Group;
    const enum ProgressBarType {
        /**
         * 百分比
         */
        Percent = 0,
        /**
         * 数值型 xx/xx
         * @type {number}
         */
        Value = 1,
        /**
         * 无 labal
         */
        NoValue = 2
    }
    class ProgressBarMdr {
        private _img;
        private _width;
        private _lab;
        private _type;
        private _value;
        private _max;
        private _level;
        private _queue;
        private _state;
        onceCallBack: Handler;
        finallyCallBack: Handler;
        gr_eff: Group;
        private _tweenTime;
        /**
         *进度条管理
         * @param {eui.Image} img img 默认最大长度
         * @param {eui.Label} lab
         * @param {game.ProgressBarType} type
         * @param gr_eff 是否显示特效
         */
        constructor(img: Image, lab: Label, type?: ProgressBarType, gr_eff?: Group);
        show(value: number, max: number, tween?: boolean, lv?: number, tweenTime?: number): void;
        hide(): void;
        private showTween;
        private showEff;
        private tweenNext;
        private tweenCallBack;
        private updateLab;
        type: ProgressBarType;
        /**显示满级*/
        showMax(): void;
    }
}
declare namespace game {
    import LanDef = game.localization.LanDef;
    const enum RankEvent {
        ON_RANK_INFO_UPDATE = "on_rank_info_update",
        ON_RANK_REWARD_INFO_UPDATE = "on_rank_reward_info_update",
        /**主界面上方排行榜按钮*/
        ON_NEW_RANK_INFO_UPDATE = "on_new_rank_info_update",
        ON_RANK_WORSHIP_UPDATE = "on_rank_worship_update",
        ON_RANK_BASE_INFO_UPDATE = "on_rank_base_info_update",
        ON_RANK_REWARD_UPDATE = "on_rank_reward_update"
    }
    /**排行榜类型*/
    const enum RankType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 1002,
        /**战力*/
        Zhanli = 2001,
        /**神灵*/
        Shenling = 2002,
        /**等级*/
        Dengji = 2003,
        /**修仙*/
        Xiuxian = 2004,
        /**坐骑*/
        Zuoqi = 2005,
        /**飞剑*/
        Feijian = 2006,
        /**羽翼*/
        Yuyi = 2007,
        /**神兵*/
        Shenbing = 2008,
        /**时装*/
        Shizhuang = 2009,
        /**元灵*/
        Yuanling = 2010
    }
    /**排行榜通用类型*/
    const enum RankCommonType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3
    }
    /**排行榜通用类型（1个人，2仙宗）*/
    const enum RankCommonType2 {
        Person = 1,
        Guild = 2
    }
    /**奖励领取状态，跟服务端约定的*/
    const enum RewardStatus {
        NotFinish = 0,
        Finish = 1,
        Draw = 2
    }
    /**奖励领取状态，客户端用于排序*/
    const enum RankRewardStatus {
        Finish = 1,
        NotFinish = 2,
        Draw = 3
    }
    const MAX_RANK_NUM = 20;
    const MAX_RANK_SHOW = 21;
    /**排行榜类型名字*/
    const RankTypeName: {
        [RankType.Zhanli]: LanDef;
        [RankType.Shenling]: LanDef;
        [RankType.Dengji]: LanDef;
        [RankType.Xiuxian]: LanDef;
        [RankType.Zuoqi]: LanDef;
        [RankType.Feijian]: LanDef;
        [RankType.Yuyi]: LanDef;
        [RankType.Shenbing]: LanDef;
        [RankType.Shizhuang]: LanDef;
        [RankType.Yuanling]: LanDef;
    };
    const enum UnionRank {
        /**1宗门遗宝排行 */
        Treasure = 1,
        /**2宗门斩妖台排行 */
        Kill = 2,
        /**3宗门仙兽排行 */
        Beast = 3,
        /**4仙宗封魔宗门排行 */
        Fengmo = 4
    }
    const enum UnionRankType {
        Guild = 1,
        Person = 2
    }
}
declare namespace game {
    /**品质：蓝、紫、橙、红、金、绿、白、蓝紫、彩*/
    const enum QualityType {
        DEFAULT = 0,
        BLUE = 1,
        PURPLE = 2,
        ORANGE = 3,
        RED = 4,
        GOLD = 5,
        GREEN = 6,
        WHITE = 7,
        BLUE_PURPLE = 8,
        COLOR = 9
    }
    const QualityTypeSrName: {
        [QualityType.BLUE]: string;
        [QualityType.PURPLE]: string;
        [QualityType.ORANGE]: string;
        [QualityType.RED]: string;
        [QualityType.GOLD]: string;
        [QualityType.GREEN]: string;
        [QualityType.WHITE]: string;
        [QualityType.BLUE_PURPLE]: string;
        [QualityType.COLOR]: string;
    };
    /**品质，黄玄地天(4,5,6,7)*/
    const enum SpecialQualityType {
        Huang = 1,
        Xuan = 2,
        Di = 3,
        Tian = 4
    }
    /** SpecialQualityType 与 QualityType 映射*/
    const SpecialQuality: {
        [SpecialQualityType.Huang]: QualityType;
        [SpecialQualityType.Xuan]: QualityType;
        [SpecialQualityType.Di]: QualityType;
        [SpecialQualityType.Tian]: QualityType;
    };
    /**SpecialQualityType的特效资源*/
    const SpecialQualityEftSrc: {
        [SpecialQualityType.Huang]: UIEftSrc;
        [SpecialQualityType.Xuan]: UIEftSrc;
        [SpecialQualityType.Di]: UIEftSrc;
        [SpecialQualityType.Tian]: UIEftSrc;
    };
}
declare namespace game {
    function initMainLayer(): void;
}
declare namespace game {
    import PoolObject = base.PoolObject;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import UpdateItem = base.UpdateItem;
    class PromptBox implements UpdateItem {
        private _tips;
        private _lastShowTime;
        private readonly DURATION;
        private static _instance;
        showItems: PromptBoxItem[];
        static getIns(): PromptBox;
        show(str: string): void;
        showLanTips(str: string): void;
        private showTips;
        private checkNext;
        update(time: base.Time): void;
    }
    class PromptBoxItem extends DisplayObjectContainer implements PoolObject {
        private readonly MIN_W;
        private _txt;
        private _imgBg;
        private readonly COLOR;
        constructor();
        private initUI;
        private isFormatColor;
        show(str: string, layer?: Layer): void;
        private onTweenDone;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
    }
}
declare namespace game {
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    const enum SceneEvent {
        INIT_SCENE_MDR = "init_scene_mdr",
        CLEAN_SCENE = "clean_scene",
        LOAD_SCENE_CFG = "load_scene_cfg",
        SCENE_CFG_LOADED = "scene_cfg_loaded",
        SCENE_BLUR_LOADED = "scene_blur_loaded",
        ON_SCENE_READY = "on_scene_ready",
        ON_SCENE_ENTER = "on_scene_enter",
        SCENE_CHANGE = "scene_change",
        ON_SCENE_CLICK = "on_scene_click",
        ON_OBJ_ADD = "on_display_add",
        ON_OBJ_DEL = "on_display_del",
        ON_OBJ_UPDATE = "on_display_update",
        ON_OBJ_MOVE = "on_obj_move",
        ON_MAIN_PLAYER_MOVE = "on_main_player_move",
        /** 重置玩家位置*/
        ON_RESET_PLAYER_PT = "on_reset_player_pt",
        ON_OBJ_USE_SKILL = "on_obj_use_skill",
        /**玩家遥杆控制*/
        ON_CONTROL_MAIN_PLAYER_MOVE = "on_control_main_player_move",
        ON_MAIN_MOVE = "on_main_move",
        ON_REQUEST_MONSTER = "on_request_monster",
        ON_FIND_MONSTER = "on_find_monster",
        /** 设置是否挂机 */
        SET_HANG_UP = "set_hang_up",
        ON_AUTO_HANG_UP_UPDATE = "on_auto_hang_up_update",
        /** 点击技能 */
        ON_TAP_SKILL = "on_tap_skill",
        ON_BOSS_HP = "on_boss_hp",
        ON_BOSS_HP_FILTER = "on_boss_hp_filter",
        ON_NPC_HP = "on_npc_hp",
        ON_NPC_CAMP = "on_npc_camp",
        ON_BUFF_UPDATE = "on_buff_update",
        ON_MAIN_PLAYER_BE_MONSTER_ATK = "on_main_player_be_monster_atk",
        ON_SKILL_BUFF = "on_skill_buff",
        /**DBG调试*/
        ON_SCENE_DEBUG_MOVE = "ON_SCENE_DEBUG_MOVE",
        /**角色死亡*/
        ON_ROLE_DIE = "on_role_die",
        /**角色复活*/
        ON_ROLE_RELIVE = "on_role_relive",
        /** 移除客户端NPC */
        ON_DEL_CLIENT_NPC = "on_del_client_npc",
        /** 添加客户端NPC */
        ON_ADD_CLIENT_NPC = "on_add_client_npc",
        /** 删除场景所有客户端NPC */
        ON_CLEAR_CLIENT_NPC = "on_clear_all_client_npc",
        /** 添加客户端AI */
        ON_ADD_PLAYER_AI = "on_add_player_ai",
        /** 震屏效果 */
        ON_SCENE_SHAKE = "on_scene_shake",
        /** 引导客户端去到scene_index的地图 找到entity_id或者走到x,y */
        ON_SERVER_GUIDE_MOVE = "on_server_guide_move",
        ON_CLEAN_GUIDE_MOVE = "on_clean_guide_move",
        /** 技能飘字 */
        ON_SKILL_TEXT_SHOW = "on_skill_text_show",
        ON_SKILL_TEXT_SHOW2 = "on_skill_text_show2",
        ON_SKILL_BUF_SHOW = "on_skill_buf_show",
        /**测试贝塞尔曲线运动*/
        BEZAIER_START_MOVE = "bezaier_start_move",
        /**************新加的事件****************/
        FUBEN_CONTINUE_BATTLE = "fuben_continue_battle",
        ON_SCENE_RANK_UPDATE = "on_scene_rank_update",
        ON_SCENE_BELONG_UPDATE = "on_scene_belong_update",
        ON_SCENE_MAX_HURT_UPDATE = "on_scene_max_hurt_update",
        FOE_TARGET_CHANGE = "foe_target_change",
        PVP_ENTER_END = "pvp_enter_end",
        BIG_BOSS_HP_HIDE = "big_boss_hp_hide",
        ON_SCENE_DAMAGE_UPDATE = "on_scene_damage_update"
    }
    /**寻找类型*/
    const enum FindType {
        FIXATION = 0,
        FIND = 1
    }
    /**场景类型*/
    const enum SceneType {
        HangUp2 = 106,
        JiYuan = 107,
        Fuben = 108,
        Forbidden = 109,
        Xianta = 110,
        Yuanling = 111,
        ManyBoss = 113,
        PersonalBoss = 114,
        CrossBoss = 115,
        Doufa = 117,
        Yjjs = 119,
        Yijie = 120,
        YonghengYijie = 121,
        XianlvShilian = 122,
        Friend = 123,
        Abyss = 124,
        Fengmo = 125,
        Sea = 126,
        XianlvDoufa = 128,
        KuafuDoufa = 129,
        XianjieLuandou = 130
    }
    /**不显示玩家复活提示的场景*/
    const NotShowRoleRevive: number[];
    /**特殊场景退出提示文本*/
    const SceneExitTips: {
        [SceneType.XianjieLuandou]: LanDef;
    };
    /**阵营类型*/
    const enum CampType {
        MONSTER = 0,
        RED = 1,
        BLUE = 2
    }
    const enum BuffIndex {
        Tie = 13001002,
        Dizzy = 13008002,
        Immune = 13012002,
        TeXiao = 213400511
    }
    const ViewWidthLimit: number;
    const SceneRedFrameTime = 10;
    interface MapInfo {
        mW: number;
        mH: number;
        sW: number;
        sH: number;
        cW: number;
        cH: number;
        d: number[];
        p: number[][];
    }
    /**挂机地图移动类型*/
    enum MapMoveType {
        Null = 0,
        Left = 1,
        Right = 2,
        Up = 3,
        Down = 4,
        LeftUp = 5,
        RightUp = 6,
        LeftDown = 7,
        RightDown = 8
    }
    enum SliceStatus {
        Disable = 0,
        Enable = 1,
        Shelter = 2,
        Jump = 4,
        Safety = 8
    }
    const SliceColor: {
        [type: number]: number;
    };
    const DefaultSpeed: number;
    const enum HpColorType {
        Green = 0,
        Red = 1
    }
    /** 配置表场景点击类型*/
    const enum SceneClickType {
        Player = 1,
        Monster = 2,
        NPC = 3
    }
    const CameraOffsetY = 193;
    const enum ControlAIType {
        Stop = 1,
        Start = 2
    }
    /**boss血条结构接口*/
    interface BossHpData {
        entity_id: Long; /**实体id */
        cfg: Monster1Config; /**怪物配置 */
        max_hp: Long; /** 最大血量 */
        percent: number; /** 血量万分比 */
    }
    /**战斗类型*/
    const enum FightType {
        PVP = 1
    }
    const enum SceneIndex {
        /**经验副本 */
        JingYan = 160540001
    }
}
declare namespace game {
    import LanDef = game.localization.LanDef;
    const enum ShenLingEvent {
        ON_SHEN_LING_UPDATE_INFO = "on_shen_ling_update_info",
        ON_SHEN_LING_UP_STAR_INFO = "on_shen_ling_up_star_info",
        ON_SHEN_LING_JI_BAN_UPDATE = "on_shen_ling_ji_ban_update",
        ON_SHEN_LING_REWARD_UPDATE = "on_shen_ling_reward_update",
        ON_SHEN_LING_UPDATE_CNT = "on_shen_ling_update_cnt",
        ON_SHEN_LING_LING_QI_UPDATE = "on_shen_ling_ling_qi_update",
        ON_SHEN_LING_LING_PO_UPDATE = "on_shen_ling_ling_po_update",
        ON_SHEN_LING_LING_LI_UPDATE = "on_shen_ling_ling_li_update",
        ON_SHEN_LING_UPDATE_TYPE = "on_shen_ling_update_type",
        ON_LING_LI_ICON_SELECT = "on_ling_li_icon_select",
        ON_LING_LI_MAIN_ICON_SELECT = "on_ling_li_main_icon_select",
        ON_SHEN_LING_EVOLVE_INFO_UPDATE = "on_shen_ling_evolve_info_update"
    }
    /**神灵类型，风雷水火光暗*/
    const enum ShenLingType {
        Default = 0,
        Wind = 1,
        Mine = 2,
        Water = 3,
        Fire = 4,
        Light = 5,
        Dark = 6
    }
    /**神灵类型数组，火水风雷*/
    const ShenLingTypeAry: ShenLingType[];
    /**神灵类型按钮，所有类型0+火水风雷*/
    const ShenLingTypeBtnAry: ShenLingType[];
    /**神灵类型名称，风雷水火光暗*/
    const ShenlingTypeName: {
        [ShenLingType.Wind]: LanDef;
        [ShenLingType.Mine]: LanDef;
        [ShenLingType.Water]: LanDef;
        [ShenLingType.Fire]: LanDef;
        [ShenLingType.Light]: LanDef;
        [ShenLingType.Dark]: LanDef;
    };
    /**
     * 神灵 等级|攻击 属性
     */
    const ShenLingTypeAttrKey: {
        [type: number]: string[];
    };
    /**
     * 神灵合击tips展示内容
     * [读取人物属性，技能表cd字段，buff表probability字段]
     */
    const ShenLingHeJiAttrType: {
        [type: number]: string[];
    };
    /**
     * ShenLingHeJiAttrType 对应的 中文名
     */
    const ShenLingHeJiAttrTypeName: {
        [type: number]: string[];
    };
    /**神灵普攻技能展示内容*/
    const ShenLingPuGongAttr: string[];
    const ShenLingPuGongAttrName: string[];
    /**神灵技能类型*/
    const enum SLSkillType {
        HeJi = 1,
        LingBao = 2,
        PuGong = 3,
        Talent = 4
    }
    const enum ShenLingMdrType {
        Main = 1,
        UpStar = 2,
        Lingqi = 3,
        Lingpo = 4,
        Lingli = 5
    }
    /**灵魄套装icon数量*/
    const LingPoMaxCnt = 8;
    /**灵力主动技能idx*/
    const LingliMainSkillIdx = 999;
    /**灵力货币index*/
    const LingliPointAry: number[];
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    /**
     * 技能飘字
     */
    class SkillEftName extends DisplayObjectContainer {
        private static _ins;
        static getIns(): SkillEftName;
        show(idx: number): void;
    }
    class SkillEftNameItem extends DisplayObjectContainer {
        private img_bg;
        private img_name;
        constructor();
        show(idx: number): void;
        private hideSNShow;
    }
}
declare namespace game {
    const enum SkillType {
        firstSword = 1,
        HighSword = 2,
        RoleHighSkill = 33,
        YuLing = 37
    }
    const enum SkillType1 {
        Immortal = 1,
        Xianjian = 11,
        Shenbing = 10,
        Zuoqi = 7,
        YuanLing = 8,
        HuashengCommon = 17,
        Huasheng = 18
    }
    const enum SkillType2 {
        Skill = 1,
        PassiveSkill = 2
    }
    /**SpecialSkillData结构接口*/
    interface SpecialSkillData {
        preTime: number;
        preSkillId: number;
        delay: number;
    }
    const SpecialSkillList: {
        [skillType: number]: SpecialSkillData;
    };
    const SpecialSkillList2: {
        skillTypes: SkillType1[];
        preTime: number;
        preSkillId: number;
        delay: number;
    };
}
declare namespace game {
    const enum StoreEvent {
        ON_UPDATE_TYPE_INFO_1 = "on_update_type_info_1",
        ON_UPDATE_CHARGE_INFO = "on_update_charge_info",
        ON_UPDATE_DAILY_WEEKLY_INFO = "on_update_daily_weekly_info"
    }
    /** 商店类型 */
    const enum StoreType {
        Cangbaoge = 1,
        Yaojibaoku = 101,
        Xiandi = 105
    }
    /**商品id分类，映射direct_shop.json【商品id汇总表】*/
    const enum DirectShopType {
        /**仙玉商城*/
        Xianyu = 1,
        /**直购礼包*/
        Directbuy = 2,
        /**每日*/
        Daily = 3,
        /**每周*/
        Weekly = 4,
        /**战令*/
        GameOrder = 5,
        /**特权令*/
        PrerogativeWrit = 6,
        /**每日特惠*/
        MeiriTehui = 9,
        /**通天阁*/
        Tongtiange = 10,
        /**神灵天赋礼包*/
        ShenlingGift = 14,
        /**飞升礼包*/
        FeishengLibao = 15
    }
    /**限购类型*/
    const enum StoreLimitBuy {
        None = 0,
        Daily = 1,
        Lifetime = 2,
        Weekly = 3,
        Limit = 4
    }
    /**每日每周商城的类型对应pb类型*/
    const DirectType2PbType: {
        [DirectShopType.Daily]: number;
        [DirectShopType.Weekly]: number;
    };
    /**商城商品解锁类型*/
    const enum StoreUnlockType {
        Rebirth = 1,
        Vip = 2
    }
}
declare namespace game {
    const enum SurfaceEvent {
        LIANSHENDAN_INFO_UPDATE = "lianshendan_info_update",
        SURFACE_INFO_UPDATE = "surface_info_update",
        SURFACE_RIDE_INFO_UPDATE = "surface_ride_info_update",
        SURFACE_GIFT_INFO_UPDATE = "surface_gift_info_update",
        SURFACE_SPECIAL_ATTR_UPDATE = "surface_special_attr_update",
        SURFACE_JIBAN_INFO_UPDATE = "surface_jiban_info_update",
        SURFACE_SKILL_UPDATE = "surface_skill_update",
        YUANLIN_EQUIP_INFO_UPDATE = "yuanlin_equip_info_update",
        YUANLIN_SUIT_INFO_UPDATE = "yuanlin_suit_info_update",
        LING_CHONG_INFO_UPDATE = "ling_chong_info_update",
        ON_UPDATE_SHANGZHEN_INFO = "on_update_shangzhen_info",
        ON_UPDATE_XIANJIAN_INFO = "on_update_xianjian_info",
        SURFACE_ACT_UPDATE = "surface_act_update",
        ON_SURFACE_TIPS_HIDE = "on_surface_tips_hide"
    }
    const enum SurfaceUpOpType {
        /** 1:单次升级，2:一键升级 */
        Per = 1,
        Onekey = 2
    }
    const enum SurfaceStarOpType {
        /** 1:幻形激活/升星 2:幻化 */
        Act = 1,
        Battle = 2
    }
    const SurfacePerExp: number;
    const SurfacePerLv: number;
    /**
     * 系统的进阶奖励用表头，副本类的另外定义
     * 与后端商量，枚举如下
     * jinjiejiangli.json
     */
    const enum FubenAdvRewardIdx {
        YuanlingShilian = 10001
    }
    const enum SurfaceCfgType {
        Type2 = 2
    }
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import PoolObject = base.PoolObject;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Handler = base.Handler;
    class UIAvatar extends DisplayObjectContainer implements PoolObject, UpdateItem {
        private _ctrl;
        private _bodySource;
        private _body;
        private _bodyData;
        private _weaponSource;
        private _weapon;
        private _weaponData;
        private _wingSrc;
        private _wing;
        private _wingData;
        private _animate;
        private _animateTwFrame;
        private _animateCurTime;
        private readonly CROWN_DURATION_TIME;
        private _nextSwitchTime;
        private _showTime;
        private _isShowCrown;
        sex: number;
        is_ui: boolean;
        private _isLoop;
        constructor();
        private init;
        setCtrlCompHandler(handler: Handler): void;
        setCtrlLoop(isLoop: boolean): void;
        sortPart(dir: number): void;
        setBody(src: string): void;
        private removeBody;
        setWeapon(src: string): void;
        isHaveWeapon(): boolean;
        private removeWeapon;
        setWing(src: string): void;
        private removeWing;
        setAnimate(src: string, x?: number, y?: number, times?: number, speed?: number, scale?: number): void;
        private removeAnimate;
        private onLoaded;
        private onFrameChange;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
        update(time: Time): void;
    }
}
declare namespace game {
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    class UIEftHub {
        private readonly _host;
        private _id;
        private readonly _effect;
        private _uiRole;
        private _uiRoleOther;
        private readonly _fontData;
        constructor(host: DisplayObjectContainer);
        clearFont(container: DisplayObjectContainer, clearRef: boolean): void;
        /**
         * 添加字体
         * @param text 显示的文本
         * @param font 字体
         * @param container 存放字体的容器，一般为Group
         * @param horizontal 默认水平显示
         * @param scale 缩放，默认1
         * @param center 默认不居中显示
         * @param gap 字体间隔，默认0
         * @param expandParent 默认不设置container大小
         */
        addBmpFont(text: string, font: string, container: DisplayObjectContainer, horizontal?: boolean, scale?: number, center?: boolean, gap?: number, expandParent?: boolean): void;
        private onLoadedFont;
        private updateFont;
        clearAllFont(): void;
        stopEffect(id: number): void;
        playEffect(id: number): void;
        isPlaying(id: number): boolean;
        getEffectById(id: number | string): UIAnimate;
        removeEffect(id: number | string): void;
        private removeAvatar;
        removeAllEffects(): void;
        add(src: string, x: number, y: number, cb: Handler, times: number, parent: DisplayObjectContainer, idx: number, scale?: number, autoRemove?: boolean, speed?: number, isMirror?: boolean, scaleXBmpOffX?: number, rotation?: number): number;
        private onPlayComp;
        /**
         * 添加外显模型接口
         * @param index 外显index
         * @param parent 存放外显的容器，一般为Group
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param isWeapon 是否是武器，默认false
         * @param isGray 是否置灰，默认false
         * @param cb 动作播放完的回调
         * @param times 动作播放次数
         */
        addAnimate(index: number, parent: DisplayObjectContainer, dir?: number, act?: string, isUi?: boolean, isWeapon?: boolean, isGray?: boolean, cb?: Handler, times?: number): number;
        /**
         * 添加怪物模型接口
         * @param index 怪物index
         * @param parent 存放外显的容器，一般为Group
         */
        addMonster(index: number, parent: DisplayObjectContainer, dir?: number, act?: string): number;
        addMonsterByRes(res: string, parent: DisplayObjectContainer, dir?: number, act?: string): number;
        private updateAvatar;
        /**
         * 添加角色模型接口
         * @param body 身体
         * @param weapon 武器
         * @param wing 翅膀
         * @param parent 存放外显的容器，一般为Group
         * @param scale 缩放，默认1
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认true
         * @param otherRole 新的模型，用于展示两个玩家，默认false
         */
        updateUIRole(body: string, weapon: string, wing: string, parent: DisplayObjectContainer, scale?: number, dir?: number, act?: string, isUi?: boolean, otherRole?: boolean): void;
        updateUIRoleAtr(isLoop?: boolean, handler?: Handler): void;
        /**
         * 字体跳动
         * @param txt
         * @param container
         */
        addBmpDance(txt: string, container: egret.DisplayObjectContainer): void;
    }
}
declare namespace game {
    import GuildDrawConfig = game.config.GuildDrawConfig;
    const enum UnionEvent {
        /**加入宗门或者创建宗门 */
        ON_UPDATE_IN_UNION = "on_update_in_union",
        /**更新宗门视图 */
        ON_UPDATE_UNION_INFO = "on_update_union_info",
        /**更新成员申请列表 */
        ON_UPDATE_APPLY_LIST = "on_update_apply_list",
        /**更新成员列表 */
        ON_UPDATE_MEMBER_LIST = "on_update_member_list",
        /**更新宗门列表 */
        ON_UPDATE_UNION_LIST = "on_update_union_list",
        /**更新随机名字 */
        ON_UPDATE_UNION_NAME = "on_update_union_name",
        /**更新申请条件限制 */
        ON_UPDATE_APPLY_LIMIT = "on_update_apply_limit",
        /**更新福利大厅 */
        ON_UPDATE_WELFARE_INFO = "on_update_welfare_info",
        /**更新每日俸禄按钮 */
        ON_UPDATE_WAGE_BTN_INFO = "on_update_wage_btn_info",
        /**更新天坛 */
        ON_UPDATE_TIAN_LOTTERY_INFO = "on_update_tian_lottery_info",
        /**天坛抽奖动画 */
        ON_TWEEN_TIAN_LOTTERY_START = "on_tween_tian_lottery_start",
        /**更新圣坛 */
        ON_UPDATE_SHENG_LOTTERY_INFO = "on_update_sheng_lottery_info",
        /**更新圣坛走马灯 */
        ON_UPDATE_RUN_MESSAGE_INFO = "on_update_run_message_info",
        /**更新仙尊秘宝列表 */
        ON_UPDATE_HERO_SHOP_INFO = "on_update_hero_shop_info",
        /**更新设置仙尊列表 */
        ON_UPDATE_SET_HERO_LIST = "on_update_set_hero_list",
        /**遗宝排行 */
        ON_UPDATE_TREASURE_RANK_INFO = "on_update_treasure_rank_info",
        /**遗宝协助列表 */
        ON_UPDATE_TREASURE_HELP_INFO = "on_update_treasure_help_info",
        /**遗宝 */
        ON_UPDATE_TREASURE_INFO = "on_update_treasure_info",
        /**斩妖台 */
        ON_UPDATE_KILL_INFO = "on_update_kill_info",
        /**斩妖台排行榜 */
        ON_UPDATE_KILL_RANK_INFO = "on_update_kill_rank_info",
        /**仓库 */
        ON_UPDATE_STORAGE_INFO = "on_update_storage_info",
        /**拍卖 */
        ON_UPDATE_AUCTION_INFO = "on_update_auction_info",
        /**宗门宝库 */
        ON_UPDATE_STORE_INFO = "on_update_store_info",
        /**书斋 */
        ON_UPDATE_BOOK_INFO = "on_update_book_info",
        /**仙兽 */
        ON_UPDATE_BEAST_INFO = "on_update_beast_info",
        /**仙兽每周奖励 */
        ON_UPDATE_BEAST_REWARD_INFO = "on_update_beast_reward_info",
        /**仙兽排行 */
        ON_UPDATE_BEAST_RANK_INFO = "on_update_beast_rank_info"
    }
    /**宗门职介 */
    const enum UnionJob {
        /**已退出 */
        Leave = 0,
        /**宗主 */
        Leader = 1,
        /**副的 */
        Deputy = 2,
        /**精英 */
        Elite = 3,
        /**成员 */
        General = 4
    }
    /**职位文本 */
    const UnionJobStr: {
        [job: number]: string;
    };
    /** */
    const enum UnionOper {
        ADD = 1,
        DEL = 2,
        UPDATE = 3
    }
    /**申请列表同意/忽略 */
    const enum UnionApplyOper {
        AGREE = 1,
        REFUSE = 2
    }
    /**成员职务操作 */
    const enum UnionJobOper {
        UP = 1,
        DOWN = 2
    }
    /**创建宗门界面状态类型 */
    const enum UnionCreateViewStatus {
        COMMON = "common",
        VIP = "vip"
    }
    /**创建宗门类型 */
    const enum UnionCreateType {
        COMMON = 1,
        VIP = 2
    }
    /**宗门天坛/圣坛抽奖 */
    const enum UnionLottery {
        /**天坛 */
        TIAN = 1,
        /**圣坛 */
        SHENG = 2
    }
    /**抽奖次数 */
    const enum UnionLotteryCount {
        ONE = 1,
        TEN = 2
    }
    const enum UnionRewardType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4
    }
    /**天坛icon坐标 */
    interface UnionTianPos {
        index: number;
        x: number;
        y: number;
    }
    /**天坛icon数据结构 */
    interface UnionTianData {
        /**配置 */
        cfg: GuildDrawConfig;
        /**播放特效 */
        eff?: boolean;
        /**已抽数量 */
        count?: number;
    }
    interface UnionSelectData {
        key: string;
        value: string;
    }
    const UnionSelectDefault: {
        key: string;
        value: string;
    };
}
declare namespace game {
    const enum ViewEvent {
        ON_COMMON_BACK = "on_common_back",
        ON_VIEW_HIDE = "on_view_hide"
    }
    /**SkillItemRender结构接口*/
    interface IJumpData {
        viewDatas: string[];
        openIdx?: number;
        layer?: number;
        icon?: string;
    }
    const enum JumpViewType {
        Main = 1,
        SecondPop = 2,
        Third = 3
    }
    /** 跳转id*/
    const enum JumpIdx {
        Xianlu = 1,
        Shilian = 2,
        Fuben2 = 3,
        Fuben3 = 4,
        OfflineGain = 5,
        Boss = 6,
        Shenling = 7,
        Pass = 8,
        Role = 9,
        RoleCollect = 10,
        Xianfa = 11,
        Body = 12,
        Youli = 13,
        Xianlu2 = 14,
        Lingchong = 15,
        Horse = 16,
        Xianta = 17,
        Wing = 18,
        Forbidden = 19,
        Xiandan = 20,
        Strength = 21,
        Advanced = 22,
        Gem = 23,
        SuitType1 = 24,
        BagMelt = 25,
        Yuanling = 26,
        Store = 27,
        WonderfulAct1 = 28,
        Summon = 29,
        Daily = 30,
        Amass = 31,
        Amass2 = 32,
        Consecrate = 33,
        Chat = 34,
        SignGift = 35,
        Union = 36,
        Tianshen = 37,
        RoleRing = 38,
        Friend = 39,
        FirstCharge = 40,
        Lingchi = 41,
        Yaojijiangshi = 42,
        VIP = 43,
        PrerogativeWrit = 44,
        WorldMap = 45,
        StoreXianyu = 46,
        KillBoss = 47,
        PersonalBoss = 48,
        Yijie = 49,
        YonghengYijie = 50,
        VipBoos = 51,
        StoreDaily = 52,
        StoreWeek = 53,
        ExchangeType1 = 54,
        ExchangeType2 = 55,
        ExchangeType3 = 56,
        ExchangeType4 = 57,
        ExchangeType5 = 58,
        ExchangeType6 = 59,
        ExchangeType7 = 60,
        ExchangeType8 = 61,
        ExchangeType9 = 62,
        Zhaocaixian = 63,
        Chuangguanling = 64,
        Huoyueling = 65,
        ZeroBuy = 66,
        Doufa = 67,
        Weapon = 68,
        PunshList = 69,
        PrerogativeWrit2 = 70,
        PrerogativeWrit3 = 71,
        Xiuxianling = 72,
        BagDel = 73,
        Xianlv = 74,
        XianlvRenwu = 75,
        XianlvShilian = 76,
        XianlvChild = 77,
        CrossBoss = 78,
        HorseGitf = 79,
        TianshenGift = 80,
        WingGift = 81,
        WeaponGift = 82,
        XianlvRing = 83,
        HuangGuForbidden = 84,
        XianLingForbidden = 85,
        TianZhiForbidden = 86,
        Xianta2 = 87,
        UnionJuanXian = 88,
        XianMengTianTan = 89,
        XianMengShengTan = 90,
        RoleRing2 = 91,
        RoleRing3 = 92,
        Bossgift = 93,
        Yijiegift = 94,
        Shiliangift = 95,
        Fuben2gift = 96,
        Fuben3gift = 97,
        Fuben4gift = 98,
        Youligift = 99,
        XianYuanGift = 100,
        Tiandilu = 101,
        Tiandiluxuanyuan = 102,
        SupremeGit = 103,
        Shenlingjiban = 104,
        Huashen = 105,
        Huashenzhilu = 106,
        Achieve = 107,
        Lottery = 108,
        Xianjian = 109,
        UnionKill = 110,
        Zhandui = 111,
        Zhandui1 = 112,
        HorseStar = 113,
        TianshenStar = 114,
        WingStar = 115,
        WeaponStar = 116,
        HuashenStar = 117,
        Yaojijiangshi3 = 118,
        Yaojijiangshi2 = 119,
        XujieJitan = 120,
        UnionTreasure = 121,
        VipPrivilege = 122,
        UnionStorage = 123,
        UnionHeroShop = 124,
        UnionBeast = 125,
        UnionBook = 126,
        UnionWage = 127,
        KuafuDoufa = 128,
        Shenling3 = 129,
        Shenling4 = 130,
        Shenling5 = 131,
        XujieTansuo = 132,
        XujieKuangmai = 133,
        Xiandi = 134,
        XianmaiZhengduo = 135,
        ZuoqiGift = 136,
        Qiyuan = 137,
        XianLvJinJie = 138,
        Abyss = 139,
        Sea1 = 140,
        Sea2 = 141,
        Sea3 = 142,
        Fuchenlinghu = 143,
        Linghujingling = 144,
        Huanjing = 145,
        Huanggu = 146,
        Title = 147,
        Goddess = 148,
        GoddessRecord = 149,
        Activity = 1000,
        HangUp2 = 1002,
        Pass2 = 1003,
        ShowName = 100001
    }
    /**跳转数据*/
    const JumpDataList: {
        [jumpIdx: number]: IJumpData;
    };
    /**飞升榜进阶丹映射跳转ID,todo*/
    const FlyPropToJumpIdx: {
        [PropIndex.Zuoqijinjiedan]: JumpIdx;
        [PropIndex.Yuyijinjiedan]: JumpIdx;
        [PropIndex.Shenbinjiedan]: JumpIdx;
        [PropIndex.Yuanlingjinjiedan]: JumpIdx;
        [PropIndex.Xianjianjinjiedan]: JumpIdx;
    };
    /**外显炼神丹映射跳转ID,todo*/
    const LianshendanToJumpIdx: {
        [PropSubType17.Horse]: JumpIdx;
        [PropSubType17.Tianshen]: JumpIdx;
        [PropSubType17.Wing]: JumpIdx;
        [PropSubType17.Weapon]: JumpIdx;
        [PropSubType17.Body]: JumpIdx;
        [PropSubType17.Huashen]: JumpIdx;
    };
}
declare namespace game {
    const enum VipEvent {
        UPDATE_VIP_INFO = "update_vip_info"
    }
}
declare namespace game {
    const enum XianfaEvent {
        UPDATE_XIANFA_INFO = "update_xianfa_info"
    }
    const enum XianfaType {
        Type1 = 1
    }
    const XianfaSkillNum = 6;
}
declare namespace game {
    const enum XianluEvent {
        XIUXIAN_INFO_UPDATE = "xiuxian_info_update",
        XIANDAN_INFO_UPDATE = "xiandan_info_update",
        LINGCHI_INFO_UPDATE = "lingchi_info_update",
        LINGCHI_TIME_UPDATE = "lingchi_time_update",
        LINGMAI_INFO_UPDATE = "lingmai_info_update",
        LINGGEN_INFO_UPDATE = "linggen_info_update",
        REINCARNATE_INFO_UPDATE = "reincarnate_info_update"
    }
    const LingmaiMaxLv = 10;
    const RebirthMaxLv = 10;
}
declare namespace game {
    const enum XianyuanEvent {
        ON_UPDATE_BANLV_INFO = "on_update_banlv_info",
        ON_UPDATE_INVITE_RECORDS = "on_update_invite_records",
        ON_UPDATE_CHILD_INFO = "on_update_child_info",
        ON_UPDATE_CHILD_JIBAN_INFO = "on_update_child_jiban_info",
        ON_UPDATE_CHILD_SHENBING_INFO = "on_update_child_shenbing_info",
        ON_UPDATE_CHILD_SHARE_INFO = "on_update_child_share_info",
        ON_UPDATE_RING_INFO = "on_update_ring_info",
        ON_UPDATE_SHILIAN_INFO = "on_update_shilian_info",
        ON_UPDATE_SHILIAN_DAMAGE = "on_update_shilian_damage",
        ON_UPDATE_SHILIAN_RANK_INFO = "on_update_shilian_rank_info",
        ON_UPDATE_SHILIAN_JIFEN_INFO = "ON_UPDATE_SHILIAN_JIFEN_INFO",
        ON_UPDATE_XIANLV_DOUFA_INFO = "on_update_xianlv_doufa_info",
        ON_UPDATE_XIANLV_DOUFA_RANK = "on_update_xianlv_doufa_rank",
        ON_UPDATE_XIANLV_DOUFA_AUTO = "on_update_xianlv_doufa_auto"
    }
    /**子女界面二级页签，升星|神兵|灵翼*/
    const enum XianlvSecondTabType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4
    }
    /**子女神兵灵翼类型*/
    const enum XianlvSurfaceType {
        Shenbing = 1,
        Lingyi = 2
    }
    /**子女神兵灵翼名称*/
    const XianlvSurfaceName: string[];
}
declare namespace game {
    const enum YijieEvent {
        ON_YIJIE_INFO_UPDATE = "on_yijie_info_update",
        ON_YIJIE_SEL_UPDATE = "on_yijie_sel_update",
        ON_YIJIE_SCENE_UPDATE = "on_yijie_scene_update",
        BOSS_LIST_INFO_UPDATE = "boss_list_info_update",
        ON_YONGHENG_YIJIE_INFO_UPDATE = "on_yongheng_yijie_info_update",
        ON_YONGHENG_YIJIE_SCENE_UPDATE = "on_yongheng_yijie_scene_update"
    }
    const enum YijieFightType {
        Pvp = 1,
        Team = 2,
        All = 3
    }
    const enum YijieBossType {
        Yijie = 1,
        YonghengYijie = 2
    }
    const YijieBossNum = 5;
    const enum SeaEvent {
        ON_SEA_INFO_UPDATE = "on_sea_info_update",
        ON_SEA_RANK_UPDATE = "on_sea_rank_update"
    }
    const enum SeaType {
        Sea1 = 1,
        Sea2 = 2,
        Sea3 = 3
    }
    /**幻境之海类型数组*/
    const SeaTypeAry: SeaType[];
    const SeaTypeToTaskType: {
        [type: number]: number;
    };
    const SeaTypeToRoleKey: {
        [type: number]: string;
    };
    const enum SeaOpType {
        Enter = 1,
        Reward = 2,
        Challenge = 3,
        Attack = 4,
        Rank = 5,
        RankReward = 6
    }
    const SeaBossPosNum = 5;
    const SeaShenlingNum = 4;
    const SeaShenlingEft: {
        [pos: number]: string;
    };
    const SeaShenlingEftRotation: {
        [pos: number]: number;
    };
    const SeaShenlingDir: {
        [pos: number]: number;
    };
}
declare namespace game {
    const enum YishouEvent {
        ON_UPDATE_YISHOU_BASE_INFO = "on_update_yishou_base_info",
        ON_UPDATE_YISHOU_EQUIP_INFO = "on_update_yishou_equip_info",
        ON_UPDATE_YISHOU_SHOULING_INFO = "on_update_yishou_shouling_info",
        ON_UPDATE_YISHOU_COMPOSE_SELECT = "on_update_yishou_compose_select",
        ON_UPDATE_YISHOU_SYNTHESE_SUCCESS = "on_update_yishou_synthese_success",
        ON_UPDATE_YISHOU_SHOUYIN_INFO = "on_update_yishou_shouyin_info",
        ON_UPDATE_YISHOU_SHOUYIN_JIBAN_INFO = "on_update_yishou_shouyin_jiban_info"
    }
    /**兽骨分类，对应装备id的部位*/
    const enum YishouShouguPos {
        Shouya = 0,
        Shouhe = 1,
        Shouke = 2,
        Shoulin = 3,
        Shouyi = 4,
        ShouZhua = 5,
        Shouci = 6,
        Shouwei = 7
    }
    /**兽骨分类数组*/
    const YishouShouguPosAry: YishouShouguPos[];
    /**异兽类型*/
    const enum YishouType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
        Type5 = 5
    }
    /**异兽类型对应数组*/
    const YishouTypeAry: YishouType[];
    /**mdr分类*/
    const enum YishouMdrType {
        Shougu = 1,
        Shouhun = 2
    }
    /**异兽背包icon数量*/
    const YishouBagCnt = 100;
    /**合成材料icon数量*/
    const YishouComposeIconCnt = 3;
    /**异兽兽印类型*/
    const enum YishouShouyinType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3
    }
}
declare namespace game {
    import Handler = base.Handler;
    class InitAnim {
        private static AnimBin;
        private static _url;
        static getNum(handler: Handler): void;
        static load(): void;
    }
}
declare namespace game {
    import Handler = base.Handler;
    class InitCfg {
        private static _urlList;
        private static CfgRoot;
        static getNum(handler: Handler): void;
        static load(): void;
    }
}
declare namespace game {
    function initEui(): void;
}
declare namespace game {
    function initLog(): void;
}
declare namespace game {
    import Handler = base.Handler;
    class InitMap {
        private static MapData;
        private static _url;
        static getNum(handler: Handler): void;
        static load(): void;
    }
}
declare namespace game {
    import Handler = base.Handler;
    class InitPreload {
        private static groupList;
        private static preloadList;
        static getNum(handler: Handler): void;
        private static init;
        static load(): void;
    }
}
declare namespace game {
    import Handler = base.Handler;
    class InitTheme {
        private static handlerMap;
        private static ThemeRoot;
        private static getTheme;
        private static onListLoaded;
        private static onLoadOne;
        static newTheme(): void;
        static getNum(handler: Handler): void;
        static load(): void;
    }
}
declare namespace game {
    function loadRes(): void;
    function resLoaded(): void;
}
declare namespace game {
    import Handler = base.Handler;
    import PoolObject = base.PoolObject;
    import ObjBase = base.ObjBase;
    class ResExt extends ObjBase implements PoolObject {
        private _groups;
        private _onComp;
        private _total;
        private _loaded;
        private load;
        private onGroupCom;
        dispose(): void;
        onAlloc(): void;
        onRelease(): void;
        private static _listMap;
        static loadGroupList(groups: string[], onComp: Handler): void;
        private static onListComp;
    }
}
declare namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import DisposeObject = base.DisposeObject;
    import Handler = base.Handler;
    type MdrClsList = (new (p: DisplayObjectContainer) => MdrBase)[];
    interface MdrTab extends DisposeObject {
        show(): void;
        hide(): void;
        btnList: eui.List;
        mdrClsList: MdrClsList;
        changeHandler: Handler;
        condCheck: Handler;
        selectIndex: number;
        params: any;
    }
}
declare namespace game {
    class CmdBase extends base.Cmd {
    }
}
declare namespace game {
    class Game {
        constructor();
        private init;
    }
}
declare namespace game {
    class ModBase extends base.Mod {
        regProxy<T extends base.IProxy>(type: number, cls: {
            new (): T;
        }): void;
    }
}
declare namespace game {
    import GameNT = base.GameNT;
    class ProxyBase extends base.Proxy {
        initialize(): void;
        /**需要监听的，子类重写下*/
        protected onBagUpdateByPropIndex(n: GameNT): void;
        protected onBagUpdateByPropType(n: GameNT): void;
        protected onBagUpdateByBagType(n: GameNT): void;
        protected onBagUpdateByPropTypeAndSubType(n: GameNT): void;
        protected onBagUpdateByHeadType(n: GameNT): void;
        protected onRoleUpdate(n: GameNT): void;
        protected reincarnateInfoUpdate(n: GameNT): void;
        protected onRolePrivilegeUpdate(n: GameNT): void;
        protected onTaskUpdate(n: GameNT): void;
        protected onTaskHint(n: GameNT): void;
        protected onOpenFuncInit(n: GameNT): void;
        protected onOpenFuncUpdate(n: GameNT): void;
        protected onServerDayUpdate(n: GameNT): void;
        protected onMainPassGuanqiaUpdate(n: GameNT): void;
        protected onSurfaceInfoUpdate(n: GameNT): void;
        protected onShenlingInfoUpdate(n: GameNT): void;
        protected onSurfaceTipsHide(n: GameNT): void;
        protected onActivityInit(n: GameNT): void;
        protected onActivityUpdateByType(n: GameNT): void;
        protected onUpdateZhenrongInfo(n: GameNT): void;
        protected onUpdateGivingList(n: GameNT): void;
        protected onUpdateSceneEnter(n: GameNT): void;
        protected onBanlvInfoUpdate(n: GameNT): void;
        protected onSeaInfoUpdate(n: GameNT): void;
    }
}
declare namespace game {
    import prop_attributes = msg.prop_attributes;
    import PoolObject = base.PoolObject;
    import attributes = msg.attributes;
    import ITextElement = egret.ITextElement;
    import jipin_attrs_data = msg.jipin_attrs_data;
    import gem_data = msg.gem_data;
    import nvshen_hunka_struct = msg.nvshen_hunka_struct;
    /**
     * 道具数据类
     */
    class PropData implements PoolObject {
        private _prop_id; /** 唯一id*/
        private _index; /** 物品编号*/
        private _count; /** 数量*/
        private _quality; /** 品质*/
        private _iconShowType; /**显示类型，客户端定义*/
        private _regular_attrs; /** 装备固定属性*/
        private _zengfu_attrs; /**装备增幅属性*/
        private _zengfu_lv; /**装备增幅属性等级*/
        private _jipin_list; /**装备极品属性*/
        private _advanced_lv; /**装备进阶等级*/
        private _advanced_attrs; /**装备进阶属性*/
        private _strength; /**强化等级*/
        private _strength_attrs; /**强化属性*/
        private _gems; /**宝石列表*/
        private _advanced_master_attrs; /**进阶套装属性*/
        private _hunka_star;
        private _hunka_zizhi;
        private _guding;
        private _shuiji;
        private _pingfen;
        private _born_login_days;
        static headMap: {
            [type: string]: {
                [index: string]: number;
            };
        };
        /**
         *更新数据
         * @param {msg.prop_attributes} attr
         * @param {boolean} _isSome 是否缺省替换
         */
        update(attr: prop_attributes, _isSome?: boolean): void;
        /**
         *更新数据
         */
        update2(obj: any, name: string, _isSome?: boolean): void;
        onAlloc(): void;
        onRelease(): void;
        dispose(): void;
        /**
         * 克隆数据
         * @param prop
         */
        static clone(prop: PropData): PropData;
        /**
         * 过滤掉属性为 0 的属性
         */
        static filterAtr0(source: attributes): attributes;
        /**
         *创建数据
         * @param {number} index
         * @param {number} count
         * @param {number} iconShowType 类型
         * @returns {game.PropData}
         */
        static create(index: number | Long, count?: number, iconShowType?: number): PropData;
        /**转换数据*/
        static fromData(attr: prop_attributes): PropData;
        /** 根据物品id获取物品类型 -DE，PropType*/
        static propType(index: number): number;
        /**显示类型，客户端定义*/
        iconShowType: number;
        /** 唯一id*/
        readonly prop_id: Long;
        /** 物品编号*/
        readonly index: number;
        /** 数量*/
        count: number;
        /** 品质*/
        readonly quality: number;
        /** 获取配置*/
        readonly cfg: any;
        /**获取index规则对应的类型，目前只有进背包的道具会用到*/
        static getPropParse(index: number, parseType?: PropParseType): number;
        /** 大类 -ABCDE，用于bag_type配置取排序*/
        readonly bigType: number;
        /** 表头 -ABC，表头ConfigHead*/
        readonly type: number;
        /** 道具表物品类型 -DE，PropType*/
        readonly propType: number;
        /** 物品子类型 -FG*/
        readonly propSubType: number;
        /** 物品或者装备分解获得*/
        readonly resolve: number[][];
        /** 物品描述*/
        readonly desc: string;
        /** 获取途径跳转ID*/
        readonly gain_id: number[];
        /** 物品名称，格式化好的*/
        getPropName(isWhite?: boolean): ITextElement[];
        /** 物品名称*/
        getPropNameStr(isWhite?: boolean): string;
        /**装备部位*/
        readonly equipPos: number;
        /**装备星级*/
        readonly equipStar: number;
        /** 装备固定属性*/
        readonly regular_attrs: attributes;
        /**装备增幅属性*/
        readonly zengfu_attrs: attributes;
        /**根据属性key获取对应的增幅属性文本*/
        getZengFuAttrStrByKey(key: string): string;
        /**装备极品属性*/
        readonly jipin_list: jipin_attrs_data[];
        /**装备增幅属性等级*/
        readonly zengfu_lv: number;
        /**装备进阶等级*/
        advanced_lv: number;
        /**装备进阶属性*/
        advanced_attrs: attributes;
        /**强化等级*/
        strength: number;
        /**强化属性*/
        strength_attrs: attributes;
        /**宝石列表 */
        gems: gem_data[];
        /**进阶套装属性*/
        advanced_master_attrs: attributes;
        readonly hunka_star: number;
        readonly hunka_zizhi: number;
        readonly guding: nvshen_hunka_struct;
        readonly shuiji: nvshen_hunka_struct[];
        readonly pingfen: number;
        readonly born_login_days: number;
    }
}
declare namespace game {
    import property = msg.property;
    import attributes = msg.attributes;
    class RoleVo {
        private static _ins;
        static setIns(value: RoleVo): void;
        static readonly ins: RoleVo;
        starttime: number;
        server_open_date: number;
        create_time: number;
        server_id: number;
        fashion: number; /** 时装*/
        weapon: number; /** 轻剑*/
        wing: number; /** 翅膀*/
        title_index: number;
        head: number;
        head_frame: number;
        head_lv: number;
        head_frame_lv: number;
        mate_id: Long;
        mate_name: string;
        marry_type: number;
        marry_time: number;
        charge_rmb: number;
        day_charge_rmb: number;
        extreme_vip: boolean;
        honor_vip: boolean;
        /**角色信息*/
        role_id: Long;
        exp: Long;
        levelup_exp: Long;
        name: string;
        level: number;
        sex: number;
        reincarnate: number;
        vip_lv: number;
        /**角色信息*/
        entity_id: Long;
        /**新的货币*/
        gold: Long;
        diamond: Long;
        /**新的货币这里不用处理，PropIndex需要对应加下*/
        /** 属性相关 */
        showpower: Long;
        godpower: Long;
        private max_hp;
        god_hp: number;
        atkspeed: number;
        god: number;
        /** 属性相关 */
        /**系统时间相关数值*/
        storage_time: number;
        /**系统时间相关数值*/
        isOpenAutoOneKey: boolean;
        constructor(isBack?: boolean);
        private levelChange;
        /**通过属性key获取属性数值，统一用这个*/
        getValueByKey(key: string): number;
        /**外部设置属性数值，不建议使用*/
        setValueByKey(key: string, val: number): void;
        update(prop: property | attributes, res?: string[]): string[];
    }
}
declare namespace game {
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import scene_skill = msg.scene_skill;
    import SkillShowConfig = game.config.SkillShowConfig;
    class SkillData {
        static NEXT_SKILL_CD: number;
        static USE_SKILL_TIME: number;
        private static _lastActIdx;
        private static _normal_skill;
        private static _isHuashenXing;
        static getActIdx(skillIdx: number): number[];
        /**
         * 获取某个技能的信息
         * @param skillId
         */
        static getSkillInfo(skillId: number): scene_skill;
        static getLeftCd(skill: scene_skill): number;
        static getPassTime(skill: scene_skill): number;
        static getTotalCd(skill: scene_skill): number;
        /**判断是否冷却*/
        static isEnable(skill: scene_skill): boolean;
        /**普攻技能*/
        static isCommonAtk(idx: number): boolean;
        /**是否是仙法技能*/
        static isImmortalSkill(idx: number): boolean;
        /**是否是仙剑技能*/
        static isXianjianSkill(idx: number): boolean;
        /**是否是化神技能 */
        static isHuashenSkill(idx: number): boolean;
        /**是否是化神普工 */
        static isHuashenCommonSkill(idx: number): boolean;
        /**是否在化神中*/
        static isHuashenXing(): boolean;
        /**是否在化神中*/
        static setHuashenXing(ret: boolean): void;
        /**是否是需要特殊处理的技能 */
        static isSpecialSkill(idx: number): boolean;
        /**是否是需要特殊处理的技能2 */
        static isSpecialSkill2(idx: number): boolean;
        static isShenJueSkill(idx: number): boolean;
        static isDiBingSkill(idx: number): boolean;
        static getCfg(idx: number): BattleSkillConfig;
        /**获取技能类型*/
        static getSkillType1(idx: number): SkillType1;
        static getEffCfg(idx: number): SkillShowConfig;
        /**获取技能优先级*/
        static getSkillPriority(idx: number): number;
    }
}
declare namespace game {
    class ColorUtil {
        private static colorMap;
        /**根据品质获取颜色*/
        static getColorByQuality(quality: number): Color;
        private static colorStrMap;
        /**根据品质获取#颜色缩写*/
        static getColorStrByQua(quality: number): string;
        private static whitColorMap;
        /**根据品质获取颜色（白底）*/
        static getColorByQuality1(quality: number): WhiteColor;
        private static blackColorMap;
        /**根据品质获取颜色（黑底）*/
        static getColorByQuality2(quality: number): BlackColor;
        private static colorChineseStrMap;
        static getColorChineseStrByQua2(quality: number): string;
    }
}
declare namespace game {
    import Tween = base.Tween;
    import Handler = base.Handler;
    class MathUtil {
        static RAD_2_DEG: number;
        static DEG_2_RAD: number;
        private static ONE;
        static rad2deg(rad: number): number;
        static deg2rad(degrees: number): number;
        static sinArr: number[];
        static cosArr: number[];
        static round(val: number): number;
        static clamp(input: number, min: number, max: number): number;
        static randomDir(dir: number): number;
        static parabolic2(node: egret.DisplayObject, time: number, p2: {
            x: number;
            y: number;
        }, handler?: Handler, tween?: Tween, atr?: {
            scale: number;
            alpha: number;
        }): Tween;
        static parabolic3(node: egret.DisplayObject, time: number, cp: {
            x: number;
            y: number;
        }, p2: {
            x: number;
            y: number;
        }, handler?: Handler, tween?: Tween, atr?: {
            scale: number;
            alpha: number;
        }): Tween;
        static getMinNumber(ary: number[]): number;
    }
}
declare namespace game {
    class Md5Tool {
        private static _instance;
        static ins(): Md5Tool;
        private hexcase;
        private b64pad;
        hex_md5(s: any): any;
        b64_md5(s: any): any;
        any_md5(s: any, e: any): any;
        hex_hmac_md5(k: any, d: any): string;
        private b64_hmac_md5;
        private any_hmac_md5;
        md5_vm_test(): boolean;
        rstr_md5(s: any): string;
        rstr_hmac_md5(key: any, data: any): string;
        rstr2hex(input: any): string;
        rstr2b64(input: any): string;
        rstr2any(input: any, encoding: any): string;
        str2rstr_utf8(input: any): string;
        str2rstr_utf16le(input: any): string;
        str2rstr_utf16be(input: any): string;
        rstr2binl(input: any): any[];
        binl2rstr(input: any): string;
        binl_md5(x: any, len: any): number[];
        md5_cmn(q: any, a: any, b: any, x: any, s: any, t: any): number;
        md5_ff(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        md5_gg(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        md5_hh(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        md5_ii(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        safe_add(x: any, y: any): number;
        bit_rol(num: any, cnt: any): number;
    }
}
declare namespace game {
    import Point = egret.Point;
    class PointUtil {
        static distance(x0: number, y0: number, x1: number, y1: number): number;
        static distancePt(p0: Point, p1: Point): number;
        static distance1(p0: Point, x1: number, y1: number): number;
        static distanceSquare(x0: number, y0: number, x1: number, y1: number): number;
        static distanceSquarePt(p0: Point, p1: Point): number;
        static distanceSquare1(p0: Point, x1: number, y1: number): number;
        static getDistPt(fromPt: Point, radians: number, dist: number, res?: Point): Point;
        /**
         * 获取从pt0 到距离pt1 dist距离的点，pt0起点，pt1终点
         * @param {egret.Point} pt0
         * @param {egret.Point} pt1
         * @param {number} dist
         * @param {egret.Point} res
         * @return {egret.Point}
         */
        static getDistPt2(pt0: Point, pt1: Point, dist: number, res?: Point): Point;
        static anglePt(sPt: Point, ePt: Point): number;
        static angle1(sx: number, sy: number, ePt: Point): number;
        static angle(sx: number, sy: number, ex: number, ey: number): number;
        /**坐标转换 某个点转到某个层的坐标  local
         *
         * @param localPos 通过接口 localToGlobal 获得
         * @param layer 需要转到该对象的坐标系统
         */
        static switchLocalPos(localPos: Point, layer: egret.DisplayObjectContainer): Point;
        /**坐标转换 某个点转到某个层的坐标  local
         *
         * @param localNode 节点对象
         * @param layer 需要转到该对象的坐标系统
         */
        static switchLocalPos2(localNode: egret.DisplayObjectContainer, layer: egret.DisplayObjectContainer): Point;
    }
}
declare namespace game {
    /**外显模型数据结构接口*/
    interface ISurfaceData {
        index?: number;
        /**外显index */
        url?: string;
        /**外显资源 */
        x?: number;
        /**外显x坐标偏移 */
        y?: number;
        /**外显y坐标偏移 */
        scale?: number; /**外显缩放 */
    }
    class ResUtil {
        /**********************地图*********************/
        static getMapMaskUrl(mapId: string | number): string;
        static getMapBlurUrl(mapId: string | number): string;
        /**********************字体*********************/
        static getFontUrl(name: string): string;
        /**********************Ui字体*********************/
        static getFontUiUrl(name: string): string;
        /**********************特效*********************/
        static getEffectUI(src: string | number): string;
        static getSkillEftUrl(id: string | number): string;
        static getSkillEftSubUrl(id: string | number, sub: number): string;
        static getGroupEftUrl(id: string | number): string;
        /**********************声音*********************/
        static getSoundUrl(name: string): string;
        /**
         * 技能提示图片
         * @param {string} name
         * @returns {string}
         */
        static getSkillEffectSrc(name: string): string;
        /************************新的资源获取*****************************/
        static getMapBmpUrl(mapId: string | number, c: number, r: number): string;
        /**
         * 获取道具品质底
         * @param quality
         * @param isHex 是否是六边形品质框
         */
        static getPropQualityImg(quality: number, isHex?: boolean): string;
        /**获取道具图标*/
        static getUiProp(des: string | {
            index: number;
            icon: string;
        }, isGray?: boolean): string;
        /**
         * 获取转生字体资源
         * @param index，转生index
         * @param withoutChong，不显示重数
         */
        static getRebirthFontStr(index: number, withoutChong?: boolean): string;
        /**
         * 获取中文字体资源
         * @param stage,等级之类的数值
         */
        static getChineseFontStr(stage: number): string;
        static getTitleSrc(idx: number, star?: number): string;
        static getDressUpIcon(str: string | number, sex?: number): string;
        static getUiPng(src: string): string;
        static getUiJpg(name: string): string;
        /**
         * 获取品质底图
         * @param quality 品质，技能品质底默认品质5红色
         */
        static getBgQuality(quality?: number): string;
        /**
         * 获取SR角标
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        static getSrQuality(quality: number, specialQuality?: SpecialQualityType): string;
        /**
         * 获取品质底图
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        static getBigBg(quality: number, specialQuality?: SpecialQualityType): string;
        /**
         * 获取品质边框
         * @param quality 品质
         * @param specialQuality 特殊品质（黄玄地天）优先级更高
         */
        static getBigFrame(quality: number, specialQuality?: SpecialQualityType): string;
        /**
         * 获取大图标
         * @param icon string
         */
        static getBigIcon(icon: string): string;
        static getUiFace(name: string): string;
        /**
         * 获取模型资源数据，用于界面模型显示，玩家自己的数据
         * @param index 外显index
         * @param dir 方向，不需要传，默认5
         * @param act 动作，不需要传，默认站立
         * @param isUi UI模型，默认false
         * @param isWeapon 是否是武器，默认false
         */
        static getSurfaceData(index: number, dir: number, act: string, isUi?: boolean, isWeapon?: boolean): ISurfaceData;
        /**
         * 获取模型动作资源，如：assets\anim\body\female_01\atk1_2
         * */
        static getModelUrl(index: number, dir: number, act: string, isUi?: boolean, sex?: number, isSingle?: boolean, isWeapon?: boolean): string;
        /**
         * 获取模型名称，如：female_01
         * @param index
         * @param sex 默认Sex.Male
         * @param isSingle 翅膀和神兵模型区分UI显示 默认false
         * @param shenlingEvolve 神灵进化次数，默认0
         */
        static getModelName(index: number, sex?: number, isSingle?: boolean, shenlingEvolve?: number): string;
        /**
         * 通过外显表头，模型名称获取模型动作资源，如：assets\anim\body\female_01\atk1_2
         * */
        static getModelUrlByModelName(headType: number, modelName: string, dir: number, act: string, isUi?: boolean, isWeapon?: boolean): string;
        /**
         * 获取模型动作资源，如：atk1_2
         * */
        static getModelAct(dir: number, act: string, isUi?: boolean): string;
        /**
         * 获取战队旗帜
         */
        static getZhanduiFlag(index: number): string;
        /**
         * 技能展示类型
         * @param skillId
         */
        static getSkillShowType(skillId: number): string;
        /**
         * 戒指外显突破
         * @param id 戒指id
         */
        static getRingSrc(id: number): string;
        /**
         *兽印外显突破
         * @param id 兽印id
         */
        static getShouyinSrc(id: number): string;
    }
}
declare namespace game {
    const enum ArraySort {
        UPPER = 1,
        LOWER = 2
    }
    class SortTools {
        /**排序任务*/
        static sortTask(a: msg.task_data, b: msg.task_data): number;
        /**通用道具排序*/
        static sortProp(a: PropData, b: PropData): number;
        /**根据sort字段，从小到大排序，配置相关的跟策划约定好sort字段，从小到大排序*/
        static sortByRort(a: {
            sort: number;
        }, b: {
            sort: number;
        }): number;
        /**默认从小到大排序*/
        static sortNum(a: number, b: number, type?: ArraySort): number;
        /**
         * 排序 [{age:11}, {age:12}]
         * @param arr 要排序的数组
         * @param key 排序的key 比如 age
         * @param type 排序类型，默认从小到大
         */
        static sortMap(arr: Array<any>, key: string, type?: ArraySort): void;
        /**
         * 奖励领取状态排序  （1可领取，0不可领取，2已领取）
         * @param arr 待排序的数组
         * @param key 排序的key，默认status
         */
        static sortReward(arr: Array<any>, key?: string): void;
        /**排序好友*/
        static sortFriend(a: msg.friend_info, b: msg.friend_info): number;
    }
}
declare namespace game {
    import ITextElement = egret.ITextElement;
    import Label = eui.Label;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    class TextUtil {
        private static _htmlParser;
        /**改变字体*/
        private static changeFont;
        /**
         * 返回对content，添加指定color的html文本
         */
        static addColor(content: string, color: string | number, font?: string): string;
        /**
         *
         * @param str
         * @param isWhite 是否是白底颜色
         */
        static parseHtml(str: string, isWhite?: boolean): ITextElement[];
        /**
         * 参数指定的带有link的文本,带下划线
         * @param content 文本
         * @param color 字体颜色
         * @param event 事件，不设置的话为null
         * @param font 需要改变的字体
         */
        static addLinkHtmlTxt(content: string, color?: number | string, event?: string, font?: string): string;
        /**
         * 参数指定的带有link的文本,带下划线和描边
         * @param label 标签
         * @param content 文本
         * @param color 字体颜色
         * @param event 事件，不设置的话为null
         * @param font 需要改变的字体
         */
        static addLinkHtmlTxt2(label: Label, content: string, color?: number | string, event?: string, font?: string): Label;
        /**
         * 计算属性，基础属性*数量
         * @param {attributes} attr，基础属性
         * @param {number} num，数量
         * @returns {attributes}
         */
        static calcAttr(attr: msg.attributes, num: number): msg.attributes;
        /**
         * 计算属性，多个属性相加
         * @param {attributes[]} attrList，属性列表
         * @returns {attributes}
         */
        static calcAttrList(attrList: msg.attributes[]): msg.attributes;
        /**
         * 获取属性表有用的属性字段，排序后的字段
         * @param {attributes} attr
         * @returns {string[]}
         */
        static getAttrOrderKeys(attr: msg.attributes): string[];
        /**
         * 获取属性字段文本，atk：攻击
         * @param {string} key
         * @returns {string}
         */
        static getAttrsText(key: string): string;
        /**
         * 转换属性值
         * @param {string} key
         * @param {number | Long} value
         * @param fractionDigits 假如有小数保留多少位
         * @returns {string}
         */
        static getAttrsPerCent(key: string, value: number | Long, fractionDigits?: number): string;
        /**
         * 获取属性文本显示
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认：
         * * @param attrVal 替换显示的属性值，用于显示0属性用
         * * @param attrStr 替换显示的属性文本，用于只显示属性值用
         */
        static getAttrText(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, attrVal?: number, attrStr?: string): string;
        /**
         * 获取属性文本显示，+号
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认 +
         * * @param attrVal 替换显示的属性值，用于显示0属性用
         * * @param attrStr 替换显示的属性文本，用于只显示属性值用
         */
        static getAttrTextAdd(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, attrVal?: number, attrStr?: string): string;
        /**
         * 获取属性文本显示列表
         * * @param attr 属性
         * * @param color 颜色，默认白底绿色
         * * @param endStr 结束文本，默认换行
         * * @param joinStr 中间文本，默认：
         * * @param defaultColor 文本默认颜色
         */
        static getAttrTextInfos(attr: msg.attributes, color?: number, endStr?: string, joinStr?: string, defaultColor?: number): string[];
        /**
         * 获取主动技能描述
         * @param cfg 技能配置
         * @param lv 技能等级
         * @param showZero 是否显示0级技能，默认是没有0级技能的
         * @param lvDesc 直接取等级描述
         */
        static getSkillDesc(cfg: BattleSkillConfig, lv: number, showZero?: boolean, lvDesc?: boolean): string;
        /**
         * 获取技能属性描述
         * * @param baseAttr 基础属性
         * * @param attr 服务端下发的属性
         * * @param replaceStr 需要替换显示的属性文本
         */
        static getSkillListDesc(baseAttr: msg.sys_attrs, attr?: msg.sys_attrs, replaceStr?: {
            key: string;
            aStr: string;
        }[]): string[][];
        /**随机玩家名字*/
        static getRandomName(sex?: number): string;
        /** */
        static addEnoughColor(value1: number | string, value2: number, symbol?: boolean): string;
        static truncateString(str: string, maxLength?: number): string;
    }
}
