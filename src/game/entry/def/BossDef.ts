namespace game {
    export const enum BossEvent {
        ON_MANY_BOSS_UPDATE = "on_many_boss_update",//多人boss信息
        UPDATE_BOSS_lIST = "update_boss_list",//更新boss列表
        ON_VIP_BOSS_INFO_UPDATE = "on_vip_boss_info_update",//vip boss 信息刷新
        ON_PERSONAL_BOSS_UPDATE = "on_personal_boss_update",//个人boss信息
        ON_CROSS_BOSS_UPDATE = "on_cross_boss_update",//跨服boss信息
        ON_CROSS_BOSS_RANK_UPDATE = "on_cross_boss_rank_update",//跨服boss排行榜信息
        ON_CROSS_BOSS_REWARD_UPDATE = "on_cross_boss_reward_update",//跨服boss奖励信息
        ON_BOSS_REVIVE_UPDATE = "on_boss_revive_update",//BOSS复活，会携带BossReviveData
        BOSS_LIST_INFO_UPDATE = "boss_list_info_update",//Boss列表信息刷新
        ON_ABYSS_SCENE_UPDATE = "on_abyss_scene_update",//坠魔深渊场景数据刷新
        ON_ABYSS_MAIN_UPDATE = "on_abyss_main_update",//坠魔深渊刷新
        ON_ABYSS_TEAM_UPDATE = "on_abyss_team_update",//坠魔深渊队伍刷新
        ON_ABYSS_TEAM_ADD_UPDATE = "on_abyss_team_add_update",//坠魔深渊加入队伍列表刷新
        ON_ABYSS_TEAM_INVITE_UPDATE = "on_abyss_team_invite_update",//坠魔深渊队伍邀请列表刷新
        ON_ABYSS_HURT_UPDATE = "on_abyss_hurt_update",//坠魔深渊伤害加成
    }

    /**多人boss类型*/
    export const enum ManyBossType {
        Lv = 1,//等级
        Rebirth = 2,//转生
    }

    /**vip boss副本类型*/
    export const enum VipBossType {
        Type1 = 1,           /**类型1*/
        Type2 = 2,           /**类型2*/
        Type3 = 3,           /**类型3*/
        Type4 = 4,           /**类型4*/
        Type5 = 5,           /**类型5*/
    }

    /**vip boss 关卡状态*/
    export const enum VipBossState {
        NonActivited = 1,//未激活
        CanFight = 2,//可挑战
        CanSaoDan = 3,//可扫荡
        CD = 4,//扫荡cd中
    }
    export const BossShowRebirthLimit: number = 143009001;/**VIP BOSS 和多人BOSS在9转之前全部都显示*/

    /**跨服boss请求类型*/
    export const enum CrossBossType {
        Base = 1,//1基础信息  2排行信息
        Rank = 2,
    }

    export const enum BossTipsType {
        CrossBoss = 1,//跨服boss
        Abyss,//坠魔深渊
        KuafuDoufa,//跨服斗法
        XianjieLuandou,//仙界乱斗
    }
}