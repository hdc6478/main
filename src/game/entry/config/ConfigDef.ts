namespace game {
    /**表名字*/
    import LanDef = game.localization.LanDef;

    export const enum ConfigName {
        Chat = "chat_limit.json",
        ServerTips = "tips_client.json",//客户端提示
        Tips = "tips.json",//提示配置
        GmDoc = "gm_doc.json",//GM命令
        RoleName = "role_name.json",//玩家名字
        Monster = "monster1.json",//怪物配置
        Skill = "battle_skill.json",//技能配置
        SkillShow = "skill_show.json",//技能表现
        SkillLayer = "skill_layer", //技能特效层级
        Scene = "scene.json",//场景配置
        Vip = "vip.json",//VIP配置
        RewardPreview = "reward_preview.json",//奖励预览
        Buff = "buff.json",//buff配置
        OpenFunction = "open_function.json",//功能开启
        ProductId = "product_id.json",//商品表
        Gate = "gate1.json",//关卡表
        Param = "param.json",//参数表
        SkillLv = "skill_level.json",//技能等级
        Weapon = "weapon.json",//神兵配置
        Effect = "effect.json",//特效配置
        WingSkin = "wing.json",//羽翼表

        /**新加的配置表*/
        Rebirth = "rebirth.json",//转生配置
        Godpower = "godpower.json",//仙魄配置
        Prop = "prop.json",//道具配置
        BagType = "bag_type.json",//背包类型
        Synthesis = "synthesis.json",//道具合成
        SynthesisType = "synthesis_type.json",//道具合成类型
        Qiyuan = "qiyuan.json",//奇缘配置
        QiyuanFuben = "qiyuan_fuben.json", //奇缘副本配置
        MainTask1 = "main_task1.json", //任务配置
        Elixir_init = "elixir_init.json",//仙丹配置
        Elixir_limit = "elixir_limit.json",//仙丹吞食配置
        Elixir_buff = "elixir_buff.json",//仙丹buff配置
        Grid = "grid.json",//灵池配置
        Pool = "pool.json",//灵池升级配置
        Equip = "equipment.json",//装备配置
        Lingmai = "lingmai.json",//灵脉配置
        LingmaiLevel = "lingmai_level.json",//灵脉等级配置
        Linggen = "linggen.json",//灵根配置
        LinggenLeixing = "linggen_leixing.json",//灵根类型配置
        Title = "title.json",//称号配置
        DressUp = "dress.json",//装扮
        Level = "level.json",//等级
        Fightpower = "fightpower.json",//属性定义表
        XianfaSkillInit = "xianfa_skill_init.json",//仙法技能主表
        XianfaSkillLevel = "xianfa_skill_level.json",//仙法技能等级表
        XianfaSkillCultivate = "xianfa_skill_cultivate.json",//仙法技能研习表
        Shenling = "shenling.json",//神灵
        ShenlingType = "shenling_leixing.json",//神灵类型
        ShenlingLevel = "shenling_dengji.json",//神灵等级
        ShenlingStar = "shenling_xingji.json",//神灵星级
        ShenlingJiBan = "shenling_jiban.json",//神灵羁绊
        ShenlingLingqi = "shenling_lingqi.json",//神灵灵器
        ShenlingLingpoType = "shenling_lingpo_type.json",//神灵灵魄
        ShenlingLingpo = "shenling_lingpo.json",//神灵灵魄升级
        ShenlingLingli = "shenling_lingli.json",//神灵灵力
        Horse = "horse.json",//坐骑配置
        HorseLevel = "horse_dengji.json",//坐骑等级
        HorseJiBan = "horse_jiban.json",//坐骑羁绊
        Tunshi = "tunshi.json",//吞噬配置
        Jinjiejiangli = "jinjiejiangli.json",//进阶奖励配置
        SpecialAttr = "special_attr.json",//特殊属性
        Tianshen = "yuanling.json",//元灵配置
        TianshenLevel = "yuanling_dengji.json",//元灵等级
        TianshenJiBan = "yuanling_jiban.json",//元灵羁绊
        TianshenZhuangBei = "yuanling_zhuangbei.json",//元灵装备
        TianshenTaoZhuang = "yuanling_taozhuang.json",//元灵套装
        Lingchong = 'xianchong.json',//灵宠
        Jump = "jump.json",//跳转表
        RepetitionTask = "repetition_task.json",//任务表
        MaterialFuben = "material_fuben.json",//副本表
        MaterialScene = "material_scene.json",//副本表
        DailyLimitTime = "daily_limit_time.json",//日常限时活动
        DailyWanfa = "daily_wanfa.json",//日常玩法
        ForbiddenFuben = "forbidden_fuben.json",//禁地副本
        ForbiddenGate = "forbidden_gate.json",//禁地副本关卡
        XiantaFuben = "xianta_fuben.json",//仙塔副本表
        XiantaScene = "xianta_scene.json",//仙塔副本表
        XiantaReward = "xianta_reward.json",//仙塔副本表
        YuanLingFuben = "yuanling_fuben.json",//元灵副本
        NewVipBossFuben = "new_vip_boss_fuben.json",//vip boss副本
        NewVipBoss = "new_vip_boss.json",//vip boss
        NewMultipleBoss = "new_multiple_boss.json",//多人boss
        PersonalBoss = "personal_boss.json",//个人boss
        CrossBoss = "cross_boss.json",//跨服boss
        TourpvpChallenge = "tourpvp_challenge.json",//游历挑战
        TourpvpTarget = "tourpvp_target.json",//游历阶段奖励
        TourpvpFuli = "tourpvp_fuli.json",//游历积分福利
        TourpvpPaiming = "tourpvp_paiming.json",//游历排行榜
        TourpvpPrecious = "tourpvp_precious.json",//游历礼包奖励
        TourpvpWin = "tourpvp_win.json",//游历胜利奖励列表
        TourpvpBaoxiang = "tourpvp_baoxiang.json",//游历许愿宝箱
        TourpvpKiller = "tourpvp_killer.json",//游历积分杀手
        TourpvpDati = "tourpvp_dati.json",//游历答题
        BattleFigure = "battle_figure.json", //战斗瓢字
        MagicTarget = "magic_target.json",//斗法阶段奖励
        MagicWin = "magic_win.json",//斗法连胜奖励列表
        MagicUp = "magic_up.json",//斗法段位晋级奖励
        MagicRank = "magic_rank.json",//斗法本服排名奖励
        MagicTopRank = "magic_top_rank.json",//斗法巅峰排名奖励
        SuitStage = "suit_stage.json",//套装进阶
        SuitStrengthen = "suit_strength.json",//套装强化
        Body = "body.json",//时装
        SuitType = "suit_type.json",//套装类型
        SuitPart = "suit_part.json",//套装类型组成配置
        Dabiaojiangli = "dabiaojiangli.json",//达标奖励
        PowerDiaTarget = "power_dia_target.json",//战力转盘目标战力 */
        PowerDiaReward = "power_dia_reward.json",//战力转盘奖励 */
        BodyJiban = "body_jiban.json",//时装羁绊
        Gather = "gather.json",//装备收集配置
        DirectShop = "direct_shop.json",//直购商店类型区分
        /**召唤系统start */
        DrawRank = "draw_rank.json",//排行榜
        DrawMain = "draw_main.json",//排行榜
        DrawCountRewards = "draw_count_rewards.json",//达标奖励
        DrawGift = "draw_gift.json",//奖券兑换
        DrawLuckGift = "draw_luck_gift.json",//命运豪礼
        /**送100召唤卷 */
        GameOrderType = "game_order_type.json",//活动类型
        GameOrder = "game_order.json",//送100召唤列表
        SignGift = "daily_sign.json",//签到有礼
        EfectSub = "effect_sub.json", //描述资源是否有子合图
        ZeroBuy = "zero_buy.json",//0元购
        ZcxLuckNumber = "zcx_luck_number.json",//招财仙幸运数字
        ZcxCoinsBank = "zcx_coins_bank.json",//招财仙进宝钱庄
        ZcxExchange = "zcx_exchange.json",//招财仙财神兑换
        ZcxFuben = "zcx_fuben.json",//招财仙副本
        ZcxFund = "zcx_fund.json",//招财仙基金
        Yaodi = "yaodi.json",//主角光环妖帝配置
        YaodiRandom = "yaodi_random.json",//主角光环妖帝配置
        Yaoshen = "yaoshen.json",//主角光环妖神配置
        YaoshenRandom = "yaoshen_random.json",//主角光环妖神配置
        Shouchong = "shouchong.json",//首充豪礼
        AdventureMedal = "adventure_medal.json",//活跃度，119_X_勋章表（旧表名）
        ActiveAward = "active_award.json",//活跃度奖励，119_X_勋章表（旧表名）
        GiftBag = "gift_bag.json",//商品礼包
        Store = "shop.json",//商店配置
        WorldMap = "worldmap.json",//世界地图
        Chapteraward = "chapteraward.json",//闯关模块配置
        Subsection = "subsection.json",//boss血条分段
        DemonReward = "demon_reward.json",//斩妖福利表
        TotalMain = "total_main.json",//统一功能配置主标签页配置
        TotalTask = "total_task.json",//统一功能配置任务
        ToTalTask2 = "total_task2.json",//统一功能配置任务2
        TotalTarget = "total_target.json",//统一功能配置target
        TotalCumulative = "total_cumulative.json",//统一功能配置累充
        TotalFuben = "total_fuben.json",//total副本信息
        DaoLvShop = "daolv_shop.json",//道侣商店
        GuildDonate = "guild_donate.json",//仙宗表
        GuildJobData = "guild_job_data.json",//仙宗权限表
        GuildCreateData = "guild_create_data.json",//仙宗创建
        GuildCharge = "guild_charge.json",//仙宗充值福利
        GuildDraw = "guild_draw.json",//仙宗天坛抽奖
        GuildYibaoBox = "guild_yibao_box.json",//仙宗
        GuildYibaoRank = "guild_yibao_rank.json",//仙宗
        GuildYibaoTask = "guild_yibao_task.json",//仙宗
        GuildZhanyaotai = "guild_zhanyaotai.json",//仙宗
        GuildZhanyaotaiRank = "guild_zhanyaotai_rank.json",//仙宗
        GuildWare = "guild_ware.json",//仙宗
        GuildAuction = "guild_auction.json",//仙宗
        GuildBaoKu = "guild_bao_ku.json",//仙宗
        GuildStudy = "guild_study.json",//仙宗书斋
        GuildStudyLevel = "guild_study_level.json",//仙宗
        GuildXianshou = "guild_xianshou.json",//仙兽
        GuildXianshouTask = "guild_xianshou_task.json",//仙兽
        GuildXianshouRank = "guild_xianshou_rank.json",//仙兽
        GuildXianshouTarget = "guild_xianshou_target.json",//仙宗
        GuildPkSkill = "guild_pk_skill.json",//跨服仙宗
        Yijie = "yijie.json",//异界配置
        Yongheng = "yongheng.json",//永恒异界配置
        Cangzhenge = "canzhenge.json",//藏珍阁
        ShengtanItem = "shengtan_item.json",//仙宗圣坛
        ShengtanScore = "shengtan_score.json",//仙宗圣坛
        GuiidRandom = "guiid_random.json",//仙宗圣坛奖励预览
        GuildMiBao = "guild_mibao.json",//仙尊秘宝
        YuhuoReward = "yuhuo_reward.json",//浴火重生
        Amass = "amass.json",//图鉴，异兽奇记
        AmassSuit = "amass_suit.json",//图鉴，异兽奇记
        SuitEffect = "suit_effect.json",//图鉴，异兽奇记
        GongfengReward = "gongfeng_reward.json",//供奉奖励
        GongfengShow = "gongfeng_show.json",//供奉奖励预览
        Child = "child.json",//仙侣-子女
        ChildStar = "child_shengxing.json",//仙侣-子女升星
        ChildJiban = "child_jiban.json",//仙侣-子女羁绊
        ChildShenbing = "child_shenbing.json",//仙侣-子女神兵
        ChildLingyi = "child_lingyi.json",//仙侣-子女灵翼
        Ring = "ring.json",//缘戒
        RingDengji = "ring_dengji.json",//缘戒等级
        XianlvShilianFuben = "xianlv_shilian_fuben.json",//仙侣试炼副本
        XianlvShilianScene = "xianlv_shilian_scene.json",//仙侣试炼场景
        XianlvRank = "xianlv_rank.json",//仙侣排行榜
        XianlvJifen = "xianlv_jifen.json",//仙侣排行榜
        FriendGift = "friend_gift.json",//仙友
        TiandiType = "tiandi_type.json",//天帝录
        TiandiLevel = "tiandi_level.json",//天帝录
        TiandiLevelrewards = "tiandi_levelrewards.json",//天帝录
        TiandiYuhuangQiandao = "tiandi_yuhuang_qiandao.json",//天帝录
        TiandiFengduBaiguilu = "tiandi_fengdu_baiguilu.json",//天帝录
        TiandiFengduTaozhuang = "tiandi_fengdu_taozhuang.json",//天帝录
        TiandiRandom = "tiandi_random.json",//天帝录
        TiandiTianlongJihuo = "tiandi_tianlong_jihuo.json",//天帝录
        TiandiTianlong = "tiandi_tianlong.json",//天帝录
        TiandiShifang = "tiandi_shifang.json",//天帝录
        TiandiShifangYouli = "tiandi_shifang_youli.json",//天帝录
        TiandiShifnagLevel = "tiandi_shifnag_level.json",//天帝录
        RankConf = "rank_conf.json",//排行榜
        RankReward = "rank_reward.json",//排行榜的大神榜奖励
        Stronger = "stronger.json",//我要变强
        TreasureBox = "treasurebox.json",//召唤宝藏系统
        Preview = "preview.json",//功能预览
        BlessMain = "bless_main.json",//鸿运赐福
        TongtiangeChallenge = "attic_challenge.json",//通天阁挑战
        TongtiangeExchange = "attic_exchange.json",//通天阁兑换
        TongtiangeLogin = "attic_login.json",//通天阁登陆奖励
        TongtiangeGift = "attic_gift.json",//通天阁礼包
        Xianjian = "xianjian.json",//仙剑
        XianjianDengji = "xianjian_dengji.json",//仙剑
        XianjianJiban = "xianjian_jiban.json",//仙剑
        Jianfa = "jianfa.json",//仙剑
        Jianzhen = "jianzhen.json",//仙剑
        XianjianSkillCost = "xianjian_skill_cost.json",//仙剑
        XianjianSkillPos = "xianjian_skill_pos.json",//仙剑
        Achievement = "achievement.json",//成就系统
        Huashen = "huashen.json",//化神配置
        HuashenLevel = "huashen_dengji.json",//化神等级
        ChonglistGift = "chonglist_gift.json",//新服冲榜
        ChonglistTarget = "chonglist_target.json",//新服冲榜
        ChonglistRank = "chonglist_rank.json",//新服冲榜
        NewPrivilege = "new_privilege.json",//特权表
        HuangguShenqiBuwei = "huanggu_shenqi_buwei.json",//荒古神器
        HuangguShenqi = "huanggu_shenqi.json",//荒古神器
        HuangguShenqiSkill = "huanggu_shenqi_skill.json",//荒古神器
        Yishou = "yishou.json",//异兽
        YishouShouhun = "yishou_shouhun.json",//异兽兽魂
        YishouShouling = "yishou_shouling.json",//异兽兽灵
        YishouShoulingEquip = "yishou_shouling_equip.json",//异兽兽灵
        YishouSynthesisType = "yishou_synthesis_type.json",//异兽合成配置
        YishouShouyin = "yishou_shouying.json",//异兽兽印
        YishouShouyinSuit = "yishou_shouying_suit.json",//异兽兽印
        HuashenZhilu = "huashen_zhilu.json",//化神之路
        HuashenTianfu = "huashen_tianfu.json",//灵根配置
        HuashenTianfuLeixing = "huashen_tianfu_leixing.json",//灵根类型配置
        XianchiReward = "xianchi_reward.json",//仙池祈愿
        TiannvChargeWeal = "tiannvcharge_weal.json",//天女赐福
        VipCharge = "vip_charge.json",//VIP5福利
        RewardFind = "reward_find.json",//资源找回
        ZhanduiQizhi = "zhandui_qizhi.json",//战队旗帜
        ZhanduiDengji = "zhandui_dengji.json",//战队等级
        ZhanduiJitanHuanhua = "zhandui_jitan_huanhua.json",//战队祭坛幻化
        ZhanduiJitanDengji = "zhandui_jitan_dengji.json",//战队祭坛等级
        ZhanduiJitanLibao = "zhandui_jitan_libao.json",//战队祭坛礼包
        ZhanduiTansuoType = "zhandui_tansuo_type.json",//墟界探索
        ZhanduiTansuoMap = "zhandui_tansuo_map.json",//墟界探索
        HuangguGongfeng = "huanggu_gongfeng.json",//荒古供奉
        HuangguReward = "huanggu_reward.json",//荒古供奉奖励
        HuangguHaogan = "huanggu_haogan.json",//荒古好感
        HuangguHaoganDuihua = "huanggu_haogan_duihua.json",//荒古好感对话
        HuangguShuijing = "huanggu_shuijing.json",//荒古召唤奖励
        HuangguGift = "huanggu_gift.json",//荒古目标返利
        HuangguShijian = "huanggu_shijian.json",//荒古事件
        HuangguShijianType = "huanggu_shijian_type.json",//荒古事件类型
        HelotCallReward = "helot_call_reward.json",//矿脉
        HelotTargetReward = "helot_target_reward.json",//矿脉
        HelotText = "helot_text.json",//矿脉
        ZhuimoBoss = "zhuimo_boss.json",//坠魔深渊
        NvshenIndex = "nvshen_index.json",//女神录
        NvshenShijianType = "nvshen_shijian_type.json",//女神录
        NvshenShijian = "nvshen_shijian.json",//女神录
        NvshenDuihuaLevel = "nvshen_duihua_level.json",//女神录
        NvshenDuihua = "nvshen_duihua.json",//女神录
        NvshenLevel = "nvshen_level.json",//女神录
        NvshenChoujiang = "nvshen_choujiang.json",//女神录
        NvshenHunka = "nvshen_hunka.json",//女神录
        NvshenHunkaScore = "nvshen_hunka_score.json",//女神录
        NvshenAttr = "nvshen_attr.json",//女神录
        NvshenGudingAttr = "nvshen_guding_attr.json",//女神录
        FengmoRank = "fengmo_rank.json",//仙宗封魔
        FengmoDamageReward = "fengmo_damage_reward.json",//仙宗封魔
        FengmoTiaozhanReward = "fengmo_tiaozhan_reward.json",//仙宗封魔
        XiuxianNvpuTarget = "ayah_target.json",//修仙女仆
        XiuxianNvpuLevel = "ayah_level.json",//修仙女仆
        XiuxianNvpuOffline = "ayah_offline.json",//修仙女仆
        XiuxianNvpuEventFunc = "ayah_event_func.json",//修仙女仆
        XianmaiStage = "xianmai_stage.json",//仙脉争夺
        XianmaiRankReward = "xianmai_rank_reward.json",//仙脉争夺排行榜
        XiandiRank = "xiandi_rank.json",//仙帝整包排行榜
        HuanjingzhihaiIndex = "huanjingzhihai_index.json",//幻境之海
        HuanjingzhihaiType = "huanjingzhihai_type.json",//幻境之海
        HuanjingzhihaiGate = "huanjingzhihai_gate.json",//幻境之海
        HuanjingzhihaiBoss = "huanjingzhihai_boss.json",//幻境之海
        HuanjingzhihaiBossRank = "huanjingzhihai_boss_rank.json",//幻境之海
        AdvanceLv = "advance_lv.json",//套装名字
        XianlvDoufaRank = "xianlvdoufa_rank.json",//仙侣斗法排行
        XianlvDoufaReward = "xianlvdoufa_reward.json",//仙侣斗法奖励
        HuanJingStage = "huanjin_stage.json",//幻境系统
        HuanJingStar = "huanjin_star.json",//幻境系统
        HuanJingHuanLing = "huanjin_huanling.json",//幻境系统
        HuanJingZuShen = "huanjin_zushen.json",//幻境系统
        HuanJingParam = "huanjin_param.json",//幻境系统
        DoufaJifen = "doufa_jifen.json",//跨服斗法
        DoufaJineng = "doufa_jineng.json",//跨服斗法
        DoufaXianzongPaiming = "doufa_xianzong_paiming.json",//跨服斗法
        DoufaGerenPaiming = "doufa_geren_paiming.json",//跨服斗法
        LegionBuff = "legion_buff.json",//军团buff
        LegionAttr = "legion_attr.json",//军团属性
        LinghuQuality = "linghu_quality.json",//浮尘灵壶-品质
        LinghuExtraBox = "linghu_extra_box.json",//浮尘灵壶-稀有奖励池
        HuanjingBaozang = "huanjing_baozang.json",//浮尘灵壶-幻境宝藏
        HuanjingGift = "huanjing_gift.json",//浮尘灵壶-幻境礼包
        HuanjingLeichong = "huanjing_leichong.json",//浮尘灵壶-幻境累充
        HuanjingZengli = "huanjing_zengli.json",//浮尘灵壶-幻境赠礼
        SpecialGuide = "special_guide.json", // 特殊引导表
        XianjieLuandouScore = "xianjiebrawl_score.json",//仙界乱斗
        XianjieLuandouRank = "xianjiebrawl_rank.json",//仙界乱斗
        XianjieLuandouOutcome = "xianjiebrawl_outcome.json",//仙界乱斗
        XianjieLuandouBase = "xianjiebrawl_base.json",//仙界乱斗
        TiandiXianqiFuben = 'tiandi_xianqi_fuben.json',//仙帝神器
        TiandiXianqi = 'xiandi_xianqi.json',//仙帝神器
        XianweiBase = 'xianwei_base.json',//仙位争霸
        XianweiRankReward = 'xianwei_rank_reward.json',//仙位争霸
        Honour = 'honour.json',//荣誉
    }

    /**拆表的配置，用于遍历获取配置*/
    export const MonsterConfigList: string[] = [ConfigName.Monster];
    export const GateConfigList: string[] = [ConfigName.Gate];
    export const SplitConfigMap: { [key: string]: string[] } = {
        [ConfigName.Monster]: MonsterConfigList,
        [ConfigName.Gate]: GateConfigList
    };

    /** 表头Id*/
    export const enum ConfigHead {
        /*****************************新加的**************************/
        /**只有产出的配置才定义表头*/
        Prop = 145,//道具表头
        Equip = 290,//装备表头
        Horse = 360,//坐骑
        Lingchong = 361,//灵宠
        Title = 370,//称号
        DressUp = 390,//装扮
        Shenling = 400,//神灵
        Weapon = 403,//神兵
        Wing = 404,//羽翼
        Body = 405,//时装
        Xianjian = 408,//仙剑
        Huashen = 409,//化神
        Tianshen = 640,//元灵
        Child = 601,//仙侣子女
        ChildShenbing = 602,//仙侣子女神兵
        ChildLingyi = 603,//仙侣子女灵翼
        Ring = 604,//缘戒
        Shouling = 605,//异兽兽灵
        Shouyin = 606,//异兽兽印
        ZhanduiJitanHuanhua = 701,//战队祭坛幻化

        Horse2 = 9900,//坐骑部位2
        Creature = 9901,//客户端用，怪物，NPC，采集物，触发器都用这个
        Huashen2 = 9902,//化神武器
    }

    /** 表头映射 getConfigById表头只匹配了两位数*/
    export const ConfigMap: { [key: number]: string } = {
        /*****************************新加的**************************/
        [ConfigHead.Prop]: ConfigName.Prop,
        [ConfigHead.Equip]: ConfigName.Equip,
        [ConfigHead.Title]: ConfigName.Title,
        [ConfigHead.DressUp]: ConfigName.DressUp,
        [ConfigHead.Shenling]: ConfigName.Shenling,
        [ConfigHead.Horse]: ConfigName.Horse,
        [ConfigHead.Tianshen]: ConfigName.Tianshen,
        [ConfigHead.Lingchong]: ConfigName.Lingchong,
        [ConfigHead.Wing]: ConfigName.WingSkin,
        [ConfigHead.Weapon]: ConfigName.Weapon,
        [ConfigHead.Body]: ConfigName.Body,
        [ConfigHead.Child]: ConfigName.Child,
        [ConfigHead.ChildShenbing]: ConfigName.ChildShenbing,
        [ConfigHead.ChildLingyi]: ConfigName.ChildLingyi,
        [ConfigHead.Ring]: ConfigName.Ring,
        [ConfigHead.Xianjian]: ConfigName.Xianjian,
        [ConfigHead.Huashen]: ConfigName.Huashen,
        [ConfigHead.Shouling]: ConfigName.YishouShouling,
        [ConfigHead.Shouyin]: ConfigName.YishouShouyin,
        [ConfigHead.ZhanduiJitanHuanhua]: ConfigName.ZhanduiJitanHuanhua,
    };

    /**外显类的配置定义，映射外显资源，SurfaceUtil需要加下映射，ResUtil.getSurfaceData根据具体需求修改*/
    export const SurfaceConfigList = {
        [ConfigHead.Shenling]: "general",//神灵*/
        [ConfigHead.Horse]: "horse",//坐骑*/
        [ConfigHead.Tianshen]: "yuanling",//元灵*/
        [ConfigHead.Lingchong]: "lingchong",//灵宠*/
        [ConfigHead.Wing]: "wing",//羽翼 */
        [ConfigHead.Body]: "body",//时装 */
        [ConfigHead.Weapon]: "weapon",//神兵 */
        [ConfigHead.Horse2]: "horse",//坐骑部位2*/
        [ConfigHead.Creature]: "creature",//怪物，NPC，采集物，触发器 */
        [ConfigHead.Child]: "child",//仙侣子女
        [ConfigHead.ChildShenbing]: "child_shenbing",//仙侣子女神兵
        [ConfigHead.ChildLingyi]: "child_lingyi",//仙侣子女灵翼
        [ConfigHead.Ring]: "ring",//缘戒
        [ConfigHead.Xianjian]: "xianjian",//仙剑
        [ConfigHead.Huashen]: "huashen",//化神
        [ConfigHead.Huashen2]: "huashen_weapon",//化神武器
        [ConfigHead.Shouling]: "shouling",//异兽兽灵
        [ConfigHead.Shouyin]: "shouyin",//异兽兽印
        [ConfigHead.ZhanduiJitanHuanhua]: "zhanduijitan",//战队祭坛
    };
    /**根据表头获取提示文本*/
    export const ConfigHeadToName = {
        [ConfigHead.Shenling]: LanDef.general_tips,//神灵*/
        [ConfigHead.Horse]: LanDef.horse_tips,//坐骑*/
        [ConfigHead.Tianshen]: LanDef.yuanling_tips,//元灵*/
        [ConfigHead.Lingchong]: LanDef.lingchong_tips,//灵宠*/
        [ConfigHead.Wing]: LanDef.wing_tips,//羽翼 */
        [ConfigHead.Body]: LanDef.body_tips,//时装 */
        [ConfigHead.Weapon]: LanDef.weapon_tips,//神兵 */
        [ConfigHead.Equip]: LanDef.equipment_tips,//装备 */
        [ConfigHead.Huashen]: LanDef.huashen_tips//化神
    };

}
